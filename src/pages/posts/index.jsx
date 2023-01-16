import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CPagination, CPaginationItem, CTable,
  CTableBody, CTableDataCell, CTableHead, CTableHeaderCell,
  CTableRow, CFormCheck, CFormSelect, CButton, CInputGroup, CRow, CCol, CFormInput
} from "@coreui/react";
import api from "src/api";
import CIcon from "@coreui/icons-react";
import { cilTransfer } from "@coreui/icons";

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filterableMonths, setFilterableMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postSelected, setPostSelected] = useState(new Set());
  const [updatedAt, setUpdatedAt] = useState(new Date().getTime());
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 1,
    total: 1,
    links: []
  });
  const [filter, setFilter] = useState({});
  const actionToBeExecute = useRef();
  const visit = useNavigate();
  const location = useLocation();


  useEffect(() => {
    api.get(`post/months`).then(res => {
      setFilterableMonths(res.data.months);
    }).catch(err => console.log(err.response.data));

    api.get(`category`).then(res => {
      setCategories(res.data);
    }).catch(err => console.log(err.response.data));
    console.log("m&c");

    if (location.search != "") {
      const queryItems = location.search.replace("?", "").replace("%20", " ").split("&").map(pair => {
        const [key, value] = pair.split("=");
        return { [key]: value }
      });
      setFilter(queryItems.reduce((acc, obj) => Object.assign(acc, obj), {}));
    }
  }, []);


  useEffect(() => {
    setPostSelected(new Set([]));
    actionToBeExecute.current.value = "";
    const link = `${location.pathname}${location.search}`;
    api.get(link).then(res => {
      setPosts(res.data.data);
      setPagination({
        page: res.data.current_page,
        perPage: res.data.per_page,
        total: res.data.total,
        links: res.data.links
      })
    }).catch(err => console.log(err.response.data));
    console.log(`${location.pathname}${location.search}`);
  }, [updatedAt]);


  const showPostType = (e) => {
    const { name, value } = e.target;
    if (name == 'reset') {
      setFilter({});
      visit(`/post`);
    } else {
      setFilter({ [name]: value });
      visit(`/post?${name}=${value}`);
    }
    setUpdatedAt(new Date().getTime());
  }

  const visitWithFilter = (e) => {
    const { name, value } = e.target;
    visit(`?${name}=${value}`);
    setUpdatedAt(new Date().getTime());
  }



  const genarateUrl = () => {
    const queryString = Object.entries(filter).map(([key, value]) => `${key}=${value}`).join('&');
    const query = queryString.replace(/page=\d+&?/gi, '');
    visit(`/post?${query}`);
    setUpdatedAt(new Date().getTime());
  }


  const filterize = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      const newFilter = filter;
      delete newFilter[name];
      setFilter({ ...newFilter });
    } else {
      setFilter({ ...filter, [name]: value });
    }
  }


  const paginate = (page) => {
    if (location.search !== "") {
      const queryString = Object.entries(filter).map(([key, value]) => `${key}=${value}`).join('&');
      const query = queryString.replace(/page=\d+&?/gi, "");
      if (query !== "") {
        visit(`/post?page=${page}&${query}`);
      } else {
        visit(`/post?page=${page}`);
      }
    } else {
      visit(`/post?page=${page}`);
    }
    setUpdatedAt(new Date().getTime());
  }


  const handlePostSelection = (e) => {
    const value = Number(e.target.value);
    postSelected.has(value) ? postSelected.delete(value) : postSelected.add(value);
    setPostSelected(new Set(postSelected));
  }

  const executableOptions = ['publish', 'draft', 'delete'];

  const selectedPostActions = () => {
    const action = actionToBeExecute.current.value;
    if (action !== "" && postSelected.size) {
      api.post(`post/execute`, {
        action, items: [...postSelected]
      })
        .then(res => setUpdatedAt(Date.now()))
        .catch(err => console.log(err));
    }
  }

  const deleteSinglePost = (postId) => {
    api.delete(`post/${postId}`)
      .then(res => setUpdatedAt(Date.now()))
      .catch(err => console.log(err));
  }

  return (
    <>
      <CRow>
        <ul className="mb-1">
          <CButton size="sm" variant="ghost" color={`${(!("author" in filter) && !("status" in filter)) && "primary"}`} name="reset" onClick={(e) => showPostType(e)} > All </CButton>|
          <CButton size="sm" variant="ghost" color={`${filter.author == "mine" && "primary"}`} name="author" value="mine" onClick={(e) => showPostType(e)} > Mine </CButton>|
          <CButton size="sm" variant="ghost" color={`${filter.status == "published" && "primary"}`} name="status" value="published" onClick={(e) => showPostType(e)} > Published </CButton>|
          <CButton size="sm" variant="ghost" color={`${filter.status == "draft" && "primary"}`} name="status" value="draft" onClick={(e) => showPostType(e)} > Draft </CButton>
        </ul>
      </CRow>
      <CRow className="mb-3">
        <CCol md={{ span: 3 }}>
          <CInputGroup>
            <CFormSelect aria-label="Select Action" ref={actionToBeExecute}>
              <option value="">Select an action</option>
              {executableOptions.map((option, index) => <option key={index} value={option}> {option.toUpperCase()}</option>)}
            </CFormSelect>
            <CButton onClick={() => selectedPostActions()} >
              Apply
            </CButton>
          </CInputGroup>
        </CCol>
        <CCol md={{ span: 3 }}>
          <CFormSelect aria-label="Select Month" name="month" value={filter.month || ""} onChange={(e) => filterize(e)}>
            <option value="">Select a month</option>
            {filterableMonths.map((month, index) => <option key={index} value={month}>{month}</option>)}
          </CFormSelect>
        </CCol>
        <CCol md={{ span: 2 }}>
          <CFormSelect aria-label="Select Category" name="category" value={filter.category || ""} onChange={(e) => filterize(e)}>
            <option value="">All Categories</option>
            {categories.map((category, index) => <option key={index} value={category.slug}>{category.name}</option>)}
          </CFormSelect>
        </CCol>
        <CCol md={{ span: 3 }}>
          <CFormInput placeholder="Search here..." name="search" value={filter.search || ""} onChange={(e) => filterize(e)} />
        </CCol>
        <CCol md={{ span: 1 }}>
          <CButton onClick={genarateUrl}>Filter</CButton>
        </CCol>
      </CRow>
      {posts.length > 0 ? (
        <CTable bordered>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">
                <CFormCheck
                  checked={postSelected.size == posts.length && posts.length >= 1}
                  disabled={posts.length < 1}
                  onChange={(e) => e.target.checked ? setPostSelected(new Set(posts.map(post => post.id))) : setPostSelected(new Set([]))}
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Author</CTableHeaderCell>
              <CTableHeaderCell scope="col">Categories</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tags</CTableHeaderCell>
              <CTableHeaderCell scope="col">Props</CTableHeaderCell>
              <CTableHeaderCell scope="col">Posted</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {posts.map((post, index) => {
              return (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">
                    <CFormCheck
                      checked={postSelected.has(post.id)}
                      value={post.id}
                      onChange={(e) => handlePostSelection(e)}
                    />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <div className="mb-2">{post.title}-{post.status}-{post.id}</div>
                    <div>
                      <CButton size="sm" color="link" className="text-primary text-decoration-none p-0 m-0"
                        onClick={() => { visit("") }}
                      >View</CButton>
                      <span className="mx-2">|</span>
                      <CButton size="sm" color="link" className="text-warning text-decoration-none p-0 m-0"
                        onClick={() => { visit(`/post/edit/${post.slug}`) }}
                      >Edit</CButton>
                      <span className="mx-2">|</span>
                      <CButton size="sm" color="link" className="text-danger text-decoration-none p-0 m-0"
                        onClick={() => { deleteSinglePost(post.slug) }}
                      >Delete</CButton>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      variant="ghost"
                      className="p-0 m-0 px-1"
                      onClick={(e) => visitWithFilter(e)}
                      name="author"
                      value={post?.author?.id}
                    >{post?.author?.name}
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    {post?.categories.map((cat, index) => {
                      return (<CButton
                        key={index}
                        color="primary"
                        variant="ghost"
                        className="p-0 m-0 px-1"
                        onClick={(e) => visitWithFilter(e)}
                        name="category"
                        value={cat.slug}
                      >{cat.name}</CButton>)
                    })}
                  </CTableDataCell>
                  <CTableDataCell>
                    {post?.tags.map((tag, index) => {
                      return (<CButton
                        key={index}
                        color="primary"
                        variant="ghost"
                        className="p-0 m-0 px-1"
                        onClick={(e) => visitWithFilter(e)}
                        name="tag"
                        value={tag.slug}
                      >{tag.name}</CButton>)
                    })}
                  </CTableDataCell>
                  <CTableDataCell>
                    &#x1F441; {post.view_count} <br />
                    &#x1F5E8; {post.comments.length}<br />
                    <CIcon icon={cilTransfer} /> {post?.steps?.length}
                  </CTableDataCell>
                  <CTableDataCell>
                    {post.created_at}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      ) : (
        <div style={{ minHeight: "300px" }} class="d-flex align-items-center justify-content-center">
          <div>No data found</div>
        </div>
      )}
      {(pagination.total / pagination.perPage) > 1 &&
        < CPagination align="end" aria-label="Page">
          <CPaginationItem style={{ cursor: "pointer" }} disabled={pagination.page == 1} onClick={() => paginate(pagination.page - 1)}>Previous</CPaginationItem>
          {[...Array(Math.ceil(pagination.total / pagination.perPage))].map((item, index) => {
            return (
              <CPaginationItem style={{ cursor: "pointer" }} key={index} active={pagination.page == index + 1} className="" onClick={() => paginate(index + 1)}>{index + 1}</CPaginationItem>
            )
          })}
          <CPaginationItem style={{ cursor: "pointer" }} disabled={pagination.page == (Math.ceil(pagination.total / pagination.perPage))} onClick={() => paginate(pagination.page + 1)}>Next</CPaginationItem>
        </CPagination>
      }
    </>
  )
};

export default Posts;



{/* <Link className="text-decoration-none mx-1"
to={`?page=${index}`}
key={index}
active={link.active}
disabled={link.url == null}
>
<CPaginationItem>
  {link.label} {link.active}
</CPaginationItem>

<li class="page-item"><a class="page-link" href="#">3</a></li>
</Link> */}