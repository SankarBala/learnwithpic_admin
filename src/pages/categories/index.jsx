import React, { useState, useEffect } from 'react';
import api from 'src/api';


function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api('category').then((res) => {
      setCategories(res.data);
    }).catch((err) => {
      console.log(err);
    });


  }, []);

  return (
    <div>
      {categories.map((category) => {
        return <p key={category.id}>{category.name}</p>;
      })}
    </div>
  )
}

export default Categories;