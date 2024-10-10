"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/marketplace');
    }

    // Avoid hydration mismatch by ensuring client-side rendering
    setIsSuccess(null);
    setMessage('');
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(null);

    try {
      const response = await fetch("https://learnchain-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uName: username,
          pass: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and other user data to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("uName", data.uName);
        localStorage.setItem("name", data.name);
        localStorage.setItem("walletAddress", data.walletAddress);
        localStorage.setItem("uuid", data.uuid);

        setMessage("Login successful! Redirecting to marketplace...");
        setIsSuccess(true);
        setTimeout(() => {
          // Redirect to marketplace page after 2 seconds
          router.push("/marketplace");
        }, 2000);
      } else {
        setMessage(data.error || "Login failed. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <Card className="w-full max-w-sm bg-white text-black border border-gray-300 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl">LearnChain</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <div className="flex items-center gap-2 p-2 rounded border border-gray-300">
                <User className="h-5 w-5 text-gray-500" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-transparent text-black border-none focus:ring-0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="flex items-center gap-2 p-2 rounded border border-gray-300">
                <Lock className="h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent text-black border-none focus:ring-0"
                />
              </div>
            </div>
            {loading && <p className="text-center text-gray-500">Logging in...</p>}
            {message && (
              <Alert className={`mt-4 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                <AlertTitle>{isSuccess ? "Success!" : "Error"}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}