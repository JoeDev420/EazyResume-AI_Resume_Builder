import React from 'react'

const Footer = () => {  
  return (
    <footer className="mt-28 border-t border-slate-200 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-600">

        <p className="text-center md:text-left">    
          Built with ❤️ to help you land your dream job.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/JoeDev420/EazyResume-AI_Resume_Builder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            ⭐ Star on GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/anant-singh-b33a93373/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            LinkedIn
          </a>
        </div>

        <p className="text-center md:text-right">
          © {new Date().getFullYear()} EazyResume. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
