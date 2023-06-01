import React from "react";
import "./Button.css";
export const Button = ({ text,onClick }) => {
  return <button className="load_button" onClick={onClick}>{text}</button>;
};
