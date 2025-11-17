// Floating particles animation - special for Precious!
// Optimized for mobile performance
const particlesContainer = document.getElementById('particles-container');
const particles = ['💕', '💖', '✨', '⭐', '💜', '🌸', '🦋', '💗', '🌟', '🎀', '💝', '💎', '💍', '👑'];

// Check if mobile device
const isMobile = window.innerWidth <= 768;

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const emoji = particles[Math.floor(Math.random() * particles.length)];
    particle.innerHTML = emoji;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.fontSize = (Math.random() * 15 + 15) + 'px';
    
    // Add golden glow to gem emojis
    if (emoji === '💎' || emoji === '💍' || emoji === '👑') {
        particle.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
    }
    
    const duration = Math.random() * 6 + 6; // 6-12 seconds
    particle.style.animationDuration = duration + 's';
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Adjust particle frequency for mobile
const particleInterval = isMobile ? 400 : 300;
const initialParticles = isMobile ? 20 : 30;
const sparkleInterval = isMobile ? 2000 : 1500;

// Create particles continuously
setInterval(createParticle, particleInterval);

// Initial burst of particles
for (let i = 0; i < initialParticles; i++) {
    setTimeout(createParticle, i * 100);
}

// Add special golden sparkles periodically
setInterval(() => {
    createGoldenSparkle();
    if (!isMobile) {
        createGoldenSparkle(); // Double sparkles only on desktop
    }
}, sparkleInterval);

function createGoldenSparkle() {
    const sparkle = document.createElement('div');
    const sparkleTypes = ['✨', '⭐', '💫', '🌟'];
    sparkle.innerHTML = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
    sparkle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${30 + Math.random() * 30}px;
        pointer-events: none;
        z-index: 100;
        filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 105, 180, 0.8));
    `;
    
    particlesContainer.appendChild(sparkle);
    
    sparkle.animate([
        {
            transform: 'scale(0) rotate(0deg)',
            opacity: 0
        },
        {
            transform: 'scale(2) rotate(180deg)',
            opacity: 1
        },
        {
            transform: 'scale(0.5) rotate(360deg)',
            opacity: 1
        },
        {
            transform: 'scale(0) rotate(540deg)',
            opacity: 0
        }
    ], {
        duration: 2500,
        easing: 'ease-in-out'
    }).onfinish = () => {
        sparkle.remove();
    };
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for polaroids
            const polaroid = entry.target.querySelector('.polaroid');
            if (polaroid) {
                setTimeout(() => {
                    polaroid.style.animation = 'float 6s ease-in-out infinite';
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe all memory cards
const memoryCards = document.querySelectorAll('.memory-card');
memoryCards.forEach(card => {
    observer.observe(card);
});

// Optimized parallax effect on scroll and progress bar
let lastScrollY = window.scrollY;
let ticking = false;
const scrollProgress = document.querySelector('.scroll-progress');

function updateParallax() {
    const scrollY = window.scrollY;
    
    // Update scroll progress bar only
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
    
    // Remove polaroid parallax for better performance on mobile
    // The float animation is enough visual interest
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Add hover effect for polaroids - mobile optimized
const polaroids = document.querySelectorAll('.polaroid');
polaroids.forEach(polaroid => {
    if (!isMobile) {
        polaroid.addEventListener('mouseenter', () => {
            polaroid.style.animation = 'none';
        });
        
        polaroid.addEventListener('mouseleave', () => {
            polaroid.style.animation = 'float 4s ease-in-out infinite, polaroidGlow 3s ease-in-out infinite';
        });
    }
});

// EPIC FINALE with multiple effects
const finaleSection = document.querySelector('.finale-section');
let confettiTriggered = false;

const finaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !confettiTriggered) {
            confettiTriggered = true;
            triggerEpicFinale();
        }
    });
}, { threshold: 0.3 });

finaleObserver.observe(finaleSection);

function triggerEpicFinale() {
    // Sequence of effects
    createMassiveConfetti();
    setTimeout(() => createFireworks(), 500);
    setTimeout(() => createFloatingBalloons(), 800);
    setTimeout(() => createDancingEmojis(), 1200);
    setTimeout(() => createStarBurst(), 1500);
    
    // Repeat some effects
    setTimeout(() => createFireworks(), 3000);
    setTimeout(() => createMassiveConfetti(), 4000);
    setTimeout(() => createFireworks(), 5500);
}

// Massive confetti explosion
function createMassiveConfetti() {
    const colors = ['#ff6ec7', '#c77dff', '#7c3aed', '#ffd700', '#ff69b4', '#00f5ff', '#7fff00'];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = Math.random() * 12 + 5;
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10000;
                pointer-events: none;
                opacity: 0.9;
                box-shadow: 0 0 10px ${colors[Math.floor(Math.random() * colors.length)]};
            `;
            
            document.body.appendChild(confetti);
            
            const fallDuration = Math.random() * 4 + 2;
            const rotation = Math.random() * 1080 - 540;
            const drift = Math.random() * 300 - 150;
            
            confetti.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg) scale(0)',
                    opacity: 0
                },
                {
                    transform: `translate(${drift * 0.3}px, 100px) rotate(${rotation * 0.3}deg) scale(1)`,
                    opacity: 0.9
                },
                {
                    transform: `translate(${drift}px, ${window.innerHeight + 50}px) rotate(${rotation}deg) scale(0.5)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                confetti.remove();
            };
        }, i * 15);
    }
}

// Fireworks effect
function createFireworks() {
    const fireworkCount = 5;
    const colors = ['#ff6ec7', '#c77dff', '#ffd700', '#00f5ff', '#ff69b4'];
    
    for (let f = 0; f < fireworkCount; f++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.5);
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Launch firework
            const launcher = document.createElement('div');
            launcher.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${color};
                left: ${x}px;
                bottom: 0;
                border-radius: 50%;
                z-index: 10000;
                pointer-events: none;
                box-shadow: 0 0 20px ${color};
            `;
            document.body.appendChild(launcher);
            
            launcher.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: `translateY(-${y}px)`, opacity: 1 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                launcher.remove();
                explodeFirework(x, y, color);
            };
        }, f * 400);
    }
}

