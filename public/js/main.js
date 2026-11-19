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

// Fetch APK Release Info
async function fetchReleaseInfo() {
  try {
    let res = await fetch('update.json');
    if (!res.ok) res = await fetch('/api/updates');
    if (!res.ok) return;
    const data = await res.json();
    
    const sizeEl = document.getElementById('apkSize');
    const verEl = document.getElementById('apkVersion');
    if (sizeEl && data.file_size) sizeEl.textContent = data.file_size;
    if (verEl && data.latest_version) verEl.textContent = `v${data.latest_version}`;
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
