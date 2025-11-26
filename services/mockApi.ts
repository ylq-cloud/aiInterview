
import { Question, EvaluationResult, InterviewSession, User } from '../types';
import { Language } from '../utils/translations';

// Simulated latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockUser: User = {
  id: 'u1',
  name: 'Alex Chen',
  role: 'student',
  avatar: 'https://picsum.photos/seed/alex/100/100'
};

// Bilingual Data Store
const db = {
  questions: [
    {
      id: '1',
      difficulty: 'Easy',
      category: 'Java',
      tags: ['Java', 'Collections'],
      en: {
        title: 'Explain the difference between HashMap and HashTable',
        description: 'Focus on synchronization, null keys/values, and performance implications.',
      },
      zh: {
        title: '解释 HashMap 和 HashTable 的区别',
        description: '请重点关注线程安全（Synchronization）、Null 值处理以及性能方面的差异。',
      }
    },
    {
      id: '2',
      difficulty: 'Hard',
      category: 'System Design',
      tags: ['System Design', 'Scalability'],
      en: {
        title: 'Design a URL Shortener service',
        description: 'Discuss database schema, algorithm for shortening, and handling high concurrency.',
      },
      zh: {
        title: '设计一个短链接生成系统 (URL Shortener)',
        description: '请讨论数据库 Schema 设计、短链生成算法以及如何应对高并发场景。',
      }
    },
    {
      id: '3',
      difficulty: 'Medium',
      category: 'Behavioral',
      tags: ['Behavioral', 'Soft Skills'],
      en: {
        title: 'Tell me about a time you failed',
        description: 'Use the STAR method to structure your response.',
      },
      zh: {
        title: '请分享一次你失败的经历',
        description: '请使用 STAR 法则（情境、任务、行动、结果）来构建你的回答。',
      }
    },
    {
      id: '4',
      difficulty: 'Medium',
      category: 'Spring',
      tags: ['Spring Boot', 'Framework'],
      en: {
        title: 'How does Spring Boot Auto-configuration work?',
        description: 'Explain @EnableAutoConfiguration and conditional annotations.',
      },
      zh: {
        title: 'Spring Boot 自动配置是如何工作的？',
        description: '请解释 @EnableAutoConfiguration 注解以及条件注解（Conditional Annotations）的作用。',
      }
    },
  ]
};

// Helper to map DB object to Question type
const mapQuestion = (q: any, lang: Language): Question => ({
  id: q.id,
  difficulty: q.difficulty,
  category: q.category,
  tags: q.tags,
  title: q[lang].title,
  description: q[lang].description,
});

export const getQuestions = async (lang: Language = 'en'): Promise<Question[]> => {
  await delay(600);
  return db.questions.map(q => mapQuestion(q, lang));
};

export const getQuestionById = async (id: string, lang: Language = 'en'): Promise<Question | undefined> => {
  await delay(300);
  const q = db.questions.find(q => q.id === id);
  return q ? mapQuestion(q, lang) : undefined;
};

export const submitRecording = async (sessionId: string, blob: Blob): Promise<void> => {
  console.log(`Uploading blob of size ${blob.size} for session ${sessionId}`);
  await delay(2000); // Simulate upload
};

export const generateEvaluation = async (sessionId: string, lang: Language = 'en'): Promise<EvaluationResult> => {
  await delay(3000); // Simulate Whisper + LLM processing
  
  const isZh = lang === 'zh';

  return {
    id: `eval-${Math.random()}`,
    sessionId,
    overallScore: 7.9,
    transcript: isZh 
      ? "HashMap 不是同步的，这意味着它不是线程安全的，而 HashTable 是同步的。另外，HashMap 允许一个 Null 键和多个 Null 值，但 HashTable 不允许任何 Null。在性能方面，HashMap 通常更快，因为它没有同步的开销。" 
      : "So, the HashMap is not synchronized which means it is not thread-safe, whereas HashTable is synchronized. Also, HashMap allows one null key and multiple null values, but HashTable doesn't allow any nulls. In terms of performance, HashMap is generally faster because it doesn't have the overhead of synchronization.",
    feedbackSummary: isZh
      ? "对核心差异理解很好。你正确指出了同步机制和空值处理的区别。但是，在谈到现代并发替代方案时，如果能提及 ConcurrentHashMap 会更完美。"
      : "Good grasp of the core differences. You correctly identified synchronization and null handling. However, you could have mentioned ConcurrentHashMap as a modern alternative.",
    details: {
      technical: { 
        score: 9.0, 
        note: isZh ? "正确识别了关键的技术差异。" : "Correctly identified key technical differences." 
      },
      structure: { 
        score: 7.5, 
        note: isZh ? "回答直接，但可以增加一个总结性的结尾。" : "Good direct answer, but could use a concluding summary." 
      },
      clarity: { 
        score: 8.5, 
        note: isZh ? "语言表达清晰简洁。" : "Language was clear and concise." 
      },
      depth: { 
        score: 6.0, 
        note: isZh ? "可以展开讨论内部实现（如 bucket、entry node）。" : "Could expand on internal implementation (buckets, nodes)." 
      }
    },
    suggestedPractice: [
      { questionId: '4', reason: isZh ? '加强对并发集合知识的理解' : 'Strengthen knowledge on concurrent collections' }
    ]
  };
};

export const getHistory = async (lang: Language = 'en'): Promise<any[]> => {
  await delay(500);
  return [
    { 
      id: 'sess_1', 
      questionId: '1', 
      questionTitle: lang === 'zh' ? '解释 HashMap 和 HashTable 的区别' : 'Explain difference between HashMap and HashTable',
      date: '2023-10-24 14:30', 
      duration: '45s', 
      score: 7.9, 
      status: 'completed' 
    },
    { 
      id: 'sess_2', 
      questionId: '2', 
      questionTitle: lang === 'zh' ? '设计一个短链接生成系统' : 'Design a URL Shortener service',
      date: '2023-10-23 09:15', 
      duration: '120s', 
      score: 6.2, 
      status: 'completed' 
    },
    { 
      id: 'sess_3', 
      questionId: '3', 
      questionTitle: lang === 'zh' ? '请分享一次你失败的经历' : 'Tell me about a time you failed',
      date: '2023-10-22 18:00', 
      duration: '-', 
      score: null, 
      status: 'incomplete' 
    },
  ];
};
