import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const quotes = [
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "Fitness is not about being better than someone else. It’s about being better than you used to be.",
  "Take care of your body. It’s the only place you have to live.",
  "The groundwork for all happiness is good health.",
  "Health is not valued till sickness comes.",
  "A healthy outside starts from the inside.",
  "Don’t count the days, make the days count.",
  "You don’t have to be extreme, just consistent.",
  "Exercise is a celebration of what your body can do.",
  "Motivation is what gets you started. Habit is what keeps you going."
];

const dummyUploads = [
  { name: "Amit", date: "2025-07-10" },
  { name: "Pooja", date: "2025-07-12" },
  { name: "Karan", date: "2025-07-14" },
  { name: "Amit", date: "2025-07-15" }
];

const Dashboard = () => {
  const [username, setUsername] = useState('User');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const name = user?.fullname || 'User';
        setUsername(name);
      } catch {
        setUsername('User');
      }
    }

    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: 'Videos Uploaded',
        data: [1, 2, 1, 3, 2, 1, 4],
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        tension: 0.4,
        fill: false,
        pointBorderWidth: 4
      }
    ]
  };

  const filteredUploads = dummyUploads.filter(upload =>
    upload.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-blue-50 text-gray-800 p-8 h-full overflow-auto rounded-3xl">
      <div className="bg-white shadow-xl rounded-xl p-8 mb-6 border-l-8 border-blue-500">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Hi, {username} 👋</h1>
        <p className="text-lg">
          Welcome back to <strong className="text-blue-600">GaitPhysio</strong>! Hope you're staying active and healthy today 💪
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🧠 Motivation</h2>
        <p className="text-xl font-bold italic text-blue-900 transition-all duration-500">
          “{quotes[quoteIndex]}”
        </p>
      </div>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">📁 Total Videos</h3>
          <p className="text-3xl font-bold text-blue-600">{dummyUploads.length}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">👩‍⚕️ Patients Analysed</h3>
          <p className="text-3xl font-bold text-blue-600">{[...new Set(dummyUploads.map(v => v.name))].length}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">🕒 Last Upload</h3>
          <p className="text-3xl font-bold text-blue-600">{dummyUploads[dummyUploads.length - 1]?.date}</p>
        </div>
      </div>

      {/* 📈 Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">📈 Weekly Upload Progress</h2>
        <Line data={chartData} />
      </div>

      {/* 🔍 Search Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">🔍 Search Uploads</h2>
        <input
          type="text"
          placeholder="Search by patient name..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">
          {filteredUploads.map((item, index) => (
            <li key={index}>{item.name} - {item.date}</li>
          ))}
          {filteredUploads.length === 0 && <li>No results found</li>}
        </ul>
      </div>

      {/* ✅ Your Original Instruction Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">📝 Quick Instructions</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>To upload a new patient’s gait video, go to <strong>Upload Video</strong> from the sidebar.</li>
          <li>All uploaded videos will appear in <strong>All Videos</strong> with their details.</li>
          <li>You can view analysis reports and past performance in the <strong>Reports</strong> section.</li>
          <li>Maintain daily tracking to monitor progress more effectively.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
