// Form Handling
document.addEventListener('DOMContentLoaded', function () {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Orcamento Form
    const orcamentoForm = document.getElementById('orcamentoForm');
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', handleOrcamentoSubmit);
    }

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Enviar para WhatsApp
    const message = `
*NOVO CONTATO DO SITE*

Nome: ${data.nome}
Email: ${data.email}
Telefone: ${data.telefone}
Tipo de Obra: ${data.tipo_obra}

Mensagem:
${data.mensagem}
    `.trim();

    const whatsappURL = `https://wa.me/5517997811471?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    // Reset form
    e.target.reset();
    alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
}

function handleOrcamentoSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Construir mensagem para WhatsApp
    let message = `
*SOLICITAÇÃO DE ORÇAMENTO*

📋 DADOS PESSOAIS
Nome: ${data.nome}
Email: ${data.email}
Telefone: ${data.telefone}

🏗️ DADOS DO PROJETO
Tipo: ${data.tipo_obra}
Área: ${data.area_m2 || 'Não informado'} m²
Localização: ${data.localizacao || 'Não informado'}
Prazo: ${data.prazo || 'Flexível'}
Orçamento: ${data.orcamento || 'Não definido'}

${data.tem_terreno ? '✅ Já tem terreno' : '❌ Não tem terreno'}
${data.tem_projeto ? '✅ Já tem projeto' : '❌ Não tem projeto'}

📝 DETALHES:
${data.detalhes || 'Não informado'}
    `.trim();

    const whatsappURL = `https://wa.me/5517997811471?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    e.target.reset();
    alert('Solicitação enviada! Você será redirecionado para o WhatsApp.');
}

function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Analytics (Google Analytics ou similar)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function () {
        trackEvent('Form', 'Submit', form.id);
    });
});

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        trackEvent('Button', 'Click', this.textContent);
    });
});
