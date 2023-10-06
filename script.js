const iframe = document.querySelector('#frame')

// Functions
const showIframe = () => {
  // brief wait while iframe loads
  let timeout = setTimeout(() => {
    iframe.classList.remove('loading')
    clearTimeout(timeout)
  }, 500)
}

const loginWithExplicitTokens = e => {
  e.preventDefault()

  // get form values
  const refresh = document.querySelector('#refresh-token').value
  const access = document.querySelector('#access-token').value
  const target = document.querySelector('#url').value
  const studyId = document.querySelector('#study-id').value

  // set iframe url
  iframe.setAttribute('src', `${target}/study-viewer/${studyId}`)

  // slight delay to let iframe load
  let timeout = setTimeout(() => {
    const iframeWin = iframe.contentWindow
    iframeWin.postMessage({ refresh, access }, target)
    clearTimeout(timeout)
    showIframe()
  }, 1000)
}

// Interactions
const tokenForm = document.querySelector('#token-form')
tokenForm.addEventListener('submit', loginWithExplicitTokens)
