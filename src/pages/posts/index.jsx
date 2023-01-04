import React, { useState, useEffect } from "react";
import api from "src/api";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);

  const post = (e) => {
    e.preventDefault();

    api.post(`http://localhost:8000/file-manager/upload`, {
      title: title,
      files: [...files]
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => console.log(res)).catch(err => console.log(err));


  }
  // action="http://localhost:8000/file-manager/upload" method="post" encType="multipart/form-data
  return (
    <>
      <form>
        <input type="text" name="title" id="" onChange={(e) => setTitle(e.target.value)} />
        <input type="file" name="files[]" id="fileInput" accept="image/*" multiple onChange={e => setFiles(e.target.files)} />
        <input type="button" value="upload" onClick={post} />
      </form>
    </>
  );
};

export default Posts;

