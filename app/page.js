"use client"

import { useState } from 'react';
import Head from 'next/head';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Learnchain - Login</title>
      </Head>
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Learnchain Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label htmlFor="username" className="mb-2">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="mb-2">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
