// Основной JavaScript файл для интерактивности

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Учитываем высоту шапки
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления карточек при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к карточкам
    const componentCards = document.querySelectorAll('.component-card');
    const guideCards = document.querySelectorAll('.guide-card');

    componentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    guideCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Обработчики для кнопок гайдов
    const guideButtons = document.querySelectorAll('.guide-btn');
    
    guideButtons.forEach(button => {
        button.addEventListener('click', function() {
            const guideTitle = this.closest('.guide-card').querySelector('h3').textContent;
            alert(`Гайд "${guideTitle}" находится в разработке! Скоро будет доступен.`);
        });
    });

    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${currentYear} PC Components Guide. Все права защищены.`;
    }

    // Добавляем интерактивность карточкам компонентов
    componentCards.forEach(card => {
        card.addEventListener('click', function() {
            const componentType = this.getAttribute('data-component');
            const componentName = this.querySelector('h3').textContent;
            
            // Можно добавить модальное окно с детальной информацией
            console.log(`Выбрано: ${componentName} (${componentType})`);
            
            // Временное уведомление
            showNotification(`Подробная информация о ${componentName}`);
        });
    });

    // Функция показа уведомлений
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Добавляем кнопку "Наверх"
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });

    // Обработчик клика для кнопки "Наверх"
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Добавляем hover-эффект для строк таблицы
    const tableRows = document.querySelectorAll('.comparison-table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

// Дополнительные функции для будущего расширения
const PCGuide = {
    // Функция для фильтрации компонентов
    filterComponents: function(category) {
        console.log(`Фильтрация по категории: ${category}`);
        // Здесь можно добавить логику фильтрации
    },
    
    // Функция для поиска
    searchComponents: function(query) {
        console.log(`Поиск: ${query}`);
        // Здесь можно добавить логику поиска
    },
    
    // Функция для сравнения компонентов
    compareComponents: function(component1, component2) {
        console.log(`Сравнение: ${component1} vs ${component2}`);
        // Здесь можно добавить логику сравнения
    }
};

// Экспортируем объект для глобального использования
window.PCGuide = PCGuide;