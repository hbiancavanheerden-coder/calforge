/* CalForge - Main JS */

// ── NAV BURGER ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('nav-burger');
  const links  = document.getElementById('nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // ── SEARCH ─────────────────────────────────────
  const searchInput = document.getElementById('site-search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.tool-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = text.includes(q) ? '' : 'none';
      });
      // Show/hide empty category sections
      document.querySelectorAll('.cat-section').forEach(sec => {
        const visible = [...sec.querySelectorAll('.tool-btn')].some(b => b.style.display !== 'none');
        sec.style.display = visible ? '' : 'none';
      });
    });
  }
});

// ── TABS ───────────────────────────────────────────
function initTabs(container) {
  const btns   = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panels[i].classList.add('active');
    });
  });
}
document.querySelectorAll('.tabs-wrapper').forEach(initTabs);

// ── RESULTS ────────────────────────────────────────
function showResult(boxId, label, value, sub = '') {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.querySelector('.result-label').textContent = label;
  box.querySelector('.result-value').textContent = value;
  const subEl = box.querySelector('.result-sub');
  if (subEl) subEl.textContent = sub;
  box.classList.add('show');
}

function fmtNum(n, decimals = 2) {
  if (isNaN(n) || !isFinite(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtCurrency(n, symbol = '$') {
  return symbol + fmtNum(n);
}

// ── MORTGAGE CALCULATOR ────────────────────────────
function calcMortgage() {
  const p = parseFloat(document.getElementById('m-principal')?.value) || 0;
  const r = (parseFloat(document.getElementById('m-rate')?.value) || 0) / 100 / 12;
  const n = (parseFloat(document.getElementById('m-years')?.value) || 0) * 12;
  const sym = document.getElementById('m-currency')?.value || '$';
  if (!p || !r || !n) { alert('Please fill all fields'); return; }
  const monthly = (p * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
  const total   = monthly * n;
  const interest = total - p;
  showResult('m-result', 'Monthly Payment', fmtCurrency(monthly, sym), `Total: ${fmtCurrency(total, sym)} | Interest: ${fmtCurrency(interest, sym)}`);
}

// ── LOAN CALCULATOR ───────────────────────────────
function calcLoan() {
  const p = parseFloat(document.getElementById('l-principal')?.value) || 0;
  const r = (parseFloat(document.getElementById('l-rate')?.value) || 0) / 100 / 12;
  const n = (parseFloat(document.getElementById('l-months')?.value) || 0);
  const sym = document.getElementById('l-currency')?.value || '$';
  if (!p || !r || !n) { alert('Please fill all fields'); return; }
  const monthly = (p * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
  const total   = monthly * n;
  showResult('l-result', 'Monthly Payment', fmtCurrency(monthly, sym), `Total repaid: ${fmtCurrency(total, sym)}`);
}

// ── ROI CALCULATOR ────────────────────────────────
function calcROI() {
  const gain = parseFloat(document.getElementById('roi-gain')?.value) || 0;
  const cost = parseFloat(document.getElementById('roi-cost')?.value) || 1;
  const roi = ((gain - cost) / cost) * 100;
  showResult('roi-result', 'Return on Investment', fmtNum(roi) + '%', `Net gain: ${fmtCurrency(gain - cost)}`);
}

// ── COMPOUND INTEREST ─────────────────────────────
function calcCompound() {
  const p = parseFloat(document.getElementById('ci-p')?.value) || 0;
  const r = (parseFloat(document.getElementById('ci-r')?.value) || 0) / 100;
  const n = parseFloat(document.getElementById('ci-n')?.value) || 12;
  const t = parseFloat(document.getElementById('ci-t')?.value) || 0;
  const sym = document.getElementById('ci-currency')?.value || '$';
  const a = p * Math.pow(1 + r/n, n*t);
  showResult('ci-result', 'Final Amount', fmtCurrency(a, sym), `Interest earned: ${fmtCurrency(a - p, sym)}`);
}

// ── SAVINGS ──────────────────────────────────────
function calcSavings() {
  const pv = parseFloat(document.getElementById('sv-pv')?.value) || 0;
  const pmt = parseFloat(document.getElementById('sv-pmt')?.value) || 0;
  const r = (parseFloat(document.getElementById('sv-r')?.value) || 0) / 100 / 12;
  const n = (parseFloat(document.getElementById('sv-y')?.value) || 0) * 12;
  const sym = document.getElementById('sv-currency')?.value || '$';
  const fv = pv * Math.pow(1+r, n) + pmt * ((Math.pow(1+r, n) - 1) / r);
  showResult('sv-result', 'Future Value', fmtCurrency(fv, sym), `Total contributions: ${fmtCurrency(pv + pmt * n, sym)}`);
}

// ── BMI ──────────────────────────────────────────
function calcBMI() {
  const unit = document.getElementById('bmi-unit')?.value;
  let h = parseFloat(document.getElementById('bmi-h')?.value) || 0;
  let w = parseFloat(document.getElementById('bmi-w')?.value) || 0;
  let bmi;
  if (unit === 'metric') {
    bmi = w / ((h/100) ** 2);
  } else {
    const hIn = h;
    bmi = (w / (hIn * hIn)) * 703;
  }
  let cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';
  showResult('bmi-result', 'Your BMI', fmtNum(bmi), `Category: ${cat}`);
}

// ── BMR ──────────────────────────────────────────
function calcBMR() {
  const gender = document.getElementById('bmr-gender')?.value;
  const w = parseFloat(document.getElementById('bmr-w')?.value) || 0;
  const h = parseFloat(document.getElementById('bmr-h')?.value) || 0;
  const a = parseFloat(document.getElementById('bmr-a')?.value) || 0;
  let bmr;
  if (gender === 'male') bmr = 10*w + 6.25*h - 5*a + 5;
  else bmr = 10*w + 6.25*h - 5*a - 161;
  const activity = parseFloat(document.getElementById('bmr-act')?.value) || 1.2;
  const tdee = bmr * activity;
  showResult('bmr-result', 'Daily Calories (TDEE)', fmtNum(tdee, 0) + ' kcal', `BMR: ${fmtNum(bmr, 0)} kcal`);
}

// ── CALORIE ──────────────────────────────────────
function calcCalorie() {
  const gender = document.getElementById('cal-gender')?.value;
  const w = parseFloat(document.getElementById('cal-w')?.value) || 0;
  const h = parseFloat(document.getElementById('cal-h')?.value) || 0;
  const a = parseFloat(document.getElementById('cal-a')?.value) || 0;
  const act = parseFloat(document.getElementById('cal-act')?.value) || 1.2;
  const goal = document.getElementById('cal-goal')?.value;
  let bmr;
  if (gender === 'male') bmr = 10*w + 6.25*h - 5*a + 5;
  else bmr = 10*w + 6.25*h - 5*a - 161;
  let tdee = bmr * act;
  let target = goal === 'lose' ? tdee - 500 : goal === 'gain' ? tdee + 500 : tdee;
  showResult('cal-result', 'Daily Calorie Target', fmtNum(target, 0) + ' kcal', `Maintenance: ${fmtNum(tdee, 0)} kcal`);
}

// ── WATER INTAKE ─────────────────────────────────
function calcWater() {
  const w = parseFloat(document.getElementById('wa-w')?.value) || 0;
  const act = document.getElementById('wa-act')?.value;
  let base = w * 0.033;
  if (act === 'moderate') base += 0.35;
  if (act === 'high') base += 0.7;
  showResult('wa-result', 'Daily Water Intake', fmtNum(base, 1) + ' Litres', `≈ ${Math.round(base * 1000 / 250)} cups of water`);
}

// ── AGE ──────────────────────────────────────────
function calcAge() {
  const dob = new Date(document.getElementById('age-dob')?.value);
  const today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();
  if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((today - dob) / 86400000);
  showResult('age-result', 'Your Age', `${years} years`, `${years}y ${months}m ${days}d | ${totalDays.toLocaleString()} days lived`);
}

// ── PERCENTAGE ──────────────────────────────────
function calcPct() {
  const mode = document.getElementById('pct-mode')?.value;
  const a = parseFloat(document.getElementById('pct-a')?.value) || 0;
  const b = parseFloat(document.getElementById('pct-b')?.value) || 0;
  let res;
  if (mode === 'of') res = (a / 100) * b;
  else if (mode === 'is') res = (a / b) * 100;
  else res = b + (b * a / 100);
  showResult('pct-result', 'Result', fmtNum(res));
}

// ── VAT ──────────────────────────────────────────
function calcVAT() {
  const amount = parseFloat(document.getElementById('vat-amount')?.value) || 0;
  const rate = parseFloat(document.getElementById('vat-rate')?.value) || 0;
  const mode = document.getElementById('vat-mode')?.value;
  const sym = document.getElementById('vat-currency')?.value || '$';
  let vatAmt, total;
  if (mode === 'add') {
    vatAmt = amount * rate / 100;
    total = amount + vatAmt;
    showResult('vat-result', 'Total (incl. VAT)', fmtCurrency(total, sym), `VAT amount: ${fmtCurrency(vatAmt, sym)}`);
  } else {
    vatAmt = amount - (amount / (1 + rate / 100));
    total = amount - vatAmt;
    showResult('vat-result', 'Price (excl. VAT)', fmtCurrency(total, sym), `VAT amount: ${fmtCurrency(vatAmt, sym)}`);
  }
}

// ── PROFIT ──────────────────────────────────────
function calcProfit() {
  const rev = parseFloat(document.getElementById('pr-rev')?.value) || 0;
  const cost = parseFloat(document.getElementById('pr-cost')?.value) || 0;
  const sym = document.getElementById('pr-currency')?.value || '$';
  const profit = rev - cost;
  const margin = (profit / rev) * 100;
  showResult('pr-result', 'Profit', fmtCurrency(profit, sym), `Margin: ${fmtNum(margin)}%`);
}

// ── MARKUP ──────────────────────────────────────
function calcMarkup() {
  const cost = parseFloat(document.getElementById('mk-cost')?.value) || 0;
  const markup = parseFloat(document.getElementById('mk-markup')?.value) || 0;
  const sym = document.getElementById('mk-currency')?.value || '$';
  const price = cost * (1 + markup / 100);
  const profit = price - cost;
  showResult('mk-result', 'Selling Price', fmtCurrency(price, sym), `Profit: ${fmtCurrency(profit, sym)}`);
}

// ── INFLATION ────────────────────────────────────
function calcInflation() {
  const amount = parseFloat(document.getElementById('inf-amount')?.value) || 0;
  const rate = parseFloat(document.getElementById('inf-rate')?.value) || 0;
  const years = parseFloat(document.getElementById('inf-years')?.value) || 0;
  const sym = document.getElementById('inf-currency')?.value || '$';
  const future = amount * Math.pow(1 + rate / 100, years);
  showResult('inf-result', 'Future Value', fmtCurrency(future, sym), `Purchasing power loss: ${fmtCurrency(future - amount, sym)}`);
}

// ── SALARY ──────────────────────────────────────
function calcSalary() {
  const annual = parseFloat(document.getElementById('sal-annual')?.value) || 0;
  const sym = document.getElementById('sal-currency')?.value || '$';
  showResult('sal-result', 'Monthly Salary', fmtCurrency(annual / 12, sym), `Weekly: ${fmtCurrency(annual / 52, sym)} | Daily: ${fmtCurrency(annual / 260, sym)}`);
}

// ── FUEL COST ────────────────────────────────────
function calcFuel() {
  const dist = parseFloat(document.getElementById('fc-dist')?.value) || 0;
  const eff = parseFloat(document.getElementById('fc-eff')?.value) || 1;
  const price = parseFloat(document.getElementById('fc-price')?.value) || 0;
  const sym = document.getElementById('fc-currency')?.value || '$';
  const litres = dist / eff;
  const cost = litres * price;
  showResult('fc-result', 'Trip Cost', fmtCurrency(cost, sym), `Fuel used: ${fmtNum(litres)} litres`);
}

// ── EMERGENCY FUND ───────────────────────────────
function calcEmergency() {
  const monthly = parseFloat(document.getElementById('ef-monthly')?.value) || 0;
  const months = parseFloat(document.getElementById('ef-months')?.value) || 3;
  const sym = document.getElementById('ef-currency')?.value || '$';
  const fund = monthly * months;
  showResult('ef-result', 'Emergency Fund Target', fmtCurrency(fund, sym), `${months} months of expenses`);
}

// ── BILL SPLITTER ────────────────────────────────
function calcBill() {
  const total = parseFloat(document.getElementById('bs-total')?.value) || 0;
  const people = parseFloat(document.getElementById('bs-people')?.value) || 1;
  const tip = parseFloat(document.getElementById('bs-tip')?.value) || 0;
  const sym = document.getElementById('bs-currency')?.value || '$';
  const totalWithTip = total * (1 + tip / 100);
  const perPerson = totalWithTip / people;
  showResult('bs-result', 'Per Person', fmtCurrency(perPerson, sym), `Total (with tip): ${fmtCurrency(totalWithTip, sym)}`);
}

// ── DAILY COST ───────────────────────────────────
function calcDaily() {
  const annual = parseFloat(document.getElementById('dc-annual')?.value) || 0;
  const sym = document.getElementById('dc-currency')?.value || '$';
  showResult('dc-result', 'Daily Cost', fmtCurrency(annual / 365, sym), `Monthly: ${fmtCurrency(annual / 12, sym)}`);
}

// ── SUBSCRIPTION ─────────────────────────────────
function calcSubscription() {
  const monthly = parseFloat(document.getElementById('sub-monthly')?.value) || 0;
  const sym = document.getElementById('sub-currency')?.value || '$';
  showResult('sub-result', 'Annual Cost', fmtCurrency(monthly * 12, sym), `Daily: ${fmtCurrency(monthly * 12 / 365, sym)}`);
}

// ── TEMPERATURE ─────────────────────────────────
function calcTemp() {
  const val = parseFloat(document.getElementById('t-val')?.value) || 0;
  const from = document.getElementById('t-from')?.value;
  const to = document.getElementById('t-to')?.value;
  let celsius;
  if (from === 'C') celsius = val;
  else if (from === 'F') celsius = (val - 32) * 5/9;
  else celsius = val - 273.15;
  let result;
  if (to === 'C') result = celsius;
  else if (to === 'F') result = celsius * 9/5 + 32;
  else result = celsius + 273.15;
  showResult('t-result', `${from} → ${to}`, fmtNum(result) + '°' + to);
}

// ── WEIGHT ───────────────────────────────────────
function calcWeight() {
  const val = parseFloat(document.getElementById('wt-val')?.value) || 0;
  const from = document.getElementById('wt-from')?.value;
  const to = document.getElementById('wt-to')?.value;
  const toKg = { kg: 1, lb: 0.453592, g: 0.001, oz: 0.0283495, t: 1000 };
  const fromKg = toKg[from];
  const result = (val * fromKg) / toKg[to];
  showResult('wt-result', `${from.toUpperCase()} → ${to.toUpperCase()}`, fmtNum(result) + ' ' + to);
}

// ── SPEED ─────────────────────────────────────── 
function calcSpeed() {
  const d = parseFloat(document.getElementById('sp-d')?.value) || 0;
  const t = parseFloat(document.getElementById('sp-t')?.value) || 1;
  const unit = document.getElementById('sp-unit')?.value || 'km/h';
  const speed = d / t;
  showResult('sp-result', 'Speed', fmtNum(speed) + ' ' + unit);
}

// ── PACE ─────────────────────────────────────────
function calcPace() {
  const dist = parseFloat(document.getElementById('pace-dist')?.value) || 0;
  const mins = parseFloat(document.getElementById('pace-time')?.value) || 0;
  const unit = document.getElementById('pace-unit')?.value || 'km';
  const pace = mins / dist;
  const pMin = Math.floor(pace);
  const pSec = Math.round((pace - pMin) * 60);
  showResult('pace-result', 'Pace', `${pMin}:${pSec.toString().padStart(2,'0')} min/${unit}`);
}

// ── PAINT ─────────────────────────────────────── 
function calcPaint() {
  const l = parseFloat(document.getElementById('pt-l')?.value) || 0;
  const w = parseFloat(document.getElementById('pt-w')?.value) || 0;
  const h = parseFloat(document.getElementById('pt-h')?.value) || 0;
  const coats = parseFloat(document.getElementById('pt-coats')?.value) || 2;
  const coverage = parseFloat(document.getElementById('pt-cov')?.value) || 10;
  const wallArea = 2 * (l + w) * h;
  const litres = (wallArea / coverage) * coats;
  showResult('pt-result', 'Paint Needed', fmtNum(litres) + ' litres', `Wall area: ${fmtNum(wallArea)} m²`);
}

// ── TILE ──────────────────────────────────────── 
function calcTile() {
  const l = parseFloat(document.getElementById('tl-l')?.value) || 0;
  const w = parseFloat(document.getElementById('tl-w')?.value) || 0;
  const tileSize = parseFloat(document.getElementById('tl-tile')?.value) || 0.09;
  const waste = parseFloat(document.getElementById('tl-waste')?.value) || 10;
  const area = l * w;
  const tilesBase = area / tileSize;
  const tilesTotal = tilesBase * (1 + waste / 100);
  showResult('tl-result', 'Tiles Needed', Math.ceil(tilesTotal) + ' tiles', `Area: ${fmtNum(area)} m² (incl. ${waste}% waste)`);
}

// ── SOLAR ─────────────────────────────────────── 
function calcSolar() {
  const usage = parseFloat(document.getElementById('sol-usage')?.value) || 0;
  const rate = parseFloat(document.getElementById('sol-rate')?.value) || 0;
  const cost = parseFloat(document.getElementById('sol-cost')?.value) || 0;
  const sym = document.getElementById('sol-currency')?.value || '$';
  const yearlyBill = usage * rate * 12;
  const savings = yearlyBill * 0.8;
  const payback = cost / savings;
  showResult('sol-result', 'Annual Savings', fmtCurrency(savings, sym), `Payback period: ${fmtNum(payback, 1)} years`);
}

// ── CM ↔ INCH ─────────────────────────────────── 
function calcCmToInch() {
  const cm = parseFloat(document.getElementById('cmi-cm')?.value) || 0;
  showResult('cmi-result', 'Inches', fmtNum(cm / 2.54) + '"', `${fmtNum(cm)} cm = ${fmtNum(cm / 2.54)} inches`);
}
function calcInchToCm() {
  const inch = parseFloat(document.getElementById('itc-inch')?.value) || 0;
  showResult('itc-result', 'Centimetres', fmtNum(inch * 2.54) + ' cm', `${fmtNum(inch)}" = ${fmtNum(inch * 2.54)} cm`);
}

// ── KG ↔ LBS ──────────────────────────────────── 
function calcKgLbs() {
  const kg = parseFloat(document.getElementById('kgl-kg')?.value) || 0;
  showResult('kgl-result', 'Pounds', fmtNum(kg * 2.20462) + ' lbs', `${fmtNum(kg)} kg = ${fmtNum(kg * 2.20462)} lbs`);
}

// ── KM ↔ MILES ────────────────────────────────── 
function calcKmMiles() {
  const km = parseFloat(document.getElementById('kmm-km')?.value) || 0;
  showResult('kmm-result', 'Miles', fmtNum(km * 0.621371) + ' mi', `${fmtNum(km)} km = ${fmtNum(km * 0.621371)} mi`);
}

// ── TIME BETWEEN DATES ──────────────────────────── 
function calcDaysBetween() {
  const d1 = new Date(document.getElementById('db-d1')?.value);
  const d2 = new Date(document.getElementById('db-d2')?.value);
  const diff = Math.abs(d2 - d1);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  showResult('db-result', 'Days Between', days.toLocaleString() + ' days', `${weeks} weeks and ${days % 7} days`);
}

// ── RETIREMENT ──────────────────────────────────── 
function calcRetirement() {
  const current = parseFloat(document.getElementById('ret-current')?.value) || 0;
  const monthly = parseFloat(document.getElementById('ret-monthly')?.value) || 0;
  const rate = (parseFloat(document.getElementById('ret-rate')?.value) || 7) / 100 / 12;
  const years = parseFloat(document.getElementById('ret-years')?.value) || 30;
  const sym = document.getElementById('ret-currency')?.value || '$';
  const n = years * 12;
  const fv = current * Math.pow(1+rate, n) + monthly * ((Math.pow(1+rate, n) - 1) / rate);
  showResult('ret-result', 'Retirement Savings', fmtCurrency(fv, sym), `Over ${years} years`);
}

// ── CREDIT CARD ──────────────────────────────────── 
function calcCreditCard() {
  const balance = parseFloat(document.getElementById('cc-balance')?.value) || 0;
  const rate = (parseFloat(document.getElementById('cc-rate')?.value) || 0) / 100 / 12;
  const payment = parseFloat(document.getElementById('cc-payment')?.value) || 0;
  const sym = document.getElementById('cc-currency')?.value || '$';
  if (payment <= balance * rate) { showResult('cc-result', 'Warning', 'Payment too low', 'Increase payment to cover interest'); return; }
  let months = Math.ceil(Math.log(payment / (payment - balance * rate)) / Math.log(1 + rate));
  let totalInterest = payment * months - balance;
  showResult('cc-result', 'Payoff Time', months + ' months', `Total interest: ${fmtCurrency(totalInterest, sym)}`);
}

// ── BREAK EVEN ──────────────────────────────────── 
function calcBreakEven() {
  const fixed = parseFloat(document.getElementById('be-fixed')?.value) || 0;
  const price = parseFloat(document.getElementById('be-price')?.value) || 0;
  const variable = parseFloat(document.getElementById('be-variable')?.value) || 0;
  const sym = document.getElementById('be-currency')?.value || '$';
  const units = fixed / (price - variable);
  showResult('be-result', 'Break-Even Units', fmtNum(units, 0), `Revenue: ${fmtCurrency(units * price, sym)}`);
}

// ── COMMISSION ──────────────────────────────────── 
function calcCommission() {
  const sales = parseFloat(document.getElementById('com-sales')?.value) || 0;
  const rate = parseFloat(document.getElementById('com-rate')?.value) || 0;
  const sym = document.getElementById('com-currency')?.value || '$';
  const commission = sales * rate / 100;
  showResult('com-result', 'Commission Earned', fmtCurrency(commission, sym), `On ${fmtCurrency(sales, sym)} in sales`);
}

// ── BODY FAT ──────────────────────────────────── 
function calcBodyFat() {
  const gender = document.getElementById('bf-gender')?.value;
  const neck = parseFloat(document.getElementById('bf-neck')?.value) || 0;
  const waist = parseFloat(document.getElementById('bf-waist')?.value) || 0;
  const hip = parseFloat(document.getElementById('bf-hip')?.value) || 0;
  const height = parseFloat(document.getElementById('bf-height')?.value) || 1;
  let bf;
  if (gender === 'male') {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  showResult('bf-result', 'Body Fat %', fmtNum(bf) + '%');
}

// ── MACRO ──────────────────────────────────── 
function calcMacro() {
  const cals = parseFloat(document.getElementById('mac-cals')?.value) || 0;
  const goal = document.getElementById('mac-goal')?.value;
  let protein, carbs, fat;
  if (goal === 'lose') { protein = 0.35; carbs = 0.35; fat = 0.30; }
  else if (goal === 'gain') { protein = 0.30; carbs = 0.50; fat = 0.20; }
  else { protein = 0.30; carbs = 0.40; fat = 0.30; }
  const pG = Math.round(cals * protein / 4);
  const cG = Math.round(cals * carbs / 4);
  const fG = Math.round(cals * fat / 9);
  showResult('mac-result', 'Macros (daily)', `P: ${pG}g | C: ${cG}g | F: ${fG}g`);
}

// ── IDEAL WEIGHT ──────────────────────────────
function calcIdealWeight() {
  const gender = document.getElementById('iw-gender')?.value;
  const height = parseFloat(document.getElementById('iw-height')?.value) || 0;
  const inchOver5Ft = (height - 152.4) / 2.54;
  let min, max;
  if (gender === 'male') { min = 52 + 1.9 * inchOver5Ft; max = 56 + 1.9 * inchOver5Ft; }
  else { min = 49 + 1.7 * inchOver5Ft; max = 53 + 1.7 * inchOver5Ft; }
  showResult('iw-result', 'Ideal Weight Range', `${fmtNum(min)} – ${fmtNum(max)} kg`);
}

// ── ELECTRICITY ──────────────────────────────────
function calcElectricity() {
  const watts = parseFloat(document.getElementById('el-watts')?.value) || 0;
  const hours = parseFloat(document.getElementById('el-hours')?.value) || 0;
  const rate = parseFloat(document.getElementById('el-rate')?.value) || 0;
  const sym = document.getElementById('el-currency')?.value || '$';
  const kwhPerDay = (watts * hours) / 1000;
  const costPerDay = kwhPerDay * rate;
  const costPerMonth = costPerDay * 30;
  showResult('el-result', 'Monthly Cost', fmtCurrency(costPerMonth, sym), `Daily: ${fmtCurrency(costPerDay, sym)} | ${fmtNum(kwhPerDay)} kWh/day`);
}

// ── COOKING MEASUREMENT ──────────────────────────
function calcCooking() {
  const val = parseFloat(document.getElementById('ck-val')?.value) || 0;
  const from = document.getElementById('ck-from')?.value;
  const to = document.getElementById('ck-to')?.value;
  const toMl = { ml: 1, l: 1000, tsp: 4.929, tbsp: 14.787, cup: 236.588, floz: 29.574 };
  const result = (val * toMl[from]) / toMl[to];
  showResult('ck-result', 'Result', fmtNum(result) + ' ' + to);
}

// ── AREA ──────────────────────────────────────────
function calcArea() {
  const val = parseFloat(document.getElementById('ar-val')?.value) || 0;
  const from = document.getElementById('ar-from')?.value;
  const to = document.getElementById('ar-to')?.value;
  const toM2 = { m2: 1, km2: 1e6, ft2: 0.0929, mi2: 2589988, acre: 4046.86, ha: 10000, cm2: 0.0001 };
  const result = (val * toM2[from]) / toM2[to];
  showResult('ar-result', 'Result', fmtNum(result) + ' ' + to);
}

// ── UNIT CONVERTER ───────────────────────────────
function calcUnit() {
  const type = document.getElementById('uc-type')?.value;
  const val = parseFloat(document.getElementById('uc-val')?.value) || 0;
  const from = document.getElementById('uc-from')?.value;
  const to = document.getElementById('uc-to')?.value;
  const conversions = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, inch: 0.0254, mi: 1609.34, yd: 0.9144 },
    mass: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495, t: 1000 },
    volume: { l: 1, ml: 0.001, m3: 1000, ft3: 28.3168, gal: 3.78541, qt: 0.946353 },
  };
  const table = conversions[type];
  if (!table || !table[from] || !table[to]) { showResult('uc-result', 'Error', 'Unsupported unit pair'); return; }
  const result = (val * table[from]) / table[to];
  showResult('uc-result', 'Result', fmtNum(result) + ' ' + to);
}

// Update unit dropdowns based on type
function updateUnitOptions() {
  const type = document.getElementById('uc-type')?.value;
  const opts = {
    length: [['m','Metres'],['km','Kilometres'],['cm','Centimetres'],['mm','Millimetres'],['ft','Feet'],['inch','Inches'],['mi','Miles'],['yd','Yards']],
    mass: [['kg','Kilograms'],['g','Grams'],['lb','Pounds'],['oz','Ounces'],['t','Tonnes']],
    volume: [['l','Litres'],['ml','Millilitres'],['m3','Cubic Metres'],['ft3','Cubic Feet'],['gal','Gallons'],['qt','Quarts']],
  };
  const list = opts[type] || [];
  ['uc-from','uc-to'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = list.map(([v,l]) => `<option value="${v}">${l}</option>`).join('');
    if (list.find(([v]) => v === prev)) sel.value = prev;
  });
}

// ── DECISION WHEEL ────────────────────────────────
let wheelOptions = ['Option 1','Option 2','Option 3','Option 4'];
let wheelAngle = 0;
let spinning = false;

function drawWheel() {
  const canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 10;
  const colors = ['#4f8ef7','#7c5cfc','#00d4aa','#f7a94f','#f74f7e','#4fc8f7','#a4f74f','#f7e44f'];
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const seg = (2 * Math.PI) / wheelOptions.length;
  wheelOptions.forEach((opt, i) => {
    const start = seg * i + wheelAngle;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + seg);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = '#0a0c10';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + seg / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Syne, sans-serif';
    const label = opt.length > 12 ? opt.slice(0, 11) + '…' : opt;
    ctx.fillText(label, r - 10, 5);
    ctx.restore();
  });
  // pointer
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(cx - 10, 0);
  ctx.lineTo(cx + 10, 0);
  ctx.lineTo(cx, 20);
  ctx.closePath();
  ctx.fill();
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  const total = 2 * Math.PI * (8 + Math.random() * 8);
  let speed = 0.25;
  let traveled = 0;
  function frame() {
    if (traveled >= total) { spinning = false; announceWinner(); return; }
    const remaining = total - traveled;
    speed = remaining < 2 ? 0.02 + remaining * 0.05 : 0.25;
    wheelAngle += speed;
    traveled += speed;
    drawWheel();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function announceWinner() {
  const seg = (2 * Math.PI) / wheelOptions.length;
  const norm = ((2 * Math.PI - (wheelAngle % (2 * Math.PI))) + seg / 2) % (2 * Math.PI);
  const idx = Math.floor(norm / seg) % wheelOptions.length;
  const el = document.getElementById('wheel-result');
  if (el) el.textContent = '🎯 ' + wheelOptions[idx];
}

function updateWheel() {
  const raw = document.getElementById('wheel-options')?.value || '';
  wheelOptions = raw.split('\n').map(s => s.trim()).filter(Boolean);
  if (wheelOptions.length < 2) wheelOptions = ['Option 1', 'Option 2'];
  drawWheel();
}

// ── STUDY TIMER ───────────────────────────────────
let studyInterval = null;
let studySeconds = 0;
let studyRunning = false;

function formatTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h,m,sec].map(v => v.toString().padStart(2,'0')).join(':');
}

function startStudyTimer() {
  if (studyRunning) return;
  studyRunning = true;
  studyInterval = setInterval(() => {
    studySeconds++;
    const el = document.getElementById('study-display');
    if (el) el.textContent = formatTime(studySeconds);
  }, 1000);
}

function pauseStudyTimer() {
  studyRunning = false;
  clearInterval(studyInterval);
}

function resetStudyTimer() {
  pauseStudyTimer();
  studySeconds = 0;
  const el = document.getElementById('study-display');
  if (el) el.textContent = '00:00:00';
}

// ── POMODORO ──────────────────────────────────────
let pomodoroInterval = null;
let pomodoroSeconds = 25 * 60;
let pomodoroRunning = false;

function startPomodoro() {
  if (pomodoroRunning) return;
  pomodoroRunning = true;
  pomodoroInterval = setInterval(() => {
    if (pomodoroSeconds <= 0) {
      clearInterval(pomodoroInterval);
      pomodoroRunning = false;
      alert('Pomodoro complete! Take a break.');
      return;
    }
    pomodoroSeconds--;
    const el = document.getElementById('pomo-display');
    if (el) el.textContent = formatTime(pomodoroSeconds);
  }, 1000);
}

function pausePomodoro() {
  pomodoroRunning = false;
  clearInterval(pomodoroInterval);
}

function resetPomodoro() {
  pausePomodoro();
  const mins = parseInt(document.getElementById('pomo-mins')?.value) || 25;
  pomodoroSeconds = mins * 60;
  const el = document.getElementById('pomo-display');
  if (el) el.textContent = formatTime(pomodoroSeconds);
}

// ── RNG ───────────────────────────────────────────
function calcRNG() {
  const min = parseInt(document.getElementById('rng-min')?.value) || 0;
  const max = parseInt(document.getElementById('rng-max')?.value) || 100;
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  showResult('rng-result', 'Random Number', result.toString());
}

// ── PASSWORD GEN ──────────────────────────────────
function genPassword() {
  const len = parseInt(document.getElementById('pw-len')?.value) || 16;
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let pw = '';
  for (let i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  showResult('pw-result', 'Generated Password', pw);
}

// ── NET WORTH ─────────────────────────────────────
function calcNetWorth() {
  const assets = parseFloat(document.getElementById('nw-assets')?.value) || 0;
  const liabilities = parseFloat(document.getElementById('nw-liabilities')?.value) || 0;
  const sym = document.getElementById('nw-currency')?.value || '$';
  const nw = assets - liabilities;
  showResult('nw-result', 'Net Worth', fmtCurrency(nw, sym), nw >= 0 ? 'Positive net worth 🎉' : 'Work towards reducing liabilities');
}

// ── MARGIN ────────────────────────────────────────
function calcMargin() {
  const rev = parseFloat(document.getElementById('mg-rev')?.value) || 0;
  const cost = parseFloat(document.getElementById('mg-cost')?.value) || 0;
  const margin = ((rev - cost) / rev) * 100;
  showResult('mg-result', 'Gross Margin', fmtNum(margin) + '%', `Profit: $${fmtNum(rev - cost)}`);
}

// ── HOURS CALC ────────────────────────────────────
function calcHours() {
  const start = document.getElementById('hc-start')?.value;
  const end = document.getElementById('hc-end')?.value;
  if (!start || !end) { alert('Enter start and end times'); return; }
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  showResult('hc-result', 'Hours Worked', `${h}h ${m}m`, `${mins} total minutes`);
}

// ── TIME LEFT ─────────────────────────────────────
function calcTimeLeft() {
  const target = new Date(document.getElementById('tl-date')?.value);
  const now = new Date();
  const diff = target - now;
  if (diff < 0) { showResult('tl-result', 'Past date', 'That date has already passed'); return; }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  showResult('tl-result', 'Time Remaining', `${days} days`, `${days}d ${hours}h ${mins}m`);
}

// ── CURRENCY CONVERTER ───────────────────────────
async function convertCurrency() {
  const amount = parseFloat(document.getElementById('cur-amount')?.value) || 0;
  const from = document.getElementById('cur-from')?.value;
  const to = document.getElementById('cur-to')?.value;
  const btn = document.getElementById('cur-btn');
  if (btn) btn.textContent = 'Converting…';
  try {
    const resp = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await resp.json();
    const rate = data.rates[to];
    const result = amount * rate;
    showResult('cur-result', `${from} → ${to}`, fmtNum(result) + ' ' + to, `Rate: 1 ${from} = ${fmtNum(rate)} ${to}`);
  } catch (e) {
    showResult('cur-result', 'Error', 'Could not fetch rates', 'Check your internet connection');
  }
  if (btn) btn.textContent = 'Convert';
}

// ── NET WORTH PAGE (add rows) ─────────────────────
let assetRows = 1, liabilityRows = 1;

function addRow(type) {
  const table = document.getElementById(`${type}-table`);
  if (!table) return;
  const count = type === 'asset' ? ++assetRows : ++liabilityRows;
  const tr = document.createElement('tr');
  tr.innerHTML = `<td><input type="text" placeholder="Item name"></td><td><input type="number" placeholder="0" onchange="calcNetWorthTable()"></td>`;
  table.querySelector('tbody').appendChild(tr);
}

function calcNetWorthTable() {
  let totalAssets = 0, totalLiabilities = 0;
  document.querySelectorAll('#asset-table tbody input[type=number]').forEach(i => totalAssets += parseFloat(i.value) || 0);
  document.querySelectorAll('#liability-table tbody input[type=number]').forEach(i => totalLiabilities += parseFloat(i.value) || 0);
  const sym = document.getElementById('nwt-currency')?.value || '$';
  const nw = totalAssets - totalLiabilities;
  showResult('nwt-result', 'Net Worth', fmtCurrency(nw, sym), `Assets: ${fmtCurrency(totalAssets, sym)} | Liabilities: ${fmtCurrency(totalLiabilities, sym)}`);
}

// ── MOVE COST ─────────────────────────────────────
function calcMoveCost() {
  const dist = parseFloat(document.getElementById('mv-dist')?.value) || 0;
  const rooms = parseFloat(document.getElementById('mv-rooms')?.value) || 1;
  const helpers = parseFloat(document.getElementById('mv-helpers')?.value) || 2;
  const hours = parseFloat(document.getElementById('mv-hours')?.value) || 4;
  const rate = parseFloat(document.getElementById('mv-rate')?.value) || 25;
  const sym = document.getElementById('mv-currency')?.value || '$';
  const labor = helpers * hours * rate;
  const transport = dist * 1.5;
  const supplies = rooms * 30;
  const total = labor + transport + supplies;
  showResult('mv-result', 'Estimated Move Cost', fmtCurrency(total, sym), `Labour: ${fmtCurrency(labor, sym)} | Transport: ${fmtCurrency(transport, sym)} | Supplies: ${fmtCurrency(supplies, sym)}`);
}

// ── INTERNET SPEED ────────────────────────────────
function calcInternetSpeed() {
  const size = parseFloat(document.getElementById('is-size')?.value) || 0;
  const speed = parseFloat(document.getElementById('is-speed')?.value) || 1;
  const unit = document.getElementById('is-unit')?.value;
  let sizeMb = unit === 'gb' ? size * 1024 : size;
  const secs = (sizeMb * 8) / speed;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.round(secs % 60);
  showResult('is-result', 'Download Time', `${h}h ${m}m ${s}s`, `At ${speed} Mbps`);
}

// ── FILE SIZE ─────────────────────────────────────
function calcFileSize() {
  const val = parseFloat(document.getElementById('fs-val')?.value) || 0;
  const from = document.getElementById('fs-from')?.value;
  const to = document.getElementById('fs-to')?.value;
  const toB = { B: 1, KB: 1024, MB: 1024**2, GB: 1024**3, TB: 1024**4 };
  const result = (val * toB[from]) / toB[to];
  showResult('fs-result', 'Result', fmtNum(result) + ' ' + to);
}

// ── SALARY TAX ────────────────────────────────────
function calcSalaryTax() {
  const annual = parseFloat(document.getElementById('st-annual')?.value) || 0;
  const rate = parseFloat(document.getElementById('st-rate')?.value) || 0;
  const sym = document.getElementById('st-currency')?.value || '$';
  const tax = annual * rate / 100;
  const netAnnual = annual - tax;
  showResult('st-result', 'Net Annual Salary', fmtCurrency(netAnnual, sym), `Tax paid: ${fmtCurrency(tax, sym)} | Net monthly: ${fmtCurrency(netAnnual / 12, sym)}`);
}

// ── TIME CALCULATOR ───────────────────────────────
function calcTime() {
  const h1 = parseFloat(document.getElementById('tc-h1')?.value) || 0;
  const m1 = parseFloat(document.getElementById('tc-m1')?.value) || 0;
  const h2 = parseFloat(document.getElementById('tc-h2')?.value) || 0;
  const m2 = parseFloat(document.getElementById('tc-m2')?.value) || 0;
  const op = document.getElementById('tc-op')?.value;
  let totalMins = op === 'add' ? (h1*60+m1) + (h2*60+m2) : (h1*60+m1) - (h2*60+m2);
  const sign = totalMins < 0 ? '-' : '';
  totalMins = Math.abs(totalMins);
  const rH = Math.floor(totalMins / 60);
  const rM = totalMins % 60;
  showResult('tc-result', 'Result', `${sign}${rH}h ${rM}m`);
}

// ── INIT WHEELS etc ───────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const c = document.getElementById('wheel-canvas');
  if (c) { drawWheel(); }
  const pomoDis = document.getElementById('pomo-display');
  if (pomoDis) pomoDis.textContent = formatTime(pomodoroSeconds);
  const studyDis = document.getElementById('study-display');
  if (studyDis) studyDis.textContent = '00:00:00';
});
