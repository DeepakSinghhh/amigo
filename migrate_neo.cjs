const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/clay-card-inset/g, 'neo-card-inset')
        .replace(/clay-card/g, 'neo-card')
        .replace(/clay-button/g, 'neo-button')
        .replace(/clay-badge/g, 'neo-badge')
        .replace(/clay-input/g, 'neo-input')
        .replace(/clay-nav/g, 'neo-nav')
        .replace(/clay-bg-coral/g, 'neo-bg-coral')
        .replace(/clay-bg-peach/g, 'neo-bg-peach')
        .replace(/clay-bg-mint/g, 'neo-bg-mint')
        .replace(/clay-bg-sky/g, 'neo-bg-sky')
        .replace(/clay-bg-lavender/g, 'neo-bg-lavender')
        .replace(/clay-bg-amber/g, 'neo-bg-amber')
        .replace(/animate-clay-fade-up/g, 'animate-neo-fade-up')
        .replace(/animate-clay-float/g, 'animate-neo-float')
        .replace(/animate-clay-pulse/g, 'animate-neo-pulse')
        .replace(/var\(--clay-/g, 'var(--neo-');
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function processDir(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            if (item !== 'node_modules' && item !== '.git' && item !== '.gemini' && item !== 'styles' && item !== 'dist') {
                processDir(fullPath);
            }
        } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item === 'App.tsx') {
            replaceInFile(fullPath);
        }
    }
}

processDir('c:\\Users\\deepa\\MEN\\amigo');
console.log('Done migrating to Neobrutalism.');
