// ========================================
// ОСНОВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ
// ========================================

// Состояние приложения
const state = {
    selectedNpcs: getSelectedNpcs(),
    statusFilter: 'all',
    searchQuery: '',
    sortBy: 'default',
    theme: localStorage.getItem('theme') || 'dark'
};

// DOM-элементы
const elements = {
    npcGrid: document.getElementById('npcGrid'),
    questList: document.getElementById('questList'),
    questTitle: document.getElementById('questTitle'),
    npcSubtitle: document.getElementById('npcSubtitle'),
    statusFilter: document.getElementById('statusFilter'),
    searchFilter: document.getElementById('searchFilter'),
    sortFilter: document.getElementById('sortFilter'),
    themeToggle: document.getElementById('themeToggle'),
    completedCount: document.getElementById('completedCount'),
    totalCount: document.getElementById('totalCount'),
    clearCompleted: document.getElementById('clearCompleted'),
};

// ========================================
// ТЕМА
// ========================================
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    elements.themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
    state.theme = theme;
}

function toggleTheme() {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// ========================================
// ОТРИСОВКА НПС
// ========================================
function renderNpcs() {
    const allQuests = getAllQuests();
    const completed = getCompletedQuests();
    
    elements.npcGrid.innerHTML = '';
    
    NPC_DATA.forEach(npc => {
        const npcQuests = npc.quests;
        const total = npcQuests.length;
        const done = npcQuests.filter(q => completed[q.id]).length;
        const isSelected = state.selectedNpcs.includes(npc.id);
        
        const card = document.createElement('div');
        card.className = `npc-card ${isSelected ? 'active' : ''}`;
        card.innerHTML = `
            <span class="npc-avatar">${npc.emoji}</span>
            <div class="npc-name">${npc.name}</div>
            <div class="npc-faction">${npc.faction || 'NPC'}</div>
            <div class="npc-count">${done}/${total} ${isSelected ? '✅' : ''}</div>
        `;
        card.addEventListener('click', () => {
            const index = state.selectedNpcs.indexOf(npc.id);
            if (index === -1) {
                state.selectedNpcs.push(npc.id);
            } else {
                state.selectedNpcs.splice(index, 1);
            }
            saveSelectedNpcs(state.selectedNpcs);
            renderNpcs();
            renderQuests();
            updateStats();
        });
        elements.npcGrid.appendChild(card);
    });
}

// ========================================
// ФИЛЬТРАЦИЯ И СОРТИРОВКА КВЕСТОВ
// ========================================
function filterAndSortQuests(quests) {
    let filtered = [...quests];
    
    const completed = getCompletedQuests();
    if (state.statusFilter === 'active') {
        filtered = filtered.filter(q => !completed[q.id]);
    } else if (state.statusFilter === 'completed') {
        filtered = filtered.filter(q => completed[q.id]);
    }
    
    if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(q => 
            q.title.toLowerCase().includes(query) || 
            q.description.toLowerCase().includes(query)
        );
    }
    
    switch (state.sortBy) {
        case 'default':
            break;
        case 'name':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'npc':
            filtered.sort((a, b) => a.npcName.localeCompare(b.npcName));
            break;
        case 'status':
            filtered.sort((a, b) => {
                const aDone = completed[a.id] ? 1 : 0;
                const bDone = completed[b.id] ? 1 : 0;
                return aDone - bDone;
            });
            break;
    }
    
    return filtered;
}

// ========================================
// ПОЛУЧЕНИЕ URL ДЛЯ КВЕСТА
// ========================================
function getQuestUrl(quest) {
    return quest.page;
}

// ========================================
// ПРОВЕРКА СОБРАНЫ ЛИ ВСЕ ПРЕДМЕТЫ ДЛЯ КВЕСТА
// ========================================
function areAllItemsCollected(questId) {
    const questItems = getQuestItems(questId);
    if (!questItems || questItems.length === 0) return true;
    const stored = getStoredItems();
    return questItems.every(item => {
        const key = getItemUniqueKey(questId, item.name);
        return (stored[key] || 0) >= item.needed;
    });
}

