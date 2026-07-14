(function safeAdBlocker() {
    'use strict';

    // Селекторы для поиска рекламы. Только самые простые и очевидные.
    const selectors = [
        '[id*="ad"]', '[class*="ad"]',
        '[id*="ads"]', '[class*="ads"]',
        '[id*="banner"]', '[class*="banner"]',
        '[id*="promo"]', '[class*="promo"]',
        'iframe[src*="ads."]', 'iframe[src*="//pagead2.googlesyndication.com"]'
    ];

    function hideAds() {
        let count = 0;
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    // ВАЖНО: Мы не удаляем элемент (remove), а скрываем его (display: none).
                    // Это сохраняет структуру страницы и не ломает верстку.
                    if (el.style.display !== 'none') {
                        el.style.display = 'none';
                        count++;
                    }
                });
            } catch (e) {
                // Если какой-то элемент недоступен (CORS, iframe), мы просто игнорируем ошибку
                console.warn('Не удалось обработать элемент:', e.message);
            }
        });

        if (count > 0) {
            console.log(✅ Скрыто рекламных блоков: ${count});
        } else {
            console.log('🔍 Рекламных блоков по простым правилам не найдено.');
        }
    }

    // 1. Запускаем сразу после загрузки скрипта
    hideAds();

    // 2. Ждем 3 секунды. Многие сайты подгружают рекламу чуть позже основного контента.
    setTimeout(hideAds, 3000);

    // 3. Следим за изменениями в DOM еще 10 секунд (на случай очень медленной рекламы)
    // После 10 сек наблюдатель отключается, чтобы не грузить браузер вечно.
    const observer = new MutationObserver(() => {
        hideAds();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    setTimeout(() => {
        observer.disconnect(); // Отключаем слежку через 10 секунд
        console.log('🛑 Слежка за рекламой остановлена.');
    }, 10000);

})();
