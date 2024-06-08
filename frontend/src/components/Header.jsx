import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  return (
    <nav className="bg-indigo-800 border-gray-200 top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/">
            <img
              src="https://www.svgrepo.com/show/226698/crm-crm.svg"
              className="h-14 w-14"
              alt="Logo"
            />
          </Link>
          <Link to="/">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">
              <span className="text-5xl">Xe</span>.crm
            </span>
          </Link>
        </div>
        
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/login">
              <button
                type="button"
                className="bg-orange-500 py-2 px-4 text-sm rounded-lg hover:bg-orange-600 shadow-2xl text-white hover:scale-95 font-semibold"
              >
                Sign in With Google
              </button>
            </Link>
          </div>
       
      </div>
    </nav>
  );
}

export default Header;
