// ===== PAGE TITLES =====
const PAGE_TITLES = {
  home:        'Cinémanā Foundation · سينيمانا',
  about:       'À Propos · من نحن — Cinémanā',
  activities:  'Activités · أنشطة — Cinémanā',
  reservation: 'Réservation · حجز — Cinémanā',
  membership:  'Devenir Membre · عضوية — Cinémanā',
};

const VALID_PAGES = Object.keys(PAGE_TITLES);

// ===== NAVIGATION =====
function showPage(name, replace = false) {
  if (!VALID_PAGES.includes(name)) name = 'home';
  const hash = '#' + name;
  if (replace) {
    history.replaceState({ page: name }, '', hash);
  } else {
    if (window.location.hash === hash) return;
    history.pushState({ page: name }, '', hash);
  }
  _renderPage(name);
}

function _renderPage(name) {
  const allPages = document.querySelectorAll('.page');
  const target   = document.getElementById('page-' + name);
  if (!target) return;

  allPages.forEach(p => p.classList.remove('active', 'page-enter'));

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');

  target.classList.add('active', 'page-enter');
  target.addEventListener('animationend', () => {
    target.classList.remove('page-enter');
  }, { once: true });

  document.title = PAGE_TITLES[name] || PAGE_TITLES.home;
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.getElementById('navLinks').classList.remove('open');

  if (name === 'reservation') buildSeatMap();
}

// ===== BROWSER BACK / FORWARD =====
window.addEventListener('popstate', (e) => {
  const page = (e.state && e.state.page) || pageFromHash();
  _renderPage(page);
});

function pageFromHash() {
  const hash = window.location.hash.replace('#', '');
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

// ===== INITIAL LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  const page = pageFromHash();
  history.replaceState({ page }, '', '#' + page);
  _renderPage(page);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nl  = document.getElementById('navLinks');
  const ham = document.querySelector('.hamburger');
  if (nl && nl.classList.contains('open') && !nl.contains(e.target) && !ham.contains(e.target)) {
    nl.classList.remove('open');
  }
});

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('navLinks').classList.remove('open');
    const modal = document.getElementById('memberModal');
    if (modal && modal.classList.contains('open')) closeModal();
  }
});

// ===== ACTIVITY FILTER =====
function filterAct(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.activity-card').forEach(c => {
    c.style.display = (type === 'all' || c.dataset.type === type) ? '' : 'none';
  });
}

// ===== MEMBERSHIP MODAL =====
function openMemberForm(tier, price) {
  document.getElementById('modalTier').textContent = tier + ' — ' + price + ' MAD/an';
  document.getElementById('f-plan').value = tier;
  document.getElementById('memberModal').classList.add('open');
  document.getElementById('memberForm').style.display = 'block';
  document.getElementById('memberSuccess').classList.remove('show');
  setTimeout(() => document.getElementById('f-name').focus(), 50);
}

function closeModal() {
  document.getElementById('memberModal').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('memberModal')) closeModal();
}

function submitMembership() {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const city  = document.getElementById('f-city').value;
  if (!name || !email || !phone || !city) {
    alert('يرجى ملء جميع الحقول الإلزامية · Veuillez remplir tous les champs obligatoires');
    return;
  }
  const plan   = document.getElementById('f-plan').value;
  const prefix = plan === 'Cinéphile' ? 'CIN' : plan === 'Cinéaste' ? 'CST' : 'MCN';
  const num    = Math.floor(1000 + Math.random() * 9000);
  const year   = new Date().getFullYear().toString().slice(2);
  document.getElementById('generatedId').textContent = prefix + '-' + year + num;
  document.getElementById('memberForm').style.display = 'none';
  document.getElementById('memberSuccess').classList.add('show');
}

// ===== RESERVATION =====
const VIP_ROWS      = ['A','B','C'];
const STD_ROWS      = ['D','E','F','G','H'];
const SEATS_PER_ROW = 12;
const TAKEN = {
  'A': [2,5,8], 'B': [1,4,7,10], 'C': [3,6,9],
  'D': [2,5,8,11], 'E': [1,3,6,9], 'F': [4,7,10],
  'G': [2,5,8], 'H': [1,4,6,9,11]
};
const VIP_PRICE = 120;
const STD_PRICE = 60;
let selectedSeats   = [];
let currentShowtime = '14h00';

