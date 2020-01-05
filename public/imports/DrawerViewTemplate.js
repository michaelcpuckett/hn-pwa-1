;(() => {
  const html = /*html*/`
    <aside class="drawer-view">
      <button onclick="closeDrawer(event)" class="close">
        <span class="visually-hidden">Close</span>
        X
      </button>
      <h2>
        <slot name="title"></slot>
      </h2>
      <slot name="item"></slot>
    </aside>
    <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      word-break: break-word;
    }
    button {
      background: none;
      appearance: none;
      border: 0;
      border-radius: 0;
      padding: 0;
      font: inherit;
      line-height: inherit;
      color: inherit;
    }
      .visually-hidden {
        position: absolute; 
        overflow: hidden; 
        clip: rect(0 0 0 0); 
        height: 1px;
        width: 1px; 
        margin: -1px;
        padding: 0;
        border: 0; 
      }
    .close {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      transform: translateY(-50%);
      background: var(--swatch-section-accent);
      color: white;
      font-weight: 500;
      font-family: 'Kanit', sans-serif;
      font-size: 2rem;
      border-radius: 100%;
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 3rem;
    }
      :host {
        position: fixed;
        bottom: 0;
        height: calc(100% - var(--header-height));
        width: 100%;
        z-index: 9;
      }
      .drawer-view {
        background: black;
        height: 100%;
        width: 100%;
        padding: 2rem;
        overflow: auto;
      }
      .drawer-view:before {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        content: '';
        z-index: -1;
      }
    </style>
  `
  const template = window.document.createElement('template')
  template.setAttribute('id', 'drawer-view-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()