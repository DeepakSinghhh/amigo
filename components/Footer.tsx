import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 mt-auto relative z-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        <div className="neo-card space-y-4 flex flex-col justify-center">
          <h3 className="text-gray-900 font-extrabold text-xl tracking-tight">Chaitanya</h3>
          <p className="leading-relaxed font-semibold text-gray-600">
            Bridging the gap in mental health support for higher education. 
            An initiative by the Dept of Student Welfare.
          </p>
        </div>
        
        <div className="neo-card space-y-4">
          <h3 className="text-gray-900 font-extrabold text-lg tracking-tight">Quick Contacts</h3>
          <div className="flex items-center gap-4">
            <div className="neo-card-inset !p-3 !rounded-2xl text-blue-600">
                <Phone size={18} />
            </div>
            <span className="font-bold text-gray-700 text-base">1800-123-HELP</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="neo-card-inset !p-3 !rounded-2xl text-blue-600">
                <Mail size={18} />
            </div>
            <span className="font-bold text-gray-700 text-base">counseling@university.edu</span>
          </div>
        </div>

        <div className="neo-card neo-bg-coral space-y-4">
          <h3 className="text-[#7a2818] font-extrabold text-lg tracking-tight">Crisis Support</h3>
          <p className="text-[#7a2818] font-semibold leading-relaxed">
            If you are in immediate danger, please call <span className="font-black">112</span> or go to the nearest hospital emergency room immediately.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 text-center text-xs font-bold text-gray-400">
        &copy; {new Date().getFullYear()} Chaitanya. Open Source Initiative.
      </div>
    </footer>
  );
};

export default Footer;