// ========================================
// ОТРИСОВКА КВЕСТОВ
// ========================================
function renderQuests() {
    if (state.selectedNpcs.length === 0) {
        elements.npcSubtitle.textContent = '— выберите НПС';
        elements.questList.innerHTML = `
            <div class="empty-message">👆 Выберите одного или нескольких персонажей слева</div>
        `;
        return;
    }
    
    let allQuests = [];
    state.selectedNpcs.forEach(npcId => {
        const npc = getNpcById(npcId);
        if (npc) {
            const questsWithNpc = npc.quests.map(q => ({
                ...q,
                npcId: npc.id,
                npcName: npc.name,
                npcEmoji: npc.emoji
            }));
            allQuests = allQuests.concat(questsWithNpc);
        }
    });
    
    const filteredQuests = filterAndSortQuests(allQuests);
    
    const npcNames = state.selectedNpcs.map(id => {
        const npc = getNpcById(id);
        return npc ? npc.name : '';
    }).filter(Boolean).join(', ');
    
    elements.npcSubtitle.textContent = `— ${npcNames} (${filteredQuests.length} квестов)`;
    
    const completed = getCompletedQuests();
    const storedItems = getStoredItems();
    
    if (filteredQuests.length === 0) {
        elements.questList.innerHTML = `<div class="empty-message">Квестов не найдено</div>`;
        return;
    }
    
    elements.questList.innerHTML = '';
    
    filteredQuests.forEach(quest => {
        const isCompleted = !!completed[quest.id];
        const hasItems = quest.items && quest.items.length > 0;
        const itemsComplete = areAllItemsCollected(quest.id);
        
        // Проверяем, можно ли отметить квест выполненным
        const canComplete = !hasItems || itemsComplete;
        
        let itemsHtml = '';
        if (hasItems) {
            const itemStrings = quest.items.map(item => {
                const key = getItemUniqueKey(quest.id, item.name);
                const count = storedItems[key] || 0;
                const isDone = count >= item.needed;
                return `${item.icon || '📦'} ${item.name}: ${count}/${item.needed}${isDone ? ' ✅' : ''}`;
            });
            itemsHtml = `<span class="q-items">${itemStrings.join(' · ')}</span>`;
        }
        
        const item = document.createElement('div');
        item.className = `quest-item ${isCompleted ? 'completed' : ''}`;
        
        // Статус-бейдж с учётом возможности отметить
        let statusBadge = '';
        if (isCompleted) {
            statusBadge = '<span class="q-status-badge completed">✅ Выполнен</span>';
        } else if (hasItems && !itemsComplete) {
            statusBadge = '<span class="q-status-badge blocked" style="background: #ff9800; color: #000;">⛔ Соберите предметы</span>';
        } else {
            statusBadge = '<span class="q-status-badge active">⏳ Активен</span>';
        }
        
        item.innerHTML = `
            <div class="quest-left">
                <input type="checkbox" class="quest-checkbox" 
                       ${isCompleted ? 'checked' : ''} 
                       ${!canComplete ? 'disabled' : ''}
                       data-quest-id="${quest.id}">
                <span class="q-name">${quest.title}</span>
                <span class="q-npc">${quest.npcEmoji} ${quest.npcName}</span>
            </div>
            <div class="quest-mid">
                <span class="q-description">${quest.description}</span>
                ${itemsHtml}
                ${hasItems && !itemsComplete && !isCompleted ? 
                    `<span class="q-hint" style="font-size: 12px; color: #ff9800;">⚠️ Соберите все предметы для отметки</span>` : 
                    ''}
            </div>
            ${statusBadge}
        `;
        
        const checkbox = item.querySelector('.quest-checkbox');
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            // Если чекбокс disabled — ничего не делаем
            if (checkbox.disabled) return;
            
            const isChecked = e.target.checked;
            saveQuestStatus(quest.id, isChecked);
            renderQuests();
            renderNpcs();
            updateStats();
        });
        
        // КНОПКИ + и -
        if (hasItems) {
            quest.items.forEach(qItem => {
                const controls = document.createElement('div');
                controls.className = 'quest-item-control';
                const key = getItemUniqueKey(quest.id, qItem.name);
                const count = storedItems[key] || 0;
                const isDone = count >= qItem.needed;
                
                controls.innerHTML = `
                    <span class="item-icon">${qItem.icon || '📦'}</span>
                    <span class="item-name-small">${qItem.name}</span>
                    <button class="item-btn minus" data-quest="${quest.id}" data-item="${qItem.name}">−</button>
                    <span class="item-count-small ${isDone ? 'done' : ''}">${count}/${qItem.needed}</span>
                    <button class="item-btn plus" data-quest="${quest.id}" data-item="${qItem.name}">+</button>
                `;
                
                controls.querySelectorAll('.item-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const questId = btn.dataset.quest;
                        const itemName = btn.dataset.item;
                        const isPlus = btn.classList.contains('plus');
                        
                        if (isPlus) {
                            incrementItem(questId, itemName);
                        } else {
                            decrementItem(questId, itemName);
                        }
                        
                        renderQuests();
                        renderNpcs();
                        updateStats();
                    });
                });
                
                const midDiv = item.querySelector('.quest-mid');
                midDiv.appendChild(controls);
            });
        }
        
        item.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT' && !e.target.closest('.item-btn')) {
                const url = getQuestUrl(quest);
                if (url) {
                    window.location.href = url;
                }
            }
        });
        
        elements.questList.appendChild(item);
    });
}

// ========================================
// ОБНОВЛЕНИЕ СТАТИСТИКИ
// ========================================
function updateStats() {
    const allQuests = getAllQuests();
    const total = allQuests.length;
    const completed = getCompletedCount(allQuests);
    
    elements.totalCount.textContent = total;
    elements.completedCount.textContent = completed;
}

// ========================================
// ОЧИСТКА ВЫПОЛНЕННЫХ КВЕСТОВ
// ========================================
function handleClearCompleted() {
    if (confirm('Очистить все выполненные квесты?')) {
        clearCompletedQuests();
        renderQuests();
        renderNpcs();
        updateStats();
    }
}

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================
function init() {
    applyTheme(state.theme);
    
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.statusFilter.addEventListener('change', (e) => {
        state.statusFilter = e.target.value;
        renderQuests();
    });
    elements.searchFilter.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderQuests();
    });
    elements.sortFilter.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderQuests();
    });
    elements.clearCompleted.addEventListener('click', handleClearCompleted);
    
    renderNpcs();
    renderQuests();
    updateStats();
}

document.addEventListener('DOMContentLoaded', init);