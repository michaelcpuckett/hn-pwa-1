(() => {
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
})()