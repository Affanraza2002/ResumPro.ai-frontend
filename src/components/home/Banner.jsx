import React from 'react'

const Banner = () => {
  return (
    <div className='w-full py-2.5 font-semibold text-xs text-emerald-800 text-center bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-50/20 border-b border-emerald-100/40'>
      <p>
        <span className='px-2.5 py-0.5 rounded-full text-white bg-emerald-600 mr-2 uppercase tracking-wider text-[10px]'>New</span> 
        AI-Powered Resume Optimization Feedback is now live!
      </p>
    </div>
  )
}

export default Banner