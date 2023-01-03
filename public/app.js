const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const load = document.querySelector('#load')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    load.textContent = 'loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''

    fetch('/weather?address=' + location)
        .then((response) => {
            response.json()
            .then((data) => {
                if(data.error) {
                    load.textContent = data.error
                } else {
                    load.textContent = ''
                    messageOne.textContent = data.description
                    messageTwo.textContent = data.temperature
                }
            })
        })
})

