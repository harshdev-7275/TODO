import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex items-center justify-center gap-[40rem] ml-[10rem] text-center mr-[10rem]">
      <Link to="/">
        <h1 className="text-6xl font-medium">TODO</h1>
      </Link>
    </div>
  );
};

export default Header;
