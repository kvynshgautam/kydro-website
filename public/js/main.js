/**
 * ==========================================================================
 * KYDRO Landing Page Interactive Script
 * Engineered by Kavyansh Gautam (KG)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  fetchReleaseInfo();
  initSmoothScroll();
});

// Interactive Water Bill Calculator
function initCalculator() {
  let campers = 20; // 20 campers (400 Litres)
  let people = 4;   // 4 roommates
  const ratePerCamper = 25; // ₹25 per 20L Camper

  const countCampersEl = document.getElementById('countCampers');
  const countPeopleEl = document.getElementById('countPeople');
  const resTotalLitresEl = document.getElementById('resTotalLitres');
  const resTotalBillEl = document.getElementById('resTotalBill');
  const resPerPersonEl = document.getElementById('resPerPerson');

  const btnDecCampers = document.getElementById('btnDecCampers');
  const btnIncCampers = document.getElementById('btnIncCampers');
  const btnDecPeople = document.getElementById('btnDecPeople');
  const btnIncPeople = document.getElementById('btnIncPeople');

  function update() {
    if (countCampersEl) countCampersEl.textContent = campers;
    if (countPeopleEl) countPeopleEl.textContent = people;

    const totalLitres = campers * 20;
    const totalBill = campers * ratePerCamper;
    const perPerson = Math.round(totalBill / Math.max(1, people));

    if (resTotalLitresEl) resTotalLitresEl.textContent = `${totalLitres}L`;
    if (resTotalBillEl) resTotalBillEl.textContent = `₹${totalBill}`;
    if (resPerPersonEl) resPerPersonEl.textContent = `₹${perPerson}`;
  }

  if (btnDecCampers) {
    btnDecCampers.addEventListener('click', () => {
      if (campers > 1) {
        campers--;
        update();
      }
    });
  }

  if (btnIncCampers) {
    btnIncCampers.addEventListener('click', () => {
      campers++;
      update();
    });
  }

  if (btnDecPeople) {
    btnDecPeople.addEventListener('click', () => {
      if (people > 1) {
        people--;
        update();
      }
    });
  }

  if (btnIncPeople) {
    btnIncPeople.addEventListener('click', () => {
      people++;
      update();
    });
  }

  update();
}

// Fetch and Render Dynamic App Release & Version Intel
async function fetchReleaseInfo() {
  try {
    let res = await fetch('update.json');
    if (!res.ok) res = await fetch('/api/updates');
    if (!res.ok) return;
    const data = await res.json();
    
    // Version elements
    const apkVer = data.latest_version ? `v${data.latest_version}` : 'v1.1.0';
    const apkDate = data.updated_at || (data.release_date ? `${data.release_date}` : 'Recently Updated');
    const apkSize = data.file_size || '17.5 MB';
    
    // Update IDs
    const verEl = document.getElementById('apkVersion');
    if (verEl) verEl.textContent = apkVer;

    const verTextEl = document.getElementById('apkVersionText');
    if (verTextEl) verTextEl.textContent = apkVer;

    const navVerEl = document.getElementById('navVersionBadge');
    if (navVerEl) navVerEl.textContent = apkVer;

    const updatedEl = document.getElementById('apkUpdatedTime');
    if (updatedEl) {
      updatedEl.innerHTML = `
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>Updated: ${apkDate}</span>
      `;
    }

    const sizeEl = document.getElementById('apkSize');
    if (sizeEl) sizeEl.textContent = apkSize;

    const heroBadge = document.getElementById('heroVersionBadge');
    if (heroBadge) {
      heroBadge.textContent = `BUILD ${apkVer} IS LIVE • UPDATED ${apkDate.toUpperCase()} • 3D EMBLEM EDITION`;
    }

    const footerVerEl = document.getElementById('footerVersion');
    if (footerVerEl) {
      footerVerEl.textContent = `${apkVer} (${apkDate})`;
    }
  } catch (err) {
    console.log('Release metadata offline, using fallback defaults.');
  }
}

// Smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
