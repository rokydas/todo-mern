import React from 'react';

const Todo = ({ todo, openModal, setData, setIsUpdate, needUpdate, setNeedUpdate }) => {
    const { title, description, _id, img } = todo;

    const handleUpdateTodo = () => {
        setData(todo);
        setIsUpdate(true);
        openModal();
    }

    const handleDeleteTodo = () => {
        fetch(`http://localhost:5000/delete/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => setNeedUpdate(!needUpdate))
    }

    return (
        <div className="col-md-4">
            <div className="shadow p-5 rounded mb-2">
                <img className="img-fluid" src={img} alt="" />
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={handleUpdateTodo} className="btn btn-primary me-3">Update</button>
                <button onClick={handleDeleteTodo} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default Todo;