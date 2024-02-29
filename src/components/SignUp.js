import React, { useState } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router';
import { firestore } from '../firebase';
import { Timestamp } from 'firebase/firestore';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    dateOfBirth: new Date(),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, address, dateOfBirth } = formData;

    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const dobTimestamp = Timestamp.fromDate(new Date(dateOfBirth));

      await firestore.collection('user').doc(user.uid).set({
        user_name: name,
        user_email: email,
        user_type_id: 1,
        user_password: password,
        otp_code: '',
      });

      const patientId = firestore.collection('patient').doc().id;

      await firestore.collection('patient').doc(patientId).set({
        user_id: user.uid,
        patient_address: address,
        patient_dob: dobTimestamp,
      });

      navigate('/signIn');
      console.log('User signed up successfully.');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
