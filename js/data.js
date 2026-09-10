// ========================================
// БАЗА ДАННЫХ С КВЕСТАМИ
// ========================================

const NPC_DATA = [
    {
        id: 'louis',
        name: 'Louis',
        faction: '',
        emoji: '🎩',
        quests: [
            { 
                id: 'louis_1', 
                title: 'Still Alive', 
                description: 'Успешно эвакуироваться',
                page: 'quests/louis/still_alive.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'louis_2', 
                title: 'Gardon\'s Gambit', 
                description: 'Искать <s>мужские</s> ЯЙЦА',
                page: 'quests/louis/gardons_gambit.html',
                items: [
                    { name: 'Egg', icon: '🥚', needed: 5 }
                ]
            },
            { 
                id: 'louis_3', 
                title: 'Returning Home', 
                description: 'Найти дом Луи и признаки жизни',
                page: 'quests/louis/returning_home.html',
                items: []
            },
            { 
                id: 'louis_4', 
                title: 'A Friend In Need', 
                description: 'Поговорить с Elouise',
                page: 'quests/louis/a_friend_in_need.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'louis_5', 
                title: 'A Gift For The Giver', 
                description: 'Найти красную ленту',
                page: 'quests/louis/a_gift_for_the_giver.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'louis_6', 
                title: 'Child\'s Play', 
                description: 'Найти палки',
                page: 'quests/louis/childs_play.html',
                items: [
                    { name: 'Thick Branch', icon: '🪾', needed: 2 }
                ]
            },
            { 
                id: 'louis_7', 
                title: 'Sleeping Eye Mill', 
                description: 'Найти 3 улики на локации',
                page: 'quests/louis/sleeping_eye_mill.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'louis_8', 
                title: 'A Sombre Revelation', 
                description: 'Найти признаки матери Луи у реки',
                page: 'quests/louis/a_sombre_revelation.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'louis_9', 
                title: 'The Black Swordsman', 
                description: 'Поговорить с Reynauld',
                page: 'quests/louis/the_black_swordsman.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'louis_10', 
                title: 'The Last Prisioner', 
                description: 'Найти подземелье Jacques Folly и собрать зацепки отца и сестры Луи',
                page: 'quests/louis/the_last_prisioner.html',
                items: []  // ← нет предметов
            },
        ]
    },
    {
        id: 'piro',
        name: 'Piro',
        faction: '',
        emoji: '💉',
        quests: [
            { 
                id: 'piro_1', 
                title: 'Remains of The Day', 
                description: 'Найти конвой на Jaques Bridge',
                page: 'quests/piro/remains_of_the_day.html',
                items: []
            },
            { 
                id: 'piro_2', 
                title: 'Seeing Clearly', 
                description: 'Найти линзу Пиро в крысиных гнёздах',
                page: 'quests/piro/seeing_clearly.html',
                items: []
            },
            { 
                id: 'piro_3', 
                title: 'Under The Skin', 
                description: 'Требуется найти несколько предметов для Пиро',
                page: 'quests/piro/under_the_skin.html',
                items: [
                    { name: 'Sealed Bloodbag', icon: '🩸', needed: 1 },
                    { name: 'Seamstress Needles', icon: '🪡', needed: 5 },
                    { name: 'Silver Dish', icon: '🍽️', needed: 1 },
                    { name: 'Glass Vial', icon: '🧪', needed: 1 }
                ] 
            },
            { 
                id: 'piro_4', 
                title: 'Testing The Waters', 
                description: 'Требуется взять три экземпляра из 3-ёх вод',
                page: 'quests/piro/testing_the_waters.html',
                items: [] 
            },
            { 
                id: 'piro_5', 
                title: 'Notes Of Experiments', 
                description: 'Найти дневник в Jacques Folly',
                page: 'quests/piro/notes_of_experiments.html',
                items: [] 
            },
            { 
                id: 'piro_6', 
                title: 'Of Blight and Bezoars', 
                description: 'Требуется найти несколько предметов для Пиро',
                page: 'quests/piro/of_blight_and_bezoars.html',
                items: [
                    { name: 'Bezoars', icon: '🗿', needed: 3 },
                    { name: 'Hartshorn', icon: '🧂', needed: 2 },
                    { name: 'Arsenic', icon: '🧪', needed: 1 }
                ] 
            },
            { 
                id: 'piro_7', 
                title: 'The Preservers of Old', 
                description: 'Найти данж Undercroft',
                page: 'quests/piro/the_preservers_of_old.html',
                items: [] 
            },
            { 
                id: 'piro_8', 
                title: 'Tissue and Blood', 
                description: 'Найти данж Undercroft',
                page: 'quests/piro/the_preservers_of_old.html',
                items: [
                    { name: 'Waif Head', icon: '😀', needed: 10 },
                    { name: 'Dreg Head', icon: '😁', needed: 10 },
                    { name: 'Shambler Hand', icon: '🖐️', needed: 5 },
                    { name: 'Bloat Spine', icon: '🦴', needed: 5 },
                    { name: 'Drooler Jaw', icon: '🦈', needed: 1 },
                    { name: 'Brute Foot', icon: '🦶', needed: 1 }
                ] 
            },
            { 
                id: 'piro_9', 
                title: 'A Lucid Dream', 
                description: 'Найти в данже экземпляры крови',
                page: 'quests/piro/a_lucid_dream.html',
                items: [] 
            },
        ]
    },
    {
        id: 'eloise',
        name: 'Eloise',
        faction: '',
        emoji: '👩',
        quests: [
            { 
                id: 'eloise_1', 
                title: 'A Warm Welcome', 
                description: 'Начальный квест',
                page: 'quests/eloise/a_warm_welcome.html',
                items: []
            },
            { 
                id: 'eloise_2',  // ← ЭТОТ КВЕСТ С СЧЁТЧИКОМ
                title: 'Making Dough', 
                description: 'Поиск муки',
                page: 'quests/eloise/making_dough.html',
                items: [
                    { name: 'Flour', icon: '🌾', needed: 20 }
                ]
            },
            { 
                id: 'eloise_3', 
                title: 'The Gavroche Family', 
                description: 'Найти лагерь',
                page: 'quests/eloise/the_gavroche_family.html',
                items: []
            },
            { 
                id: 'eloise_4', 
                title: 'Last Embers', 
                description: 'Поиск угля',
                page: 'quests/eloise/last_embers.html',
                items: [
                    { name: 'Charcoal', icon: '🪨', needed: 15 }
                ]
            },
            { 
                id: 'eloise_5', 
                title: 'Mapping The Front', 
                description: 'Найти локацию и карту',
                page: 'quests/eloise/mapping_the_front.html',
                items: []
            },
            { 
                id: 'eloise_6', 
                title: 'Bare Necessities', 
                description: 'Найти разные предметы',
                page: 'quests/eloise/bare_necessities.html',
                items: [
                    { name: 'Damp Rag', icon: '🟤', needed: 5 },
                    { name: 'Tallow Balm', icon: '🧈', needed: 10 },
                    { name: 'Saltpetre', icon: '🧂', needed: 20 }
                ]
            },
            { 
                id: 'eloise_7', 
                title: 'Pushing Back The Shadows', 
                description: 'Найти церковь и свечу',
                page: 'quests/eloise/pushing_back_the_shadows.html',
                items: []
            },
            { 
                id: 'eloise_8', 
                title: 'Ink In The Ashes', 
                description: 'Поговорить с Mr. Sweet',
                page: 'quests/eloise/ink_in_the_ashes.html',
                items: []
            },
            { 
                id: 'eloise_9', 
                title: 'Crossing The Threshold', 
                description: 'Поговорить с солдатом на мосте',
                page: 'quests/eloise/Crossing the Threshold',
                items: []
            },
        ]
    },
    {
        id: 'reynuald',
        name: 'Reynauld',
        faction: '',
        emoji: '🗡️',
        quests: [
            { 
                id: 'reynauld_1', 
                title: 'Along The Watchtowers', 
                description: 'Осмотреть 4 башни (сверху иногда появляется уголь для квеста Элуизы)',
                page: 'reynauld/along_the_watchtowers.html',
                items: []  // ← нет предметов
            },
            { 
                id: 'reynauld_2', 
                title: 'Bearing Arms', 
                description: 'Найти 10 тяжёлых патронов',
                page: 'quests/reynauld/the_hidden_cache.html',
                items: [{ name: 'Heavy Ammunition', icon: '🔫', needed: 10 }]
            },

            { 
                id: 'reynauld_3', 
                title: 'Call to The Fallen', 
                description: 'Подудеть в рог на локации Fort Sand Rouge',
                page: 'quests/reynauld/call_to_the_fallen.html',
                items: []
            },

            { 
                id: 'reynauld_4', 
                title: 'Eat The Messenger', 
                description: 'Посмотреть Bellefotaine, Jacques Bridge и найти Dispatch Rider',
                page: 'quests/reynauld/eat_the_messenger.html',
                items: []
            },

            { 
                id: 'reynauld_5', 
                title: 'Brother In Arms', 
                description: 'Осмотреть локацию Voltigeur Billet',
                page: 'quests/reynauld/brother_in_arms.html',
                items: []
            },

            { 
                id: 'reynauld_6', 
                title: 'Sweet Secrets', 
                description: 'Найти дневник на локации Sarlat Farm',
                page: 'quests/reynauld/sweet_secrets.html',
                items: []
            },

            { 
                id: 'reynauld_7', 
                title: 'The Hidden Cache', 
                description: 'Найти 5 тайников с припасами и вернуться к Рейнольду',
                page: 'quests/reynauld/the_hidden_cache.html',
                items: []
            },
            { 
                id: 'reynauld_6', 
                title: 'The Shako', 
                description: 'Найти предметы в данже The Pit',
                page: 'quests/reynauld/the_shako.html',
                items: []
            },
        ]
    },
    {
        id: 'mrsweet',
        name: 'Mr. Sweet',
        faction: '',
        emoji: '🤴',
        quests: [
            { 
                id: 'mrsweet_1', 
                title: 'Sweet Lubrication', 
                description: 'Найти бухло',
                page: 'quests/mrsweet/sweet_lubrication.html',
                items: [
                    { name: 'Tavern Wine', icon: '🍷', needed: 3 },
                    { name: 'Thin Mead', icon: '🍺', needed: 3 }
                ]
            },
            { 
                id: 'mrsweet_2', 
                title: 'A Long Boy', 
                description: 'Найти пистолет Long Boy',
                page: 'quests/mrsweet/a_long_boy.html',
                items: [{ name: 'Long Boy', icon: '🔫', needed: 1 }]  // ← нет предметов
            },
            { 
                id: 'mrsweet_3', 
                title: 'A Walk In The Woods', 
                description: 'Найти Woodlant Retreat в Sarlat Farm',
                page: 'quests/mrsweet/a_walk_in_the_woods.html',
                items: []
            },

            { 
                id: 'mrsweet_4', 
                title: 'A Token Of Remembrance', 
                description: 'Около крепости положить на надгробие Sylvettes trinket',
                page: 'quests/mrsweet/a_token_of_remembrance.html',
                items: []
            },

            { 
                id: 'mrsweet_5', 
                title: 'An Aristocratic Vice', 
                description: 'Найти часовню Chapel of Weeping Virgins к востоку от Sarlat и изучить дневник епископа Marais.',
                page: 'quests/mrsweet/an_aristocratic_vice.html',
                items: []
            },

            { 
                id: 'mrsweet_6', 
                title: 'An Unusual Necklace', 
                description: 'Отправиться к Jacques Bridge, найти таверну The Gentle Hand Inn и обыскать комнаты в поисках ожерелья Agarwood Necklace.',
                page: 'quests/mrsweet/an_unusual_necklace.html',
                items: []
            },

            { 
                id: 'mrsweet_7', 
                title: 'Sweet Sylvette', 
                description: 'Найти мельницу Black Wood Mill в локации Sombre Forest и обыскать верхний этаж в поисках журнала Lacourt\'s Ledger.',
                page: 'quests/mrsweet/sweet_sylvette.html',
                items: []
            },

            { 
                id: 'mrsweet_8', 
                title: 'A Touch Of Bribery', 
                description: 'Собрать Opium, Opium Pipe и China Bowl для мистера Суита, чтобы освежить его память.',
                page: 'quests/mrsweet/a_touch_of_bribery.html',
                items: [
                    { name: 'Opium', icon: '🌿', needed: 1 },
                    { name: 'Opium Pipe', icon: '🪵', needed: 1 },
                    { name: 'China Bowl', icon: '🥣', needed: 1 }
                ]
            },

            { 
                id: 'mrsweet_9', 
                title: 'The Garrison', 
                description: 'Исследовать гарнизон Fusiliers Garrison в локации Sombre Forest и выяснить, что случилось с Сильветтой.',
                page: 'quests/mrsweet/the_garrison.html',
                items: []
            },

            { 
                id: 'mrsweet_10', 
                title: 'Golden Smoke', 
                description: 'Найти пещеру в конце оврага к югу от часовни Chapel of Weeping Virgins около Sarlat и забрать табак Golden Leaf Tobacco.',
                page: 'quests/mrsweet/golden_smoke.html',
                items: []
            },

            
        ]
    }
];

