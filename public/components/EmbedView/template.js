;(() => {
  const html = /*html*/`
    <aside class="embed-view">
      <div class="embed-loader">
        <p>Loading...</p>
        <button class="share-story" data-if-sharing-supported data-url data-title onclick="shareStory(event)">
          Open In...
        </button>
      </div>
      <div class="embed-container">
        <slot></slot>
      </div>
      <a href="#" class="close">
        <span class="visually-hidden">Close</span>
        ×
      </a>
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
      .share-story {
        padding: .5rem 1rem;
        font-weight: 500;
        border: 2px solid var(--swatch-section-accent);;
        font-family: 'Kanit', sans-serif;
        margin: 1.5rem;
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
        display: grid;
        grid-gap: 2rem;
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
      left: 1rem;
      bottom: 2rem;
      transform: translateY(-50%);
      background: var(--swatch-section-accent);
      color: white;
      font-size: 3rem;
      border-radius: 100%;
      width: 4rem;
      height: 4rem;
      line-height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      text-decoration: none;
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
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
      }
    </style>
  `
  const template = window.document.createElement('template')
  template.setAttribute('id', 'embed-view-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()