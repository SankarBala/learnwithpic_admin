import React, { useState, useEffect } from 'react';
import { CCard, CCardHeader, CCol, CNav, CNavItem, CNavLink, CRow } from '@coreui/react';
import Select from 'react-select';
import api from 'src/api';


const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({id: 30});
  const [otherCategories, setOtherCategories] = useState([])
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);


  useEffect(() => {
    console.log(activeCategory);
    api.get('category').then((res) => {
      setCategories(res.data);
      setActiveCategory(res.data[0]);
    }).catch((err) => {
      console.log(err);
    });

  }, []);

  useEffect(() => {
    function removeObjectWithId(arr, id) {
      return arr.filter((obj) => obj.id !== id);
    }

    setOtherCategories(removeObjectWithId(categories, activeCategory.id));
    console.log(otherCategories);
  }, [activeCategory]);


  const onParentsChange = (e) => {
    setParents(e);
  }
  const onChildrenChange = (e) => {
    setChildren(e);
  }

  return (
    <>
      <CRow>
        <CCol>
          <CNav variant="pills" role="tablist">
            {categories.map((category) => {
              return (
                <CNavItem key={category.id}>
                  <CNavLink
                    style={{ cursor: "pointer" }}
                    active={activeCategory.id === category.id}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category.name}
                  </CNavLink>
                </CNavItem>
              )
            })}
          </CNav>
        </CCol>
      </CRow>
      <br />

      <CRow mt-5>
        <CCol md>
          <CCard>
            <CCardHeader component="h5" className='text-center'>Parents Categories</CCardHeader>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={0}
              isSearchable={true}
              isMulti={true}
              name="color"
              value={[...parents]}
              onChange={onParentsChange}
              options={
                otherCategories.map((value) => {
                  return { value: value.id, label: value.name };
                })
              }
            />
          </CCard>
        </CCol>
        <CCol md>
          <CCard>
            <CCardHeader component="h5" className='text-center'>Parents Categories</CCardHeader>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={0}
              isSearchable={true}
              isMulti={true}
              name="color"
              value={[...children]}
              onChange={onChildrenChange}
              options={
                categories.map((value) => {
                  return { value: value.id, label: value.name };
                })
              }
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Categories;