function selectShowtime(btn, time) {
  document.querySelectorAll('.showtime-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentShowtime = time;
  selectedSeats   = [];
  buildSeatMap();
  updatePanel();
}

function buildSeatMap() {
  const map = document.getElementById('seatMap');
  if (!map) return;
  map.innerHTML = '';
  const allRows = [...VIP_ROWS, ...STD_ROWS];
  allRows.forEach((row, idx) => {
    if (idx === VIP_ROWS.length) {
      const divEl = document.createElement('div');
      divEl.className = 'vip-divider';
      divEl.innerHTML = '<span>Standard · عادي</span>';
      divEl.style.width = '100%';
      map.appendChild(divEl);
    }
    const rowEl = document.createElement('div');
    rowEl.className = 'seat-row';
    const lbl = document.createElement('div');
    lbl.className = 'row-label';
    lbl.textContent = row;
    rowEl.appendChild(lbl);
    for (let i = 1; i <= SEATS_PER_ROW; i++) {
      if (i === 7) {
        const g = document.createElement('div');
        g.className = 'seat-gap';
        rowEl.appendChild(g);
      }
      const s = document.createElement('div');
      const isVip   = VIP_ROWS.includes(row);
      const isTaken = (TAKEN[row] || []).includes(i);
      s.className   = 'seat ' + (isTaken ? 'taken' : isVip ? 'vip' : 'normal');
      s.dataset.id  = row + i;
      s.dataset.vip = isVip ? '1' : '0';
      s.title       = row + i + (isVip ? ' (VIP)' : '');
      if (!isTaken) s.onclick = () => toggleSeat(s);
      if (selectedSeats.includes(row + i)) s.classList.add('selected');
      rowEl.appendChild(s);
    }
    const lbl2 = document.createElement('div');
    lbl2.className   = 'row-label';
    lbl2.textContent = row;
    rowEl.appendChild(lbl2);
    map.appendChild(rowEl);
  });
}

function toggleSeat(el) {
  const id = el.dataset.id;
  if (selectedSeats.includes(id)) {
    selectedSeats = selectedSeats.filter(s => s !== id);
    el.classList.remove('selected');
  } else {
    if (selectedSeats.length >= 6) {
      alert('لا يمكن اختيار أكثر من 6 مقاعد · Maximum 6 sièges');
      return;
    }
    selectedSeats.push(id);
    el.classList.add('selected');
  }
  updatePanel();
}

function updatePanel() {
  const count = selectedSeats.length;
  document.getElementById('selectedCount').textContent = count;
  let total = 0;
  selectedSeats.forEach(id => {
    total += VIP_ROWS.includes(id[0]) ? VIP_PRICE : STD_PRICE;
  });
  document.getElementById('totalPrice').textContent = total + ' MAD';
  document.getElementById('seatsList').textContent  = count > 0 ? selectedSeats.join(' · ') : '—';
  document.getElementById('resConfirmBtn').disabled = count === 0;
}

function confirmReservation() {
  const name = document.getElementById('r-name').value.trim();
  if (!name) { alert('يرجى إدخال اسمك · Veuillez entrer votre nom'); return; }
  const ticketNum = 'TKT-' + currentShowtime.replace(':','') + '-' + Math.floor(1000 + Math.random()*9000);
  document.getElementById('ticketNum').textContent   = ticketNum;
  document.getElementById('resPanel').style.display = 'none';
  document.getElementById('resSuccess').classList.add('show');
}

function resetReservation() {
  selectedSeats = [];
  document.getElementById('resPanel').style.display = '';
  document.getElementById('resSuccess').classList.remove('show');
  document.getElementById('r-name').value     = '';
  document.getElementById('r-memberid').value = '';
  buildSeatMap();
  updatePanel();
}
