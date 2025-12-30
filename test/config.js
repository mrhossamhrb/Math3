// إعدادات التطبيق
const CONFIG = {
    // إعدادات التخزين
    STORAGE_KEYS: {
        HOMEWORK_DATA: 'homework_data',
        LOCK_STATUS: 'homework_lock',
        PROGRESS: 'homework_progress'
    },
    
    // إعدادات الوقت
    LOCK_DURATION: 7, // عدد الأيام لقفل الواجب بعد التسليم
    TIMER_DURATION: 30 * 60 * 1000, // 30 دقيقة للواجب
    
    // الإجابات الصحيحة
    ANSWERS: {
        q1: {
            a: "filtration",
            b: "evaporation"
        },
        q2: {
            a: "primary",
            b: "secondary"
        },
        q3: {
            a: "volume",
            b: "temperature"
        },
        q4: {
            keywords: ["depend", "food chain", "ecosystem", "interconnected"]
        },
        q5: "false",
        q6: {
            keywords: ["increases", "speed", "particles", "faster"]
        },
        q7: {
            keywords: ["decrease", "producers", "increase", "secondary consumers"]
        },
        q8: "b",
        table: {
            t1: ["fast", "increase", "high"],
            t2: ["slow", "decrease", "low"],
            t3: ["large", "increase", "wide"],
            t4: ["small", "decrease", "narrow"]
        }
    },
    
    // إعدادات التصحيح
    GRADING: {
        POINTS_PER_QUESTION: 1,
        TOTAL_QUESTIONS: 9,
        PASSING_SCORE: 5
    },
    
    // إعدادات الواجهة
    UI: {
        AUTO_SAVE_INTERVAL: 30000, // 30 ثانية
        SHOW_HINTS: true,
        ANIMATION_DURATION: 300,
        THEME: 'dark'
    }
};

// تصدير الإعدادات
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
