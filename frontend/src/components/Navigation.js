import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { 
  BarChart3, 
  Clock, 
  BookOpen, 
  RefreshCw, 
  History,
  Shield,
  User,
  LogOut,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const navigationItems = [
    { path: "/", icon: BarChart3, label: "Dashboard" },
    { path: "/timer", icon: Clock, label: "Cronômetro" },
    { path: "/subjects", icon: BookOpen, label: "Matérias" },
    { path: "/reviews", icon: RefreshCw, label: "Revisões" },
    { path: "/history", icon: History, label: "Histórico" }
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const handleMobileNavClick = (path) => {
    setShowMobileMenu(false);
    navigate(path);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo e Título */}
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-amber-400" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">CFO PMDF</h1>
                <p className="text-slate-300 text-xs md:text-sm">Sistema de Organização de Estudos</p>
              </div>
            </div>
            
            {/* Navegação Desktop - Escondida em mobile */}
            <div className="hidden lg:flex items-center space-x-1">
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

            {/* Controles do lado direito */}
            <div className="flex items-center space-x-2">
              {/* Menu Hambúrguer - Só aparece em mobile/tablet */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <div className="flex items-center space-x-2 md:space-x-4">
                  {/* Welcome Message - Escondido em mobile */}
                  <div className="hidden md:block text-right">
                    <p className="text-sm text-slate-300">Olá,</p>
                    <p className="text-white font-medium">{user?.name || 'Usuário'}</p>
                  </div>

                  {/* User Avatar/Menu Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-900" />
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-slate-200">
                          <p className="font-medium text-slate-900">{user?.name}</p>
                          <p className="text-sm text-slate-600">{user?.email}</p>
                          {user?.verified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 mt-1">
                              ✓ Email verificado
                            </span>
                          )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              toast({
                                title: "Em desenvolvimento",
                                description: "Página de perfil será implementada em breve.",
                              });
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-100"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Configurações</span>
                          </button>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sair</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Overlay para fechar menu do usuário */}
                {showUserMenu && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Mobile Slide-down */}
      {showMobileMenu && (
        <div className="lg:hidden bg-slate-800 border-b border-slate-700 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {/* Welcome message em mobile */}
              <div className="text-center pb-3 border-b border-slate-700 mb-3">
                <p className="text-slate-300 text-sm">Olá, <span className="text-white font-medium">{user?.name || 'Usuário'}</span></p>
              </div>
              
              {/* Navigation Items */}
              {navigationItems.map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => handleMobileNavClick(path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === path
                      ? "bg-amber-500 text-slate-900 shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              
              {/* Logout button em mobile */}
              <div className="pt-3 border-t border-slate-700 mt-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-slate-700 transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para fechar menu mobile */}
      {showMobileMenu && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" 
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </>
  );
};

export default Navigation;