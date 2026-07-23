import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusIcon, Trash2Icon, ChevronDownIcon, ChevronUpIcon, GripVerticalIcon } from 'lucide-react'

const CustomSectionForm = ({ data = [], onChange }) => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [expandedItem, setExpandedItem] = useState(null)

  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: 'New Section',
      items: []
    }
    onChange([...data, newSection])
    setExpandedSection(newSection.id)
  }

  const removeSection = (sectionId) => {
    onChange(data.filter(s => s.id !== sectionId))
    if (expandedSection === sectionId) setExpandedSection(null)
  }

  const updateSectionTitle = (sectionId, title) => {
    onChange(data.map(s => s.id === sectionId ? { ...s, title } : s))
  }

  const addItem = (sectionId) => {
    const newItem = { id: Date.now().toString(), label: '', value: '' }
    onChange(data.map(s => s.id === sectionId
      ? { ...s, items: [...(s.items || []), newItem] }
      : s
    ))
  }

  const updateItem = (sectionId, itemId, field, value) => {
    onChange(data.map(s => s.id === sectionId
      ? { ...s, items: s.items.map(it => it.id === itemId ? { ...it, [field]: value } : it) }
      : s
    ))
  }

  const removeItem = (sectionId, itemId) => {
    onChange(data.map(s => s.id === sectionId
      ? { ...s, items: s.items.filter(it => it.id !== itemId) }
      : s
    ))
  }

  const PRESETS = ['Certifications', 'Languages', 'Awards', 'Publications', 'Volunteering', 'Hobbies']

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Custom Sections</h2>
          <p className="text-xs text-slate-500 mt-0.5">Add sections like Certifications, Languages, or Awards</p>
        </div>
      </div>

      {/* Preset suggestions */}
      {data.length === 0 && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
          <p className="text-xs font-semibold text-emerald-700 mb-2.5">Quick Add</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(preset => (
              <button
                key={preset}
                onClick={() => {
                  const newSection = { id: Date.now().toString(), title: preset, items: [{ id: Date.now().toString() + '1', label: '', value: '' }] }
                  onChange([...data, newSection])
                  setExpandedSection(newSection.id)
                }}
                className="px-2.5 py-1 bg-white border border-emerald-200 text-emerald-600 rounded-full text-xs hover:bg-emerald-50 transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sections */}
      <AnimatePresence>
        {data.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Section header */}
            <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-100">
              <GripVerticalIcon className="w-4 h-4 text-slate-300 shrink-0" />
              <input
                value={section.title}
                onChange={e => updateSectionTitle(section.id, e.target.value)}
                placeholder="Section title (e.g. Certifications)"
                className="flex-1 text-sm font-semibold bg-transparent outline-none text-slate-800 placeholder-slate-300"
              />
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="p-1 hover:bg-slate-200 rounded-lg transition-colors text-slate-400"
              >
                {expandedSection === section.id ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => removeSection(section.id)}
                className="p-1 hover:bg-red-100 rounded-lg transition-colors text-red-400"
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </div>

            {/* Section body */}
            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-3 space-y-2 overflow-hidden"
                >
                  {section.items?.map(item => (
                    <div key={item.id} className="flex items-start gap-2">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          value={item.label}
                          onChange={e => updateItem(section.id, item.id, 'label', e.target.value)}
                          placeholder="Label (e.g. AWS Certified)"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all"
                        />
                        <input
                          value={item.value}
                          onChange={e => updateItem(section.id, item.id, 'value', e.target.value)}
                          placeholder="Value (e.g. 2024)"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all"
                        />
                      </div>
                      <button
                        onClick={() => removeItem(section.id, item.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors mt-0.5 shrink-0"
                      >
                        <Trash2Icon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addItem(section.id)}
                    className="w-full py-2 border border-dashed border-emerald-300 text-emerald-600 text-xs font-medium rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> Add Entry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add section button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={addSection}
        className="w-full py-3 border-2 border-dashed border-emerald-200 text-emerald-600 rounded-xl text-sm font-semibold hover:bg-emerald-50/50 transition-colors flex items-center justify-center gap-2"
      >
        <PlusIcon className="w-4 h-4" /> Add Custom Section
      </motion.button>
    </div>
  )
}

export default CustomSectionForm
