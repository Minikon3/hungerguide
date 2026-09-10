// ========================================
// СТРАНИЦА ВСЕХ ПРЕДМЕТОВ
// ========================================

function renderItemsPage() {
    const allItems = getAllItemsWithCount();
    const total = allItems.length;
    const collected = allItems.filter(item => item.count >= item.needed).length;
    
    // Обновляем статистику
    document.getElementById('collectedStats').textContent = collected;
    document.getElementById('totalStats').textContent = total;
    
    const grid = document.getElementById('itemsGrid');
    grid.innerHTML = '';
    
    if (allItems.length === 0) {
        grid.innerHTML = `<div class="empty-message">Нет квестовых предметов</div>`;
        return;
    }
    
    // Группируем по НПС
    const grouped = {};
    allItems.forEach(item => {
        const key = item.npcName;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(item);
    });
    
    // Рендерим по группам
    Object.keys(grouped).forEach(npcName => {
        const npcItems = grouped[npcName];
        const npcEmoji = npcItems[0].npcEmoji;
        
        const groupTitle = document.createElement('div');
        groupTitle.className = 'group-title';
        groupTitle.textContent = `${npcEmoji} ${npcName}`;
        grid.appendChild(groupTitle);
        
        npcItems.forEach(item => {
            const isComplete = item.count >= item.needed;
            const card = document.createElement('div');
            card.className = `item-card ${isComplete ? 'complete' : ''}`;
            card.innerHTML = `
                <div class="item-info">
                    <span class="item-icon">${item.icon || '📦'}</span>
                    <div class="item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quest">${item.questTitle}</span>
                    </div>
                </div>
                <div class="item-controls">
                    <button class="item-btn minus" data-item="${item.name}">−</button>
                    <span class="item-count">${item.count}</span>
                    <span class="item-needed">/ ${item.needed}</span>
                    <button class="item-btn plus" data-item="${item.name}">+</button>
                </div>
            `;
            grid.appendChild(card);
        });
    });
    
    // Навешиваем обработчики
    grid.querySelectorAll('.item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemName = btn.dataset.item;
            const isPlus = btn.classList.contains('plus');
            
            if (isPlus) {
                incrementItem(itemName);
            } else {
                decrementItem(itemName);
            }
            
            renderItemsPage();
        });
    });
}

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Тема
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
        });
    }
    
    // Очистка всех предметов
    document.getElementById('clearItems').addEventListener('click', () => {
        if (confirm('Очистить все собранные предметы?')) {
            clearAllItems();
            renderItemsPage();
        }
    });
    
    renderItemsPage();
});