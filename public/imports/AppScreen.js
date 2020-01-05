window.customElements.define('app-screen', class extends HTMLElement {
  constructor() {
    super()

    window.addEventListener('hashchange', e => {
      if (!window.location.hash) {
        const drawerView = window.document.querySelector('drawer-view')
        if (drawerView) {
          drawerView.remove()
        }
      } else if (window.location.hash.startsWith(`#comments`)) {
        const id = window.location.hash.split('/')[1]
        const element = window.document.createElement('drawer-view')
        element.setAttribute('slot', 'drawer')
        window.document.querySelector('app-screen').appendChild(element)
        Object.assign(element, { id })
      }
    })
    
    window.openDrawer = async (e, id) => {
      e.preventDefault()
      id = id || e.currentTarget.dataset.parentid
      window.location.hash = `#comments/${id}`
    }
    window.closeDrawer = (e) => {
      e.preventDefault()
      window.location.hash = ''
    }
  }
  connectedCallback() {
    const template = window.document.getElementById('app-screen-template')
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    const data = {
      stories: [],
      _section: null,
      get section() {
        return this._section
      },
      set section(section) {
        this._section = section
        window.document.querySelector('app-screen').dataset.section = section
      }
    }
    let isLoading = false

    data.section = 'topstories'
    data.refetch = async (type) => {
      if (!isLoading) {
        isLoading = true
        data.stories = await fetch(`https://hacker-news.firebaseio.com/v0/${type || data.section}.json`).then(res => res.json())
        data.stories = await Promise.all(data.stories.slice(0, 25).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())))
        ;[...window.document.querySelectorAll('top-story')].forEach(el => el.remove())
        data.stories.forEach(story => {
          if (story) { // can be null
            const element = window.document.createElement('top-story')
            window.document.querySelector('app-screen').append(element)
            element.data = story
            Object.assign(element, story)
          }
        })
        window.scrollTo(0, 0)
        isLoading = false
      }
    }
    data.refetch()
    window.addEventListener('scroll', () => {
      if (window.scrollY < 0) {
        data.refetch()
      }
    })
    window.handleTopClick = async (e) => {
      e.preventDefault()
      await data.refetch('topstories')
      data.section = 'topstories'
    }
    window.handleLatestClick = async (e) => {
      e.preventDefault()
      await data.refetch('newstories')
      data.section = 'newstories'
    }

    // disable bfcache
    // window.addEventListener('beforeunload', () => {})

    const hammerTime = new Hammer(window.document.body)
    hammerTime.on('swipeend panend', (e) => {
      const drawerView = window.document.querySelector('drawer-view')
      if (drawerView) {
        drawerView.style.transform = ''
        if (e.distance > 180) {
          window.history.back()
        }
      }
    })
    hammerTime.on('swiperight panright', (e) => {
      const drawerView = window.document.querySelector('drawer-view')
      if (drawerView) {
        if (e.distance > 180) {
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