import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/all-videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.log("Error fetching videos", err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">All Uploaded Videos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="font-semibold text-lg mb-2">{video.patientName}</h2>
            <video
              controls
              className="w-full h-56 object-cover rounded-lg"
              src={`http://localhost:5000/uploads/${video.videoPath}`}
            />
            <p className="text-sm text-gray-600 mt-2">
              Uploaded on: {new Date(video.uploadAt).toLocaleString()}
            </p>
            <p className="text-sm text-blue-600 mt-1">Status: Pending</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVideos;
