import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    practice: '',
  });
  const [practices, setPractices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPractices = async () => {
      const snapshot = await firestore.collection('practices').get();
      const practices = snapshot.docs.map((doc) => doc.data());
      setPractices(practices);
    };
    fetchPractices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      await firestore.collection('users').doc(user.uid).set({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        practice: formData.practice,
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        practice: '',
      });
      navigate('/signin');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await auth.signInWithPopup(provider);

      await firestore.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        role: 'patient',
      });

    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="patient">Patient</option>
          <option value="practitioner">Practitioner</option>
          <option value="doctor">Doctor</option>
        </select>
        {(formData.role === 'doctor' || formData.role === 'practitioner') && (
          <select name="practice" value={formData.practice} onChange={handleChange}>
            <option value="">Select Practice</option>
            {practices.map((practice) => (
              <option key={practice.id} value={practice.id}>
                {practice.name}
              </option>
            ))}
          </select>
        )}
        <button type="submit">Sign Up</button>
        <button onClick={signUpWithGoogle}>Sign Up with Google</button>
      </form>
      <p>Already registered? <a href="/signin">Sign In</a></p>
    </div>
  );
}

export default SignUp;