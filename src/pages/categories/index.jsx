import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
} from "@coreui/react";
import Select from "react-select";
import api from "src/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({
    slug: "",
    name: "",
    parents: [],
    children: [],
  });
  const [otherCategories, setOtherCategories] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);
  const [updatedAt, setUpdatedAt] = useState();
  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({ name: "", slug: "" });

  useEffect(() => {
    api
      .get("category")
      .then((res) => {
        if (res.data.length > 0) {
          setCategories(res.data);
          setActiveCategory(res.data[0]);
          setSlug(res.data[0].slug);
        } else {
          setCategories([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updatedAt]);

  useEffect(() => {
    setOtherCategories(
      categories.filter((obj) => obj.id !== activeCategory.id)
    );
    setParents(
      activeCategory.parents.map((value) => {
        return { value: value.id, label: value.name };
      })
    );
    setChildren(
      activeCategory.children.map((value) => {
        return { value: value.id, label: value.name };
      })
    );
    setErrors({ name: "", slug: "" });
  }, [activeCategory]);


  const changeActiveCategory = (category) => {
    setSlug(category.slug);
    setActiveCategory(category);
  }

  const createCategory = () => {
    api.post(`category`, {
      name: activeCategory.name,
      slug: activeCategory.slug
    }).then((res) => {
      setErrors({ name: "", slug: "" });
      setUpdatedAt(Date.now());
    }).catch((err) => {
      setErrors(err.response.data.errors);
    });
  }


  const updateCategory = () => {

    api
      .put(`category/${slug}`, {
        name: activeCategory.name,
        slug: activeCategory.slug,
        parents: parents.map((obj) => {
          return obj.value;
        }),
        children: children.map((obj) => {
          return obj.value;
        }),
      })
      .then((res) => {
        const MySwal = withReactContent(Swal);
        setUpdatedAt(Date.now());
        MySwal.fire({
          title: <p>{res.data.message}</p>,
        });
        setErrors({ name: "", slug: "" });
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  const editCategory = (e) => {
    setActiveCategory({ ...activeCategory, [e.target.name]: e.target.value });
  }

  const deleteCategory = () => {
    api
      .delete(`category/${slug}`)
      .then((res) => {
        setErrors({ name: "", slug: "" });
        setUpdatedAt(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdatedAt(Date.now());
  }



  return (
    <>
      <CRow>
        <CCol md>
          <CForm className="row g-3">
            <CCol md>
              <label className="form-label">Category Name</label>
              <CFormInput
                type="text"
                name="name"
                value={activeCategory.name}
                onChange={editCategory}
                className={errors.name ? "is-invalid" : ""}
              />
              <div className="invalid-feedback">
                {errors.name}
              </div>
            </CCol>
            <CCol md>
              <label className="form-label">Category Slug</label>
              <CFormInput
                type="text"
                name="slug"
                value={activeCategory.slug}
                onChange={editCategory}
                className={errors.slug ? "is-invalid" : ""}
              />
              <div className="invalid-feedback">
                {errors.slug}
              </div>
            </CCol>

            <CCol md align="end">
              <label className="form-label">&nbsp;</label>
              <div className="d-flex">
                {/* <CFormInput
                  type="button"
                  value="Edit"
                  className="bg-warning w-25"
                  onClick={() => setReadonly(false)}
                /> */}
                <CFormInput
                  type="button"
                  value="Delete"
                  className="bg-danger w-50 mx-2"
                  onClick={deleteCategory}
                />
                <CFormInput
                  type="button"
                  value="Create"
                  className="bg-info w-50"
                  onClick={(e) => { createCategory(e) }}
                />
              </div>
            </CCol>

          </CForm>
        </CCol>
      </CRow>
      <hr />
      <CRow>
        <CCol>
          <CNav variant="pills" role="tablist">
            {categories.map((category) => {
              return (
                <CNavItem key={category.id}>
                  <CNavLink
                    style={{ cursor: "pointer", color: 'ButtonText' }}
                    active={activeCategory.id === category.id}
                    onClick={() => changeActiveCategory(category)}
                  >
                    {category.name}
                  </CNavLink>
                </CNavItem>
              );
            })}
            {categories.length < 1 ? "No category created yet." : ""}
          </CNav>
        </CCol>
      </CRow>
      <br />

      <CRow mt-5>
        <CCol md>
          <CCard>
            <CCardHeader component="h5" className="text-center">
              Parents Categories
            </CCardHeader>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={0}
              isSearchable={true}
              isMulti={true}
              name="parents"
              value={parents}
              onChange={(e) => setParents(e)}
              options={otherCategories.map((value) => {
                return { value: value.id, label: value.name };
              })}
            />
          </CCard>
        </CCol>
        <CCol md>
          <CCard>
            <CCardHeader component="h5" className="text-center">
              Child Categories
            </CCardHeader>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={0}
              isSearchable={true}
              isMulti={true}
              name="children"
              value={children}
              onChange={(e) => setChildren(e)}
              options={otherCategories.map((value) => {
                return { value: value.id, label: value.name };
              })}
            />
          </CCard>
        </CCol>
      </CRow>
      <br />
      <CRow>
        <CCol align="end" className="mb-2">
          <CButton color="primary" onClick={updateCategory}>
            Save
          </CButton>
        </CCol>
      </CRow>
    </>
  );
};

export default Categories;
