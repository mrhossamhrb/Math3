
// ============ وظائف المساعدة ============
// إنشاء نجوم زينة
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;

    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 20 + 6;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = Math.random() * 2 + 3 + 's';
        starsContainer.appendChild(star);
    }
}

// إنشاء فقاعات زينة
function createBubbles() {
    const bubblesContainer = document.getElementById('bubblesContainer');
    if (!bubblesContainer) return;

    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 60 + 30;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDuration = Math.random() * 15 + 20 + 's';
        bubble.style.animationDelay = Math.random() * 8 + 's';
        bubblesContainer.appendChild(bubble);
    }
}

// إنشاء أسئلة الاختيار من متعدد
function generateMultipleChoiceQuestions() {
    const container = document.querySelector('.circle-question');
    if (!container) return;

    // تنظيف المحتوى القديم وإضافة العنوان
    container.innerHTML = '<h3>Choose ONE correct answer</h3>';

    questionsData.multipleChoice.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.innerHTML = `
            <div class="circle-header">
                <span class="circle-number">${q.number}</span>
                <div class="circle-main-expression">${q.question}</div>
            </div>
            <div class="circle-options">
                ${q.options.map(opt => `
                    <div class="circle-option">
                        <input type="radio" id="${q.id}_${opt.letter.toLowerCase()}" 
                               name="${q.id}" value="${opt.letter}">
                        <label for="${q.id}_${opt.letter.toLowerCase()}">
                            <span class="option-letter">${opt.letter}</span>
                            <span class="option-expression">${opt.letter}. ${opt.text}</span>
                        </label>
                    </div>
                `).join('')}
            </div>
            <div class="circle-feedback" id="fb-${q.id}"></div>
        `;
        container.appendChild(questionDiv);
    });
}

// إنشاء أسئلة ملء الفراغات
function generateFillInBlankQuestions() {
    const container = document.querySelector('.question-group');
    if (!container) return;

    container.innerHTML = '<h3>Multiplication Questions (×)</h3>';

    questionsData.fillInBlank.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'math-question';
        questionDiv.innerHTML = `
            <div class="question-line">
                <span class="question-number">${q.number}</span>
                <span class="question-text">${q.question}</span>
                <input type="text" class="small-input" id="${q.id}" placeholder="?">
                <span class="question-text">${q.afterText || ''}</span>
            </div>
            <div class="blank-feedback" id="fb-${q.id}"></div>
        `;
        container.appendChild(questionDiv);
    });
}

// تحديث شريط التقدم
function updateProgress() {
    const totalQuestions = questionsData.multipleChoice.length + questionsData.fillInBlank.length;
    let answeredCount = 0;

    // حساب الأسئلة متعددة الخيارات
    questionsData.multipleChoice.forEach(q => {
        if (document.querySelector(`input[name="${q.id}"]:checked`)) {
            answeredCount++;
        }
    });

    // حساب أسئلة ملء الفراغات
    questionsData.fillInBlank.forEach(q => {
        const input = document.getElementById(q.id);
        if (input && input.value.trim() !== '') {
            answeredCount++;
        }
    });

    const progress = Math.min(100, (answeredCount / totalQuestions) * 100);
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// تصحيح جميع الأسئلة
function gradeAllQuestions() {
    let totalScore = 0;
    const totalQuestions = questionsData.multipleChoice.length + questionsData.fillInBlank.length;

    // تصحيح أسئلة الاختيار من متعدد
    questionsData.multipleChoice.forEach(q => {
        const selectedOption = document.querySelector(`input[name="${q.id}"]:checked`);
        const feedbackDiv = document.getElementById(`fb-${q.id}`);
        
        if (selectedOption) {
            if (selectedOption.value === q.correctAnswer) {
                totalScore++;
                // تلوين الإجابة الصحيحة
                const correctLabel = document.querySelector(`label[for="${q.id}_${q.correctAnswer.toLowerCase()}"]`);
                if (correctLabel) correctLabel.style.color = "#10b981";
                
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<div style="color:#10b981;">✅ Correct! ${q.explanation}</div>`;
                }
            } else {
                // تلوين الإجابة الخاطئة
                selectedOption.parentElement.classList.add('wrong-checkbox');
                const correctLabel = document.querySelector(`label[for="${q.id}_${q.correctAnswer.toLowerCase()}"]`);
                if (correctLabel) correctLabel.style.color = "#10b981";
                
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<div style="color:#ef4444;">❌ The correct answer is "${q.correctAnswer}" - ${q.explanation}</div>`;
                }
            }
        } else if (feedbackDiv) {
            feedbackDiv.innerHTML = `<div style="color:#ef4444;">❌ Please select an answer</div>`;
        }
    });

    // تصحيح أسئلة ملء الفراغات
    questionsData.fillInBlank.forEach(q => {
        const input = document.getElementById(q.id);
        const feedbackDiv = document.getElementById(`fb-${q.id}`);
        
        if (input) {
            const userAnswer = input.value.trim();
            if (userAnswer === q.correctAnswer) {
                totalScore++;
                input.classList.add('correct');
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<div style="color:#10b981;">✅ Correct! ${q.explanation}</div>`;
                }
            } else {
                input.classList.add('wrong');
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<div style="color:#ef4444;">❌ The correct answer is "${q.correctAnswer}" - ${q.explanation}</div>`;
                }
            }
        }
    });

    return { totalScore, totalQuestions };
}

