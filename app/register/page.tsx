/**
 * if we are using the react compoent in the nextjs we need to tell the nextjs 
 * that this is client compoenet => use client is used 
 */

"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmaPassword, setConfirmaPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e : React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password !== confirmaPassword) {
        alert("Password do not match");
        return;
    }

    try {

        const res = await fetch("/api/auth/register", {
            method : "POST", 
            headers : {
                "Conetent-Type" : "application/json",
            },
            body : JSON.stringify({
                email, password
            }),
        });

        const data = await res.json();

        if(!res.ok) {
            throw new Error(data.error || "Registeration failed");
        }

        console.log(data);

        router.push("/login");
    }
    catch(error) {
        console.log(error);
    }


  }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

            <input
            type = "email"
            placeholder = "Email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type = "password"
            placeholder = "Password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />

            <input
            type = "password"
            placeholder = "Confrim Password"
            value = {confirmaPassword}
            onChange = {(e) => setConfirmaPassword(e.target.value)}
            />

            <button type = "submit">Register</button>

        </form>

        <div>
            <p>Already have an account?<a href="/login">Login Here</a></p>
        </div>
            
    </div>
  )
}

export default RegisterPage