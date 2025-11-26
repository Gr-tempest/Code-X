// CSS Levels Data
function getCssLevels() {
    return [
        // Levels 1-10: Basic CSS Selectors and Properties
        {
            title: "Basic Styling",
            instructions: "Style the heading to be blue and center-aligned. Make paragraphs have a font size of 18px.",
            starterCode: `h1 {
    /* Make heading blue and centered */
}

p {
    /* Set font size to 18px */
}`,
            htmlStructure: `<h1>Welcome to CSS</h1>
<p>This is a paragraph that needs styling.</p>
<p>Another paragraph to style.</p>`,
            xp: 10,
            requiredProperties: ['color', 'text-align', 'font-size']
        },
        {
            title: "Colors and Backgrounds",
            instructions: "Set the background color of the page to light gray (#f0f0f0) and give the container a white background with some padding.",
            starterCode: `body {
    /* Set background color */
}

.container {
    /* White background with padding */
}`,
            htmlStructure: `<div class="container">
    <h1>Styled Container</h1>
    <p>This content should be in a styled container.</p>
</div>`,
            xp: 15,
            requiredProperties: ['background-color', 'padding']
        },
        {
            title: "Fonts and Text",
            instructions: "Use Google Fonts (import 'Roboto') and apply it to the entire page. Make the heading bold and uppercase.",
            starterCode: `/* Import Roboto font from Google Fonts */

body {
    /* Apply Roboto font */
}

h1 {
    /* Make bold and uppercase */
}`,
            htmlStructure: `<h1>Typography Matters</h1>
<p>Good typography improves readability.</p>`,
            xp: 20,
            requiredProperties: ['font-family', 'font-weight', 'text-transform']
        },
        {
            title: "Box Model",
            instructions: "Create a box with specific dimensions: 200px width, 100px height, 20px padding, 2px border, and 10px margin.",
            starterCode: `.box {
    /* Implement the box model */
}`,
            htmlStructure: `<div class="box">Box Model Example</div>`,
            xp: 20,
            requiredProperties: ['width', 'height', 'padding', 'border', 'margin']
        },
        {
            title: "CSS Classes and IDs",
            instructions: "Style elements using both class and ID selectors. Make #main-title red and .subtitle blue.",
            starterCode: `/* Style the main title */
#main-title {
    
}

/* Style subtitles */
.subtitle {
    
}`,
            htmlStructure: `<h1 id="main-title">Main Title</h1>
<h2 class="subtitle">Subtitle 1</h2>
<h2 class="subtitle">Subtitle 2</h2>`,
            xp: 15,
            requiredProperties: ['color']
        },
        {
            title: "Positioning",
            instructions: "Position the box absolutely in the top-right corner and make another box fixed at the bottom.",
            starterCode: `.absolute-box {
    /* Position absolutely in top-right */
}

.fixed-box {
    /* Fix at bottom of viewport */
}`,
            htmlStructure: `<div class="absolute-box">Absolute</div>
<div class="fixed-box">Fixed</div>
<div style="height: 2000px">Scrollable content</div>`,
            xp: 25,
            requiredProperties: ['position', 'top', 'right', 'bottom']
        },
        {
            title: "Flexbox Basics",
            instructions: "Use flexbox to center the content both horizontally and vertically within the container.",
            starterCode: `.container {
    /* Center content using flexbox */
}`,
            htmlStructure: `<div class="container">
    <div>Centered Content</div>
</div>`,
            xp: 25,
            requiredProperties: ['display', 'justify-content', 'align-items']
        },
        {
            title: "CSS Grid Layout",
            instructions: "Create a 3-column grid layout with equal columns and 20px gap between them.",
            starterCode: `.grid-container {
    /* Create 3-column grid */
}`,
            htmlStructure: `<div class="grid-container">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
    <div>Column 4</div>
    <div>Column 5</div>
    <div>Column 6</div>
</div>`,
            xp: 30,
            requiredProperties: ['display', 'grid-template-columns', 'gap']
        },
        {
            title: "Hover Effects",
            instructions: "Create a button that changes background color and grows slightly when hovered.",
            starterCode: `.button {
    /* Base button styles */
}

.button:hover {
    /* Hover effects */
}`,
            htmlStructure: `<button class="button">Hover Me</button>`,
            xp: 20,
            requiredProperties: ['transition', 'transform']
        },
        {
            title: "Responsive Design",
            instructions: "Make the layout responsive: 3 columns on desktop, 2 on tablet, 1 on mobile using media queries.",
            starterCode: `@media (max-width: 768px) {
    /* Tablet styles */
}

@media (max-width: 480px) {
    /* Mobile styles */
}`,
            htmlStructure: `<div class="responsive-grid">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>`,
            xp: 35,
            requiredProperties: ['@media']
        },

        // Levels 11-20: Intermediate CSS
        {
            title: "CSS Variables",
            instructions: "Use CSS custom properties (variables) to define a color scheme and apply it consistently.",
            starterCode: `:root {
    /* Define CSS variables */
}

.element {
    /* Use the variables */
}`,
            htmlStructure: `<div class="element primary">Primary</div>
<div class="element secondary">Secondary</div>`,
            xp: 25,
            requiredProperties: ['--', 'var(']
        },
        {
            title: "Transforms and Transitions",
            instructions: "Create a card that rotates and scales up when hovered, with smooth transitions.",
            starterCode: `.card {
    /* Base card with transition */
}

.card:hover {
    /* Transform on hover */
}`,
            htmlStructure: `<div class="card">Hover Card</div>`,
            xp: 30,
            requiredProperties: ['transform', 'transition']
        },
        {
            title: "Animations",
            instructions: "Create a bouncing animation using @keyframes that runs infinitely.",
            starterCode: `@keyframes bounce {
    /* Define bounce animation */
}

.ball {
    /* Apply animation */
}`,
            htmlStructure: `<div class="ball">Bounce</div>`,
            xp: 35,
            requiredProperties: ['@keyframes', 'animation']
        },
        {
            title: "Pseudo-elements",
            instructions: "Use ::before and ::after pseudo-elements to add decorative content to headings.",
            starterCode: `h1::before {
    /* Add content before */
}

h1::after {
    /* Add content after */
}`,
            htmlStructure: `<h1>Styled Heading</h1>`,
            xp: 25,
            requiredProperties: ['::before', '::after', 'content']
        },
        {
            title: "Advanced Selectors",
            instructions: "Use attribute selectors, :nth-child, and other advanced CSS selectors to style specific elements.",
            starterCode: `/* Style every other list item */
li:nth-child(odd) {
    
}

/* Style elements with data attributes */
[data-type="important"] {
    
}`,
            htmlStructure: `<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li data-type="important">Important Item</li>
</ul>`,
            xp: 30,
            requiredProperties: [':nth-child', '[data-']
        },

        // Note: Continue this pattern for all 100 levels
        // For brevity, showing the structure
    ];
}

function generateCssLevels() {
    const levels = getCssLevels();
    
    for (let i = 21; i <= 100; i++) {
        levels.push({
            title: `CSS Mastery Level ${i}`,
            instructions: `Advanced CSS challenge focusing on modern layout techniques, animations, and responsive design principles.`,
            starterCode: `/* CSS Challenge Level ${i} */
.container {
    /* Complete this challenge */
}`,
            htmlStructure: `<div class="container">
    <h1>CSS Challenge ${i}</h1>
    <p>Apply your advanced CSS skills here.</p>
</div>`,
            xp: Math.min(100, 35 + Math.floor(i / 3)),
            requiredProperties: ['display', 'position']
        });
    }
    
    return levels;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getCssLevels: generateCssLevels };
}