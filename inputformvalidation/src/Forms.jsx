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

  const [formData, setData] = useState(() => {
    let save = localStorage.getItem("form");
    return JSON.parse(save) || [];
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formData));
  }, [formData]);

  const skillSet = ['HTML', 'CSS', 'JAVASCRIPT', 'REACT','REACT_NATIVE'];

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
      setDetails((prev) => ({ ...prev, picture: URL.createObjectURL(files[0]) }));
    } else {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!detail.name.trim()) newErrors.name = 'Name is required';
    else if (detail.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!detail.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(detail.email)) newErrors.email = 'Email is invalid';

    if (!detail.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(detail.phone)) newErrors.phone = 'Phone must be a 10-digit number';

    if (!detail.gender) newErrors.gender = 'Gender is required';

    if (detail.skills.length === 0) newErrors.skills = 'At least one skill must be selected';

    if (!detail.picture) newErrors.picture = 'Picture is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setData([...formData, detail]);
    setDetails({
      name: '',
      email: '',
      phone: '',
      gender: '',
      skills: [],
      picture: null,
    });
    setErrors({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="name" value={detail.name} placeholder="Enter the name" onChange={handleChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={detail.email} placeholder="Enter the email" onChange={handleChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={detail.phone} placeholder="Enter the phone" onChange={handleChange} />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>

        <div>
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="Male" onChange={handleChange} checked={detail.gender === 'Male'} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" onChange={handleChange} checked={detail.gender === 'Female'} /> Female
          </label>
          {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
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
          {errors.skills && <p style={{ color: 'red' }}>{errors.skills}</p>}
        </div>

        <div>
          <label>Picture:</label>
          <input type="file" accept="image/*" name="picture" onChange={handleChange} />
          {errors.picture && <p style={{ color: 'red' }}>{errors.picture}</p>}
        </div>

        <input type="submit" value="Submit" />
      </form>

      <div className="details">
        <h2>Submitted Form Details</h2>
        {formData.map((item, index) => (
          <div className="card" key={index}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Skills:</strong> {item.skills.join(', ')}</p>
            {item.picture && (
              <div>
                <strong>Picture:</strong><br />
                <img src={item.picture} alt="User Upload" style={{ width: '100px', height: '100px' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;