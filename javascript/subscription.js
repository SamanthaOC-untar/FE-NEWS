// subscription.js

// State management
let selectedPlan = null;
let selectedPayment = null;

const plans = {
    monthly: {
        name: 'Paket Bulanan',
        period: '1 Bulan',
        price: 49000,
        discount: 0
    },
    yearly: {
        name: 'Paket Tahunan',
        period: '12 Bulan',
        price: 410000,
        discount: 178000,
        originalPrice: 588000
    }
};

const paymentMethods = {
    bank: 'Transfer Bank',
    ewallet: 'E-Wallet',
    credit: 'Kartu Kredit/Debit',
    qris: 'QRIS'
};

// DOM Elements
const pricingCards = document.querySelectorAll('.pricing-card');
const paymentMethodInputs = document.querySelectorAll('.payment-method input[type="radio"]');
const paymentSection = document.querySelector('.payment-section');
const checkoutBtn = document.getElementById('btn-checkout');

// Summary elements
const summaryPlan = document.getElementById('summary-plan');
const summaryPeriod = document.getElementById('summary-period');
const summaryPayment = document.getElementById('summary-payment');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryDiscount = document.getElementById('summary-discount');
const summaryTotal = document.getElementById('summary-total');
const discountItem = document.querySelector('.discount-item');

// Event Listeners
pricingCards.forEach(card => {
    const button = card.querySelector('.btn-select');
    
    button.addEventListener('click', () => {
        const plan = card.dataset.plan;
        selectPlan(plan);
    });
});

paymentMethodInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        selectedPayment = e.target.value;
        updateSummary();
        updateCheckoutButton();
    });
});

checkoutBtn.addEventListener('click', () => {
    if (selectedPlan && selectedPayment) {
        showCheckoutModal();
    }
});

// Functions
function selectPlan(plan) {
    selectedPlan = plan;
    
    // Update card selection
    pricingCards.forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-plan="${plan}"]`).classList.add('selected');
    
    // Show payment section
    paymentSection.style.display = 'block';
    
    // Smooth scroll to payment section
    paymentSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    updateSummary();
    updateCheckoutButton();
}

function updateSummary() {
    if (selectedPlan) {
        const plan = plans[selectedPlan];
        
        summaryPlan.textContent = plan.name;
        summaryPeriod.textContent = plan.period;
        
        // Update prices
        const subtotal = selectedPlan === 'yearly' ? plan.originalPrice : plan.price;
        summarySubtotal.textContent = formatPrice(subtotal);
        
        // Show/hide discount
        if (plan.discount > 0) {
            discountItem.style.display = 'flex';
            summaryDiscount.textContent = `- ${formatPrice(plan.discount)}`;
        } else {
            discountItem.style.display = 'none';
        }
        
        // Update total
        summaryTotal.textContent = formatPrice(plan.price);
    } else {
        summaryPlan.textContent = '-';
        summaryPeriod.textContent = '-';
        summarySubtotal.textContent = 'Rp 0';
        summaryTotal.textContent = 'Rp 0';
        discountItem.style.display = 'none';
    }
    
    if (selectedPayment) {
        summaryPayment.textContent = paymentMethods[selectedPayment];
    } else {
        summaryPayment.textContent = '-';
    }
}

function updateCheckoutButton() {
    if (selectedPlan && selectedPayment) {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Lanjutkan ke Pembayaran';
    } else if (selectedPlan) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Pilih Metode Pembayaran';
    } else {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Pilih Paket & Metode Pembayaran';
    }
}

function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

function showCheckoutModal() {
    const plan = plans[selectedPlan];
    const paymentMethod = paymentMethods[selectedPayment];
    
    // Create checkout data
    const checkoutData = {
        plan: selectedPlan,
        planName: plan.name,
        period: plan.period,
        price: plan.price,
        discount: plan.discount || 0,
        paymentMethod: selectedPayment,
        paymentMethodName: paymentMethod,
        timestamp: new Date().toISOString()
    };
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
        <div class="checkout-modal-content">
            <div class="checkout-modal-header">
                <h2>Konfirmasi Pembayaran</h2>
                <button class="modal-close" onclick="closeCheckoutModal()">&times;</button>
            </div>
            
            <div class="checkout-modal-body">
                <div class="checkout-detail-section">
                    <h3>Detail Langganan</h3>
                    <div class="checkout-detail-item">
                        <span>Paket</span>
                        <strong>${plan.name}</strong>
                    </div>
                    <div class="checkout-detail-item">
                        <span>Periode</span>
                        <strong>${plan.period}</strong>
                    </div>
                    ${plan.discount > 0 ? `
                    <div class="checkout-detail-item discount-highlight">
                        <span>Diskon</span>
                        <strong class="discount-text">- ${formatPrice(plan.discount)}</strong>
                    </div>
                    ` : ''}
                </div>
                
                <div class="checkout-detail-section">
                    <h3>Metode Pembayaran</h3>
                    <div class="checkout-payment-method">
                        <span class="payment-method-icon">${getPaymentIcon(selectedPayment)}</span>
                        <strong>${paymentMethod}</strong>
                    </div>
                </div>
                
                <div class="checkout-total-section">
                    <div class="checkout-total-item">
                        <span>Total Pembayaran</span>
                        <strong class="total-price">${formatPrice(plan.price)}</strong>
                    </div>
                </div>
                
                <div class="checkout-info">
                    <p>✓ Akses langsung setelah pembayaran berhasil</p>
                    <p>✓ Invoice akan dikirim ke email Anda</p>
                    <p>✓ Dapat dibatalkan kapan saja</p>
                </div>
            </div>
            
            <div class="checkout-modal-footer">
                <button class="btn-cancel" onclick="closeCheckoutModal()">Batal</button>
                <button class="btn-confirm" onclick="processPayment()">Konfirmasi & Bayar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Store checkout data for processing
    window.currentCheckoutData = checkoutData;
}

function getPaymentIcon(method) {
    const icons = {
        bank: '🏦',
        ewallet: '📱',
        credit: '💳',
        qris: '📲'
    };
    return icons[method] || '💰';
}

function closeCheckoutModal() {
    const modal = document.querySelector('.checkout-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function processPayment() {
    const checkoutData = window.currentCheckoutData;
    
    if (!checkoutData) return;
    
    // Show loading state
    const confirmBtn = document.querySelector('.btn-confirm');
    confirmBtn.textContent = 'Memproses...';
    confirmBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        closeCheckoutModal();
        
        // Show success message
        showSuccessMessage(checkoutData);
        
        // In real application, redirect to payment gateway
        // window.location.href = '/payment/process?id=' + checkoutData.timestamp;
    }, 1500);
}

function showSuccessMessage(data) {
    const successModal = document.createElement('div');
    successModal.className = 'checkout-modal show';
    successModal.innerHTML = `
        <div class="checkout-modal-content success-modal">
            <div class="success-icon">✓</div>
            <h2>Pembayaran Berhasil!</h2>
            <p>Terima kasih telah berlangganan <strong>${data.planName}</strong></p>
            <p class="success-detail">Total: <strong>${formatPrice(data.price)}</strong></p>
            <p class="success-note">Invoice telah dikirim ke email Anda</p>
            <button class="btn-success" onclick="location.href='index.html'">Kembali ke Beranda</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-modal')) {
        closeCheckoutModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCheckoutModal();
    }
});

// Initialize
updateSummary();
updateCheckoutButton();