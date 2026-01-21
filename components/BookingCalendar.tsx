import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Shield } from 'lucide-react';
import { Counselor } from '../types';

const MOCK_COUNSELORS: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Miller',
    specialization: 'Clinical Psychologist',
    availableSlots: ['Mon 10:00 AM', 'Mon 2:00 PM', 'Wed 11:00 AM'],
    imageUrl: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    name: 'Prof. Rajesh Kumar',
    specialization: 'Student Counselor',
    availableSlots: ['Tue 9:00 AM', 'Thu 3:00 PM', 'Fri 10:00 AM'],
    imageUrl: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: '3',
    name: 'Ms. Anita Desai',
    specialization: 'Stress Management Expert',
    availableSlots: ['Wed 4:00 PM', 'Fri 2:00 PM'],
    imageUrl: 'https://picsum.photos/100/100?random=3',
  },
];

const BookingCalendar: React.FC = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBooking = () => {
    setShowConfirmation(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, reset logic or redirect would happen here
    }, 2000);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setSelectedCounselor(null);
    setSelectedSlot(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">Confidential Counseling</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Book a private session with our campus mental health professionals.
        </p>
         <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Shield size={16} /> 
            <span>Your privacy is our priority. No academic record sharing.</span>
          </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COUNSELORS.map((counselor) => (
          <div
            key={counselor.id}
            className={`bg-white rounded-3xl shadow-sm border transition-all duration-300 overflow-hidden ${
              selectedCounselor === counselor.id ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-xl scale-[1.02]' : 'border-gray-100 hover:shadow-lg hover:-translate-y-1'
            }`}
          >
            <div className="p-8">
              <div className="flex items-center gap-5 mb-6">
                <img
                  src={counselor.imageUrl}
                  alt={counselor.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{counselor.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">{counselor.specialization}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Available Slots</p>
                <div className="flex flex-wrap gap-2">
                  {counselor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedCounselor(counselor.id);
                        setSelectedSlot(slot);
                      }}
                      className={`text-sm px-4 py-2 rounded-xl border transition-all font-medium ${
                        selectedCounselor === counselor.id && selectedSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50/50 p-6 border-t border-gray-100">
               <button
                  onClick={handleBooking}
                  disabled={selectedCounselor !== counselor.id || !selectedSlot}
                  className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold disabled:opacity-20 disabled:cursor-not-allowed hover:bg-black transition-all shadow-md active:scale-95"
               >
                 Book Appointment
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center space-y-6 transform animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-2">
              <CheckCircle size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed</h3>
              <p className="text-gray-500 mt-3 text-lg">
                Your appointment with <span className="font-semibold text-gray-900">{MOCK_COUNSELORS.find(c => c.id === selectedCounselor)?.name}</span> is set for <span className="font-semibold text-gray-900">{selectedSlot}</span>.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl text-left text-sm text-gray-600 flex items-start gap-3">
              <Shield className="flex-shrink-0 mt-0.5 text-gray-400" size={18} />
              <p>A confirmation has been sent to your student portal. This booking remains confidential.</p>
            </div>
            <button
              onClick={closeConfirmation}
              className="w-full py-3.5 bg-[#0071e3] text-white rounded-xl font-semibold hover:bg-[#0077ED] transition-transform active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;