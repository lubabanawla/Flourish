document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("lotusCanvas")
  const ctx = canvas.getContext("2d")

  function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const lotus = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      petals: [],
      petalCount: 12,
      innerPetalCount: 8,
      maxPetalSize: Math.min(canvas.width, canvas.height) * 0.15,
      bloomProgress: 0,
      bloomSpeed: 0.005,
      rotation: 0,
      rotationSpeed: 0.001,
  }

  function createPetals() {
      lotus.petals = []

      // Outer petals
      for (let i = 0; i < lotus.petalCount; i++) {
          const angle = (i / lotus.petalCount) * Math.PI * 2
          lotus.petals.push({
              angle: angle,
              size: 0,
              maxSize: lotus.maxPetalSize,
              color: "#e83e8c",
              layer: 1,
          })
      }

      for (let i = 0; i < lotus.innerPetalCount; i++) {
          const angle = (i / lotus.innerPetalCount) * Math.PI * 2 + Math.PI / lotus.innerPetalCount
          lotus.petals.push({
              angle: angle,
              size: 0,
              maxSize: lotus.maxPetalSize * 0.7,
              color: "#f8d7da",
              layer: 2,
          })
      }
  }

  createPetals()

  function drawPetal(x, y, angle, size, color) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle + lotus.rotation)

      ctx.beginPath()
      ctx.moveTo(0, 0)

      ctx.bezierCurveTo(size * 0.5, size * 0.5, size * 0.5, size * 1.5, 0, size * 2)

      ctx.bezierCurveTo(-size * 0.5, size * 1.5, -size * 0.5, size * 0.5, 0, 0)

      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
  }

  function drawCenter(x, y, size) {
      ctx.beginPath()
      ctx.arc(x, y, size * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = "#ffd700"
      ctx.fill()
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lotus.x = canvas.width / 2
      lotus.y = canvas.height / 2

      if (lotus.bloomProgress < 1) {
          lotus.bloomProgress += lotus.bloomSpeed
      }

      lotus.rotation += lotus.rotationSpeed

      for (let layer = 1; layer <= 2; layer++) {
          lotus.petals.forEach((petal) => {
              if (petal.layer === layer) {
                  const currentSize = petal.maxSize * Math.min(1, lotus.bloomProgress * 1.5)
                  drawPetal(lotus.x, lotus.y, petal.angle, currentSize, petal.color)
              }
          })
      }

      drawCenter(lotus.x, lotus.y, lotus.maxPetalSize)

      requestAnimationFrame(animate)
  }

  animate()
})