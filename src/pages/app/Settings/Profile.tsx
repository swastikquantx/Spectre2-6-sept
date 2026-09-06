import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../core/AuthContext';

export default function Profile() {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        whatsapp: user.whatsapp || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        company: user.company || '',
        designation: user.designation || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      setMessage('Profile updated successfully');
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto custom-scrollbar">
      <h1 className="text-2xl font-light text-white tracking-tight mb-8">Profile Settings</h1>
      
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8 mb-8">
        <h2 className="text-lg font-medium text-white mb-6">Personal Information</h2>
        
        {message && (
          <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email (Read Only)</label>
              <input value={user.email} readOnly className="w-full bg-black/50 border border-white/5 rounded p-3 text-slate-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mobile</label>
              <input name="mobile" value={formData.mobile || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">WhatsApp</label>
              <input name="whatsapp" value={formData.whatsapp || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Company</label>
              <input name="company" value={formData.company || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Designation</label>
              <input name="designation" value={formData.designation || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">City</label>
              <input name="city" value={formData.city || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Country</label>
              <input name="country" value={formData.country || ''} onChange={handleChange} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:outline-none focus:border-white/30" />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={saving} className="bg-white text-black px-6 py-2 rounded text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-8">
        <h2 className="text-lg font-medium text-white mb-2">Security & Verification</h2>
        <p className="text-sm text-slate-400 mb-6">Manage your account security and verification status.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-black/50">
            <div>
              <div className="text-white font-medium mb-1">Email Verification</div>
              <div className="text-xs text-slate-400">{user.emailVerified ? 'Your email is verified.' : 'Please verify your email address.'}</div>
            </div>
            {user.emailVerified ? (
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Verified</span>
            ) : (
              <button className="text-xs text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors">Verify Now</button>
            )}
          </div>
          
          <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg bg-black/50">
            <div>
              <div className="text-white font-medium mb-1">Password</div>
              <div className="text-xs text-slate-400">Last changed recently</div>
            </div>
            <button className="text-xs text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
