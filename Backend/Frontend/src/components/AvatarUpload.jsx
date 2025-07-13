"use client"

import { useState, useRef } from "react"
import { Camera, User } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

function AvatarUpload({ onAvatarChange, currentAvatar }) {
  const [preview, setPreview] = useState(currentAvatar || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const { theme } = useTheme()

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target.result
        setPreview(result)
        onAvatarChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`
          relative w-24 h-24 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105
          ${
            isDragging
              ? theme === "light"
                ? "ring-4 ring-blue-400 ring-opacity-50"
                : "ring-4 ring-blue-500 ring-opacity-50"
              : ""
          }
          ${
            theme === "light"
              ? "bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 shadow-lg hover:shadow-xl"
              : "bg-slate-700 hover:bg-slate-600 shadow-lg"
          }
        `}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <img
            src={preview || "/placeholder.svg"}
            alt="Avatar preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-full">
            <User
              className={`
              w-8 h-8 transition-colors duration-300
              ${theme === "light" ? "text-blue-500" : "text-slate-400"}
            `}
            />
          </div>
        )}
        <div
          className={`
          absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
          ${theme === "light" ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg" : "bg-blue-600 shadow-lg"}
        `}
        >
          <Camera className="w-3 h-3 text-white" />
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <p
        className={`
        text-sm text-center transition-colors duration-300
        ${theme === "light" ? "text-gray-600" : "text-slate-400"}
      `}
      >
        Click or drag to upload avatar
      </p>
    </div>
  )
}

export default AvatarUpload
