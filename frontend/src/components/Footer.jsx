import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="absolute bottom-0 pb-4 w-[90%] flex">
      <ul className="flex items-center justify-center w-full gap-10 ">
        <li>
          <a
            href="https://github.com/yourgithubusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              size={32}
              className="cursor-pointer hover:-translate-y-2 transition-transform"
            />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/harsh_sing72983"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              size={32}
              className="cursor-pointer hover:-translate-y-2 transition-transform"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/harshdev-7275?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              size={32}
              className="cursor-pointer hover:-translate-y-2 transition-transform"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
