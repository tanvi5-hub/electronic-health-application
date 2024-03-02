import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './SignUp-SignIn.css';

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
          navigate('/PatientDashboard');
          break;
        case '2':
          navigate('/DoctorDashboard');
          break;
        case '3':
          navigate('/PractitionerDashboard');
          break;
        case '4':
          navigate('/AdminDashboard');
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
    <div className="card-container">
      <div className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            <label>Select Role:</label>
            <select name="role" id="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="1">Patient</option>
              <option value="2">Doctor</option>
              <option value="3">Practitioner</option>
              <option value="4">Admin</option>
            </select>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
