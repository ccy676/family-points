/* ============================================================
   家庭孩子积分管理网页应用
   ============================================================ */

const STORAGE_KEY = 'behaviorAppData';
const APP_VERSION = 3;

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

let state = { version: 1, children: [], tasks: [], records: [] };
let currentChildId = null;
let currentTab = 'home';
let selectedIcon = null;
let selectedCategory = 'life';
let homeFilters = { earn: 'all', consume: 'all' };
let editingTaskId = null;

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

    // 为旧孩子补充头像
    if (state.children) {
      state.children.forEach(child => {
        if (!child.avatar) {
          child.avatar = child.name.charAt(0);
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
    children: JSON.parse(JSON.stringify(DEFAULT_CHILDREN)),
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
  ['earn', 'consume'].forEach(type => {
    renderCategoryTabs(type);

    const grid = $('#' + type + '-grid');
    grid.innerHTML = '';

    const filter = homeFilters[type];
    state.tasks
      .filter(t => t.type === type && (filter === 'all' || t.category === filter))
      .forEach(task => {
        grid.appendChild(createTaskCard(task));
      });
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
  // 设置页静态展示，无需动态渲染
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
