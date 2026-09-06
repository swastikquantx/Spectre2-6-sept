import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      login(data.token, data.user);
      navigate('/app');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#050505] border border-white/10 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-8 h-8 bg-white/90 rounded-md flex items-center justify-center p-1 shrink-0">
            <img src="/spectre-logo.webp" alt="Spectre Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white leading-none">SPECTRE</span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">LETS BUILD</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-white text-black font-bold py-3 rounded hover:bg-slate-200 transition-colors"
          >
            SIGN IN
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-slate-500">
          <p>Demo Accounts:</p>
          <p>Admin: admin@spectre.com / admin123</p>
          <p>Member: member@acme.com / password123</p>
        </div>
      </div>
    </div>
  );
}
