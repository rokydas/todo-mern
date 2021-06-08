import axios from 'axios';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../../App';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
};

const UpdateBox = ({ modalIsOpen, setIsOpen, data, setData, isUpdate, setNeedUpdate, needUpdate }) => {
    Modal.setAppElement('#root');
    const { title, description, _id } = data;
    // const [user, setUser] = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [imgUrl, setImgUrl] = useState('');
    const [isButtonDisable, setIsButtonDisable] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        setIsButtonDisable(true);
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    const handleBlur = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdate) {
            const newData = data;
            newData.img = imgUrl;
            setData(newData);
            fetch(`http://localhost:5000/update/${_id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    closeModal();
                    setNeedUpdate(!needUpdate);
                })
        }
        else {
            const newData = data;
            newData.email = user.email;
            newData.img = imgUrl;
            setData(newData);
            fetch('http://localhost:5000/addTodo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(dt => {
                    closeModal();
                    // const newTodos = [...todos];
                    // newTodos.push(data);
                    // setTodos(newTodos);
                    setNeedUpdate(!needUpdate);
                })
        }
    }

    const handleFileUpload = (e) => {
        const img = e.target.files[0];
        const imgData = new FormData();
        imgData.set('key', '581609e5984e8e8baec2e82e64c0eba5');
        imgData.append('image', img);

        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(res => {
                setImgUrl(res.data.data.display_url);
                setIsButtonDisable(false);
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 className="text-center">{isUpdate ? 'Update todo' : 'Add todo'}</h2><br />
                <form onSubmit={handleSubmit}>
                    <h4>Title</h4>
                    <input className="form-control" onBlur={handleBlur} type="text" defaultValue={title} name="title" required /> <br />
                    <h4>Description</h4>
                    <textarea rows="5" className="form-control" onBlur={handleBlur} type="text" defaultValue={description} name="description" required /><br />
                    <input type="file" onChange={handleFileUpload} /> <br /> <br /><br />
                    <button disabled={isButtonDisable} className="btn btn-primary">{isUpdate ? 'Update' : 'Add'}</button>
                </form>
            </Modal>
        </div>
    );
};

export default UpdateBox;