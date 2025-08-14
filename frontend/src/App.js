import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Dashboard from "./components/Dashboard";
import StudyTimer from "./components/StudyTimer";
import SubjectManager from "./components/SubjectManager";
import ReviewManager from "./components/ReviewManager";
import StudyHistory from "./components/StudyHistory";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas de Autenticação (Públicas) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Rotas Protegidas */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-slate-50">
                    <Navigation />
                    <main className="container mx-auto px-4 py-8">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/timer" element={<StudyTimer />} />
                        <Route path="/subjects" element={<SubjectManager />} />
                        <Route path="/reviews" element={<ReviewManager />} />
                        <Route path="/history" element={<StudyHistory />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;