import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="h-10 w-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-lg shadow-lg shadow-emerald-100 group-hover:rotate-12 transition-transform">
                <i className="fa-solid fa-paw"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 tracking-tight leading-none">PetPlaza <span className="text-emerald-600">MY</span></span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Safe Haven</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
              Southeast Asia's first dedicated Safe Haven for pets and their humans. Dedicated to building a kinder world, one paw at a time.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="fa-facebook-f" color="hover:text-blue-600" />
              <SocialIcon icon="fa-instagram" color="hover:text-pink-600" />
              <SocialIcon icon="fa-tiktok" color="hover:text-gray-900" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[0.2em] border-l-2 border-emerald-500 pl-4">Platform</h4>
            <ul className="space-y-4">
              <FooterLink label="About Us" />
              <FooterLink label="Pioneer Program" />
              <FooterLink label="Service Roadmap" />
              <FooterLink label="Community Guidelines" />
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[0.2em] border-l-2 border-emerald-500 pl-4">Support</h4>
            <ul className="space-y-4">
              <FooterLink label="Contact Us" />
              <FooterLink label="Terms & Conditions" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Safe Haven Status" />
            </ul>
          </div>

          {/* Newsletter/Motto */}
          <div>
            <h4 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[0.2em] border-l-2 border-emerald-500 pl-4">Our Promise</h4>
            <div className="bg-emerald-50 rounded-[2rem] p-7 border border-emerald-100 shadow-inner relative overflow-hidden group">
              <p className="text-xs text-emerald-800 font-bold leading-relaxed italic relative z-10">
                "To ensure no pet is ever left behind, whether moving house, moving countries, or just moving through life."
              </p>
              <i className="fa-solid fa-heart absolute -bottom-4 -right-4 text-6xl text-emerald-100/50 group-hover:scale-125 transition-transform"></i>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest">
              PetPlaza Malaysia &copy; 2026. 🇲🇾
            </p>
            <span className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></span>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
              Crafted for Paws in Kuala Lumpur
            </p>
          </div>
          <div className="flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-full border border-gray-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Network Status: Optimal</span>
          </div>
        </div>
      </div>
      <i className="fa-solid fa-bone absolute top-20 right-[-10%] text-[15rem] text-gray-50 opacity-50 rotate-45 pointer-events-none"></i>
    </footer>
  );
};

const SocialIcon = ({ icon, color }: { icon: string, color: string }) => (
  <a href="#" className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 ${color} hover:bg-white hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 border border-gray-100 hover:border-transparent group`}>
    <i className={`fa-brands ${icon} text-lg group-hover:scale-110 transition-transform`}></i>
  </a>
);

const FooterLink = ({ label }: { label: string }) => (
  <li>
    <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 font-medium transition-all hover:pl-2 flex items-center gap-2 group">
      <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {label}
    </a>
  </li>
);

export default Footer;
