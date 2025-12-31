// ============ بيانات الأسئلة ============
const questionsData = {
    multipleChoice: [{
        id: "q1", number: 1, question: "1.3 Weeks and two days = days", options: [
            { letter: "A", text: "A. 21" },
            { letter: "B", text: "B. 17" },
            { letter: "C", text: "C. 19" },
            { letter: "D", text: "D. 23" },], correctAnswer: "D", explanation: "D", points: 1
    }, {
        id: "q2", number: 2, question: "2. A square with side length S, what is its area?", options: [
            { letter: "A", text: "A. 4 + S" },
            { letter: "B", text: "B. 4 + S" },
            { letter: "C", text: "C. 4 × S" },
            { letter: "D", text: "D. S x S" },], correctAnswer: "D", explanation: "D", points: 1
    }, {
        id: "q3", number: 3, question: "3. = [3 + 7] × 3", options: [
            { letter: "A", text: "A. 6" },
            { letter: "B", text: "B. 5" },
            { letter: "C", text: "C. 30" },
            { letter: "D", text: "D. 1" },], correctAnswer: "C", explanation: "C", points: 1
    }, {
        id: "q4", number: 4, question: "4. The tape diagram in the opposite figure represents", options: [
            { letter: "A", text: "A. 40" },
            { letter: "B", text: "B. 5 - 5" },
            { letter: "C", text: "C. 5 × 5" },
            { letter: "D", text: "D. 5 + 5" },], correctAnswer: "C", explanation: "C", points: 1
    }, {
        id: "q5", number: 5, question: "5. The place value of the number 4 in the number 124,356,952 is", options: [
            { letter: "A", text: "A. Thousands." },
            { letter: "B", text: "B. Hundred thousands." },
            { letter: "C", text: "C. Millions." },
            { letter: "D", text: "D. Tens millions." },], correctAnswer: "C", explanation: "C", points: 1
    }, {
        id: "q6", number: 6, question: "6. The number 500 + 2,000 + 30,000 is written in the form.", options: [
            { letter: "A", text: "A. standard" },
            { letter: "B", text: "B. expanded" },
            { letter: "C", text: "C. verbal" },
            { letter: "D", text: "D. analytical" },], correctAnswer: "B", explanation: "B", points: 1
    }, {
        id: "q7", number: 7, question: "property. 7. All of the following are properties of addition operation except", options: [
            { letter: "A", text: "A. associative" },
            { letter: "B", text: "B. commutative" },
            { letter: "C", text: "C. estimation" },
            { letter: "D", text: "D. neutral element" },], correctAnswer: "C", explanation: "C", points: 1
    }, {
        id: "q8", number: 8, question: "8. Which of the following numbers is a prime number?", options: [
            { letter: "A", text: "A. 0" },
            { letter: "B", text: "B. 1" },
            { letter: "C", text: "C. 10" },
            { letter: "D", text: "D. 11" },], correctAnswer: "D", explanation: "D", points: 1
    }, {
        id: "q9", number: 9, question: "9. The number 12 is equal to 3 times the number", options: [
            { letter: "A", text: "A. 4" },
            { letter: "B", text: "B. 40" },
            { letter: "C", text: "C. 30" },
            { letter: "D", text: "D. 3" },], correctAnswer: "A", explanation: "A", points: 1
    },
        // ##############################################################
    ],
    // ##############################################################
    fillInBlank: [
        {
            id: "blank1",
            number: 3,
            question: "(2 × 1) × 3 = 2 × (1 × ",
            afterText: ")",
            correctAnswer: "3",
            explanation: "(2×1)×3 = 2×(1×3)",
            points: 1
        }
    ],
    completeSentences: [
        {
            id: "complete1",
            number: 4,
            type: "complete",
            question: "Property of multiplication that says (a × b) × c = a × (b × c) is called ",
            correctAnswers: ["associative property", "الخاصية التجميعية"],
            explanation: "The associative property of multiplication",
            points: 2,
            placeholder: "اكتب الإجابة هنا..."
        },
        {
            id: "complete2",
            number: 5,
            type: "complete",
            question: "The result of 5 × (2 × 3) is the same as (5 × 2) × ",
            correctAnswers: ["3"],
            explanation: "5 × (2 × 3) = (5 × 2) × 3",
            points: 2,
            placeholder: "أدخل الرقم..."
        },
        {
            id: "complete3",
            number: 6,
            type: "complete",
            question: "In the expression 4 × (7 × 2), if we use associative property it becomes (4 × ",
            afterText: ") × 2",
            correctAnswers: ["7"],
            explanation: "4 × (7 × 2) = (4 × 7) × 2",
            points: 2,
            placeholder: "أدخل الرقم..."
        }
            // ##############################################################
    ],
        // ##############################################################
fillInBlank: [
        {
            id: "blank1",
            number: 3,
            question: "(2 × 1) × 3 = 2 × (1 × ",
            afterText: ")",
            correctAnswer: "3",
            explanation: "(2×1)×3 = 2×(1×3)",
            points: 1
        }
    ],
    completeSentences: [
        {
            id: "complete1",
            number: 4,
            type: "simple", // نوع بسيط - فراغ واحد
            question: "Property of multiplication that says (a × b) × c = a × (b × c) is called ",
            correctAnswers: ["associative property", "الخاصية التجميعية"],
            explanation: "The associative property of multiplication",
            points: 2,
            placeholder: "اكتب الإجابة هنا..."
        },
        {
            id: "complete2",
            number: 5,
            type: "multi", // نوع متعدد الفراغات
            question: "In the expression: (",
            parts: [
                { text: " × 3) × 4 = 2 × (3 × ", inputId: "input1", correctAnswer: "2", placeholder: "?" },
                { text: ")", inputId: "input2", correctAnswer: "4", placeholder: "?" }
            ],
            explanation: "(2 × 3) × 4 = 2 × (3 × 4)",
            points: 3
        },
        {
            id: "complete3",
            number: 6,
            type: "multi",
            question: "Complete using associative property: ",
            parts: [
                { text: "5 × (", inputId: "input1", correctAnswer: "2", placeholder: "?" },
                { text: " × ", inputId: "input2", correctAnswer: "3", placeholder: "?" },
                { text: ") = (5 × ", inputId: "input3", correctAnswer: "2", placeholder: "?" },
                { text: ") × ", inputId: "input4", correctAnswer: "3", placeholder: "?" }
            ],
            explanation: "5 × (2 × 3) = (5 × 2) × 3",
            points: 4
        },
        {
            id: "complete4",
            number: 7,
            type: "multi",
            question: "Fill in the blanks: ",
            parts: [
                { text: "(", inputId: "input1", correctAnswer: "4", placeholder: "?" },
                { text: " + ", inputId: "input2", correctAnswer: "5", placeholder: "?" },
                { text: ") + ", inputId: "input3", correctAnswer: "6", placeholder: "?" },
                { text: " = 4 + (", inputId: "input4", correctAnswer: "5", placeholder: "?" },
                { text: " + ", inputId: "input5", correctAnswer: "6", placeholder: "?" },
                { text: ")", inputId: "input6", correctAnswer: "", placeholder: "" }
            ],
            explanation: "(4 + 5) + 6 = 4 + (5 + 6)",
            points: 6
        }
    ]
};



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

