import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from './firebaseConfig';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchHabits(user.uid);
        fetchNotifications(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const register = async (email, password, name) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });
      setUser(user);
      return {success: true, data: user}
    } catch (e) {
      console.error("Error registering user: ", e);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error("Error logging in: ", e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Error logging out: ", e);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.error("Error sending password reset email: ", e);
    }
  };

  const addHabit = async (habit) => {
    try {
      const habitRef = await addDoc(collection(db, 'habits'), habit);
      setHabits((prev) => [...prev, { id: habitRef.id, ...habit }]);
    } catch (e) {
      console.error("Error adding habit: ", e);
    }
  };

  const fetchHabits = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'habits'));
      const userHabits = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(habit => habit.userId === userId);
      setHabits(userHabits);
    } catch (e) {
      console.error("Error fetching habits: ", e);
    }
  };

  const updateHabit = async (habitId, habit) => {
    try {
      await updateDoc(doc(db, 'habits', habitId), habit);
      setHabits((prev) => prev.map(h => h.id === habitId ? { ...h, ...habit } : h));
    } catch (e) {
      console.error("Error updating habit: ", e);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await deleteDoc(doc(db, 'habits', habitId));
      setHabits((prev) => prev.filter(h => h.id !== habitId));
    } catch (e) {
      console.error("Error deleting habit: ", e);
    }
  };

  const addNotification = async (notification) => {
    try {
      const notificationRef = await addDoc(collection(db, 'notifications'), notification);
      setNotifications((prev) => [...prev, { id: notificationRef.id, ...notification }]);
    } catch (e) {
      console.error("Error adding notification: ", e);
    }
  };

  const fetchNotifications = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notifications'));
      const userNotifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(notif => notif.userId === userId);
      setNotifications(userNotifications);
    } catch (e) {
      console.error("Error fetching notifications: ", e);
    }
  };

  const savePushToken = async (userId, token) => {
    try {
      await setDoc(doc(db, 'users', userId), { pushToken: token }, { merge: true });
    } catch (e) {
      console.error('Error saving push token: ', e);
    }
  };
  
  return (
    <FirebaseContext.Provider value={{
      user, habits, notifications,
      register, login, logout, forgotPassword,
      addHabit, fetchHabits, updateHabit, deleteHabit,
      addNotification, fetchNotifications, savePushToken
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
