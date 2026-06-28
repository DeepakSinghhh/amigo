const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
        .replace(/AmiGo/g, 'Chaitanya')
        .replace(/Amigo/g, 'Chaitanya')
        .replace(/amigo/g, 'chaitanya');
    
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
            if (item !== 'node_modules' && item !== '.git' && item !== '.gemini') {
                processDir(fullPath);
            }
        } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.json') || item.endsWith('.html')) {
            replaceInFile(fullPath);
        }
    }
}

processDir('c:\\Users\\deepa\\MEN\\amigo');
console.log('Done.');
