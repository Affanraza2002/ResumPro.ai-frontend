import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CallToAction = () => {
  return (
    <div id='cta' className='border-y border-dashed border-slate-200/80 w-full max-w-5xl mx-auto px-6 sm:px-16 py-12 scroll-mt-20'>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-6 md:px-12 border-x border-dashed border-slate-200/80 py-16 w-full bg-gradient-to-r from-emerald-50/20 via-white to-emerald-50/20 rounded-3xl"
      >
        <div className="space-y-2">
          <p className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Build a Professional Resume Today
          </p>
          <p className="text-sm text-slate-500 max-w-md">
            Unlock recruiter-grade formats that help you stand out and get interviewed.
          </p>
        </div>
        
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/app" 
          className="inline-flex items-center gap-2 rounded-full py-3.5 px-8 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 transition-all text-white font-bold text-sm shadow-md"
        >
          <span>Get Started Free</span>
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  )
}

export default CallToAction