import React, { useState } from 'react';
import { ServiceItem, User } from '../types';
import { saveServiceInterest } from '../services/dbService';

const SERVICES: ServiceItem[] = [
  { 
    id: 'community', 
    title: 'Community Feed', 
    description: 'Share moments, ask questions, and post Lost & Found alerts.', 
    icon: 'fa-users', 
    isActive: true,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-300'
  },
  { 
    id: 'relocation', 
    title: 'Pet Relocation', 
    description: 'Hassle-free international and domestic pet travel services.', 
    icon: 'fa-plane-up', 
    isActive: false 
  },
  { 
    id: 'insurance', 
    title: 'Pet Insurance', 
    description: 'Protection tailored for Malaysian paws. Peace of mind for owners.', 
    icon: 'fa-shield-heart', 
    isActive: false 
  },
  { 
    id: 'pet-id', 
    title: 'Pet ID', 
    description: 'Smart digital tags to keep your furry friends connected and safe.', 
    icon: 'fa-id-card', 
    isActive: false 
  },
  { 
    id: 'sitting', 
    title: 'Pet Sitting', 
    description: 'Trusted neighbors to watch your pets while you explore or work.', 
    icon: 'fa-house-chimney-user', 
    isActive: false 
  },
  { 
    id: 'boarding', 
    title: 'Pet Boarding', 
    description: 'A premium home away from home for your best friend\'s staycation.', 
    icon: 'fa-hotel', 
    isActive: false 
  },
  { 
    id: 'vet', 
    title: 'Veterinary', 
    description: 'Book appointments with top-rated local vets across Malaysia.', 
    icon: 'fa-user-doctor', 
    isActive: false 
  },
  { 
    id: 'grooming', 
    title: 'Pet Grooming', 
    description: 'Professional styling, spa days, and care for your pets.', 
    icon: 'fa-scissors', 
    isActive: false 
  },
  { 
    id: 'store', 
    title: 'Pet Store', 
    description: 'Curated premium food, toys, and limited-edition accessories.', 
    icon: 'fa-bag-shopping', 
    isActive: false 
  },
  { 
    id: 'adoption', 
    title: 'Adoption', 
    description: 'Find your new best friend from verified shelters in our network.', 
    icon: 'fa-paw', 
    isActive: false 
  },
];

