import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOff, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User, SaveIcon, ZapIcon, XIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, LayoutListIcon, BriefcaseIcon } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillForm from '../components/SkillForm'
import CustomSectionForm from '../components/CustomSectionForm'
import JDMatcherPanel from '../components/JDMatcherPanel'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: "personal", name: "Personal", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "project", name: "Projects", icon: FolderIcon },
  { id: "skills", name: "Skills", icon: Sparkles },
  { id: "custom", name: "Custom", icon: LayoutListIcon },
]

const ATSPanel = ({ resumeData, token, onClose }) => {
  const [atsResult, setAtsResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeATS = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/ai/analyze-ats', { resumeData }, { headers: { Authorization: token } })
      setAtsResult(data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { analyzeATS() }, [])

  const scoreColor = !atsResult ? 'text-slate-400' : atsResult.score >= 75 ? 'text-emerald-500' : atsResult.score >= 50 ? 'text-amber-500' : 'text-red-500'
  const scoreRingColor = !atsResult ? '#94a3b8' : atsResult.score >= 75 ? '#22c55e' : atsResult.score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl border-l border-slate-200 z-[60] overflow-y-auto"
    >
      <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ZapIcon className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900">ATS Score Analyzer</h3>
        </div>
        <button
          onClick={onClose}
          title="Close ATS Panel"
          className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 animate-spin" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="50 200" strokeLinecap="round" />
              </svg>
              <ZapIcon className="absolute inset-0 m-auto w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-sm text-slate-500 text-center">Analyzing your resume with AI...</p>
          </div>
        ) : atsResult ? (
          <>
            {/* Score Ring */}
            <div className="flex flex-col items-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                  <circle
                    cx="64" cy="64" r="54" fill="none"
                    stroke={scoreRingColor}
                    strokeWidth="12"
                    strokeDasharray={`${(atsResult.score / 100) * 339.3} 339.3`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 1s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-black ${scoreColor}`}>{atsResult.score}</span>
                  <span className="text-xs text-slate-400 font-medium">/ 100</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center mt-3 font-medium">{atsResult.summary}</p>
            </div>

            {/* Strengths */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" /> Strengths
              </h4>
              <div className="space-y-2">
                {atsResult.strengths?.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 bg-emerald-50 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <p className="text-xs text-emerald-700">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <AlertCircleIcon className="w-4 h-4 text-amber-500" /> Improvements
              </h4>
              <div className="space-y-2">
                {atsResult.improvements?.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <p className="text-xs text-amber-700">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {atsResult.keywords_missing?.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={analyzeATS}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-shadow"
            >
              <ZapIcon className="w-4 h-4" /> Re-analyze Resume
            </button>
          </>
        ) : null}
      </div>
    </motion.div>
  )
}

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [showATSPanel, setShowATSPanel] = useState(false)
  const [showJDMatcher, setShowJDMatcher] = useState(false)
  const [saveStatus, setSaveStatus] = useState('saved') // 'saved' | 'unsaved' | 'saving'
  const autoSaveTimerRef = useRef(null)
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    custom_sections: [],
    template: "classic",
    accent_color: '#3B82F6',
    public: false,
  })

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/resumes/get/` + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = `${data.resume.title} — ResumPro.ai`
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => { loadExistingResume() }, [])

  // Track unsaved changes
  const handleResumeDataChange = useCallback((updater) => {
    setResumeData(updater)
    setSaveStatus('unsaved')
  }, [])

  // Auto-save debounce (3 seconds after last change)
  useEffect(() => {
    if (saveStatus !== 'unsaved') return
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current)
    autoSaveTimerRef.current = setTimeout(() => {
      saveResume()
    }, 3000)
    return () => clearTimeout(autoSaveTimerRef.current)
  }, [resumeData, saveStatus]) // eslint-disable-line

  const activeSection = SECTIONS[activeSectionIndex]

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      await api.put(`/resumes/update`, formData, { headers: { Authorization: token } })
      setResumeData(prev => ({ ...prev, public: !prev.public }))
      toast.success(`Resume is now ${!resumeData.public ? 'public' : 'private'}`)
    } catch (error) {
      console.log("Error updating visibility", error)
    }
  }

  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`
    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "Check out my resume" })
    } else {
      navigator.clipboard.writeText(resumeUrl)
      toast.success('Link copied to clipboard!')
    }
  }

  const downloadResume = () => { window.print() }

  const saveResume = async () => {
    setSaveStatus('saving')
    try {
      let updateResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updateResumeData.personal_info.image
      }
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updateResumeData))
      removeBackground && formData.append("removeBackground", "yes")
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

      const { data } = await api.put(`/resumes/update`, formData, { headers: { Authorization: token } })
      setResumeData(data.resume)
      setSaveStatus('saved')
      toast.success(data.message)
    } catch (error) {
      setSaveStatus('unsaved')
      console.log("Error Saving Resume ", error)
      toast.error('Failed to save')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/app" className="inline-flex gap-2 items-center text-sm text-slate-500 hover:text-slate-800 transition-colors shrink-0">
            <ArrowLeftIcon className="w-4 h-4" /> Dashboard
          </Link>

          {/* Section nav pills */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
            {SECTIONS.map((section, i) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionIndex(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${activeSectionIndex === i ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {section.name}
                </button>
              )
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Save status */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs">
              {saveStatus === 'saving' && <><ClockIcon className="w-3.5 h-3.5 text-slate-400 animate-spin" /><span className="text-slate-400">Saving...</span></>}
              {saveStatus === 'saved' && <><CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-600">Saved</span></>}
              {saveStatus === 'unsaved' && <><AlertCircleIcon className="w-3.5 h-3.5 text-amber-500" /><span className="text-amber-600">Unsaved changes</span></>}
            </div>

            {/* ATS Score */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setShowATSPanel(o => !o); setShowJDMatcher(false) }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-medium hover:bg-amber-100 transition-colors"
            >
              <ZapIcon className="w-3.5 h-3.5" /> ATS Score
            </motion.button>

            {/* JD Matcher */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setShowJDMatcher(o => !o); setShowATSPanel(false) }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl text-xs font-medium hover:bg-teal-100 transition-colors"
            >
              <BriefcaseIcon className="w-3.5 h-3.5" /> JD Match
            </motion.button>

            {/* Visibility */}
            <button
              onClick={changeResumeVisibility}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${resumeData.public ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
            >
              {resumeData.public ? <EyeIcon className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {resumeData.public ? 'Public' : 'Private'}
            </button>

            {resumeData.public && (
              <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl text-xs font-medium hover:bg-teal-100 transition-colors">
                <Share2Icon className="w-3.5 h-3.5" /> Share
              </button>
            )}

            <button onClick={downloadResume} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-200 transition-colors">
              <DownloadIcon className="w-3.5 h-3.5" /> PDF
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={saveResume}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-shadow"
            >
              <SaveIcon className="w-3.5 h-3.5" /> Save
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left panel — Form */}
          <div className="lg:col-span-5 space-y-4">
            {/* Template & Color toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center gap-3 no-print">
              <TemplateSelector selectedTemplate={resumeData.template} onChange={template => handleResumeDataChange(prev => ({ ...prev, template }))} />
              <ColorPicker selectedColor={resumeData.accent_color} onChange={color => handleResumeDataChange(prev => ({ ...prev, accent_color: color }))} />
              <div className="h-5 w-px bg-slate-200" />
              <span className="text-xs text-slate-500 font-medium">{resumeData.title || 'Untitled Resume'}</span>
            </div>

            {/* Mobile section nav */}
            <div className="md:hidden bg-white rounded-2xl border border-slate-200 shadow-sm p-2 flex gap-1 overflow-x-auto no-print">
              {SECTIONS.map((section, i) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSectionIndex(i)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeSectionIndex === i ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500'}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {section.name}
                  </button>
                )
              })}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden no-print">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                initial={false}
                animate={{ width: `${(activeSectionIndex / (SECTIONS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>

            {/* Form card */}
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >
              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, personal_info: d }))}
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}
              {activeSection.id === "summary" && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, professional_summary: d }))}
                  setResumeData={handleResumeDataChange}
                />
              )}
              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, experience: d }))}
                />
              )}
              {activeSection.id === "education" && (
                <EducationForm
                  data={resumeData.education}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, education: d }))}
                />
              )}
              {activeSection.id === "project" && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, project: d }))}
                />
              )}
              {activeSection.id === "skills" && (
                <SkillForm
                  data={resumeData.skills}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, skills: d }))}
                />
              )}
              {activeSection.id === "custom" && (
                <CustomSectionForm
                  data={resumeData.custom_sections}
                  onChange={d => handleResumeDataChange(prev => ({ ...prev, custom_sections: d }))}
                />
              )}
            </motion.div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between no-print">
              <button
                onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                disabled={activeSectionIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span className="text-xs text-slate-400">{activeSectionIndex + 1} / {SECTIONS.length}</span>
              <button
                onClick={() => setActiveSectionIndex(i => Math.min(i + 1, SECTIONS.length - 1))}
                disabled={activeSectionIndex === SECTIONS.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel — Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div id="resume-preview" className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ATS Panel */}
      <AnimatePresence>
        {showATSPanel && (
          <ATSPanel
            resumeData={resumeData}
            token={token}
            onClose={() => setShowATSPanel(false)}
          />
        )}
      </AnimatePresence>

      {/* JD Matcher Panel */}
      <AnimatePresence>
        {showJDMatcher && (
          <JDMatcherPanel
            resumeData={resumeData}
            token={token}
            onClose={() => setShowJDMatcher(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResumeBuilder
