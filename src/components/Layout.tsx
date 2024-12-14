import React from "react";
import { Link } from "react-router-dom";
import { Users, ClipboardList, UserPlus, User, TableProperties, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../hooks/useAuth";
import logo from "/irishdotalogo.png";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-gradient-to-r from-[#169B62] via-[#169B62] to-[#169B62] dark:from-[#0A2F51] dark:via-[#0E4D64] dark:to-[#137177] text-white py-6 transition-colors">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-all">
                <img src={logo} alt="Irish Dota League Logo" className="h-16 w-16 rounded-full object-cover" />
                <h1 className="text-3xl font-bold tracking-tight">Irish Dota League</h1>
              </Link>

              <Link
                to="/"
                className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
              >
                <TableProperties size={20} />
                <span>League Table</span>
              </Link>

              <Link
                to="/rosters"
                className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
              >
                <ClipboardList size={20} />
                <span>Team Rosters</span>
              </Link>

              {isAuthenticated && (
                <Link
                  to="/my-team"
                  className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
                >
                  <User size={20} />
                  <span>My Team</span>
                </Link>
              )}

              {isAuthenticated && (
                <Link
                  to="/lft"
                  className="flex items-center space-x-2 hover:text-white/90 hover:scale-105 transition-all duration-300 font-medium"
                >
                  <Users size={20} />
                  <span>Looking for Team</span>
                </Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 bg-yellow-400 text-gray-800 hover:bg-yellow-300 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-yellow-400/30 dark:hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#169B62] focus:ring-yellow-400"
                  >
                    <Users size={20} />
                    <span>Team Registration</span>
                  </Link>

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
                  className="flex items-center space-x-2 bg-yellow-400 text-gray-800 hover:bg-yellow-300 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400 px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-yellow-400/30 dark:hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#169B62] focus:ring-yellow-400"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
