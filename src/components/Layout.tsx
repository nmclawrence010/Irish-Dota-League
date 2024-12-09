import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, ClipboardList, UserPlus, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import logo from '../public/irishdotalogo.jpg'


export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
<header className="bg-gradient-to-r from-[#169B62] via-[#169B62]/80 to-[#FF883E] dark:from-[#0A2F51] dark:via-[#0E4D64] dark:to-[#137177] text-white py-6 transition-colors">        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8"> {/* Increased spacing */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-90 transition-all"
            >
              <Trophy size={32} />
              <h1 className="text-3xl font-bold tracking-tight">Irish Dota League</h1>
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
          </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Team Signup - Glowing teal/cyan effect */}
                  <Link 
                    to="/signup" 
                    className="flex items-center space-x-2 bg-cyan-500 dark:bg-cyan-600 hover:bg-cyan-400 dark:hover:bg-cyan-500 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 dark:hover:shadow-cyan-600/30"
                  >
                    <Users size={20} />
                    <span>Team Signup</span>
                  </Link>

                  {/* Join Team - Vibrant emerald with subtle glow */}
                  <Link 
                    to="/join" 
                    className="flex items-center space-x-2 bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-400 dark:hover:bg-emerald-500 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 dark:hover:shadow-emerald-600/30"
                  >
                    <UserPlus size={20} />
                    <span>Join Team</span>
                  </Link>

                  {/* Logout - Subtle rose/red with fade effect */}
                  <button
                    onClick={() => logout()}
                    className="bg-rose-500 dark:bg-rose-600 hover:bg-rose-400 dark:hover:bg-rose-500 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/30 dark:hover:shadow-rose-600/30"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => login()}
                  className="bg-indigo-500 dark:bg-indigo-700 hover:bg-indigo-400 dark:hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};