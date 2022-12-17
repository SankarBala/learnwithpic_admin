import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import api from "src/api";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilSave, cilTrash } from "@coreui/icons";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [updatedAt, setUpdatedAt] = useState();
  const [errors, setErrors] = useState({ name: "" });
  const [editingTag, setEditingTag] = useState({ name: "" });

  useEffect(() => {
    api
      .get("tag")
      .then((res) => {
        if (res.data.length > 0) {
          setTags(res.data);
        } else {
          setTags([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updatedAt]);

  useEffect(() => {
    setErrors({ name: "" });
  }, [newTag]);

  const createTag = () => {
    newTag.trim() !== ""
      ? api
        .post(`tag`, {
          name: newTag,
        })
        .then((res) => {
          // setErrors({ name: "" });
          setUpdatedAt(Date.now());
        })
        .catch((err) => {
          setErrors(err.response.data.errors);
        })
      : setErrors({ name: "The name field is required" });
  };


  const updateTag = () => {
    editingTag.name.trim() !== ""
      ? api
        .put(`tag/${editingTag.slug}`, {
          ...editingTag
        })
        .then((res) => {
          setEditingTag({});
          setUpdatedAt(Date.now());
        })
        .catch((err) => {
          setErrors(err.response.data.errors);
        })
      : alert("Empty value");
  };

  const deleteTag = (tag) => {
    api
      .delete(`tag/${tag}`)
      .then((res) => {
        setUpdatedAt(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CRow>
        <CCol md>
          <CForm className="row g-3">
            <CCol md>
              <label className="form-label">Tag Name</label>
              <CFormInput
                type="text"
                name="name"
                placeholder="Tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className={errors.name ? "is-invalid" : ""}
              />
              <div className="invalid-feedback">{errors.name}</div>
            </CCol>
            <CCol md align="end">
              <label className="form-label">&nbsp;</label>
              <div className="d-flex">
                <CFormInput
                  type="button"
                  value="Create"
                  className="bg-info w-50"
                  onClick={createTag}
                />
              </div>
            </CCol>
          </CForm>
        </CCol>
      </CRow>
      <hr />

      <CRow>
        {tags.map((tag) => {
          return (
            <CCol className="" md={4} key={tag.id}>
              <CInputGroup className="my-1">
                <CInputGroupText> {tag.posts.length} </CInputGroupText>
                <CFormInput
                  defaultValue={tag.name}
                  disabled={editingTag.slug !== tag.slug}
                  onChange={(e) =>
                    setEditingTag({ ...editingTag, name: e.target.value })
                  }
                />
                {editingTag.slug !== tag.slug ? (
                  <CButton
                    type="button"
                    color="secondary"
                    variant="outline"
                    onClick={() => setEditingTag(tag)}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                ) : (
                  <CButton
                    type="button"
                    color="secondary"
                    variant="outline"
                    onClick={updateTag}
                  >
                    <CIcon icon={cilSave} />
                  </CButton>
                )}

                <CButton
                  type="button"
                  color="secondary"
                  variant="outline"
                  onClick={() => deleteTag(tag.slug)}
                >
                  <CIcon icon={cilTrash} />
                </CButton>
              </CInputGroup>
            </CCol>
          );
        })}
        <CCol> {tags.length < 1 ? "No tag created yet." : ""}</CCol>
      </CRow>
    </>
  );
};

export default Tags;
