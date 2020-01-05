window.customElements.define('drawer-view', class extends HTMLElement {
  constructor() {
    super()
    const template = window.document.getElementById('drawer-view-template')
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
  set title(value) {
    this.setSlot('title', value)
  }
  set kids(value) {
    ;(async () => {
      const kids = await Promise.all((value || []).slice(0, 25).map(async id => await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())))
      kids.forEach(item => {
        const element = window.document.createElement('drawer-item')
        element.setAttribute('slot', 'item')
        this.append(element)
        Object.assign(element, item)
      })
    })()
  }
  set id(value) {
    if (value !== this._id) {
      this._id = value
      ;(async () => {
        const item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${value}.json`).then(res => res.json())
        Object.assign(this, item)
      })()
    }
  }
})