import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Users, ClipboardList, UserPlus, User, LogOut, Menu, X, ChevronDown, Archive } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logo from "/irishdotalogo.png";
import imprintlogo from "/imprint.png";
import { DiscordIcon } from "./DiscordIcon";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-idl-dark transition-colors">
      <header className="py-6 transition-colors relative">
        <div className="px-6">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center justify-center flex-1 space-x-8">
              <Link to="/" className="hover:opacity-90 transition-all">
                <img src={logo} alt="Irish Dota League Logo" className="h-16 w-16 rounded-full object-cover" />
              </Link>

              <Link
                to="/rosters"
                className="flex items-center space-x-2 text-idl-light hover:text-idl-accent transition-all duration-300 font-medium"
              >
                <ClipboardList size={20} />
                <span>Team Rosters</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <span className="text-idl-accent">|</span>

                  <Link
                    to="/lft"
                    className="flex items-center space-x-2 text-idl-light hover:text-idl-accent transition-all duration-300 font-medium"
                  >
                    <Users size={20} />
                    <span>Looking for Team</span>
                  </Link>

                  <span className="text-idl-accent">|</span>

                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 text-idl-light hover:text-idl-accent transition-all duration-300 font-medium"
                  >
                    <Users size={20} />
                    <span>Team Registration</span>
                  </Link>

                  <span className="text-idl-accent">|</span>

                  <Link
                    to="/join"
                    className="flex items-center space-x-2 text-idl-light hover:text-idl-accent transition-all duration-300 font-medium"
                  >
                    <UserPlus size={20} />
                    <span>Join Team</span>
                  </Link>

                  <span className="text-idl-accent">|</span>

                  <Link
                    to="/my-team"
                    className="flex items-center space-x-2 text-idl-light hover:text-idl-accent transition-all duration-300 font-medium"
                  >
                    <User size={20} />
                    <span>My Team</span>
                  </Link>

                  <span className="text-idl-accent">|</span>

                  {/* Past Seasons Dropdown */}
                  <div className="relative group" ref={dropdownRef}>
                    <button className="flex items-center space-x-2 text-idl-light hover:text-idl-accent transition-all duration-300 font-medium">
                      <Archive size={20} />
                      <span>Archive</span>
                      <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-idl-gray rounded-lg shadow-xl py-2 z-50 border border-idl-accent/20 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="px-3 py-2 border-b border-idl-accent/10">
                        <h3 className="text-sm font-medium text-idl-accent">Season 4</h3>
                      </div>
                      <Link
                        to="/season4"
                        className="block px-4 py-2.5 text-idl-light hover:bg-idl-dark hover:text-idl-accent transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Overview</span>
                        </div>
                      </Link>
                      <Link
                        to="/season4/rosters"
                        className="block px-4 py-2.5 text-idl-light hover:bg-idl-dark hover:text-idl-accent transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Team Rosters</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="invisible flex items-center space-x-8">
                    <span className="text-idl-accent">|</span>
                    <div className="flex items-center space-x-2">
                      <Users size={20} />
                      <span>Looking for Team</span>
                    </div>
                    <span className="text-idl-accent">|</span>
                    <div className="flex items-center space-x-2">
                      <Users size={20} />
                      <span>Team Registration</span>
                    </div>
                    <span className="text-idl-accent">|</span>
                    <div className="flex items-center space-x-2">
                      <UserPlus size={20} />
                      <span>Join Team</span>
                    </div>
                    <span className="text-idl-accent">|</span>
                    <div className="flex items-center space-x-2">
                      <User size={20} />
                      <span>My Team</span>
                    </div>
                    <span className="text-idl-accent">|</span>
                    <div className="flex items-center space-x-2">
                      <Archive size={20} />
                      <span>Archive</span>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="hidden xl:flex items-center space-x-4">
              <a
                href="https://discord.gg/fErrveaumv"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-12 h-12 text-white bg-[#5865F2] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#5865F2]/30 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-idl-dark"
                title="Join our Discord"
              >
                <DiscordIcon />
              </a>

              <Link
                to="/imprint"
                className="relative flex items-center justify-center w-12 h-12 bg-[#1d1d1b] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#47ffd0]/30 focus:outline-none focus:ring-2 focus:ring-[#47ffd0] focus:ring-offset-2 focus:ring-offset-idl-dark"
              >
                <div className="relative w-8 h-8">
                  <img src={imprintlogo} alt="Imprint Logo" className="w-full h-full object-contain" />
                </div>
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 bg-idl-accent text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-idl-accent/30 focus:outline-none focus:ring-2 focus:ring-idl-accent focus:ring-offset-2 focus:ring-offset-idl-dark"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => login()}
                  className="flex items-center space-x-2 bg-idl-accent text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-idl-accent/30 focus:outline-none focus:ring-2 focus:ring-idl-accent focus:ring-offset-2 focus:ring-offset-idl-dark"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex xl:hidden items-center justify-between w-full">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-idl-gray">
              {isMenuOpen ? <X size={24} className="text-idl-light" /> : <Menu size={24} className="text-idl-light" />}
            </button>

            <div className="flex items-center space-x-4">
              <a
                href="https://discord.gg/fErrveaumv"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-10 h-10 text-white bg-[#5865F2] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#5865F2]/30 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-idl-dark"
                title="Join our Discord"
              >
                <DiscordIcon />
              </a>

              <Link
                to="/imprint"
                className="relative flex items-center justify-center w-10 h-10 bg-[#1d1d1b] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#47ffd0]/30 focus:outline-none focus:ring-2 focus:ring-[#47ffd0] focus:ring-offset-2 focus:ring-offset-idl-dark"
              >
                <div className="relative w-6 h-6">
                  <img src={imprintlogo} alt="Imprint Logo" className="w-full h-full object-contain" />
                </div>
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={() => logout()}
                  className="flex items-center space-x-2 bg-idl-accent text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-idl-accent/30 focus:outline-none focus:ring-2 focus:ring-idl-accent focus:ring-offset-2 focus:ring-offset-idl-dark"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => login()}
                  className="flex items-center space-x-2 bg-idl-accent text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-idl-accent/30 focus:outline-none focus:ring-2 focus:ring-idl-accent focus:ring-offset-2 focus:ring-offset-idl-dark"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="xl:hidden mt-4 py-4 border-t border-idl-gray">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/rosters"
                  className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors text-idl-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ClipboardList size={20} />
                  <span>Team Rosters</span>
                </Link>

                {isAuthenticated && (
                  <>
                    <Link
                      to="/lft"
                      className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors text-idl-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users size={20} />
                      <span>Looking for Team</span>
                    </Link>

                    <Link
                      to="/signup"
                      className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors w-full text-left text-idl-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users size={20} />
                      <span>Team Registration</span>
                    </Link>

                    <Link
                      to="/join"
                      className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors text-idl-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus size={20} />
                      <span>Join Team</span>
                    </Link>

                    <Link
                      to="/my-team"
                      className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors text-idl-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} />
                      <span>My Team</span>
                    </Link>

                    {/* Past Seasons Mobile */}
                    <div className="px-4 py-2">
                      <div className="font-medium mb-2 text-idl-light">Archive</div>
                      <Link
                        to="/season4"
                        className="block pl-4 py-2 hover:bg-idl-gray rounded-lg transition-colors text-idl-light"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Season 4
                      </Link>
                      <Link
                        to="/season4/rosters"
                        className="block pl-4 py-2 hover:bg-idl-gray rounded-lg transition-colors text-idl-light"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Season 4 Teams
                      </Link>
                    </div>

                    <a
                      href="https://discord.gg/fErrveaumv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors text-idl-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <DiscordIcon />
                      <span>Join Discord</span>
                    </a>

                    <Link
                      to="/imprint"
                      className="flex items-center space-x-2 hover:bg-idl-gray px-4 py-2 rounded-lg transition-colors text-idl-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-5 h-5">
                        <img src={imprintlogo} alt="Imprint Logo" className="w-full h-full object-contain" />
                      </div>
                      <span>Imprint</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