// إنشاء أسئلة "أكمل"
function generateCompleteQuestions() {
    const container = document.querySelector('.fill-question-group');
    if (!container) return;

    container.innerHTML = '<h3>Complete the Sentences (اكمل الجمل)</h3>';

    questionsData.completeSentences.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'complete-question';
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">${q.number}</span>
                <span class="question-points">[${q.points} نقطة]</span>
            </div>
            <div class="question-content">
                <span class="question-text">${q.question}</span>
                <input type="text" class="complete-input" 
                       id="${q.id}" 
                       placeholder="${q.placeholder || 'اكتب الإجابة...'}"
                       style="width: ${q.correctAnswers[0].length * 12 + 40}px">
                <span class="question-text">${q.afterText || ''}</span>
            </div>
            <div class="complete-feedback" id="fb-${q.id}"></div>
        `;
        container.appendChild(questionDiv);
    });
}

// تحديث شريط التقدم
// تحديث شريط التقدم
function updateProgress() {
    let totalInputs = 0;
    let filledInputs = 0;

    // حساب الأسئلة متعددة الخيارات
    questionsData.multipleChoice.forEach(q => {
        totalInputs++;
        if (document.querySelector(`input[name="${q.id}"]:checked`)) {
            filledInputs++;
        }
    });

    // حساب أسئلة ملء الفراغات
    questionsData.fillInBlank.forEach(q => {
        totalInputs++;
        const input = document.getElementById(q.id);
        if (input && input.value.trim() !== '') {
            filledInputs++;
        }
    });

    // حساب أسئلة "أكمل"
    questionsData.completeSentences.forEach(q => {
        if (q.type === "simple") {
            totalInputs++;
            const input = document.getElementById(q.id);
            if (input && input.value.trim() !== '') {
                filledInputs++;
            }
        } else if (q.type === "multi") {
            q.parts.forEach(part => {
                if (part.inputId) {
                    totalInputs++;
                    const input = document.getElementById(`${q.id}_${part.inputId}`);
                    if (input && input.value.trim() !== '') {
                        filledInputs++;
                    }
                }
            });
        }
    });

    const progress = Math.min(100, (filledInputs / totalInputs) * 100);
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}
// إضافة مستمعات الأحداث لتحديث التقدم
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('small-input') || 
        e.target.classList.contains('complete-input') || 
        e.target.classList.contains('multi-input') || 
        e.target.type === 'radio') {
        updateProgress();
    }
});

// تصحيح جميع الأسئلة
function gradeAllQuestions() {
    let totalScore = 0;
    let totalPoints = 0;

    // تصحيح أسئلة الاختيار من متعدد
    questionsData.multipleChoice.forEach(q => {
        totalPoints += q.points;
        const selectedOption = document.querySelector(`input[name="${q.id}"]:checked`);
        const feedbackDiv = document.getElementById(`fb-${q.id}`);

        if (selectedOption) {
            if (selectedOption.value === q.correctAnswer) {
                totalScore += q.points;
                const correctLabel = document.querySelector(`label[for="${q.id}_${q.correctAnswer.toLowerCase()}"]`);
                if (correctLabel) correctLabel.style.color = "#10b981";

                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<div style="color:#10b981;">✅ Correct! ${q.explanation}</div>`;
                }
            } else {
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
        totalPoints += q.points;
        const input = document.getElementById(q.id);
        const feedbackDiv = document.getElementById(`fb-${q.id}`);

        if (input) {
            const userAnswer = input.value.trim().toLowerCase();
            if (userAnswer === q.correctAnswer.toLowerCase()) {
                totalScore += q.points;
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

    // تصحيح أسئلة "أكمل"
    questionsData.completeSentences.forEach(q => {
        totalPoints += q.points;
        const input = document.getElementById(q.id);
        const feedbackDiv = document.getElementById(`fb-${q.id}`);

        if (input) {
            const userAnswer = input.value.trim().toLowerCase();
            let isCorrect = false;

            // التحقق من جميع الإجابات الصحيحة الممكنة
            for (const correctAnswer of q.correctAnswers) {
                if (userAnswer === correctAnswer.toLowerCase()) {
                    isCorrect = true;
                    break;
                }
            }

            if (isCorrect) {
                totalScore += q.points;
                input.classList.add('correct');
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `<div style="color:#10b981;">✅ Excellent! ${q.explanation}</div>`;
                }
            } else {
                input.classList.add('wrong');
                if (feedbackDiv) {
                    const correctAnswersText = q.correctAnswers.join(' أو ');
                    feedbackDiv.innerHTML = `<div style="color:#ef4444;">❌ Correct answer: ${correctAnswersText} - ${q.explanation}</div>`;
                }
            }
        }
    });

    return { totalScore, totalPoints };
}

// ============ التهيئة الرئيسية ============
document.addEventListener('DOMContentLoaded', function () {
    createStars();
    createBubbles();

    // إنشاء جميع أنواع الأسئلة
    generateMultipleChoiceQuestions();
    generateFillInBlankQuestions();
    generateCompleteQuestions();

    // إضافة مستمعات الأحداث لتحديث التقدم
    document.addEventListener('input', function (e) {
        if (e.target.classList.contains('small-input') ||
            e.target.classList.contains('complete-input') ||
            e.target.type === 'radio') {
            updateProgress();
        }
    });

    // تحديث أولي
    updateProgress();

    // تأثيرات إضافية
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('small-input') ||
            e.target.classList.contains('complete-input') ||
            e.target.type === 'checkbox' ||
            e.target.type === 'radio') {
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
    const { totalScore, totalPoints } = gradeAllQuestions();

    // تحديث المعلومات في الشهادة
    document.getElementById("imgName").textContent = name;
    document.getElementById("imgScore").textContent = `${totalScore} / ${totalPoints} points`;

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
                document.querySelectorAll('.small-input, .complete-input').forEach(input => {
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
                const percentage = Math.round((totalScore / totalPoints) * 100);
                let message = `🎉 Excellent work, ${name}! Your certificate has been saved!\n\nYour score: ${totalScore}/${totalPoints} points (${percentage}%)\n\n`;

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
// مثال لإضافة سؤال "أكمل" جديد:
/*
function addCompleteQuestion() {
    questionsData.completeSentences.push({
        id: "complete4",
        number: 7,
        type: "complete",
        question: "The commutative property says that a × b = ",
        afterText: " × a",
        correctAnswers: ["b"],
        explanation: "Commutative property: a × b = b × a",
        points: 2,
        placeholder: "أدخل الحرف..."
    });
    
    generateCompleteQuestions();
    updateProgress();
}
*/

// إنشاء أسئلة "أكمل"
function generateCompleteQuestions() {
    const container = document.querySelector('.fill-question-group');
    if (!container) return;

    container.innerHTML = '<h3>Complete the Sentences (اكمل الجمل)</h3>';

    questionsData.completeSentences.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'complete-question';
        
        if (q.type === "simple") {
            // نوع بسيط - فراغ واحد
            questionDiv.innerHTML = `
                <div class="question-header">
                    <span class="question-number">${q.number}</span>
                    <span class="question-points">[${q.points} نقطة]</span>
                </div>
                <div class="question-content">
                    <span class="question-text">${q.question}</span>
                    <input type="text" class="complete-input" 
                           id="${q.id}" 
                           placeholder="${q.placeholder || 'اكتب الإجابة...'}"
                           style="width: ${(q.correctAnswers[0]?.length || 10) * 12 + 40}px">
                </div>
                <div class="complete-feedback" id="fb-${q.id}"></div>
            `;
        } else if (q.type === "multi") {
            // نوع متعدد الفراغات
            questionDiv.innerHTML = `
                <div class="question-header">
                    <span class="question-number">${q.number}</span>
                    <span class="question-points">[${q.points} نقطة]</span>
                </div>
                <div class="multi-question-content">
                    <span class="question-text">${q.question}</span>
                    ${q.parts.map((part, index) => `
                        ${part.text ? `<span class="question-text">${part.text}</span>` : ''}
                        ${part.inputId ? `
                            <input type="text" 
                                   class="multi-input" 
                                   id="${q.id}_${part.inputId}" 
                                   placeholder="${part.placeholder}"
                                   style="width: ${(part.correctAnswer.length || 1) * 20 + 20}px"
                                   data-correct="${part.correctAnswer}">
                        ` : ''}
                    `).join('')}
                </div>
                <div class="complete-feedback" id="fb-${q.id}"></div>
            `;
        }
        
        container.appendChild(questionDiv);
    });
}
