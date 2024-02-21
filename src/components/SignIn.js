import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(formData.email, formData.password);

      const userDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
      const { role } = userDoc.data();

      setFormData({
        email: '',
        password: '',
        role: '',
      });

    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);

      const userDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
      const { role } = userDoc.data();

    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="patient">Patient</option>
          <option value="practitioner">Practitioner</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Sign In</button>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </form>
      <p>Not registered yet? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default SignIn;