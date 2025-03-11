// Initialize AOS with custom settings
AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    offset: 120,
    easing: 'ease-in-out'
});

// Smooth scroll handling with enhanced behavior
const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function for smoother scroll
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Enhanced smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target, 1000);
    });
});

// Timeline Animation Controller
class TimelineAnimator {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        this.timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 
                'translateX(-50px)' : 'translateX(50px)';
            
            this.observeItem(item);
        });
    }

    observeItem(item) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(() => {
                            item.style.transition = 'all 0.8s ease-out';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        });
                        observer.unobserve(item);
                    }
                });
            },
            { threshold: 0.2 }
        );
        
        observer.observe(item);
    }
}

// Feature Cards Animation
class FeatureCardsAnimator {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCard(card));
            card.addEventListener('mouseleave', () => this.resetCard(card));
        });
    }

    animateCard(card) {
        card.style.transform = 'translateY(-15px) scale(1.03)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    }

    resetCard(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
        
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    }
}

// Parallax Hero Section
class ParallaxHero {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero-content');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.animate(), { passive: true });
    }

    animate() {
        const scrolled = window.pageYOffset;
        requestAnimationFrame(() => {
            this.heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            this.heroContent.style.opacity = 1 - (scrolled * 0.003);
        });
    }
}

// Navbar Animation
class NavbarAnimator {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScroll = window.scrollY;
        
        requestAnimationFrame(() => {
            if (currentScroll > 100) {
                this.navbar.style.background = 'rgba(10, 10, 31, 0.95)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 31, 0.8)';
                this.navbar.style.backdropFilter = 'blur(5px)';
            }

            // Hide/show navbar based on scroll direction
            if (currentScroll > this.lastScroll && currentScroll > 500) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// Team Section Animation
class TeamSectionAnimator {
    constructor() {
        this.teamMembers = document.querySelectorAll('.team-member');
        this.init();
    }

    init() {
        this.teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => this.animateMember(member));
            member.addEventListener('mouseleave', () => this.resetMember(member));
        });
    }

    animateMember(member) {
        const image = member.querySelector('.member-image');
        const socialLinks = member.querySelector('.social-links');
        
        image.style.transform = 'scale(1.1)';
        socialLinks.style.transform = 'translateY(0)';
    }

    resetMember(member) {
        const image = member.querySelector('.member-image');
        const socialLinks = member.querySelector('.social-links');
        
        image.style.transform = 'scale(1)';
        socialLinks.style.transform = 'translateY(100%)';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading screen immediately
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    // Initialize all animation controllers
    new TimelineAnimator();
    new FeatureCardsAnimator();
    new ParallaxHero();
    new NavbarAnimator();
    new TeamSectionAnimator();
    
    // Refresh AOS
    AOS.refresh();
    
    // Add particle background effect
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#6C63FF' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6C63FF',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    const video = document.getElementById('myVideo');
    
    // Force video play
    video.play().catch(function(error) {
        console.log("Video play failed:", error);
    });

    // Log video load status
    video.addEventListener('loadeddata', function() {
        console.log("Video loaded successfully");
    });

    video.addEventListener('error', function(e) {
        console.log("Error loading video:", e);
    });
}); 