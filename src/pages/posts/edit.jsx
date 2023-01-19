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
    cilXCircle,
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
import { useNavigate, useParams } from "react-router-dom";


const Editor = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [post, setPost] = useState({
        title: "",
        slug: "",
        categories: [],
        tags: [],
        image: "",
        imageData: ""
    });
    // const [steps, setSteps] = useState([{ id: `step_id_${new Date().getTime()}`, title: "" }]);
    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(steps[0]?.id);
    const [errors, setErrors] = useState({ title: "", slug: "" });
    const [updatedAt, setUpdatedAt] = useState();
    const [posting, setPosting] = useState(false);
    const [mouseOverStep, setMouseOverStep] = useState(null);
    const params = useParams();
    const visit = useNavigate();

    useEffect(() => {
        api.get(`just-categories`).then(res => setCategories(res.data)).catch((err) => setErrors(err.response.data.errors));
        api.get(`just-tags`).then(res => setTags(res.data)).catch(err => setErrors(err.response.data.errors));
    }, [updatedAt]);

    useEffect(() => {
        api.get(`post/${params.slug}`)
            .then(res => {
                setPost({ ...post, ...res.data, categories: res.data.categories.map(cat => cat.id) });
                setSteps([...res.data?.steps]);
                setActiveStep(res.data?.steps[0]?.id);
            }).catch(err => console.log(err));
    }, []);



    const addNewStep = () => {
        const newStepId = `step_id_${new Date().getTime()}`;
        setSteps([
            ...steps,
            {
                id: newStepId,
                title: ""
            },
        ]);
        setActiveStep(newStepId);
    };

    const removeStep = (removableStep) => {
        setSteps(
            steps.filter((step) => {
                return step.id !== removableStep;
            })
        );
        removableStep == activeStep && setActiveStep(steps[0].id);
    };

    const updatePost = (e) => {

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
        const postablesteps = steps.map(step => ({ id: step.id, title: step.title, content: CKEDITOR.instances[`content_of_step_id_${step.id}`].getData() }));

        api.put(`post/${params.slug}`, { ...post, imageData: null, steps: postablesteps }).then(res => {

            setPosting(false);
            setErrors({});
            visit(`/post/edit/${post.slug}`);
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
                        <CNavItem
                            key={`tab_${index}`}
                        >
                            <div
                                style={{
                                    position: "relative"
                                }}
                                onMouseEnter={() => { setMouseOverStep(step?.id) }}
                                onMouseLeave={() => { setMouseOverStep(null) }}
                            >
                                <CNavLink
                                    active={step.id == activeStep}
                                    onClick={() => setActiveStep(step?.id)}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    {`Step ${step?.id?.toString().slice(-2)}`}
                                </CNavLink>
                                <CIcon
                                    icon={cilXCircle}
                                    size="sm"
                                    hidden={mouseOverStep !== step?.id}
                                    style={{
                                        color: "maroon",
                                        margin: 0,
                                        cursor: "pointer",
                                        position: "absolute",
                                        right: "1px",
                                        top: "-5px",
                                        padding: "0px",
                                        height: "30px",
                                        borderRadius: "100px"
                                    }}
                                    onClick={() => removeStep(step?.id)}

                                />
                            </div>

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
                                        key={`pane_${index}`}
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
                                                initData={step.content}
                                                // onInstanceReady={(e) => { console.log(e) }}
                                                config={editorConfig}
                                                editorUrl={editorConfig.editorUrl}
                                                name={`content_of_step_id_${step.id}`}
                                            />
                                        </CRow>
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
                                    imageSrcProp={post.imageData}
                                    imageChanged={imgDataUrl => { setPost({ ...post, image: imgDataUrl, imageData: imgDataUrl }) }}
                                />
                            </CCardBody>
                        </CCard>

                        <CCard className="my-3">
                            <CCardHeader>Categories</CCardHeader>
                            <CCardBody>
                                <CheckboxTree
                                    nodes={categories.map(category => ({ value: category.id, label: category.name }))}
                                    checked={[...post.categories]}
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
                                    value={post.tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                                    // onChange={(e) => setPost({ ...post, tags: e })}
                                    onChange={(selected) => setPost({ ...post, tags: selected.map((tag) => ({ id: tag.value, name: tag.label })) })}
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
                <CCol align="end" className="m-4">
                    <CButton color="primary" disabled={posting} onClick={updatePost}>Update</CButton>
                </CCol>
            </CRow>
        </>
    );
};

export default Editor;

