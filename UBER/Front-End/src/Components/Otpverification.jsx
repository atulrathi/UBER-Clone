import React, { useEffect, useRef, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTPVerification = ({
  phone = "",
  length = 6,
  onVerify = () => {},
  onResend = () => {},
  setOTP,
  otpdata,
  ridedata,
  setRidestart,
  setnewride,
  setbasic,
  setRideup,
}) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const onCancel = () => {
    setOTP(false);
  };

  useEffect(() => {
    // Focus the first input when mounted
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown for resend
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const updateAt = (idx, val) => {
    setValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleChange = (e, idx) => {
    const raw = e.target.value;
    const val = raw.replace(/[^0-9]/g, "");

    if (!val) {
      updateAt(idx, "");
      return;
    }

    if (val.length > 1) {
      const next = [...values];
      for (let i = 0; i < val.length && idx + i < length; i++) {
        next[idx + i] = val[i];
      }
      setValues(next);
      const focusIdx = Math.min(length - 1, idx + val.length);
      inputsRef.current[focusIdx]?.focus();
      return;
    }

    updateAt(idx, val);
    if (val && idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx]) {
        updateAt(idx, "");
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        updateAt(idx - 1, "");
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text");
    const digits = text.replace(/[^0-9]/g, "").slice(0, length);
    if (!digits) return;
    const next = Array(length).fill("");
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setValues(next);
    const focusIdx = Math.min(length - 1, digits.length);
    inputsRef.current[focusIdx]?.focus();
  };

  const submit = async () => {
    const liveValues = inputsRef.current.map((input) => input?.value || "");
    const code = liveValues.join("");

    if (code.length !== length) {
      setError(`Please enter the ${length}-digit code sent to your phone.`);
      return;
    }

    setError("");
    setIsVerifying(true);

    try {
      // Compare with otpdata
      if (code === otpdata?.otp?.toString()) {
        alert("✅ OTP Verified Successfully!");
        onVerify(code);
        setOTP(false);
        setRidestart(false);
        setnewride(false);
        setbasic(false);
        setRideup(true);
        const response = await axios.post("http://localhost:4000/start/ride",{ridedata});
      } else {
        setError("❌ Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setIsResending(true);
    try {
      await onResend();
      setTimer(60);
      alert("📩 A new OTP has been sent to your phone.");
    } catch (err) {
      setError(err?.message || "Could not resend code. Try again later.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mx-auto overflow-hidden">
      <h2 className="text-2xl font-semibold mb-1">Verify your phone</h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter the <strong>{length}-digit</strong> code sent to{" "}
        <span className="font-medium">{phone}</span>.
      </p>

      {/* OTP Inputs */}
      <div
        className="flex gap-3 justify-center mb-4"
        onPaste={handlePaste}
        aria-label={`OTP input with ${length} fields`}
      >
        {values.map((v, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={v}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            className={`w-12 h-12 text-center text-lg font-medium rounded-xl border transition-shadow outline-none focus:shadow-md focus:border-black ${
              error ? "border-red-300" : "border-gray-200"
            }`}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-600 mb-3 text-center">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-3 items-center">
        <button
          onClick={submit}
          disabled={isVerifying}
          className="flex-1 px-4 py-2 rounded-lg shadow-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed bg-black text-white"
        >
          {isVerifying ? "Verifying…" : "Verify & Continue"}
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-200 font-medium text-sm"
        >
          Cancel
        </button>
      </div>

      {/* Resend OTP */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {timer > 0 ? (
          <span>
            Didn’t receive a code? You can resend in <strong>{timer}s</strong>.
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="underline font-medium disabled:opacity-60"
          >
            {isResending ? "Resending…" : "Resend code"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        By continuing, you agree to receive SMS messages for authentication.
        Message and data rates may apply.
      </div>
    </div>
  );
};

export default OTPVerification;
