import React, { useEffect, useState } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCardImage,
    CCardText,
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
    cil3d,
    cilArrowLeft,
    cilArrowRight,
    cilCaretLeft,
    cilCaretRight,
    cilCheck,
    cilCheckAlt,
    cilCheckCircle,
    cilCircle,
    cilFolder,
    cilFolderOpen,
    cilStar,
    cilStarHalf,
    cilX,
} from "@coreui/icons";
import ReactImagePickerEditor from "react-image-picker-editor";
import CreatableSelect from 'react-select/creatable';
import "react-image-picker-editor/dist/index.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import slugify from 'react-slugify';


const Creator = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [featureImage, setFeatureImage] = useState("");
    const [post, setPost] = useState({
        title: "",
        slug: "",
        categories: [],
        tags: [],
        image: "",
    });
    const [steps, setSteps] = useState([{ id: 1, title: "One", content: "Demo" }]);
    const [activeStep, setActiveStep] = useState(1);
    const [catChecked, setCatChecked] = useState([]);
    const [catExpanded, setCatExpanded] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.get(`category`).then(res => setCategories(res.data)).catch((err) => setErrors(err.response.data.errors));
        api.get(`tag`).then(res => setTags(res.data)).catch(err => setErrors(err.response.data.errors));
    }, []);

    const addNewStep = () => {
        setSteps([
            ...steps,
            {
                id: steps.length + 1,
                title: `Four ${steps.length + 1}`,
                content: `Demo ${steps.length + 1}`,
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
                                onBlur={() => { post.slug == "" ? setPost({ ...post, slug: slugify(post.title) }) : "" }}
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
                                {`${step.title}`}
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
                                    imageSrcProp={featureImage}
                                    imageChanged={imgDataUrl => setFeatureImage(imgDataUrl)}
                                />
                            </CCardBody>
                        </CCard>

                        <CCard className="my-3">
                            <CCardHeader>Categories</CCardHeader>
                            <CCardBody>
                                <CheckboxTree
                                    nodes={categories.map(category => ({ value: category.id, label: category.name }))}
                                    checked={catChecked}
                                    expanded={catExpanded}
                                    onCheck={(checked) => setCatChecked(checked)}
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
                                    // value={parents}
                                    // onChange={(e) => setParents(e)}
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
                    <CButton color="primary">Save</CButton>
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
