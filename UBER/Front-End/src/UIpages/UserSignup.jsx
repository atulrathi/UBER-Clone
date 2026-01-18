import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../context/userContext";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Shield } from "lucide-react";

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [Lastname, setLastname] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const {user , setuser} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userdata = {
      fullname: {
        Firstname: FirstName,
        Lastname: Lastname,
      },
      email: email,
      password: password,
    };
    const newuser = await axios.post("https://uber-clone-t911.onrender.com/createuser/register", userdata);
    if (newuser.status === 201) {
      const data = newuser.data;
      setuser(data.user);
      navigate("/user-Login");
    }
    console.log(user);
    setEmail('');
    setPassword('');
    setconfirmPassword('');
    setFirstName('');
    setLastname('');
    setLastname('');
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
          to="/user-Login"
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
        className="flex-1 flex flex-col px-6 pt-6 pb-8 max-w-md mx-auto w-full"
      >
        {/* Title Section */}
        <motion.div variants={itemVariants} className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-black to-slate-800 shadow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            Sign Up
          </h1>
          <p className="text-slate-600 text-sm">
            Create your account to get started
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="space-y-4"
        >
          {/* Name Fields */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={FirstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                  type="text"
                  required
                  placeholder="First Name"
                />
              </div>
              <input
                value={Lastname}
                onChange={(e) => {
                  setLastname(e.target.value)
                }}
                className="flex-1 px-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                type="text"
                required
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                type="email"
                required
                placeholder="user@uber.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                type="password"
                placeholder="Create a strong password"
                required
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value)
                }}
                className="w-full pl-10 pr-3 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-black focus:ring-4 focus:ring-black/5 transition-all outline-none text-sm"
                type="password"
                placeholder="Re-enter your password"
                required
              />
            </div>
          </div>

          {/* Terms Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mt-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              By proceeding you consent to get emails, WhatsApp or SMS messages, including by automated means, from UBER and its affiliates to the email provided.
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3.5 bg-black text-white font-semibold rounded-xl shadow-lg shadow-black/20 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/30 transition-all mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-auto pt-8">
          <p className="text-center text-xs text-slate-500">
            <Link to="/privacy" className="font-semibold text-slate-700 hover:underline underline-offset-2">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link to="/terms" className="font-semibold text-slate-700 hover:underline underline-offset-2">
              Terms of Service
            </Link>
            {" "}apply
          </p>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default UserSignup;