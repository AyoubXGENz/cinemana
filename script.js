// ===== NAVIGATION =====
function showPage(name, pushState = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0,0);
  const nl = document.getElementById('navLinks');
  nl.classList.remove('open');
  if (name === 'reservation') buildSeatMap();

  // Push state to browser history
  if (pushState) {
    history.pushState({ page: name }, '', '#' + name);
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
  const page = e.state ? e.state.page : 'home';
  showPage(page, false);
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== ACTIVITY FILTER =====
function filterAct(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.activity-card').forEach(c => {
    if (type === 'all' || c.dataset.type === type) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
}

// ===== MEMBERSHIP MODAL =====
function openMemberForm() {
  document.getElementById('memberModal').classList.add('open');
  document.getElementById('memberForm').style.display = 'block';
  document.getElementById('memberSuccess').classList.remove('show');
}

function closeModal() {
  document.getElementById('memberModal').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('memberModal')) closeModal();
}

function submitMembership() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  if (!name || !email || !phone) {
    alert('يرجى ملء جميع الحقول الإلزامية · Veuillez remplir tous les champs obligatoires');
    return;
  }
  // Generate member ID
  const num = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear().toString().slice(2);
  const memberId = 'MBR-' + year + num;
  document.getElementById('generatedId').textContent = memberId;
  document.getElementById('memberForm').style.display = 'none';
  document.getElementById('memberSuccess').classList.add('show');
}

// ===== RESERVATION =====
const VIP_ROWS = ['A','B','C'];
const STD_ROWS = ['D','E','F','G','H'];
const SEATS_PER_ROW = 12;
const TAKEN = {
  'A': [2,5,8], 'B': [1,4,7,10], 'C': [3,6,9],
  'D': [2,5,8,11], 'E': [1,3,6,9], 'F': [4,7,10],
  'G': [2,5,8], 'H': [1,4,6,9,11]
};
const VIP_PRICE = 120;
const STD_PRICE = 60;
let selectedSeats = [];
let currentShowtime = '14h00';

function selectShowtime(btn, time) {
  document.querySelectorAll('.showtime-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentShowtime = time;
  selectedSeats = [];
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
        g.className = 'seat-gap'; rowEl.appendChild(g);
      }
      const s = document.createElement('div');
      const isVip = VIP_ROWS.includes(row);
      const isTaken = (TAKEN[row] || []).includes(i);
      s.className = 'seat ' + (isTaken ? 'taken' : isVip ? 'vip' : 'normal');
      s.dataset.id = row + i;
      s.dataset.vip = isVip ? '1' : '0';
      s.title = row + i + (isVip ? ' (VIP)' : '');
      if (!isTaken) s.onclick = () => toggleSeat(s);
      if (selectedSeats.includes(row + i)) s.classList.add('selected');
      rowEl.appendChild(s);
    }
    const lbl2 = document.createElement('div');
    lbl2.className = 'row-label'; lbl2.textContent = row;
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
    if (selectedSeats.length >= 6) { alert('لا يمكن اختيار أكثر من 6 مقاعد · Maximum 6 sièges'); return; }
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
    const row = id[0];
    total += VIP_ROWS.includes(row) ? VIP_PRICE : STD_PRICE;
  });
  document.getElementById('totalPrice').textContent = total + ' MAD';
  document.getElementById('seatsList').textContent = count > 0 ? selectedSeats.join(' · ') : '—';
  document.getElementById('resConfirmBtn').disabled = count === 0;
}

function confirmReservation() {
  const name = document.getElementById('r-name').value.trim();
  if (!name) { alert('يرجى إدخال اسمك · Veuillez entrer votre nom'); return; }
  const ticketNum = 'TKT-' + currentShowtime.replace(':','') + '-' + Math.floor(1000 + Math.random()*9000);
  document.getElementById('ticketNum').textContent = ticketNum;
  document.getElementById('resPanel').style.display = 'none';
  document.getElementById('resSuccess').classList.add('show');
}

function resetReservation() {
  selectedSeats = [];
  document.getElementById('resPanel').style.display = '';
  document.getElementById('resSuccess').classList.remove('show');
  document.getElementById('r-name').value = '';
  document.getElementById('r-memberid').value = '';
  buildSeatMap();
  updatePanel();
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', function() {
  buildSeatMap();
  // Set initial history state based on URL hash, or default to home
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'about', 'activities', 'reservation', 'membership'];
  const startPage = validPages.includes(hash) ? hash : 'home';
  history.replaceState({ page: startPage }, '', '#' + startPage);
  if (startPage !== 'home') showPage(startPage, false);
});
