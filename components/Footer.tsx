import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-500 py-16 mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 text-sm">
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight">AmiGo</h3>
          <p className="leading-relaxed text-gray-600">
            Bridging the gap in mental health support for higher education. 
            An initiative by the Dept of Student Welfare.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight">Quick Contacts</h3>
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <Phone size={16} />
            </div>
            <span className="font-medium text-gray-700">1800-123-HELP</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <Mail size={16} />
            </div>
            <span className="font-medium text-gray-700">counseling@university.edu</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight">Crisis Support</h3>
          <p className="text-gray-600 leading-relaxed bg-red-50 p-4 rounded-2xl border border-red-100">
            If you are in immediate danger, please call <span className="font-bold text-red-600">112</span> or go to the nearest hospital emergency room immediately.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} AmiGo. Open Source Initiative.
      </div>
    </footer>
  );
};

export default Footer;