interface HomeProps {
  user: User | null;
  onNavigate: (view: string) => void;
  onOpenAuth: (view: 'login' | 'signup') => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigate, onOpenAuth }) => {
  const [interestedService, setInterestedService] = useState<ServiceItem | null>(null);

  const handleServiceClick = (service: ServiceItem) => {
    if (service.isActive) {
      onNavigate('feed');
    } else {
      setInterestedService(service);
    }
  };

  const confirmInterest = async () => {
    if (interestedService) {
      if (user) {
        await saveServiceInterest({
          userId: user.id,
          serviceId: interestedService.id,
          timestamp: Date.now()
        });
        alert(`Confirmed! We'll notify you personally when ${interestedService.title} launches in Malaysia.`);
      } else {
        onOpenAuth('login');
      }
      setInterestedService(null);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-stone-50/30">
      {/* Background Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-amber-50/50 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        
        {/* Modern Glassmorphism Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="text-left">
            <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse border border-emerald-200 shadow-sm">
              Pioneer Launch Live • Malaysia 🇲🇾
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.95]">
              SEA's First <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Safe Haven
              </span> <br />
              for Pets.
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium max-w-lg">
              The premier platform built to protect, connect, and provide for every pet in the region.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('feed')}
                className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                Join Community <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button 
                onClick={() => {
                   const el = document.getElementById('services-grid');
                   el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white border border-gray-200 text-gray-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Glass Pet Portraits */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Primary Portrait with Glass Effect */}
            <div className="absolute z-20 top-0 right-10 w-64 h-80 rounded-[2.5rem] overflow-hidden border-[8px] border-white/80 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-float backdrop-blur-md">
               <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Hero Pet Dog" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Pioneer Member</p>
                  <p className="text-xl font-black tracking-tight">Cooper</p>
               </div>
            </div>
            
            {/* Glass Card 1 (Background cat) */}
            <div className="absolute z-10 bottom-10 left-0 w-56 h-72 rounded-[2.5rem] overflow-hidden border border-white/40 bg-white/20 backdrop-blur-2xl shadow-2xl transition-transform hover:scale-105 duration-700">
               <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover mix-blend-overlay opacity-90" alt="Hero Pet Cat" />
               <div className="absolute inset-0 flex items-center justify-center bg-white/10">
                  <div className="text-center p-6 border border-white/30 rounded-full bg-white/5 backdrop-blur-md">
                     <i className="fa-solid fa-heart text-white text-3xl mb-1 animate-pulse"></i>
                  </div>
               </div>
            </div>

            {/* Accents (Floating bubble) */}
            <div className="absolute -bottom-4 right-0 w-40 h-40 rounded-full border-4 border-white/60 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-xl shadow-xl flex items-center justify-center animate-pulse">
                <i className="fa-solid fa-shield-dog text-emerald-600 text-5xl drop-shadow-md"></i>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div id="services-grid" className="mb-24 scroll-mt-24">
            <div className="text-center mb-16">
              <span className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-4 block">Coming Soon</span>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">The Safe Haven Roadmap</h2>
              <p className="text-gray-500 font-medium">Capture interest in our upcoming premium Malaysian services.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {SERVICES.map((service) => (
                <div 
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className={`relative group bg-white/80 backdrop-blur-sm rounded-[2rem] p-7 border transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-100/50 hover:-translate-y-2 cursor-pointer overflow-hidden ${service.color || 'border-gray-100 hover:border-emerald-200'}`}
                >
                    {!service.isActive && (
                    <div className="absolute top-5 right-5 bg-amber-50 text-amber-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-amber-100 shadow-sm">
                        Waitlist
                    </div>
                    )}
                    {service.isActive && (
                    <div className="absolute top-5 right-5 bg-emerald-100 text-emerald-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1 border border-emerald-200 shadow-sm">
                        Active
                    </div>
                    )}

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${service.isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-50'}`}>
                        <i className={`fa-solid ${service.icon}`}></i>
                    </div>
                    
                    <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-[12px] font-medium opacity-80">{service.description}</p>
                    
                    <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Learn More</span>
                      <i className="fa-solid fa-arrow-right text-[10px] text-emerald-600"></i>
                    </div>
                </div>
                ))}
            </div>
        </div>

        {/* Professional CTA */}
        <div className="bg-gray-900 rounded-[3.5rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent"></div>
           </div>
           <div className="relative z-10 max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-400/20 shadow-inner">
                <i className="fa-solid fa-crown text-amber-400 text-2xl animate-bounce"></i>
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight leading-tight">Partner with PetPlaza Malaysia</h2>
              <p className="text-emerald-100/70 mb-10 text-lg font-medium leading-relaxed">
                We are building the most trusted network of pet professionals in Southeast Asia. Join our verified list of vets, relocation specialists, and groomers today.
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-900/50 transition-all hover:-translate-y-1 active:scale-95">
                Apply as a Professional
              </button>
           </div>
           <i className="fa-solid fa-paw absolute -bottom-16 -left-16 text-[15rem] opacity-[0.03] rotate-12"></i>
           <i className="fa-solid fa-cat absolute -top-16 -right-16 text-[12rem] opacity-[0.03] -rotate-12"></i>
        </div>
      </div>

      {/* Interest Modal */}
      {interestedService && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-3xl animate-fade-in-up border border-emerald-50">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-600 text-4xl shadow-inner">
              <i className={`fa-solid ${interestedService.icon}`}></i>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none">{interestedService.title}</h3>
            <p className="text-gray-500 mb-10 text-base font-medium leading-relaxed">
              Our <span className="text-emerald-600 font-black">{interestedService.title}</span> network is expanding. Join the priority waitlist to secure early-bird rates and verified status when we go live.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={confirmInterest}
                className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] hover:bg-black font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-gray-200 transition-all hover:-translate-y-1"
              >
                Join Waitlist
              </button>
              <button 
                onClick={() => setInterestedService(null)}
                className="w-full py-5 text-gray-400 rounded-[1.5rem] hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-all"
              >
                No Thanks, Just Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
