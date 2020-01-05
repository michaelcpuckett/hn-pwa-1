window.customElements.define('top-comment', class extends HTMLElement {
  constructor() {
    super()
    const template = window.document.getElementById('top-comment-template')
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
  set by(value) {
    this.setSlot('by', value)
  }
  set score(value) {
    this.setSlot('score', value)
  }
  set text(value) {
    const text = value.slice(0, 250) + (value.length > 250 ? '...' : '')
    this.setSlot('text', text)
  }
  set type(value) {
    this.setSlot('type', value)
  }
  set descendants(value) {
    this.setSlot('descendants', value)
  }
  set id(value) {
    ;[...this.shadowRoot.querySelectorAll('[data-id]')].forEach(element => {
      element.dataset.id = value
    })
  }
  set parentid(value) {
    ;[...this.shadowRoot.querySelectorAll('[data-parentid]')].forEach(element => {
      element.dataset.parentid = value
    })
  }
  set url(value) {
    ;[...this.shadowRoot.querySelectorAll('[data-url]')].forEach(element => {
      element.setAttribute('href', value)
    })
  }
})