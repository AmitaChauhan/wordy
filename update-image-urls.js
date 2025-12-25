const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'index.html');
const imagesDir = path.join(__dirname, 'images');

// Get list of downloaded images
const downloadedImages = fs.readdirSync(imagesDir);
console.log(`Found ${downloadedImages.length} local images`);

// Read the HTML file
let html = fs.readFileSync(htmlFile, 'utf8');

// Update URLs for downloaded images
let updatedCount = 0;
downloadedImages.forEach(imageFile => {
    const wordName = imageFile.replace('.png', '');

    // Pattern to match: { word: "wordName", image: "https://..." }
    const pattern = new RegExp(
        `(\\{\\s*word:\\s*"${wordName}"\\s*,\\s*image:\\s*)"https://freesvg\\.org/[^"]*"`,
        'g'
    );

    const replacement = `$1"images/${imageFile}"`;

    if (pattern.test(html)) {
        html = html.replace(pattern, replacement);
        updatedCount++;
        console.log(`✓ Updated: ${wordName}`);
    }
});

// Write the updated HTML back
fs.writeFileSync(htmlFile, html, 'utf8');

console.log(`\n✓ Updated ${updatedCount} image URLs to local paths`);
console.log(`✓ HTML file saved`);
