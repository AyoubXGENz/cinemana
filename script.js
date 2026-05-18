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
function showPage(name) {
  if (!VALID_PAGES.includes(name)) name = 'home';

  _renderPage(name);

  // Update URL hash WITHOUT triggering popstate
  const newHash = '#' + name;
  if (window.location.hash !== newHash) {
    history.pushState({ page: name }, '', newHash);
  }
}

function _renderPage(name) {
  if (!VALID_PAGES.includes(name)) name = 'home';

  const target = document.getElementById('page-' + name);
  if (!target) return;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active', 'page-enter');
  });

  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');

  // Show target page with animation
  target.classList.add('active', 'page-enter');
  target.addEventListener('animationend', () => {
    target.classList.remove('page-enter');
  }, { once: true });

  // Update tab title
  document.title = PAGE_TITLES[name] || PAGE_TITLES.home;

  // Scroll to top
  window.scrollTo(0, 0);

  // Close mobile menu
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');

  // Rebuild seat map if needed
  if (name === 'reservation') buildSeatMap();
}

// ===== BROWSER BACK / FORWARD =====
window.addEventListener('popstate', function(e) {
  const page = (e.state && e.state.page) ? e.state.page : pageFromHash();
  _renderPage(page);
});

function pageFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

// ===== INITIAL LOAD =====
window.addEventListener('DOMContentLoaded', function() {
  const page = pageFromHash();
  history.replaceState({ page: page }, '', '#' + page);
  _renderPage(page);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const nl = document.getElementById('navLinks');
  if (nl) nl.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', function(e) {
  const nl  = document.getElementById('navLinks');
  const ham = document.querySelector('.hamburger');
  if (nl && nl.classList.contains('open')) {
    if (!nl.contains(e.target) && ham && !ham.contains(e.target)) {
      nl.classList.remove('open');
    }
  }
});

// Close menu/modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const nl = document.getElementById('navLinks');
    if (nl) nl.classList.remove('open');
    const modal = document.getElementById('memberModal');
    if (modal && modal.classList.contains('open')) closeModal();
  }
});

// ===== ACTIVITY FILTER =====
function filterAct(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.querySelectorAll('.activity-card').forEach(function(c) {
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
  setTimeout(function() {
    var fn = document.getElementById('f-name');
    if (fn) fn.focus();
  }, 50);
}

function closeModal() {
  document.getElementById('memberModal').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('memberModal')) closeModal();
}

function submitMembership() {
  var name  = document.getElementById('f-name').value.trim();
  var email = document.getElementById('f-email').value.trim();
  var phone = document.getElementById('f-phone').value.trim();
  var city  = document.getElementById('f-city').value;
  if (!name || !email || !phone || !city) {
    alert('يرجى ملء جميع الحقول الإلزامية · Veuillez remplir tous les champs obligatoires');
    return;
  }
  var plan   = document.getElementById('f-plan').value;
  var prefix = plan === 'Cinéphile' ? 'CIN' : plan === 'Cinéaste' ? 'CST' : 'MCN';
  var num    = Math.floor(1000 + Math.random() * 9000);
  var year   = new Date().getFullYear().toString().slice(2);
  document.getElementById('generatedId').textContent = prefix + '-' + year + num;
  document.getElementById('memberForm').style.display = 'none';
  document.getElementById('memberSuccess').classList.add('show');
}

// ===== RESERVATION =====
var VIP_ROWS      = ['A','B','C'];
var STD_ROWS      = ['D','E','F','G','H'];
var SEATS_PER_ROW = 12;
var TAKEN = {
  'A': [2,5,8], 'B': [1,4,7,10], 'C': [3,6,9],
  'D': [2,5,8,11], 'E': [1,3,6,9], 'F': [4,7,10],
  'G': [2,5,8], 'H': [1,4,6,9,11]
};
var VIP_PRICE     = 120;
var STD_PRICE     = 60;
var selectedSeats = [];
var currentShowtime = '14h00';

function selectShowtime(btn, time) {
  document.querySelectorAll('.showtime-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  currentShowtime = time;
  selectedSeats   = [];
  buildSeatMap();
  updatePanel();
}

function buildSeatMap() {
  var map = document.getElementById('seatMap');
  if (!map) return;
  map.innerHTML = '';
  var allRows = VIP_ROWS.concat(STD_ROWS);
  allRows.forEach(function(row, idx) {
    if (idx === VIP_ROWS.length) {
      var divEl = document.createElement('div');
      divEl.className = 'vip-divider';
      divEl.innerHTML = '<span>Standard · عادي</span>';
      divEl.style.width = '100%';
      map.appendChild(divEl);
    }
    var rowEl = document.createElement('div');
    rowEl.className = 'seat-row';
    var lbl = document.createElement('div');
    lbl.className = 'row-label';
    lbl.textContent = row;
    rowEl.appendChild(lbl);
    for (var i = 1; i <= SEATS_PER_ROW; i++) {
      if (i === 7) {
        var g = document.createElement('div');
        g.className = 'seat-gap';
        rowEl.appendChild(g);
      }
      var s = document.createElement('div');
      var isVip   = VIP_ROWS.indexOf(row) !== -1;
      var isTaken = (TAKEN[row] || []).indexOf(i) !== -1;
      s.className   = 'seat ' + (isTaken ? 'taken' : isVip ? 'vip' : 'normal');
      s.dataset.id  = row + i;
      s.dataset.vip = isVip ? '1' : '0';
      s.title       = row + i + (isVip ? ' (VIP)' : '');
      if (!isTaken) {
        (function(seat) {
          seat.onclick = function() { toggleSeat(seat); };
        })(s);
      }
      if (selectedSeats.indexOf(row + i) !== -1) s.classList.add('selected');
      rowEl.appendChild(s);
    }
    var lbl2 = document.createElement('div');
    lbl2.className   = 'row-label';
    lbl2.textContent = row;
    rowEl.appendChild(lbl2);
    map.appendChild(rowEl);
  });
}

function toggleSeat(el) {
  var id  = el.dataset.id;
  var idx = selectedSeats.indexOf(id);
  if (idx !== -1) {
    selectedSeats.splice(idx, 1);
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
  var count = selectedSeats.length;
  document.getElementById('selectedCount').textContent = count;
  var total = 0;
  selectedSeats.forEach(function(id) {
    total += VIP_ROWS.indexOf(id[0]) !== -1 ? VIP_PRICE : STD_PRICE;
  });
  document.getElementById('totalPrice').textContent = total + ' MAD';
  document.getElementById('seatsList').textContent  = count > 0 ? selectedSeats.join(' · ') : '—';
  document.getElementById('resConfirmBtn').disabled = count === 0;
}

function confirmReservation() {
  var name = document.getElementById('r-name').value.trim();
  if (!name) { alert('يرجى إدخال اسمك · Veuillez entrer votre nom'); return; }
  var ticketNum = 'TKT-' + currentShowtime.replace(':','') + '-' + Math.floor(1000 + Math.random()*9000);
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
