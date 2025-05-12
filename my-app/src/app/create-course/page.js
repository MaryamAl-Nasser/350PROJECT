'use client';

import { useState } from 'react';
import styles from './create.module.css'

export default function CreateCoursePage() {
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    credits: 3,
    year: new Date().getFullYear(),
    semester: 'Spring',
    instructor: '',
    prerequisites: []
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrerequisiteChange = (e) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({ ...prev, prerequisites: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
   

    setSuccessMessage(`Course "${formData.title}" created successfully!`);
    setShowSuccess(true);
    
   
    setTimeout(() => {
      setFormData({
        title: '',
        category: '',
        credits: 3,
        year: new Date().getFullYear(),
        semester: 'Spring',
        instructor: '',
        prerequisites: []
      });
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
     <main className={styles.main}>
      <h2 className={styles.sectionTitle}>
        Create New Course
      </h2></main>

      {showSuccess && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        {/* Course Title */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="title" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Course Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Course Title"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Category */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="category" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="">Programming</option>
             <option value="">Backend</option>
             <option value="">Computer Science</option>
             <option value="">Databases</option>
             <option value="">Frontend</option>

          </select>
        </div>

        {/* Credits */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="credits" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Credits:
          </label>
          <input
            type="number"
            id="credits"
            name="credits"
            min="1"
            max="6"
            value={formData.credits}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Year */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="year" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Year:
          </label>
          <input
            type="number"
            id="year"
            name="year"
            min="2020"
            max="2030"
            value={formData.year}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Semester */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="semester" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Semester:
          </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="Spring">Spring</option>
            <option value="Fall">Fall</option>
            <option value="Summer">Summer</option>
          </select>
        </div>

        {/* Instructor */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="instructor" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Instructor:
          </label>
          <select
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            
                       <option value="Dr. Ahmed"> Kari Casper</option>
                       <option value="Dr. Ahmed"> Myra Jerde</option>
                       <option value="Dr. Ahmed"> Ruben Cormier</option>
                       <option value="Dr. Ahmed"> Ms. Bernice Emard</option>
                       <option value="Dr. Ahmed"> Dr. Wallace Stamm</option>
                       <option value="Dr. Ahmed"> Jane MacGyver</option>
                       <option value="Dr. Ahmed"> Dave Will</option>
                       <option value="Dr. Ahmed"> Gayle Satterfield</option>
                       <option value="Dr. Ahmed"> Christie Funk</option>
                       <option value="Dr. Ahmed"> Mr. Ken Lubowitz</option>
                       <option value="Dr. Ahmed"> Jesus Gottlieb-Wisoky</option>
                       <option value="Dr. Ahmed"> Ms. Christine Denesik</option>
                       <option value="Dr. Ahmed"> Mr. Santiago Yost</option>
                       <option value="Dr. Ahmed"> Elbert Cassin</option>
                       <option value="Dr. Ahmed"> Sam Pouros </option>
                       <option value="Dr. Ahmed"> Everett Rogahn</option>
                       <option value="Dr. Ahmed"> Annie Rath</option>
                       <option value="Dr. Ahmed"> Madeline Mosciski</option>
                       <option value="Dr. Ahmed"> Alonzo Lind</option>
                       <option value="Dr. Ahmed"> Dr. Daryl O'Keefe PhD</option>
            
          </select>
        </div>

        {/* Prerequisites */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="prerequisites" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Prerequisites:
          </label>
          <select
            id="prerequisites"
            name="prerequisites"
            multiple
            value={formData.prerequisites}
            onChange={handlePrerequisiteChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              height: '100px'
            }}
          >
            <option value="Web Development">Web Development (Programming)</option>
            <option value="Data Structures">Data Structures (Programming)</option>
            <option value="Database Systems">Database Systems (Databases)</option>
            <option value="Networks">Networks (Networking)</option>
            <option value="Linear Algebra">Nextjs</option>
            <option value="Linear Algebra">React</option>
            <option value="Linear Algebra">java</option>
            <option value="Machine Learning">Machine Learning (AI)</option>
          </select>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 20px',
              backgroundColor: '#90143c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Create Course
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              padding: '12px 20px',
              backgroundColor: '#2d0814',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}