import { Loader2, Sparkles, FileText } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const TONES = [
  { id: 'professional', label: 'Professional' },
  { id: 'executive', label: 'Executive' },
  { id: 'technical', label: 'Technical' },
  { id: 'creative', label: 'Creative' },
]

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTone, setSelectedTone] = useState('professional')

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `Enhance my professional summary in a ${selectedTone} tone: "${data}". Make it compelling, ATS-friendly, and 2-3 sentences.`
      const response = await api.post('/ai/enhance-pro-sum', { userContent: prompt }, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
      toast.success('Summary enhanced!')
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const charCount = (data || '').length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Professional Summary</h3>
          <p className="text-sm text-slate-500 mt-0.5">A compelling overview of your career</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <FileText className="w-3.5 h-3.5" />
          <span className={charCount > 400 ? 'text-amber-500' : ''}>{charCount}/500</span>
        </div>
      </div>

      {/* Tone selector */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">AI Enhancement Tone</p>
        <div className="flex flex-wrap gap-2">
          {TONES.map(tone => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTone === tone.id ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={data || ""}
          onChange={e => onChange(e.target.value)}
          rows={7}
          maxLength={500}
          className="w-full p-4 text-sm leading-relaxed"
          placeholder="Write a compelling professional summary... e.g., 'Results-driven Software Engineer with 5+ years of experience building scalable web applications...'"
        />
      </div>

      {/* AI enhance button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={isGenerating || !data?.trim()}
        onClick={generateSummary}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Enhancing with AI...</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Enhance with AI</>
        )}
      </motion.button>

      <p className="text-xs text-slate-400 text-center">💡 Tip: Keep it 3-4 sentences. Focus on your most relevant achievements and career goals.</p>
    </div>
  )
}

export default ProfessionalSummaryForm