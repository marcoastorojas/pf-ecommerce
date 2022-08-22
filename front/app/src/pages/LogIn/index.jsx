import React, { useState } from "react";
import LogInForm from "../../components/LogInForm";

export default function LogIn() {
 const adminUser = {
  email: "admin@admin.com",
  password: "admin123",
 };

 const [user, setUser] = useState({ name: "", email: "" });
 const [error, setError] = useState("");

 const LogIn = (details) => {
  console.log(details);
  if (
   details.email === adminUser.email &&
   details.password === adminUser.password
  ) {
   console.log("Logged in");
   setUser({
    name: details.name,
    email: details.email,
   });
  } else {
   console.log("Details do not match!");
   setError("Details do not match!");
  }
 };

 const LogOut = () => {
  setUser({
   name: "",
   email: "",
  });
 };

 return (
  <div>
   <h1>Log in Page</h1>
   {user.email !== "" ? (
    <div className="welcome">
     <h2>
      Welcome <span>{user.name}</span>
     </h2>
     <button onClick={LogOut}>Logout</button>
    </div>
   ) : (
    <LogInForm LogIn={LogIn} error={error} />
   )}
  </div>
 );
}
