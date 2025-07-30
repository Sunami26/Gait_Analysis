import React, { useState } from 'react';

import gbImage from '../assets/gb2.png'; // ✅ import your background image

const Upload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = async (e) => {
  e.preventDefault();

  if (!videoFile || !title || !description) {
    alert("⚠️ Please fill out all fields and select a video!");
    return;
  }

  const formData = new FormData();
  formData.append("video", videoFile); // this name must match multer's 'video'
  formData.append("patientName", title); // assuming 'title' is patient's name
  formData.append("description", description); // optional if not used in backend

  try {
    const response = await fetch("http://localhost:5000/api/upload-video", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Video uploaded and analyzed successfully!");
      setVideoFile(null);
      setTitle("");
      setDescription("");
    } else {
      alert("❌ Upload failed: " + result.msg);
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("❌ An error occurred while uploading.");
  }
};


  return (
    <div className="flex h-screen">

      {/* Main content with background */}
      <div
        className="flex-1 relative bg-cover bg-center overflow-auto rounded-3xl"
        style={{ backgroundImage: `url(${gbImage})` }}
      >
        {/* Overlay */}

        {/* Upload Form */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-white text-3xl font-bold mb-6">Upload Patient Video</h1>

          <form
            className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md"
            onSubmit={handleUpload}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
            >
              Upload & Analyze
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;





// // src/pages/Upload.jsx
// import React, { useState } from 'react';

// const Upload = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [remarks, setRemarks] = useState('');

//   const handleUpload = () => {
//     if (!videoFile) {
//       alert('⚠️ Please select a video to upload!');
//       return;
//     }

//     // Simulated ML response
//     const fakeMLResult = {
//       status: 'Abnormal',
//       gaitScore: 68,
//       message: 'Detected slight limp in right leg.'
//     };

//     // Save to localStorage (simulating backend response)
//     localStorage.setItem('latestReport', JSON.stringify(fakeMLResult));
//     alert('✅ Video uploaded and analyzed successfully!');
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800">📤 Upload Gait Video</h1>

//       <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideoFile(e.target.files[0])}
//           className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />

//         <textarea
//           rows="3"
//           placeholder="Any notes or pain points (optional)"
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md"
//         ></textarea>

//         <button
//           onClick={handleUpload}
//           className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//         >
//           Upload & Analyze
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Upload;
