import React from 'react'

const Features = () => {

     const [isHover, setIsHover] = React.useState(false);

  return (
     <div id="features">
        <div className="text-center mt-2">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-800">
                Features
            </h2>
            <p className="text-slate-600 mt-3 max-w-md mx-auto text-sm md:text-base">
                Everything you need to build, improve and download job-ready resumes.
            </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-40 mt-16">
            <img className="max-w-lg w-full xl:-ml-32 rounded-2xl" src="typing-pic.jpg" alt="" />
            
            <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                
                <div className="flex items-center justify-center gap-6 max-w-md group">
                    <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 stroke-violet-600" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 21l-4.35-4.35" />
                            <circle cx="10" cy="10" r="6" />
                        </svg>

                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-700">ATS Resume Scanning</h3>
                            <p className="text-sm text-slate-600 max-w-xs">
                                Scan your resume against ATS systems and uncover hidden rejection risks instantly.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 max-w-md group ">
                    <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">

                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 stroke-green-600" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>

                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-700">AI Resume Enhancement</h3>
                            <p className="text-sm text-slate-600 max-w-xs">
                                Improve wording, clarity, impact and keyword strength using intelligent AI rewriting.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-6 max-w-md group">
                    <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">

                        <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3v12" />
                            <path d="m7 10 5 5 5-5" />
                            <path d="M5 21h14" />
                        </svg>

                        <div className="space-y-2">
                            <h3 className="text-base font-semibold text-slate-700">Instant Download</h3>
                            <p className="text-sm text-slate-600 max-w-xs">
                                Download your resume instantly in clean, professional and ATS-ready formats.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * {
                font-family: 'Poppins', sans-serif;
            }
        `}</style>
     </div>
  )
}

export default Features
