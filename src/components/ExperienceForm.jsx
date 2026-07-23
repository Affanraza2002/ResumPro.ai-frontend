import { Briefcase, Loader2, Plus, Sparkles, Trash2, ChevronUpIcon, ChevronDownIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import { motion, AnimatePresence } from 'framer-motion'

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    onChange([...data, {
      company: '', position: '', start_date: '', end_date: '', description: '', is_current: false,
    }])
  }

  const removeExperience = (index) => onChange(data.filter((_, i) => i !== index))

  const updateExperience = (index, field, value) => {
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

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const exp = data[index]
    const prompt = `Enhance this job description for the position of "${exp.position}" at "${exp.company}": "${exp.description}". Make it concise, impactful with action verbs and quantifiable achievements. ATS-friendly.`
    try {
      const { data: res } = await api.post('/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
      updateExperience(index, "description", res.enhancedContent)
      toast.success('Description enhanced!')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Work Experience</h3>
          <p className="text-sm text-slate-500 mt-0.5">Add your professional work history</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-sm shadow-emerald-200 hover:shadow-emerald-300 transition-shadow"
        >
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-200" />
          <p className="text-sm font-medium text-slate-400">No experience added yet</p>
          <p className="text-xs text-slate-300 mt-1">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {data.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-indigo-200 transition-colors"
              >
                {/* Card header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-indigo-100 flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {experience.position || `Experience #${index + 1}`}
                    </span>
                    {experience.is_current && (
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[10px] font-semibold">CURRENT</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors">
                      <ChevronUpIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors">
                      <ChevronDownIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeExperience(index)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={experience.company || ""}
                    onChange={e => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                    className="px-3 py-2 text-sm bg-white"
                  />
                  <input
                    value={experience.position || ""}
                    onChange={e => updateExperience(index, "position", e.target.value)}
                    placeholder="Job Title"
                    className="px-3 py-2 text-sm bg-white"
                  />
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Start Date</label>
                    <input
                      value={experience.start_date || ""}
                      onChange={e => updateExperience(index, "start_date", e.target.value)}
                      type="month"
                      className="w-full px-3 py-2 text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">End Date</label>
                    <input
                      value={experience.end_date || ""}
                      onChange={e => updateExperience(index, "end_date", e.target.value)}
                      type="month"
                      disabled={experience.is_current}
                      className="w-full px-3 py-2 text-sm bg-white disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={experience.is_current || false}
                      onChange={e => updateExperience(index, "is_current", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-300 rounded-full peer peer-checked:bg-emerald-500 transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                  </div>
                  <span className="text-xs text-slate-600 group-hover:text-slate-800 transition-colors">Currently working here</span>
                </label>

                {/* Job description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Job Description</label>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => generateDescription(index)}
                      disabled={generatingIndex === index || !experience.position || !experience.company}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50"
                    >
                      {generatingIndex === index ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Enhance with AI
                    </motion.button>
                  </div>
                  <textarea
                    value={experience.description || ""}
                    onChange={e => updateExperience(index, "description", e.target.value)}
                    rows={4}
                    className="w-full text-sm px-3 py-2 bg-white"
                    placeholder="Describe your responsibilities and key achievements..."
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

export default ExperienceForm