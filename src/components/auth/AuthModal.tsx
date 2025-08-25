import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/Ui/button";
import { Input } from "@/components/Ui/input";
import { Label } from "@/components/Ui/label";
import { Card } from "@/components/Ui/card";
import { Mail, Lock, User, Shield, ArrowLeft } from "lucide-react";

export default function AuthModal() {
  const {
    showAuthModal,
    authModalTab,
    pendingEmail,
    isLoading,
    closeAuthModal,
    setAuthModalTab,
    login,
    sendVerificationCode,
    register,
  } = useUserStore();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (!showAuthModal) {
      // Reset form when modal closes
      setError("");
      setSuccess("");
      setLoginData({ email: "", password: "" });
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setVerificationCode("");
    }
  }, [showAuthModal]);

  if (!showAuthModal) return null;

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(loginData.email, loginData.password);
    if (!result.success) {
      setError(result.message || "Login failed");
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const result = await sendVerificationCode(
      registerData.name,
      registerData.email,
      registerData.password
    );

    if (result.success) {
      setSuccess(result.message || "Verification code sent to your email");
    } else {
      setError(result.message || "Failed to send verification code");
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }

    if (verificationCode.length !== 6) {
      setError("Verification code must be 6 digits");
      return;
    }

    const result = await register(
      registerData.name,
      registerData.email,
      registerData.password,
      verificationCode
    );

    if (!result.success) {
      setError(result.message || "Registration failed");
    }
  };

  const switchTab = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setError("");
    setSuccess("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {authModalTab === "login" && "Welcome Back"}
            {authModalTab === "register" && "Create Account"}
            {authModalTab === "verify" && "Verify Email"}
          </h2>
          <button
            onClick={closeAuthModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tab Switcher - Only show for login/register */}
        {authModalTab !== "verify" && (
          <div className="flex mb-6 border-b">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-2 px-4 font-medium ${authModalTab === "login"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`flex-1 py-2 px-4 font-medium ${authModalTab === "register"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Register
            </button>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Login Form */}
        {authModalTab === "login" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="login-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="login-password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="Enter your password"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        )}

        {/* Register Form - Step 1 */}
        {authModalTab === "register" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="register-name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="register-name"
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                placeholder="Enter your full name"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="register-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="register-email"
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="register-password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="register-password"
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                placeholder="Enter your password (min 6 characters)"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="register-confirm-password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <Input
                id="register-confirm-password"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({ ...registerData, confirmPassword: e.target.value })
                }
                placeholder="Confirm your password"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleSendCode}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Sending Code..." : "Send Verification Code"}
            </Button>
          </div>
        )}

        {/* Email Verification - Step 2 */}
        {authModalTab === "verify" && (
          <div className="space-y-4">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">
                We've sent a 6-digit verification code to:
              </p>
              <p className="font-semibold text-blue-600">
                {pendingEmail}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please check your email and enter the code below
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="verification-code" className="flex items-center gap-2 justify-center">
                  <Shield className="w-4 h-4" />
                  Verification Code
                </Label>
                <Input
                  id="verification-code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    // Only allow numbers and limit to 6 digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setVerificationCode(value);
                  }}
                  placeholder="Enter 6-digit code"
                  required
                  className="mt-1 text-center text-lg tracking-widest"
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyAndRegister}
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Complete Registration"}
              </Button>

              <button
                onClick={() => setAuthModalTab("register")}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 py-2"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Registration
              </button>
            </div>
          </div>
        )}

        {/* Footer - Only show for login/register */}
        {authModalTab !== "verify" && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {authModalTab === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => switchTab("register")}
                  className="text-blue-600 hover:underline font-medium"
                  disabled={isLoading}
                >
                  Sign up here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => switchTab("login")}
                  className="text-blue-600 hover:underline font-medium"
                  disabled={isLoading}
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}