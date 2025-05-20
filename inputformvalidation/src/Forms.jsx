import React, { useEffect, useState } from 'react';

const Forms = () => {
  const [detail, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    skills: [],
    picture: null,
  });
  const [formData,setData]=useState(()=>{
    let save=localStorage.getItem("form")
    return JSON.parse(save) || [];
  })
  useEffect(()=>{
    localStorage.setItem("form",JSON.stringify(formData))
  },[formData])

  const skillSet = ['HTML', 'CSS', 'JAVASCRIPT', 'REACT','REACT-NATIVE', 'MONGODB', 'MYSQL', 'NODE JS', 'EXPRESS JS'];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setDetails((prev) => ({
        
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else if (type === 'file') {
      setDetails((prev) => ({ ...prev, picture: files[0] }));
    } else {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...formData,detail])
    console.log('Form Data:', detail);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="name" value={detail.name} placeholder="Enter the name" onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={detail.email} placeholder="Enter the email" onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={detail.phone} placeholder="Enter the phone" onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} checked={detail.gender === 'Male'} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} checked={detail.gender === 'Female'} /> Female</label>
        </div>
        <div>
          <label>Skills:</label>
          {skillSet.map((skill, id) => (
            <label key={id}>
              <input
                type="checkbox"
                name="skills"
                value={skill}
                checked={detail.skills.includes(skill)}
                onChange={handleChange}
              />
              {skill}
            </label>
          ))}
        </div>
        <div>
          <label>Picture:</label>
          <input type="file" accept="image/*" name="picture" onChange={handleChange} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Forms;