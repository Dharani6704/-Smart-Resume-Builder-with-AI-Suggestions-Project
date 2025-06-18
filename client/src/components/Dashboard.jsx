import { useEffect, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import '../layout.css';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE}/resume`);
    const uniqueResumes = Array.from(new Map(res.data.map(item => [item._id, item])).values());
    setResumes(uniqueResumes);

  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE}/resume/${id}`);
    fetchResumes();
  };
  const handleEdit = (resume) => {
  setEditingId(resume._id);
  setEditForm({
    name: resume.name,
    email: resume.email,
    phone: resume.phone || '',
    image: resume.image || '',
    summary: resume.summary || '',
    education: (resume.education || []).map(e => `${e.level} - ${e.cgpa} CGPA`).join('\n') || '',
    skills: resume.skills?.join(', ') || '',
    experience: resume.experience?.join('\n') || '',
    projects: (resume.projects || []).map(p => `${p.title}: ${p.description}`).join('\n') || '',
  });
};
const handleUpdate = async () => {
  const educationList = (editForm.education || '').split('\n').map(e => {
      const [level, cgpa] = e.split('-').map(part => part.trim());
      return { level, cgpa: cgpa?.replace(/CGPA/i, '').trim() };
    });

    const projectsList = (editForm.projects || '').split('\n').map(p => {
      const [title, ...descParts] = p.split(':');
      return {
        title: title?.trim() || '',
        description: descParts.join(':').trim() || ''
      };
    });
  const updated = {
    ...editForm,
    name: editForm.name || '',
    email: editForm.email || '',
    phone: editForm.phone || '',
    image: editForm.image || '',
    summary: editForm.summary || '',
    education: educationList,
    skills: editForm.skills?.split(',').map((s) => s.trim()),
    experience: editForm.experience?.split('\n'),
    projects: projectsList,
  };
  try{
  await axios.put(`${import.meta.env.VITE_API_BASE}/resume/${editingId}`, updated);
  setEditingId(null);
  setEditForm({});
  fetchResumes();
  } catch (error) {
    console.error('Update failed:', error);
    alert('Something went wrong while updating. Please try again.');
  }
};
const exportToPDF = (resume) => {
  const element = document.createElement('div');
  element.innerHTML = `
  <div style="text-align: center;">
    ${resume.image ? `<img src="${resume.image}" style="width: 100px; height: 100px; border-radius: 50%;" /><br />` : ''}
    <h2>${resume.name}</h2>
    <p> ${resume.email} | ${resume.phone || 'N/A'}</p>
  </div>
  <hr />
    <p><strong>Professional Summary</strong> </p>
    <p>${resume.summary || 'N/A'}</p>
    <p><strong>Education</strong></p>
    <ul>${(resume.education || []).map(e => `<li>${e.level} - ${e.cgpa} CGPA</li>`).join('')}</ul>
    <p><strong>Skills</strong> </p>
    <ul>${(resume.skills || []).map(s => `<li>${s}</li>`).join('')}</ul>
    <p><strong>Experience</strong></p>
    <ul>${(resume.experience || []).map(e => `<li>${e}</li>`).join('')}</ul>
    <p><strong>Projects</strong></p>
    <ul>${(resume.projects || []).map(p => `<li><strong>${p.title}</strong>: ${p.description}</li>`).join('')}</ul>
  `;

  const opt = {
    margin:       0.5,
    filename:     `${resume.name.replace(/\s+/g, '_')}_Resume.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
};

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Your Resumes</h2>
      {resumes.map((resume) => (
  <div key={resume._id} className="resume-card">
    {editingId === resume._id ? (
      <div>
        <label>Name</label>
        <textarea
          value={editForm.name || ''}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
        />
        <label>E-mail</label>
        <textarea
          value={editForm.email || ''}
          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
        />
        <label>Phone</label>
        <textarea
          value={editForm.phone || ''}
          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
        />
        <div>
        <label>Upload/Change Photo</label>
        <input type="file" accept="image/*" onChange={(e) => {
          const reader = new FileReader();
          reader.onload = () =>
          setEditForm({ ...editForm, image: reader.result });
          reader.readAsDataURL(e.target.files[0]);
       }}
        />
        {editForm.image && (
        <div style={{ marginTop: '10px' }}>
        <strong>Current Photo:</strong><br />
        <img src={editForm.image} alt="Uploaded" style={{ width: '100px', height: '100px', borderRadius: '50%' }}/>
        </div>
        )}
      </div>
        <label>Professional Summary</label>
        <textarea
          value={editForm.summary || ''}
          onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
        />
        
        <label>Education (e.g. B.Tech - 9 CGPA per line)</label>
        <textarea 
          value={editForm.education} 
          onChange={(e) => setEditForm({ ...editForm, education: e.target.value })} 
          />
        <label>Skills: Comma separated</label>
        <textarea
          value={editForm.skills || ''}
          onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
        />
        <label>Experience: Separate lines</label>
        <textarea
          value={editForm.experience || ''}
          onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
          />
        
        <label>Projects (e.g. Project Title: Description per line)</label>
        <textarea 
          value={editForm.projects} 
          onChange={(e) => setEditForm({ ...editForm, projects: e.target.value })} 
        />

        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setEditingId(null)}>Cancel</button>
      </div>
    ) : (
      <div>
        <h3>{resume.name}</h3>
        <p><i>{resume.email}</i></p>
        <button onClick={() => handleEdit(resume)}>Edit</button>
        <button onClick={() => handleDelete(resume._id)}>Delete</button>
        <button onClick={() => exportToPDF(resume)}>Export as PDF</button>
      </div>
    )}
  </div>
))}

    </div>
  );
}