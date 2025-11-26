
import React from 'react';
import { LayoutDashboard, BookOpen, History, Settings, LogOut, Video, Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: LayoutDashboard, label: t.dashboard, path: '/' },
    { icon: BookOpen, label: t.questionBank, path: '/questions' },
    { icon: History, label: t.history, path: '/history' },
    { icon: Settings, label: t.settings, path: '/settings' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 z-10 hidden md:flex">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Video className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">InterviewSage</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={toggleLanguage}
          className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white w-full transition-colors hover:bg-slate-800 rounded-lg"
        >
          <Languages className="w-5 h-5" />
          <span>{language === 'en' ? '中文 / English' : 'English / 中文'}</span>
        </button>

        <button className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white w-full transition-colors hover:bg-slate-800 rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>{t.signOut}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
