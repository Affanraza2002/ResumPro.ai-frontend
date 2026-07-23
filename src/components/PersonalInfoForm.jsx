import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, CameraIcon } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const FIELDS = [
  { key: "full_name", label: "Full Name", icon: User, type: "text", required: true, placeholder: "John Doe" },
  { key: "email", label: "Email Address", icon: Mail, type: "email", required: true, placeholder: "john@example.com" },
  { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+1 (555) 000-0000" },
  { key: "location", label: "Location", icon: MapPin, type: "text", placeholder: "New York, NY" },
  { key: "profession", label: "Profession / Title", icon: BriefcaseBusiness, type: "text", placeholder: "Software Engineer" },
  { key: "linkedin", label: "LinkedIn URL", icon: Linkedin, type: "url", placeholder: "linkedin.com/in/johndoe" },
  { key: "website", label: "Personal Website", icon: Globe, type: "url", placeholder: "johndoe.dev" },
]

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
        <p className="text-sm text-slate-500 mt-0.5">Your basic contact details for recruiters</p>
      </div>

      {/* Avatar upload */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <label className="cursor-pointer group relative">
          {data.image ? (
            <img
              src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-300 shadow-md group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-dashed border-indigo-300 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
              <User className="w-7 h-7 text-indigo-300 group-hover:text-indigo-400 transition-colors" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-md group-hover:bg-indigo-600 transition-colors">
            <CameraIcon className="w-3 h-3 text-white" />
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={e => handleChange("image", e.target.files[0])}
          />
        </label>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700">Profile Photo</p>
          <p className="text-xs text-slate-400 mt-0.5">JPG or PNG, max 2MB</p>
          {typeof data.image === 'object' && (
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setRemoveBackground(prev => !prev)}
                  checked={removeBackground}
                />
                <div className="w-8 h-4 bg-slate-300 rounded-full peer peer-checked:bg-emerald-500 transition-colors duration-200" />
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4" />
              </div>
              <span className="text-xs text-slate-600">Remove background</span>
            </label>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {FIELDS.map((field, i) => {
          const Icon = field.icon
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="space-y-1.5"
            >
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                <Icon className="w-3.5 h-3.5 text-slate-400" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-3 py-2.5 text-sm"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default PersonalInfoForm