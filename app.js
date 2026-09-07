/* ============================================================
   家庭孩子积分管理网页应用
   ============================================================ */

const STORAGE_KEY = 'behaviorAppData';
const APP_VERSION = 4;

// 任务分类
const CATEGORIES = [
  { key: 'all',           label: '全部', icon: '🌈' },
  { key: 'study',         label: '学习', icon: '📚' },
  { key: 'life',          label: '生活', icon: '🏠' },
  { key: 'behavior',      label: '行为', icon: '✅' },
  { key: 'entertainment', label: '娱乐', icon: '🎮' }
];

// 内置图标库（emoji）
const ICONS = [
  '📚', '📖', '✏️', '📝', '📐', '📏', '🎨', '🎭', '📊', '🔬',
  '🧮', '🌍', '🗺️', '🔭', '⚗️', '📓', '📔', '📕', '📗', '📘',
  '📙', '📒', '🧹', '🧺', '🧼', '🧽', '🪣', '🚿', '🛁', '🪥',
  '🦷', '🧴', '🛏️', '🍽️', '🥢', '🥄', '🍚', '🍜', '🍲', '🥗',
  '🍳', '🥘', '🍛', '🥦', '🍎', '🍉', '🥛', '💧', '🌙', '☀️',
  '✅', '🤝', '🙏', '💪', '🧘', '🎯', '🎖️', '🏅', '🌟', '⭐',
  '💎', '🔔', '🗝️', '❤️', '🤗', '😊', '🙂', '😇', '🥰', '😀',
  '📺', '🎮', '🧸', '🎢', '🎡', '🎠', '🎪', '🎬', '🎤', '🎧',
  '🎵', '🎶', '🏀', '⚽', '🎾', '🏸', '🛹', '🚲', '🛴', '🚗',
  '✈️', '⛵', '🏖️', '🏕️', '🎁', '🍦', '🍭', '🧁', '🍰', '🍪',
  '🍫', '🍬', '🍩', '🍿', '🥤', '🧃', '🐶', '🐱', '🐰', '🐼',
  '🦁', '🐯', '🦄', '🚀', '🌈', '🌸', '🌳', '🌻', '🌷', '🍄',
  '🌵', '🐙', '🐠', '🐟', '🐬', '🐳', '🐢', '🦜', '🐧', '🦋',
  '🐝', '🐞', '🎒', '🛒', '🧩', '🏆', '💰', '🥇', '🎗️', '🏠',
  '🚪', '🪟', '💡', '⏰', '🧭', '🧱', '🔋', '🩹', '🚑', '🚒'
];

const DEFAULT_CHILDREN = [
  { id: 'child-1', name: '王瑾一', color: '#FF6B6B', avatar: '👦' },
  { id: 'child-2', name: '王行一', color: '#4D96FF', avatar: '👦' }
];

// 可选头像
const AVATARS = [
  '👦', '👧', '🧒', '👶', '🧑', '👦🏻', '👧🏻',
  '🐶', '🐱', '🐰', '🐼', '🦁', '🐯', '🦄',
  '🐙', '🐠', '🐬', '🦜', '🐧', '🦋', '🐝'
];

// 可选主题色
const COLORS = [
  '#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D',
  '#C9B1FF', '#FF9F45', '#FF8FAB', '#5BC0EB',
  '#A18CD1', '#FCCB90', '#84FAB0', '#FF9A9E'
];

const DEFAULT_TASKS = [
  // 赚积分
  { id: 'task-learn', name: '学习20分钟', points: 10, type: 'earn', icon: '📖', category: 'study' },
  { id: 'task-sweep', name: '扫地', points: 10, type: 'earn', icon: '🧹', category: 'life' },
  { id: 'task-bath', name: '自主洗澡', points: 10, type: 'earn', icon: '🛁', category: 'life' },
  { id: 'task-plate', name: '光盘吃饭', points: 20, type: 'earn', icon: '🍛', category: 'life' },
  { id: 'task-recite', name: '背诵文章', points: 30, type: 'earn', icon: '📜', category: 'study' },
  { id: 'task-listen', name: '英语听力', points: 10, type: 'earn', icon: '🎧', category: 'study' },
  { id: 'task-brush', name: '自主刷牙', points: 10, type: 'earn', icon: '🦷', category: 'life' },

  // 花积分 / 兑换
  { id: 'task-tv', name: '看电视10分钟', points: 10, type: 'consume', icon: '📺', category: 'entertainment' },
  { id: 'task-toy', name: '玩具购物100积分兑换5元', points: 100, type: 'consume', icon: '🧸', category: 'entertainment' },
  { id: 'task-park', name: '300积分兑换游乐场', points: 300, type: 'consume', icon: '🎡', category: 'entertainment' },
  { id: 'task-hotpot', name: '400积分海底捞一次', points: 400, type: 'consume', icon: '🍲', category: 'entertainment' },
  { id: 'task-pants', name: '尿裤子', points: 20, type: 'consume', icon: '💦', category: 'behavior' },
  { id: 'task-bed', name: '尿床', points: 20, type: 'consume', icon: '🛏️', category: 'behavior' }
];

