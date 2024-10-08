"use client"

import { useState } from 'react';
import Head from 'next/head';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpData, setSignUpData] = useState({ username: '', name: '', password: '', walletAddress: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('SignUp Data:', signUpData);
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
                  <Label htmlFor="signUpUsername" className="text-gray-700">Username</Label>
                  <Input
                    id="signUpUsername"
                    type="text"
                    value={signUpData.username}
                    onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signUpName" className="text-gray-700">Name</Label>
                  <Input
                    id="signUpName"
                    type="text"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signUpPassword" className="text-gray-700">Password</Label>
                  <Input
                    id="signUpPassword"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="walletAddress" className="text-gray-700">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    type="text"
                    value={signUpData.walletAddress}
                    onChange={(e) => setSignUpData({ ...signUpData, walletAddress: e.target.value })}
                    required
                  />
                </div>
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