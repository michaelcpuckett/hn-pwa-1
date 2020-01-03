window.customElements.define('app-screen', class extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const template = window.document.getElementById('app-screen-template')
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
})