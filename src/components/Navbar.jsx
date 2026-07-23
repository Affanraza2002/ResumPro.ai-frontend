import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, ChevronDown, FileText, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 glass shadow-sm border-b border-emerald-100/60 no-print"
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md shadow-emerald-100 group-hover:scale-105 transition-transform border border-emerald-100 p-1.5">
            <img src="/favicon.ico" alt="ResumPro.ai Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-xl gradient-text hidden sm:block">ResumPro.ai</span>
        </Link>

        {/* Center nav */}
        <Link to="/app" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        {/* User menu / Auth buttons */}
        <div className="relative">
          {user ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setMenuOpen(o => !o)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50/50 hover:border-emerald-300 transition-all duration-200 shadow-sm"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {initials}
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-24 truncate">
                {user?.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
            </motion.button>
          ) : (
            <div className="flex gap-2">
              <Link to="/app?state=login" className="px-4 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Login
              </Link>
              <Link to="/app?state=register" className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all">
                Get Started
              </Link>
            </div>
          )}

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-800 truncate mt-0.5">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/app"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={logoutUser}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar