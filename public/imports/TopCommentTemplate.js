;(() => {
  const html = /*html*/`
    <aside class="top-comment" typeof="Comment" property="comment">
      <a data-url href="">
        <div class="top-comment-meta">
          <h4 class="top-comment-heading">
            Top Comment
          </h4>
          <span class="top-comment-author" property="author">
            <slot name="by"></slot>
          </span>
          <time class="top-comment-time" datetime="2020-01-01T14:12:11" property="dateCreated">
            <slot name="time"></slot>
          </time>
        </div>
        <div property="abstract">
          <slot name="text"></slot>
        </div>
        <div class="top-comment-meta top-comment-footer">
          <span class="top-comment-total-count"><slot name="descendants"></slot> Total Comments</span>
        </div>
      </a>
    </aside>
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

      .top-comment-meta {
        margin-bottom: .5rem;
      }

      .top-comment {
        padding: .5em var(--edge-padding);
      }
      .top-comment-footer {
        margin-top: 1rem;
      }
      .top-comment-total-count {
        font-weight: 500;
        font-family: 'Kanit', sans-serif;
      }
    </style>
  `
  const template = window.document.createElement('template')
  template.setAttribute('id', 'top-comment-template')
  template.innerHTML = html
  window.document.body.prepend(template)
})()