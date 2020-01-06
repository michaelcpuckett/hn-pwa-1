window.customElements.define('embed-view', class extends HTMLElement {
  constructor() {
    super()
    const template = window.document.getElementById('embed-view-template')
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  setSlot(slot, value) {
    if (!this.querySelector(`[slot="${slot}"]`)) {
      const element = window.document.createElement('data')
      element.setAttribute('slot', slot)
      this.append(element)
    }
    this.querySelector(`[slot="${slot}"]`).innerHTML = value
  }
  set url(value) {
    if (!window.navigator.share) {
      ;[...this.shadowRoot.querySelectorAll('[data-if-sharing-supported]')].forEach(element => {
        element.remove()
      })
    }
    ;(async () => {
      fetch(`https://cors-anywhere.herokuapp.com/${value}`)
        .then(res => res.headers.get('X-Frame-Options'))
        .then(hasFramePolicy => {
          if (hasFramePolicy) {
            window.location.hash = ''
            window.location = value
          }
        })
        .catch(() => {
          window.location.hash = ''
          window.location = value
        })
      const element = window.document.createElement('iframe')
      element.style.backgroundColor = 'white'
      element.setAttribute('frameborder', '0')
      element.setAttribute('height', '100%')
      element.setAttribute('width', '100%')
      element.setAttribute('src', value)
      this.append(element)
    })()
  }
})