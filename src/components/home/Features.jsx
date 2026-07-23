import { Zap, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import React from 'react'
import Title from './Title'
import { motion } from 'framer-motion'

const Features = () => {
  const featureList = [
    {
      title: "AI-Powered Enhancements",
      description: "Instantly polish your professional summary and experience descriptions using tailored industry terminology.",
      icon: BrainCircuit,
      color: "emerald",
      bgClass: "bg-emerald-50 border-emerald-200 text-emerald-600",
      hoverClass: "group-hover:bg-emerald-50/80 group-hover:border-emerald-300"
    },
    {
      title: "Recruiter-Grade Security",
      description: "Your professional data is safeguarded with robust encryption and standard compliance protocols.",
      icon: ShieldCheck,
      color: "teal",
      bgClass: "bg-teal-50 border-teal-200 text-teal-600",
      hoverClass: "group-hover:bg-teal-50/80 group-hover:border-teal-300"
    },
    {
      title: "Interactive Live Previews",
      description: "Watch your resume layout adjust dynamically in real-time as you enter your details.",
      icon: Sparkles,
      color: "cyan",
      bgClass: "bg-cyan-50 border-cyan-200 text-cyan-600",
      hoverClass: "group-hover:bg-cyan-50/80 group-hover:border-cyan-300"
    }
  ]

  return (
    <div id='features' className='flex flex-col items-center my-20 px-4 scroll-mt-16 max-w-7xl mx-auto'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200/60 rounded-full px-4 py-1.5 font-medium shadow-sm shadow-emerald-50"
      >
        <Zap className="w-3.5 h-3.5" />
        <span>Simple And Effective Process</span>
      </motion.div>
      
      <Title 
        title='Build a Winning Resume' 
        description='Our streamlined builder helps you create an outstanding professional resume in minutes with intelligent AI-powered coaching.'
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-12 w-full">
        {/* Left Image Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: -30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <img 
            className="max-w-md w-full rounded-2xl shadow-2xl border border-slate-200/60" 
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" 
            alt="Resume builder workspace" 
          />
        </motion.div>

        {/* Right Feature List */}
        <div className="w-full lg:w-1/2 space-y-5">
          {featureList.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 15, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group cursor-pointer p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 items-start"
              >
                <div className={`p-3 rounded-xl border ${item.bgClass} shrink-0 transition-colors duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Features