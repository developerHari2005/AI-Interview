import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Sign Up for InterviewAI
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
            <div>
              <label className="block text-gray-300 mb-1">
                Confirm Password
              </label>
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
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 hover:underline">
              Login
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
                <span className="text-xs text-gray-300 font-medium">signup.js</span>
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
                  <div className="leading-5">11</div>
                  <div className="leading-5">12</div>
                </div>
                <div className="flex-1 font-mono text-xs leading-5">
                  <div className="text-green-400">// New here?</div>
                  <div className="text-green-400">// Create your InterviewAI account</div>
                  <div></div>
                  <div>
                    <span className="text-blue-400">function</span>{" "}
                    <span className="text-yellow-300">signup</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-cyan-300">email</span>
                    <span className="text-gray-300">,</span>{" "}
                    <span className="text-cyan-300">password</span>
                    <span className="text-gray-300">)</span>{" "}
                    <span className="text-gray-300">{"{"}</span>
                  </div>
                  <div>
                    <span className="text-gray-300">  </span>
                    <span className="text-green-400">// Validate input</span>
                  </div>
                  <div>
                    <span className="text-gray-300">  </span>
                    <span className="text-purple-400">if</span>{" "}
                    <span className="text-gray-300">(!</span>
                    <span className="text-cyan-300">email</span>{" "}
                    <span className="text-gray-300">||</span>{" "}
                    <span className="text-gray-300">!</span>
                    <span className="text-cyan-300">password</span>
                    <span className="text-gray-300">)</span>{" "}
                    <span className="text-blue-400">return</span>{" "}
                    <span className="text-blue-400">false</span>
                    <span className="text-gray-300">;</span>
                  </div>
                  <div></div>
                  <div>
                    <span className="text-gray-300">  </span>
                    <span className="text-green-400">// Create account</span>
                  </div>
                  <div>
                    <span className="text-gray-300">  </span>
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-cyan-300">user</span>{" "}
                    <span className="text-gray-300">=</span>{" "}
                    <span className="text-blue-400">await</span>{" "}
                    <span className="text-yellow-300">createUser</span>
                    <span className="text-gray-300">(</span>
                    <span className="text-cyan-300">email</span>
                    <span className="text-gray-300">);</span>
                  </div>
                  <div>
                    <span className="text-gray-300">  </span>
                    <span className="text-blue-400">return</span>{" "}
                    <span className="text-cyan-300">user</span>
                    <span className="text-gray-300">;</span>
                  </div>
                  <div>
                    <span className="text-gray-300">{"}"}</span>
                  </div>
                  <div>
                    <span className="text-green-400">// Join thousands of users</span>
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