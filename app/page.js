"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Wallet, Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpData, setSignUpData] = useState({ username: '', name: '', password: '', walletAddress: '' });
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(null);

    try {
      const response = await fetch("https://learnchain-backend.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uName: signUpData.username,
          name: signUpData.name,
          pass: signUpData.password,
          walletAddress: signUpData.walletAddress,
        }),
      });

      if (response.ok) {
        setMessage("Sign up successful! Redirecting to login...");
        setIsSuccess(true);
        setTimeout(() => {
          // Redirect to login page after 2 seconds
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage("Sign up failed. Please try again.");
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
      <Head>
        <title>Learnchain - Login</title>
      </Head>
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
                <Terminal className="h-4 w-4" />
                <AlertTitle>{isSuccess ? "Success!" : "Error"}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
              Login
            </Button>
          </form>
          <Separator className="my-4" />
          <Button variant="ghost" className="w-full text-black hover:bg-gray-100">
            <Wallet className="h-5 w-5 mr-2" /> Login with your wallet
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4 text-black border-black hover:bg-gray-100">
                Sign Up
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogDescription>
                  Create your account to access LearnChain.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="signUpUsername" className="text-gray-700">Username*</Label>
                  <Input
                    id="signUpUsername"
                    type="text"
                    value={signUpData.username}
                    onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signUpName" className="text-gray-700">Name*</Label>
                  <Input
                    id="signUpName"
                    type="text"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signUpPassword" className="text-gray-700">Password*</Label>
                  <Input
                    id="signUpPassword"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="walletAddress" className="text-gray-700">Wallet Address*</Label>
                  <Input
                    id="walletAddress"
                    type="text"
                    value={signUpData.walletAddress}
                    onChange={(e) => setSignUpData({ ...signUpData, walletAddress: e.target.value })}
                    required
                  />
                </div>
                {loading && <p className="text-center text-gray-500">Submitting...</p>}
                {message && (
                  <Alert className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{isSuccess ? "Success!" : "Error"}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}
                <DialogFooter>
                  <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                    Sign Up
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
}