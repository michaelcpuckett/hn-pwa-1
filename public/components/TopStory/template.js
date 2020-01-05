;(() => {
  const html = /*html*/`
    <article class="top-story" typeof="SocialMediaPosting">
      <a data-url href="" class="top-story-meta" onclick="openEmbed(event, event.currentTarget.dataset.url)">
        <!--<time class="top-story-time" datetime="2020-01-01T14:12:11" property="dateCreated">
          <slot name="time"></slot>
        </time>-->
        <span class="top-story-submitter" property="author">
          <slot name="by"></slot>
        </span>
        <div class="top-story-interaction" typeof="InteractionCounter" property="interactionStatistic">
          <span class="top-story-interaction-count" property="userInteractionCount">
            <slot name="score"></slot>
          </span>
          <data property="interactionType" value="LikeAction">
            points
          </data>
        </div>
      </a>
      <div class="top-story-content" property="sharedContent" typeof="Article">
        <a data-url class="top-story-main" href="" onclick="openEmbed(event, event.currentTarget.dataset.url)">
          <h3 class="top-story-headline" property="headline">
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

      .top-story {
        padding-bottom: 3rem;
      }

      .top-story-domain {
        display: grid;
        padding: 0 var(--edge-padding);
      }
      .top-story-meta,
      .top-comment-meta {
        display: grid;
        grid-auto-flow: column;
        grid-gap: .5rem;
        justify-content: flex-start;
      }

      .top-story-meta {
        font-size: .9em;
        background: var(--swatch-section);
        color: var(--swatch-on-section);
        padding: 1.5em var(--edge-padding) 0;
        border-top: 5px solid var(--swatch-section-accent);
      }
      .top-story-main {
        margin-bottom: 1.5rem;
        display: grid;
        grid-gap: .5rem;
        background: var(--swatch-section);
        color: var(--swatch-on-section);
      }
      .top-story-meta:visited,
      .top-story-main:visited {
        background: #333;
      }
      .top-story-meta:visited {
        border-top-color: #d2d2d2;
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
  template.setAttribute('id', 'top-story-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()