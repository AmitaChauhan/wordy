const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Word database with image URLs
const wordDatabase = [
    { word: "cat", image: "https://freesvg.org/img/1538298917.png" },
    { word: "dog", image: "https://freesvg.org/img/Dog.png" },
    { word: "fish", image: "https://freesvg.org/img/fish1.png" },
    { word: "bird", image: "https://freesvg.org/img/bird-silhouette.png" },
    { word: "tree", image: "https://freesvg.org/img/1541083863.png" },
    { word: "star", image: "https://freesvg.org/img/star.png" },
    { word: "moon", image: "https://freesvg.org/img/moon.png" },
    { word: "sun", image: "https://freesvg.org/img/weather-icon.png" },
    { word: "car", image: "https://freesvg.org/img/car_003.png" },
    { word: "bus", image: "https://freesvg.org/img/DustyBus.png" },
    { word: "ball", image: "https://freesvg.org/img/football.png" },
    { word: "book", image: "https://freesvg.org/img/book.png" },
    { word: "cup", image: "https://freesvg.org/img/cup.png" },
    { word: "hat", image: "https://freesvg.org/img/hat2.png" },
    { word: "shoe", image: "https://freesvg.org/img/shoe.png" },
    { word: "duck", image: "https://freesvg.org/img/duck.png" },
    { word: "frog", image: "https://freesvg.org/img/frog.png" },
    { word: "bear", image: "https://freesvg.org/img/bear.png" },
    { word: "lion", image: "https://freesvg.org/img/lion.png" },
    { word: "bee", image: "https://freesvg.org/img/bee.png" },
    { word: "boat", image: "https://freesvg.org/img/sailboat.png" },
    { word: "bell", image: "https://freesvg.org/img/bell.png" },
    { word: "drum", image: "https://freesvg.org/img/drum.png" },
    { word: "egg", image: "https://freesvg.org/img/egg.png" },
    { word: "fork", image: "https://freesvg.org/img/fork.png" },
    { word: "flag", image: "https://freesvg.org/img/flag.png" },
    { word: "hand", image: "https://freesvg.org/img/hand.png" },
    { word: "key", image: "https://freesvg.org/img/key.png" },
    { word: "leaf", image: "https://freesvg.org/img/leaf.png" },
    { word: "pen", image: "https://freesvg.org/img/pen.png" },
    { word: "owl", image: "https://freesvg.org/img/owl.png" },
    { word: "fox", image: "https://freesvg.org/img/fox.png" },
    { word: "pig", image: "https://freesvg.org/img/pig.png" },
    { word: "cow", image: "https://freesvg.org/img/cow.png" },
    { word: "bat", image: "https://freesvg.org/img/bat.png" },
    { word: "ant", image: "https://freesvg.org/img/ant.png" },
    { word: "fly", image: "https://freesvg.org/img/fly.png" },
    { word: "crab", image: "https://freesvg.org/img/crab.png" },
    { word: "seal", image: "https://freesvg.org/img/seal.png" },
    { word: "deer", image: "https://freesvg.org/img/deer.png" },
    { word: "wolf", image: "https://freesvg.org/img/wolf.png" },
    { word: "goat", image: "https://freesvg.org/img/goat.png" },
    { word: "lamb", image: "https://freesvg.org/img/lamb.png" },
    { word: "pony", image: "https://freesvg.org/img/pony.png" },
    { word: "ship", image: "https://freesvg.org/img/ship.png" },
    { word: "kite", image: "https://freesvg.org/img/kite.png" },
    { word: "bike", image: "https://freesvg.org/img/bicycle.png" },
    { word: "plane", image: "https://freesvg.org/img/airplane.png" },
    { word: "train", image: "https://freesvg.org/img/train.png" },
    { word: "truck", image: "https://freesvg.org/img/truck.png" },
    { word: "house", image: "https://freesvg.org/img/house.png" },
    { word: "door", image: "https://freesvg.org/img/door.png" },
    { word: "chair", image: "https://freesvg.org/img/chair.png" },
    { word: "table", image: "https://freesvg.org/img/table.png" },
    { word: "bed", image: "https://freesvg.org/img/bed.png" },
    { word: "lamp", image: "https://freesvg.org/img/lamp.png" },
    { word: "clock", image: "https://freesvg.org/img/clock.png" },
    { word: "phone", image: "https://freesvg.org/img/phone.png" },
    { word: "apple", image: "https://freesvg.org/img/apple.png" },
    { word: "pear", image: "https://freesvg.org/img/pear.png" },
    { word: "corn", image: "https://freesvg.org/img/corn.png" },
    { word: "bread", image: "https://freesvg.org/img/bread.png" },
    { word: "cake", image: "https://freesvg.org/img/cake.png" },
    { word: "pizza", image: "https://freesvg.org/img/pizza.png" },
    { word: "carrot", image: "https://freesvg.org/img/carrot.png" },
    { word: "onion", image: "https://freesvg.org/img/onion.png" },
    { word: "milk", image: "https://freesvg.org/img/milk.png" },
    { word: "water", image: "https://freesvg.org/img/water.png" },
    { word: "spoon", image: "https://freesvg.org/img/spoon.png" },
    { word: "knife", image: "https://freesvg.org/img/knife.png" },
    { word: "plate", image: "https://freesvg.org/img/plate.png" },
    { word: "bowl", image: "https://freesvg.org/img/bowl.png" },
    { word: "coat", image: "https://freesvg.org/img/coat.png" },
    { word: "shirt", image: "https://freesvg.org/img/shirt.png" },
    { word: "pants", image: "https://freesvg.org/img/pants.png" },
    { word: "sock", image: "https://freesvg.org/img/sock.png" },
    { word: "boot", image: "https://freesvg.org/img/boot.png" },
    { word: "glove", image: "https://freesvg.org/img/glove.png" },
    { word: "scarf", image: "https://freesvg.org/img/scarf.png" },
    { word: "ring", image: "https://freesvg.org/img/ring.png" },
    { word: "crown", image: "https://freesvg.org/img/crown.png" },
    { word: "gift", image: "https://freesvg.org/img/gift.png" },
    { word: "candy", image: "https://freesvg.org/img/candy.png" },
    { word: "tent", image: "https://freesvg.org/img/tent.png" },
    { word: "cloud", image: "https://freesvg.org/img/cloud.png" },
    { word: "rain", image: "https://freesvg.org/img/rain.png" },
    { word: "snow", image: "https://freesvg.org/img/snow.png" },
    { word: "fire", image: "https://freesvg.org/img/fire.png" },
    { word: "light", image: "https://freesvg.org/img/light.png" },
    { word: "music", image: "https://freesvg.org/img/music.png" },
    { word: "heart", image: "https://freesvg.org/img/heart.png" },
    { word: "smile", image: "https://freesvg.org/img/smile.png" }
];

const imagesDir = path.join(__dirname, 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Download a single image
function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;

        const filepath = path.join(imagesDir, filename);

        // Check if file already exists
        if (fs.existsSync(filepath)) {
            console.log(`✓ Skipped (already exists): ${filename}`);
            resolve();
            return;
        }

        protocol.get(url, (response) => {
            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`✓ Downloaded: ${filename}`);
                    resolve();
                });

                fileStream.on('error', (err) => {
                    fs.unlink(filepath, () => {}); // Delete incomplete file
                    reject(err);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect
                downloadImage(response.headers.location, filename)
                    .then(resolve)
                    .catch(reject);
            } else {
                reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Download all images
async function downloadAll() {
    console.log(`Starting download of ${wordDatabase.length} images...\n`);

    let successful = 0;
    let failed = 0;

    for (const item of wordDatabase) {
        const urlPath = new URL(item.image).pathname;
        const filename = `${item.word}.png`;

        try {
            await downloadImage(item.image, filename);
            successful++;
            // Add small delay to be nice to the server
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error(`✗ Failed: ${filename} - ${error.message}`);
            failed++;
        }
    }

    console.log(`\n=== Download Complete ===`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${wordDatabase.length}`);
}

downloadAll().catch(console.error);
