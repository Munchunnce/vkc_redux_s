// src/components/Toast.js
import React, { useEffect } from "react";
import './Toast.css';

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-hide after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
