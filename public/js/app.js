console.log('Client side JavaScript has loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        

        response.json().then((data) => {
            if(data.error){
                messageOne.style.color = 'red'
                messageOne.textContent = data.error
            } else {
                messageOne.style.color = 'green'
                messageOne.textContent = data.location
                messageTwo.style.color = 'green'
                messageTwo.textContent = data.forecast
                initMap(data.lat, data.long)
            }
            
        })

        function initMap(lat, long) {
            var googleLocation = {lat: lat, lng: long};
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 7, center: googleLocation});
            var marker = new google.maps.Marker({position: googleLocation, map: map});
          }

})

    console.log(location)
}) 


