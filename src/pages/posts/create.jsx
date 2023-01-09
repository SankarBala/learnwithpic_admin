import React, { useEffect, useRef, useState } from "react";
import {
    CButton, CCard, CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
} from "@coreui/react";
import api from "src/api";
import CIcon from "@coreui/icons-react";
import {
    cibAddthis,
    cilCheckCircle,
    cilCircle,
} from "@coreui/icons";
import ReactImagePickerEditor from "react-image-picker-editor";
import CreatableSelect from 'react-select/creatable';
import "react-image-picker-editor/dist/index.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import slugify from 'react-slugify';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CKEditor } from 'ckeditor4-react';
import editorConfig from "src/assets/ckeditor/standard/config";


const Creator = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [post, setPost] = useState({
        title: "",
        slug: "",
        categories: [],
        tags: [],
        image: ""
    });
    const [steps, setSteps] = useState([{ id: `step_id_${new Date().getTime()}`, title: "" }]);
    const [activeStep, setActiveStep] = useState(steps[0].id);
    const [errors, setErrors] = useState({ title: "", slug: "" });
    const [updatedAt, setUpdatedAt] = useState();
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        api.get(`category`).then(res => setCategories(res.data)).catch((err) => setErrors(err.response.data.errors));
        api.get(`tag`).then(res => setTags(res.data)).catch(err => setErrors(err.response.data.errors));
    }, [updatedAt]);


    const addNewStep = () => {
        setSteps([
            ...steps,
            {
                id: `step_id_${new Date().getTime()}`,
                title: ""
            },
        ]);
    };

    const removeStep = (removableStep) => {
        setSteps(
            steps.filter((step) => {
                return step.id !== removableStep;
            })
        );
    };


    const savePost = (e) => {

        if (post.title == "") {
            setErrors({ ...errors, title: "Title field is requred" });
        }
        if (post.slug == "") {
            setErrors({ ...errors, slug: "Slug field is requred" });
        }

        if (post.title == "" || post.slug == "") {
            return;
        }

        setPosting(true);
        const postablesteps = steps.map(step => ({ title: step.title, content: CKEDITOR.instances[`content_of_${step.id}`].getData() }));

        api.post(`post`, { ...post, steps: postablesteps, tags: post.tags.map((tag) => tag.label) }).then(res => {

            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: <p>{res.data.message}</p>,
            });
            setPost({
                title: "",
                slug: "",
                categories: [],
                tags: [],
                image: ""
            });
            setPosting(false);
            setErrors({});
            setUpdatedAt(Date.now());
        }).catch(err => {
            setPosting(false);
            setErrors({ ...err.response.data.errors });
            // console.log(err);
        });
    }


    return (
        <>
            <CRow>
                <CCol md>
                    <CForm className="row g-3">
                        <CCol md>
                            <label className="form-label">Title</label>
                            <CFormInput
                                type="text"
                                name="title"
                                className={errors.title ? "is-invalid" : ""}
                                value={post.title}
                                onFocus={(e) => setErrors({ ...errors, [e.target.name]: "" })}
                                onChange={e => setPost({ ...post, title: e.target.value })}
                                onBlur={() => { post.slug == "" ? setPost({ ...post, slug: slugify(post.title.slice(0, 80)) }) : "" }}
                            />
                            <div className="invalid-feedback">{errors.title}</div>
                        </CCol>
                        <CCol md>
                            <label className="form-label">Slug</label>
                            <CFormInput
                                type="text"
                                name="slug"
                                className={errors.slug ? "is-invalid" : ""}
                                value={post.slug}
                                onFocus={(e) => setErrors({ ...errors, [e.target.name]: "" })}
                                onChange={e => setPost({ ...post, slug: e.target.value })}
                            />
                            <div className="invalid-feedback">{errors.slug}</div>
                        </CCol>
                    </CForm>
                </CCol>
            </CRow>
            <hr />

            <CNav variant="tabs" role="tablist">
                {steps.map((step, index) => {
                    return (
                        <CNavItem key={index}>
                            <CNavLink
                                active={step.id == activeStep}
                                onClick={() => setActiveStep(step.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {`Step ${index + 1}`}
                            </CNavLink>
                        </CNavItem>
                    );
                })}

                <CNavItem>
                    <CNavLink style={{ cursor: "pointer" }} onClick={addNewStep}>
                        <CIcon
                            icon={cibAddthis}
                            size="lg"
                            style={{ color: "" }}
                        />
                    </CNavLink>
                </CNavItem>
            </CNav>
            <hr />
            <CContainer>
                <CRow>
                    <CCol md={8}>
                        <CTabContent>
                            {steps.map((step, index) => {
                                return (
                                    <CTabPane
                                        key={index}
                                        role="tabpanel"
                                        aria-labelledby="contact-tab"
                                        visible={step.id == activeStep}
                                    >
                                        <CRow>
                                            <CFormInput
                                                type="text"
                                                name="step-title"
                                                placeholder={`Step ${index + 1}`}
                                                value={step.title}
                                                onChange={e => setSteps(steps.map(step2 => step2.id == step.id ? { ...step2, title: e.target.value } : step2))}
                                            />
                                        </CRow>
                                        <br />
                                        <CRow>

                                            <CKEditor
                                                initData={steps.length}
                                                // onInstanceReady={(e) => { // }}
                                                config={editorConfig}
                                                editorUrl={editorConfig.editorUrl}
                                                name={`content_of_${step.id}`}
                                            />
                                        </CRow>  </CTabPane>
                                );
                            })}
                        </CTabContent>
                    </CCol>


                    <CCol md={4}>
                        <CCard>
                            <CCardHeader>Feature Image</CCardHeader>
                            <CCardBody>
                                <ReactImagePickerEditor
                                    config={{
                                        borderRadius: "8px",
                                        border: "1px",
                                        objectFit: "fill",
                                        width: "100%",
                                    }}
                                    imageSrcProp={post.image}
                                    imageChanged={imgDataUrl => setPost({ ...post, image: imgDataUrl })}
                                />
                            </CCardBody>
                        </CCard>

                        <CCard className="my-3">
                            <CCardHeader>Categories</CCardHeader>
                            <CCardBody>
                                <CheckboxTree
                                    nodes={categories.map(category => ({ value: category.id, label: category.name }))}
                                    checked={post.categories}
                                    onCheck={(checked) => setPost({ ...post, categories: checked })}
                                    icons={{
                                        check: <CIcon icon={cilCheckCircle} />,
                                        uncheck: <CIcon icon={cilCircle} />,
                                        leaf: "",
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                        <CCard>
                            <CCardHeader>Tags</CCardHeader>
                            <CCardBody>
                                <CreatableSelect
                                    options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                                    value={post.tags}
                                    onChange={(e) => setPost({ ...post, tags: e })}
                                    isMulti
                                    isClearable={false}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            border: "none"
                                        }),
                                        backgroundColor: "red"
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>

            <CRow>
                <CCol align="end" className="mb-2">
                    <CButton color="primary" disabled={posting} onClick={savePost}>Save</CButton>
                </CCol>
            </CRow>
        </>
    );
};

export default Creator;

//     .stepCloser {
//     position: absolute;
//     z-index: 9999;
//     margin-top: -40px;
//     margin-left: 60px;
//     display: none;
//   }

//   .nav-item .stepCloser:hover {
//     display: inline;
//   }
