// Animation management system
class AnimationManager {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Level up animation
        document.addEventListener('levelUp', (event) => {
            this.showLevelUpAnimation(event.detail.level);
        });

        // Level complete animation
        document.addEventListener('levelComplete', (event) => {
            this.showLevelCompleteAnimation(event.detail.language, event.detail.level);
        });

        // Achievement unlocked animation
        document.addEventListener('achievementUnlocked', (event) => {
            this.showAchievementAnimation(event.detail.achievement);
        });
    }

    showLevelUpAnimation(level) {
        const animation = document.createElement('div');
        animation.className = 'level-up-animation animate-bounceIn';
        animation.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">🎉</div>
                <h3>Level Up!</h3>
                <p>You've reached Level ${level}</p>
            </div>
        `;

        this.showFullscreenAnimation(animation);
    }

    showLevelCompleteAnimation(language, level) {
        const animation = document.createElement('div');
        animation.className = 'level-complete-animation animate-bounceIn';
        animation.innerHTML = `
            <div class="level-complete-content">
                <div class="level-complete-icon">✅</div>
                <h3>Level Complete!</h3>
                <p>${language.toUpperCase()} Level ${level}</p>
                <div class="confetti"></div>
            </div>
        `;

        this.showFullscreenAnimation(animation);
        this.createConfetti();
    }

    showAchievementAnimation(achievement) {
        const animation = document.createElement('div');
        animation.className = 'achievement-animation animate-bounceIn';
        animation.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3>Achievement Unlocked!</h3>
                <p>${achievement.name}</p>
                <span class="achievement-xp">+${achievement.xp} XP</span>
            </div>
        `;

        this.showFullscreenAnimation(animation);
    }

    showFullscreenAnimation(animationElement) {
        const overlay = document.createElement('div');
        overlay.className = 'animation-overlay';
        overlay.appendChild(animationElement);

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500);
        }, 2000);
    }

    createConfetti() {
        const colors = ['#00d4ff', '#ff4444', '#00ff88', '#ffaa00', '#764ba2'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Button loading animation
    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('btn-loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
        }
    }

    // Progress bar animation
    animateProgressBar(progressBar, targetWidth) {
        progressBar.style.setProperty('--progress-width', targetWidth + '%');
        progressBar.classList.add('animate-progress');
        
        setTimeout(() => {
            progressBar.classList.remove('animate-progress');
        }, 1000);
    }

    // Shake element
    shakeElement(element) {
        element.classList.add('animate-shake');
        setTimeout(() => {
            element.classList.remove('animate-shake');
        }, 500);
    }

    // Typewriter effect
    typewriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Fade in elements on scroll
    initializeScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();

// CSS for animations (dynamically added)
const animationStyles = `
.animation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.animation-overlay.fade-out {
    animation: fadeOut 0.5s ease forwards;
}

.level-up-animation,
.level-complete-animation,
.achievement-animation {
    background: var(--bg-secondary);
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 2px solid var(--accent);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.level-up-icon,
.level-complete-icon,
.achievement-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.confetti-piece {
    position: fixed;
    width: 10px;
    height: 10px;
    background: var(--accent);
    animation: confetti-fall 3s linear forwards;
}

@keyframes confetti-fall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
}

.notification {
    background: var(--bg-secondary);
    border-left: 4px solid var(--accent);
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    min-width: 300px;
}

.notification-success {
    border-left-color: var(--success);
}

.notification-error {
    border-left-color: var(--danger);
}

.notification-warning {
    border-left-color: var(--warning);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-icon {
    font-size: 1.2rem;
}

.validation-message {
    color: var(--danger);
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: none;
}

.form-group input.error {
    border-color: var(--danger);
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export for global use
window.animationManager = animationManager;