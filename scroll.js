function restoreScroll() {
  const selectors = [
    'body',
    'html',
    '.container',
    '.content',
    '[class*="scroll"]',
    'div'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      // Добавляем обработчики с passive: true — это разрешает стандартный скролл
      element.addEventListener('touchstart', () => {}, { passive: true });
      element.addEventListener('touchmove', () => {}, { passive: true });
      element.addEventListener('touchend', () => {}, { passive: true });
    });
  });

  // Дополнительно — убеждаемся, что overflow установлен корректно
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';

  console.log('Скролл полностью восстановлен!');
  alert('Скролл восстановлен! Попробуйте прокрутить страницу.');
}

// Запускаем восстановление
restoreScroll();
