import axios from 'axios';
import { useState } from 'react';

export default function ResumeForm({ setResume, setSuggestions }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: '',
    image: '',
  });
  const [projects, setProjects] = useState([{ title: '', description: '' }]);
  const [education, setEducation] = useState([{ level: '', cgpa: '' }]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const reader = new FileReader();
      reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleProjectChange = (index, field, value) => {
  const updatedProjects = [...projects];
  updatedProjects[index][field] = value;
  setProjects(updatedProjects);
  };

  const addProject = () => {
  setProjects([...projects, { title: '', description: '' }]);
  };

  const handleEducationChange = (index, field, value) => {
  const updatedEdu = [...education];
  updatedEdu[index][field] = value;
  setEducation(updatedEdu);
  };

  const addEducation = () => {
  setEducation([...education, { level: '', cgpa: '' }]);
  };

  const handleSubmit = async () => {
  const formatted = {
    ...form,
    education,
    projects,
    skills: form.skills.split(','),
    experience: form.experience.split('\n'),
  };
  setResume(formatted);

  try {
    await axios.post(`${import.meta.env.VITE_API_BASE}/resume`, formatted);
    const res = await axios.post(`${import.meta.env.VITE_API_BASE}/ai/suggest`, formatted);
    setSuggestions(res.data.suggestions);
  } catch (err) {
    if (err.response?.status === 413) {
      alert("Image too large. Please upload a smaller image.");
    } else {
      alert("Something went wrong. Try again.");
      console.error(err);
    }
  }
};

  return (
    <div className="resume-form-wrapper">
      <h2>Smart Resume Builder</h2>

      <div className="form-grid">
        <div>
          <label>Full Name</label>
          <input name="name" onChange={handleChange} className="w-full p-2 border rounded" type="text" />
        </div>
        <div>
          <label>Email</label>
          <input name="email" onChange={handleChange} className="w-full p-2 border rounded" type="text" />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" onChange={handleChange} className="w-full p-2 border rounded" type="text"/>
        </div>
        <div>
          <label>Upload Photo</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div className='full-width'>
          <label className="font-semibold text-gray-700">Professional Summary</label>
          <textarea
            name="summary"
            rows={3}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Education Section */}
        <div className="full-width">
          <label className="font-semibold text-gray-700">Education</label>
          {education.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Education Level"
                className="w-1/2 p-2 border rounded"
                value={item.level}
                onChange={(e) => handleEducationChange(index, 'level', e.target.value)}
              />
              <input
                type="text"
                placeholder="CGPA"
                className="w-1/2 p-2 border rounded"
                value={item.cgpa}
                onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
              />
            </div>
          ))}
          <button onClick={addEducation} className="add-btn" type='button'>+ Add More</button>
        </div>

        {/* Skills */}
        <div className="full-width">
          <label>Skills (comma separated)</label>
          <textarea
            name="skills"
            rows={2}
            onChange={handleChange}
          />
        </div>

        {/* Experience */}
        <div className="full-width">
          <label>Experience (separate lines)</label>
          <textarea
            name="experience"
            rows={5}
            onChange={handleChange}
          />
        </div>

        {/* Projects */}
        <div className="full-width">
          <label>Projects</label>
          {projects.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Project Title"
                className="w-full p-2 border rounded mb-1"
                value={item.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              />
              <textarea
                placeholder="Project Description"
                rows={2}
                className="w-full p-2 border rounded"
                value={item.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
          <button onClick={addProject} type="button" className="add-btn">+ Add Project</button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded block mx-auto"
      >
        Generate Resume & Suggestions
      </button>
    </div>
  );
}
