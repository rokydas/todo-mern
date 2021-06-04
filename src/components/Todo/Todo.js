import React from 'react';

const Todo = ({ todo, openModal, setData, setIsUpdate }) => {
    const { title, description, _id } = todo;

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
        .then(data => console.log(data))
    }

    return (
        <div className="col-md-4">
            <div className="shadow p-5 rounded">
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={handleUpdateTodo} className="btn btn-primary me-3">Update</button>
                <button onClick={handleDeleteTodo} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default Todo;