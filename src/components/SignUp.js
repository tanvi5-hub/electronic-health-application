import React, { useState } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router';
import { firestore } from '../firebase';
import { Timestamp } from 'firebase/firestore';
import './SignUp-SignIn.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    dateOfBirth: new Date(),
  });
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, address, dateOfBirth } = formData;

    if(password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

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

      navigate('/SignIn');
      console.log('User signed up successfully.');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleChange} 
            required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required />
            {errors.confirmPassword && <div className="error">{ errors.confirmPassword }</div>}
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input 
            type="text" 
            id="address" 
            name="address" 
            placeholder="Address" 
            value={formData.address} 
            onChange={handleChange} 
            required />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input 
            type="date" 
            id="dateOfBirth" 
            name="dateOfBirth" 
            placeholder="Date of Birth" 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
            required />
          </div>
          <button type="submit">Sign Up</button>
          <div className="mt-3 text-center">
            Already signed up? <a href="/SignIn">Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
