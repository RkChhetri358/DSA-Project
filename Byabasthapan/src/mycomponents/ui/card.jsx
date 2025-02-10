// src/mycomponents/ui/card.jsx
import React from "react";

export const Card = ({ children, className }) => {
  return <div className={`p-4 rounded-lg shadow-lg ${className}`}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
