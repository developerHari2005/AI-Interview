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
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <div className="w-80 h-64 rounded-lg shadow-lg bg-gray-900 border border-gray-700 p-4 relative overflow-hidden animate-pulse">
            <div className="flex space-x-2 mb-4">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-line">
              {`// Welcome back!
// Login to access your AI interview dashboard

const email = "you@example.com";
const password = "••••••••";

if (login(email, password)) {
  redirect("/dashboard");
}
`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
