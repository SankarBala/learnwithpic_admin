import React from 'react'
import Select from 'react-select'

function CreateCategory() {

  const colourOptions =
    [
      { value: 11, label: "00one" },
      { value: 22, label: "00two" },
      { value: 32, label: "00three" },
      { value: 42, label: "00four" },
    ];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <div>
      {/* <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={0}
        isSearchable={true}
        isMulti={true}
        name="color"
        defaultValue={
          [
            { id: 1, label: "one" },
            { id: 2, label: "two" },
            { id: 3, label: "three" }
          ]
        }
        // onChange={onChildrenChange}
        options={
          [
            { id: 11, label: "00one" },
            { id: 22, label: "00two" },
            { id: 32, label: "00three" },
            { id: 42, label: "00four" },
          ]
        }
      /> */}


      <Select
        isMulti
        options={colourOptions}
        // defaultValue={[colourOptions[2], colourOptions[3]]}
      
      />
      <Select isMulti options={options} />

    </div>
  )
}

export default CreateCategory