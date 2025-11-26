
import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import QuestionBank from './pages/QuestionBank';
import InterviewSession from './pages/InterviewSession';
import Evaluation from './pages/Evaluation';
import History from './pages/History';
import { Menu } from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageContext';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Hide sidebar on the interview session screen to maximize focus
  const isInterviewMode = location.pathname.startsWith('/interview/');

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-slate-900 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar - Hidden in Interview Mode */}
      {!isInterviewMode && <Sidebar />}

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${!isInterviewMode ? 'md:ml-64 p-4 md:p-8' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="questions" element={<QuestionBank />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<div className="p-8 text-center text-slate-500">Settings Module Placeholder</div>} />
            <Route path="result/:id" element={<Evaluation />} />
          </Route>
          
          {/* Interview route is outside standard layout padding for fullscreen effect */}
          <Route path="/interview/:id" element={<InterviewSession />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
