import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import './Home.css'; 
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <main className="welcome-section">
        <h2>Welcome to Smart Resume Builder</h2>
        <p>This tool helps you create professional, attractive resumes using smart AI suggestions and a beautiful preview.</p>
         <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/builder" />
            <SignUpButton mode="modal" afterSignUpUrl="/builder" />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <button onClick={() => navigate('/builder')} className="go-to-builder-btn">Go to Resume Builder</button>
          </SignedIn>
        </div>
      </main>
    </div>
  );
}
