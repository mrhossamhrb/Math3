/**
 * الملف الرئيسي للتطبيق
 */

class HomeworkApp {
    constructor() {
        this.utils = utils;
        this.validator = validator;
        this.config = CONFIG;
        
        this.state = {
            studentName: '',
            className: '',
            startTime: Date.now(),
            isLocked: false,
            score: 0,
            answers: {},
            isSaved: false
        };
        
        this.initialize();
    }
    
    initialize() {
        this.setupEventListeners();
        this.loadProgress();
        this.updateProgress();
        this.startTimer();
        this.setupAutoSave();
        
        console.log('✅ التطبيق جاهز للاستخدام');
    }
    
    setupEventListeners() {
        // زر المعاينة
        document.getElementById('preview-btn').addEventListener('click', () => {
            this.previewAnswers();
        });
        
        // زر التصحيح
        document.getElementById('check-btn').addEventListener('click', () => {
            this.checkHomework();
        });
        
        // زر الحفظ
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveHomework();
        });
        
        // زر إعادة التعيين
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetHomework();
        });
        
        // استعلام الاسم
        document.getElementById('student-name').addEventListener('input', (e) => {
            this.state.studentName = e.target.value;
            this.updateProgress();
        });
        
        // استعلام الصف
        document.getElementById('student-class').addEventListener('change', (e) => {
            this.state.className = e.target.value;
            this.updateProgress();
        });
        
        // تتبع الإجابات
        this.setupAnswerTracking();
        
        // اختصار لوحة المفاتيح
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveHomework();
            }
            
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    setupAnswerTracking() {
        // تتبع جميع حقول الإدخال
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updateProgress();
            });
        });
    }
    
    setupAutoSave() {
        setInterval(() => {
            if (this.hasUnsavedChanges()) {
                this.saveProgress();
            }
        }, this.config.UI.AUTO_SAVE_INTERVAL);
    }
    
    hasUnsavedChanges() {
        const saved = this.utils.loadFromLocalStorage(this.config.STORAGE_KEYS.PROGRESS);
        if (!saved) return true;
        
        return JSON.stringify(this.getCurrentAnswers()) !== JSON.stringify(saved.answers);
    }
    
    getCurrentAnswers() {
        const answers = {};
        
        // سؤال 1
        answers.q1 = {
            a: document.getElementById('q1a').value,
            b: document.getElementById('q1b').value
        };
        
        // سؤال 2
        answers.q2 = {
            a: document.getElementById('q2').value,
            b: document.getElementById('q2b').value
        };
        
        // سؤال 3
        answers.q3 = {
            a: document.getElementById('q3a').value,
            b: document.getElementById('q3b').value
        };
        
        // سؤال 4
        answers.q4 = document.getElementById('q4').value;
        
        // سؤال 5
        const q5Selected = document.querySelector('input[name="q5"]:checked');
        answers.q5 = q5Selected ? q5Selected.value : null;
        
        // سؤال 6
        answers.q6 = document.getElementById('q6').value;
        
        // سؤال 7
        answers.q7 = document.getElementById('q7').value;
        
        // سؤال 8
        const q8Selected = document.querySelector('input[name="q8"]:checked');
        answers.q8 = q8Selected ? q8Selected.value : null;
        
        // الجدول
        answers.table = {
            t1: document.getElementById('t1').value,
            t2: document.getElementById('t2').value,
            t3: document.getElementById('t3').value,
            t4: document.getElementById('t4').value
        };
        
        return answers;
    }
    
    updateProgress() {
        const answers = this.getCurrentAnswers();
        const completion = this.validator.validateHomeworkCompletion(answers);
        
        // تحديث الإحصائيات
        document.getElementById('answered-questions').textContent = completion.answeredCount;
        document.getElementById('total-questions').textContent = completion.totalQuestions;
        document.getElementById('progress-percent').textContent = `${completion.percentage}%`;
        
        // تحديث شريط التقدم
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${completion.percentage}%`;
        }
        
        // حفظ التقدم
        this.saveProgress();
    }
    
    startTimer() {
        const timerElement = document.getElementById('timer');
        
        const updateTimer = () => {
            const timeInfo = this.validator.validateTimeRemaining(
                this.state.startTime,
                this.config.TIMER_DURATION
            );
            
            if (timeInfo.isExpired && !this.state.isLocked) {
                this.lockHomework();
                this.utils.showAlert('انتهى وقت الواجب!', 'warning');
            }
            
            const minutes = Math.floor(timeInfo.remaining / 60000);
            const seconds = Math.floor((timeInfo.remaining % 60000) / 1000);
            
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // تغيير اللون عند اقتراب الوقت
            if (minutes < 5) {
                timerElement.style.color = '#ef4444';
                timerElement.classList.add('pulse');
            } else if (minutes < 10) {
                timerElement.style.color = '#f59e0b';
            }
        };
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }
    
    previewAnswers() {
        const answers = this.getCurrentAnswers();
        
        // عرض الإجابات في مربعات نصية
        Object.keys(answers).forEach(questionId => {
            if (typeof answers[questionId] === 'object') {
                Object.keys(answers[questionId]).forEach(subId => {
                    const input = document.getElementById(questionId + (subId !== 'a' ? subId : ''));
                    if (input) {
                        input.classList.add('glow');
                        setTimeout(() => input.classList.remove('glow'), 1000);
                    }
                });
            }
        });
        
        this.utils.showAlert('تمت معاينة الإجابات', 'success');
    }
    
    checkHomework() {
        // التحقق من الاسم
        const nameValidation = this.validator.validateStudentName(this.state.studentName);
        if (!nameValidation.isValid) {
            this.utils.showAlert(nameValidation.message, 'error');
            document.getElementById('student-name').focus();
            this.utils.animateElement(document.getElementById('student-name'), 'shake');
            return;
        }
        
        // التحقق من اكتمال الواجب
        const answers = this.getCurrentAnswers();
        const completion = this.validator.validateHomeworkCompletion(answers);
        
        if (!completion.isComplete) {
            const confirmCheck = confirm(`لم تجب على ${completion.missingQuestions.length} سؤال. هل تريد المتابعة؟`);
            if (!confirmCheck) return;
        }
        
        // التصحيح
        this.gradeHomework();
        
        // عرض النتيجة
        this.showResults();
        
        this.utils.showAlert('تم تصحيح الواجب بنجاح!', 'success');
    }
    
    gradeHomework() {
        const answers = this.getCurrentAnswers();
        const gradingResults = {};
        
        // تصحيح سؤال 1
        const q1Result = this.validator.validateQuestion1(answers.q1.a, answers.q1.b);
        gradingResults.q1 = {
            ...q1Result,
            score: q1Result.isCorrect ? 1 : 0
        };
        
        // تصحيح سؤال 2
        const q2Text = `${answers.q2.a} ${answers.q2.b}`;
        const q2Result = this.validator.validateEssay('q2', q2Text);
        gradingResults.q2 = q2Result;
        
        // تصحيح سؤال 3
        const q3Text = `${answers.q3.a} ${answers.q3.b}`;
        const q3Result = this.validator.validateEssay('q3', q3Text);
        gradingResults.q3 = q3Result;
        
        // تصحيح سؤال 4
        const q4Result = this.validator.validateEssay('q4', answers.q4);
        gradingResults.q4 = q4Result;
        
        // تصحيح سؤال 5
        const q5Result = this.validator.validateTrueFalse(answers.q5, this.config.ANSWERS.q5);
        gradingResults.q5 = q5Result;
        
        // تصحيح سؤال 6
        const q6Result = this.validator.validateEssay('q6', answers.q6);
        gradingResults.q6 = q6Result;
        
        // تصحيح سؤال 7
        const q7Result = this.validator.validateEssay('q7', answers.q7);
        gradingResults.q7 = q7Result;
        
        // تصحيح سؤال 8
        const q8Result = this.validator.validateMultipleChoice(answers.q8, this.config.ANSWERS.q8);
        gradingResults.q8 = q8Result;
        
        // تصحيح الجدول
        const tableResult = this.validator.validateTable(answers.table);
        gradingResults.table = tableResult;
        
        // حساب الدرجة النهائية
        const finalScore = this.validator.calculateTotalScore(gradingResults);
        
        // حفظ النتيجة
        this.state.score = finalScore.totalScore;
        this.state.gradingResults = gradingResults;
        this.state.finalScore = finalScore;
        
        // عرض التغذية الراجعة
        this.showFeedback(gradingResults);
        
        return finalScore;
    }
    
    showFeedback(gradingResults) {
        // إظهار التغذية الراجعة لكل سؤال
        Object.keys(gradingResults).forEach(questionId => {
            const result = gradingResults[questionId];
            const feedbackElement = document.getElementById(`f${questionId.replace('q', '')}`) || 
                                   document.getElementById('fTable');
            
            if (feedbackElement) {
                feedbackElement.className = `question-feedback ${result.isCorrect ? 'correct' : 'incorrect'} show`;
                
                if (result.isCorrect) {
                    feedbackElement.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        إجابة صحيحة!
                        ${result.details ? '<br><small>تفاصيل: ' + JSON.stringify(result.details) + '</small>' : ''}
                    `;
                } else {
                    let hint = '';
                    if (result.keywords) {
                        hint = `<br><small>تلميح: ${result.keywords.join('، ')}</small>`;
                    }
                    
                    feedbackElement.innerHTML = `
                        <i class="fas fa-times-circle"></i>
                        إجابة غير صحيحة
                        ${hint}
                    `;
                }
            }
        });
    }
    
    showResults() {
        const resultInfo = document.getElementById('result-info');
        resultInfo.classList.add('show');
        
        // تحديث معلومات النتيجة
        document.getElementById('result-name').textContent = this.state.studentName || 'غير محدد';
        document.getElementById('result-score').textContent = `${this.state.score}/${this.config.GRADING.TOTAL_QUESTIONS}`;
        
        if (this.state.finalScore) {
            document.getElementById('result-percentage').textContent = `${this.state.finalScore.percentage}%`;
            
            // إضافة التقدير
            const percentageElement = document.getElementById('result-percentage');
            percentageElement.innerHTML += `<br><small>(${this.state.finalScore.grade})</small>`;
        }
    }
    
    async saveHomework() {
        try {
            this.utils.showLoading();
            
            // التحقق من الاسم
            const nameValidation = this.validator.validateStudentName(this.state.studentName);
            if (!nameValidation.isValid) {
                throw new Error(nameValidation.message);
            }
            
            // التحقق من اكتمال الواجب
            const answers = this.getCurrentAnswers();
            const completion = this.validator.validateHomeworkCompletion(answers);
            
            if (!completion.isComplete) {
                const confirmSave = confirm(`لم تجب على ${completion.missingQuestions.length} سؤال. هل تريد المتابعة والحفظ؟`);
                if (!confirmSave) {
                    this.utils.hideLoading();
                    return;
                }
            }
            
            // إذا لم يتم التصحيح بعد، قم بالتصحيح أولاً
            if (!this.state.finalScore) {
                this.gradeHomework();
                this.showResults();
            }
            
            // استبدال حقول الإدخال بنصوص
            this.replaceInputsWithText();
            
            // إنشاء الصورة
            const printArea = document.getElementById('print-area');
            const canvas = await html2canvas(printArea, {
                scale: 2,
                backgroundColor: '#1e293b',
                logging: false,
                useCORS: true
            });
            
            // استعادة حقول الإدخال
            this.restoreInputs();
            
            // إنشاء رابط التحميل
            const link = document.createElement('a');
            link.download = `الواجب_${this.state.studentName}_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // قفل الواجب
            this.lockHomework();
            
            // حفظ حالة القفل
            const lockData = {
                timestamp: Date.now(),
                studentName: this.state.studentName,
                score: this.state.score
            };
            
            this.utils.saveToLocalStorage(this.config.STORAGE_KEYS.LOCK_STATUS, lockData);
            
            this.utils.showAlert('تم حفظ الواجب كصورة بنجاح!', 'success');
            
        } catch (error) {
            console.error('Error saving homework:', error);
            this.utils.showAlert(`خطأ في الحفظ: ${error.message}`, 'error');
        } finally {
            this.utils.hideLoading();
        }
    }
    
    replaceInputsWithText() {
        // استبدال جميع حقول الإدخال بعناصر نصية
        document.querySelectorAll('input[type="text"], input[type="radio"]:checked, textarea').forEach(input => {
            if (input.type === 'radio') {
                // العثور على نص الخيار المحدد
                const label = input.closest('label');
                if (label) {
                    const textElement = document.createElement('span');
                    textElement.className = 'fake-answer';
                    textElement.textContent = label.textContent.trim();
                    textElement.dataset.for = input.name;
                    input.parentNode.insertBefore(textElement, input.nextSibling);
                    input.style.display = 'none';
                }
            } else {
                const textElement = document.createElement('span');
                textElement.className = input.classList.contains('inline-input') ? 
                    'fake-answer inline' : 'fake-answer';
                textElement.textContent = input.value || '................';
                textElement.dataset.for = input.id;
                input.parentNode.insertBefore(textElement, input.nextSibling);
                input.style.display = 'none';
            }
        });
    }
    
    restoreInputs() {
        // إزالة النصوص واستعادة حقول الإدخال
        document.querySelectorAll('.fake-answer').forEach(fake => {
            const inputId = fake.dataset.for;
            const input = document.getElementById(inputId) || 
                         document.querySelector(`input[name="${inputId}"]`);
            
            if (input) {
                input.style.display = '';
                fake.remove();
            }
        });
    }
    
    lockHomework() {
        this.state.isLocked = true;
        
        // تعطيل جميع الحقول
        document.querySelectorAll('input, textarea, button').forEach(element => {
            if (element.id !== 'reset-btn') {
                element.disabled = true;
            }
        });
        
        // تحديث زر الحفظ
        const saveBtn = document.getElementById('save-btn');
        saveBtn.innerHTML = '<i class="fas fa-lock"></i> تم تسليم الواجب';
        saveBtn.disabled = true;
        
        // إضافة فئة القفل
        document.querySelector('.homework-container').classList.add('locked');
        
        this.utils.showAlert('تم تسليم الواجب بنجاح!', 'info');
    }
    
    unlockHomework() {
        if (!this.state.isLocked) return;
        
        const lockData = this.utils.loadFromLocalStorage(this.config.STORAGE_KEYS.LOCK_STATUS);
        if (lockData) {
            const lockDuration = Date.now() - lockData.timestamp;
            const daysLocked = lockDuration / (1000 * 60 * 60 * 24);
            
            if (daysLocked >= this.config.LOCK_DURATION) {
                this.state.isLocked = false;
                this.utils.removeFromLocalStorage(this.config.STORAGE_KEYS.LOCK_STATUS);
                
                document.querySelectorAll('input, textarea, button').forEach(element => {
                    element.disabled = false;
                });
                
                const saveBtn = document.getElementById('save-btn');
                saveBtn.innerHTML = '<i class="fas fa-camera"></i> حفظ كصورة';
                saveBtn.disabled = false;
                
                document.querySelector('.homework-container').classList.remove('locked');
                
                this.utils.showAlert('يمكنك الآن تعديل الواجب', 'success');
            } else {
                const remainingDays = Math.ceil(this.config.LOCK_DURATION - daysLocked);
                this.utils.showAlert(`الواجب مقفل لمدة ${remainingDays} أيام أخرى`, 'warning');
            }
        }
    }
    
    resetHomework() {
        const confirmReset = confirm('هل أنت متأكد من أنك تريد مسح جميع الإجابات والبدء من جديد؟');
        
        if (confirmReset) {
            // مسح جميع الحقول
            document.querySelectorAll('input, textarea').forEach(element => {
                if (element.type === 'text' || element.type === 'textarea') {
                    element.value = '';
                } else if (element.type === 'radio' || element.type === 'checkbox') {
                    element.checked = false;
                }
            });
            
            // إخفاء النتائج والتغذية الراجعة
            document.getElementById('result-info').classList.remove('show');
            document.querySelectorAll('.question-feedback').forEach(feedback => {
                feedback.classList.remove('show', 'correct', 'incorrect');
                feedback.innerHTML = '';
            });
            
            // إعادة تعيين الحالة
            this.state.score = 0;
            this.state.answers = {};
            this.state.startTime = Date.now();
            this.state.isSaved = false;
            
            // تحديث التقدم
            this.updateProgress();
            
            // إلغاء القفل إذا كان مقفلاً
            if (this.state.isLocked) {
                this.unlockHomework();
            }
            
            this.utils.showAlert('تم مسح جميع الإجابات بنجاح', 'success');
        }
    }
    
    saveProgress() {
        const progress = {
            studentName: this.state.studentName,
            className: this.state.className,
            answers: this.getCurrentAnswers(),
            timestamp: Date.now(),
            score: this.state.score
        };
        
        this.utils.saveToLocalStorage(this.config.STORAGE_KEYS.PROGRESS, progress);
    }
    
    loadProgress() {
        const progress = this.utils.loadFromLocalStorage(this.config.STORAGE_KEYS.PROGRESS);
        const lockData = this.utils.loadFromLocalStorage(this.config.STORAGE_KEYS.LOCK_STATUS);
        
        if (progress) {
            // استعادة المعلومات الأساسية
            this.state.studentName = progress.studentName || '';
            this.state.className = progress.className || '';
            this.state.score = progress.score || 0;
            this.state.answers = progress.answers || {};
            
            // تعبئة الحقول
            if (progress.answers) {
                // سؤال 1
                if (progress.answers.q1) {
                    document.getElementById('q1a').value = progress.answers.q1.a || '';
                    document.getElementById('q1b').value = progress.answers.q1.b || '';
                }
                
                // سؤال 2
                if (progress.answers.q2) {
                    document.getElementById('q2').value = progress.answers.q2.a || '';
                    document.getElementById('q2b').value = progress.answers.q2.b || '';
                }
                
                // سؤال 3
                if (progress.answers.q3) {
                    document.getElementById('q3a').value = progress.answers.q3.a || '';
                    document.getElementById('q3b').value = progress.answers.q3.b || '';
                }
                
                // سؤال 4
                if (progress.answers.q4) {
                    document.getElementById('q4').value = progress.answers.q4 || '';
                }
                
                // سؤال 5
                if (progress.answers.q5) {
                    const q5Radio = document.querySelector(`input[name="q5"][value="${progress.answers.q5}"]`);
                    if (q5Radio) q5Radio.checked = true;
                }
                
                // سؤال 6
                if (progress.answers.q6) {
                    document.getElementById('q6').value = progress.answers.q6 || '';
                }
                
                // سؤال 7
                if (progress.answers.q7) {
                    document.getElementById('q7').value = progress.answers.q7 || '';
                }
                
                // سؤال 8
                if (progress.answers.q8) {
                    const q8Radio = document.querySelector(`input[name="q8"][value="${progress.answers.q8}"]`);
                    if (q8Radio) q8Radio.checked = true;
                }
                
                // الجدول
                if (progress.answers.table) {
                    document.getElementById('t1').value = progress.answers.table.t1 || '';
                    document.getElementById('t2').value = progress.answers.table.t2 || '';
                    document.getElementById('t3').value = progress.answers.table.t3 || '';
                    document.getElementById('t4').value = progress.answers.table.t4 || '';
                }
            }
            
            // تحديث اسم الطالب في الحقل
            document.getElementById('student-name').value = this.state.studentName;
            
            // تحديث الصف
            if (this.state.className) {
                document.getElementById('student-class').value = this.state.className;
            }
            
            this.utils.showAlert('تم استعادة التقدم السابق', 'info');
        }
        
        // التحقق من حالة القفل
        if (lockData) {
            const lockDuration = Date.now() - lockData.timestamp;
            const daysLocked = lockDuration / (1000 * 60 * 60 * 24);
            
            if (daysLocked < this.config.LOCK_DURATION) {
                this.state.isLocked = true;
                this.lockHomework();
            } else {
                this.utils.removeFromLocalStorage(this.config.STORAGE_KEYS.LOCK_STATUS);
            }
        }
    }
    
    closeAllModals() {
        // إغلاق جميع النوافذ المنبثقة والتنبيهات
        document.querySelectorAll('.alert').forEach(alert => alert.remove());
        this.utils.hideLoading();
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.homeworkApp = new HomeworkApp();
});

// إضافة أنماط إضافية
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .locked {
        opacity: 0.8;
        pointer-events: none;
    }
    
    .locked::after {
        content: 'تم التسليم';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 3rem;
        color: var(--primary-color);
        opacity: 0.5;
        pointer-events: none;
        z-index: 10;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    
    .fake-answer {
        display: inline-block;
        background: white;
        color: #1f2937;
        padding: 4px 8px;
        border-radius: 4px;
        margin: 0 4px;
        min-width: 100px;
        text-align: center;
        border: 1px dashed #64748b;
    }
    
    .fake-answer.inline {
        min-width: 150px;
    }
    
    @media (max-width: 768px) {
        .fake-answer {
            min-width: 80px;
        }
        
        .fake-answer.inline {
            min-width: 100px;
        }
    }
`;
document.head.appendChild(additionalStyles);

// تصدير للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomeworkApp;
}