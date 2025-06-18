// ResumePreview.jsx
import React, { forwardRef } from 'react';
import '../layout.css'; 

const ResumePreview = ({ resume }) => {
  if (!resume) return <p>No resume data</p>;
  return (
    <div style={{ maxWidth: "600px", margin: "auto", background: "#fff", padding: "20px", border: "1px solid #ccc" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={resume.image || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: "50%" }}
        />
        <h2>{resume.name || "Your Name"}</h2>
        <p>{resume.email || "your@email.com"} | {resume.phone || "0000000000"}</p>
      </div>

      <hr />
      <h3>Professional Summary</h3>
      <p>{resume.summary || "Write a brief summary here."}</p>

      <h3>Education</h3>
      <ul>{(resume.education ?? []).map((e, i) => (<li key={i}>{e.level} - {e.cgpa} CGPA</li>))}</ul>

      <h3>Skills</h3>
      <ul>{(resume.skills ?? []).map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h3>Experience</h3>
      <ul>{(resume.experience ?? []).map((e, i) => <li key={i}>{e}</li>)}</ul>

      <h3>Projects</h3>
      <ul>{(resume.projects ?? []).map((p, i) => (<li key={i}><strong>{p.title}</strong><br /><span>{p.description}</span></li>))}</ul>
    </div>
  );
};

export default ResumePreview;