// ========================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С ДАННЫМИ
// ========================================

// Получить все квесты
function getAllQuests() {
    const all = [];
    NPC_DATA.forEach(npc => {
        npc.quests.forEach(quest => {
            all.push({
                ...quest,
                npcId: npc.id,
                npcName: npc.name,
                npcEmoji: npc.emoji
            });
        });
    });
    return all;
}

// Получить все квестовые предметы (с уникальными ключами)
function getAllQuestItems() {
    const items = [];
    NPC_DATA.forEach(npc => {
        npc.quests.forEach(quest => {
            if (quest.items && quest.items.length > 0) {
                quest.items.forEach(item => {
                    items.push({
                        ...item,
                        questId: quest.id,
                        questTitle: quest.title,
                        npcName: npc.name,
                        npcEmoji: npc.emoji,
                        page: quest.page,
                        // УНИКАЛЬНЫЙ КЛЮЧ: questId + name
                        uniqueKey: `${quest.id}_${item.name}`
                    });
                });
            }
        });
    });
    return items;
}

// Получить предметы для конкретного квеста
function getQuestItems(questId) {
    const allQuests = getAllQuests();
    const quest = allQuests.find(q => q.id === questId);
    return quest && quest.items ? quest.items : [];
}

// Получить НПС по ID
function getNpcById(npcId) {
    return NPC_DATA.find(n => n.id === npcId);
}

// Получить квесты НПС
function getNpcQuests(npcId) {
    const npc = NPC_DATA.find(n => n.id === npcId);
    return npc ? npc.quests : [];
}