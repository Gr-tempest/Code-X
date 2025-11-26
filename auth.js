// User Authentication System
class AuthSystem {
    constructor() {
        this.usersKey = 'codex-users';
        this.currentUserKey = 'codex-current-user';
        this.initializeUsers();
    }

    initializeUsers() {
        if (!localStorage.getItem(this.usersKey)) {
            localStorage.setItem(this.usersKey, JSON.stringify({}));
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey)) || {};
    }

    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    async registerUser(username, email, password) {
        const users = this.getUsers();
        
        // Check if username already exists
        if (users[username]) {
            return { success: false, message: 'Username already exists' };
        }

        // Create user profile
        const userProfile = {
            username,
            email,
            password: await this.hashPassword(password), // In real app, use proper hashing
            joined: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            progress: this.createDefaultProgress()
        };

        users[username] = userProfile;
        this.saveUsers(users);
        
        // Set as current user
        this.setCurrentUser(username);
        
        return { success: true, user: userProfile };
    }

    async loginUser(username, password) {
        const users = this.getUsers();
        const user = users[username];
        
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Verify password (in real app, use proper password verification)
        const passwordValid = await this.verifyPassword(password, user.password);
        if (!passwordValid) {
            return { success: false, message: 'Invalid password' };
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        users[username] = user;
        this.saveUsers(users);
        
        // Set as current user
        this.setCurrentUser(username);
        
        return { success: true, user };
    }

    logoutUser() {
        localStorage.removeItem(this.currentUserKey);
        localStorage.removeItem('codex-demo-user');
    }

    setCurrentUser(username) {
        localStorage.setItem(this.currentUserKey, username);
    }

    getCurrentUser() {
        const username = localStorage.getItem(this.currentUserKey);
        const demoUser = localStorage.getItem('codex-demo-user');
        
        if (demoUser) {
            return JSON.parse(demoUser);
        }
        
        if (!username) return null;
        
        const users = this.getUsers();
        return users[username] || null;
    }

    getCurrentUsername() {
        const user = this.getCurrentUser();
        return user ? user.username : null;
    }

    // Simple password hashing (for demo purposes - use proper hashing in production)
    async hashPassword(password) {
        // In a real application, use: await bcrypt.hash(password, 12)
        return btoa(password); // Base64 encoding for demo
    }

    async verifyPassword(password, hashedPassword) {
        // In a real application, use: await bcrypt.compare(password, hashedPassword)
        return btoa(password) === hashedPassword;
    }

    createDefaultProgress() {
        return {
            totalXP: 0,
            level: 1,
            currentStreak: 0,
            lastCompleted: null,
            totalTime: 0,
            completedLevels: {
                html: [],
                css: [],
                js: []
            },
            unlockedAchievements: [],
            currentLevels: {
                html: 1,
                css: 1,
                js: 1
            }
        };
    }

    getUserProgress() {
        const user = this.getCurrentUser();
        return user ? user.progress : null;
    }

    saveUserProgress(progress) {
        const username = this.getCurrentUsername();
        if (!username) return false;

        const users = this.getUsers();
        if (users[username]) {
            users[username].progress = progress;
            this.saveUsers(users);
            return true;
        }
        return false;
    }

    updateUserLevel(language, levelNumber) {
        const progress = this.getUserProgress();
        if (!progress) return false;

        progress.currentLevels[language] = Math.max(progress.currentLevels[language], levelNumber);
        return this.saveUserProgress(progress);
    }

    isDemoUser() {
        const user = this.getCurrentUser();
        return user && user.demo === true;
    }
}

// Global auth system instance
const authSystem = new AuthSystem();

// Helper functions for global access
function registerUser(username, email, password) {
    return authSystem.registerUser(username, email, password);
}

function loginUser(username, password) {
    return authSystem.loginUser(username, password);
}

function logoutUser() {
    return authSystem.logoutUser();
}

function getCurrentUser() {
    return authSystem.getCurrentUser();
}

function getCurrentUsername() {
    return authSystem.getCurrentUsername();
}

function getUserProgress() {
    return authSystem.getUserProgress();
}

function saveUserProgress(progress) {
    return authSystem.saveUserProgress(progress);
}

function updateUserLevel(language, levelNumber) {
    return authSystem.updateUserLevel(language, levelNumber);
}

function isDemoUser() {
    return authSystem.isDemoUser();
}