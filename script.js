class VintageStopwatch {
  constructor() {
    this.time = 0
    this.isRunning = false
    this.lapTimes = []
    this.interval = null

    this.initializeElements()
    this.bindEvents()
  }

  initializeElements() {
    this.timeDisplay = document.getElementById("timeDisplay")
    this.startBtn = document.getElementById("startBtn")
    this.pauseBtn = document.getElementById("pauseBtn")
    this.resetBtn = document.getElementById("resetBtn")
    this.lapBtn = document.getElementById("lapBtn")
    this.lapCard = document.getElementById("lapCard")
    this.lapList = document.getElementById("lapList")
  }

  bindEvents() {
    this.startBtn.addEventListener("click", () => this.start())
    this.pauseBtn.addEventListener("click", () => this.pause())
    this.resetBtn.addEventListener("click", () => this.reset())
    this.lapBtn.addEventListener("click", () => this.recordLap())
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const ms = Math.floor((milliseconds % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
  }

  updateDisplay() {
    this.timeDisplay.textContent = this.formatTime(this.time)
  }

  start() {
    this.isRunning = true
    this.startBtn.style.display = "none"
    this.pauseBtn.style.display = "flex"
    this.lapBtn.style.display = "block"

    this.interval = setInterval(() => {
      this.time += 10
      this.updateDisplay()
    }, 10)
  }

  pause() {
    this.isRunning = false
    this.startBtn.style.display = "flex"
    this.pauseBtn.style.display = "none"
    this.lapBtn.style.display = "none"

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  reset() {
    this.isRunning = false
    this.time = 0
    this.lapTimes = []

    this.startBtn.style.display = "flex"
    this.pauseBtn.style.display = "none"
    this.lapBtn.style.display = "none"
    this.lapCard.style.display = "none"

    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    this.updateDisplay()
    this.updateLapDisplay()
  }

  recordLap() {
    if (this.isRunning && this.time > 0) {
      const lapTime = {
        id: this.lapTimes.length + 1,
        time: this.formatTime(this.time),
        totalTime: this.time,
      }

      this.lapTimes.unshift(lapTime)
      this.updateLapDisplay()
      this.lapCard.style.display = "block"
    }
  }

  updateLapDisplay() {
    this.lapList.innerHTML = ""

    this.lapTimes.forEach((lap) => {
      const lapItem = document.createElement("div")
      lapItem.className = "lap-item"

      lapItem.innerHTML = `
        <span class="lap-number">Lap ${lap.id}</span>
        <span class="lap-time">${lap.time}</span>
      `

      this.lapList.appendChild(lapItem)
    })
  }
}

// Initialize the stopwatch when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new VintageStopwatch()
})
