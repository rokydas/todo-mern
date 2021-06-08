import React, { useContext, useState } from 'react';
import { firebaseConfig } from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const [error, setError] = useState('');
    // const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { email, displayName } = result.user;
                const newUser = { email, displayName };
                // setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                verifyToken();
                history.replace('/');
            }).catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    const verifyToken = () => {
        firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
    }

    return (
        <div className="mt-5  text-center">
            <button onClick={handleGoogleSignIn} className="btn btn-primary mb-3">Login with Google Mama</button>
            <p className="text-danger">{error}</p>
        </div>
    );
};

export default Login;