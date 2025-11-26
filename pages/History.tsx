
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getHistory } from '../services/mockApi';
import { ArrowRight, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const History: React.FC = () => {
  const { t, language } = useLanguage();
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    getHistory(language).then(data => setSessions(data));
  }, [language]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t.historyTitle}</h1>
        <p className="text-slate-500 mt-1">{t.historySubtitle}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.question}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.date}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.duration}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.score}</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold mr-3">
                         {session.questionTitle.substring(0, 1)}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{session.questionTitle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      {session.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      {session.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session.score ? (
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        session.score >= 8 ? 'bg-emerald-100 text-emerald-700' : 
                        session.score >= 6 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {session.score} / 10
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     {session.status === 'completed' ? (
                        <div className="flex items-center text-emerald-600 text-xs font-medium uppercase tracking-wide">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {t.completed}
                        </div>
                     ) : (
                        <div className="flex items-center text-amber-500 text-xs font-medium uppercase tracking-wide">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {t.incomplete}
                        </div>
                     )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {session.status === 'completed' ? (
                        <Link to={`/result/${session.questionId}`} className="text-emerald-600 hover:text-emerald-900 flex items-center justify-end">
                            {t.viewReport} <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    ) : (
                         <Link to={`/interview/${session.questionId}`} className="text-slate-400 hover:text-slate-600 flex items-center justify-end">
                            {t.continue} <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
