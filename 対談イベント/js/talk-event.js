// ============================================
// ワオ・コーポレーション 創業50周年記念 対談イベントLP
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    
    // Sticky Header Change
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-white', 'shadow-lg');
                header.classList.remove('bg-white/80');
            } else {
                header.classList.remove('bg-white', 'shadow-lg');
                header.classList.add('bg-white/80');
            }
        });
    }

    // Accordion Logic
    const accordionContainer = document.getElementById('accordion-container');
    
    if (accordionContainer) {
        const headers = accordionContainer.getElementsByClassName('accordion-header');
        
        Array.from(headers).forEach(header => {
            header.addEventListener('click', function () {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.accordion-icon');
                
                // Toggle self
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.textContent = '＋';
                    icon.classList.remove('rotate-45');
                } else {
                    // Calculate scrollHeight dynamically for smooth transition
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.textContent = '＋'; // Using + and rotate for 'x' effect
                    icon.classList.add('rotate-45');
                }

                // Optional: Close others
                Array.from(headers).forEach(otherHeader => {
                    if (otherHeader !== this) {
                        otherHeader.nextElementSibling.style.maxHeight = null;
                        const otherIcon = otherHeader.querySelector('.accordion-icon');
                        if (otherIcon) {
                            otherIcon.textContent = '＋';
                            otherIcon.classList.remove('rotate-45');
                        }
                    }
                });
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

