import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    patientId: '',
    address: '',
    country: 'India',
  });

  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/user/getUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
   

             console.log("Log from Settings user detail fetched : ",res.body)
             
            

            if (!res.ok) throw new Error("Failed to fetch user data");

            const userData = await res.json();
            console.log("User data fetched:", userData);
            // Set state with userData here
        } catch (error) {
            console.error("Error fetching user:", error);
            alert("Failed to fetch user data.");
        }
    };

    fetchUser();
}, []);


  // useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     console.log("token from settings :",token);
      

  //   if (!token) {
  //     alert("Please login first.");
  //     return;
  //   }

  //   axios.get('http://localhost:5000/api/user/me', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(res => {
  //       const user = res.data.user || res.data; // adjust based on backend response
  //       setFormData({
  //         firstName: user.firstName || '',
  //         lastName: user.lastName || '',
  //         email: user.email || '',
  //         phone: user.phone || '',
  //         gender: user.gender || '',
  //         patientId: user.patientId || '',
  //         address: user.address || '',
  //         country: user.country || 'India',
  //       });
  //       if (user.avatar) {
  //         setAvatarPreview(`http://localhost:5000${user.avatar}`);
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       alert("Failed to fetch user data.");
  //     });
  // }, [token]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!token) {
      alert("Unauthorized. Please login.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, val]) => form.append(key, val));
      if (avatarFile) form.append('avatar', avatarFile);

      await axios.put('http://localhost:5000/api/user/update', form, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('✅ Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">⚙️ Account Settings</h1>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={avatarPreview || "https://i.pravatar.cc/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1 cursor-pointer"
            >
              📷
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex gap-4">
            <label htmlFor="avatar-upload">
              <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                Upload New
              </div>
            </label>
            <button
              onClick={handleDeleteAvatar}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-100"
            >
              Delete Avatar
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "firstName", label: "First Name *" },
            { name: "lastName", label: "Last Name *" },
            { name: "email", label: "Email *", type: "email" },
            { name: "phone", label: "Mobile Number *" },
            { name: "country", label: "Country" },
            { name: "address", label: "Residential Address", colSpan: true }
          ].map(({ name, label, type = "text", colSpan }) => (
            <div key={name} className={colSpan ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type={type}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-1 flex gap-4">
              {["Male", "Female"].map(g => (
                <label key={g} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Patient ID</label>
            <input
              name="patientId"
              value={formData.patientId}
              disabled
              className="mt-1 w-full px-4 py-2 border bg-gray-100 text-gray-600 rounded-md"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSave}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  ); 

  
};

export default Settings;
