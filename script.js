const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
const numStars = 1000;
const maxSpeed = 1;
const starSize = 0.5;

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = (Math.random() - 0.5) * 2;
        this.y = (Math.random() - 0.5) * 2;
        this.z = Math.random() * 1500;
        this.origZ = this.z;
    }

    update() {
        this.z -= maxSpeed;
        if (this.z <= 0) this.reset();
    }

    draw() {
        const factor = 100 / this.z;
        const x = this.x * factor * canvas.width + canvas.width/2;
        const y = this.y * factor * canvas.height + canvas.height/2;
        const size = (1 - this.z/this.origZ) * starSize * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, Math.max(size, 0.5), 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z/1500})`;
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();