// ============================================
// ワオ・コーポレーション 50周年記念サイト
// Main JavaScript
// ============================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initScrollAnimations();
    initImpactNumbers();
    initTimeline();
    initVoiceFilters();
    initCountdown();
    initSmoothScroll();
    initMobileMenu();
});

// ============================================
// Header Scroll Effect
// ============================================
function initHeader() {
    const header = document.getElementById('preHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Scroll Animations (AOS)
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Impact Numbers Animation
// ============================================
function initImpactNumbers() {
    const numberElements = document.querySelectorAll('.impact-number');
    let animated = false;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                numberElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    animateNumber(el, 0, target, 2000);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
        observer.observe(impactSection);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const isLargeNumber = end > 1000000;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        if (isLargeNumber) {
            element.textContent = formatLargeNumber(current);
        } else {
            element.textContent = current.toLocaleString('ja-JP');
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isLargeNumber ? formatLargeNumber(end) : end.toLocaleString('ja-JP');
        }
    }
    
    requestAnimationFrame(update);
}

function formatLargeNumber(num) {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '億';
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    }
    return num.toLocaleString('ja-JP');
}

// ============================================
// Timeline Progress
// ============================================
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressBar = document.getElementById('timelineProgress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;
        
        const rect = timelineSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollProgress = Math.max(0, Math.min(1, 
                (scrollTop + windowHeight - sectionTop) / sectionHeight
            ));
            
            progressBar.style.height = (scrollProgress * 100) + '%';
            
            // Highlight active timeline item
            timelineItems.forEach((item, index) => {
                const itemTop = item.offsetTop;
                const itemProgress = (scrollTop + windowHeight - sectionTop - itemTop) / (item.offsetHeight + 100);
                
                if (itemProgress > 0.3 && itemProgress < 0.7) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}

// ============================================
// Voice Filter
// ============================================
function initVoiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const voiceCards = document.querySelectorAll('.voice-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            voiceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// Countdown Timer
// ============================================
function initCountdown() {
    // Campaign end date: 2026年5月31日 23:59:59
    const endDate = new Date('2026-05-31T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('ctaDays').textContent = '0';
            document.getElementById('ctaHours').textContent = '0';
            document.getElementById('ctaMinutes').textContent = '0';
            document.getElementById('ctaSeconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update campaign countdown
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        
        // Update CTA countdown
        const ctaDaysEl = document.getElementById('ctaDays');
        const ctaHoursEl = document.getElementById('ctaHours');
        const ctaMinutesEl = document.getElementById('ctaMinutes');
        const ctaSecondsEl = document.getElementById('ctaSeconds');
        
        if (ctaDaysEl) ctaDaysEl.textContent = days;
        if (ctaHoursEl) ctaHoursEl.textContent = hours;
        if (ctaMinutesEl) ctaMinutesEl.textContent = minutes;
        if (ctaSecondsEl) ctaSecondsEl.textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.pre-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('globalNav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('mobile-open');
            toggle.classList.remove('active');
        }
    });
}

// ============================================
// Parallax Effect
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// Event Tab Switching
// ============================================
document.querySelectorAll('.event-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.event-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would load different event content based on period
        const period = this.getAttribute('data-period');
        console.log('Switching to period:', period);
        // Implement content switching logic here
    });
});

// ============================================
// Confetti Effect (for campaign section)
// ============================================
function createConfetti() {
    const colors = ['#DAA520', '#1E3A8A', '#F59E0B', '#10B981'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.style.animation = `confettiFall ${animationDuration}s ${animationDelay}s linear forwards`;
        confetti.style.setProperty('--horizontal', horizontalMovement + 'px');
        
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) translateX(var(--horizontal)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Trigger confetti on campaign section scroll
const campaignSection = document.querySelector('.campaign-section');
if (campaignSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(campaignSection);
}

