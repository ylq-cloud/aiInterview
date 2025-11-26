
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateEvaluation, getQuestionById } from '../services/mockApi';
import { EvaluationResult, Question, EvaluationScore } from '../types';
import { Loader2, AlertCircle, BookOpen, ChevronDown, ChevronUp, Share2, Download, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const Evaluation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (id) {
      Promise.all([
        generateEvaluation(id, language),
        getQuestionById(id, language)
      ]).then(([res, q]) => {
        setResult(res);
        setQuestion(q || null);
      });
    }
  }, [id, language]);

  if (!result || !question) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">{t.generating}</p>
        <p className="text-xs text-slate-400 mt-2">{t.analyzingDelay}</p>
      </div>
    );
  }

  // Color mapping for scores
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRingColor = (score: number) => {
    if (score >= 8) return '#059669';
    if (score >= 6) return '#ca8a04';
    return '#dc2626';
  };

  const pieData = [
    { name: 'Score', value: result.overallScore },
    { name: 'Remaining', value: 10 - result.overallScore }
  ];

  return (
    <div className="space-y-6 pb-20">
        {/* Navigation */}
        <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-emerald-600">{t.dashboard}</Link>
            <span>/</span>
            <Link to="/history" className="hover:text-emerald-600">{t.history}</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{t.report} #{result.id.substring(0,6)}</span>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Overall Score & Question Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
            <h2 className="text-slate-500 font-medium uppercase tracking-wider text-sm mb-6">{t.overallScore}</h2>
            
            <div className="h-48 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={180}
                            endAngle={0}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill={getRingColor(result.overallScore)} />
                            <Cell fill="#f1f5f9" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <span className="text-4xl font-bold text-slate-900">{result.overallScore}</span>
                    <span className="text-sm text-slate-400">/ 10</span>
                </div>
            </div>
            
            <div className="mt-4 flex justify-center gap-4">
                <button className="flex items-center space-x-2 text-sm text-slate-600 hover:text-emerald-600 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{t.share}</span>
                </button>
                 <button className="flex items-center space-x-2 text-sm text-slate-600 hover:text-emerald-600 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>{t.pdf}</span>
                </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.questionContext}</h3>
            <p className="font-medium text-slate-800 mb-1">{question.title}</p>
            <p className="text-sm text-slate-500 line-clamp-3">{question.description}</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
                 <div className="flex gap-2">
                    {question.tags.map(t => (
                        <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{t}</span>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Right Col: Detailed Breakdown */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Feedback Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 bg-emerald-50/30">
                <h3 className="flex items-center text-lg font-bold text-slate-900 mb-3">
                    <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                    {t.feedbackSummary}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                    {result.feedbackSummary}
                </p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.entries(result.details) as [string, EvaluationScore][]).map(([key, data]) => (
                    <div key={key} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="capitalize font-semibold text-slate-700">{key}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${getScoreColor(data.score)}`}>
                                {data.score}/10
                            </span>
                        </div>
                        <p className="text-sm text-slate-600">{data.note}</p>
                    </div>
                ))}
            </div>

            {/* Recommended Practice */}
            {result.suggestedPractice.length > 0 && (
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1">{t.recommendedStep}</h3>
                            <p className="text-slate-300 text-sm mb-4">
                                {t.practiceGap} <strong>Concurrency</strong>
                            </p>
                            <Link to={`/interview/${result.suggestedPractice[0].questionId}`} className="inline-flex items-center bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-medium transition-colors">
                                {t.practiceAction}: Concurrent Collections
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Transcript Accordion */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <button 
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                >
                    <span className="font-semibold text-slate-900">{t.transcriptAnalysis}</span>
                    {showTranscript ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {showTranscript && (
                    <div className="px-6 pb-6 pt-0">
                         <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 text-sm leading-relaxed font-mono">
                            {result.transcript}
                         </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
