;(() => {
  const html = /*html*/`
    <article class="posting" typeof="SocialMediaPosting">
      <a data-url href="" class="posting-meta">
        <time class="posting-time" datetime="2020-01-01T14:12:11" property="dateCreated">
          <slot name="time"></slot>
        </time>
        <span class="posting-submitter" property="author">
          <slot name="by"></slot>
        </span>
        <div class="posting-interaction" typeof="InteractionCounter" property="interactionStatistic">
          <span class="posting-interaction-count" property="userInteractionCount">
            <slot name="score"></slot>
          </span>
          <data property="interactionType" value="LikeAction">
            points
          </data>
        </div>
      </a>
      <div class="posting-content" property="sharedContent" typeof="Article">
        <a data-url class="posting-main" href="">
          <h3 class="posting-headline" property="headline">
            <slot name="title"></slot>
          </h3>
        </a>
        <slot name="top-comment"></slot>
      </div>
    </article>
    <style>          
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        word-break: break-word;
      }
      p {
        margin-top: 1rem;
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
      hn-icon {
        background: black;
        height: 1em;
        width: 1em;
        display: inline-grid;
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

      .posting {
        padding-bottom: 3rem;
      }

      .posting-domain {
        display: grid;
        padding: 0 var(--edge-padding);
      }
      .posting-meta,
      .top-comment-meta {
        display: grid;
        grid-auto-flow: column;
        grid-gap: .5rem;
        justify-content: flex-start;
      }

      .posting-meta {
        font-size: .9em;
        background: var(--swatch-section);
        color: var(--swatch-on-section);
        padding: 1.5em var(--edge-padding) 0;
        border-top: 5px solid var(--swatch-section-accent);
      }
      .posting-main {
        margin-bottom: 1.5rem;
        display: grid;
        grid-gap: .5rem;
        background: var(--swatch-section);
        color: var(--swatch-on-section);
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
  template.setAttribute('id', 'top-article-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()