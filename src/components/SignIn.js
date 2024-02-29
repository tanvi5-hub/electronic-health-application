import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    try {
      await signInWithEmailAndPassword(firebase.auth(), email, password);

      switch (role) {
        case '1':
          navigate('/patientDashboard');
          break;
        case '2':
          navigate('/doctorDashboard');
          break;
        case '3':
          navigate('/practitionerDashboard');
          break;
        case '4':
          navigate('/adminDashboard');
          break;
        default:
          console.error('Invalid role selected');
      }

      console.log('User signed in successfully.');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="1">Patient</option>
        <option value="2">Doctor</option>
        <option value="3">Practitioner</option>
        <option value="4">Admin</option>
      </select>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
