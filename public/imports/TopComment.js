window.customElements.define('top-comment', class extends HTMLElement {
  constructor() {
    super()
  }
  static get observedAttributes() {
    return [
      'id',
      'by',
      'text',
      'score',
      'descendants',
      'time',
      'type',
      'url'
    ]
  }
  get id() {
    return this.getAttribute('id');
  }
  set id(value) {
    if (this.getAttribute('id') != value) {
      this.setAttribute('id', value)
    }
  }
  get by() {
    return this.getAttribute('by')
  }
  set by(value) {
    if (this.getAttribute('by') != value) {
      this.setAttribute('by', value)
    }
  }
  get score() {
    return this.getAttribute('score')
  }
  set score(value) {
    if (this.getAttribute('score') != value) {
      this.setAttribute('score', value)
    }
  }
  get time() {
    return this.getAttribute('time')
  }
  set time(value) {
    const options = { dateStyle: 'short', timeStyle: 'short' }
    const dateTime = new Date(value * 1000).toLocaleString(undefined, options)
    const dateString = dateTime.split(', ')[0]
    const todaysDateString = new Date().toLocaleString(undefined, options).split(', ')[0]
    const dateTimeString = `${dateTime.split(', ')[1]}${dateString === todaysDateString ? '' : ` ${dateString}`}`
    if (this.getAttribute('time') != dateTimeString) {
      this.setAttribute('time', dateTimeString)
    }
  }
  get text() {
    return this.getAttribute('text')
  }
  set text(value) {
    const text = value.slice(0, 250) + (value.length > 250 ? '...' : '')
    if (this.getAttribute('text') != text) {
      this.setAttribute('text', text)
    }
  }
  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    if (this.getAttribute('type') != value) {
      this.setAttribute('type', value)
    }
  }
  get descendants() {
    return this.getAttribute('descendants')
  }
  set descendants(value) {
    if (this.getAttribute('descendants') != value) {
      this.setAttribute('descendants', value)
    }
  }
  get url() {
    return this.getAttribute('url')
  }
  set url(value) {
    if (this.getAttribute('url') != value) {
      this.setAttribute('url', value)
      ;[...this.shadowRoot.querySelectorAll('[data-url]')].forEach(element => {
        element.setAttribute('href', value)
      })
    }
  }
  attributeChangedCallback(name, oldValue, value) {
    this[name] = value
    const element = this.querySelector(`[slot="${name}"]`)
    if (element) {
      if (name === 'text') {
        element.innerHTML = value 
      } else if (element.innerText !== value) {
        element.innerText = value
      }
    }
  }
  connectedCallback() {
    const template = window.document.getElementById('top-comment-template')
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
})