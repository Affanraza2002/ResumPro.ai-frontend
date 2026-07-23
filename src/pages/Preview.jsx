import React, { useEffect, useState } from 'react'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeft, Download, Loader2, FileText, Share2, Copy, CheckIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import api from '../configs/api'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Preview = () => {
  const { resumeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)
  const [copied, setCopied] = useState(false)

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/resumes/public/` + resumeId)
      setResumeData(data.resume)
      if (data.resume?.personal_info?.full_name) {
        document.title = `${data.resume.personal_info.full_name} — Resume`
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadResume() }, [])

  const handleDownload = () => window.print()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: window.location.href, title: `${resumeData?.personal_info?.full_name}'s Resume` })
    } else {
      handleCopyLink()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
            <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
          </div>
          <p className="text-sm text-slate-500">Loading resume...</p>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Resume Not Found</h2>
          <p className="text-slate-500 mb-8 max-w-xs">This resume may be private or doesn't exist.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg shadow-indigo-200 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Homepage
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/30 to-slate-100">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm no-print">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">ResumPro.ai</span>
          </a>

          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-700 hidden sm:block">
              {resumeData?.personal_info?.full_name}'s Resume
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-xl text-xs font-medium text-teal-700 hover:bg-teal-100 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-200"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8 px-4"
      >
        <div id="resume-preview" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
        </div>

        {/* Footer CTA */}
        <div className="mt-6 text-center no-print">
          <p className="text-sm text-slate-500 mb-3">Create your own professional resume with AI</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-200 text-sm font-semibold"
          >
            <FileText className="w-4 h-4" /> Build Yours Free — ResumPro.ai
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default Preview