// 宠物成长阶段配置
const PET_STAGES = [
  { key: 'baby',  name: '土拨鼠宝宝', feedThreshold: 0,  skill: 'peek',  skillName: '探头' },
  { key: 'child', name: '幼年土拨鼠', feedThreshold: 5,  skill: 'wag',   skillName: '摇尾巴' },
  { key: 'teen',  name: '少年土拨鼠', feedThreshold: 10, skill: 'spin',  skillName: '转圈圈' },
  { key: 'adult', name: '成年土拨鼠', feedThreshold: 15, skill: 'jump',  skillName: '上蹿下跳' },
  { key: 'king',  name: '土拨鼠大王', feedThreshold: 20, skill: 'dance', skillName: '跳舞' }
];

const FEED_BAG_PRICE = 10; // 1 包饲料 = 10 积分
const FEEDS_PER_STAGE = 5; // 每阶段需要 5 包

let state = { version: 1, children: [], tasks: [], records: [] };
let currentChildId = null;
let currentTab = 'home';
let selectedIcon = null;
let selectedCategory = 'life';
let selectedAvatar = null;
let selectedColor = COLORS[0];
let homeFilters = { earn: 'all', consume: 'all' };
let editingTaskId = null;
let editingChildId = null;

/* ------------------- 工具函数 ------------------- */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function formatTime(iso) {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${month}月${date}日 ${h}:${m}`;
}

function isToday(iso) {
  const d = new Date(iso);
  const n = new Date();
  return d.getFullYear() === n.getFullYear() &&
         d.getMonth() === n.getMonth() &&
         d.getDate() === n.getDate();
}

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function inferCategory(name, type) {
  const n = String(name).toLowerCase();
  if (/学|背|听|读|写|书|英|数|字|词|文/.test(n)) return 'study';
  if (/吃|饭|澡|牙|床|扫|地|衣|水|睡|碗|盘|整理|收拾|穿|洗/.test(n)) return 'life';
  if (/电视|游戏|玩|玩具|游乐场|海|糖|奖|礼|看|动画|公园|电影|旅行|出游/.test(n)) return 'entertainment';
  return 'behavior';
}

function getAvatar(child) {
  if (child.id === 'child-1') return { src: 'avatar-spongebob.png', position: 'center' };
  if (child.id === 'child-2') return { src: 'bg-bikini-bottom.jpg', position: '35% 25%' };
  return { src: 'avatar-spongebob.png', position: 'center' };
}

/* ------------------- 状态管理 ------------------- */

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      state = JSON.parse(raw);
    } else {
      seedData();
    }
  } catch (e) {
    seedData();
  }

  if (!state.children || !state.children.length) {
    seedData();
  }

  migrateData();
  currentChildId = state.children[0].id;
}

function migrateData() {
  let changed = false;

  if (!state.version) {
    state.version = 1;
    changed = true;
  }

  if (state.version < APP_VERSION) {
    // 同步默认任务的最新图标/名称/积分/分类
    DEFAULT_TASKS.forEach(defaultTask => {
      const task = state.tasks.find(t => t.id === defaultTask.id);
      if (task) {
        task.name = defaultTask.name;
        task.points = defaultTask.points;
        task.type = defaultTask.type;
        task.icon = defaultTask.icon;
        task.category = defaultTask.category;
        changed = true;
      }
    });

    // 为旧任务自动补充分类
    state.tasks.forEach(task => {
      if (!task.category) {
        const def = DEFAULT_TASKS.find(d => d.id === task.id);
        task.category = def?.category || inferCategory(task.name, task.type);
        changed = true;
      }
    });

    // 为旧孩子补充头像和宠物字段
    if (state.children) {
      state.children.forEach(child => {
        if (!child.avatar) {
          child.avatar = child.name.charAt(0);
          changed = true;
        }
        if (!('pet' in child)) {
          child.pet = null;
          changed = true;
        }
      });
    }

    state.version = APP_VERSION;
    changed = true;
  }

  if (changed) {
    saveState();
  }
}

function seedData() {
  state = {
    version: APP_VERSION,
    children: JSON.parse(JSON.stringify(DEFAULT_CHILDREN)).map(c => ({ ...c, pet: null })),
    tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
    records: []
  };
  saveState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('localStorage 保存失败', e);
  }
}

function getChild(id) {
  return state.children.find(c => c.id === id);
}

function childRecords(childId, type) {
  return state.records.filter(r => r.childId === childId && (!type || r.type === type));
}

function sumPoints(records) {
  return records.reduce((sum, r) => sum + r.points, 0);
}

function getCurrentPoints(childId) {
  return sumPoints(childRecords(childId, 'earn')) - sumPoints(childRecords(childId, 'consume'));
}

function getTotalEarned(childId) {
  return sumPoints(childRecords(childId, 'earn'));
}

function getTotalConsumed(childId) {
  return sumPoints(childRecords(childId, 'consume'));
}

function getTodayEarned(childId) {
  return sumPoints(childRecords(childId, 'earn').filter(r => isToday(r.timestamp)));
}

function getTodayConsumed(childId) {
  return sumPoints(childRecords(childId, 'consume').filter(r => isToday(r.timestamp)));
}

function addRecord(childId, task) {
  const record = {
    id: generateId(),
    childId,
    taskId: task.id,
    taskName: task.name,
    points: Number(task.points),
    type: task.type,
    icon: task.icon,
    timestamp: new Date().toISOString()
  };
  state.records.push(record);
  saveState();
  renderActive();
}

function deleteRecord(recordId) {
  state.records = state.records.filter(r => r.id !== recordId);
  saveState();
  renderActive();
}

function addTask(name, points, type, icon, category) {
  state.tasks.push({
    id: generateId(),
    name: name.trim(),
    points: Number(points),
    type,
    icon,
    category: category || inferCategory(name, type)
  });
  saveState();
  renderActive();
}

function deleteTask(taskId) {
  if (confirm('确定删除这个任务吗？已有的积分记录仍会保留。')) {
    state.tasks = state.tasks.filter(t => t.id !== taskId);
    saveState();
    renderActive();
  }
}

/* ------------------- 孩子管理 ------------------- */

function addChild(name, avatar, color) {
  const newChild = {
    id: 'child-' + generateId(),
    name: name.trim(),
    avatar,
    color,
    pet: null
  };
  state.children.push(newChild);
  saveState();
  renderActive();
  return newChild;
}

function updateChild(childId, name, avatar, color) {
  const child = state.children.find(c => c.id === childId);
  if (!child) return;

  child.name = name.trim();
  child.avatar = avatar;
  child.color = color;

  // 同步所有记录里的 childName（可选）
  state.records.forEach(record => {
    if (record.childId === childId) {
      record.childName = child.name;
    }
  });

  saveState();
  renderActive();
}

function deleteChild(childId) {
  const child = getChild(childId);
  if (!child) return;

  if (state.children.length <= 1) {
    alert('至少保留一个孩子');
    return;
  }

  const msg = `确定删除「${child.name}」吗？\n该孩子的积分记录仍会保留，但宠物数据将被删除。`;
  if (!confirm(msg)) return;

  state.children = state.children.filter(c => c.id !== childId);

  // 如果删除的是当前选中的孩子，切换到第一个剩余孩子
  if (currentChildId === childId) {
    currentChildId = state.children[0].id;
  }

  saveState();
  renderActive();
}

/* ------------------- 宠物管理 ------------------- */

function createPet(name) {
  return {
    name: name.trim(),
    stage: PET_STAGES[0].key,
    feedBags: 0,
    feedInventory: 0,
    unlockedSkills: [PET_STAGES[0].skill],
    adoptedAt: new Date().toISOString()
  };
}

function getPet(child) {
  return child?.pet;
}

function getCurrentPet() {
  const child = getChild(currentChildId);
  return getPet(child);
}

function adoptPet(childId, name) {
  const child = getChild(childId);
  if (!child) return null;

  child.pet = createPet(name);
  saveState();
  renderActive();
  return child.pet;
}

function checkPetEvolution(pet) {
  let newStage = pet.stage;

  for (let i = PET_STAGES.length - 1; i >= 0; i--) {
    const stage = PET_STAGES[i];
    if (pet.feedBags >= stage.feedThreshold) {
      newStage = stage.key;
      break;
    }
  }

  if (newStage !== pet.stage) {
    pet.stage = newStage;
    const stageInfo = getPetStageInfo(newStage);
    if (!pet.unlockedSkills.includes(stageInfo.skill)) {
      pet.unlockedSkills.push(stageInfo.skill);
    }
    return true;
  }

  return false;
}

function exchangeFeed(childId) {
  const child = getChild(childId);
  if (!child || !child.pet) return false;

  const points = getCurrentPoints(childId);
  if (points < FEED_BAG_PRICE) {
    alert('积分不足，无法兑换饲料');
    return false;
  }

  // 扣除积分：创建一条消耗记录
  state.records.push({
    id: generateId(),
    childId,
    taskId: 'pet-feed-exchange',
    taskName: '兑换宠物饲料',
    points: FEED_BAG_PRICE,
    type: 'consume',
    icon: '🌾',
    timestamp: new Date().toISOString()
  });

  child.pet.feedInventory++;
  saveState();
  renderActive();
  return true;
}

function feedPet(childId) {
  const child = getChild(childId);
  if (!child || !child.pet) return false;

  const pet = child.pet;
  if (pet.feedInventory < 1) {
    alert('没有饲料了，先去兑换吧');
    return false;
  }

  pet.feedInventory--;
  pet.feedBags++;

  const evolved = checkPetEvolution(pet);

  saveState();
  renderActive();
  showFeedBagAnimation();

  return { success: true, evolved };
}

function playPetSkill(childId, skillKey) {
  const child = getChild(childId);
  if (!child || !child.pet) return false;

  const pet = child.pet;
  if (!pet.unlockedSkills.includes(skillKey)) return false;

  // 触发动作动画，由 renderPet 渲染时添加 action class
  pet.currentAction = skillKey;
  saveState();
  renderActive();

  // 显示技能名称提示
  const stageInfo = PET_STAGES.find(s => s.skill === skillKey);
  const hintEl = $('#pet-skill-hint');
  if (hintEl && stageInfo) {
    hintEl.textContent = `✨ ${stageInfo.skillName}`;
    hintEl.classList.remove('active');
    void hintEl.offsetWidth; // 强制重绘，让动画可以重新触发
    hintEl.classList.add('active');
  }

  // 动画结束后清除动作（约 1 秒）
  setTimeout(() => {
    if (pet.currentAction === skillKey) {
      pet.currentAction = null;
      saveState();
      renderActive();
    }
  }, 1200);

  return true;
}

function showFeedBagAnimation() {
  const bag = $('#pet-food-bag');
  if (!bag) return;

  bag.classList.remove('active');
  void bag.offsetWidth;
  bag.classList.add('active');

  setTimeout(() => {
    bag.classList.remove('active');
  }, 1200);
}

/* ------------------- 渲染 ------------------- */

function renderTopBar() {
  const child = getChild(currentChildId);
  if (!child) return;

  const avatarBtn = $('#top-avatar');
  const avatarImg = avatarBtn.querySelector('.avatar-img');
  const avatar = getAvatar(child);
  avatarImg.src = avatar.src;
  avatarImg.style.objectPosition = avatar.position;
  avatarBtn.style.borderColor = child.color;

  $('#top-name').textContent = child.name;
  $('#top-points').textContent = getCurrentPoints(child.id) + ' 积分';
}

function renderChildSelector() {
  const container = $('#child-selector-bar');
  if (!container) return;
  container.innerHTML = '';

  state.children.forEach(child => {
    const btn = document.createElement('button');
    btn.className = 'child-selector-btn' + (child.id === currentChildId ? ' active' : '');
    btn.textContent = child.name;
    btn.addEventListener('click', () => {
      currentChildId = child.id;
      renderAll();
    });
    container.appendChild(btn);
  });
}

function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card ' + task.type + ' ' + (task.category || '');

  const sign = task.type === 'earn' ? '+' : '-';
  card.innerHTML = `
    <div class="task-card-illustration">${task.icon}</div>
    <div class="task-card-name">${task.name}</div>
    <div class="task-card-points ${task.type}">${sign}${task.points}</div>
  `;

  const btn = document.createElement('button');
  btn.className = `task-card-btn ${task.type}`;
  btn.textContent = sign;
  btn.addEventListener('click', (e) => handleTaskAction(e, task));

  card.appendChild(btn);
  return card;
}

function handleTaskAction(event, task) {
  const clientX = event.clientX;
  const clientY = event.clientY;
  showFloatingBadge(clientX, clientY, task.points, task.type);
  addRecord(currentChildId, task);
}

function renderCategoryTabs(section) {
  const container = $(`.category-tabs[data-section="${section}"]`);
  if (!container) return;
  container.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category-tab' + (homeFilters[section] === cat.key ? ' active' : '');
    btn.innerHTML = `<span class="tab-icon">${cat.icon}</span><span>${cat.label}</span>`;
    btn.addEventListener('click', () => {
      homeFilters[section] = cat.key;
      renderHome();
    });
    container.appendChild(btn);
  });
}

function renderHome() {
  const CARDS_PER_PAGE = 8;

  ['earn', 'consume'].forEach(type => {
    renderCategoryTabs(type);

    const grid = $('#' + type + '-grid');
    grid.innerHTML = '';

    const filter = homeFilters[type];
    const tasks = state.tasks.filter(
      t => t.type === type && (filter === 'all' || t.category === filter)
    );

    // 超过一屏数量时，按每屏 8 张卡片分页，整体向左滑动展示更多
    const pageCount = Math.max(1, Math.ceil(tasks.length / CARDS_PER_PAGE));
    for (let i = 0; i < pageCount; i++) {
      const page = document.createElement('div');
      page.className = 'task-page';
      tasks
        .slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE)
        .forEach(task => page.appendChild(createTaskCard(task)));
      grid.appendChild(page);
    }

    // 分页指示点
    let pagination = grid.nextElementSibling;
    if (!pagination || !pagination.classList.contains('task-pagination')) {
      pagination = document.createElement('div');
      pagination.className = 'task-pagination';
      grid.parentNode.insertBefore(pagination, grid.nextSibling);
    }
    pagination.innerHTML = '';

    if (pageCount > 1) {
      for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'task-pagination-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `第 ${i + 1} 页`);
        dot.addEventListener('click', () => {
          grid.scrollTo({ left: grid.clientWidth * i, behavior: 'smooth' });
        });
        pagination.appendChild(dot);
      }

      // 滚动时同步更新分页点高亮
      if (!grid._swipeBound) {
        grid._swipeBound = true;
        grid.addEventListener('scroll', () => {
          const pageIndex = Math.round(grid.scrollLeft / grid.clientWidth);
          pagination.querySelectorAll('.task-pagination-dot').forEach((d, idx) => {
            d.classList.toggle('active', idx === pageIndex);
          });
        });
      }
    }
  });
}

function renderRecords() {
  const balance = getCurrentPoints(currentChildId);
  const recordsBalance = $('#records-balance');
  $('#records-balance-value').textContent = balance;
  recordsBalance.classList.remove('theme-child-1', 'theme-child-2');
  recordsBalance.classList.add('theme-' + currentChildId);

  const stats = $('#stats-container');
  stats.innerHTML = '';

  const statItems = [
    { label: '历史获取', value: getTotalEarned(currentChildId), cls: 'stat-earn' },
    { label: '历史消耗', value: getTotalConsumed(currentChildId), cls: 'stat-consume' },
    { label: '今天获取', value: getTodayEarned(currentChildId), cls: 'stat-today-earn' },
    { label: '今天消耗', value: getTodayConsumed(currentChildId), cls: 'stat-today-consume' }
  ];

  statItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'stat-card ' + item.cls;
    card.innerHTML = `
      <span class="stat-value">${item.value}</span>
      <span class="stat-label">${item.label}</span>
    `;
    stats.appendChild(card);
  });

  const list = $('#records-list');
  list.innerHTML = '';

  const records = state.records
    .filter(r => r.childId === currentChildId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  $('#records-empty').style.display = records.length ? 'none' : 'block';

  records.forEach(record => {
    const li = document.createElement('li');
    li.className = 'record-item';
    li.dataset.recordId = record.id;

    const sign = record.type === 'earn' ? '+' : '-';
    li.innerHTML = `
      <div class="record-content">
        <div class="record-icon">${record.icon || '📝'}</div>
        <div class="record-info">
          <div class="record-name">${record.taskName}</div>
          <div class="record-time">${formatTime(record.timestamp)}</div>
        </div>
        <div class="record-points ${record.type}">${sign}${record.points}</div>
      </div>
      <div class="record-delete">删除</div>
    `;

    initSwipe(li);

    const deleteBtn = li.querySelector('.record-delete');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteRecord(record.id);
    });

    list.appendChild(li);
  });
}

function renderTasks() {
  const earnList = $('#manage-earn-list');
  const consumeList = $('#manage-consume-list');
  earnList.innerHTML = '';
  consumeList.innerHTML = '';

  state.tasks.forEach(task => {
    const catLabel = CATEGORIES.find(c => c.key === task.category)?.label || task.category || '其他';
    const li = document.createElement('li');
    li.className = 'manage-item';
    li.innerHTML = `
      <div class="manage-icon">${task.icon}</div>
      <div class="manage-info">
        <div class="manage-name">${task.name}</div>
        <div class="manage-points">${task.type === 'earn' ? '获取' : '消耗'} ${task.points} 积分 · ${catLabel}</div>
      </div>
      <button class="btn-delete" type="button">删除</button>
    `;

    li.querySelector('.btn-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.addEventListener('click', () => openModal(task.type, task));

    if (task.type === 'earn') {
      earnList.appendChild(li);
    } else {
      consumeList.appendChild(li);
    }
  });
}

function renderActive() {
  renderTopBar();
  renderChildSelector();
  if (currentTab === 'home') renderHome();
  else if (currentTab === 'records') renderRecords();
  else if (currentTab === 'tasks') renderTasks();
  else if (currentTab === 'settings') renderSettings();
}

function renderAll() {
  renderTopBar();
  renderChildSelector();
  renderHome();
  renderRecords();
  renderTasks();
  renderSettings();
}

function renderSettings() {
  const list = $('#children-list');
  if (!list) return;
  list.innerHTML = '';

  state.children.forEach(child => {
    const li = document.createElement('li');
    li.className = 'child-item';
    li.innerHTML = `
      <div class="child-avatar">${child.avatar}</div>
      <div class="child-info">
        <div class="child-name">
          ${child.name}
          <span class="child-color-dot" style="background:${child.color}"></span>
        </div>
      </div>
      <div class="child-actions">
        <button class="btn-edit" data-child-id="${child.id}" type="button">编辑</button>
        <button class="btn-delete" data-child-id="${child.id}" type="button">删除</button>
      </div>
    `;

    li.querySelector('.btn-edit').addEventListener('click', (e) => {
      e.stopPropagation();
      openChildModal(child);
    });

    li.querySelector('.btn-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteChild(child.id);
    });

    list.appendChild(li);
  });
}

/* ------------------- 宠物页面 ------------------- */

function getPetStageInfo(stageKey) {
  return PET_STAGES.find(s => s.key === stageKey) || PET_STAGES[0];
}

function getStageProgress(pet) {
  const stageIndex = PET_STAGES.findIndex(s => s.key === pet.stage);
  const currentThreshold = PET_STAGES[stageIndex].feedThreshold;
  const nextThreshold = stageIndex < PET_STAGES.length - 1
    ? PET_STAGES[stageIndex + 1].feedThreshold
    : PET_STAGES[PET_STAGES.length - 1].feedThreshold + FEEDS_PER_STAGE;

  const progress = Math.max(0, Math.min(pet.feedBags - currentThreshold, FEEDS_PER_STAGE));
  const total = FEEDS_PER_STAGE;
  return { progress, total, current: pet.feedBags - currentThreshold };
}

function renderPet() {
  const card = $('#pet-card');
  if (!card) return;

  const child = getChild(currentChildId);
  const pet = getPet(child);

  const petInfo = card.querySelector('.pet-info');
  const petActions = $('#pet-actions');
  const petScene = card.querySelector('.pet-scene');
  const petSkillList = $('#pet-skill-list');
  const emptyState = $('#pet-empty');
  const stageBadge = $('#pet-stage-badge');

  if (!pet) {
    if (petInfo) petInfo.style.display = 'none';
    if (petActions) petActions.style.display = 'none';
    if (petSkillList) petSkillList.style.display = 'none';
    if (petScene) petScene.style.display = 'none';
    if (stageBadge) stageBadge.style.display = 'none';
    if (emptyState) {
      emptyState.style.display = 'flex';
      emptyState.style.flexDirection = 'column';
      emptyState.style.alignItems = 'center';
    }
    return;
  }

  if (petInfo) petInfo.style.display = 'block';
  if (petActions) petActions.style.display = 'grid';
  if (petSkillList) petSkillList.style.display = 'flex';
  if (petScene) petScene.style.display = 'block';
  if (stageBadge) stageBadge.style.display = 'block';
  if (emptyState) emptyState.style.display = 'none';

  const stageInfo = getPetStageInfo(pet.stage);

  // 阶段徽章
  if (stageBadge) stageBadge.textContent = stageInfo.name;

  // 宠物形象
  const character = $('#pet-character');
  if (character) {
    character.setAttribute('data-stage', pet.stage);
    character.setAttribute('data-action', pet.currentAction || '');
  }

  // 真实图片精灵
  const sprite = $('#pet-sprite');
  if (sprite) {
    sprite.onload = () => {
      if (character) character.classList.add('use-sprite');
    };
    sprite.onerror = () => {
      // 图片加载失败时回退到 CSS 占位
      if (character) character.classList.remove('use-sprite');
    };
    sprite.src = `assets/pet/${pet.stage}.png`;
    sprite.alt = pet.name;
    if (sprite.complete && sprite.naturalWidth > 0) {
      if (character) character.classList.add('use-sprite');
    }
  }

  // 名字
  const nameEl = $('#pet-name');
  if (nameEl) nameEl.textContent = pet.name;

  // 统计
  const feedBagsEl = $('#pet-feed-bags');
  const feedInventoryEl = $('#pet-feed-inventory');
  if (feedBagsEl) feedBagsEl.textContent = pet.feedBags;
  if (feedInventoryEl) feedInventoryEl.textContent = pet.feedInventory;

  // 进度
  const { progress, total } = getStageProgress(pet);
  const progressText = $('#pet-progress-text');
  const progressFill = $('#pet-progress-fill');
  if (progressText) progressText.textContent = `${progress} / ${total}`;
  if (progressFill) progressFill.style.width = `${(progress / total) * 100}%`;

  // 操作按钮状态
  const feedBtn = $('#btn-feed-pet');
  const exchangeBtn = $('#btn-exchange-feed');
  if (feedBtn) feedBtn.disabled = pet.feedInventory < 1;
  if (exchangeBtn) {
    const points = getCurrentPoints(currentChildId);
    exchangeBtn.disabled = points < FEED_BAG_PRICE;
  }

  // 技能列表
  if (petSkillList) {
    petSkillList.innerHTML = '';
    PET_STAGES.forEach(stage => {
      const unlocked = pet.unlockedSkills.includes(stage.skill);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pet-skill' + (unlocked ? ' unlocked' : '');
      btn.textContent = unlocked ? stage.skillName : '???';
      btn.disabled = !unlocked;
      btn.addEventListener('click', () => {
        if (unlocked) playPetSkill(currentChildId, stage.skill);
      });
      petSkillList.appendChild(btn);
    });
  }
}

function openAdoptPetModal() {
  const child = getChild(currentChildId);
  if (!child) return;

  if (getPet(child)) {
    alert(`${child.name} 已经领养了宠物`);
    return;
  }

  const nameEl = $('#pet-adopt-child-name');
  if (nameEl) nameEl.textContent = child.name;

  const form = $('#pet-adopt-form');
  if (form) form.reset();

  const modal = $('#pet-adopt-modal');
  if (modal) modal.classList.add('active');
}

function closeAdoptPetModal() {
  const modal = $('#pet-adopt-modal');
  if (modal) modal.classList.remove('active');
}

function renderActive() {
  renderTopBar();
  renderChildSelector();
  if (currentTab === 'home') renderHome();
  else if (currentTab === 'records') renderRecords();
  else if (currentTab === 'tasks') renderTasks();
  else if (currentTab === 'pet') renderPet();
  else if (currentTab === 'settings') renderSettings();
}

function renderAll() {
  renderTopBar();
  renderChildSelector();
  renderHome();
  renderRecords();
  renderTasks();
  renderPet();
  renderSettings();
}

function switchTab(tab) {
  currentTab = tab;
  $$('.top-action').forEach(a => a.classList.toggle('active', a.dataset.tab === tab));
  $$('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + tab));
  renderActive();
}

/* ------------------- 动画与交互 ------------------- */

function showFloatingBadge(x, y, points, type) {
  const el = document.createElement('div');
  el.className = 'float-badge';
  el.textContent = (type === 'earn' ? '+' : '-') + points;
  el.style.color = type === 'earn' ? '#2ecc71' : '#ff5a5a';
  el.style.left = (x - 12) + 'px';
  el.style.top = (y - 28) + 'px';
  document.body.appendChild(el);

  el.addEventListener('animationend', () => {
    el.remove();
  });
}

function initSwipe(item) {
  const content = item.querySelector('.record-content');
  const DELETE_WIDTH = 80;

  let startX = 0;
  let isDragging = false;

  function move(clientX) {
    const delta = clientX - startX;
    if (delta < 0) {
      content.style.transform = `translateX(${Math.max(delta, -DELETE_WIDTH)}px)`;
    } else {
      content.style.transform = 'translateX(0px)';
    }
  }

  function end(clientX) {
    if (!isDragging) return;
    isDragging = false;
    item.classList.remove('no-select');
    content.style.transform = '';

    const delta = clientX - startX;
    if (delta < -40) {
      item.classList.add('swiped');
    } else {
      item.classList.remove('swiped');
    }
  }

  // 移动端 touch 事件
  item.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    item.classList.add('no-select');
  }, { passive: true });

  item.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    move(e.touches[0].clientX);
  }, { passive: true });

  item.addEventListener('touchend', (e) => {
    end(e.changedTouches[0].clientX);
  });

  item.addEventListener('touchcancel', () => {
    isDragging = false;
    item.classList.remove('no-select');
    content.style.transform = '';
  });

  // 桌面端 mouse 事件（挂到 window 防止拖出元素后丢失）
  item.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    item.classList.add('no-select');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    move(e.clientX);
  });

  window.addEventListener('mouseup', (e) => {
    end(e.clientX);
  });
}

/* ------------------- 任务添加弹窗 ------------------- */

const modal = $('#task-modal');
const taskForm = $('#task-form');

function renderIconPicker() {
  const picker = $('#icon-picker');
  picker.innerHTML = '';

  ICONS.forEach(icon => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'icon-option' + (icon === selectedIcon ? ' selected' : '');
    btn.textContent = icon;
    btn.addEventListener('click', () => {
      selectedIcon = icon;
      $('#task-icon').value = icon;
      renderIconPicker();
    });
    picker.appendChild(btn);
  });
}

function renderCategoryPicker() {
  const picker = $('#category-picker');
  picker.innerHTML = '';

  CATEGORIES.filter(c => c.key !== 'all').forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category-option' + (cat.key === selectedCategory ? ' selected' : '');
    btn.innerHTML = `<span>${cat.icon}</span><span>${cat.label}</span>`;
    btn.addEventListener('click', () => {
      selectedCategory = cat.key;
      $('#task-category').value = cat.key;
      renderCategoryPicker();
    });
    picker.appendChild(btn);
  });
}

function openModal(type, task = null) {
  $('#task-type').value = type;
  $('#modal-title').textContent = type === 'earn' ? '添加赚积分任务' : '添加花积分任务';

  if (task) {
    editingTaskId = task.id;
    $('#modal-title').textContent = type === 'earn' ? '编辑赚积分任务' : '编辑花积分任务';
    $('#task-name').value = task.name;
    $('#task-points').value = task.points;
    selectedIcon = task.icon;
    selectedCategory = task.category || 'life';
    $('#task-icon').value = task.icon || '';
    $('#task-category').value = task.category || 'life';
  } else {
    editingTaskId = null;
    taskForm.reset();
    selectedIcon = null;
    selectedCategory = 'life';
    $('#task-icon').value = '';
    $('#task-category').value = 'life';
  }

  renderIconPicker();
  renderCategoryPicker();
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
  selectedIcon = null;
  editingTaskId = null;
}

/* ------------------- 孩子弹窗 ------------------- */

const childModal = $('#child-modal');
const childForm = $('#child-form');

function renderAvatarPicker() {
  const picker = $('#avatar-picker');
  picker.innerHTML = '';

  AVATARS.forEach(avatar => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'avatar-option' + (avatar === selectedAvatar ? ' selected' : '');
    btn.textContent = avatar;
    btn.addEventListener('click', () => {
      selectedAvatar = avatar;
      $('#child-avatar').value = avatar;
      renderAvatarPicker();
    });
    picker.appendChild(btn);
  });
}

function renderColorPicker() {
  const picker = $('#color-picker');
  picker.innerHTML = '';

  COLORS.forEach(color => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'color-option' + (color === selectedColor ? ' selected' : '');
    btn.style.setProperty('--color', color);
    btn.addEventListener('click', () => {
      selectedColor = color;
      $('#child-color').value = color;
      renderColorPicker();
    });
    picker.appendChild(btn);
  });
}

function openChildModal(child = null) {
  if (child) {
    editingChildId = child.id;
    $('#child-modal-title').textContent = '编辑孩子';
    $('#child-name').value = child.name;
    selectedAvatar = child.avatar;
    selectedColor = child.color;
    $('#child-avatar').value = child.avatar;
    $('#child-color').value = child.color;
  } else {
    editingChildId = null;
    childForm.reset();
    selectedAvatar = AVATARS[0];
    selectedColor = COLORS[0];
    $('#child-modal-title').textContent = '添加孩子';
    $('#child-avatar').value = selectedAvatar;
    $('#child-color').value = selectedColor;
  }

  renderAvatarPicker();
  renderColorPicker();
  childModal.classList.add('active');
}

function closeChildModal() {
  childModal.classList.remove('active');
  editingChildId = null;
}

/* ------------------- 事件绑定 ------------------- */

function attachListeners() {
  // 底部导航切换 + 顶部功能图标
  $$('.nav-item, .top-action').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 点击头像回到首页
  $('#top-avatar').addEventListener('click', () => switchTab('home'));

  // 添加任务按钮
  $$('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.type));
  });

  // 弹窗关闭
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-cancel').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 添加任务表单
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = $('#task-type').value;
    const name = $('#task-name').value.trim();
    const points = $('#task-points').value;
    const icon = $('#task-icon').value;
    const category = $('#task-category').value;

    if (!name) {
      alert('请输入任务名称');
      return;
    }
    if (!points || Number(points) < 1) {
      alert('请输入有效的积分（至少为 1）');
      return;
    }
    if (!icon) {
      alert('请选择一个图标');
      return;
    }
    if (!category) {
      alert('请选择一个分类');
      return;
    }

    if (editingTaskId) {
      const task = state.tasks.find(t => t.id === editingTaskId);
      if (task) {
        task.name = name;
        task.points = Number(points);
        task.icon = icon;
        task.category = category;
        saveState();
        renderActive();
      }
    } else {
      addTask(name, points, type, icon, category);
    }

    closeModal();
  });

  // 添加/编辑孩子弹窗
  $('#btn-add-child').addEventListener('click', () => openChildModal());
  $('#child-modal-close').addEventListener('click', closeChildModal);
  $('#child-modal-cancel').addEventListener('click', closeChildModal);
  childModal.addEventListener('click', (e) => {
    if (e.target === childModal) closeChildModal();
  });

  childForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = $('#child-name').value.trim();
    const avatar = $('#child-avatar').value;
    const color = $('#child-color').value;

    if (!name) {
      alert('请输入孩子姓名');
      return;
    }
    if (!avatar) {
      alert('请选择一个头像');
      return;
    }
    if (!color) {
      alert('请选择一个主题色');
      return;
    }

    if (editingChildId) {
      updateChild(editingChildId, name, avatar, color);
    } else {
      const newChild = addChild(name, avatar, color);
      currentChildId = newChild.id;
    }

    closeChildModal();
  });

  // 宠物相关事件
  const btnAdoptPet = $('#btn-adopt-pet');
  if (btnAdoptPet) btnAdoptPet.addEventListener('click', openAdoptPetModal);

  $('#pet-adopt-modal-close').addEventListener('click', closeAdoptPetModal);
  $('#pet-adopt-modal-cancel').addEventListener('click', closeAdoptPetModal);

  const petAdoptModal = $('#pet-adopt-modal');
  if (petAdoptModal) {
    petAdoptModal.addEventListener('click', (e) => {
      if (e.target === petAdoptModal) closeAdoptPetModal();
    });
  }

  const petAdoptForm = $('#pet-adopt-form');
  if (petAdoptForm) {
    petAdoptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#pet-adopt-name').value.trim();
      if (!name) {
        alert('请给宠物起个名字');
        return;
      }
      adoptPet(currentChildId, name);
      closeAdoptPetModal();
    });
  }

  const btnFeedPet = $('#btn-feed-pet');
  if (btnFeedPet) {
    btnFeedPet.addEventListener('click', () => {
      const result = feedPet(currentChildId);
      if (result && result.success && result.evolved) {
        const pet = getCurrentPet();
        const stageInfo = getPetStageInfo(pet.stage);
        setTimeout(() => alert(`🎉 升级到 ${stageInfo.name}，解锁「${stageInfo.skillName}」技能！`), 200);
      }
    });
  }

  const btnExchangeFeed = $('#btn-exchange-feed');
  if (btnExchangeFeed) {
    btnExchangeFeed.addEventListener('click', () => exchangeFeed(currentChildId));
  }

  // 数据导出/导入
  $('#btn-export-data').addEventListener('click', () => {
    const data = {
      app: 'family-points',
      version: state.version,
      exportedAt: new Date().toISOString(),
      children: state.children,
      tasks: state.tasks,
      records: state.records
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `family-points-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  $('#btn-import-data').addEventListener('click', () => {
    $('#import-file-input').click();
  });

  $('#import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.children) || !Array.isArray(data.tasks)) {
          alert('备份文件格式不正确');
          return;
        }
        if (!confirm('导入将覆盖当前所有数据，确定继续吗？')) return;

        state = {
          version: data.version || APP_VERSION,
          children: data.children,
          tasks: data.tasks,
          records: Array.isArray(data.records) ? data.records : []
        };
        migrateData();
        currentChildId = state.children[0]?.id || null;
        saveState();
        renderAll();
        alert('数据导入成功');
      } catch (err) {
        alert('导入失败：文件无法解析');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // 清除所有数据
  $('#btn-clear-data').addEventListener('click', () => {
    if (confirm('确定清除所有数据吗？此操作不可恢复。')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });

  // 点击页面其他位置收回已展开的删除按钮
  document.addEventListener('click', (e) => {
    const swiped = e.target.closest('.record-item.swiped');
    if (!swiped) {
      $$('.record-item.swiped').forEach(item => item.classList.remove('swiped'));
    }
  });
}

/* ------------------- 启动 ------------------- */

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  attachListeners();
  renderAll();
});
