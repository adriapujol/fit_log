import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase';
import ExercisesList from '../exercises.json';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then(() => {
            let workouts = [];
            db.collection(`test/${auth.currentUser.uid}/data/`).doc('workouts').set({
                workouts
            });
            let exercises = [...ExercisesList];
            db.collection(`test/${auth.currentUser.uid}/data/`).doc('exercises').set({
                exercises
            });
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function deleteUser() {
        // const userToDelete = auth.currentUser;
        return currentUser.delete();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return () => { unsubscribe() };

    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        deleteUser
    }

    return (

        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
