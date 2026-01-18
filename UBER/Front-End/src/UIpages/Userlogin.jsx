import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";

const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {user , setuser} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const UserData = {
      email: email,
      password: password
    };
    const response = await axios.post("https://uber-clone-t911.onrender.com/createuser/login", UserData)
    .catch((error) => {
      console.log(error);
      alert("Invalid Credentials, Please try again");
    });
    if (response.status === 200) {
      const data = response.data;
      setuser(data.user._id);
      localStorage.setItem("ridertoken", data.token);
      navigate("/home");
    }
    setEmail('');
    setPassword('');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 pt-6"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </Link>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col px-6 pt-8 pb-8 max-w-md mx-auto w-full"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-8">
          <img
            className="h-10 w-auto object-contain"
            src="/uber-logo.png"
            alt="Uber"
          />
        </motion.div>

        {/* Title Section */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-black to-slate-800 shadow-lg mb-5">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
            User Login
          </h1>
          <p className="text-slate-600 text-base">
            Welcome back! Please enter your credentials.
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="space-y-5"
        >
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none"
                type="email"
                required
                placeholder="user@uber.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-4 bg-black text-white font-semibold rounded-xl shadow-lg shadow-black/20 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/30 transition-all mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 my-8"
        >
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-sm text-slate-500 font-medium">or continue with</span>
          <div className="h-px bg-slate-200 flex-1" />
        </motion.div>

        {/* Social Login */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all"
              type="button"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="text-[#4285F4]"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="text-[#34A853]"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="text-[#FBBC05]"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="text-[#EA4335]"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all"
              type="button"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all"
              type="button"
            >
              <svg
                className="w-6 h-6 text-slate-900"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Signup Link */}
        <motion.div variants={itemVariants} className="mt-auto pt-12">
          <p className="text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/user-Signup"
              className="font-bold text-black hover:underline underline-offset-4 transition-all"
            >
              SignUp
            </Link>
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Userlogin;