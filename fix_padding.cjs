const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\deepa\\MEN\\amigo\\components';
const files = fs.readdirSync(dir);

let totalReplaced = 0;

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace p-X with !p-X if it's inside a className that also has clay-card or clay-card-inset
    const newContent = content.replace(/className="([^"]*)"/g, (match, classStr) => {
      if (classStr.includes('clay-card')) {
        // replace any p-\d+ with !p-\d+, avoiding !!p-
        const fixedClassStr = classStr.replace(/(?<!\!)p-(\d+)/g, '!p-$1');
        return `className="${fixedClassStr}"`;
      }
      return match;
    });

    if (content !== newContent) {
      fs.writeFileSync(path.join(dir, file), newContent);
      console.log(`Updated ${file}`);
      totalReplaced++;
    }
  }
});

console.log(`Total files updated: ${totalReplaced}`);
