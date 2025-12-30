/**
 * التحقق من الإجابات والمدخلات
 */

class Validator {
    constructor(config) {
        this.config = config;
        this.utils = utils;
    }
    
    // التحقق من سؤال الفراغات
    validateQuestion1(a, b) {
        const normalizedA = this.utils.normalizeText(a);
        const normalizedB = this.utils.normalizeText(b);
        
        const correctA = this.config.ANSWERS.q1.a;
        const correctB = this.config.ANSWERS.q1.b;
        
        const isACorrect = this.utils.checkKeywords(normalizedA, correctA);
        const isBCorrect = this.utils.checkKeywords(normalizedB, correctB);
        
        return {
            isCorrect: isACorrect && isBCorrect,
            details: {
                a: { isCorrect: isACorrect, answer: correctA },
                b: { isCorrect: isBCorrect, answer: correctB }
            }
        };
    }
    
    // التحقق من الأسئلة المقالية
    validateEssay(questionId, answer) {
        const questionConfig = this.config.ANSWERS[questionId];
        
        if (!questionConfig || !questionConfig.keywords) {
            return { isCorrect: false, score: 0 };
        }
        
        const isCorrect = this.utils.checkKeywords(answer, questionConfig.keywords);
        
        return {
            isCorrect,
            score: isCorrect ? 1 : 0,
            keywords: questionConfig.keywords
        };
    }
    
    // التحقق من صح/خطأ
    validateTrueFalse(answer, correctAnswer) {
        return {
            isCorrect: answer === correctAnswer,
            score: answer === correctAnswer ? 1 : 0
        };
    }
    
    // التحقق من الاختيار من متعدد
    validateMultipleChoice(answer, correctAnswer) {
        return {
            isCorrect: answer === correctAnswer,
            score: answer === correctAnswer ? 1 : 0
        };
    }
    
    // التحقق من جدول المقارنة
    validateTable(answers) {
        const tableConfig = this.config.ANSWERS.table;
        let score = 0;
        const results = {};
        
        Object.keys(answers).forEach(key => {
            const answer = this.utils.normalizeText(answers[key]);
            const correctAnswers = tableConfig[key];
            
            const isCorrect = correctAnswers.some(correct => 
                this.utils.checkKeywords(answer, correct)
            );
            
            results[key] = {
                isCorrect,
                answer: answers[key],
                expected: correctAnswers.join(' أو ')
            };
            
            if (isCorrect) score += 0.25; // كل خلية ربع درجة
        });
        
        return {
            isComplete: score === 1,
            score: Math.round(score),
            details: results
        };
    }
    
    // التحقق من اسم الطالب
    validateStudentName(name) {
        if (!name || name.trim().length < 2) {
            return {
                isValid: false,
                message: 'الاسم يجب أن يكون على الأقل حرفين'
            };
        }
        
        if (name.length > 100) {
            return {
                isValid: false,
                message: 'الاسم طويل جداً'
            };
        }
        
        // التحقق من أن الاسم يحتوي على أحرف عربية/إنجليزية فقط
        const nameRegex = /^[\u0600-\u06FF\sA-Za-z]+$/;
        if (!nameRegex.test(name)) {
            return {
                isValid: false,
                message: 'الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'
            };
        }
        
        return {
            isValid: true,
            message: 'الاسم صالح'
        };
    }
    
    // التحقق من اكتمال الواجب
    validateHomeworkCompletion(answers) {
        const missingQuestions = [];
        let answeredCount = 0;
        
        Object.keys(answers).forEach(questionId => {
            const answer = answers[questionId];
            
            if (typeof answer === 'string') {
                if (answer.trim() === '') {
                    missingQuestions.push(questionId);
                } else {
                    answeredCount++;
                }
            } else if (Array.isArray(answer)) {
                if (answer.length === 0) {
                    missingQuestions.push(questionId);
                } else {
                    answeredCount++;
                }
            } else if (typeof answer === 'boolean' || answer === null || answer === undefined) {
                missingQuestions.push(questionId);
            } else {
                answeredCount++;
            }
        });
        
        const totalQuestions = this.config.GRADING.TOTAL_QUESTIONS;
        const percentage = this.utils.calculatePercentage(answeredCount, totalQuestions);
        
        return {
            isComplete: missingQuestions.length === 0,
            answeredCount,
            totalQuestions,
            percentage,
            missingQuestions
        };
    }
    
    // حساب الدرجة النهائية
    calculateTotalScore(gradingResults) {
        let totalScore = 0;
        const details = {};
        
        Object.keys(gradingResults).forEach(questionId => {
            const result = gradingResults[questionId];
            totalScore += result.score || 0;
            details[questionId] = result;
        });
        
        const percentage = this.utils.calculatePercentage(
            totalScore, 
            this.config.GRADING.TOTAL_QUESTIONS
        );
        
        const isPassing = totalScore >= this.config.GRADING.PASSING_SCORE;
        
        return {
            totalScore,
            maxScore: this.config.GRADING.TOTAL_QUESTIONS,
            percentage,
            isPassing,
            grade: this.getGrade(percentage),
            details
        };
    }
    
    // تحديد التقدير
    getGrade(percentage) {
        if (percentage >= 90) return 'ممتاز';
        if (percentage >= 80) return 'جيد جداً';
        if (percentage >= 70) return 'جيد';
        if (percentage >= 60) return 'مقبول';
        return 'راسب';
    }
    
    // التحقق من وقت الواجب
    validateTimeRemaining(startTime, duration) {
        const now = Date.now();
        const elapsed = now - startTime;
        const remaining = duration - elapsed;
        
        return {
            isExpired: remaining <= 0,
            remaining: Math.max(0, remaining),
            elapsed,
            percentage: this.utils.calculatePercentage(elapsed, duration)
        };
    }
}

// إنشاء نسخة عامة من المدقق
const validator = new Validator(CONFIG);

// تصدير للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validator;
}