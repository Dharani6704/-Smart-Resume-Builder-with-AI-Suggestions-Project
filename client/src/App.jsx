import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, UserButton, useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Suggestions from './components/Suggestions';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

function ResumeApp() {
  const [resume, setResume] = useState({});
  const [suggestions, setSuggestions] = useState('');

  return (
    <div className="page">
      <div className="container">
        <div className="layout">
          <div className="form">
            <ResumeForm setResume={setResume} setSuggestions={setSuggestions} />
          </div>
          {resume && <div className="preview"><ResumePreview resume={resume} /></div>}
        </div>
        {suggestions && <div className="suggestions"><Suggestions text={suggestions} /></div>}
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();
  return isSignedIn ? children : <Navigate to="/sign-in" />;
}

export default function App() {
  return (
    <Router>
      <header className="app-header">
  <h1 className="app-title">Smart Resume Builder</h1>
  <div className="auth-links">
    <SignedOut>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
    </SignedOut>
    <SignedIn>
      <Link to="/dashboard">Dashboard</Link>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
  </div>
</header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sign-in" element={<div className='auth-page'><SignIn routing="path" path="/sign-in" /></div>} />
        <Route path="/sign-up" element={<div className='auth-page'><SignUp routing="path" path="/sign-up" /></div>} />
      </Routes>
    </Router>
  );
}
