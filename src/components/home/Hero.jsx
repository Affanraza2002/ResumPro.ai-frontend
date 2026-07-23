import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, CheckCircle } from 'lucide-react';

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[600px] bg-gradient-to-br from-emerald-100/30 to-teal-50/20 rounded-full blur-[120px] opacity-70" />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm"
      >
        <a href="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="ResumPro.ai" className="h-10 w-auto group-hover:scale-105 transition-transform" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
          <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#testimonals" className="hover:text-emerald-600 transition-colors">Testimonials</a>
          <a href="#cta" className="hover:text-emerald-600 transition-colors">Contact</a>
        </div>

        <div className="flex gap-3">
          {!user ? (
            <>
              <Link to="/app?state=login" className="hidden md:inline-flex px-5 py-2 border border-slate-200 rounded-full text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all font-medium">
                Login
              </Link>
              <Link to="/app?state=register" className="hidden md:inline-flex px-5 py-2 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 rounded-full text-white transition-all font-medium">
                Get Started
              </Link>
            </>
          ) : (
            <Link to="/app" className="hidden md:inline-flex px-6 py-2 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 rounded-full text-white transition-all font-medium">
              Dashboard
            </Link>
          )}

          <button onClick={() => setMenuOpen(true)} className="md:hidden p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} >
        <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
          ✕
        </button>
        <a href="#" onClick={() => setMenuOpen(false)} className="text-white hover:text-emerald-400 font-medium">Home</a>
        <a href="#features" onClick={() => setMenuOpen(false)} className="text-white hover:text-emerald-400 font-medium">Features</a>
        <a href="#testimonals" onClick={() => setMenuOpen(false)} className="text-white hover:text-emerald-400 font-medium">Testimonials</a>
        <a href="#cta" onClick={() => setMenuOpen(false)} className="text-white hover:text-emerald-400 font-medium">Contact</a>
        <Link to="/app" onClick={() => setMenuOpen(false)} className="px-8 py-3 bg-emerald-500 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/20">
          Get Started
        </Link>
      </div>

      {/* Main Hero Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center flex flex-col items-center"
      >
        {/* Avatars + Users Count badge */}
        <motion.div 
          variants={itemVariants} 
          className="flex items-center gap-3.5 px-4 py-2 bg-white/80 border border-emerald-100 rounded-full shadow-sm shadow-emerald-50/50"
        >
          <div className="flex -space-x-2">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" className="w-6.5 h-6.5 rounded-full object-cover border-2 border-white shadow-sm" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="User" className="w-6.5 h-6.5 rounded-full object-cover border-2 border-white shadow-sm" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="User" className="w-6.5 h-6.5 rounded-full object-cover border-2 border-white shadow-sm" />
          </div>
          <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
            Loved by 10,000+ applicants
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mt-6 leading-[1.15]"
        >
          Land your dream job with an <br />
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">AI-Powered Resume</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-500 max-w-xl mt-6 leading-relaxed"
        >
          Build recruiter-approved professional resumes in minutes. Powered by intelligent real-time ATS optimization feedback.
        </motion.p>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Link 
            to="/app" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full font-bold shadow-xl shadow-emerald-100 hover:shadow-emerald-200 transition-all group"
          >
            Create Free Resume
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-200 hover:bg-slate-50 rounded-full font-semibold text-slate-700 transition-all bg-white"
          >
            <Play className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
            Learn How It Works
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-6 flex-wrap mt-16 text-xs text-slate-400 font-semibold"
        >
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> ATS-Compliant Layouts</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Secure Encryption</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Live AI Insights</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
