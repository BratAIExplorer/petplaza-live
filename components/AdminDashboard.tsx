import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../services/dbService';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const s = await getAdminStats();
        setStats(s);
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return (
    <div className="fixed inset-0 z-[200] bg-gray-900/90 backdrop-blur-xl flex items-center justify-center text-white">
      <div className="text-center">
        <i className="fa-solid fa-circle-notch fa-spin text-4xl mb-4 text-emerald-400"></i>
        <p className="font-bold tracking-widest uppercase text-xs">Accessing Safe Haven Command...</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-gray-900 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Founder Command</h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px]">Real-time Business Intel</p>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold transition-all border border-white/10">
            Exit Portal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Users" value={stats?.users || 0} icon="fa-users" color="text-blue-400" />
          <StatCard title="Total Posts" value={stats?.posts || 0} icon="fa-newspaper" color="text-emerald-400" />
          <StatCard title="Service Interest" value={stats?.interests || 0} icon="fa-bullseye" color="text-orange-400" />
          <StatCard title="Open Feedback" value={stats?.feedback || 0} icon="fa-message" color="text-purple-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <i className="fa-solid fa-chart-pie text-emerald-500"></i>
              Waitlist Breakdown
            </h3>
            <div className="space-y-4">
              {stats?.breakdown && Object.entries(stats.breakdown).length > 0 ? (
                Object.entries(stats.breakdown).map(([id, count]: any) => (
                  <div key={id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <span className="text-gray-300 font-semibold capitalize">{id}</span>
                    <span className="text-emerald-400 font-black text-xl">{count}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No interests recorded yet.</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 italic">Pioneer Mission Control</h3>
                <p className="text-emerald-100 mb-8 max-w-sm">Your vision is scaling. Use these tools to manage the community quality.</p>
                <div className="grid grid-cols-2 gap-4">
                   <ActionButton icon="fa-download" label="Export Emails" />
                   <ActionButton icon="fa-broom" label="Purge Mocks" />
                   <ActionButton icon="fa-shield-halved" label="Mod Queue" />
                   <ActionButton icon="fa-paper-plane" label="Broadcast" />
                </div>
             </div>
             <i className="fa-solid fa-paw absolute -bottom-10 -right-10 text-[12rem] opacity-10"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-emerald-500/50 transition-colors">
    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl mb-4 ${color}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
    <p className="text-3xl font-black text-white">{value}</p>
  </div>
);

const ActionButton = ({ icon, label }: any) => (
  <button className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
    <i className={`fa-solid ${icon} mb-2 text-xl group-hover:scale-110 transition-transform`}></i>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default AdminDashboard;
