// GLOBAL Navigation Active State Management
// This function is exposed globally so page-transitions.js can call it
// Accepts optional targetPath parameter for immediate updates before page load
window.updateNavigationState = function (targetPath) {
    const currentPath = targetPath || window.location.pathname;
    console.log('Updating navigation state for path:', currentPath);

    // Desktop navigation
    const desktopLinks = document.querySelectorAll('#navigation-bar .nav-link');
    desktopLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        const linkHref = link.getAttribute('href');

        // Remove ALL possible classes first
        link.classList.remove('nav-link-active', 'nav-link-inactive');
        link.classList.remove('bg-rose-dust', 'dark:bg-chocolate-cosmos', 'text-dark-purple', 'dark:text-misty-plum');
        link.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-dark-purple', 'dark:hover:text-misty-plum');

        // Check if this link matches current page (exact match only)
        const isActive = currentPath.endsWith(`/${linkPage}`) ||
            (currentPath === '/' && linkPage === 'about') ||
            (currentPath === linkHref);

        if (isActive) {
            link.classList.add('nav-link-active');
            link.classList.add('bg-rose-dust', 'dark:bg-chocolate-cosmos', 'text-dark-purple', 'dark:text-misty-plum');
            console.log('Active link:', linkPage);
        } else {
            link.classList.add('nav-link-inactive');
            link.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-dark-purple', 'dark:hover:text-misty-plum');
        }
    });

    // Mobile navigation
    const mobileLinks = document.querySelectorAll('#mobile-menu .mobile-nav-link');
    mobileLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        const linkHref = link.getAttribute('href');

        // Remove ALL possible classes first
        link.classList.remove('bg-rose-dust/80', 'dark:bg-chocolate-cosmos/80', 'text-dark-purple', 'dark:text-misty-plum', 'shadow-sm');
        link.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:bg-white/40', 'dark:hover:bg-white/10');

        // Check if this link matches current page (exact match only)
        const isActive = currentPath.endsWith(`/${linkPage}`) ||
            (currentPath === '/' && linkPage === 'about') ||
            (currentPath === linkHref);

        if (isActive) {
            link.classList.add('bg-rose-dust/80', 'dark:bg-chocolate-cosmos/80', 'text-dark-purple', 'dark:text-misty-plum', 'shadow-sm');
        } else {
            link.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-dark-purple', 'dark:hover:text-misty-plum');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Update navigation state on page load
    window.updateNavigationState();

    // Accurate Custom Cursor (No Trail, Minimal Smoothing)
    const cursorMain = document.getElementById('cursor-main')

    // Direct cursor positioning with minimal lag
    document.addEventListener('mousemove', (e) => {
        cursorMain.style.left = e.clientX + 'px'
        cursorMain.style.top = e.clientY + 'px'
    })

    // Magnetic effect ONLY for elements with .magnetic class
    const magneticElements = document.querySelectorAll('.magnetic, button')

    magneticElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursorMain.classList.add('cursor-hover')
        })

        el.addEventListener('mouseleave', () => {
            cursorMain.classList.remove('cursor-hover')
            el.style.transform = ''
        })

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
        })
    })

    // Cursor hover effect for ALL other buttons and links
    const allInteractive = document.querySelectorAll('a, input, select, textarea')

    allInteractive.forEach((el) => {
        if (el.classList.contains('magnetic')) return

        el.style.pointerEvents = 'auto'

        el.addEventListener('mouseenter', () => {
            cursorMain.classList.add('cursor-hover')
        })

        el.addEventListener('mouseleave', () => {
            cursorMain.classList.remove('cursor-hover')
        })
    })

    // Elegant Floating Particles
    const canvas = document.getElementById('particle-canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 70 // Slightly more particles
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX
        mouseY = e.clientY
    })

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.vx = (Math.random() - 0.5) * 0.5 // Gentle velocity
            this.vy = (Math.random() - 0.5) * 0.5
            this.size = Math.random() * 2 + 1 // Varied size 1-3px
        }

        update() {
            this.x += this.vx
            this.y += this.vy

            // Gentle bounce off walls
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1

            // Gentle mouse repel
            const dx = mouseX - this.x
            const dy = mouseY - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                const angle = Math.atan2(dy, dx)
                const force = (100 - distance) / 100
                this.vx -= Math.cos(angle) * force * 0.02
                this.vy -= Math.sin(angle) * force * 0.02
            }
        }

        draw() {
            const isDark = document.documentElement.classList.contains('dark')
            const color = isDark ? '214, 182, 198' : '65, 29, 43' // Misty Plum : Dark Purple

            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${color}, 0.6)`
            ctx.fill()
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const isDark = document.documentElement.classList.contains('dark')
        const color = isDark ? '214, 182, 198' : '65, 29, 43'

        particles.forEach((particle, index) => {
            particle.update()
            particle.draw()

            // Connect nearby particles
            for (let j = index + 1; j < particles.length; j++) {
                const dx = particle.x - particles[j].x
                const dy = particle.y - particles[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 120) {
                    ctx.beginPath()
                    ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - distance / 120)})`
                    ctx.lineWidth = 1
                    ctx.moveTo(particle.x, particle.y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.stroke()
                }
            }
        })
        requestAnimationFrame(animateParticles)
    }
    animateParticles()

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })

    // Subtle Ripple Effect on Click
    document.addEventListener('click', (e) => {
        const isDark = document.documentElement.classList.contains('dark')
        const color = isDark ? '#D6B6C6' : '#411D2B'

        const ripple = document.createElement('div')
        ripple.className = 'ripple'
        ripple.style.left = e.clientX + 'px'
        ripple.style.top = e.clientY + 'px'
        ripple.style.width = ripple.style.height = '20px'
        ripple.style.background = `radial-gradient(circle, ${color}40 0%, transparent 70%)`
        ripple.style.border = `1px solid ${color}`
        document.body.appendChild(ripple)

        setTimeout(() => ripple.remove(), 800)
    })

    // Theme Toggle
    const htmlEl = document.documentElement
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop')
    const themeToggleMobile = document.getElementById('theme-toggle-mobile')

    const savedTheme = localStorage.getItem('theme') || 'light'

    if (savedTheme === 'dark') {
        htmlEl.classList.add('dark')
    } else {
        htmlEl.classList.remove('dark')
    }

    function updateThemeIcons() {
        const isDark = htmlEl.classList.contains('dark')
        const allIcons = [themeToggleDesktop?.querySelector('i'), themeToggleMobile?.querySelector('i')]

        allIcons.forEach((icon) => {
            if (icon) {
                if (isDark) {
                    icon.classList.remove('fa-moon')
                    icon.classList.add('fa-sun')
                } else {
                    icon.classList.remove('fa-sun')
                    icon.classList.add('fa-moon')
                }
            }
        })
    }

    function toggleTheme() {
        htmlEl.classList.toggle('dark')
        const isDark = htmlEl.classList.contains('dark')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
        updateThemeIcons()
    }

    updateThemeIcons()

    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme)
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme)
    }

    // IMPROVED Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')
    const headerContainer = document.getElementById('header-container')

    if (mobileMenuButton && mobileMenu && headerContainer) {
        let isMenuOpen = false

        mobileMenuButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            // Remove focus from button to prevent outline
            e.currentTarget.blur()

            isMenuOpen = !isMenuOpen

            if (isMenuOpen) {
                // Open menu
                mobileMenu.classList.remove('hidden', 'hide')
                mobileMenu.classList.add('show')
                mobileMenuButton.classList.add('active')
            } else {
                // Close menu
                mobileMenu.classList.remove('show')
                mobileMenu.classList.add('hide')
                mobileMenuButton.classList.remove('active')

                // Wait for animation to finish before hiding
                setTimeout(() => {
                    if (!isMenuOpen) {
                        mobileMenu.classList.add('hidden')
                        mobileMenu.classList.remove('hide')
                    }
                }, 300)
            }

            // Toggle icon
            const icon = mobileMenuButton.querySelector('i')
            if (icon) {
                if (isMenuOpen) {
                    icon.classList.remove('fa-bars')
                    icon.classList.add('fa-times')
                } else {
                    icon.classList.remove('fa-times')
                    icon.classList.add('fa-bars')
                }
            }
        })

        // Close menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a')
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false
                mobileMenu.classList.remove('show')
                mobileMenu.classList.add('hide')
                mobileMenuButton.classList.remove('active')

                const icon = mobileMenuButton.querySelector('i')
                if (icon) {
                    icon.classList.remove('fa-times')
                    icon.classList.add('fa-bars')
                }

                setTimeout(() => {
                    mobileMenu.classList.add('hidden')
                    mobileMenu.classList.remove('hide')
                }, 300)
            })
        })

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuButton.contains(e.target)) {
                isMenuOpen = false
                mobileMenu.classList.remove('show')
                mobileMenu.classList.add('hide')
                mobileMenuButton.classList.remove('active')

                const icon = mobileMenuButton.querySelector('i')
                if (icon) {
                    icon.classList.remove('fa-times')
                    icon.classList.add('fa-bars')
                }

                setTimeout(() => {
                    mobileMenu.classList.add('hidden')
                    mobileMenu.classList.remove('hide')
                }, 300)
            }
        })
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
    })
})

