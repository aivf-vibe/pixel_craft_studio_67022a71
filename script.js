

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .pricing-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic mining stats animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate hero stats when page loads
window.addEventListener('load', () => {
    const stats = document.querySelectorAll('.stat h3');
    if (stats.length > 0) {
        animateValue(stats[0], 0, 150, 2000);
        // For the dollar amount, we'll handle it differently
        stats[1].textContent = '$2.5B+';
        stats[2].textContent = '99.9%';
    }
});

// Mining dashboard live updates simulation
function updateMiningStats() {
    const hashRate = document.querySelector('.mining-dashboard .stat-item:nth-child(1) .value');
    const temperature = document.querySelector('.mining-dashboard .stat-item:nth-child(2) .value');
    const power = document.querySelector('.mining-dashboard .stat-item:nth-child(3) .value');
    const profit = document.querySelector('.mining-dashboard .stat-item:nth-child(4) .value');
    
    if (hashRate && temperature && power && profit) {
        // Simulate realistic variations in mining stats
        const baseHashRate = 125.8;
        const baseTemp = 67;
        const basePower = 2.1;
        const baseProfit = 47.32;
        
        // More realistic fluctuations
        const newHashRate = baseHashRate + (Math.random() - 0.5) * 5;
        const newTemp = baseTemp + (Math.random() - 0.5) * 4;
        const newPower = basePower + (Math.random() - 0.5) * 0.2;
        const newProfit = baseProfit + (Math.random() - 0.5) * 3;
        
        // Add color coding based on values
        hashRate.style.color = newHashRate > baseHashRate ? '#00ff88' : '#ffa500';
        temperature.style.color = newTemp > 70 ? '#ff4757' : '#00ff88';
        power.style.color = newPower > basePower ? '#ffa500' : '#00ff88';
        profit.style.color = newProfit > baseProfit ? '#00ff88' : '#ff4757';
        
        // Animate the value changes
        hashRate.style.transform = 'scale(1.1)';
        temperature.style.transform = 'scale(1.1)';
        power.style.transform = 'scale(1.1)';
        profit.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            hashRate.style.transform = 'scale(1)';
            temperature.style.transform = 'scale(1)';
            power.style.transform = 'scale(1)';
            profit.style.transform = 'scale(1)';
        }, 200);
        
        hashRate.textContent = newHashRate.toFixed(1) + ' TH/s';
        temperature.textContent = newTemp.toFixed(0) + '°C';
        power.textContent = newPower.toFixed(2) + ' kW';
        profit.textContent = '$' + newProfit.toFixed(2);
    }
}

// Update mining stats every 3 seconds
setInterval(updateMiningStats, 3000);

// Chart animation
function animateChartBars() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animation = `pulse 2s ease-in-out infinite ${index * 0.2}s`;
        }, index * 100);
    });
}

// Trigger chart animation when page loads
window.addEventListener('load', animateChartBars);

// Button hover effects
document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary, .btn-secondary, .pricing-btn {
        position: relative;
        overflow: hidden;
    }
`;

document.head.appendChild(style);

// Form validation and submission (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Add loading states to buttons
document.querySelectorAll('.btn-primary, .pricing-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Loading')) return;
        
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Remove parallax effect - keep sections fixed
// (Parallax effect removed as requested)

// Add some interactive particles effect (optional enhancement)
function createParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.position = 'relative';
        hero.appendChild(canvas);
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(247, 147, 26, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particles on load
window.addEventListener('load', createParticles);

