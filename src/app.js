const PRICING = {
  arcade: { monthly: 9, yearly: 90 },
  advanced: { monthly: 12, yearly: 120 },
  pro: { monthly: 15, yearly: 150 },
  online: { monthly: 1, yearly: 10 },
  storage: { monthly: 2, yearly: 20 },
  profile: { monthly: 2, yearly: 20 },
}

const state = {
  step: 1,
  plan: 'arcade',
  billing: 'monthly',
  addons: { online: false, storage: false, profile: false },
  name: '', email: '', phone: '',
}

const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => document.querySelectorAll(sel)

function goToStep(n) {
  state.step = n
  $$('.step').forEach((s) => s.classList.toggle('active', +s.dataset.step === n))
  $$('.step-panel').forEach((p) => p.classList.toggle('active', +p.dataset.panel === n))
  if (n === 4) renderSummary()
}

function goNext() {
  if (state.step === 1 && !validateStep1()) return
  if (state.step === 2 && !state.plan) return
  goToStep(state.step + 1)
}

function goBack() {
  if (state.step > 1) goToStep(state.step - 1)
}

function validateStep1() {
  const fields = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'phone', label: 'Phone Number' },
  ]
  let valid = true
  for (const f of fields) {
    const input = $(`#${f.id}`)
    const err = $(`#${f.id}-error`)
    const field = input.closest('.field')
    if (!input.value.trim()) {
      field.classList.add('error')
      err.textContent = 'This field is required'
      valid = false
    } else if (f.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      field.classList.add('error')
      err.textContent = 'Valid email required'
      valid = false
    } else {
      field.classList.remove('error')
      err.textContent = ''
    }
  }
  return valid
}

function selectPlan(plan) {
  state.plan = plan
  $$('.plan-card').forEach((c) => c.classList.toggle('selected', c.dataset.plan === plan))
}

function toggleBilling() {
  state.billing = state.billing === 'monthly' ? 'yearly' : 'monthly'
  const el = document.querySelector('.billing-toggle')
  el.classList.toggle('yearly', state.billing === 'yearly')
  el.querySelectorAll('.toggle-label').forEach((l, i) => {
    l.classList.toggle('active', (i === 0 && state.billing === 'monthly') || (i === 1 && state.billing === 'yearly'))
  })
  updatePrices()
}

function updatePrices() {
  const per = state.billing
  $$('.plan-price').forEach((p) => {
    p.textContent = p.dataset[per]
  })
  $$('.plan-bonus').forEach((b) => b.style.display = per === 'yearly' ? 'block' : 'none')
  $$('.addon-price').forEach((p) => {
    p.textContent = p.dataset[per]
  })
}

function toggleAddon(addon, checked) {
  state.addons[addon] = checked
  $(`.addon-row[data-addon="${addon}"]`).classList.toggle('checked', checked)
}

function renderSummary() {
  const per = state.billing
  const planPrice = PRICING[state.plan][per]
  const planLabel = state.plan.charAt(0).toUpperCase() + state.plan.slice(1)
  $('#summary-plan-name').textContent = `${planLabel} (${per === 'monthly' ? 'Monthly' : 'Yearly'})`
  const priceSuffix = per === 'monthly' ? '/mo' : '/yr'
  $('#summary-plan-price').textContent = `$${planPrice}${priceSuffix}`

  const addonsEl = $('#summary-addons')
  addonsEl.innerHTML = ''
  let totalAddons = 0
  for (const [key, sel] of Object.entries(state.addons)) {
    if (!sel) continue
    const addonPrice = PRICING[key][per]
    totalAddons += addonPrice
    const label = key === 'online' ? 'Online service' : key === 'storage' ? 'Larger storage' : 'Customizable Profile'
    addonsEl.insertAdjacentHTML('beforeend', `
      <div class="summary-addon">
        <span class="summary-addon-name">${label}</span>
        <span class="summary-addon-price">+$${addonPrice}${priceSuffix}</span>
      </div>
    `)
  }

  if (totalAddons === 0) {
    addonsEl.insertAdjacentHTML('beforeend', '<p style="color:var(--grey-500);font-size:14px">No add-ons selected</p>')
  }

  const total = planPrice + totalAddons
  $('#total-label').textContent = `Total (per ${per === 'monthly' ? 'month' : 'year'})`
  $('#total-amount').textContent = `+$${total}${priceSuffix}`
  // ponytail: always shows "+$" even for yearly — design showed same pattern
}

// Bind events
document.addEventListener('DOMContentLoaded', () => {
  goToStep(1)

  // Next step buttons
  $$('.next-step').forEach((btn) => btn.addEventListener('click', goNext))

  // Go back buttons
  $$('.go-back').forEach((btn) => btn.addEventListener('click', goBack))

  // Clear validation on input
  $$('.field input').forEach((input) => {
    input.addEventListener('input', () => input.closest('.field')?.classList.remove('error'))
  })

  // Plan selection
  $$('.plan-card').forEach((card) => {
    card.addEventListener('click', () => selectPlan(card.dataset.plan))
  })

  // Billing toggle
  $('#billing-toggle').addEventListener('click', toggleBilling)

  // Add-on checkboxes
  $$('.addon-checkbox').forEach((cb) => {
    cb.addEventListener('change', () => toggleAddon(cb.closest('.addon-row').dataset.addon, cb.checked))
  })

  // Change plan link
  $('#change-plan').addEventListener('click', (e) => {
    e.preventDefault()
    goToStep(2)
  })

  // Confirm button
  $('#confirm-btn').addEventListener('click', () => goToStep(5))

  // Allow Enter to trigger Next Step
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && state.step <= 4 && state.step >= 1) {
      const btn = $(`.step-panel.active .next-step`)
      if (btn) btn.click()
    }
  })
})
