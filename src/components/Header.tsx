import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  LogIn,
  UserPlus,
  Crown,
  LogOut,
  Share,
  WorkflowIcon,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleManageBilling = async () => {
    try {
      const response = await fetch("/.netlify/functions/billingportal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: user?.stripeCustomerId,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("There was an error!", error);
      alert("Failed to redirect to the billing portal.");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      {user && (
        <>
         // <Link
         //   to="/beta-test"
         //   onClick={() => setIsMenuOpen(false)}
         //   className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700"
         // >
         //   <Share className="w-4 h-4" />
         //</>   <span className="text-sm">App Download</span>
         // </Link>
          <Link
            to="/share-chats"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700"
          >
            <Share className="w-4 h-4" />
            <span className="text-sm">Shared Chats</span>
          </Link>
          {user.isDeluxe && (
            <Link
              to="/plan"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700"
            >
              <WorkflowIcon className="w-4 h-4" />
              <span className="text-sm">Plan generator</span>
            </Link>
          )}
          {user.isPro || user.isDeluxe ? (
            <button
              onClick={() => {
                handleManageBilling();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700"
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm">Manage Plan</span>
            </button>
          ) : (
            <Link
              to="/pro"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700"
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm">Upgrade to Pro</span>
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </>
      )}
      {!user && (
        <>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-1.5 w-full px-3 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800"
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm">Login</span>
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm">Sign Up</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-blue-900">
      <div className="max-w-6xl px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-50 rounded-xl">
              <Stethoscope className="w-5 h-5 text-blue-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-blue-900">
                HealthChat
              </h1>
              <p className="hidden sm:block text-sm text-blue-600">
                Your AI Health Assistant
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-900" />
            ) : (
              <Menu className="w-6 h-6 text-blue-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <NavLinks />
          </div>
        )}
      </div>
    </header>
  );
};