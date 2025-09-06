import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10">
        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Login to InterviewAI
          </h2>
          <div className="space-y-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 bg-white text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-100 transition-all"
            >
              <FcGoogle className="mr-2 text-xl" />
              Continue with Google
            </button>
            <button
              type="button"
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
          <form className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        {/* Code Editor Animation */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8">
          <div className="vscode-mini-editor w-full max-w-sm shadow-2xl glow-blue-enhanced">
            {/* VS Code Header */}
            <div className="vscode-mini-header">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
                </div>
                <span className="text-xs text-[#cccccc] font-medium">login.js</span>
              </div>
            </div>
            
            {/* VS Code Content */}
            <div className="vscode-mini-content">
              <div className="flex">
                <div className="text-[#858585] text-right pr-3 select-none font-mono text-xs">
                  {Array.from({length: 12}, (_, i) => (
                    <div key={i} className="leading-5">{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 font-mono text-xs leading-5">
                  <div className="text-[#6a9955]">// Welcome back!</div>
                  <div className="text-[#6a9955]">// Login to access your dashboard</div>
                  <div></div>
                  <div><span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">email</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">"you@example.com"</span><span className="text-[#d4d4d4]">;</span></div>
                  <div><span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">password</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">"••••••••"</span><span className="text-[#d4d4d4]">;</span></div>
                  <div></div>
                  <div><span className="text-[#c586c0]">if</span> <span className="text-[#d4d4d4]">(</span><span className="text-[#dcdcaa]">login</span><span className="text-[#d4d4d4]">(</span><span className="text-[#9cdcfe]">email</span><span className="text-[#d4d4d4]">,</span> <span className="text-[#9cdcfe]">password</span><span className="text-[#d4d4d4]">))</span> <span className="text-[#d4d4d4]">{</span></div>
                  <div><span className="text-[#d4d4d4]">  </span><span className="text-[#dcdcaa]">redirect</span><span className="text-[#d4d4d4]">(</span><span className="text-[#ce9178]">"/dashboard"</span><span className="text-[#d4d4d4]">);</span></div>
                  <div><span className="text-[#d4d4d4]">}</span></div>
                  <div></div>
                  <div><span className="text-[#6a9955]">// Start your AI journey</span><span className="animate-pulse">|</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
