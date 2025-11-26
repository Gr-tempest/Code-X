// Progress tracking system
class ProgressTracker {
    constructor() {
        this.defaultProgress = {
            totalXP: 0,
            level: 1,
            currentStreak: 0,
            lastCompleted: null,
            totalTime: 0, // in minutes
            completedLevels: {
                html: [],
                css: [],
                js: []
            },
            unlockedAchievements: [],
            startedAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
    }

    getProgress() {
        const saved = localStorage.getItem('codex-progress');
        if (saved) {
            const progress = JSON.parse(saved);
            // Ensure all required fields exist
            return { ...this.defaultProgress, ...progress };
        }
        // Initialize progress if it doesn't exist
        this.saveProgress(this.defaultProgress);
        return this.defaultProgress;
    }

    saveProgress(progress) {
        progress.lastUpdated = new Date().toISOString();
        localStorage.setItem('codex-progress', JSON.stringify(progress));
        this.updateDashboard();
        return progress;
    }

    addXP(amount) {
        const progress = this.getProgress();
        progress.totalXP += amount;
        
        // Calculate new level (100 XP per level)
        const newLevel = Math.floor(progress.totalXP / 100) + 1;
        if (newLevel > progress.level) {
            progress.level = newLevel;
            this.showLevelUpNotification(newLevel);
        }
        
        return this.saveProgress(progress);
    }

    completeLevel(language, levelNumber, timeSpent = 5) {
        const progress = this.getProgress();
        
        if (!progress.completedLevels[language].includes(levelNumber)) {
            progress.completedLevels[language].push(levelNumber);
            
            // Update streak
            const today = new Date().toDateString();
            if (progress.lastCompleted !== today) {
                progress.currentStreak++;
                progress.lastCompleted = today;
            }
            
            // Add XP for level completion
            const xpEarned = 10 + Math.floor(levelNumber / 10); // More XP for higher levels
            progress.totalXP += xpEarned;
            
            // Add time spent
            progress.totalTime += timeSpent;
            
            // Update level
            const newLevel = Math.floor(progress.totalXP / 100) + 1;
            if (newLevel > progress.level) {
                progress.level = newLevel;
                this.showLevelUpNotification(newLevel);
            }
            
            this.saveProgress(progress);
            this.checkAchievements();
            
            return {
                xpEarned,
                newLevel,
                streak: progress.currentStreak
            };
        }
        
        return null;
    }

    checkAchievements() {
        const progress = this.getProgress();
        const achievements = this.getAchievements();
        let newAchievements = [];
        
        achievements.forEach(achievement => {
            if (!progress.unlockedAchievements.includes(achievement.id) && 
                this.isAchievementUnlocked(achievement, progress)) {
                progress.unlockedAchievements.push(achievement.id);
                progress.totalXP += achievement.xp;
                newAchievements.push(achievement);
            }
        });
        
        if (newAchievements.length > 0) {
            this.saveProgress(progress);
            newAchievements.forEach(achievement => {
                this.showAchievementNotification(achievement);
            });
        }
        
        return newAchievements;
    }

    isAchievementUnlocked(achievement, progress) {
        const totalCompleted = progress.completedLevels.html.length + 
                             progress.completedLevels.css.length + 
                             progress.completedLevels.js.length;

        switch (achievement.type) {
            case 'levels_completed':
                return totalCompleted >= achievement.requirement;
                
            case 'language_master':
                return progress.completedLevels[achievement.language].length >= achievement.requirement;
                
            case 'streak':
                return progress.currentStreak >= achievement.requirement;
                
            case 'xp_milestone':
                return progress.totalXP >= achievement.requirement;
                
            case 'time_spent':
                return progress.totalTime >= achievement.requirement;
                
            case 'special':
                // Handle special achievements based on their specific requirements
                if (achievement.id === 'early_bird') {
                    const now = new Date();
                    return now.getHours() < 8;
                }
                if (achievement.id === 'night_owl') {
                    const now = new Date();
                    return now.getHours() >= 22;
                }
                return false;
                
            default:
                return false;
        }
    }

    getAchievements() {
        // In a real app, this would fetch from achievements.json
        // For now, return a comprehensive set
        return [
            {
                id: 'first_steps',
                name: 'First Steps',
                description: 'Complete your first coding level',
                icon: '🚀',
                xp: 25,
                type: 'levels_completed',
                requirement: 1
            },
            {
                id: 'html_novice',
                name: 'HTML Novice',
                description: 'Complete 10 HTML levels',
                icon: '📄',
                xp: 50,
                type: 'language_master',
                language: 'html',
                requirement: 10
            },
            {
                id: 'css_novice',
                name: 'CSS Novice',
                description: 'Complete 10 CSS levels',
                icon: '🎨',
                xp: 50,
                type: 'language_master',
                language: 'css',
                requirement: 10
            },
            {
                id: 'js_novice',
                name: 'JavaScript Novice',
                description: 'Complete 10 JavaScript levels',
                icon: '⚡',
                xp: 50,
                type: 'language_master',
                language: 'js',
                requirement: 10
            },
            {
                id: 'week_warrior',
                name: 'Week Warrior',
                description: 'Maintain a 7-day streak',
                icon: '🔥',
                xp: 100,
                type: 'streak',
                requirement: 7
            },
            {
                id: 'code_apprentice',
                name: 'Code Apprentice',
                description: 'Reach 500 XP',
                icon: '⭐',
                xp: 150,
                type: 'xp_milestone',
                requirement: 500
            },
            {
                id: 'early_bird',
                name: 'Early Bird',
                description: 'Complete a level before 8 AM',
                icon: '🌅',
                xp: 75,
                type: 'special',
                requirement: 1
            }
        ];
    }

    showAchievementNotification(achievement) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notification-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievement.name}</p>
                    <span class="achievement-xp">+${achievement.xp} XP</span>
                </div>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--accent);
            border-radius: 8px;
            padding: 1rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">🎉</div>
                <div class="level-up-text">
                    <h4>Level Up!</h4>
                    <p>You've reached Level ${level}</p>
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            border: 2px solid var(--success);
            border-radius: 8px;
            padding: 1rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    updateDashboard() {
        // This would update the dashboard UI
        if (typeof window.updateDashboard === 'function') {
            window.updateDashboard();
        }
    }

    getLevelProgress() {
        const progress = this.getProgress();
        const xpForCurrentLevel = progress.totalXP % 100;
        const xpForNextLevel = 100 - xpForCurrentLevel;
        
        return {
            level: progress.level,
            totalXP: progress.totalXP,
            xpToNextLevel: xpForNextLevel,
            xpPercentage: (xpForCurrentLevel / 100) * 100,
            completedLevels: progress.completedLevels,
            currentStreak: progress.currentStreak,
            totalTime: progress.totalTime
        };
    }

    // Reset progress (for testing)
    resetProgress() {
        this.saveProgress(this.defaultProgress);
        return this.defaultProgress;
    }
}

// Global progress tracker instance
const progressTracker = new ProgressTracker();

// Helper functions for global access
function getProgress() {
    return progressTracker.getProgress();
}

function saveProgress(progress) {
    return progressTracker.saveProgress(progress);
}

function completeLevel(language, levelNumber, timeSpent = 5) {
    return progressTracker.completeLevel(language, levelNumber, timeSpent);
}

function addXP(amount) {
    return progressTracker.addXP(amount);
}

function updateAchievements() {
    return progressTracker.checkAchievements();
}

function isAchievementUnlocked(achievement, progress) {
    return progressTracker.isAchievementUnlocked(achievement, progress);
}

// Initialize progress if not exists
if (!localStorage.getItem('codex-progress')) {
    progressTracker.saveProgress(progressTracker.defaultProgress);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .no-achievements-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 2rem;
        background: var(--bg-secondary);
        border-radius: 8px;
        border: 2px dashed var(--border);
    }
    
    .no-achievements-message .achievement-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);