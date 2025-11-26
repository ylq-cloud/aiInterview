
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { ArrowRight, Trophy, Target, Clock, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockUser, getHistory } from '../services/mockApi';
import { StatMetric } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const [recentSessions, setRecentSessions] = useState<any[]>([]);

  useEffect(() => {
    getHistory(language).then(data => setRecentSessions(data.slice(0, 3)));
  }, [language]);

  // Translate Chart Data Labels
  const data: StatMetric[] = [
    { subject: language === 'zh' ? '技术深度' : 'Technical', A: 85, fullMark: 100 },
    { subject: language === 'zh' ? '结构逻辑' : 'Structure', A: 65, fullMark: 100 },
    { subject: language === 'zh' ? '表达清晰' : 'Clarity', A: 90, fullMark: 100 },
    { subject: language === 'zh' ? '知识广度' : 'Depth', A: 55, fullMark: 100 },
    { subject: language === 'zh' ? '行为表现' : 'Behavioral', A: 70, fullMark: 100 },
    { subject: language === 'zh' ? '系统设计' : 'System Design', A: 40, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.welcome}, {mockUser.name}! 👋</h1>
          <p className="text-slate-500 mt-1">{t.welcomeSubtitle}</p>
        </div>
        <Link to="/questions" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm shadow-emerald-200">
          {t.startPractice}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-emerald-500" />
            {t.skillAnalysis}
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={mockUser.name}
                  dataKey="A"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">{t.weeklyProgress}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Trophy className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.interviews}</p>
                    <p className="text-xs text-slate-500">12 {t.completed}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-800">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.practiceTime}</p>
                    <p className="text-xs text-slate-500">{t.totalHours}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-800">4.5h</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.avgScore}</p>
                    <p className="text-xs text-slate-500">{t.topPercent}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-800">7.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">{t.recentSessions}</h2>
          <Link to="/history" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">{t.viewAll}</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recentSessions.map((session) => (
            <div key={session.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                  {session.questionTitle.substring(0, 1)}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 line-clamp-1">{session.questionTitle}</h3>
                  <p className="text-sm text-slate-500">{session.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 shrink-0">
                {session.score ? (
                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                    {session.score} / 10
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">{t.incomplete}</span>
                )}
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
