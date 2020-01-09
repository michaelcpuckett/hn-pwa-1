window.customElements.define('app-screen', class extends HTMLElement {
  constructor() {
    super()

    this._isLoading = false
    this._host = this
    this.fragment = window.document.createDocumentFragment()

    window.document.body.addEventListener('click', (e) => {
      const hash = window.location.hash
      const href = e.composedPath()[0].getAttribute('href')
      if (href) {
        if (href.startsWith('#') || href === '') {
          if (hash.replace('#', '') === href.replace('#', '')) {
            e.preventDefault()
            window.scrollTo(0, 0)
          } else {
            e.preventDefault()
            if (href === '#' || href === '') {
              window.history.pushState({}, '', `#${this.section}`)
            } else {
              window.history.pushState({}, '', `#${href.replace('#', '')}`)
            }
            this.handleRoute()

            const relativeHash = [hash.replace('#', ''), href.replace('#', '')]
            if (relativeHash.includes('topstories') && relativeHash.includes('newstories')) {
              window.scrollTo(0, 0)
            }
          }
        }
      }
    })
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
    if (['topstories', 'newstories', 'devstories', ''].includes(window.location.hash.replace('#', ''))) {
      const drawerView = window.document.querySelector('drawer-view')
      if (drawerView) {
        drawerView.remove()
        return
      }
      const embedView = window.document.querySelector('embed-view')
      if (embedView) {
        embedView.remove()
        return
      }
      this.section = window.location.hash.replace('#', '') || 'topstories'
      if (window.location.hash.replace('#', '') === '') {
        window.location.replaceState({}, '', `#${this.section}`)
      }
      if (!this.isLoading) {
        this.isLoading = true
        let storyIDs = window.localStorage.getItem(`#${this.section}`)
        const handleStories = () => {
          const elements = [...window.document.querySelectorAll('top-story')]
          elements.forEach(el => {
            if (!storyIDs.includes(el.dataset.id)) {
              this.fragment.append(el)
            }
          })
          storyIDs.forEach(id => {
            const cachedElement = elements.find(el => el.dataset.id === id) || this.fragment.querySelector(`[data-id="${id}"]`)
            if (cachedElement) {
              this.append(cachedElement)
            } else {
              const element = window.document.createElement('top-story')
              this.append(element)
              element.section = this.section
              element.id = id
            }
          })
        }
        const getStories = (async () => {
          storyIDs = (await fetch(this.section === 'devstories' ? `https://dev.to/api/articles` : `https://hacker-news.firebaseio.com/v0/${this._section}.json`).then(res => res.json())).slice(0, 30)
          if (this.section === 'devstories') {
            storyIDs = storyIDs.map(({ id }) => id)
          }
          window.localStorage.setItem(`#${this.section}`, JSON.stringify(storyIDs))
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
      this.section = this.section || 'topstories'
      const id = window.location.hash.split('/')[1]
      const element = window.document.createElement('drawer-view')
      element.setAttribute('slot', 'drawer')
      this.appendChild(element)
      Object.assign(element, { id })
    } else if (window.location.hash.startsWith(`#embed`)) {
      this.section = this.section || 'topstories'
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
    if (!window.location.hash || window.location.hash === '#') {
      window.history.pushState({}, '', '#topstories')
    }
    this.handleRoute()
    window.addEventListener('scroll', () => {
      if (window.scrollY < -140) {
        // this.handleRoute()
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