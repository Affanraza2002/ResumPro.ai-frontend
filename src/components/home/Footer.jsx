import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ExternalLink, Heart } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
        { icon: Mail, href: "mailto:support@resumpro.ai", label: "Email" }
    ]

    return (
        <footer className="relative bg-gradient-to-b from-slate-50 to-emerald-50/20 border-t border-slate-200/80 overflow-hidden no-print">
            {/* Decorative background blur */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-200/60">

                    {/* Branding */}
                    <div className="space-y-3 text-center md:text-left">
                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            href="/"
                            className="flex items-center justify-center md:justify-start gap-2.5 group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md shadow-emerald-100/50 group-hover:scale-105 transition-transform border border-emerald-100 p-1.5">
                                <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-bold text-xl gradient-text">ResumPro.ai</span>
                        </motion.a>
                        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                            Create, edit, and download recruiter-approved professional resumes with our state-of-the-art AI builder.
                        </p>
                    </div>

                    {/* Contact & Socials */}
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Connect with Developer</p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={social.label}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={social.label}
                                        className="w-8.5 h-8.5 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 shadow-sm transition-all"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </div>

                </div>

                {/* Footer bottom */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <p>© {currentYear} ResumPro.ai. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Designed and built with</span>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                        <span>by</span>
                        <a
                            href="https://prebuiltui.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-slate-600 hover:text-emerald-600 underline underline-offset-2 flex items-center gap-0.5"
                        >
                            Affanraza <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer