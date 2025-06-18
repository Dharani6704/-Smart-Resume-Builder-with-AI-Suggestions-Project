import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-400 to-purple-500 p-4 text-white shadow-md">
      <h1 className="text-2xl font-bold">Smart Resume Builder</h1>
      <nav className="space-x-4">
        <SignedOut>
          <SignInButton redirectUrl="/resume-builder">
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100">Sign In</button>
          </SignInButton>
          <SignUpButton redirectUrl="/resume-builder">
            <button className="bg-white text-purple-600 font-semibold px-4 py-2 rounded hover:bg-purple-100">Sign Up</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <UserButton afterSignOutUrl="/" />
          <Link to="/dashboard">
          <button style={{background: 'white',color: '#2563eb',padding: '8px 16px',borderRadius: '5px',fontWeight: 'bold',border: 'none',
          cursor: 'pointer',}}>
          Dashboard
          </button>
          </Link>
          </div>

        </SignedIn>
      </nav>
    </header>
  );
}
