// ========================================
// УПРАВЛЕНИЕ СОХРАНЕНИЕМ В localStorage
// ========================================

const STORAGE_KEY = 'hunger_quests';
const SELECTED_NPCS_KEY = 'hunger_selected_npcs';
const ITEMS_KEY = 'hunger_items';

// ========================================
// КВЕСТЫ
// ========================================

function getCompletedQuests() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function saveQuestStatus(questId, isCompleted) {
    const completed = getCompletedQuests();
    if (isCompleted) {
        completed[questId] = true;
    } else {
        delete completed[questId];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
}

function isQuestCompleted(questId) {
    const completed = getCompletedQuests();
    return !!completed[questId];
}

function clearCompletedQuests() {
    localStorage.removeItem(STORAGE_KEY);
}

function getCompletedCount(allQuests) {
    const completed = getCompletedQuests();
    return allQuests.filter(q => completed[q.id]).length;
}

function getTotalCount(allQuests) {
    return allQuests.length;
}

// ========================================
// ВЫБРАННЫЕ НПС
// ========================================

function getSelectedNpcs() {
    try {
        const data = localStorage.getItem(SELECTED_NPCS_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch {}
    
    if (NPC_DATA && NPC_DATA.length > 0) {
        return [NPC_DATA[0].id];
    }
    return [];
}

function saveSelectedNpcs(npcIds) {
    if (Array.isArray(npcIds) && npcIds.length > 0) {
        localStorage.setItem(SELECTED_NPCS_KEY, JSON.stringify(npcIds));
    } else {
        localStorage.removeItem(SELECTED_NPCS_KEY);
    }
}

// ========================================
// ПРЕДМЕТЫ (С УНИКАЛЬНЫМИ КЛЮЧАМИ)
// ========================================

// Получить уникальный ключ для предмета (questId + name)
function getItemUniqueKey(questId, itemName) {
    return `${questId}_${itemName}`;
}

// Получить все сохранённые предметы
function getStoredItems() {
    try {
        const data = localStorage.getItem(ITEMS_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

// Получить количество конкретного предмета для квеста
function getItemCount(questId, itemName) {
    const items = getStoredItems();
    const key = getItemUniqueKey(questId, itemName);
    return items[key] || 0;
}

// Сохранить количество предмета для квеста
function saveItemCount(questId, itemName, count) {
    const items = getStoredItems();
    const key = getItemUniqueKey(questId, itemName);
    if (count > 0) {
        items[key] = count;
    } else {
        delete items[key];
    }
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

// Увеличить количество предмета для квеста
function incrementItem(questId, itemName) {
    const current = getItemCount(questId, itemName);
    // Находим максимальное количество для этого предмета в этом квесте
    const questItems = getQuestItems(questId);
    const item = questItems.find(i => i.name === itemName);
    const maxNeeded = item ? item.needed : Infinity;
    
    if (current >= maxNeeded) return current;
    
    saveItemCount(questId, itemName, current + 1);
    return current + 1;
}

// Уменьшить количество предмета для квеста
function decrementItem(questId, itemName) {
    const current = getItemCount(questId, itemName);
    if (current > 0) {
        saveItemCount(questId, itemName, current - 1);
        return current - 1;
    }
    return 0;
}

// Очистить все предметы
function clearAllItems() {
    localStorage.removeItem(ITEMS_KEY);
}

// Получить все предметы с их количеством (для страницы items.html)
function getAllItemsWithCount() {
    const stored = getStoredItems();
    const allItems = getAllQuestItems();
    
    return allItems.map(item => ({
        ...item,
        count: stored[item.uniqueKey] || 0
    }));
}

// Получить предметы для конкретного квеста с количеством
function getQuestItemsWithCount(questId) {
    const stored = getStoredItems();
    const questItems = getQuestItems(questId);
    
    return questItems.map(item => {
        const key = getItemUniqueKey(questId, item.name);
        return {
            ...item,
            count: stored[key] || 0
        };
    });
}

// Проверить, собраны ли все предметы для квеста
function isQuestItemsComplete(questId) {
    const questItems = getQuestItems(questId);
    if (questItems.length === 0) return true;
    
    const stored = getStoredItems();
    return questItems.every(item => {
        const key = getItemUniqueKey(questId, item.name);
        return (stored[key] || 0) >= item.needed;
    });
}