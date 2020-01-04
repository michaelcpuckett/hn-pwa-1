window.customElements.define('top-story', class extends HTMLElement {
  constructor() {
    super()
    const template = window.document.getElementById('top-story-template')
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
  set id(value) {
    this.setSlot('id', value)
  }
  set by(value) {
    this.setSlot('by', value)
  }
  set score(value) {
    this.setSlot('score', value)
  }
  set title(value) {
    this.setSlot('title', value)
  }
  set type(value) {
    this.setSlot('type', value)
  }
  set descendants(value) {
    this.setSlot('descendants', value)
  }
  set url(value) {
    ;[...this.shadowRoot.querySelectorAll('[data-url]')].forEach(element => {
      element.setAttribute('href', value)
    })
  }
  set kids(value) {
    ;(async () => {
      const data = {
        ...(await fetch(`https://hacker-news.firebaseio.com/v0/item/${value[0]}.json`).then(res => res.json())) || {},
        descendants: this.data.descendants,
        url: `https://news.ycombinator.com/item?id=${this.data.id}`
      }
      const element = window.document.createElement('top-comment')
      element.setAttribute('slot', 'top-comment')
      this.append(element)
      Object.assign(element, data)
    })()
  }
})