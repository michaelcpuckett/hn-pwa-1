window.customElements.define('drawer-item', class extends HTMLElement {
  constructor() {
    super()
    const template = window.document.getElementById('drawer-item-template')
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
  set text(value) {
    this.setSlot('text', value)
  }
  set by(value) {
    this.setSlot('by', value)
  }
})