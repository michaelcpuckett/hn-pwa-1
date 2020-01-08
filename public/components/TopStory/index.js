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
    if (value !== this._id) {
      this._id = value
      this.dataset.id = value
      ;(async () => {
        const item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${value}.json`).then(res => res.json())
        this.data = item
        Object.assign(this, item)
      })()
    }
  }
  set by(value) {
    this.setSlot('by', value)
  }
  set score(value) {
    this.setSlot('score', value)
  }
  set title(value) {
    this.setSlot('title', value)
    ;[...this.shadowRoot.querySelectorAll('[data-title]')].forEach(element => {
      element.dataset.title = value
    })
    if (!window.navigator.share) {
      ;[...this.shadowRoot.querySelectorAll('[data-if-sharing-supported]')].forEach(element => {
        element.remove()
      })
    }
  }
  set type(value) {
    this.setSlot('type', value)
  }
  set descendants(value) {
    this.setSlot('descendants', value)
  }
  set url(value) {
    ;[...this.shadowRoot.querySelectorAll('[href]')].forEach(element => {
      element.setAttribute('href', `#embed/${value}`)
    })
    ;[...this.shadowRoot.querySelectorAll('[data-url]')].forEach(element => {
      element.dataset.url = value
    })
  }
  set kids(value) {
    ;(async () => {
      const cachedData = window.localStorage.getItem(this.data.id)
      const data = cachedData ? JSON.parse(cachedData) : {
        ...(await fetch(`https://hacker-news.firebaseio.com/v0/item/${value[0]}.json`).then(res => res.json())) || {},
        descendants: this.data.descendants,
        parentid: this.data.id,
        url: `https://news.ycombinator.com/item?id=${this.data.id}`
      }
      const element = window.document.createElement('top-comment')
      element.setAttribute('slot', 'top-comment')
      this.append(element)
      Object.assign(element, data)
      window.localStorage.setItem(this.data.id, JSON.stringify(data))
    })()
  }
})