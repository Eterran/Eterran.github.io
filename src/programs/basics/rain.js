const canvas = document.getElementById('rainBackground');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 20;
const columns = canvas.width / fontSize;
const colorPalette = ["#00ff00", "#00ee00", "#00dd00", "#00cc00"];
const drops = [];
const speed = 1;
const rows = canvas.height/fontSize;

const dropsPerColumn = 2;

for (let x = 0; x < columns; x++) {
    drops[x] = [];
    for (let j = 0; j < dropsPerColumn; j++) {
        drops[x][j] = Math.floor(Math.random() * rows);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;
    await sleep(75);
    for (let i = 0; i < drops.length; i++) {
        for (let j = 0; j < drops[i].length; j++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            ctx.fillStyle = color;

            const x = i * fontSize;
            const y = drops[i][j] * fontSize; 
            ctx.fillText(text, x, y);

            drops[i][j] += speed; 

            if (drops[i][j] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i][j] = Math.floor(Math.random() * rows);; 
            }
        }
    }
    requestAnimationFrame(draw);
}

draw();