// User Management System
class UserManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
    }

    loadUsers() {
        const usersData = localStorage.getItem('codex-users');
        return usersData ? JSON.parse(usersData) : {};
    }

    saveUsers() {
        localStorage.setItem('codex-users', JSON.stringify(this.users));
    }

    generateUserId(email) {
        return 'user_' + btoa(email).replace(/[+/=]/g, '').substring(0, 16);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    registerUser(name, email, password) {
        // Validation
        if (!this.validateName(name)) {
            throw new Error('Name must be at least 2 characters long');
        }

        if (!this.validateEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        if (!this.validatePassword(password)) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Check if user already exists
        if (this.users[email]) {
            throw new Error('User with this email already exists');
        }

        // Create user
        const userId = this.generateUserId(email);
        const user = {
            id: userId,
            name: name.trim(),
            email: email.toLowerCase(),
            joined: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        // Save user
        this.users[email] = user;
        this.saveUsers();

        // Initialize user folder
        this.initializeUserFolder(user);

        return user;
    }

    loginUser(email, password) {
        const user = this.users[email];
        
        if (!user) {
            throw new Error('No account found with this email');
        }

        // In a real app, you'd verify the password hash
        // For demo, we'll accept any password for existing users
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        return user;
    }

    initializeUserFolder(user) {
        const userFolder = `userdata/${user.id}`;
        
        // Initialize progress
        const progress = {
            totalXP: 0,
            level: 1,
            currentStreak: 0,
            lastCompleted: null,
            totalTime: 0,
            completedLevels: { html: [], css: [], js: [] },
            unlockedAchievements: [],
            userFolder: userFolder,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(`${userFolder}/progress.json`, JSON.stringify(progress));
        
        // Initialize achievements
        localStorage.setItem(`${userFolder}/achievements.json`, JSON.stringify([]));
        
        // Initialize code folders
        ['html', 'css', 'js'].forEach(language => {
            for (let i = 1; i <= 100; i++) {
                const codeKey = `${userFolder}/code/${language}/level-${i}.js`;
                localStorage.setItem(codeKey, '');
            }
        });

        // Create user settings
        const settings = {
            theme: 'dark',
            soundEnabled: true,
            autoSave: true,
            fontSize: 14,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(`${userFolder}/settings.json`, JSON.stringify(settings));
    }

    importUserData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    // Validate imported data structure
                    if (!this.validateImportedData(data)) {
                        throw new Error('Invalid data format');
                    }

                    // Check if user already exists
                    if (this.users[data.user.email]) {
                        throw new Error('User with this email already exists');
                    }

                    // Register the imported user
                    const user = this.registerUser(
                        data.user.name,
                        data.user.email,
                        'imported-' + Date.now() // Generate a temporary password
                    );

                    // Import progress
                    if (data.progress) {
                        const userFolder = `userdata/${user.id}`;
                        localStorage.setItem(`${userFolder}/progress.json`, JSON.stringify(data.progress));
                    }

                    // Import achievements
                    if (data.achievements) {
                        const userFolder = `userdata/${user.id}`;
                        localStorage.setItem(`${userFolder}/achievements.json`, JSON.stringify(data.achievements));
                    }

                    // Import code
                    if (data.code) {
                        Object.keys(data.code).forEach(language => {
                            Object.keys(data.code[language]).forEach(levelKey => {
                                const levelNumber = parseInt(levelKey.split('-')[1]);
                                const userFolder = `userdata/${user.id}`;
                                const codeKey = `${userFolder}/code/${language}/level-${levelNumber}.js`;
                                localStorage.setItem(codeKey, data.code[language][levelKey]);
                            });
                        });
                    }

                    resolve(user);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    validateImportedData(data) {
        return data && 
               data.user && 
               data.user.id && 
               data.user.name && 
               data.user.email;
    }

    exportUserData(user) {
        const userFolder = `userdata/${user.id}`;
        
        const data = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            user: user,
            progress: JSON.parse(localStorage.getItem(`${userFolder}/progress.json`) || '{}'),
            achievements: JSON.parse(localStorage.getItem(`${userFolder}/achievements.json`) || '[]'),
            code: {},
            settings: JSON.parse(localStorage.getItem(`${userFolder}/settings.json`) || '{}')
        };

        // Collect all user code
        ['html', 'css', 'js'].forEach(language => {
            data.code[language] = {};
            for (let i = 1; i <= 100; i++) {
                const code = localStorage.getItem(`${userFolder}/code/${language}/level-${i}.js`);
                if (code) {
                    data.code[language][`level-${i}`] = code;
                }
            }
        });

        return data;
    }

    getCurrentUser() {
        const currentUserData = localStorage.getItem('codex-current-user');
        return currentUserData ? JSON.parse(currentUserData) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem('codex-current-user', JSON.stringify(user));
        this.currentUser = user;
    }

    logoutUser() {
        localStorage.removeItem('codex-current-user');
        this.currentUser = null;
    }

    getUserStats(user) {
        const userFolder = `userdata/${user.id}`;
        const progress = JSON.parse(localStorage.getItem(`${userFolder}/progress.json`) || '{}');
        
        const totalCompleted = progress.completedLevels ? 
            progress.completedLevels.html.length + 
            progress.completedLevels.css.length + 
            progress.completedLevels.js.length : 0;

        return {
            totalCompleted,
            totalXP: progress.totalXP || 0,
            level: progress.level || 1,
            streak: progress.currentStreak || 0
        };
    }

    getAllUsersStats() {
        const stats = {};
        Object.keys(this.users).forEach(email => {
            stats[email] = this.getUserStats(this.users[email]);
        });
        return stats;
    }

    deleteUser(email) {
        if (this.users[email]) {
            const user = this.users[email];
            
            // Remove user data
            const userFolder = `userdata/${user.id}`;
            this.removeUserFolder(userFolder);
            
            // Remove from users list
            delete this.users[email];
            this.saveUsers();
            
            // If current user is deleted, logout
            if (this.currentUser && this.currentUser.email === email) {
                this.logoutUser();
            }
        }
    }

    removeUserFolder(userFolder) {
        // Remove all items in user folder
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(userFolder)) {
                localStorage.removeItem(key);
            }
        }
    }
}

// Global user manager instance
const userManager = new UserManager();

// Helper functions
function registerUser(name, email, password) {
    return userManager.registerUser(name, email, password);
}

function loginUser(email, password) {
    return userManager.loginUser(email, password);
}

function exportUserData() {
    const user = userManager.getCurrentUser();
    return user ? userManager.exportUserData(user) : null;
}

function importUserData(file) {
    return userManager.importUserData(file);
}

function getCurrentUser() {
    return userManager.getCurrentUser();
}

function setCurrentUser(user) {
    return userManager.setCurrentUser(user);
}

function logoutUser() {
    return userManager.logoutUser();
}

function validateEmail(email) {
    return userManager.validateEmail(email);
}

function validatePassword(password) {
    return userManager.validatePassword(password);
}

function validateName(name) {
    return userManager.validateName(name);
}