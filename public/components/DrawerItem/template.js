;(() => {
  const html = /*html*/`
    <article class="drawer-item">
      <div class="by">
        <slot name="by"></slot>
      </div>
      <div>
        <slot name="text"></slot>
      </div>
    </article>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        word-break: break-word;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      .by {
        font-weight: 500;
        font-family: 'Kanit', sans-serif;
      }
      .drawer-item {
        padding: 1rem 0 3rem;
        margin-bottom: 3rem;
        margin-top: 1rem;
        border-bottom: 2px solid white;
      }
    </style>
  `
  const template = window.document.createElement('template')
  template.setAttribute('id', 'drawer-item-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()