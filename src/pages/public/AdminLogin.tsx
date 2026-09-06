import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../core/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  if (!loading && user?.role === 'PLATFORM_ADMIN') {
    return <Navigate to="/admin" replace />;
  }

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

      if (data.user.role !== 'PLATFORM_ADMIN') {
        throw new Error('Access Denied. Admin privileges required.');
      }
      
      login(data.token, data.user);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#050505] border border-red-500/20 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold tracking-tighter text-white leading-none mb-2">SPECTRE ADMIN</span>
            <span className="text-[9px] uppercase tracking-widest text-red-500 font-bold mt-1">RESTRICTED ACCESS</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-red-500/50"
              required
            />
          </div>
          
          <div className="relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-red-500/50 pr-10"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-500 transition-colors"
          >
            AUTHORIZE
          </button>
        </form>
      </div>
    </div>
  );
}
