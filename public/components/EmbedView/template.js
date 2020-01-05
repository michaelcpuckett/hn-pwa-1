;(() => {
  const html = /*html*/`
    <aside class="embed-view">
      <div class="embed-loader">
        Loading...
      </div>
      <div class="embed-container">
        <slot></slot>
      </div>
      <button onclick="closeEmbed(event)" class="close">
        <span class="visually-hidden">Close</span>
        X
      </button>
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
      .embed-container {
        display: flex;
        height: 100%;
        width: 100%;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
      }
      .embed-loader {
        display: flex;
        height: 100%;
        width: 100%;
        z-index: 0;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
      }
    .close {
      position: absolute;
      right: 1rem;
      bottom: 2rem;
      transform: translateY(-50%);
      background: var(--swatch-section-accent);
      color: white;
      font-weight: 500;
      font-family: 'Kanit', sans-serif;
      font-size: 3rem;
      border-radius: 100%;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      line-height: 4rem;
      z-index: 1;
    }
      :host {
        position: fixed;
        bottom: 0;
        height: calc(100% - var(--header-height));
        width: 100%;
        z-index: 9;
      }
      .embed-view {
        background: black;
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
      }
      .embed-view:before {
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
  template.setAttribute('id', 'embed-view-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()