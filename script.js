// Sticky Navbar
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content, .stat-item');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
            progressObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '8472053547:AAFQFUxOpoPY3m5n4rE-rYWqhqZinnU6D20';
const TELEGRAM_BOT_USERNAME = '@Mathsayt_bot';
const TELEGRAM_CHAT_ID = '1180966517';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Iltimos, barcha maydonlarni to\'ldiring.');
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Yuborilmoqda...';

    try {
        // Format message for Telegram
        const telegramMessage = `📧 *Yangi Xabar*\n\n` +
            `👤 *Ism:* ${name}\n` +
            `📧 *Email:* ${email}\n\n` +
            `💬 *Xabar:*\n${message}`;

        // Send to Telegram Bot
        if (TELEGRAM_CHAT_ID) {
            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            
            const response = await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: telegramMessage,
                    parse_mode: 'Markdown'
                })
            });

            const data = await response.json();
            
            if (data.ok) {
                alert('✅ Rahmat! Xabaringiz qabul qilindi va Telegram botga yuborildi. Tez orada javob beramiz.');
                contactForm.reset();
            } else {
                throw new Error(data.description || 'Xatolik yuz berdi');
            }
        } else {
            // If chat_id is not set, show email option
            const emailSubject = encodeURIComponent('Sayt orqali xabar');
            const emailBody = encodeURIComponent(`Ism: ${name}\nEmail: ${email}\n\nXabar:\n${message}`);
            window.location.href = `mailto:mamitovhikmatillo77@gmail.com?subject=${emailSubject}&body=${emailBody}`;
            alert('✅ Email dasturi ochildi. Xabaringizni yuboring.');
            contactForm.reset();
        }
    } catch (error) {
        console.error('Error sending message:', error);
        // Fallback to email
        const emailSubject = encodeURIComponent('Sayt orqali xabar');
        const emailBody = encodeURIComponent(`Ism: ${name}\nEmail: ${email}\n\nXabar:\n${message}`);
        window.location.href = `mailto:mamitovhikmatillo77@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        alert('⚠️ Telegram botga yuborishda xatolik. Email dasturi ochildi. Xabaringizni yuboring.');
        contactForm.reset();
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Hero Section Typing Effect (Optional Enhancement)
const heroTitle = document.querySelector('.name');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Activate first nav link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Add fade-in to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.animation = 'fadeInUp 1s ease-out forwards';
    }
});

