/**
 * أدوات مساعدة للتطبيق
 */

class Utils {
    constructor() {
        this.initialize();
    }
    
    initialize() {
        this.setupDateTime();
        this.setupEventListeners();
    }
    
    setupDateTime() {
        // تحديث التاريخ والوقت
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 1000);
    }
    
    updateDateTime() {
        const now = new Date();
        
        // التاريخ الهجري
        const hijriDate = this.toHijri(now);
        document.getElementById('current-date').textContent = hijriDate;
        
        // الوقت
        const time = now.toLocaleTimeString('ar-EG');
        document.getElementById('current-time').textContent = time;
        
        // تحديث التاريخ في النتيجة
        const resultDate = now.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('result-date').textContent = resultDate;
    }
    
    toHijri(date) {
        // تحويل تاريخ ميلادي إلى هجري (تبسيطي)
        const hijriMonths = [
            'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
            'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
            'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
        ];
        
        const day = date.getDate();
        const month = hijriMonths[date.getMonth()];
        const year = 1445 + Math.floor((date.getFullYear() - 2023) * 0.97);
        
        return `${day} ${month} ${year} هـ`;
    }
    
    setupEventListeners() {
        // إغلاق التنبيهات
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('alert-close')) {
                e.target.closest('.alert').remove();
            }
        });
    }
    
    showAlert(message, type = 'info', duration = 5000) {
        const container = document.getElementById('alert-container');
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.setAttribute('role', 'alert');
        alert.setAttribute('aria-live', 'assertive');
        
        alert.innerHTML = `
            <span class="alert-message">${message}</span>
            <button class="alert-close" aria-label="إغلاق التنبيه">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(alert);
        
        // إزالة التنبيه تلقائياً
        if (duration > 0) {
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, duration);
        }
        
        // التركيز على التنبيه
        alert.focus();
        
        return alert;
    }
    
    showLoading() {
        document.getElementById('loading').classList.add('active');
    }
    
    hideLoading() {
        document.getElementById('loading').classList.remove('active');
    }
    
    normalizeText(text) {
        if (!text) return '';
        
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // إزالة التشكيل
            .replace(/[.,!?;:()]/g, '') // إزالة علامات الترقيم
            .replace(/\s+/g, ' ') // استبدال المسافات المتعددة
            .trim();
    }
    
    checkKeywords(text, keywords) {
        const normalized = this.normalizeText(text);
        
        if (Array.isArray(keywords)) {
            return keywords.some(keyword => {
                if (Array.isArray(keyword)) {
                    // مجموعة من الكلمات المطلوبة معاً
                    return keyword.every(k => normalized.includes(k));
                }
                // كلمة واحدة
                return normalized.includes(keyword);
            });
        }
        
        return normalized.includes(keywords);
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    validatePhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
    
    formatNumber(number) {
        return new Intl.NumberFormat('ar-EG').format(number);
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // طريقة بديلة للمتصفحات القديمة
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                }
                
                document.body.removeChild(textArea);
            }
        });
    }
    
    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }
    
    loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }
    
    removeFromLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
    
    calculatePercentage(value, total) {
        if (total === 0) return 0;
        return Math.round((value / total) * 100);
    }
    
    animateElement(element, animation) {
        element.classList.add(animation);
        element.addEventListener('animationend', () => {
            element.classList.remove(animation);
        }, { once: true });
    }
    
    scrollToElement(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// إنشاء نسخة عامة من الأدوات
const utils = new Utils();

// تصدير للاستخدام في الملفات الأخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}