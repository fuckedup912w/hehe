// 1. Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const successCard = document.getElementById('successCard');
const displayMsg = document.getElementById('displayMsg');
const music = document.getElementById('celebrationMusic');

// 2. Configuration
const photoFiles = ["photo1.png", "photo2.jpg", "photo3.webp", "photo4.jpg"]; // Add your filenames here
const messages = [
    "Wait, are you sure? 🤨",
    "Really?? Think about it again! 🧐",
    "Nice try, but nope! 😜",
    "You can't escape love! ❤️",
    "Error 404: 'No' button not found 🚫",
    "Okay, now you're just being mean! 😭"
];

let msgIndex = 0;

// 3. Dodge Button Logic
function moveButton() {
    displayMsg.innerText = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'absolute'; 
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize * 1.1) + 'px';
    yesBtn.style.padding = (currentSize * 0.5) + 'px ' + (currentSize * 1.0) + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

// 4. Floating Photo Generator
function startFloatingPhotos() {
    const container = document.createElement('div');
    container.className = 'floating-container';
    document.body.appendChild(container);

    setInterval(() => {
        const img = document.createElement('img');
        img.src = photoFiles[Math.floor(Math.random() * photoFiles.length)];
        img.className = 'floating-photo';

        const startX = Math.random() * 100;
        const duration = 6 + Math.random() * 4;
        const sway = (Math.random() - 0.5) * 200;
        const rotation = (Math.random() - 0.5) * 60;

        img.style.left = `${startX}%`;
        img.style.setProperty('--duration', `${duration}s`);
        img.style.setProperty('--sway', `${sway}px`);
        img.style.setProperty('--rotation', `${rotation}deg`);

        container.appendChild(img);
        setTimeout(() => img.remove(), duration * 1000);
    }, 1000);
}

// 5. Success Click
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successCard.classList.remove('hidden');

    // Music Play Fix
    if (music) {
        music.loop = true;
        music.play().catch(e => console.error("Playback blocked:", e));
    }

    // Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffffff']
    });

    startFloatingPhotos();
});