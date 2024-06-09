import React, { useState } from "react";
import './todo.css';
const Todo = () => {
  const [showForm, setShowForm] = useState(true);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [items, setItems] = useState([
    {
      id: "001",
      name: "Default Task",
      desc: "Default Description",
      status: false,
    },
  ]);

  // HANDLING INPUT FIELDS
  const handleInput = (e) => {
    setInputTitle(e.target.value);
  };

  const handleInputDesc = (e) => {
    setInputDesc(e.target.value);
  };

  // SUBMITTING FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputTitle || !inputDesc) {
      alert("Please fill in all fields");
    } else if (inputTitle && !toggleSubmit) {
      setItems((prevItems) =>
        prevItems.map((elem) =>
          elem.id === isEditItem
            ? { ...elem, name: inputTitle, desc: inputDesc }
            : elem
        )
      );
      setInputTitle("");
      setInputDesc("");
      setToggleSubmit(true);
      setShowForm(false);
    } else {
      const allInputTitle = {
        id: new Date().getTime().toString(),
        name: inputTitle,
        desc: inputDesc,
      };
      setItems([allInputTitle, ...items]);
      setInputTitle("");
      setInputDesc("");
      setShowForm(false);
    }
  };

  // DELETE
  const handleDelete = (id) => {
    const updatedItems = items.filter((elem) => elem.id !== id);
    setItems(updatedItems);
  };

  // EDIT
  const handleEdit = (id) => {
    setShowForm(true);
    setToggleSubmit(false);
    setIsEditItem(id);
    const newEditItem = items.find((elem) => elem.id === id);
    setInputTitle(newEditItem.name);
    setInputDesc(newEditItem.desc);
  };

  // ADD NEW TASK
  const handleAdd = () => {
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="col-12 text-end">
        <button className="btn btn-primary" onClick={handleAdd}>
          New
        </button>
      </div>
      {showForm && (
        <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="text-center">
              <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
            </div>
            <form className="col-12 p-2" onSubmit={handleSubmit}>
              <label htmlFor="title" className="my-2">
                Enter Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                className="w-100 my-1 p-2"
                onChange={handleInput}
                value={inputTitle}
              />
              <label className="my-2" htmlFor="description">
                Enter Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                className="w-100 my-1 p-2"
                onChange={handleInputDesc}
                value={inputDesc}
              />
              <button className="btn btn-primary my-2">
                {toggleSubmit ? "Save" : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="container py-2">
        {items.map((elem) => (
          <div
            className="row border rounded shadow p-3 mb-3 bg-white rounded p-2"
            key={elem.id}
          >
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div>
                <h4>{elem.name}</h4>
                <p>{elem.desc}</p>
              </div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => handleEdit(elem.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => handleDelete(elem.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
