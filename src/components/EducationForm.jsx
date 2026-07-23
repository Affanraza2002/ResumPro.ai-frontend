import { GraduationCap, Plus, Trash2, ChevronUpIcon, ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => onChange([...data, { institution: '', degree: '', field: '', graduation_date: '', gpa: '' }])
  const removeEducation = (index) => onChange(data.filter((_, i) => i !== index))
  const updateEducation = (index, field, value) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }
  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...data]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    onChange(updated)
  }
  const moveDown = (index) => {
    if (index === data.length - 1) return
    const updated = [...data]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    onChange(updated)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Education</h3>
          <p className="text-sm text-slate-500 mt-0.5">Your academic qualifications</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-sm shadow-emerald-200 hover:shadow-emerald-300 transition-shadow"
        >
          <Plus className="w-3.5 h-3.5" /> Add Education
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-200" />
          <p className="text-sm font-medium text-slate-400">No education added yet</p>
          <p className="text-xs text-slate-300 mt-1">Click "Add Education" to get started</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {data.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {edu.institution || `Education #${index + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors">
                      <ChevronUpIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors">
                      <ChevronDownIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeEducation(index)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={edu.institution || ""}
                    onChange={e => updateEducation(index, "institution", e.target.value)}
                    placeholder="University / Institution"
                    className="col-span-2 px-3 py-2 text-sm bg-white"
                  />
                  <input
                    value={edu.degree || ""}
                    onChange={e => updateEducation(index, "degree", e.target.value)}
                    placeholder="Degree (e.g., Bachelor's)"
                    className="px-3 py-2 text-sm bg-white"
                  />
                  <input
                    value={edu.field || ""}
                    onChange={e => updateEducation(index, "field", e.target.value)}
                    placeholder="Field of Study"
                    className="px-3 py-2 text-sm bg-white"
                  />
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Graduation Date</label>
                    <input
                      value={edu.graduation_date || ""}
                      onChange={e => updateEducation(index, "graduation_date", e.target.value)}
                      type="month"
                      className="w-full px-3 py-2 text-sm bg-white"
                    />
                  </div>
                  <input
                    value={edu.gpa || ""}
                    onChange={e => updateEducation(index, "gpa", e.target.value)}
                    placeholder="GPA (e.g., 3.8/4.0)"
                    className="px-3 py-2 text-sm bg-white self-end"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

export default EducationForm