let balance = 1000;
let timer = 10;
let countdown;
let currentBet = null;
let betAmount = 0;

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

function placeBet(type) {
    if (countdown) return; // Không cho phép đặt khi đã bắt đầu
    betAmount = parseInt(document.getElementById('betAmount').value);
    if (!betAmount || betAmount <= 0 || betAmount > balance) {
        alert("Số tiền cược không hợp lệ!");
        return;
    }
    currentBet = type;
    startGame();
}

function startGame() {
    document.getElementById('result').textContent = "Đang lắc xúc xắc...";
    timer = 10;
    document.getElementById('timer').textContent = timer;

    countdown = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            countdown = null;
            rollDice();
        }
    }, 1000);
}

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').src = `dice${dice1}.png`;
    document.getElementById('dice2').src = `dice${dice2}.png`;
    document.getElementById('dice3').src = `dice${dice3}.png`;

    const total = dice1 + dice2 + dice3;
    const result = total >= 11 ? "tai" : "xiu";

    if (currentBet === result) {
        balance += betAmount;
        document.getElementById('result').textContent = `Chúc mừng bạn! Tổng: ${total} - ${result.toUpperCase()}`;
        triggerFireworks();
    } else {
        balance -= betAmount;
        document.getElementById('result').textContent = `Rất tiếc cho bạn! Tổng: ${total} - ${result.toUpperCase()}`;
    }
    updateBalance();
}

function triggerFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    let particles = [];

    function createFirework(x, y) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 3 + 2,
                alpha: 1,
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.02;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(drawParticles);
    }

    createFirework(w / 2, h / 2);
    drawParticles();
}