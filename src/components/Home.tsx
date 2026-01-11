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
    description: 'Stress-free international and domestic pet travel services.', 
    icon: 'fa-plane-up', 
    isActive: false 
  },
  { 
    id: 'insurance', 
    title: 'Pet Insurance', 
    description: 'Protection tailored for Malaysian paws. Peace of mind.', 
    icon: 'fa-shield-heart', 
    isActive: false 
  },
  { 
    id: 'pet-id', 
    title: 'Pet ID', 
    description: 'Smart digital tags to keep your furry friends found.', 
    icon: 'fa-id-card', 
    isActive: false 
  },
  { 
    id: 'vet', 
    title: 'Veterinary', 
    description: 'Book appointments with top-rated local vets.', 
    icon: 'fa-user-doctor', 
    isActive: false 
  },
  { 
    id: 'sitting', 
    title: 'Pet Sitting', 
    description: 'Trusted neighbors to watch your pets while you are away.', 
    icon: 'fa-house-chimney-user', 
    isActive: false 
  },
  { 
    id: 'boarding', 
    title: 'Pet Boarding', 
    description: 'A home away from home for your best friend\'s staycation.', 
    icon: 'fa-hotel', 
    isActive: false 
  },
  { 
    id: 'grooming', 
    title: 'Pet Grooming', 
    description: 'Professional styling and spa days for your pets.', 
    icon: 'fa-scissors', 
    isActive: false 
  },
  { 
    id: 'store', 
    title: 'Pet Store', 
    description: 'Curated premium food, toys, and accessories.', 
    icon: 'fa-bag-shopping', 
    isActive: false 
  },
  { 
    id: 'adoption', 
    title: 'Adoption', 
    description: 'Find your new best friend from verified shelters.', 
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
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-amber-50/50 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        
        {/* Modern Glassmorphism Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="text-left">
            <span className="inline-block py-1 px-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse">
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
              The only platform built to protect, connect, and provide for every pet in the region.
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
                className="bg-white border border-gray-200 text-gray-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Glass Pet Portraits */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Primary Portrait */}
            <div className="absolute z-20 top-0 right-10 w-64 h-80 rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl animate-float">
               <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Pet 1" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-black uppercase tracking-widest">Pioneer #001</p>
                  <p className="text-lg font-bold">Rex</p>
               </div>
            </div>
            
            {/* Glass Card 1 */}
            <div className="absolute z-10 bottom-10 left-0 w-56 h-72 rounded-[2rem] overflow-hidden border border-white/40 bg-white/30 backdrop-blur-xl shadow-xl transition-transform hover:scale-105 duration-500">
               <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover mix-blend-overlay opacity-80" alt="Pet 2" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                     <i className="fa-solid fa-heart text-white/80 text-3xl mb-2"></i>
                     <p className="text-white font-black text-sm uppercase tracking-tighter">Verified Haven</p>
                  </div>
               </div>
            </div>

            {/* Glass Card 2 (Accents) */}
            <div className="absolute -bottom-4 right-0 w-40 h-40 rounded-full border-4 border-white bg-emerald-500/10 backdrop-blur-md shadow-lg flex items-center justify-center animate-pulse">
                <i className="fa-solid fa-shield-dog text-emerald-600 text-5xl"></i>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div id="services-grid" className="mb-24 scroll-mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">The Safe Haven Roadmap</h2>
              <p className="text-gray-500 font-medium">Capture interest in our upcoming premium services.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {SERVICES.map((service) => (
                <div 
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className={`relative group bg-white rounded-3xl p-6 border transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 cursor-pointer overflow-hidden ${service.color || 'border-gray-100 hover:border-emerald-200'}`}
                >
                    {!service.isActive && (
                    <div className="absolute top-4 right-4 bg-amber-50 text-amber-600 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border border-amber-100">
                        Soon
                    </div>
                    )}
                    {service.isActive && (
                    <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest flex items-center gap-1 border border-emerald-200">
                        Active
                    </div>
                    )}

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 transition-transform group-hover:scale-110 ${service.isActive ? 'bg-emerald-600 text-white' : 'bg-stone-50 text-stone-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
                        <i className={`fa-solid ${service.icon}`}></i>
                    </div>
                    
                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">{service.title}</h3>
                    <p className="text-gray-500 leading-snug text-[11px] font-medium">{service.description}</p>
                </div>
                ))}
            </div>
        </div>

        {/* Pioneer Badge Section */}
        <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>
           </div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <i className="fa-solid fa-crown text-amber-400 text-4xl mb-6"></i>
              <h2 className="text-3xl font-black mb-4">Are you a Pet Industry Pro?</h2>
              <p className="text-gray-400 mb-8 font-medium">We are looking for Malaysia's best vets, groomers, and sitters to join our verified partner network.</p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                Partner with PetPlaza
              </button>
           </div>
        </div>
      </div>

      {/* Interest Modal */}
      {interestedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-fade-in-up">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 text-3xl">
              <i className={`fa-solid ${interestedService.icon}`}></i>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tighter">{interestedService.title}</h3>
            <p className="text-gray-500 mb-8 text-sm font-medium leading-relaxed">
              We are currently onboarding partners for <span className="text-emerald-600 font-bold">{interestedService.title}</span> in Malaysia. Join the Pioneer waitlist to be notified when we launch.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmInterest}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-100 transition-all"
              >
                Join Waitlist
              </button>
              <button 
                onClick={() => setInterestedService(null)}
                className="w-full py-4 text-gray-400 rounded-2xl hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;