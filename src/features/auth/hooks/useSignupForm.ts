import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import useAuthStore from '../store/authStore';

export const useSignupForm = () => {
  const { phone, handleAuth, handleResendCode, resendTime } = useAuthStore();
  const [initialValues] = useState({ phone, password: "123456", code: "" });
  const [timeLeft, setTimeLeft] = useState(0);

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    code: Yup.string().required("Verification code is required"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTime) {
        const newTimeLeft = Math.max(0, resendTime - Date.now());
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === 0) {
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTime]);

  return { initialValues, validationSchema, handleAuth, handleResendCode, timeLeft };
};