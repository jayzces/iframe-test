const createCase = async e => {
  e.preventDefault()

  // get formValues
  const form = {
    deviceIds: (document.querySelector('#devices').value || '').split(','),
    patientInformation: {
      identifier: document.querySelector('#patient-identifier').value,
      age: document.querySelector('#patient-age').value,
      sex: document.querySelector('input[name="patient-sex"]:checked').value,
    },
    organisationId: document.querySelector('#org-id').value,
    isProspective: document.querySelector('input[name="is-prospective"]:checked').value,
    expectedDeliveryDatetime: new Date(document.querySelector('#expected-delivery').value).toISOString(),
    physicianComment: document.querySelector('#physician-comment').value,
  }

  const apiUrl = document.querySelector('#api-url').value
  const apiKey = document.querySelector('#api-key').value

  const intervention = document.querySelector('#intervention').value
  if (intervention) form.interventionDatetime = new Date(intervention).toISOString()

  fetch(`${apiUrl}`, {
    method: 'POSt',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${authToken}`
    },
    body: JSON.stringify(form),
  })
    .then(res => res.json())
    .then(response => {
      // render response
      const container = document.querySelector('#response')
      container.innerHTML = JSON.stringify(response)
    })
    .catch(err => console.error(err))
}

const form = document.querySelector('#case-create-form')
form.addEventListener('submit', createCase)
