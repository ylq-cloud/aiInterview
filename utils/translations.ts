
export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // Sidebar
    dashboard: 'Dashboard',
    questionBank: 'Question Bank',
    history: 'History',
    settings: 'Settings',
    signOut: 'Sign Out',
    
    // Dashboard
    welcome: 'Welcome back',
    welcomeSubtitle: "You've improved your Clarity score by 12% this week. Keep it up!",
    startPractice: 'Start Practice',
    skillAnalysis: 'Skill Analysis',
    weeklyProgress: 'Weekly Progress',
    interviews: 'Interviews',
    completed: 'completed',
    practiceTime: 'Practice Time',
    totalHours: 'Total hours',
    avgScore: 'Avg Score',
    topPercent: 'Top 15%',
    recentSessions: 'Recent Sessions',
    viewAll: 'View All',
    incomplete: 'Incomplete',
    
    // Question Bank
    searchPlaceholder: 'Search questions...',
    selectQuestion: 'Select a question to simulate a real interview environment.',
    all: 'All',
    algorithm: 'Algorithm',
    systemDesign: 'System Design',
    behavioral: 'Behavioral',
    java: 'Java',
    spring: 'Spring',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Interview Session
    session: 'Session',
    rec: 'REC',
    standby: 'STANDBY',
    cameraAccessRequired: 'Camera access required',
    enableCamera: 'Enable Camera',
    analyzing: 'Analyzing Response...',
    analyzingSub: 'Transcribing audio & generating feedback',
    analyzingDelay: 'This usually takes 5-10 seconds',
    generating: 'Generating your personalized AI feedback...',
    
    // Evaluation
    report: 'Report',
    overallScore: 'Overall Score',
    share: 'Share',
    pdf: 'PDF',
    questionContext: 'Question Context',
    feedbackSummary: 'AI Feedback Summary',
    recommendedStep: 'Recommended Next Step',
    practiceGap: 'Based on your performance, we found a gap in',
    practiceAction: 'Practice',
    transcriptAnalysis: 'Transcript & Analysis',
    
    // History
    historyTitle: 'Interview History',
    historySubtitle: 'Review your past performance and track your progress over time.',
    date: 'Date',
    question: 'Question',
    duration: 'Duration',
    score: 'Score',
    status: 'Status',
    action: 'Action',
    viewReport: 'View Report',
    continue: 'Continue',
    processing: 'Processing',
    
    // Common
    loading: 'Loading...',
  },
  zh: {
    // Sidebar
    dashboard: '仪表盘',
    questionBank: '模拟题库',
    history: '历史记录',
    settings: '设置',
    signOut: '退出登录',
    
    // Dashboard
    welcome: '欢迎回来',
    welcomeSubtitle: "本周您的表达清晰度提升了 12%。继续保持！",
    startPractice: '开始练习',
    skillAnalysis: '技能雷达图',
    weeklyProgress: '本周概览',
    interviews: '完成面试',
    completed: '次',
    practiceTime: '练习时长',
    totalHours: '总小时数',
    avgScore: '平均得分',
    topPercent: '前 15%',
    recentSessions: '近期记录',
    viewAll: '查看全部',
    incomplete: '未完成',
    
    // Question Bank
    searchPlaceholder: '搜索题目...',
    selectQuestion: '选择一道题目，开始真实的模拟面试。',
    all: '全部',
    algorithm: '算法',
    systemDesign: '系统设计',
    behavioral: '行为面试',
    java: 'Java',
    spring: 'Spring',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    
    // Interview Session
    session: '会话 ID',
    rec: '录制中',
    standby: '准备就绪',
    cameraAccessRequired: '需要摄像头权限',
    enableCamera: '开启摄像头',
    analyzing: '正在分析回答...',
    analyzingSub: '语音转写与 AI 评分中',
    analyzingDelay: '通常需要 5-10 秒',
    generating: '正在生成您的个性化 AI 报告...',
    
    // Evaluation
    report: '评估报告',
    overallScore: '综合评分',
    share: '分享',
    pdf: '导出 PDF',
    questionContext: '题目背景',
    feedbackSummary: 'AI 综合点评',
    recommendedStep: '建议下一步',
    practiceGap: '基于您的表现，我们发现您在以下方面有待加强：',
    practiceAction: '专项练习',
    transcriptAnalysis: '转写与逐字分析',
    
    // History
    historyTitle: '面试历史',
    historySubtitle: '回顾过往表现，追踪能力提升曲线。',
    date: '日期',
    question: '题目',
    duration: '时长',
    score: '分数',
    status: '状态',
    action: '操作',
    viewReport: '查看报告',
    continue: '继续',
    processing: '处理中',
    
    // Common
    loading: '加载中...',
  }
};
