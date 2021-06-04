import React, { useState } from 'react';
import Modal from 'react-modal';

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

const UpdateBox = ({modalIsOpen, setIsOpen, data, setData, isUpdate}) => {
    Modal.setAppElement('#root');
    const {title, description, _id} = data;

    const closeModal = () => {
        setIsOpen(false);
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    const handleBlur = (e) => {
        const newData = {...data};
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isUpdate) {
            fetch(`http://localhost:5000/update/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
        else {
            fetch('http://localhost:5000/addTodo', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
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
                    <input className="form-control" onBlur={handleBlur} type="text" defaultValue={title} name="title" required/> <br />
                    <h4>Description</h4>
                    <textarea rows="5" className="form-control" onBlur={handleBlur} type="text" defaultValue={description} name="description" required/><br />
                    <button className="btn btn-primary">{isUpdate ? 'Update' : 'Add'}</button>
                </form>
                
            </Modal>
        </div>
    );
};

export default UpdateBox;