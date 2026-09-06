import React, { useEffect, useState } from 'react';
import { useAuth } from '../../core/AuthContext';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const { token } = useAuth();
  
  useEffect(() => {
    fetch('/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.json()).then(data => {
      if (Array.isArray(data)) setUsers(data);
    }).catch(console.error);
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light text-white tracking-tight mb-6">User Management</h1>
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-xs uppercase bg-white/5 text-slate-500 font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/5 text-[10px] rounded tracking-widest">{u.role}</span>
                </td>
                <td className="px-6 py-4">{u.company || 'N/A'}</td>
                <td className="px-6 py-4">
                  {u.emailVerified ? (
                    <span className="text-emerald-400 text-xs flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Verified</span>
                  ) : (
                    <span className="text-amber-500 text-xs flex items-center gap-1"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
