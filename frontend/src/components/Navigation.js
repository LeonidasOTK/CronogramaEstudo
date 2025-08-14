import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "./ui/card";
import { 
  BarChart3, 
  Clock, 
  BookOpen, 
  RefreshCw, 
  History,
  Shield 
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navigationItems = [
    { path: "/", icon: BarChart3, label: "Dashboard" },
    { path: "/timer", icon: Clock, label: "Cronômetro" },
    { path: "/subjects", icon: BookOpen, label: "Matérias" },
    { path: "/reviews", icon: RefreshCw, label: "Revisões" },
    { path: "/history", icon: History, label: "Histórico" }
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">CFO PMDF</h1>
              <p className="text-slate-300 text-sm">Sistema de Organização de Estudos</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {navigationItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? "bg-amber-500 text-slate-900 shadow-lg transform scale-105"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;