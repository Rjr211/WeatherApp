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

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        

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
            // The location of Uluru
            var uluru = {lat: lat, lng: long};
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 6, center: uluru});
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({position: uluru, map: map});
          }

})

    console.log(location)
}) 