function explodeFirework(x, y, color) {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${color};
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            z-index: 10000;
            pointer-events: none;
            box-shadow: 0 0 10px ${color};
        `;
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0, 0.55, 0.45, 1)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Floating balloons
function createFloatingBalloons() {
    const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const colors = ['filter: hue-rotate(0deg)', 'filter: hue-rotate(90deg)', 'filter: hue-rotate(180deg)', 'filter: hue-rotate(270deg)', 'filter: hue-rotate(320deg)'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.innerHTML = balloons[Math.floor(Math.random() * balloons.length)];
            balloon.style.cssText = `
                position: fixed;
                font-size: ${40 + Math.random() * 30}px;
                left: ${Math.random() * 100}%;
                bottom: -100px;
                z-index: 9999;
                pointer-events: none;
                ${colors[Math.floor(Math.random() * colors.length)]};
            `;
            document.body.appendChild(balloon);
            
            const duration = 8000 + Math.random() * 4000;
            const drift = Math.random() * 200 - 100;
            
            balloon.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 0
                },
                {
                    transform: `translateY(-${window.innerHeight + 200}px) translateX(${drift}px) rotate(${Math.random() * 30 - 15}deg)`,
                    opacity: 1
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                balloon.remove();
            };
        }, i * 300);
    }
}

// Dancing celebration emojis
function createDancingEmojis() {
    const emojis = ['🎉', '🎊', '🥳', '🎂', '🎁', '💖', '✨', '🌟', '🎀', '💝'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                font-size: ${30 + Math.random() * 30}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
            `;
            document.body.appendChild(emoji);
            
            const bounces = 3;
            const keyframes = [];
            for (let b = 0; b <= bounces; b++) {
                keyframes.push({
                    transform: `scale(${1 + Math.sin(b * Math.PI) * 0.5}) rotate(${b * 180}deg)`,
                    opacity: b === 0 ? 0 : (b === bounces ? 0 : 1)
                });
            }
            
            emoji.animate(keyframes, {
                duration: 2000,
                easing: 'ease-in-out'
            }).onfinish = () => {
                emoji.remove();
            };
        }, i * 100);
    }
}

// Star burst from center
function createStarBurst() {
    const stars = 20;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < stars; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.cssText = `
            position: fixed;
            font-size: 30px;
            left: ${centerX}px;
            top: ${centerY}px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(star);
        
        const angle = (Math.PI * 2 * i) / stars;
        const distance = 300 + Math.random() * 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        star.animate([
            {
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(360deg)`,
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5}px)) scale(0) rotate(720deg)`,
                opacity: 0
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            star.remove();
        };
    }
}

// Smooth scroll for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy({
            top: -window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    }
});

// Add sparkle effect on polaroid click and double-click
polaroids.forEach(polaroid => {
    polaroid.addEventListener('click', (e) => {
        const rect = polaroid.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createSparkles(x, y);
    });
    
    // Add double-click for extra sparkles
    polaroid.addEventListener('dblclick', (e) => {
        const rect = polaroid.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createSparkles(x, y);
        createSparkles(x, y);
    });
});

function createSparkles(x, y) {
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            font-size: ${15 + Math.random() * 15}px;
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 100 + Math.random() * 70;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        sparkle.animate([
            {
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1) rotate(180deg)`,
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5}px)) scale(0) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0, 0.55, 0.45, 1)'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Typed text effect for the signature
const signatureName = document.querySelector('.signature-name');
if (signatureName) {
    const originalText = signatureName.textContent;
    signatureName.textContent = '';
    
    const signatureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < originalText.length) {
                        signatureName.textContent += originalText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 100);
                signatureObserver.unobserve(signatureName);
            }
        });
    }, { threshold: 0.5 });
    
    signatureObserver.observe(signatureName);
}

// Birthday badge rotation on hover
const birthdayBadge = document.querySelector('.birthday-badge');
if (birthdayBadge) {
    birthdayBadge.addEventListener('mouseenter', () => {
        birthdayBadge.style.transform = 'rotate(5deg) scale(1.1)';
    });
    
    birthdayBadge.addEventListener('mouseleave', () => {
        birthdayBadge.style.transform = 'rotate(0deg) scale(1)';
    });
}

// Add subtle tilt effect to memory cards - optimized for mobile
memoryCards.forEach(card => {
    // Desktop: mouse move effect
    if (!isMobile) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            const polaroid = card.querySelector('.polaroid');
            if (polaroid) {
                polaroid.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const polaroid = card.querySelector('.polaroid');
            if (polaroid) {
                polaroid.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    } else {
        // Mobile: touch-friendly tap effect
        card.addEventListener('touchstart', () => {
            const polaroid = card.querySelector('.polaroid');
            if (polaroid) {
                polaroid.style.transform = 'scale(1.03)';
            }
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            const polaroid = card.querySelector('.polaroid');
            if (polaroid) {
                setTimeout(() => {
                    polaroid.style.transform = 'scale(1)';
                }, 200);
            }
        }, { passive: true });
    }
});

// Log birthday message
console.log('🎉 Happy 25th Birthday! 🎉');
console.log('Made with ❤️ for an amazing sister');

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
