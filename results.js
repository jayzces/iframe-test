const iframe = document.querySelector('#frame')
// for getting access tokens and refresh tokens, expires will need to be renewed
// const authToken = '86b337a246e5ed353b6b0593fd10c8d255accda9804afc3338e2250700207c9f'
// const apiUrl = 'http://localhost:8000'

// Functions
const showIframe = () => {
  // brief wait while iframe loads
  let timeout = setTimeout(() => {
    iframe.classList.remove('loading')
    clearTimeout(timeout)
  }, 500)
}

const getAccessTokens = async ({ email, apiKey, apiUrl }) => {
  return fetch(`${apiUrl}/authenticated-token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`
    },
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .catch(err => {
      console.error(err)
      throw err
    })
}

const loginWithExplicitTokens = async e => {
  e.preventDefault()
  let tokens = {}

  // get form values
  const target = document.querySelector('#hg-url').value
  const apiUrl = document.querySelector('#api-url').value
  const apiKey = document.querySelector('#api-key').value
  const email = document.querySelector('#email').value
  const studyId = document.querySelector('#study-id').value

  // set iframe url
  iframe.setAttribute('src', `${target}/study-viewer/${studyId}`)

  try {
    tokens = await getAccessTokens({ email, apiKey, apiUrl }) // to access results
  } catch (err) {
    return;
  }

  // slight delay to let iframe load
  let timeout = setTimeout(() => {
    const iframeWin = iframe.contentWindow
    const { access, refresh } = tokens
    iframeWin.postMessage({ refresh, access }, target)
    clearTimeout(timeout)
    showIframe()
  }, 1000)
}

// Interactions
const tokenForm = document.querySelector('#token-form')
tokenForm.addEventListener('submit', loginWithExplicitTokens)
