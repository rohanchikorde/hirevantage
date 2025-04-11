
import React from 'react';
import { Github, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-github-darker border-b border-github-medium">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-github-blue" />
          <span className="text-xl font-bold">CodeVault</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-github-medium transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
