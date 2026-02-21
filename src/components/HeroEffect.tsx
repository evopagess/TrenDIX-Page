import { useEffect, useRef } from 'react';

export default function HeroEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    let animationFrameId: number;
    let time = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 300 // Raio grande para repulsão visível
    };

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      length: number;
      angle: number;
      color: string;
      density: number;
      shape: 'tictac' | 'pingo';

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 1.5 + 1; // Espessura
        this.length = Math.random() * 5 + 4; // Comprimento
        this.angle = Math.random() * Math.PI * 2;
        this.shape = Math.random() > 0.5 ? 'tictac' : 'pingo'; // 50/50 chance

        // Tons de rosa vibrante
        const pinkHues = [
          'rgba(236, 72, 153, 0.8)', // Pink 500
          'rgba(219, 39, 119, 0.7)', // Pink 600
          'rgba(244, 114, 182, 0.9)', // Pink 400
          'rgba(190, 24, 93, 0.6)'  // Pink 700
        ];
        this.color = pinkHues[Math.floor(Math.random() * pinkHues.length)];
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);

        // Rotaciona a partícula suavemente na direção de seu movimento
        const targetAngle = Math.atan2(this.vy, this.vx);
        this.angle += (targetAngle - this.angle) * 0.1;
        ctx.rotate(this.angle);

        ctx.beginPath();
        const L = this.length;
        const R = this.size * 1.5;

        if (this.shape === 'pingo') {
          // Teardrop (Pingo)
          ctx.arc(-L / 2, 0, R, Math.PI / 2, (3 * Math.PI) / 2); // Parte de trás arredondada
          ctx.quadraticCurveTo(-L / 4, -R * 0.2, L / 2, 0); // Curva superior até a ponta
          ctx.quadraticCurveTo(-L / 4, R * 0.2, -L / 2, R); // Curva inferior até a ponta
        } else {
          // Tic-tac (Cápsula)
          const halfL = L / 2;
          ctx.arc(-halfL, 0, this.size, Math.PI / 2, (3 * Math.PI) / 2);
          ctx.lineTo(halfL, -this.size);
          ctx.arc(halfL, 0, this.size, (3 * Math.PI) / 2, Math.PI / 2);
          ctx.lineTo(-halfL, this.size);
        }

        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        let dx = this.x - mouse.x; // Vetor do mouse PARA a partícula
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // REPULSÃO (Empurra CADA VEZ MAIS FORTE quanto mais perto)
        if (distance < mouse.radius && distance > 0) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;

          // Força de empurrão cresce exponencialmente perto do centro
          const pushForce = (mouse.radius - distance) / mouse.radius;
          const forceStrength = 3.5;

          this.vx += forceDirectionX * pushForce * forceStrength;
          this.vy += forceDirectionY * pushForce * forceStrength;
        }

        // Retorno elástico para a posição original (amarradas na "rede")
        const dxBase = this.baseX - this.x;
        const dyBase = this.baseY - this.y;
        const distBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);

        // Quanto mais longe da base, mais forte puxa de volta, limitando o elástico
        if (distBase > 0) {
          const returnStrength = 0.03;
          this.vx += (dxBase / distBase) * (distBase * returnStrength);
          this.vy += (dyBase / distBase) * (distBase * returnStrength);
        }

        // Atrito / Fluidez da água (freio forte pra não virar bagunça)
        this.vx *= 0.85;
        this.vy *= 0.85;

        // Limite de velocidade para impedir que elas sumam da tela
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 8;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Mantém dentro da tela
        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      particles = [];
      // Muito menos partículas para mobile. Máximo geral reduzido.
      const particleCount = window.innerWidth < 768 ? 40 : Math.min(Math.floor((w * h) / 8000), 100);

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (canvas) observer.observe(canvas);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip drawing if not visible to save 100% CPU when scrolled past
      if (!isVisible) return;

      ctx.clearRect(0, 0, w, h);
      time += 0.015; // Velocidade da onda global

      for (let i = 0; i < particles.length; i++) {
        // Efeito Organico de Onda
        const waveX = Math.sin(particles[i].baseY * 0.01 + time) * 30;
        const waveY = Math.cos(particles[i].baseX * 0.01 + time) * 30;

        const oldBaseX = particles[i].baseX;
        const oldBaseY = particles[i].baseY;

        particles[i].baseX += waveX;
        particles[i].baseY += waveY;

        particles[i].update();
        particles[i].draw();

        particles[i].baseX = oldBaseX;
        particles[i].baseY = oldBaseY;
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        init();
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
