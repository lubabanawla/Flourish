document.addEventListener("DOMContentLoaded", () => {
  const lotusContainer = document.querySelector(".lotus-container")
  const infoSections = document.querySelectorAll(".info-section")

  function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25
  }

  function handleScroll() {
      const scrollPosition = window.pageYOffset

      lotusContainer.style.transform = `translateY(${scrollPosition * 0.5}px)`
      lotusContainer.style.opacity = Math.max(0, 1 - scrollPosition / (window.innerHeight * 0.8))

      if (scrollPosition === 0) {
          document.body.classList.add('at-top')
          document.body.classList.remove('scrolled')
      } else if (scrollPosition > 50) {
          document.body.classList.remove('at-top')
          document.body.classList.add('scrolled')
      } else {
          document.body.classList.remove('at-top')
          document.body.classList.remove('scrolled')
      }

      infoSections.forEach((section) => {
          if (isInViewport(section)) {
              section.classList.add("visible")
          }
      })
  }

  handleScroll()

  window.addEventListener("scroll", handleScroll)

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault()

          const targetId = this.getAttribute("href")
          const targetElement = document.querySelector(targetId)

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: "smooth",
              })
          }
      })
  })
})