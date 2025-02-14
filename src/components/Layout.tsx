import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, ClipboardList, UserPlus, User, LogOut, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import logo from "/irishdotalogo.png";
import imprintlogo from "/imprint.png";
import { DiscordIcon } from "./DiscordIcon";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-gradient-to-r from-[#169B62] via-[#169B62] to-[#169B62] dark:from-[#0A2F51] dark:via-[#0A3851] dark:to-[#0A4151] text-white py-6 transition-colors relative">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-all">
                <img src={logo} alt="Irish Dota League Logo" className="h-16 w-16 rounded-full object-cover" />
                <h1 className="text-base md:text-3xl font-bold tracking-tight">Irish Dota League</h1>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 ml-8">
                <Link
                  to="/rosters"
                  className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
                >
                  <ClipboardList size={20} />
                  <span>Team Rosters</span>
                </Link>

                {isAuthenticated && (
                  <>
                    <Link
                      to="/my-team"
                      className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
                    >
                      <User size={20} />
                      <span>My Team</span>
                    </Link>

                    <Link
                      to="/lft"
                      className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
                    >
                      <Users size={20} />
                      <span>Looking for Team</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden md:flex">
                <ThemeToggle />
              </span>

              <a
                href="https://discord.gg/fErrveaumv"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden relative md:flex items-center justify-center w-12 h-12 bg-[#5865F2] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#5865F2]/30 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-[#169B62]"
                title="Join our Discord"
              >
                <DiscordIcon />
              </a>

              <Link
                to="/imprint"
                className="hidden relative md:flex items-center justify-center w-12 h-12 bg-[#1d1d1b] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#47ffd0]/30 focus:outline-none focus:ring-2 focus:ring-[#47ffd0] focus:ring-offset-2 focus:ring-offset-[#1d1d1b]"
              >
                <div className="relative w-8 h-8">
                  <img src={imprintlogo} alt="Imprint Logo" className="w-full h-full object-contain" />
                </div>
              </Link>

              {isAuthenticated ? (
                <div className="hidden lg:flex items-center space-x-4">
                  <button
                    disabled
                    className="flex items-center space-x-2 bg-yellow-400 text-gray-600 cursor-not-allowed px-4 py-2 rounded-full font-semibold transition-all duration-300 opacity-75"
                    title="Team Registration is currently closed"
                  >
                    <Users size={20} />
                    <span>Team Registration</span>
                  </button>

                  <Link
                    to="/join"
                    className="flex items-center space-x-2 bg-yellow-400 text-gray-800 hover:bg-yellow-300 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-yellow-400/30 dark:hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#169B62] focus:ring-yellow-400"
                  >
                    <UserPlus size={20} />
                    <span>Join Team</span>
                  </Link>

                  <button
                    onClick={() => logout()}
                    className="flex items-center space-x-2 bg-red-500 text-white hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-red-500/30 dark:hover:shadow-red-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#169B62] focus:ring-red-500"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => login()}
                  className="text-xs md:text-base flex items-center space-x-2 bg-yellow-400 text-gray-800 hover:bg-yellow-300 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-yellow-400/30 dark:hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#169B62] focus:ring-yellow-400"
                >
                  Login
                </button>
              )}

              {/* Mobile menu button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4 p-2 rounded-lg hover:bg-white/10 lg:hidden">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/rosters"
                  className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ClipboardList size={20} />
                  <span>Team Rosters</span>
                </Link>

                {isAuthenticated && (
                  <>
                    <Link
                      to="/my-team"
                      className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} />
                      <span>My Team</span>
                    </Link>

                    <Link
                      to="/lft"
                      className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users size={20} />
                      <span>Looking for Team</span>
                    </Link>

                    <button
                      disabled
                      className="flex items-center space-x-2 opacity-50 cursor-not-allowed px-4 py-2 rounded-lg transition-colors w-full text-left"
                      title="Team Registration is currently closed"
                    >
                      <Users size={20} />
                      <span>Team Registration</span>
                    </button>

                    <Link
                      to="/join"
                      className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus size={20} />
                      <span>Join Team</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors w-full text-left"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
                <div className="flex items-center space-x-4 ml-4">
                  <a
                    href="https://discord.gg/fErrveaumv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-8 h-8 bg-[#5865F2] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#5865F2]/30 focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-[#169B62]"
                    title="Join our Discord"
                  >
                    <DiscordIcon />
                  </a>

                  <Link
                    to="/imprint"
                    className="relative flex items-center justify-center w-8 h-8 bg-[#1d1d1b] rounded-full transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-[#47ffd0]/30 focus:outline-none focus:ring-2 focus:ring-[#47ffd0] focus:ring-offset-2 focus:ring-offset-[#1d1d1b]"
                  >
                    <div className="flex justify-center align-middle mt-4 relative w-8 h-8">
                      <img src={imprintlogo} alt="Imprint Logo" className="w-4 h-4 md:w-full md:h-full object-contain" />
                    </div>
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
