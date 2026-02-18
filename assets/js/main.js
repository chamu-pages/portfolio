// Main JavaScript for Chamu Pages

// 1. Theme Toggle Logic
const themeIcon = document.getElementById('theme-icon');
const darkIcon = 'dark_mode'; // Material Icon name
const lightIcon = 'light_mode'; // Material Icon name

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    if (themeIcon) {
        themeIcon.textContent = isDark ? lightIcon : darkIcon;
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize Theme
(function () {
    const saved = localStorage.getItem('theme');
    // Default to Light mode if no preference or if preference is light
    if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.textContent = lightIcon;
    } else {
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = darkIcon;
    }
})();

// Expose toggleTheme to global scope for button onclick
window.toggleTheme = toggleTheme;


// 2. Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

if (dot && outline) {
    let mx = 0, my = 0, ox = 0, oy = 0;

    window.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
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


// 3. Reveal on Scroll Animation
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


// 4. Warp Animation (Footer or Section)
function initWarp(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 200;
    let w, h, cx, cy;

    function resize() {
        if (canvas.parentElement) {
            w = canvas.width = canvas.parentElement.offsetWidth;
            h = canvas.height = canvas.parentElement.offsetHeight;
            cx = w / 2;
            cy = h / 2;
        }
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
        ctx.fillStyle = 'rgba(26, 28, 24, 0.12)';
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
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    init();
    draw();
}

// Initialize Warp on known IDs
initWarp('warp-canvas');
initWarp('warp-footer');


// 5. Contact Form AJAX Handling
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');
const submitButton = document.getElementById('form-submit');

if (form && successMessage && submitButton) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const originalBtnText = submitButton.innerHTML;
        submitButton.innerHTML = "SENDING...";
        submitButton.disabled = true;

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
                    successMessage.classList.remove('hidden');
                } else {
                    console.log(response);
                    submitButton.innerHTML = "TRY AGAIN";
                    submitButton.disabled = false;
                    alert(json.message);
                }
            })
            .catch(error => {
                console.log(error);
                submitButton.innerHTML = "TRY AGAIN";
                submitButton.disabled = false;
                alert('Something went wrong!');
            });
    });
}


// 6. "See Magic" Edit Toggle
let editModeEnabled = false;
const toggleBtn = document.getElementById('edit-toggle');

if (toggleBtn) {
    // Expose to global scope
    window.toggleEditMode = function () {
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

        toggleBtn.textContent = editModeEnabled ? 'Exit Magic' : 'See Magic';
    };
}
