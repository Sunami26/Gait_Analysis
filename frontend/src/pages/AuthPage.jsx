import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from '../assets/bg.mp4';

const AuthPage = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            fullname: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, confirmPassword } = formData;

    // Use destructured variables directly
    const fullnameTrim = fullname.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();
    const confirmPasswordTrim = confirmPassword.trim();

    // Debug log
    console.log({
        fullnameTrim,
        emailTrim,
        passwordTrim,
        confirmPasswordTrim,
        isLogin
    });

    // Validation
    if (!emailTrim || !passwordTrim) {
    alert("Email and password are required.");
    return;
}

if (!isLogin) {
    if (!fullnameTrim || !confirmPasswordTrim) {
        alert("Full name and confirm password are required for signup.");
        return;
    }

    if (passwordTrim !== confirmPasswordTrim) {
        alert("Passwords do not match");
        return;
    }

console.log("Raw input values:");
console.log("Fullname:", `"${formData.fullname}"`);
console.log("Email:", `"${formData.email}"`);
console.log("Password:", `"${formData.password}"`);
console.log("Confirm Password:", `"${formData.confirmPassword}"`);
}

    if (!isLogin && passwordTrim !== confirmPasswordTrim) {
        alert("Passwords do not match");
        return;
    }

    try {
        if (isLogin) {
            // Login
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailTrim, password: passwordTrim }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Login response:", data); // ✅ Now correct
                localStorage.setItem("token", data.token); // ✅ Fixed
                localStorage.setItem("user", JSON.stringify(data.user));
                alert(`Welcome, ${data.user.fullname}!`);
                navigate("/dashboard");
            } else {
                alert(data.msg || "Login failed");
            }
        } else {
            // 📝 Signup
            const res = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname: fullnameTrim,
                    email: emailTrim,
                    password: passwordTrim,
                    confirmPassword: confirmPasswordTrim
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Signup successful! Please login now.");
                setIsLogin(true);
            } else {
                alert(data.msg || "Signup failed");
            }
        }
    } catch (err) {
        console.error("Submission Error:", err);
        alert(err.message || "Something went wrong. Try again.");
    }
};


    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* 🎥 Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <div className="relative z-10 px-4 py-2 rounded-xl bg-black bg-opacity-30 backdrop-blur-sm inline-block mb-6">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white text-center drop-shadow-[0_0_15px_#60a5fa] tracking-wide">
                        <span className="text-[#3b82f6] drop-shadow-[0_0_8px_#93c5fd]">Gait Analysis</span> for <span className="text-white drop-shadow-[0_0_5px_#ffffff]">Physiotherapy Patients</span>
                    </h1>
                </div>

                <div className="bg-blue-600 bg-opacity-10 backdrop-blur-md border border-white border-opacity-30 rounded-2xl shadow-xl px-8 py-10 w-[400px] h-[470px] flex flex-col justify-center">
                    <h2 className="text-white text-3xl font-bold mb-6 text-center">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                name="fullname"
                                placeholder="full Name"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md bg-blue-600 bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-blue-600 bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-blue-600 bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {!isLogin && (
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-md bg-blue-600 bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        )}
                        <button
                            className="w-full py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90"
                            type="submit"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-white text-sm mt-4 text-center">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span
                            onClick={toggleForm}
                            className="text-yellow-300 cursor-pointer font-medium hover:underline hover:text-yellow-200 transition duration-200"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
