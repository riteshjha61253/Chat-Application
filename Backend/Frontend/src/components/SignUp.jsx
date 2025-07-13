"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { useTheme } from "../context/ThemeContext"
import { Link } from "react-router-dom"
import BASE_URL from "../config"
import ThemeToggle from "./ThemeToogle"
import AvatarUpload from "./AvatarUpload"
import Cookies from "js-cookie"

export default function SignUp() {
  const [authUser, setAuthUser] = useAuth()
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarChange = (avatarData) => {
    setFormData((prev) => ({
      ...prev,
      avatar: avatarData,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    const userInfo = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      avatar: formData.avatar,
    }

    fetch(`${BASE_URL}/user/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        return res.json()
      })
      .then((data) => {
        console.log("Server Response:", data)
        alert("Registration successful!")
        localStorage.setItem("ChatAPP", JSON.stringify(data))
        Cookies.set("jwt", JSON.stringify(data), { expires: 7 })
        setAuthUser(data)
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          avatar: null,
        })
      })
      .catch((error) => {
        console.error("Error during signup:", error)
        alert("Something went wrong. Please try again.")
      })
  }

  return (
    <div
      className={`
      flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 transition-all duration-500
      ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-white to-purple-50"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }
    `}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div
          className={`
          mx-auto h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 animate-pulse
          ${theme === "light" ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-gradient-to-br from-blue-600 to-blue-700"}
        `}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
            />
          </svg>
        </div>
        <h2
          className={`
          mt-10 text-center text-2xl/9 font-bold tracking-tight transition-all duration-300
          ${
            theme === "light"
              ? "text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
              : "text-white"
          }
        `}
        >
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div
          className={`
          p-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02]
          ${
            theme === "light"
              ? "bg-white/80 backdrop-blur-sm shadow-2xl shadow-blue-500/10 border border-blue-200/50"
              : "bg-slate-800/50 backdrop-blur-sm shadow-2xl border border-slate-700"
          }
        `}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload Section */}
            <div className="flex justify-center">
              <AvatarUpload onAvatarChange={handleAvatarChange} currentAvatar={formData.avatar} />
            </div>

            <div>
              <label
                htmlFor="fullName"
                className={`
                block text-sm/6 font-medium transition-colors duration-300
                ${theme === "light" ? "text-gray-800" : "text-gray-200"}
              `}
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`
                    block w-full rounded-lg px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 transform hover:scale-[1.01]
                    ${
                      theme === "light"
                        ? "bg-white border border-blue-200 text-gray-900 placeholder:text-blue-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-lg"
                        : "bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    }
                  `}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className={`
                block text-sm/6 font-medium transition-colors duration-300
                ${theme === "light" ? "text-gray-800" : "text-gray-200"}
              `}
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    block w-full rounded-lg px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 transform hover:scale-[1.01]
                    ${
                      theme === "light"
                        ? "bg-white border border-blue-200 text-gray-900 placeholder:text-blue-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-lg"
                        : "bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    }
                  `}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`
                block text-sm/6 font-medium transition-colors duration-300
                ${theme === "light" ? "text-gray-800" : "text-gray-200"}
              `}
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    block w-full rounded-lg px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 transform hover:scale-[1.01]
                    ${
                      theme === "light"
                        ? "bg-white border border-blue-200 text-gray-900 placeholder:text-blue-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-lg"
                        : "bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    }
                  `}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`
                block text-sm/6 font-medium transition-colors duration-300
                ${theme === "light" ? "text-gray-800" : "text-gray-200"}
              `}
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`
                    block w-full rounded-lg px-3 py-2 transition-all duration-300 focus:outline-none focus:ring-2 transform hover:scale-[1.01]
                    ${
                      theme === "light"
                        ? "bg-white border border-blue-200 text-gray-900 placeholder:text-blue-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-lg"
                        : "bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    }
                  `}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`
                  flex w-full justify-center rounded-lg px-3 py-2 text-sm/6 font-semibold transition-all duration-300 transform hover:scale-105
                  ${
                    theme === "light"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg"
                  }
                `}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p
            className={`
            mt-10 text-center text-sm/6 transition-colors duration-300
            ${theme === "light" ? "text-gray-600" : "text-gray-400"}
          `}
          >
            Have an account?{" "}
            <Link
              to="/signIn"
              className={`
              font-semibold transition-colors duration-300
              ${theme === "light" ? "text-blue-600 hover:text-purple-600" : "text-blue-400 hover:text-blue-300"}
            `}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
