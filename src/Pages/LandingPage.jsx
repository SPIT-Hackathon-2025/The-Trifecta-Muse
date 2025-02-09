import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import SiderChatbot from './SiderChatbot';
import MyCalendar from './MyCalendar'; // Import the MyCalendar component
import CommentTracker from './CommentTracker'; // Import the new CommentTracker component

const locales = {
  'en-US': enUS,
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">
                Room Planner
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/room-planner')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Open Room Planner
              </button>
              <button
                onClick={() => navigate('/feng-shui')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Feng Shui
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Room Planner
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Schedule your room planning sessions and collaborate with your team
            in real-time.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Team Calendar
          </h3>
          <MyCalendar /> {/* Replace the existing calendar with MyCalendar */}
        </div>
        <div>
          <CommentTracker />
        </div>
      </main>
      <SiderChatbot />
    </div>
  );
};

export default LandingPage;
