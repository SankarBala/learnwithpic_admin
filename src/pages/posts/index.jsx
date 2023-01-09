import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as RRD from 'react-router-dom';
import {
  CPagination, CPaginationItem, CTable,
  CTableBody, CTableDataCell, CTableHead, CTableHeaderCell,
  CTableRow, CFormCheck, CFormSelect, CButton, CInputGroup, CContainer, CRow, CCol
} from "@coreui/react";
import api from "src/api";
import CIcon from "@coreui/icons-react";
import { cilBell, cilCommentSquare } from "@coreui/icons";
import Histo from './histo';

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filterableMonths, setFilterableMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postSelected, setPostSelected] = useState(new Set());
  const [updatedAt, setUpdatedAt] = useState();
  const [pagination, setPagination] = useState({
    currentPage: "",
    perPage: "",
    totalPage: "",
    links: []
  });
  const actionToBeExecute = useRef();
  const filteredCategory = useRef();
  const filteredMonth = useRef();
  // const history = RRD.withRouter();

  useEffect(() => {
    api.get(`post`).then(res => {
      setPosts(res.data.data);
      setPagination({
        currentPage: res.data.current_page,
        perPage: res.data.per_page,
        totalPage: res.data.total,
        links: res.data.links
      })
    }).catch(err => console.log(err.response.data));

    api.get(`post/months`).then(res => {
      setFilterableMonths(res.data.months);
    }).catch(err => console.log(err.response.data));

    api.get(`category`).then(res => {
      setCategories(res.data);
    }).catch(err => console.log(err.response.data));


  }, [updatedAt]);


  // useEffect(() => {
  //   setFilterableMonths([...new Set(posts.map(object => {
  //     const date = new Date(object.created_at);
  //     const month = date.toLocaleString('default', { month: 'long' });
  //     const year = date.getFullYear();
  //     return `${month} ${year}`;
  //   }))]);
  // }, [posts]);



  const filterPost = () => {
    const month = filteredMonth.current.value;
    const category = filteredCategory.current.value;

    //
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



  return (
    <>
      <CContainer>
        <CRow>
          <CCol md={{ span: 3 }}>
            <CInputGroup>
              <CFormSelect aria-label="Default select" ref={actionToBeExecute}>
                <option value="">Select an action</option>
                {executableOptions.map((option, index) => <option key={index} value={option}> {option.toUpperCase()}</option>)}
              </CFormSelect>
              <CButton onClick={() => selectedPostActions()} >
                Apply
              </CButton>
            </CInputGroup>
          </CCol>
          <CCol md={{ span: 3 }}>
            <CFormSelect aria-label="Default select" ref={filteredMonth}>
              <option value="">Select a month</option>
              {filterableMonths.map((month, index) => <option key={index} value={month}>{month}</option>)}
            </CFormSelect>
          </CCol>
          <CCol md={{ span: 2 }}>
            <CFormSelect aria-label="Default select" ref={filteredCategory}>
              <option value="">All Categories</option>
              {categories.map((category, index) => <option key={index} value={category.slug}>{category.name}</option>)}
            </CFormSelect>
          </CCol>
          <CCol md={{ span: 1 }}>
            <CButton onClick={filterPost}>Filter</CButton>
          </CCol>
        </CRow>
      </CContainer>
      <hr />
      <CTable bordered>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">
              <CFormCheck
                checked={postSelected.size == posts.length}
                onChange={(e) => e.target.checked ? setPostSelected(new Set(posts.map(post => post.id))) : setPostSelected(new Set([]))}
              />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Author</CTableHeaderCell>
            <CTableHeaderCell scope="col">Categories</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tags</CTableHeaderCell>
            <CTableHeaderCell scope="col">Engage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
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
                  <div className="mb-2">{post.title}</div>
                  <div>
                    <Link className="text-primary text-decoration-none">View</Link>
                    <span className="mx-2">|</span>
                    <Link className="text-warning text-decoration-none">Edit</Link>
                    <span className="mx-2">|</span>
                    <Link className="text-danger text-decoration-none">Delete</Link>
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <Link className="text-decoration-none" to="ss">{post.author.name}</Link>
                </CTableDataCell>
                <CTableDataCell>
                  {post?.categories.map((cat) => {
                    return <Link className="text-decoration-none" key={cat.id} to="/ff">{cat.name}</Link>
                  })}
                </CTableDataCell>
                <CTableDataCell>
                  {post?.tags.map((tag) => {
                    return <Link key={tag.id} className="text-decoration-none" to="/ff">{tag.name}</Link>
                  })}
                </CTableDataCell>
                <CTableDataCell>
                  &#x1F441; {post.view_count} <br />
                  &#x1F5E8; {post.comments.length}
                </CTableDataCell>
                <CTableDataCell>
                  {post.created_at}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>

      <nav aria-label="Pagination">
        <ul className="pagination justify-content-end">
          {pagination.links.map((link, index) => {
            return (
              <li key={index} className={`page-item ${link.active && "active"} ${link.url == null && "disabled"}`}>
                <Link className="page-link" to={link.url}>{link.label}</Link>
              </li>
            )
          })}
        </ul>
        {/* {console.log(history)} */}
      </nav>
      <Histo />
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