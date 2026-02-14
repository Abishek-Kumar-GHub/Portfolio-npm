// Projects Page Functionality
// Filter projects by category and handle project info modals

// Filter projects by category
function filterProjects(category, event) {
    const cards = document.querySelectorAll('.project-card')
    const buttons = document.querySelectorAll('.filter-btn')

    // Reset all buttons
    buttons.forEach((btn) => {
        btn.classList.remove('bg-amber-700', 'text-white', 'border-2', 'border-amber-700', 'dark:border-white')
        btn.classList.add('bg-white', 'dark:bg-raisin-black', 'text-gray-700', 'dark:text-gray-300')
    })

    // Set active button
    event.currentTarget.classList.remove('bg-white', 'dark:bg-raisin-black', 'text-gray-700', 'dark:text-gray-300')
    event.currentTarget.classList.add('bg-amber-700', 'text-white', 'border-2', 'border-amber-700', 'dark:border-white')

    // Show/hide project cards with animation
    cards.forEach((card, idx) => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block'
            card.style.opacity = '0'
            card.style.transform = 'translateY(20px)'
            setTimeout(() => {
                card.style.opacity = '1'
                card.style.transform = 'translateY(0)'
            }, idx * 100)
        } else {
            card.style.opacity = '0'
            card.style.transform = 'translateY(20px)'
            setTimeout(() => {
                card.style.display = 'none'
            }, 300)
        }
    })
}

// Open modal with animation
function openInfoModal(links, title) {
    const modal = document.getElementById('infoModal')
    const box = document.getElementById('modalBox')
    const titleElem = document.getElementById('modalTitle')
    const linksElem = document.getElementById('modalLinks')

    if (!modal || !box || !titleElem || !linksElem) {
        console.error('Modal elements not found')
        return
    }

    titleElem.textContent = title
    linksElem.innerHTML = ''

    if (!links || links.length === 0) {
        linksElem.innerHTML = `
      <div class="text-center py-8">
        <i class="fas fa-info-circle text-4xl text-gray-400 dark:text-gray-600 mb-4"></i>
        <p class="text-gray-600 dark:text-gray-400 text-lg">More details coming soon!</p>
      </div>
    `
    } else {
        links.forEach((link, index) => {
            const label = getLabelForLink(link, index)
            const icon = getIconForLink(link)
            linksElem.innerHTML += `
        <a href="${link}" target="_blank" rel="noopener noreferrer"
           class="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r dark:from-night dark:to-chocolate-cosmos from-lavender-gray to-misty-plum text-black dark:text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium">
          <i class="fas fa-${icon} text-xl"></i>
          ${label}
        </a>
      `
        })
    }

    modal.classList.remove('hidden')

    setTimeout(() => {
        box.classList.remove('scale-95', 'opacity-0')
        box.classList.add('scale-100', 'opacity-100')
    }, 10)
}

// Get label for link
function getLabelForLink(link, index) {
    if (!link) return 'Link ' + (index + 1)
    if (link.includes('youtu')) return 'Watch Demo Video'
    if (link.includes('drive')) return 'View Documentation'
    if (link.includes('render') || link.includes('vercel') || link.includes('herokuapp')) return 'Open Live Website'
    return 'Open Link ' + (index + 1)
}

// Get icon for link
function getIconForLink(link) {
    if (!link) return 'link'
    if (link.includes('youtu')) return 'play-circle'
    if (link.includes('drive')) return 'file-alt'
    if (link.includes('render') || link.includes('vercel') || link.includes('herokuapp')) return 'external-link-alt'
    return 'link'
}

// Close modal with animation
function closeInfoModal() {
    const modal = document.getElementById('infoModal')
    const box = document.getElementById('modalBox')

    if (!modal || !box) return

    box.classList.add('scale-95', 'opacity-0')
    box.classList.remove('scale-100', 'opacity-100')

    setTimeout(() => {
        modal.classList.add('hidden')
    }, 300)
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeInfoModal()
    }
})

// Make functions globally available
window.filterProjects = filterProjects
window.openInfoModal = openInfoModal
window.closeInfoModal = closeInfoModal