import React, { useEffect, useState } from "react";
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

const Creator = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [post, setPost] = useState({
        title: "",
        slug: "",
        categories: [],
        tags: [],
        // image: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg"
        image: "data:image/jpeg;base64,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"
    });
    const [steps, setSteps] = useState([{ id: new Date().getTime(), title: "", content: "" }]);
    const [activeStep, setActiveStep] = useState(1);
    const [catExpanded, setCatExpanded] = useState([]);
    const [errors, setErrors] = useState({});
    const [updatedAt, setUpdatedAt] = useState();

    useEffect(() => {
        api.get(`category`).then(res => setCategories(res.data)).catch((err) => setErrors(err.response.data.errors));
        api.get(`tag`).then(res => setTags(res.data)).catch(err => setErrors(err.response.data.errors));
    }, [updatedAt]);

    const addNewStep = () => {
        setSteps([
            ...steps,
            {
                id: new Date().getTime(),
                title: "",
                content: "",
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

    const savePost = () => {
        api.post(`post`, {
            ...post,
            tags: post.tags.map((tag) => tag.label)
        }).then(res => {
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
            setErrors({});
            setUpdatedAt(Date.now());
        }).catch(err => { 
            setErrors(err.response.data.errors);
            console.log(err);
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
                    <CNavLink>
                        <CIcon
                            icon={cibAddthis}
                            size="lg"
                            style={{ color: "" }}
                            onClick={addNewStep}
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
                                        {step.content}
                                    </CTabPane>
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
                                    expanded={catExpanded}
                                    onCheck={(checked) => setPost({ ...post, categories: checked })}
                                    icons={{
                                        check: <CIcon icon={cilCheckCircle} />,
                                        uncheck: <CIcon icon={cilCircle} />,
                                        leaf: "",
                                    }}
                                    onExpand={(expanded) => setCatExpanded(expanded)}
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
                    <CButton color="primary" onClick={savePost}>Save</CButton>
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
