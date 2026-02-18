// Theme Toggle Logic
const themeIcon = document.getElementById('theme-icon');
const darkIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>';
const lightIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M338.5-338.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>';

function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.innerHTML = lightIcon;
    } else {
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.innerHTML = darkIcon;
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.innerHTML = darkIcon;
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.innerHTML = lightIcon;
    }
}

// Initialize theme immediately
initTheme();

// Expose to window for inline onclick handlers
window.toggleTheme = toggleTheme;

// Wait for DOM to load for other scripts
document.addEventListener('DOMContentLoaded', () => {

    // Text editing toggle ("See Magic")
    const editToggleBtn = document.getElementById('edit-toggle');
    if (editToggleBtn) {
        let editModeEnabled = false;
        editToggleBtn.addEventListener('click', () => {
            editModeEnabled = !editModeEnabled;
            const editableElements = document.querySelectorAll('h1, h2, h3, p');

            editableElements.forEach(el => {
                if (editModeEnabled) {
                    el.setAttribute('contenteditable', 'true');
                    el.style.outline = '2px dashed rgba(52,211,153,0.3)';
                    el.style.outlineOffset = '4px';
                } else {
                    el.removeAttribute('contenteditable');
                    el.style.outline = '';
                    el.style.outlineOffset = '';
                }
            });

            editToggleBtn.textContent = editModeEnabled ? 'Exit Magic' : 'See Magic';
        });
    }

    // Premium Reveal Animation System
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    // Hyperspace Warp Tunnel Effect
    function initWarp(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let stars = [];
        const STAR_COUNT = 200;
        let w, h, cx, cy;
        let rafId;
        let isAnimating = false;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            w = rect.width;
            h = rect.height;
            cx = w / 2;
            cy = h / 2;
        }

        function createStar() {
            return {
                x: Math.random() * w - cx,
                y: Math.random() * h - cy,
                z: Math.random() * 800 + 1,
                pz: 0
            };
        }

        function init() {
            resize();
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(createStar());
            }
        }

        function draw() {
            if (!isAnimating) return;
            ctx.fillStyle = 'rgba(26, 28, 24, 0.2)';
            ctx.fillRect(0, 0, w, h);

            for (let s of stars) {
                s.pz = s.z;
                s.z -= 6;
                if (s.z <= 0) {
                    s.x = Math.random() * w - cx;
                    s.y = Math.random() * h - cy;
                    s.z = 800;
                    s.pz = 800;
                }
                let sx = (s.x / s.z) * cx + cx;
                let sy = (s.y / s.z) * cy + cy;
                let px = (s.x / s.pz) * cx + cx;
                let py = (s.y / s.pz) * cy + cy;
                let life = 1 - s.z / 800;
                let size = life * 2;

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.strokeStyle = `rgba(52, 211, 153, ${life * 0.9})`;
                ctx.lineWidth = size;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
            rafId = requestAnimationFrame(draw);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isAnimating) {
                        isAnimating = true;
                        resize();
                        draw();
                    }
                } else {
                    isAnimating = false;
                    if (rafId) cancelAnimationFrame(rafId);
                }
            });
        }, { threshold: 0 });

        observer.observe(canvas.parentElement);

        window.addEventListener('resize', () => {
            resize();
            init();
        });
        init();
    }

    initWarp('warp-problem');
    initWarp('warp-footer');

    // Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    // Only run cursor logic if elements exist (they might be hidden on mobile via CSS, but check anyway)
    if (dot && outline) {
        let mx = 0, my = 0, ox = 0, oy = 0;

        window.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        });

        function animateOutline() {
            ox += (mx - ox) * 0.15;
            oy += (my - oy) * 0.15;
            outline.style.left = ox + 'px';
            outline.style.top = oy + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Grow ring on interactive elements
        document.querySelectorAll('a, button, input, textarea, summary, .portfolio-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                outline.style.width = '60px';
                outline.style.height = '60px';
                outline.style.borderColor = 'rgba(52, 211, 153, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                outline.style.width = '40px';
                outline.style.height = '40px';
                outline.style.borderColor = 'rgba(52, 211, 153, 0.5)';
            });
        });
    }

    // Contact Form AJAX Handling
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const submitButton = document.getElementById('form-submit');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            if (submitButton) {
                submitButton.innerHTML = "SENDING...";
                submitButton.disabled = true;
            }

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        form.style.display = 'none';
                        if (successMessage) successMessage.classList.remove('hidden');
                    } else {
                        console.log(response);
                        if (submitButton) {
                            submitButton.innerHTML = "TRY AGAIN";
                            submitButton.disabled = false;
                        }
                        alert(json.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (submitButton) {
                        submitButton.innerHTML = "TRY AGAIN";
                        submitButton.disabled = false;
                    }
                    alert('Something went wrong!');
                });
        });
    }
});
