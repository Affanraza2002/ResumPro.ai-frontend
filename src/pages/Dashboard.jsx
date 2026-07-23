import {
  FilePenLine,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  SearchIcon,
  CopyIcon,
  FileTextIcon,
  TrendingUpIcon,
  ClockIcon,
  SparklesIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { bg: "from-emerald-500 to-teal-500", light: "from-emerald-50 to-teal-50", border: "border-emerald-200", text: "text-emerald-600" },
  { bg: "from-teal-500 to-cyan-500", light: "from-teal-50 to-cyan-50", border: "border-teal-200", text: "text-teal-600" },
  { bg: "from-amber-500 to-orange-500", light: "from-amber-50 to-orange-50", border: "border-amber-200", text: "text-amber-600" },
  { bg: "from-sky-500 to-blue-500", light: "from-sky-50 to-blue-50", border: "border-sky-200", text: "text-sky-600" },
  { bg: "from-purple-500 to-indigo-500", light: "from-purple-50 to-indigo-50", border: "border-purple-200", text: "text-purple-600" },
];

const Modal = ({ onClose, children }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth);
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setIsFetching(true);
    try {
      const { data } = await api.get('/users/resumes', { headers: { Authorization: token } });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/resumes/create', { title }, { headers: { Authorization: token } });
      setAllResumes(prev => [...prev, data.resume]);
      setTitle('');
      setShowCreateResume(false);
      toast.success('Resume created!');
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const duplicateResume = async (resumeId) => {
    try {
      const found = allResumes.find(r => r._id === resumeId);
      if (!found) return;
      const { data } = await api.post('/resumes/create', { title: `${found.title} (Copy)` }, { headers: { Authorization: token } });
      const formData = new FormData();
      formData.append("resumeId", data.resume._id);
      const resumeCopy = { ...found };
      delete resumeCopy._id;
      delete resumeCopy.userId;
      delete resumeCopy.createdAt;
      delete resumeCopy.updatedAt;
      formData.append("resumeData", JSON.stringify(resumeCopy));
      await api.put('/resumes/update', formData, { headers: { Authorization: token } });
      setAllResumes(prev => [...prev, { ...data.resume, title: `${found.title} (Copy)` }]);
      toast.success('Resume duplicated!');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post('/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } });
      setTitle('');
      setResume(null);
      setShowUploadResume(false);
      toast.success('Resume uploaded & extracted!');
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(`/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } });
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume));
      setTitle('');
      setEditResumeId('');
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this resume?");
      if (confirm) {
        await api.delete(`/resumes/delete/${resumeId}`, { headers: { Authorization: token } });
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId));
        toast.success("Resume deleted");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => { loadAllResumes(); }, []);

  const filteredResumes = allResumes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Resumes", value: allResumes.length, icon: FileTextIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Last Updated", value: allResumes[0] ? new Date(allResumes[0].updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "—", icon: ClockIcon, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Public Resumes", value: allResumes.filter(r => r.public).length, icon: TrendingUpIcon, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
              </h1>
              <p className="text-slate-500 mt-1">Manage and create your professional resumes</p>
            </div>
            {/* Search bar */}
            {allResumes.length > 0 && (
              <div className="relative max-w-xs w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resumes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm w-full border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-300"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex gap-4 mb-8 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateResume(true)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-shadow text-sm font-semibold"
          >
            <PlusIcon className="w-4 h-4" />
            Create Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowUploadResume(true)}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-sm font-semibold"
          >
            <UploadCloudIcon className="w-4 h-4 text-emerald-500" />
            <span>Upload & Extract <span className="text-emerald-500 text-xs font-semibold ml-1">AI</span></span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        {allResumes.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs text-slate-400 font-medium">YOUR RESUMES</span>
            <hr className="flex-1 border-slate-200" />
          </div>
        )}

        {/* Resume Grid */}
        {isFetching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredResumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FileTextIcon className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              {searchQuery ? "No resumes found" : "No resumes yet"}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {searchQuery ? "Try a different search term" : "Create your first professional resume to get started"}
            </p>
            {!searchQuery && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateResume(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg shadow-emerald-200 text-sm font-semibold"
              >
                <PlusIcon className="w-4 h-4" />
                Create Your First Resume
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <AnimatePresence>
              {filteredResumes.map((resume, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                  <motion.div
                    key={resume._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative"
                  >
                    <button
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className={`w-full h-48 flex flex-col items-center justify-center rounded-2xl gap-2 bg-gradient-to-br ${color.light} border ${color.border} transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-emerald-100 relative overflow-hidden`}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color.bg} flex items-center justify-center shadow-md`}>
                        <FilePenLine className="w-6 h-6 text-white" />
                      </div>
                      <p className={`text-sm font-semibold ${color.text} px-3 text-center leading-tight`}>
                        {resume.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      {resume.public && (
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[9px] font-bold">PUBLIC</span>
                      )}
                    </button>

                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); duplicateResume(resume._id); }}
                        title="Duplicate"
                        className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        <CopyIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditResumeId(resume._id); setTitle(resume.title); }}
                        title="Rename"
                        className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        <PencilIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteResume(resume._id); }}
                        title="Delete"
                        className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Create Resume Modal */}
      {showCreateResume && (
        <Modal onClose={() => { setShowCreateResume(false); setTitle(''); }}>
          <form onSubmit={createResume}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200">
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create New Resume</h2>
                  <p className="text-sm text-slate-500">Give your resume a descriptive title</p>
                </div>
              </div>
              <input
                autoFocus
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="e.g., Software Engineer Resume 2025"
                className="w-full px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                type="button"
                onClick={() => { setShowCreateResume(false); setTitle(''); }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-shadow"
              >
                Create Resume
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Upload Resume Modal */}
      {showUploadResume && (
        <Modal onClose={() => { setShowUploadResume(false); setTitle(''); setResume(null); }}>
          <form onSubmit={uploadResume}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-md shadow-teal-200">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Upload & Extract</h2>
                  <p className="text-sm text-slate-500">AI will parse your existing resume</p>
                </div>
              </div>
              <div className="space-y-4">
                <input
                  autoFocus
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Resume title"
                  className="w-full px-4 py-3 text-sm"
                  required
                />
                <label htmlFor="resume-input" className="block cursor-pointer">
                  <div className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 transition-colors ${resume ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                    {resume ? (
                      <>
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <FileTextIcon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-sm font-medium text-emerald-700">{resume.name}</p>
                        <p className="text-xs text-emerald-400">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-10 h-10 text-slate-300" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-slate-600">Drop your PDF here</p>
                          <p className="text-xs text-slate-400 mt-1">or click to browse</p>
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="resume-input"
                    accept=".pdf"
                    hidden
                    onChange={e => setResume(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                type="button"
                onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null); }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !resume}
                className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && <LoaderCircleIcon className="w-4 h-4 animate-spin" />}
                {isLoading ? 'Extracting...' : 'Extract with AI'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Title Modal */}
      {editResumeId && (
        <Modal onClose={() => { setEditResumeId(''); setTitle(''); }}>
          <form onSubmit={editTitle}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <PencilIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Rename Resume</h2>
                  <p className="text-sm text-slate-500">Update the title of your resume</p>
                </div>
              </div>
              <input
                autoFocus
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Resume title"
                className="w-full px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                type="button"
                onClick={() => { setEditResumeId(''); setTitle(''); }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-amber-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
