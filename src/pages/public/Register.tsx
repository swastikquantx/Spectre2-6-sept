import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../core/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', whatsapp: '',
    city: '', state: '', country: '', company: '', designation: '',
    password: '', confirmPassword: ''
  });
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [consent, setConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(sameAsMobile && name === 'mobile' ? { whatsapp: value } : {})
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAsMobile(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, whatsapp: prev.mobile }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (!consent) {
      return setError('You must agree to the Terms and Privacy Policy');
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      login(data.token, data.user);
      navigate('/app');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <span className="text-xl font-bold tracking-tighter text-white leading-none">SPECTRE</span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">CREATE ACCOUNT</span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm text-center rounded">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mobile</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp</label>
                <label className="flex items-center gap-2 text-[10px] text-slate-400">
                  <input type="checkbox" checked={sameAsMobile} onChange={handleCheckbox} /> Same as Mobile
                </label>
              </div>
              <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} readOnly={sameAsMobile} className={`w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 ${sameAsMobile ? 'opacity-50 cursor-not-allowed' : ''}`} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">City</label>
              <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">State</label>
              <input name="state" value={formData.state} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Country</label>
              <input name="country" value={formData.country} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company</label>
              <input name="company" value={formData.company} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Designation</label>
              <input name="designation" value={formData.designation} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30 pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-slate-400 hover:text-white">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm Password</label>
              <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" required />
            </div>
          </div>
          
          <label className="flex items-start gap-3 mt-4 text-xs text-slate-400 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            <span>I agree to the Terms of Service and Privacy Policy, and consent to the collection of my profile data.</span>
          </label>
          
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-slate-200 transition-colors">
            CREATE ACCOUNT
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-slate-500">
          <p>Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
