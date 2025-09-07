'use client';

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to dashboard or home
        router.push("/");
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/google");
      const data = await response.json();
      
      if (response.ok && data.success && data.auth_url) {
        // Redirect to Google OAuth
        window.location.href = data.auth_url;
      } else {
        setError(data.error || "Google login is not available yet");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Network error. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/github");
      const data = await response.json();
      
      if (response.ok && data.success && data.auth_url) {
        // Redirect to GitHub OAuth
        window.location.href = data.auth_url;
      } else {
        setError(data.error || "GitHub login is not available yet");
      }
    } catch (err) {
      console.error("GitHub login error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Login to InterviewAI
          </h2>
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full py-2 bg-white text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-100 transition-all"
            >
              <FcGoogle className="mr-2 text-xl" />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex items-center justify-center w-full py-2 bg-gray-800 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition-all"
            >
              <FaGithub className="mr-2 text-xl" />
              Continue with GitHub
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-2 text-gray-400 text-xs">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8">
          <div className="vscode-mini-editor w-full max-w-sm shadow-2xl glow-blue-enhanced">
            <div className="vscode-mini-header">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-300 font-medium">login.js</span>
              </div>
            </div>
            <div className="vscode-mini-content">
              <div className="flex">
                <div className="text-gray-500 text-right pr-3 select-none font-mono text-xs">
                  <div className="leading-5">1</div>
                  <div className="leading-5">2</div>
                  <div className="leading-5">3</div>
                  <div className="leading-5">4</div>
                  <div className="leading-5">5</div>
                  <div className="leading-5">6</div>
                  <div className="leading-5">7</div>
                  <div className="leading-5">8</div>
                  <div className="leading-5">9</div>
                  <div className="leading-5">10</div>
                </div>
                <div className="flex-1 font-mono text-xs leading-5">
                  <div className="text-green-400">// Welcome back!</div>
                  <div className="text-green-400">// Login to access your dashboard</div>
                  <div></div>
                  <div>
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-cyan-300">email</span>{" "}
                    <span className="text-gray-300">=</span>{" "}
                    <span className="text-orange-300">"you@example.com"</span>
                    <span className="text-gray-300">;</span>
                  </div>
                  <div>
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-cyan-300">password</span>{" "}
                    <span className="text-gray-300">=</span>{" "}
                    <span className="text-orange-300">"••••••••"</span>
                    <span className="text-gray-300">;</span>
                  </div>
                  <div></div>
                  <div>
                    <span className="text-purple-400">if</span>{" "}
                    <span className="text-gray-300">(</span>
                    <span className="text-yellow-300">login</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-cyan-300">email</span>
                    <span className="text-gray-300">,</span>{" "}
                    <span className="text-cyan-300">password</span>
                    <span className="text-gray-300">))</span>{" "}
                    <span className="text-gray-300">{"{"}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">  </span>
                    <span className="text-yellow-300">redirect</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-orange-300">"/dashboard"</span>
                    <span className="text-gray-300">);</span>
                  </div>
                  <div>
                    <span className="text-gray-300">{"}"}</span>
                  </div>
                  <div>
                    <span className="text-green-400">// Start your AI journey</span>
                    <span className="animate-pulse text-white">|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}