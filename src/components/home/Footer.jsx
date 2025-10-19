import React from 'react'

const Footer = () => {
  return (
     <>
     <footer className="flex mt-40 flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/60 to-white">
                <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[100px]">
                    <a href="#">
                       <img src="logo.svg" alt="logo" className='h-11 w-auto' />
                    </a>
                    <div>
                        <p className="text-slate-800 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Affiliate</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-600 transition">Company</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Blogs</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Community</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Careers<span className="text-xs text-white bg-green-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a></li>
                            <li><a href="/" className="hover:text-green-600 transition">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-600 transition">Privacy</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
                    <p className="max-w-60">Contact the Developer </p>
                    <div className="flex items-center gap-4 mt-3">
                        <a href="https://dribbble.com/prebuiltui" target="_blank" rel="noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="lucide lucide-linkedin size-5 hover:text-green-500">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="currentColor" stroke-width="2"  stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                   <rect width="4" height="12" x="2" y="9"></rect>
                   <circle cx="4" cy="4" r="2"></circle>
            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/prebuiltui" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin size-5 hover:text-green-500" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect width="4" height="12" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="https://x.com/prebuiltui" target="_blank" rel="noreferrer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="lucide lucide-linkedin size-5 hover:text-green-500">
                            <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  strokeLinejoin="round" />
                            <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </a>
                        <a href="https://" target="_blank" rel="noreferrer">
                            <svg  width="24"
                height="24" viewBox="0 0 24 24"  className="lucide lucide-linkedin size-5 hover:text-green-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21 4.125H3A1.125 1.125 0 0 0 1.875 5.25V18a1.875 1.875 0 0 0 1.875 1.875h16.5A1.875 1.875 0 0 0 22.125 18V5.25A1.125 1.125 0 0 0 21 4.125m-2.892 2.25L12 11.974 5.892 6.375zM4.125 17.625V7.808l7.115 6.522a1.125 1.125 0 0 0 1.52 0l7.115-6.522v9.817z"
                    fill="currentColor" />
            </svg>
                        </a>
                    </div>
                    <p className="mt-3 text-center">Copyright © 2025 <a href="https://prebuiltui.com">Affanraza.</a></p>
                </div>
            </footer>
         <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

             
     </>
  )
}

export default Footer