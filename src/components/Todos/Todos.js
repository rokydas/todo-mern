import React, { useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import UpdateBox from '../UpdateBox/UpdateBox';

const Todos = () => {

    const [todos, setTodos] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        title: '',
        description: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const handleAddTodo = () => {
        setIsUpdate(false);
        setData({title: '', description: ''});
        openModal();
    }

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [])

    return (
        <div className="container text-center">
            <h2>Todo List</h2><br />
            <button onClick={handleAddTodo} className="btn btn-success">Add a toto</button> <br /> <br />
            <div className="row">
                {
                    todos.map(
                        todo => <Todo
                            setData={setData}
                            openModal={openModal}
                            setIsUpdate={setIsUpdate}
                            key={todo._id} todo={todo} />
                    )
                }
            </div>

            <UpdateBox
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                data={data} 
                setData={setData}
                isUpdate={isUpdate} />

        </div>
    );
};

export default Todos;