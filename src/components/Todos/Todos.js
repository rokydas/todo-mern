import React, { useContext, useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import UpdateBox from '../UpdateBox/UpdateBox';
// import fakeData from '../fakeData/data.json';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const Todos = () => {
    const history = useHistory();

    const [todos, setTodos] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        title: '',
        description: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);
    // const [user, setUser] = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('user')) || {};

    const openModal = () => {
        setIsOpen(true);
    }

    const handleAddTodo = () => {
        setIsUpdate(false);
        setData({title: '', description: ''});
        openModal();
    }

    const logOut = () => {
        // setUser({});
        localStorage.setItem('user', JSON.stringify({}));
        setNeedUpdate(!needUpdate);
        setTodos([]);
        history.replace('/');
        history.go(0);
    }

    const idToken = sessionStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:5000/todos/${user.email}`, {
            headers: {
                'content-type': 'application/json',
                Bearer : `Bearer ${idToken}`
            }
        })
        .then(res => res.json())
        .then(data => setTodos(data))
    }, [needUpdate])

    return (
        <div className="container text-center">
            <h2>Todo List</h2><br />
            <button onClick={handleAddTodo} className="btn btn-success mb-3">Add a toto</button> <br /> <br />
            <button onClick={logOut} className="btn btn-danger mb-3">Log out</button>
            <div className="row">
                {
                    todos.length>0 && todos.map(
                        todo => <Todo
                            setData={setData}
                            setNeedUpdate={setNeedUpdate}
                            needUpdate={needUpdate}
                            openModal={openModal}
                            setIsUpdate={setIsUpdate}
                            key={todo._id} todo={todo} />
                    )
                }
            </div>

            <UpdateBox
                modalIsOpen={modalIsOpen}
                needUpdate={needUpdate}
                setNeedUpdate={setNeedUpdate}
                setIsOpen={setIsOpen}
                data={data} 
                setData={setData}
                isUpdate={isUpdate} />

        </div>
    );
};

export default Todos;