"use client"

import { useEffect, useState } from "react";

const Footer = () => {
    const [isClient, setIsClient] = useState(false);
        
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }


    return (
      <div className="w-full max-w-6xl px-4">
        <footer className="text-white text-center">
          <p>
            Made with 💖 by <strong>Tanish Aggarwal</strong>
          </p>
          <div className="flex justify-center mt-4 space-x-5 text-sm md:text-md">
            <a
              href="https://github.com/Tanish0023"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tanish023aggarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a
              href="https://x.com/Tanish23Agg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/tanish023aggarwal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              🌐 Portfolio
            </a>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Footer;
  