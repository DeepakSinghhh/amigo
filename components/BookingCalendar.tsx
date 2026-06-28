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
    <div className="max-w-6xl mx-auto space-y-10 p-6 animate-neo-fade-up">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Confidential Counseling</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-bold">
          Book a private session with our campus mental health professionals.
        </p>
         <div className="inline-flex items-center gap-2 neo-badge neo-bg-sky text-blue-900 shadow-sm border border-white">
            <Shield size={16} /> 
            <span>Your privacy is our priority. No academic record sharing.</span>
          </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COUNSELORS.map((counselor) => (
          <div
            key={counselor.id}
            className={`neo-card !p-0 transition-all duration-300 overflow-hidden ${
              selectedCounselor === counselor.id ? 'ring-4 ring-[var(--neo-sky)] scale-[1.02]' : 'hover:-translate-y-1'
            }`}
          >
            <div className="p-8 bg-[var(--neo-bg)]">
              <div className="flex items-center gap-5 mb-6">
                <img
                  src={counselor.imageUrl}
                  alt={counselor.name}
                  className="w-20 h-20 rounded-3xl object-cover shadow-[var(--neo-shadow-out-sm)] border-2 border-white/50"
                />
                <div>
                  <h3 className="font-black text-xl text-gray-900">{counselor.name}</h3>
                  <p className="text-sm text-blue-800 font-extrabold mt-1">{counselor.specialization}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-black">Available Slots</p>
                <div className="flex flex-wrap gap-2">
                  {counselor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedCounselor(counselor.id);
                        setSelectedSlot(slot);
                      }}
                      className={`text-sm px-4 py-2 rounded-2xl transition-all font-bold border border-white/50 ${
                        selectedCounselor === counselor.id && selectedSlot === slot
                          ? 'bg-[var(--neo-sky)] text-blue-900 shadow-[var(--neo-shadow-in)]'
                          : 'bg-white/40 text-gray-700 hover:bg-white/80 shadow-[var(--neo-shadow-out-sm)]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/60 bg-white/20 backdrop-blur-sm">
               <button
                  onClick={handleBooking}
                  disabled={selectedCounselor !== counselor.id || !selectedSlot}
                  className="neo-button neo-button-primary w-full !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Book Appointment
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" style={{zIndex: 100}}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeConfirmation}></div>
          <div className="relative neo-card max-w-md w-full !p-8 text-center space-y-6 transform animate-neo-fade-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-2 shadow-[var(--neo-shadow-out-sm)] border-4 border-white">
              <CheckCircle size={40} />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Booking Confirmed</h3>
              <p className="text-gray-600 mt-3 text-lg font-bold leading-relaxed">
                Your appointment with <span className="font-black text-gray-900">{MOCK_COUNSELORS.find(c => c.id === selectedCounselor)?.name}</span> is set for <span className="font-black text-gray-900">{selectedSlot}</span>.
              </p>
            </div>
            <div className="neo-card-inset !p-5 text-left text-sm text-gray-700 font-semibold flex items-start ga!p-3 bg-white/50 border border-white/50">
              <Shield className="flex-shrink-0 mt-0.5 text-gray-500" size={18} />
              <p>A confirmation has been sent to your student portal. This booking remains confidential.</p>
            </div>
            <button
              onClick={closeConfirmation}
              className="neo-button neo-button-primary w-full !py-4"
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