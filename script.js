// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    // Toggle mobile menu
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Search Functionality and Game Cards
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const gameCards = document.querySelectorAll('.game-card');
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Advanced search functionality
    if (searchInput && searchIcon) {
        // Clear search function
        const clearSearch = () => {
            searchInput.value = '';
            
            // Show all games
            if (gameCards && gameCards.length > 0) {
                gameCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
            
            // Show all categories
            if (categoryItems && categoryItems.length > 0) {
                categoryItems.forEach(item => {
                    item.style.display = 'flex';
                });
            }
        };
        
        // Add clear button
        const searchContainer = searchInput.parentElement;
        if (searchContainer) {
            const clearButton = document.createElement('i');
            clearButton.className = 'fas fa-times search-clear';
            clearButton.style.cssText = `
                position: absolute;
                right: 40px;
                top: 50%;
                transform: translateY(-50%);
                color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                display: none;
            `;
            searchContainer.appendChild(clearButton);
            
            clearButton.addEventListener('click', clearSearch);
            
            // Show/hide clear button
            searchInput.addEventListener('input', function() {
                clearButton.style.display = this.value ? 'block' : 'none';
            });
        }
        
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            // Filter games
            if (gameCards && gameCards.length > 0) {
                gameCards.forEach(card => {
                    const title = card.querySelector('.game-title')?.textContent.toLowerCase() || '';
                    const desc = card.querySelector('.game-desc')?.textContent.toLowerCase() || '';
                    const provider = card.querySelector('.game-provider')?.textContent.toLowerCase() || '';
                    
                    if (title.includes(searchTerm) || desc.includes(searchTerm) || provider.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            // Filter categories
            if (categoryItems && categoryItems.length > 0) {
                categoryItems.forEach(item => {
                    const categoryName = item.querySelector('span:first-of-type')?.textContent.toLowerCase() || '';
                    
                    if (categoryName.includes(searchTerm) || searchTerm === '') {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        };
        
        searchInput.addEventListener('keyup', performSearch);
        searchIcon.addEventListener('click', performSearch);
        
        // Clear search on Escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                clearSearch();
            }
        });
    }

    // Category Filter
    if (categoryItems && categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Prevent default only if we're filtering, not if we're navigating to a link
                if (gameCards && gameCards.length > 0) {
                    e.preventDefault();
                    
                    const category = this.classList[1]; // trending, featured, vip, etc.
                    
                    // Remove active class from all categories
                    categoryItems.forEach(cat => cat.classList.remove('active'));
                    
                    // Add active class to clicked category
                    this.classList.add('active');
                    
                    // Filter games based on category
                    if (category === 'trending') {
                        filterGamesByAttribute('data-trending', 'true');
                    } else if (category === 'featured') {
                        filterGamesByAttribute('data-featured', 'true');
                    } else if (category === 'vip') {
                        filterGamesByAttribute('data-vip', 'true');
                    } else if (category === 'jackpot') {
                        filterGamesByAttribute('data-jackpot', 'true');
                    } else if (category === 'latest') {
                        filterGamesByAttribute('data-latest', 'true');
                    } else if (category === 'popular') {
                        filterGamesByAttribute('data-popular', 'true');
                    } else if (category === 'new') {
                        filterGamesByAttribute('data-new', 'true');
                    }
                }
            });
        });
    }
    
    function filterGamesByAttribute(attribute, value) {
        if (gameCards && gameCards.length > 0) {
            gameCards.forEach(card => {
                if (card.getAttribute(attribute) === value) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    }

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .game-card, .step-card, .testimonial-card, .story-card, .reward-card, .vip-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Ticker Animation Control
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        // Pause animation on hover
        ticker.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        ticker.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // Copy Bonus Code Functionality
    const bonusCodes = document.querySelectorAll('.code-value');
    bonusCodes.forEach(code => {
        code.addEventListener('click', function() {
            const text = this.textContent;
            
            // Copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    showNotification('Bonus code copied: ' + text);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Bonus code copied: ' + text);
            }
        });
    });

    // Notification System
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff88, #00cc6a);
            color: #000;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Game Card Hover Effects
    if (gameCards && gameCards.length > 0) {
        gameCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Button Click Effects
    const buttons = document.querySelectorAll('a[class*="btn-"], button[class*="btn-"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[src=""]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Set a placeholder gradient background
                img.style.background = 'linear-gradient(135deg, #374151, #4b5563)';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Countdown Timer for Promotions
    const countdownElements = document.querySelectorAll('.promo-timer');
    countdownElements.forEach(element => {
        const timerText = element.querySelector('span');
        if (timerText && timerText.textContent.includes('days')) {
            const days = parseInt(timerText.textContent.match(/\d+/)[0]);
            const endTime = new Date().getTime() + (days * 24 * 60 * 60 * 1000);
            
            const updateTimer = () => {
                const now = new Date().getTime();
                const distance = endTime - now;
                
                if (distance > 0) {
                    const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    
                    timerText.textContent = `Ends in ${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
                } else {
                    timerText.textContent = 'Promotion Ended';
                    element.style.opacity = '0.5';
                }
            };
            
            updateTimer();
            setInterval(updateTimer, 60000); // Update every minute
        }
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #000;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Performance Optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler
    const handleScroll = debounce(function() {
        // Add any scroll-based functionality here
        const header = document.querySelector('.header');
        if (window.pageYOffset > 100) {
            header.style.background = 'rgba(10, 14, 26, 0.98)';
        } else {
            header.style.background = 'rgba(10, 14, 26, 0.95)';
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Initialize tooltips for bonus codes
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #000;
                color: #fff;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
            
            this.addEventListener('mouseleave', function() {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, { once: true });
        });
    });

    // Winner rotation in ticker
    const rotateWinners = () => {
        const winners = document.querySelectorAll('.ticker-item.winner');
        if (winners.length > 0) {
            let activeIndex = 0;
            
            // Find current active winner
            winners.forEach((winner, index) => {
                if (winner.classList.contains('active')) {
                    activeIndex = index;
                    winner.classList.remove('active');
                }
            });
            
            // Set next winner as active
            const nextIndex = (activeIndex + 1) % winners.length;
            winners[nextIndex].classList.add('active');
        }
    };
    
    // Rotate winners every 5 seconds
    if (document.querySelector('.winner-slider')) {
        setInterval(rotateWinners, 5000);
    }

    // Categories toggle
    const categoriesTitle = document.querySelector('.categories-title');
    const categoryList = document.querySelector('.category-list');
    
    if (categoriesTitle && categoryList) {
        categoriesTitle.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            categoryList.style.display = this.classList.contains('collapsed') ? 'none' : 'block';
        });
    }

    console.log('NCW Casino website initialized successfully!');
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Implement your analytics tracking here
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href*="negolous.com"]')) {
        trackEvent('external_link_click', {
            url: e.target.href,
            text: e.target.textContent.trim()
        });
    }
});