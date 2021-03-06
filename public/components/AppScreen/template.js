;(() => {
  const html = /*html*/`
    <div class="container">
      <header class="header">
        <a href="#">
          <h1>
            <span aria-hidden="true">Digest</span>
            <span class="visually-hidden">Hacker News, Dev.to Reader</span>
          </h1>
        </a>
        <a href="https://github.com/michaelcpuckett/hn-pwa-1">Alpha</a>
        <!--<nav>
          <button type="button" aria-label="Search" data-modal="search">
            <hn-icon glyph="search"></hn-icon>
          </button>
          <button type="button" aria-label="Submit" data-modal="submit">
            <hn-icon glyph="plus"></hn-icon>
          </button>
        </nav>-->
      </header>
      <main class="main">
        <section aria-label="Front Page">
          <h2 class="h2-top">
            <span data-show-if="topstories">Top HN Stories</span>
            <span data-show-if="newstories">New HN Stories</span>
            <span data-show-if="devstories">Dev.to Stories</span>
          </h2>
          <div data-show-if-loading="loading">
            Loading...
          </div>
          <div data-show-if-loading="loaded">
            <slot></slot>
          </div>
        </section>
        <slot name="drawer"></slot>
        <slot name="embed"></slot>
      </main>
      <nav class="footer">
        <a href="#topstories" aria-label="Top Stories">
          HN Top<!--<hn-icon glyph="newspaper"></hn-icon>-->
        </a>
        <a href="#newstories" aria-label="Latest">
          HN New<!--<hn-icon glyph="list"></hn-icon>-->
        </a>
        <a href="#devstories" aria-label="Dev.to">
          Dev.to<!--<hn-icon glyph="list"></hn-icon>-->
        </a><!--
        <a href="/settings" aria-label="Settings">
          <hn-icon glyph="settings"></hn-icon>
        </a>-->
      </nav>
    </div>
    <style>
      
      :host([data-section="topstories"]) {
        --swatch-section: #500F74;
        --swatch-section-accent: #CD00D8;
        --swatch-on-section: white;
      }
      :host([data-section="newstories"]) {
        --swatch-section: #004BD8;
        --swatch-section-accent: #3078FF;
        --swatch-on-section: white;
      }
      :host([data-section="devstories"]) {
        --swatch-section: #141f2d;
        --swatch-section-accent: #22303f;
        --swatch-on-section: white;
      }

      :host([data-loading="loading"]) [data-show-if-loading]:not([data-show-if-loading="loading"]),
      :host([data-loading="loaded"]) [data-show-if-loading]:not([data-show-if-loading="loaded"]) {
        display: none;
      }
      :host([data-section="topstories"]) [data-show-if]:not([data-show-if="topstories"]),
      :host([data-section="newstories"]) [data-show-if]:not([data-show-if="newstories"]),
      :host([data-section="devstories"]) [data-show-if]:not([data-show-if="devstories"]) {
        display: none;
      }
      [data-show-if-loading="loading"] {
        display: grid;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        word-break: break-word;
      }
      p {
        margin-top: 1rem;
      }
      h1 {
        font-size: 2.667rem;
        font-weight: 800;
        font-family: 'Kanit', sans-serif;
      }
      h2 {
        font-size: 2rem;
        line-height: 1.3;
        padding: 1rem var(--edge-padding);
        display: grid;
        text-transform: uppercase;
        grid-auto-flow: column;
        align-items: center;
        justify-content: flex-start;
        grid-gap: 1rem;
        background: var(--swatch-grey-bg);
        color: var(--swatch-on-grey-bg);
        font-weight: 800;
        font-family: 'Kanit', sans-serif;
      }
      h2:before {
        height: 1em;
        width: 1em;
        background: var(--swatch-section);
        content: '';
        display: inline-grid;
      }
      h3 {
        font-weight: 500;
        font-family: 'Kanit', sans-serif;
        font-size: 1.667rem;
        line-height: 1.3;
        padding-bottom: 1.5rem;
        padding-left: var(--edge-padding);
        padding-right: var(--edge-padding);
      }
      h4 {
        font-weight: 500;
        font-family: 'Kanit', sans-serif;
        display: inline-grid;
      }
      .header {
        position: fixed;
        top: 0;
        height: var(--header-height);
        width: 100%;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        align-items: center;
        padding: 0 var(--edge-padding);
        background: var(--swatch-grey-bg);
        color: var(--swatch-section);
      }
      @supports (--foo: env(bar)) {
        .header {
          padding-top: env(safe-area-inset-top, 0);
        }
      }
      .main {
        margin-top: 80px;
        margin-bottom: 80px;
        background: var(--swatch-container);
      }
      @supports (--foo: env(bar)) {
        .main {
          margin-top: var(--header-height);
          margin-bottom: var(--footer-height);
        }
      }
      hn-icon {
        background: black;
        height: 1em;
        width: 1em;
        display: inline-grid;
      }
      .footer {
        position: fixed;
        background: #fefefe;
        border-top: 1px solid var(--swatch-grey-bg);
        bottom: 0;
        height: var(--footer-height);
        width: 100%;
        display: grid;
        grid-gap: 3rem;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        align-items: center;
        padding: 0 var(--edge-padding);
      }
      @supports (--foo: env(bar)) {
        .footer {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      }
      @media (prefers-color-scheme: dark) {
        .footer {
          background: black;
        }
      }
      .footer a {
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        font-size: 1.25em;
        -webkit-tap-highlight-color: white;
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
      a {
        color: inherit;
        text-decoration: none;
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
    </style>
  `
  const template = window.document.createElement('template')
  template.setAttribute('id', 'app-screen-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()