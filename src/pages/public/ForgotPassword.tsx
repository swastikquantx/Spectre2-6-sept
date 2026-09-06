import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Real implementation would call /api/auth/forgot-password
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#050505] border border-white/10 rounded-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <span className="text-xl font-bold tracking-tighter text-white leading-none">SPECTRE</span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">RESET PASSWORD</span>
        </div>
        
        {submitted ? (
          <div className="text-center">
            <p className="text-sm text-emerald-400 mb-6">If an account exists for {email}, a reset link has been sent.</p>
            <Link to="/login" className="text-white text-xs font-bold hover:underline">Return to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Account Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-3 rounded hover:bg-slate-200 transition-colors"
            >
              SEND RESET LINK
            </button>
            <div className="text-center text-xs">
              <Link to="/login" className="text-slate-400 hover:text-white">Back to Login</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
