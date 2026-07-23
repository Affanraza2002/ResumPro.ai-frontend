import { FolderIcon, Plus, Trash2, ChevronUpIcon, ChevronDownIcon, ExternalLinkIcon } from 'lucide-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => onChange([...data, { name: '', type: '', description: '', url: '' }])
  const removeProject = (index) => onChange(data.filter((_, i) => i !== index))
  const updateProject = (index, field, value) => {
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
          <h3 className="text-lg font-bold text-slate-900">Projects</h3>
          <p className="text-sm text-slate-500 mt-0.5">Showcase your best work</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={addProject}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-sm shadow-emerald-200 hover:shadow-emerald-300 transition-shadow"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </motion.button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <FolderIcon className="w-12 h-12 mx-auto mb-3 text-slate-200" />
          <p className="text-sm font-medium text-slate-400">No projects added yet</p>
          <p className="text-xs text-slate-300 mt-1">Click "Add Project" to showcase your work</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {data.map((project, index) => (
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
                    <div className="w-6 h-6 rounded-md bg-sky-100 flex items-center justify-center">
                      <FolderIcon className="w-3.5 h-3.5 text-sky-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {project.name || `Project #${index + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors">
                      <ChevronUpIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === data.length - 1} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 disabled:opacity-30 transition-colors">
                      <ChevronDownIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => removeProject(index)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <input
                    value={project.name || ""}
                    onChange={e => updateProject(index, "name", e.target.value)}
                    placeholder="Project Name"
                    className="px-3 py-2 text-sm bg-white"
                  />
                  <input
                    value={project.type || ""}
                    onChange={e => updateProject(index, "type", e.target.value)}
                    placeholder="Type (e.g., Web App, Mobile App, API)"
                    className="px-3 py-2 text-sm bg-white"
                  />
                  <div className="relative">
                    <ExternalLinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                    <input
                      value={project.url || ""}
                      onChange={e => updateProject(index, "url", e.target.value)}
                      placeholder="Project URL (optional)"
                      type="url"
                      className="pl-8 px-3 py-2 text-sm bg-white w-full"
                    />
                  </div>
                  <textarea
                    value={project.description || ""}
                    rows={3}
                    onChange={e => updateProject(index, "description", e.target.value)}
                    placeholder="Describe what you built, technologies used, and impact..."
                    className="w-full px-3 py-2 text-sm bg-white"
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

export default ProjectForm