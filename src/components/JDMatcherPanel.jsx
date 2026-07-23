import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BriefcaseIcon, XIcon, Loader2, CheckCircle, AlertCircle, Search, Tag } from 'lucide-react'
import api from '../configs/api'
import toast from 'react-hot-toast'

const JDMatcherPanel = ({ resumeData, token, onClose }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post(
        '/ai/match-jd',
        { resumeData, jobDescription },
        { headers: { Authorization: token } }
      )
      setResult(data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = !result ? 'text-slate-400'
    : result.match_score >= 75 ? 'text-emerald-500'
    : result.match_score >= 50 ? 'text-amber-500'
    : 'text-red-500'

  const scoreRingColor = !result ? '#94a3b8'
    : result.match_score >= 75 ? '#10b981'
    : result.match_score >= 50 ? '#f59e0b'
    : '#ef4444'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-slate-200 z-[60] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5 text-teal-500" />
          <h3 className="font-bold text-slate-900">JD Matcher</h3>
        </div>
        <button
          onClick={onClose}
          title="Close"
          className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-all duration-200"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* JD Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Paste Job Description</label>
          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={8}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 resize-none text-slate-600 placeholder-slate-300 transition-all leading-relaxed"
          />
          <p className="text-xs text-slate-400 mt-1">{jobDescription.length} chars</p>
        </div>

        <button
          onClick={analyze}
          disabled={loading || !jobDescription.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-teal-200 hover:shadow-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Search className="w-4 h-4" /> Match Resume to JD</>}
        </button>

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Score ring */}
              <div className="flex flex-col items-center py-2">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="46" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                    <circle
                      cx="56" cy="56" r="46" fill="none"
                      stroke={scoreRingColor}
                      strokeWidth="10"
                      strokeDasharray={`${(result.match_score / 100) * 289.0} 289.0`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 1s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${scoreColor}`}>{result.match_score}</span>
                    <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 text-center mt-3 font-medium">{result.summary}</p>
              </div>

              {/* Matched keywords */}
              {result.matched_keywords?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Matched Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matched_keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing keywords */}
              {result.missing_keywords?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
                    <Tag className="w-3.5 h-3.5 text-red-400" /> Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing_keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-50 border border-red-200 text-red-600 rounded-full text-xs font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Suggestions
                  </h4>
                  <div className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <p className="text-xs text-amber-700">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Re-analyze */}
              <button
                onClick={analyze}
                className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-teal-100"
              >
                <Search className="w-4 h-4" /> Re-analyze
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default JDMatcherPanel
