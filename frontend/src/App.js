import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
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
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;