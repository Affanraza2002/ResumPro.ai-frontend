import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ExternalLink, Heart, SendHorizonal, Loader2, CheckCircle2, User2, AtSign, MessageSquare, Briefcase } from 'lucide-react'
import axios from 'axios'

const SUBJECTS = [
    'Hiring Inquiry',
    'Freelance Project',
    'Collaboration',
    'Feedback on ResumPro.ai',
    'Other',
]

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('')

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Mail, href: 'mailto:razaffan08@gmail.com', label: 'Email' },
    ]

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (status === 'error') setStatus('idle')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
        setStatus('loading')
        try {
            const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'
            await axios.post(`${base}/contact/send`, form)
            setStatus('success')
            setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' })
        } catch (err) {
            setErrorMsg(err?.response?.data?.message || 'Something went wrong. Please try again.')
            setStatus('error')
        }
    }

    return (
        <footer className="relative bg-gradient-to-b from-slate-50 to-emerald-50/20 border-t border-slate-200/80 overflow-hidden no-print">
            {/* Decorative blobs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl" />
                <div className="absolute top-16 left-10 w-64 h-64 bg-teal-50/20 rounded-full blur-2xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-12 border-b border-slate-200/60">

                    {/* LEFT — Branding + Socials */}
                    <div className="space-y-6">
                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            href="/"
                            className="flex items-center gap-2.5 group w-fit"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md shadow-emerald-100/50 group-hover:scale-105 transition-transform border border-emerald-100 p-1.5">
                                <img src="/favicon.ico" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-bold text-xl gradient-text">ResumPro.ai</span>
                        </motion.a>

                        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                            Create, edit, and download recruiter-approved professional resumes with our state-of-the-art AI builder.
                        </p>

                        {/* "Hire Me" callout */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <Briefcase className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm font-bold text-emerald-800">Available for Hire</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                I'm a full-stack developer passionate about building AI-powered web applications. Open to full-time roles, freelance projects, and collaborations.
                            </p>
                        </motion.div>

                        {/* Social links */}
                        <div>
                            <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">Connect</p>
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
                                            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-300 shadow-sm transition-all"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
                    >
                        <div className="mb-5">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <SendHorizonal className="w-4 h-4 text-emerald-500" /> Send a Message
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Interested in hiring or collaborating? Drop me a note.</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center justify-center py-10 gap-4 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-base">Message Sent!</p>
                                        <p className="text-sm text-slate-500 mt-1">Thanks for reaching out. I'll get back to you soon.</p>
                                    </div>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="px-4 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
                                    >
                                        Send another
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-3.5"
                                >
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="relative">
                                            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                required
                                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all placeholder-slate-300"
                                            />
                                        </div>
                                        <div className="relative">
                                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="Your email"
                                                required
                                                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all placeholder-slate-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <select
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all text-slate-700 bg-white"
                                    >
                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>

                                    {/* Message */}
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3.5 w-3.5 h-3.5 text-slate-300" />
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about the opportunity or project..."
                                            required
                                            rows={4}
                                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all placeholder-slate-300 resize-none"
                                        />
                                    </div>

                                    {/* Error */}
                                    {status === 'error' && (
                                        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
                                    )}

                                    {/* Submit */}
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading'
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                                            : <><SendHorizonal className="w-4 h-4" /> Send Message</>
                                        }
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>

                {/* Bottom bar */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <p>© {currentYear} ResumPro.ai. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Built with</span>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                        <span>by</span>
                        <a
                            href="https://github.com"
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