import { Link } from "react-router-dom";

import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";



const NavBar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const { authUser, logout } = useAuthStore();


  return (
    <div>
      <nav className="p-2 m-2 rounded-sm flex justify-center font-lato pt-4 bg-slate-200">
        <div className="w-full max-w-5xl flex justify-between items-center px-8 py-2">
          <Link to="/">
            <div className="font-fair text-3xl md:text-2xl flex flex-col items-center">
              Home
              
            </div>
          </Link>

          <div className="px-4">
            <Link to="/settings">
              <div className="font-fair text-3xl md:text-2xl flex flex-col items-center">
                Settings
              </div>
            </Link>
          </div>
          <div className="px-4">
            <Link to="/userlist">
              <div className="font-fair text-3xl md:text-2xl flex flex-col items-center">
                Regular
              </div>
            </Link>
          </div>

          <div className="px-4">
            <Link to="/randomusertable">
              <div className="font-fair text-3xl md:text-2xl flex flex-col items-center">
                Table
              </div>
            </Link>
          </div>

          <div className="flex-1 items-center justify-end hidden md:flex">
            <div className="relative min-w-32">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-sm md:text-xl ml-1"
              >
                <i className="fa-solid fa-user text-sm md:text-xl mr-2"></i>
                {authUser?.username}
              </button>
              {!authUser && (
                <div className="px-4">
                  <Link to="/api/login">
                  <div className="font-fair text-3xl md:text-2xl flex flex-col items-center">
                Login
              </div>
            </Link>
                </div>
              )}
              {userMenuOpen && (
                <div className="absolute bottom-[-33px] rounded-md shadow-md left-0 mt-20">
                  <button onClick={()=>{
                    logout();
                    setUserMenuOpen(false);
                  }} className="p-1">
                    <i className="mr-2 fa-solid fa-arrow-right-from-bracket"></i>
                    sign out
                  </button>
                </div>
              )}
            </div>
           
          </div>

          <button className="flex md:hidden">
            <i className="fa-solid text-4xl fa-bars"></i>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
