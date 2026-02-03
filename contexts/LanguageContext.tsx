import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

const LANGUAGE_STORAGE_KEY = '@ronaldify_language';

export type LanguageCode = 'en' | 'ar' | 'es' | 'fr';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  rtl: boolean;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
];

type TranslationKeys = {
  // Tab navigation
  home: string;
  drills: string;
  coach: string;
  video: string;
  profile: string;
  
  // Settings
  settings: string;
  appearance: string;
  darkMode: string;
  useDarkTheme: string;
  soundHaptics: string;
  soundEffects: string;
  playSounds: string;
  hapticFeedback: string;
  vibration: string;
  language: string;
  selectLanguage: string;
  legal: string;
  privacyPolicy: string;
  viewPrivacyPolicy: string;
  termsOfService: string;
  viewTerms: string;
  data: string;
  resetAppData: string;
  clearLocalData: string;
  deleteAccount: string;
  permanentlyDelete: string;
  version: string;
  cancel: string;
  reset: string;
  delete: string;
  contactSupport: string;
  comingSoon: string;
  
  // Common
  startSession: string;
  minutes: string;
  level: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  pro: string;
  upgrade: string;
  restorePurchases: string;
  tryFree: string;
  lvl: string;
  drillsWord: string;
  levels: string;
  unlock: string;
  xpProgress: string;
  xpToLevel: string;
  totalXp: string;
  drillsDone: string;
  champion: string;
  min: string;
  
  // Home screen
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  dayStreak: string;
  sessions: string;
  thisWeek: string;
  todaysFocus: string;
  training: string;
  complete: string;
  quickStart: string;
  startTraining: string;
  beginSession: string;
  aiCoach: string;
  analyze: string;
  recommendedDrills: string;
  seeAll: string;
  unlockPotential: string;
  aiVideoAnalysis: string;
  aiTip: string;
  yourSkills: string;
  drillsCompleted: string;
  startWorkout: string;
  
  // Drills screen
  aiRecommended: string;
  focusTraining: string;
  drillsPersonalized: string;
  shootingDrills: string;
  dribblingDrills: string;
  passingDrills: string;
  speedDrills: string;
  fitnessDrills: string;
  defenseDrills: string;
  shooting: string;
  dribbling: string;
  passing: string;
  speed: string;
  fitness: string;
  defense: string;
  easy: string;
  medium: string;
  hard: string;
  elite: string;
  done: string;
  unlockMoreDrills: string;
  goPro: string;
  skillMastery: string;
  progressThroughLevels: string;
  randomWorkout: string;
  mixedSkills: string;
  startRandomWorkout: string;
  levelComplete: string;
  xpEarned: string;
  continueTraining: string;
  unlockAllProDrills: string;
  eliteSkillsAdvanced: string;
  yourJourney: string;
  completeAllDrillsEarn: string;
  drillsInThisLevel: string;
  
  // Profile screen
  editProfile: string;
  subscription: string;
  proPlan: string;
  freePlan: string;
  notifications: string;
  account: string;
  support: string;
  helpCenter: string;
  signOut: string;
  signOutConfirm: string;
  upgradeToPro: string;
  unlockAllFeatures: string;
  notSet: string;
  player: string;
  free: string;
  
  // Coach screen
  askCoachAnything: string;
  quickStartPrompts: string;
  improveShootingTip: string;
  warmUpRoutineTip: string;
  ballControlTip: string;
  increaseSpeedTip: string;
  personalCoachInfo: string;
  unlockProFeatures: string;
  videoAnalysisAdvanced: string;
  thinking: string;
  
  // Video screen
  videoAnalysis: string;
  uploadVideo: string;
  analyzeVideo: string;
  processing: string;
  selectVideo: string;
  proFeature: string;
  proFeatureDesc: string;
  permissionRequired: string;
  grantAccessMedia: string;
  uploading: string;
  analyzing: string;
  coachAnalysis: string;
  whatsWorking: string;
  workOnThis: string;
  performanceRatings: string;
  coachTips: string;
  recommendedTraining: string;
  tapToStartTraining: string;
  startTrainingArrow: string;
  yourAnalyses: string;
  whatWeAnalyze: string;
  howItWorks: string;
  upload: string;
  improve: string;
  important: string;
  uploadDesc: string;
  analyzeDesc: string;
  improveDesc: string;
  importantDesc: string;
  unlockVideoAnalysis: string;
  getAiFeedback: string;
  analysisFailed: string;
  tryAgain: string;
  uploadingVideo: string;
  processingFrames: string;
  aiAnalyzing: string;
  positioning: string;
  movement: string;
  dribblingMastery: string;
  shootingMastery: string;
  passingMastery: string;
  speedTraining: string;
  defensiveSkills: string;
  fitnessProgram: string;
  
  // Auth
  welcomeBack: string;
  signInContinue: string;
  continueWithApple: string;
  continueWithGoogle: string;
  moreOptions: string;
  email: string;
  password: string;
  signIn: string;
  signUp: string;
  noAccount: string;
  hasAccount: string;
  backToSocial: string;
  enterEmail: string;
  enterPassword: string;
  
  // Paywall
  unlockFullAccess: string;
  weeklyPlan: string;
  monthlyPlan: string;
  yearlyPlan: string;
  perWeek: string;
  perMonth: string;
  perYear: string;
  mostPopular: string;
  bestValue: string;
  freeTrial: string;
  startFreeTrial: string;
  
  // General
  error: string;
  success: string;
  loading: string;
  retry: string;
  save: string;
  next: string;
  back: string;
  skip: string;
  getStarted: string;
  letsGo: string;
  
  // Drill Session
  drillNotFound: string;
  goBack: string;
  drillComplete: string;
  time: string;
  steps: string;
  progress: string;
  equipment: string;
  pause: string;
  resume: string;
  start: string;
  
  // Paywall
  unlockYourPotential: string;
  trainLikePros: string;
  aiVideoAnalysisFeature: string;
  getFeedbackTechnique: string;
  advancedDrillsFeature: string;
  proLevelPrograms: string;
  personalAiCoach: string;
  unlimitedCoaching: string;
  prioritySupport: string;
  getHelpNeeded: string;
  loadingPlans: string;
  weekly: string;
  monthly: string;
  yearly: string;
  popular: string;
  continueWith: string;
  securePayment: string;
  cancelAnytime: string;
  subscriptionTerms: string;
  welcomeToPro: string;
  accessAllFeatures: string;
  purchasesRestored: string;
  proRestored: string;
  noPurchasesFound: string;
  noPreviousPurchases: string;
  purchasesOnDevice: string;
  purchasesOnlyDevice: string;
};


