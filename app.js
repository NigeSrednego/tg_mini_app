// Telegram Mini App — корректное открытие и адаптация
(function () {
  const tg = window.Telegram?.WebApp;
  try {
    tg?.ready();
    tg?.expand(); // на десктопе уже maximum, но на мобиле развернёт
  } catch (_) {}
})();

// Переключение вкладок
const tabButtons = document.querySelectorAll('.tab-btn');
const tabs = document.querySelectorAll('.tab-content');
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-tab');
    tabButtons.forEach(b => b.classList.toggle('active', b === btn));
    tabs.forEach(t => t.classList.toggle('active', t.id === id));
  });
});

// Хук поиска
const input = document.getElementById('q');
const btnSearch = document.getElementById('btnSearch');
function runSearch(){
  const q = input.value.trim();
  if(!q) return;
  // TODO: сюда подключишь реальный поиск
  console.log('Search:', q);
}
btnSearch.addEventListener('click', runSearch);
input.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') runSearch();
});
