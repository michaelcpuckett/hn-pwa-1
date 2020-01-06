window.customElements.define('app-screen', class extends HTMLElement {
  constructor() {
    super()

    this._isLoading = false
    this._host = this

    window.addEventListener('hashchange', () => {
      this.handleRoute()
    })
    window.openEmbed = (e, url) => {
      e.preventDefault()
      url = url || e.currentTarget.dataset.url
      window.location.hash = `#embed/${url}`
    }
    window.openDrawer = (e, id) => {
      e.preventDefault()
      id = id || e.currentTarget.dataset.parentid
      window.location.hash = `#comments/${id}`
    }
    window.closeDrawer = (e) => {
      e.preventDefault()
      window.location.hash = ''
    }
    window.closeEmbed = (e) => {
      e.preventDefault()
      window.location.hash = ''
    }
  }
  get section() {
    return this._section
  }
  set section(section) {
    this._section = section
    this._host.dataset.section = section
  }
  get isLoading() {
    return this._isLoading
  }
  set isLoading(isLoading) {
    this._isLoading = isLoading
    if (isLoading) {
      this.dataset.loading = 'loading'
    } else {
      this.dataset.loading = 'loaded'
    }
  }
  async handleRoute() {
    if (!window.location.hash || window.location.hash === '#newstories') {
      const drawerView = window.document.querySelector('drawer-view')
      if (drawerView) {
        drawerView.remove()
      }
      const embedView = window.document.querySelector('embed-view')
      if (embedView) {
        embedView.remove()
      }
      if (!this.isLoading) {
        this.isLoading = true
        this.section = window.location.hash === '#newstories' ? 'newstories' : 'topstories'
        let storyIDs = window.localStorage.getItem(window.location.hash === '#newstories' ? '#newstories' : '#topstories')
        const handleStories = () => {
          ;[...window.document.querySelectorAll('top-story')].forEach(el => el.remove())
          storyIDs.forEach(id => {
            const element = window.document.createElement('top-story')
            this.append(element)
            Object.assign(element, {
              id,
              url: `https://news.ycombinator.com/item?id=${id}`
            })
          })
          window.scrollTo(0, 0)
        }
        const getStories = (async () => {
          storyIDs = (await fetch(`https://hacker-news.firebaseio.com/v0/${this._section}.json`).then(res => res.json())).slice(0, 25)
          window.localStorage.setItem(window.location.hash === '#newstories' ? '#newstories' : '#topstories', JSON.stringify(storyIDs))
        })
        if (storyIDs) {
          storyIDs = JSON.parse(storyIDs)
          const originalStoryIDs = storyIDs
          handleStories()
          getStories().then(() => {
            if (JSON.stringify(storyIDs) !== JSON.stringify(originalStoryIDs)) {
              handleStories()
            }
          })
        } else {
          storyIDs = await getStories().then(handleStories)
        }
        
        this.isLoading = false
      }
    } else if (window.location.hash.startsWith(`#comments`)) {
      this.section = 'topstories'
      const id = window.location.hash.split('/')[1]
      const element = window.document.createElement('drawer-view')
      element.setAttribute('slot', 'drawer')
      this.appendChild(element)
      Object.assign(element, { id })
    } else if (window.location.hash.startsWith(`#embed`)) {
      this.section = 'topstories'
      let [ _, ...url ] = window.location.hash.split('/')
      url = url.join('/')
      const element = window.document.createElement('embed-view')
      element.setAttribute('slot', 'embed')
      this.appendChild(element)
      Object.assign(element, { url })
    }
  }
  async connectedCallback() {
    const template = window.document.getElementById('app-screen-template')
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    await new Promise(resolve => window.requestAnimationFrame(resolve))
    this.handleRoute()
    window.addEventListener('scroll', () => {
      if (window.scrollY < -140) {
        // data.refetch()
      }
    })
    window.shareStory = (e) => {
      if (window.navigator.share) {
        const { title, url } = e.currentTarget.dataset
        window.navigator.share({
          title,
          url
        })
      }
    }

    // disable bfcache
    // window.addEventListener('beforeunload', () => {})

    const hammerTime = new Hammer(window.document.body)
    hammerTime.on('swipeend panend', (e) => {
      const drawerView = window.document.querySelector('drawer-view, iframe')
      if (drawerView) {
        drawerView.style.transform = ''
        if (e.distance > 240) {
          window.history.back()
        }
      }
    })
    hammerTime.on('swiperight panright', (e) => {
      const drawerView = window.document.querySelector('drawer-view, iframe')
      if (drawerView) {
        if (e.distance > 240) {
          window.history.back()
        } else if (e.distance > 40) {
          drawerView.style.transform = `translateX(${e.distance - 40}px)`
        } else {
          drawerView.style.transform = ''
        }
      }
    })
  }
})