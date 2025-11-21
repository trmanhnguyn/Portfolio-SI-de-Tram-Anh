document.addEventListener("DOMContentLoaded", () => {
  // Navigation active state
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section[id]")

  function updateActiveNav() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)

  // Smooth scroll pour tous les liens d'ancrage
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#" && href.length > 1) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
          const navbarHeight = document.querySelector(".navbar").offsetHeight
          const targetPosition = targetSection.offsetTop - navbarHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 50) {
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
    } else {
      navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)"
      navbar.style.background = "rgba(255, 255, 255, 0.8)"
    }

    lastScroll = currentScroll
  })

  // Formulaire de contact
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalContent = submitBtn.innerHTML

      // Animation de chargement
      submitBtn.innerHTML = "<span>Envoi en cours...</span>"
      submitBtn.disabled = true
      submitBtn.style.opacity = "0.7"

      // Simulation d'envoi
      setTimeout(() => {
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value

        // Afficher un message de succès
        const successMessage = document.createElement("div")
        successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    color: white;
                    padding: 2rem 3rem;
                    border-radius: 1rem;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    text-align: center;
                    animation: fadeInScale 0.3s ease-out;
                `
        successMessage.innerHTML = `
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Message envoyé !</h3>
                    <p style="opacity: 0.9;">Merci ${name}, je vous répondrai bientôt.</p>
                `

        document.body.appendChild(successMessage)

        // Réinitialiser le formulaire
        contactForm.reset()
        submitBtn.innerHTML = originalContent
        submitBtn.disabled = false
        submitBtn.style.opacity = "1"

        // Supprimer le message après 3 secondes
        setTimeout(() => {
          successMessage.style.animation = "fadeOutScale 0.3s ease-out"
          setTimeout(() => successMessage.remove(), 300)
        }, 3000)
      }, 1500)
    })
  }

  // Intersection Observer pour les animations d'apparition
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observer pour les cartes
  const cards = document.querySelectorAll(".card, .project-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`
    observer.observe(card)
  })

  // Observer pour les titres de section
  const sectionHeaders = document.querySelectorAll(".section-header")
  sectionHeaders.forEach((header) => {
    header.style.opacity = "0"
    header.style.transform = "translateY(20px)"
    header.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(header)
  })

  // Effet parallaxe léger sur le hero
  const hero = document.querySelector(".hero")
  const heroContent = document.querySelector(".hero-content")

  if (hero && heroContent) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * 0.5

      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${rate}px)`
        heroContent.style.opacity = 1 - scrolled / window.innerHeight
      }
    })
  }

  // Animation des tech tags au survol
  const techTags = document.querySelectorAll(".tech-tag")
  techTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Effet de focus amélioré sur les inputs
  const inputs = document.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "translateX(4px)"
    })

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "translateX(0)"
    })
  })

  // Masquer le scroll indicator après scroll
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = "0"
        scrollIndicator.style.pointerEvents = "none"
      } else {
        scrollIndicator.style.opacity = "1"
        scrollIndicator.style.pointerEvents = "auto"
      }
    })
  }
})

// Ajouter les keyframes pour les animations
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOutScale {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
`
document.head.appendChild(style)