const translations: Record<LanguageCode, TranslationKeys> = {
  en: {
    // Tab navigation
    home: 'Home',
    drills: 'Drills',
    coach: 'Coach',
    video: 'Video',
    profile: 'Profile',
    
    // Settings
    settings: 'Settings',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    useDarkTheme: 'Use dark theme',
    soundHaptics: 'Sound & Haptics',
    soundEffects: 'Sound Effects',
    playSounds: 'Play sounds on actions',
    hapticFeedback: 'Haptic Feedback',
    vibration: 'Vibration on interactions',
    language: 'Language',
    selectLanguage: 'Select Language',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    viewPrivacyPolicy: 'View our privacy policy',
    termsOfService: 'Terms of Service',
    viewTerms: 'View our terms of service',
    data: 'Data',
    resetAppData: 'Reset App Data',
    clearLocalData: 'Clear local data and start fresh',
    deleteAccount: 'Delete Account',
    permanentlyDelete: 'Permanently delete your account',
    version: 'Version',
    cancel: 'Cancel',
    reset: 'Reset',
    delete: 'Delete',
    contactSupport: 'To delete your account, please contact arezchess@gmail.com',
    comingSoon: 'Coming Soon',
    
    // Common
    startSession: 'Start Session',
    minutes: 'minutes',
    level: 'Level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    pro: 'Pro',
    upgrade: 'Upgrade',
    restorePurchases: 'Restore Purchases',
    tryFree: 'Try Free for 3 Days',
    lvl: 'Lvl',
    drillsWord: 'drills',
    levels: 'levels',
    unlock: 'Unlock',
    xpProgress: 'XP Progress',
    xpToLevel: 'XP to Level',
    totalXp: 'Total XP',
    drillsDone: 'Drills Done',
    champion: 'Champion',
    min: 'min',
    
    // Home screen
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    dayStreak: 'Day Streak',
    sessions: 'Sessions',
    thisWeek: 'This Week',
    todaysFocus: "Today's Focus",
    training: 'Training',
    complete: 'complete',
    quickStart: 'Quick Start',
    startTraining: 'Start Training',
    beginSession: 'Begin your session',
    aiCoach: 'AI Coach',
    analyze: 'Analyze',
    recommendedDrills: 'Recommended Drills',
    seeAll: 'See all',
    unlockPotential: 'Unlock Your Full Potential',
    aiVideoAnalysis: 'AI video analysis • Advanced drills • Personal coaching',
    aiTip: 'AI Tip',
    yourSkills: 'Your Skills',
    drillsCompleted: 'drills completed',
    startWorkout: 'Start Workout',
    
    // Drills screen
    aiRecommended: 'AI Recommended',
    focusTraining: 'Focus Training',
    drillsPersonalized: 'drills personalized for your goals',
    shootingDrills: 'Shooting Drills',
    dribblingDrills: 'Dribbling Drills',
    passingDrills: 'Passing Drills',
    speedDrills: 'Speed Drills',
    fitnessDrills: 'Fitness Drills',
    defenseDrills: 'Defense Drills',
    shooting: 'Shooting',
    dribbling: 'Dribbling',
    passing: 'Passing',
    speed: 'Speed',
    fitness: 'Fitness',
    defense: 'Defense',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    elite: 'Elite',
    done: 'Done',
    unlockMoreDrills: 'Unlock more pro drills',
    goPro: 'Go Pro',
    skillMastery: 'Skill Mastery',
    progressThroughLevels: 'Progress through levels',
    randomWorkout: 'RANDOM WORKOUT',
    mixedSkills: 'Mixed skills',
    startRandomWorkout: 'Start Random Workout',
    levelComplete: 'Level Complete!',
    xpEarned: 'XP Earned!',
    continueTraining: 'Continue Training',
    unlockAllProDrills: 'Unlock All Pro Drills',
    eliteSkillsAdvanced: 'Elite skills & advanced training',
    yourJourney: 'Your Journey',
    completeAllDrillsEarn: 'Complete all drills to earn',
    drillsInThisLevel: 'Drills in this level',
    
    // Profile screen
    editProfile: 'Edit Profile',
    subscription: 'Subscription',
    proPlan: 'Pro plan',
    freePlan: 'Free plan',
    notifications: 'Notifications',
    account: 'Account',
    support: 'Support',
    helpCenter: 'Help Center',
    signOut: 'Sign Out',
    signOutConfirm: 'Are you sure you want to sign out?',
    upgradeToPro: 'Upgrade to Pro',
    unlockAllFeatures: 'Unlock all features',
    notSet: 'Not set',
    player: 'Player',
    free: 'Free',
    
    // Coach screen
    askCoachAnything: 'Ask your coach anything...',
    quickStartPrompts: 'Quick Start',
    improveShootingTip: 'How can I improve my shooting?',
    warmUpRoutineTip: 'Give me a warm-up routine',
    ballControlTip: 'Tips for better ball control',
    increaseSpeedTip: 'How to increase my speed?',
    personalCoachInfo: "I'm your personal football coach. Ask me anything about training, technique, tactics, or fitness!",
    unlockProFeatures: 'Unlock Pro Features',
    videoAnalysisAdvanced: 'Video analysis, advanced drills & more',
    thinking: 'Thinking...',
    
    // Video screen
    videoAnalysis: 'Video Analysis',
    uploadVideo: 'Upload Video',
    analyzeVideo: 'Analyze Video',
    processing: 'Processing...',
    selectVideo: 'Select a video to analyze',
    proFeature: 'Pro Feature',
    proFeatureDesc: 'Video analysis is a Pro feature. Upgrade to unlock AI-powered analysis of your football clips.',
    permissionRequired: 'Permission Required',
    grantAccessMedia: 'Please grant access to your media library to upload videos.',
    uploading: 'Uploading...',
    analyzing: 'Analyzing...',
    coachAnalysis: 'Coach Analysis',
    whatsWorking: "What's Working",
    workOnThis: 'Work On This',
    performanceRatings: 'Performance Ratings',
    coachTips: "Coach's Tips",
    recommendedTraining: 'Recommended Training',
    tapToStartTraining: 'Tap to start your training journey',
    startTrainingArrow: 'Start training →',
    yourAnalyses: 'Your Analyses',
    whatWeAnalyze: 'What We Analyze',
    howItWorks: 'How It Works',
    upload: 'Upload',
    improve: 'Improve',
    important: 'Important',
    uploadDesc: 'Record or select a video from your gallery (up to 60 seconds)',
    analyzeDesc: 'Our AI reviews your technique, movement, and positioning',
    improveDesc: 'Get personalized tips and drills added to your training plan',
    importantDesc: 'Only upload football-related clips. Otherwise, the AI may provide incorrect analysis.',
    unlockVideoAnalysis: 'Unlock Video Analysis',
    getAiFeedback: 'Get AI-powered feedback on your technique',
    analysisFailed: 'Analysis Failed',
    tryAgain: 'Try Again',
    uploadingVideo: 'Uploading video...',
    processingFrames: 'Processing frames...',
    aiAnalyzing: 'AI analyzing technique...',
    positioning: 'Positioning',
    movement: 'Movement',
    dribblingMastery: 'Dribbling Mastery',
    shootingMastery: 'Shooting Mastery',
    passingMastery: 'Passing Mastery',
    speedTraining: 'Speed Training',
    defensiveSkills: 'Defensive Skills',
    fitnessProgram: 'Fitness Program',
    
    // Auth
    welcomeBack: 'Welcome Back',
    signInContinue: 'Sign in to continue your training',
    continueWithApple: 'Continue with Apple',
    continueWithGoogle: 'Continue with Google',
    moreOptions: 'More options',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    backToSocial: 'Back to social login',
    enterEmail: 'your@email.com',
    enterPassword: 'Enter your password',
    
    // Paywall
    unlockFullAccess: 'Unlock Full Access',
    weeklyPlan: 'Weekly',
    monthlyPlan: 'Monthly',
    yearlyPlan: 'Yearly',
    perWeek: '/week',
    perMonth: '/month',
    perYear: '/year',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    freeTrial: '3-day free trial',
    startFreeTrial: 'Start Free Trial',
    
    // General
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',
    retry: 'Retry',
    save: 'Save',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    getStarted: 'Get Started',
    letsGo: "Let's Go",
    
    // Drill Session
    drillNotFound: 'Drill not found',
    goBack: 'Go Back',
    drillComplete: 'Drill Complete!',
    time: 'Time',
    steps: 'Steps',
    progress: 'Progress',
    equipment: 'Equipment',
    pause: 'Pause',
    resume: 'Resume',
    start: 'Start',
    
    // Paywall
    unlockYourPotential: 'Unlock Your\nFull Potential',
    trainLikePros: 'Train like the pros with advanced AI coaching',
    aiVideoAnalysisFeature: 'AI Video Analysis',
    getFeedbackTechnique: 'Get feedback on your technique',
    advancedDrillsFeature: 'Advanced Drills',
    proLevelPrograms: '50+ pro-level training programs',
    personalAiCoach: 'Personal AI Coach',
    unlimitedCoaching: 'Unlimited coaching sessions',
    prioritySupport: 'Priority Support',
    getHelpNeeded: 'Get help when you need it',
    loadingPlans: 'Loading plans...',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    popular: 'Popular',
    continueWith: 'Continue with',
    securePayment: 'Secure payment',
    cancelAnytime: 'Cancel anytime',
    subscriptionTerms: 'By subscribing, you agree to our Terms of Service and Privacy Policy. Subscriptions auto-renew until canceled.',
    welcomeToPro: 'Welcome to Pro! 🎉',
    accessAllFeatures: "You now have access to all premium features. Let's train like a pro!",
    purchasesRestored: 'Purchases Restored',
    proRestored: 'Your Pro subscription has been restored.',
    noPurchasesFound: 'No Purchases Found',
    noPreviousPurchases: "We couldn't find any previous purchases to restore.",
    purchasesOnDevice: 'Purchases Available on Device',
    purchasesOnlyDevice: 'In-app purchases are only available when running on a real iOS or Android device with the App Store or Play Store.',
  },
  ar: {
    // Tab navigation
    home: 'الرئيسية',
    drills: 'التدريبات',
    coach: 'المدرب',
    video: 'فيديو',
    profile: 'الملف الشخصي',
    
    // Settings
    settings: 'الإعدادات',
    appearance: 'المظهر',
    darkMode: 'الوضع الداكن',
    useDarkTheme: 'استخدام المظهر الداكن',
    soundHaptics: 'الصوت والاهتزاز',
    soundEffects: 'المؤثرات الصوتية',
    playSounds: 'تشغيل الأصوات عند الإجراءات',
    hapticFeedback: 'الاستجابة اللمسية',
    vibration: 'الاهتزاز عند التفاعل',
    language: 'اللغة',
    selectLanguage: 'اختر اللغة',
    legal: 'قانوني',
    privacyPolicy: 'سياسة الخصوصية',
    viewPrivacyPolicy: 'عرض سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    viewTerms: 'عرض شروط الخدمة',
    data: 'البيانات',
    resetAppData: 'إعادة تعيين بيانات التطبيق',
    clearLocalData: 'مسح البيانات المحلية والبدء من جديد',
    deleteAccount: 'حذف الحساب',
    permanentlyDelete: 'حذف حسابك بشكل دائم',
    version: 'الإصدار',
    cancel: 'إلغاء',
    reset: 'إعادة تعيين',
    delete: 'حذف',
    contactSupport: 'لحذف حسابك، يرجى التواصل مع arezchess@gmail.com',
    comingSoon: 'قريباً',
    
    // Common
    startSession: 'بدء الجلسة',
    minutes: 'دقائق',
    level: 'المستوى',
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم',
    pro: 'محترف',
    upgrade: 'ترقية',
    restorePurchases: 'استعادة المشتريات',
    tryFree: 'جرب مجاناً لمدة 3 أيام',
    lvl: 'مستوى',
    drillsWord: 'تمارين',
    levels: 'مستويات',
    unlock: 'فتح',
    xpProgress: 'تقدم XP',
    xpToLevel: 'XP للمستوى',
    totalXp: 'إجمالي XP',
    drillsDone: 'تمارين مكتملة',
    champion: 'بطل',
    min: 'دقيقة',
    
    // Home screen
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    dayStreak: 'أيام متتالية',
    sessions: 'الجلسات',
    thisWeek: 'هذا الأسبوع',
    todaysFocus: 'تركيز اليوم',
    training: 'تدريب',
    complete: 'مكتمل',
    quickStart: 'بداية سريعة',
    startTraining: 'بدء التدريب',
    beginSession: 'ابدأ جلستك',
    aiCoach: 'المدرب الذكي',
    analyze: 'تحليل',
    recommendedDrills: 'التدريبات الموصى بها',
    seeAll: 'عرض الكل',
    unlockPotential: 'أطلق العنان لإمكاناتك الكاملة',
    aiVideoAnalysis: 'تحليل فيديو بالذكاء الاصطناعي • تدريبات متقدمة • تدريب شخصي',
    aiTip: 'نصيحة ذكية',
    yourSkills: 'مهاراتك',
    drillsCompleted: 'تمارين مكتملة',
    startWorkout: 'بدء التمرين',
    
    // Drills screen
    aiRecommended: 'موصى به بالذكاء الاصطناعي',
    focusTraining: 'تدريب مركز',
    drillsPersonalized: 'تدريبات مخصصة لأهدافك',
    shootingDrills: 'تدريبات التسديد',
    dribblingDrills: 'تدريبات المراوغة',
    passingDrills: 'تدريبات التمرير',
    speedDrills: 'تدريبات السرعة',
    fitnessDrills: 'تدريبات اللياقة',
    defenseDrills: 'تدريبات الدفاع',
    shooting: 'التسديد',
    dribbling: 'المراوغة',
    passing: 'التمرير',
    speed: 'السرعة',
    fitness: 'اللياقة',
    defense: 'الدفاع',
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    elite: 'نخبة',
    done: 'تم',
    unlockMoreDrills: 'افتح المزيد من التدريبات',
    goPro: 'اشترك في برو',
    skillMastery: 'إتقان المهارات',
    progressThroughLevels: 'التقدم عبر المستويات',
    randomWorkout: 'تمرين عشوائي',
    mixedSkills: 'مهارات متنوعة',
    startRandomWorkout: 'بدء التمرين العشوائي',
    levelComplete: 'اكتمل المستوى!',
    xpEarned: 'XP مكتسبة!',
    continueTraining: 'متابعة التدريب',
    unlockAllProDrills: 'فتح جميع تمارين برو',
    eliteSkillsAdvanced: 'مهارات نخبة وتدريب متقدم',
    yourJourney: 'رحلتك',
    completeAllDrillsEarn: 'أكمل جميع التمارين للحصول على',
    drillsInThisLevel: 'التمارين في هذا المستوى',
    
    // Profile screen
    editProfile: 'تعديل الملف',
    subscription: 'الاشتراك',
    proPlan: 'خطة برو',
    freePlan: 'خطة مجانية',
    notifications: 'الإشعارات',
    account: 'الحساب',
    support: 'الدعم',
    helpCenter: 'مركز المساعدة',
    signOut: 'تسجيل الخروج',
    signOutConfirm: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
    upgradeToPro: 'الترقية إلى برو',
    unlockAllFeatures: 'افتح جميع الميزات',
    notSet: 'غير محدد',
    player: 'لاعب',
    free: 'مجاني',
    
    // Coach screen
    askCoachAnything: 'اسأل مدربك أي شيء...',
    quickStartPrompts: 'بداية سريعة',
    improveShootingTip: 'كيف أحسن تسديدي؟',
    warmUpRoutineTip: 'أعطني روتين إحماء',
    ballControlTip: 'نصائح للتحكم بالكرة',
    increaseSpeedTip: 'كيف أزيد سرعتي؟',
    personalCoachInfo: 'أنا مدربك الشخصي لكرة القدم. اسألني أي شيء عن التدريب أو التقنية أو التكتيكات أو اللياقة!',
    unlockProFeatures: 'افتح ميزات برو',
    videoAnalysisAdvanced: 'تحليل الفيديو، تدريبات متقدمة والمزيد',
    thinking: 'جاري التفكير...',
    
    // Video screen
    videoAnalysis: 'تحليل الفيديو',
    uploadVideo: 'رفع فيديو',
    analyzeVideo: 'تحليل الفيديو',
    processing: 'جاري المعالجة...',
    selectVideo: 'اختر فيديو للتحليل',
    proFeature: 'ميزة برو',
    proFeatureDesc: 'تحليل الفيديو هو ميزة برو. قم بالترقية لفتح التحليل بالذكاء الاصطناعي لمقاطع كرة القدم.',
    permissionRequired: 'الإذن مطلوب',
    grantAccessMedia: 'يرجى منح حق الوصول إلى مكتبة الوسائط لرفع الفيديوهات.',
    uploading: 'جاري الرفع...',
    analyzing: 'جاري التحليل...',
    coachAnalysis: 'تحليل المدرب',
    whatsWorking: 'ما يعمل جيداً',
    workOnThis: 'اعمل على هذا',
    performanceRatings: 'تقييمات الأداء',
    coachTips: 'نصائح المدرب',
    recommendedTraining: 'التدريب الموصى به',
    tapToStartTraining: 'اضغط لبدء رحلة التدريب',
    startTrainingArrow: 'بدء التدريب ←',
    yourAnalyses: 'تحليلاتك',
    whatWeAnalyze: 'ما نحلله',
    howItWorks: 'كيف يعمل',
    upload: 'رفع',
    improve: 'تحسين',
    important: 'مهم',
    uploadDesc: 'سجل أو اختر فيديو من معرض الصور (حتى 60 ثانية)',
    analyzeDesc: 'يراجع الذكاء الاصطناعي تقنيتك وحركتك ووضعك',
    improveDesc: 'احصل على نصائح وتمارين مخصصة تضاف إلى خطة تدريبك',
    importantDesc: 'قم فقط برفع مقاطع كرة القدم. وإلا قد يقدم الذكاء الاصطناعي تحليلاً غير صحيح.',
    unlockVideoAnalysis: 'فتح تحليل الفيديو',
    getAiFeedback: 'احصل على ملاحظات الذكاء الاصطناعي على تقنيتك',
    analysisFailed: 'فشل التحليل',
    tryAgain: 'حاول مرة أخرى',
    uploadingVideo: 'جاري رفع الفيديو...',
    processingFrames: 'جاري معالجة الإطارات...',
    aiAnalyzing: 'الذكاء الاصطناعي يحلل التقنية...',
    positioning: 'التموضع',
    movement: 'الحركة',
    dribblingMastery: 'إتقان المراوغة',
    shootingMastery: 'إتقان التسديد',
    passingMastery: 'إتقان التمرير',
    speedTraining: 'تدريب السرعة',
    defensiveSkills: 'المهارات الدفاعية',
    fitnessProgram: 'برنامج اللياقة',
    
    // Auth
    welcomeBack: 'مرحباً بعودتك',
    signInContinue: 'سجل الدخول لمتابعة تدريبك',
    continueWithApple: 'المتابعة مع Apple',
    continueWithGoogle: 'المتابعة مع Google',
    moreOptions: 'خيارات أخرى',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    backToSocial: 'العودة لتسجيل الدخول الاجتماعي',
    enterEmail: 'بريدك@email.com',
    enterPassword: 'أدخل كلمة المرور',
    
    // Paywall
    unlockFullAccess: 'افتح الوصول الكامل',
    weeklyPlan: 'أسبوعي',
    monthlyPlan: 'شهري',
    yearlyPlan: 'سنوي',
    perWeek: '/أسبوع',
    perMonth: '/شهر',
    perYear: '/سنة',
    mostPopular: 'الأكثر شعبية',
    bestValue: 'أفضل قيمة',
    freeTrial: 'تجربة مجانية 3 أيام',
    startFreeTrial: 'ابدأ التجربة المجانية',
    
    // General
    error: 'خطأ',
    success: 'نجاح',
    loading: 'جاري التحميل...',
    retry: 'إعادة المحاولة',
    save: 'حفظ',
    next: 'التالي',
    back: 'رجوع',
    skip: 'تخطي',
    getStarted: 'ابدأ الآن',
    letsGo: 'هيا بنا',
    
    // Drill Session
    drillNotFound: 'التمرين غير موجود',
    goBack: 'رجوع',
    drillComplete: 'اكتمل التمرين!',
    time: 'الوقت',
    steps: 'الخطوات',
    progress: 'التقدم',
    equipment: 'المعدات',
    pause: 'إيقاف مؤقت',
    resume: 'استئناف',
    start: 'بدء',
    
    // Paywall
    unlockYourPotential: 'أطلق العنان\nلإمكاناتك الكاملة',
    trainLikePros: 'تدرب مثل المحترفين مع تدريب الذكاء الاصطناعي المتقدم',
    aiVideoAnalysisFeature: 'تحليل الفيديو بالذكاء الاصطناعي',
    getFeedbackTechnique: 'احصل على ملاحظات حول تقنيتك',
    advancedDrillsFeature: 'تدريبات متقدمة',
    proLevelPrograms: '+50 برنامج تدريب احترافي',
    personalAiCoach: 'مدرب ذكاء اصطناعي شخصي',
    unlimitedCoaching: 'جلسات تدريب غير محدودة',
    prioritySupport: 'دعم ذو أولوية',
    getHelpNeeded: 'احصل على المساعدة عند الحاجة',
    loadingPlans: 'جاري تحميل الخطط...',
    weekly: 'أسبوعي',
    monthly: 'شهري',
    yearly: 'سنوي',
    popular: 'شائع',
    continueWith: 'المتابعة مع',
    securePayment: 'دفع آمن',
    cancelAnytime: 'إلغاء في أي وقت',
    subscriptionTerms: 'بالاشتراك، أنت توافق على شروط الخدمة وسياسة الخصوصية. الاشتراكات تتجدد تلقائياً حتى الإلغاء.',
    welcomeToPro: 'مرحباً في برو! 🎉',
    accessAllFeatures: 'لديك الآن إمكانية الوصول إلى جميع الميزات المميزة. هيا نتدرب مثل المحترفين!',
    purchasesRestored: 'تم استعادة المشتريات',
    proRestored: 'تم استعادة اشتراكك في برو.',
    noPurchasesFound: 'لم يتم العثور على مشتريات',
    noPreviousPurchases: 'لم نتمكن من العثور على أي مشتريات سابقة للاستعادة.',
    purchasesOnDevice: 'المشتريات متاحة على الجهاز',
    purchasesOnlyDevice: 'المشتريات داخل التطبيق متاحة فقط عند التشغيل على جهاز iOS أو Android حقيقي مع App Store أو Play Store.',
  },
  es: {
    // Tab navigation
    home: 'Inicio',
    drills: 'Ejercicios',
    coach: 'Entrenador',
    video: 'Video',
    profile: 'Perfil',
    
    // Settings
    settings: 'Ajustes',
    appearance: 'Apariencia',
    darkMode: 'Modo Oscuro',
    useDarkTheme: 'Usar tema oscuro',
    soundHaptics: 'Sonido y Vibraciones',
    soundEffects: 'Efectos de Sonido',
    playSounds: 'Reproducir sonidos en acciones',
    hapticFeedback: 'Retroalimentación Háptica',
    vibration: 'Vibración en interacciones',
    language: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
    legal: 'Legal',
    privacyPolicy: 'Política de Privacidad',
    viewPrivacyPolicy: 'Ver nuestra política de privacidad',
    termsOfService: 'Términos de Servicio',
    viewTerms: 'Ver nuestros términos de servicio',
    data: 'Datos',
    resetAppData: 'Restablecer Datos',
    clearLocalData: 'Borrar datos locales y empezar de nuevo',
    deleteAccount: 'Eliminar Cuenta',
    permanentlyDelete: 'Eliminar tu cuenta permanentemente',
    version: 'Versión',
    cancel: 'Cancelar',
    reset: 'Restablecer',
    delete: 'Eliminar',
    contactSupport: 'Para eliminar tu cuenta, contacta a arezchess@gmail.com',
    comingSoon: 'Próximamente',
    
    // Common
    startSession: 'Iniciar Sesión',
    minutes: 'minutos',
    level: 'Nivel',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    pro: 'Pro',
    upgrade: 'Mejorar',
    restorePurchases: 'Restaurar Compras',
    tryFree: 'Prueba Gratis por 3 Días',
    lvl: 'Nvl',
    drillsWord: 'ejercicios',
    levels: 'niveles',
    unlock: 'Desbloquear',
    xpProgress: 'Progreso XP',
    xpToLevel: 'XP para Nivel',
    totalXp: 'XP Total',
    drillsDone: 'Ejercicios Hechos',
    champion: 'Campeón',
    min: 'min',
    
    // Home screen
    goodMorning: 'Buenos días',
    goodAfternoon: 'Buenas tardes',
    goodEvening: 'Buenas noches',
    dayStreak: 'Racha de Días',
    sessions: 'Sesiones',
    thisWeek: 'Esta Semana',
    todaysFocus: 'Enfoque de Hoy',
    training: 'Entrenamiento',
    complete: 'completado',
    quickStart: 'Inicio Rápido',
    startTraining: 'Iniciar Entrenamiento',
    beginSession: 'Comienza tu sesión',
    aiCoach: 'Entrenador IA',
    analyze: 'Analizar',
    recommendedDrills: 'Ejercicios Recomendados',
    seeAll: 'Ver todo',
    unlockPotential: 'Desbloquea Tu Potencial Completo',
    aiVideoAnalysis: 'Análisis de video IA • Ejercicios avanzados • Coaching personal',
    aiTip: 'Consejo IA',
    yourSkills: 'Tus Habilidades',
    drillsCompleted: 'ejercicios completados',
    startWorkout: 'Iniciar Entrenamiento',
    
    // Drills screen
    aiRecommended: 'Recomendado por IA',
    focusTraining: 'Entrenamiento Enfocado',
    drillsPersonalized: 'ejercicios personalizados para tus objetivos',
    shootingDrills: 'Ejercicios de Tiro',
    dribblingDrills: 'Ejercicios de Regate',
    passingDrills: 'Ejercicios de Pase',
    speedDrills: 'Ejercicios de Velocidad',
    fitnessDrills: 'Ejercicios de Fitness',
    defenseDrills: 'Ejercicios de Defensa',
    shooting: 'Tiro',
    dribbling: 'Regate',
    passing: 'Pase',
    speed: 'Velocidad',
    fitness: 'Fitness',
    defense: 'Defensa',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    elite: 'Élite',
    done: 'Hecho',
    unlockMoreDrills: 'Desbloquea más ejercicios pro',
    goPro: 'Ir Pro',
    skillMastery: 'Dominio de Habilidades',
    progressThroughLevels: 'Progresa por los niveles',
    randomWorkout: 'ENTRENAMIENTO ALEATORIO',
    mixedSkills: 'Habilidades mixtas',
    startRandomWorkout: 'Iniciar Entrenamiento Aleatorio',
    levelComplete: '¡Nivel Completado!',
    xpEarned: '¡XP Ganada!',
    continueTraining: 'Continuar Entrenamiento',
    unlockAllProDrills: 'Desbloquear Todos los Ejercicios Pro',
    eliteSkillsAdvanced: 'Habilidades élite y entrenamiento avanzado',
    yourJourney: 'Tu Viaje',
    completeAllDrillsEarn: 'Completa todos los ejercicios para ganar',
    drillsInThisLevel: 'Ejercicios en este nivel',
    
    // Profile screen
    editProfile: 'Editar Perfil',
    subscription: 'Suscripción',
    proPlan: 'Plan Pro',
    freePlan: 'Plan Gratis',
    notifications: 'Notificaciones',
    account: 'Cuenta',
    support: 'Soporte',
    helpCenter: 'Centro de Ayuda',
    signOut: 'Cerrar Sesión',
    signOutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
    upgradeToPro: 'Mejorar a Pro',
    unlockAllFeatures: 'Desbloquea todas las funciones',
    notSet: 'No establecido',
    player: 'Jugador',
    free: 'Gratis',
    
    // Coach screen
    askCoachAnything: 'Pregunta a tu entrenador...',
    quickStartPrompts: 'Inicio Rápido',
    improveShootingTip: '¿Cómo puedo mejorar mi tiro?',
    warmUpRoutineTip: 'Dame una rutina de calentamiento',
    ballControlTip: 'Consejos para mejor control del balón',
    increaseSpeedTip: '¿Cómo aumentar mi velocidad?',
    personalCoachInfo: 'Soy tu entrenador personal de fútbol. ¡Pregúntame sobre entrenamiento, técnica, tácticas o fitness!',
    unlockProFeatures: 'Desbloquear Funciones Pro',
    videoAnalysisAdvanced: 'Análisis de video, ejercicios avanzados y más',
    thinking: 'Pensando...',
    
    // Video screen
    videoAnalysis: 'Análisis de Video',
    uploadVideo: 'Subir Video',
    analyzeVideo: 'Analizar Video',
    processing: 'Procesando...',
    selectVideo: 'Selecciona un video para analizar',
    proFeature: 'Función Pro',
    proFeatureDesc: 'El análisis de video es una función Pro. Mejora para desbloquear el análisis con IA de tus clips de fútbol.',
    permissionRequired: 'Permiso Requerido',
    grantAccessMedia: 'Por favor concede acceso a tu biblioteca multimedia para subir videos.',
    uploading: 'Subiendo...',
    analyzing: 'Analizando...',
    coachAnalysis: 'Análisis del Entrenador',
    whatsWorking: 'Lo Que Funciona',
    workOnThis: 'Trabaja En Esto',
    performanceRatings: 'Calificaciones de Rendimiento',
    coachTips: 'Consejos del Entrenador',
    recommendedTraining: 'Entrenamiento Recomendado',
    tapToStartTraining: 'Toca para iniciar tu viaje de entrenamiento',
    startTrainingArrow: 'Iniciar entrenamiento →',
    yourAnalyses: 'Tus Análisis',
    whatWeAnalyze: 'Lo Que Analizamos',
    howItWorks: 'Cómo Funciona',
    upload: 'Subir',
    improve: 'Mejorar',
    important: 'Importante',
    uploadDesc: 'Graba o selecciona un video de tu galería (hasta 60 segundos)',
    analyzeDesc: 'Nuestra IA revisa tu técnica, movimiento y posicionamiento',
    improveDesc: 'Obtén consejos personalizados y ejercicios añadidos a tu plan de entrenamiento',
    importantDesc: 'Solo sube clips de fútbol. De lo contrario, la IA puede proporcionar un análisis incorrecto.',
    unlockVideoAnalysis: 'Desbloquear Análisis de Video',
    getAiFeedback: 'Obtén retroalimentación de IA sobre tu técnica',
    analysisFailed: 'Análisis Fallido',
    tryAgain: 'Intentar de Nuevo',
    uploadingVideo: 'Subiendo video...',
    processingFrames: 'Procesando fotogramas...',
    aiAnalyzing: 'IA analizando técnica...',
    positioning: 'Posicionamiento',
    movement: 'Movimiento',
    dribblingMastery: 'Dominio del Regate',
    shootingMastery: 'Dominio del Tiro',
    passingMastery: 'Dominio del Pase',
    speedTraining: 'Entrenamiento de Velocidad',
    defensiveSkills: 'Habilidades Defensivas',
    fitnessProgram: 'Programa de Fitness',
    
    // Auth
    welcomeBack: 'Bienvenido de Nuevo',
    signInContinue: 'Inicia sesión para continuar tu entrenamiento',
    continueWithApple: 'Continuar con Apple',
    continueWithGoogle: 'Continuar con Google',
    moreOptions: 'Más opciones',
    email: 'Correo',
    password: 'Contraseña',
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    noAccount: '¿No tienes cuenta?',
    hasAccount: '¿Ya tienes cuenta?',
    backToSocial: 'Volver al login social',
    enterEmail: 'tu@email.com',
    enterPassword: 'Ingresa tu contraseña',
    
    // Paywall
    unlockFullAccess: 'Desbloquear Acceso Completo',
    weeklyPlan: 'Semanal',
    monthlyPlan: 'Mensual',
    yearlyPlan: 'Anual',
    perWeek: '/semana',
    perMonth: '/mes',
    perYear: '/año',
    mostPopular: 'Más Popular',
    bestValue: 'Mejor Valor',
    freeTrial: 'Prueba gratis de 3 días',
    startFreeTrial: 'Iniciar Prueba Gratis',
    
    // General
    error: 'Error',
    success: 'Éxito',
    loading: 'Cargando...',
    retry: 'Reintentar',
    save: 'Guardar',
    next: 'Siguiente',
    back: 'Atrás',
    skip: 'Saltar',
    getStarted: 'Comenzar',
    letsGo: 'Vamos',
    
    // Drill Session
    drillNotFound: 'Ejercicio no encontrado',
    goBack: 'Volver',
    drillComplete: '¡Ejercicio Completado!',
    time: 'Tiempo',
    steps: 'Pasos',
    progress: 'Progreso',
    equipment: 'Equipo',
    pause: 'Pausar',
    resume: 'Reanudar',
    start: 'Iniciar',
    
    // Paywall
    unlockYourPotential: 'Desbloquea Tu\nPotencial Completo',
    trainLikePros: 'Entrena como los profesionales con coaching IA avanzado',
    aiVideoAnalysisFeature: 'Análisis de Video IA',
    getFeedbackTechnique: 'Obtén retroalimentación sobre tu técnica',
    advancedDrillsFeature: 'Ejercicios Avanzados',
    proLevelPrograms: '+50 programas de entrenamiento profesional',
    personalAiCoach: 'Coach IA Personal',
    unlimitedCoaching: 'Sesiones de coaching ilimitadas',
    prioritySupport: 'Soporte Prioritario',
    getHelpNeeded: 'Obtén ayuda cuando la necesites',
    loadingPlans: 'Cargando planes...',
    weekly: 'Semanal',
    monthly: 'Mensual',
    yearly: 'Anual',
    popular: 'Popular',
    continueWith: 'Continuar con',
    securePayment: 'Pago seguro',
    cancelAnytime: 'Cancela cuando quieras',
    subscriptionTerms: 'Al suscribirte, aceptas nuestros Términos de Servicio y Política de Privacidad. Las suscripciones se renuevan automáticamente hasta que se cancelen.',
    welcomeToPro: '¡Bienvenido a Pro! 🎉',
    accessAllFeatures: 'Ahora tienes acceso a todas las funciones premium. ¡Entrenemos como profesionales!',
    purchasesRestored: 'Compras Restauradas',
    proRestored: 'Tu suscripción Pro ha sido restaurada.',
    noPurchasesFound: 'No se Encontraron Compras',
    noPreviousPurchases: 'No pudimos encontrar compras anteriores para restaurar.',
    purchasesOnDevice: 'Compras Disponibles en Dispositivo',
    purchasesOnlyDevice: 'Las compras dentro de la aplicación solo están disponibles cuando se ejecuta en un dispositivo iOS o Android real con App Store o Play Store.',
  },
  fr: {
    // Tab navigation
    home: 'Accueil',
    drills: 'Exercices',
    coach: 'Coach',
    video: 'Vidéo',
    profile: 'Profil',
    
    // Settings
    settings: 'Paramètres',
    appearance: 'Apparence',
    darkMode: 'Mode Sombre',
    useDarkTheme: 'Utiliser le thème sombre',
    soundHaptics: 'Son et Vibrations',
    soundEffects: 'Effets Sonores',
    playSounds: 'Jouer les sons lors des actions',
    hapticFeedback: 'Retour Haptique',
    vibration: 'Vibration lors des interactions',
    language: 'Langue',
    selectLanguage: 'Sélectionner la Langue',
    legal: 'Légal',
    privacyPolicy: 'Politique de Confidentialité',
    viewPrivacyPolicy: 'Voir notre politique de confidentialité',
    termsOfService: "Conditions d'Utilisation",
    viewTerms: "Voir nos conditions d'utilisation",
    data: 'Données',
    resetAppData: 'Réinitialiser les Données',
    clearLocalData: 'Effacer les données locales et recommencer',
    deleteAccount: 'Supprimer le Compte',
    permanentlyDelete: 'Supprimer définitivement votre compte',
    version: 'Version',
    cancel: 'Annuler',
    reset: 'Réinitialiser',
    delete: 'Supprimer',
    contactSupport: 'Pour supprimer votre compte, contactez arezchess@gmail.com',
    comingSoon: 'Bientôt Disponible',
    
    // Common
    startSession: 'Démarrer la Session',
    minutes: 'minutes',
    level: 'Niveau',
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    pro: 'Pro',
    upgrade: 'Améliorer',
    restorePurchases: 'Restaurer les Achats',
    tryFree: 'Essai Gratuit de 3 Jours',
    lvl: 'Niv',
    drillsWord: 'exercices',
    levels: 'niveaux',
    unlock: 'Débloquer',
    xpProgress: 'Progression XP',
    xpToLevel: 'XP pour Niveau',
    totalXp: 'XP Total',
    drillsDone: 'Exercices Faits',
    champion: 'Champion',
    min: 'min',
    
    // Home screen
    goodMorning: 'Bonjour',
    goodAfternoon: 'Bon après-midi',
    goodEvening: 'Bonsoir',
    dayStreak: 'Jours Consécutifs',
    sessions: 'Sessions',
    thisWeek: 'Cette Semaine',
    todaysFocus: "Focus d'Aujourd'hui",
    training: 'Entraînement',
    complete: 'terminé',
    quickStart: 'Démarrage Rapide',
    startTraining: "Démarrer l'Entraînement",
    beginSession: 'Commencez votre session',
    aiCoach: 'Coach IA',
    analyze: 'Analyser',
    recommendedDrills: 'Exercices Recommandés',
    seeAll: 'Voir tout',
    unlockPotential: 'Libérez Votre Plein Potentiel',
    aiVideoAnalysis: 'Analyse vidéo IA • Exercices avancés • Coaching personnel',
    aiTip: 'Conseil IA',
    yourSkills: 'Vos Compétences',
    drillsCompleted: 'exercices complétés',
    startWorkout: 'Démarrer Entraînement',
    
    // Drills screen
    aiRecommended: 'Recommandé par IA',
    focusTraining: 'Entraînement Ciblé',
    drillsPersonalized: 'exercices personnalisés pour vos objectifs',
    shootingDrills: 'Exercices de Tir',
    dribblingDrills: 'Exercices de Dribble',
    passingDrills: 'Exercices de Passe',
    speedDrills: 'Exercices de Vitesse',
    fitnessDrills: 'Exercices de Fitness',
    defenseDrills: 'Exercices de Défense',
    shooting: 'Tir',
    dribbling: 'Dribble',
    passing: 'Passe',
    speed: 'Vitesse',
    fitness: 'Fitness',
    defense: 'Défense',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    elite: 'Élite',
    done: 'Fait',
    unlockMoreDrills: "Débloquez plus d'exercices pro",
    goPro: 'Passer Pro',
    skillMastery: 'Maîtrise des Compétences',
    progressThroughLevels: 'Progressez à travers les niveaux',
    randomWorkout: 'ENTRAÎNEMENT ALÉATOIRE',
    mixedSkills: 'Compétences mixtes',
    startRandomWorkout: 'Démarrer Entraînement Aléatoire',
    levelComplete: 'Niveau Terminé!',
    xpEarned: 'XP Gagnés!',
    continueTraining: 'Continuer Entraînement',
    unlockAllProDrills: 'Débloquer Tous les Exercices Pro',
    eliteSkillsAdvanced: 'Compétences élite et entraînement avancé',
    yourJourney: 'Votre Parcours',
    completeAllDrillsEarn: 'Complétez tous les exercices pour gagner',
    drillsInThisLevel: 'Exercices dans ce niveau',
    
    // Profile screen
    editProfile: 'Modifier le Profil',
    subscription: 'Abonnement',
    proPlan: 'Plan Pro',
    freePlan: 'Plan Gratuit',
    notifications: 'Notifications',
    account: 'Compte',
    support: 'Support',
    helpCenter: "Centre d'Aide",
    signOut: 'Déconnexion',
    signOutConfirm: 'Êtes-vous sûr de vouloir vous déconnecter?',
    upgradeToPro: 'Passer à Pro',
    unlockAllFeatures: 'Débloquez toutes les fonctionnalités',
    notSet: 'Non défini',
    player: 'Joueur',
    free: 'Gratuit',
    
    // Coach screen
    askCoachAnything: 'Demandez à votre coach...',
    quickStartPrompts: 'Démarrage Rapide',
    improveShootingTip: 'Comment améliorer mon tir?',
    warmUpRoutineTip: "Donnez-moi une routine d'échauffement",
    ballControlTip: 'Conseils pour mieux contrôler le ballon',
    increaseSpeedTip: 'Comment augmenter ma vitesse?',
    personalCoachInfo: "Je suis votre coach personnel de football. Demandez-moi n'importe quoi sur l'entraînement, la technique, les tactiques ou le fitness!",
    unlockProFeatures: 'Débloquer les Fonctionnalités Pro',
    videoAnalysisAdvanced: 'Analyse vidéo, exercices avancés et plus',
    thinking: 'Réflexion...',
    
    // Video screen
    videoAnalysis: 'Analyse Vidéo',
    uploadVideo: 'Télécharger Vidéo',
    analyzeVideo: 'Analyser Vidéo',
    processing: 'Traitement...',
    selectVideo: 'Sélectionnez une vidéo à analyser',
    proFeature: 'Fonction Pro',
    proFeatureDesc: "L'analyse vidéo est une fonction Pro. Améliorez pour débloquer l'analyse IA de vos clips de football.",
    permissionRequired: 'Permission Requise',
    grantAccessMedia: 'Veuillez accorder l\'accès à votre bibliothèque multimédia pour télécharger des vidéos.',
    uploading: 'Téléchargement...',
    analyzing: 'Analyse...',
    coachAnalysis: 'Analyse du Coach',
    whatsWorking: 'Ce Qui Fonctionne',
    workOnThis: 'Travaillez Sur Ceci',
    performanceRatings: 'Évaluations de Performance',
    coachTips: 'Conseils du Coach',
    recommendedTraining: 'Entraînement Recommandé',
    tapToStartTraining: 'Appuyez pour commencer votre parcours d\'entraînement',
    startTrainingArrow: 'Démarrer entraînement →',
    yourAnalyses: 'Vos Analyses',
    whatWeAnalyze: 'Ce Que Nous Analysons',
    howItWorks: 'Comment Ça Marche',
    upload: 'Télécharger',
    improve: 'Améliorer',
    important: 'Important',
    uploadDesc: 'Enregistrez ou sélectionnez une vidéo de votre galerie (jusqu\'à 60 secondes)',
    analyzeDesc: 'Notre IA examine votre technique, mouvement et positionnement',
    improveDesc: 'Obtenez des conseils personnalisés et des exercices ajoutés à votre plan d\'entraînement',
    importantDesc: 'Ne téléchargez que des clips de football. Sinon, l\'IA peut fournir une analyse incorrecte.',
    unlockVideoAnalysis: 'Débloquer Analyse Vidéo',
    getAiFeedback: 'Obtenez des retours IA sur votre technique',
    analysisFailed: 'Analyse Échouée',
    tryAgain: 'Réessayer',
    uploadingVideo: 'Téléchargement vidéo...',
    processingFrames: 'Traitement des images...',
    aiAnalyzing: 'IA analyse la technique...',
    positioning: 'Positionnement',
    movement: 'Mouvement',
    dribblingMastery: 'Maîtrise du Dribble',
    shootingMastery: 'Maîtrise du Tir',
    passingMastery: 'Maîtrise de la Passe',
    speedTraining: 'Entraînement Vitesse',
    defensiveSkills: 'Compétences Défensives',
    fitnessProgram: 'Programme Fitness',
    
    // Auth
    welcomeBack: 'Bon Retour',
    signInContinue: 'Connectez-vous pour continuer votre entraînement',
    continueWithApple: 'Continuer avec Apple',
    continueWithGoogle: 'Continuer avec Google',
    moreOptions: "Plus d'options",
    email: 'Email',
    password: 'Mot de passe',
    signIn: 'Se Connecter',
    signUp: "S'inscrire",
    noAccount: "Vous n'avez pas de compte?",
    hasAccount: 'Vous avez déjà un compte?',
    backToSocial: 'Retour à la connexion sociale',
    enterEmail: 'votre@email.com',
    enterPassword: 'Entrez votre mot de passe',
    
    // Paywall
    unlockFullAccess: 'Débloquer Accès Complet',
    weeklyPlan: 'Hebdomadaire',
    monthlyPlan: 'Mensuel',
    yearlyPlan: 'Annuel',
    perWeek: '/semaine',
    perMonth: '/mois',
    perYear: '/an',
    mostPopular: 'Plus Populaire',
    bestValue: 'Meilleure Valeur',
    freeTrial: 'Essai gratuit de 3 jours',
    startFreeTrial: "Démarrer l'Essai Gratuit",
    
    // General
    error: 'Erreur',
    success: 'Succès',
    loading: 'Chargement...',
    retry: 'Réessayer',
    save: 'Enregistrer',
    next: 'Suivant',
    back: 'Retour',
    skip: 'Passer',
    getStarted: 'Commencer',
    letsGo: 'Allons-y',
    
    // Drill Session
    drillNotFound: 'Exercice non trouvé',
    goBack: 'Retour',
    drillComplete: 'Exercice Terminé!',
    time: 'Temps',
    steps: 'Étapes',
    progress: 'Progression',
    equipment: 'Équipement',
    pause: 'Pause',
    resume: 'Reprendre',
    start: 'Démarrer',
    
    // Paywall
    unlockYourPotential: 'Libérez Votre\nPlein Potentiel',
    trainLikePros: 'Entraînez-vous comme les pros avec un coaching IA avancé',
    aiVideoAnalysisFeature: 'Analyse Vidéo IA',
    getFeedbackTechnique: 'Obtenez des retours sur votre technique',
    advancedDrillsFeature: 'Exercices Avancés',
    proLevelPrograms: '+50 programmes de niveau professionnel',
    personalAiCoach: 'Coach IA Personnel',
    unlimitedCoaching: 'Sessions de coaching illimitées',
    prioritySupport: 'Support Prioritaire',
    getHelpNeeded: "Obtenez de l'aide quand vous en avez besoin",
    loadingPlans: 'Chargement des plans...',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    popular: 'Populaire',
    continueWith: 'Continuer avec',
    securePayment: 'Paiement sécurisé',
    cancelAnytime: "Annulez n'importe quand",
    subscriptionTerms: "En vous abonnant, vous acceptez nos Conditions d'Utilisation et notre Politique de Confidentialité. Les abonnements se renouvellent automatiquement jusqu'à annulation.",
    welcomeToPro: 'Bienvenue sur Pro! 🎉',
    accessAllFeatures: "Vous avez maintenant accès à toutes les fonctionnalités premium. Entraînons-nous comme des pros!",
    purchasesRestored: 'Achats Restaurés',
    proRestored: 'Votre abonnement Pro a été restauré.',
    noPurchasesFound: 'Aucun Achat Trouvé',
    noPreviousPurchases: "Nous n'avons pas pu trouver d'achats précédents à restaurer.",
    purchasesOnDevice: 'Achats Disponibles sur Appareil',
    purchasesOnlyDevice: "Les achats intégrés ne sont disponibles que sur un véritable appareil iOS ou Android avec l'App Store ou le Play Store.",
  },
};

export const [LanguageProvider, useLanguage] = createContextHook(() => {
  const [languageCode, setLanguageCode] = useState<LanguageCode>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && ['en', 'ar', 'es', 'fr'].includes(stored)) {
        setLanguageCode(stored as LanguageCode);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = useCallback(async (code: LanguageCode) => {
    try {
      setLanguageCode(code);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
      console.log('Language saved:', code);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  }, []);

  const currentLanguage = languages.find(l => l.code === languageCode) || languages[0];
  const t = translations[languageCode];
  const isRTL = currentLanguage.rtl;

  return {
    languageCode,
    currentLanguage,
    languages,
    setLanguage,
    t,
    isRTL,
    isLoading,
  };
});
