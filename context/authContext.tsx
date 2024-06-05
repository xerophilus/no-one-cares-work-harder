import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import { auth, db } from './firebaseConfig';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthed, setIsAuthed] = useState(undefined);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthed(true);
        fetchUser(user.uid);
      } else {
        setIsAuthed(false);
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response?.user };
    } catch (e) {
      console.log(e);
      return { success: false, msg: e.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        userId: response?.user?.uid
      });
      fetchUser(response?.user?.uid);
      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('invalid-email')) msg = 'Invalid Email';
      if (msg.includes('email-already-in-use')) msg = 'This email is already in use';
      return { success: false, msg };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "If an account with that email exists, you will receive an email shortly.");
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUser = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
        fetchHabits();
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error fetching user: ', e);
    }
  };

  const fetchHabits = async () => {
    try {
      const habitsCollection = collection(db, 'habits');
      const habitSnapshot = await getDocs(habitsCollection);
      const habitList = habitSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHabits(habitList);
    } catch (e) {
      console.error('Error fetching habits: ', e);
    }
  };

  const addHabit = async (habit) => {
    try {
      const docRef = await addDoc(collection(db, 'habits'), habit);
      setHabits(prevHabits => [...prevHabits, { id: docRef.id, ...habit }]);
    } catch (e) {
      console.error('Error adding habit: ', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthed, habits, login, register, logout, forgotPassword, fetchUser, addHabit }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be wrapped inside AuthContextProvider');
  }

  return value;
};