// ============ التهيئة الرئيسية ============
document.addEventListener('DOMContentLoaded', function () {
    createStars();
    createBubbles();
    
    // إنشاء الأسئلة ديناميكياً
    generateMultipleChoiceQuestions();
    generateFillInBlankQuestions();

    // إضافة مستمعات الأحداث لتحديث التقدم
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('small-input') || e.target.type === 'radio') {
            updateProgress();
        }
    });

    // تحديث أولي
    updateProgress();

    // تأثيرات إضافية
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('small-input') || e.target.type === 'checkbox' || e.target.type === 'radio') {
            e.target.classList.add('celebrate');
            setTimeout(() => {
                e.target.classList.remove('celebrate');
            }, 300);
        }
    });

    // تأثير عند تحميل الصفحة
    document.body.classList.add('celebrate');
    setTimeout(() => {
        document.body.classList.remove('celebrate');
    }, 800);
});

// ============ التحكم في التخزين ============
const LOCK_DAYS = 0;
const STORAGE_KEY = "math_homework_locked";

// التحقق من حالة القفل عند التحميل
window.onload = function () {
    const lockData = localStorage.getItem(STORAGE_KEY);
    if (lockData) {
        const savedTime = parseInt(lockData, 10);
        const now = Date.now();
        const diffDays = (now - savedTime) / (1000 * 60 * 60 * 24);
        if (diffDays < LOCK_DAYS) {
            lockHomework();
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
};

function lockHomework() {
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = "✅ HOMEWORK SUBMITTED! 🎉";
        saveBtn.classList.add('celebrate');
    }
    document.querySelectorAll("input").forEach(el => el.disabled = true);
}

// ============ الوظيفة الرئيسية لحفظ الشهادة ============
function generateImage() {
    const saveBtn = document.getElementById("saveBtn");
    if (saveBtn && saveBtn.disabled) return;

    const name = document.getElementById("studentName").value.trim();
    if (!name) {
        alert("🌟 Please enter your name first, Mathematician!");
        document.getElementById("studentName").focus();
        return;
    }

    // تصحيح جميع الأسئلة
    const { totalScore, totalQuestions } = gradeAllQuestions();

    // تحديث المعلومات في الشهادة
    document.getElementById("imgName").textContent = name;
    document.getElementById("imgScore").textContent = `${totalScore} / ${totalQuestions}`;

    const now = new Date();
    const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    document.getElementById("imgDate").textContent = `${dateStr} at ${timeStr}`;

    // إظهار التصحيح
    const area = document.getElementById("printArea");
    area.classList.add("show-correction");

    document.getElementById('loading').style.display = 'block';
    if (saveBtn) saveBtn.style.display = 'none';
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.style.display = 'none';

    // تحريك الصفحة للأعلى
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        html2canvas(area, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#1e293b',
            letterRendering: true,
            allowTaint: true,
            logging: false,
            windowWidth: area.scrollWidth,
            windowHeight: area.scrollHeight
        }).then(canvas => {
            const link = document.createElement("a");
            link.download = `Math_Homework_${name.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();

            // إخفاء التصحيح
            setTimeout(() => {
                area.classList.remove("show-correction");
                document.getElementById('loading').style.display = 'none';
                if (saveBtn) saveBtn.style.display = 'block';
                if (backBtn) backBtn.style.display = 'inline-block';

                // إعادة تعيين الألوان
                document.querySelectorAll('.small-input').forEach(input => {
                    input.classList.remove('correct', 'wrong');
                });

                document.querySelectorAll('.circle-option').forEach(option => {
                    option.classList.remove('wrong-checkbox');
                });

                document.querySelectorAll('label').forEach(label => {
                    label.style.color = '';
                });

                // حفظ وقت الإرسال
                localStorage.setItem(STORAGE_KEY, Date.now());
                lockHomework();

                // رسالة نجاح
                const percentage = Math.round((totalScore / totalQuestions) * 100);
                let message = `🎉 Excellent work, ${name}! Your certificate has been saved!\n\nYour score: ${totalScore}/${totalQuestions} (${percentage}%)\n\n`;

                if (percentage === 100) {
                    message += "Perfect score! You're a math genius! 🧠";
                } else if (percentage >= 80) {
                    message += "Great job! You understand the concepts well! 👍";
                } else if (percentage >= 60) {
                    message += "Good effort! Keep practicing to master the material! 📚";
                } else {
                    message += "Keep practicing! You'll get better with more practice. Don't give up! 💪";
                }

                alert(message);
            }, 500);

        }).catch(error => {
            console.error("Error creating image:", error);
            area.classList.remove("show-correction");
            document.getElementById('loading').style.display = 'none';
            if (saveBtn) saveBtn.style.display = 'block';
            if (backBtn) backBtn.style.display = 'inline-block';

            alert("⚠️ Oops! There was an error saving your certificate. Please try again!");
        });
    }, 1000);
}

// ============ إضافة أسئلة جديدة بسهولة ============
// يمكنك إضافة أسئلة جديدة هنا:
/*
function addMoreQuestions() {
    // أسئلة اختيار من متعدد
    questionsData.multipleChoice.push({
        id: "q3",
        number: 3,
        question: "What is 5 × 6?",
        options: [
            { letter: "A", text: "25" },
            { letter: "B", text: "30" },
            { letter: "C", text: "35" },
            { letter: "D", text: "40" }
        ],
        correctAnswer: "B",
        explanation: "5 multiplied by 6 equals 30"
    });

    // أسئلة ملء فراغ
    questionsData.fillInBlank.push({
        id: "blank5",
        number: 4,
        question: "7 × 8 = ",
        afterText: "",
        correctAnswer: "56",
        explanation: "7 times 8 equals 56"
    });

    // إعادة توليد الأسئلة
    generateMultipleChoiceQuestions();
    generateFillInBlankQuestions();
    updateProgress();
}
*/
