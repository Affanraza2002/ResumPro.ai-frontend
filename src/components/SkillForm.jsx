import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SUGGESTED_SKILLS = ["JavaScript", "React", "Node.js", "Python", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git", "REST APIs", "GraphQL"]

const SkillForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }
  const removeSkill = (indexToRemove) => onChange(data.filter((_, index) => index !== indexToRemove))
  const handleKeyPress = (e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }
  const addSuggested = (skill) => { if (!data.includes(skill)) onChange([...data, skill]) }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Skills</h3>
        <p className="text-sm text-slate-500 mt-0.5">Add your technical and soft skills</p>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a skill and press Enter..."
          className="flex-1 px-3 py-2.5 text-sm"
          onChange={e => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-sm shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" /> Add
        </motion.button>
      </div>

      {/* Added skills */}
      {data.length > 0 ? (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Added Skills ({data.length})</p>
          <div className="flex flex-wrap gap-2 min-h-10">
            <AnimatePresence>
              {data.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-medium"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-emerald-200 transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-slate-200" />
          <p className="text-sm text-slate-400">No skills added yet</p>
        </div>
      )}

      {/* Suggestions */}
      <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
        <p className="text-xs font-semibold text-emerald-700 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Quick Add Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.filter(s => !data.includes(s)).map(skill => (
            <button
              key={skill}
              onClick={() => addSuggested(skill)}
              className="px-2.5 py-1 bg-white border border-emerald-200 text-emerald-600 rounded-full text-xs hover:bg-emerald-50 transition-colors"
            >
              + {skill}
            </button>
          ))}
        </div>
        <p className="text-xs text-emerald-500 mt-3">💡 Tip: Add 8–12 skills including technical and soft skills for best ATS results.</p>
      </div>
    </div>
  )
}

export default SkillForm