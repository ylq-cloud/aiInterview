
import React, { useEffect, useState } from 'react';
import { Search, Filter, Play, Tag, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getQuestions } from '../services/mockApi';
import { Question } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const QuestionBank: React.FC = () => {
  const { t, language } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    setLoading(true);
    getQuestions(language).then(data => {
      setQuestions(data);
      setLoading(false);
    });
  }, [language]);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'All', label: t.all },
    { id: 'Algorithm', label: t.algorithm },
    { id: 'System Design', label: t.systemDesign },
    { id: 'Behavioral', label: t.behavioral },
    { id: 'Java', label: t.java },
    { id: 'Spring', label: t.spring }
  ];

  const getDifficultyLabel = (diff: string) => {
    switch(diff) {
      case 'Easy': return t.easy;
      case 'Medium': return t.medium;
      case 'Hard': return t.hard;
      default: return diff;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.questionBank}</h1>
          <p className="text-slate-500 mt-1">{t.selectQuestion}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                      q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {getDifficultyLabel(q.difficulty)}
                    </span>
                    <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded">
                      {q.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-slate-600 mt-2 line-clamp-2">{q.description}</p>
                  
                  <div className="flex gap-2 mt-4">
                    {q.tags.map(tag => (
                      <div key={tag} className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to={`/interview/${q.id}`}
                  className="ml-4 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:scale-110"
                >
                  <Play className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