// Update navigation on popstate (browser back/forward)
window.addEventListener('popstate', window.updateNavigationState);

// Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.scroll-reveal')

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top
            if (elementTop < windowHeight - 100) {
                el.classList.add('active')
            }
        })
    }

    window.addEventListener('scroll', revealOnScroll)

    // Immediate reveal on page load - critical for direct landing
    setTimeout(() => {
        revealOnScroll()
    }, 100)
})

// Ensure custom cursor doesn't block clicks
document.addEventListener('DOMContentLoaded', function () {
    // Get all custom cursor elements
    const cursors = document.querySelectorAll('.custom-cursor, .cursor, [class*="cursor"]')

    // Make cursors non-blocking
    cursors.forEach((cursor) => {
        cursor.style.pointerEvents = 'none'
    })

    // Ensure all interactive elements are clickable
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea')

    interactiveElements.forEach((el) => {
        el.style.position = 'relative'
        el.style.zIndex = '10'
        el.style.pointerEvents = 'auto'
    })

    // Debug: Log if buttons are clickable
    const buttons = document.querySelectorAll('.project-card button, .project-card a')
    console.log(`Found ${buttons.length} interactive elements in project cards`)
})

if (matchMedia('(hover: none) and (pointer: coarse)').matches) {
    document.getElementById('cursor-main').style.display = 'none'
    const cursorDot = document.getElementById('cursor-dot')
    if (cursorDot) cursorDot.style.display = 'none'
} else {
    const cursorMain = document.getElementById('cursor-main')
    const cursorDot = document.getElementById('cursor-dot')

    document.addEventListener('mousemove', (e) => {
        cursorMain.style.left = e.clientX + 'px'
        cursorMain.style.top = e.clientY + 'px'

        if (cursorDot) {
            cursorDot.style.left = e.clientX + 'px'
            cursorDot.style.top = e.clientY + 'px'
        }
    })

    // Hover animation for links & buttons
    document.querySelectorAll('a, button, .clickable').forEach((element) => {
        element.addEventListener('mouseenter', () => cursorMain.classList.add('cursor-hover'))
        element.addEventListener('mouseleave', () => cursorMain.classList.remove('cursor-hover'))
    })
}
