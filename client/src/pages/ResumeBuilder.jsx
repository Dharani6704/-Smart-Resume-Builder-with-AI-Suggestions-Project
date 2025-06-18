// src/pages/ResumeBuilder.jsx
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import Suggestions from '../components/Suggestions';
import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import '../layout.css';
export default function ResumeBuilder() {
 const [resume, setResume] = useState({
  name: "",
  email: "",
  phone: "",
  photo: "",
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: []
});

  const [suggestions, setSuggestions] = useState('');
  const resumeRef = useRef();
  const handlePrint = () => {
    const element = resumeRef.current;
    const opt = {
      margin:       0.3,
      filename:     'Smart_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };
  const handleSave = async () => {
  const formatted = {
    ...resume,
    image: resume.photo,
  };
  delete formatted.photo;
  };
  return (
    <div className="page">
      <div className="container">
        <div className="layout">
          <div className="form">
            <ResumeForm setResume={setResume} setSuggestions={setSuggestions} />
        </div>
          {resume && (
            <div className="preview">
              <div ref={resumeRef} id="resume-to-export" style={{ padding: '20px', background: '#fff' }}>
                <ResumePreview resume={resume} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handlePrint} className="export-button">
                Export as PDF
              </button>
              </div>
            </div>
          )}
        </div>
        {suggestions && (
          <div className="suggestions">
            <Suggestions text={suggestions} />
          </div>
        )}
      </div>
    </div>
  );
}

