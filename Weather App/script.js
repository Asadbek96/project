let card = document.querySelector('.card')
let recentContainer = document.querySelector('.recent')
let massivRecent = []

async function weather(city) {
  try {
    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3ad77404dc88bee59f4a50942c3dbc6&units=metric`
    )
    if (result.ok) {
      let data = await result.json()
      console.log('Weather data:', data)
      displayWeather(data)
    } else {
      console.log(`HTTP error! status: ${result.status}`)
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

document.getElementById('myCity').addEventListener('click', function (e) {
  card.textContent = ''
  e.preventDefault()
  weather('Almaty')
})

document.getElementById('search-btn').addEventListener('click', function (e) {
  e.preventDefault()
  card.textContent = ''
  let city = document.querySelector('.input').value
  if (city) {
    weather(city)
  } else {
    alert('Aqparat toltyru qazhet!')
  }
})



function displayWeather(data) {
  let div = document.createElement('div')

  div.className = 'card-item'

  div.innerHTML = `<h1 class="card-city">${data.name}</h1>
    <span class="temperature">${data.main.temp}℃</span>
    <p class='desc'>${data.weather[0].main}</p>
    <p class='feels-like'>Feels like: ${data.main.feels_like}℃</p>`

  card.appendChild(div)
}

let massiv = [
  'Astana',
  'Almaty',
  'Shymkent',
  'Taraz',
  'Aktau',
  'Kokshetau',
  'Atyrau',
  'Oral',
  'Kyzylorda',
  'Aktobe',
  'Pavlodar',
  'Petropavl',
  'Kostanay',
  'Semey',
  'Oskemen',
  'Zhezkazgan',
  'Karagandy',
  'Taldykorgan',
]

document.getElementById('allKzCities').addEventListener('click', function (e) {
  e.preventDefault()
  card.textContent = ''
  card.style.backgroundImage = 'none'
  massiv.forEach(qala => {
    weather(qala)
  })
})


document.getElementById('search-btn').addEventListener('click', function (e) {
  let city = document.querySelector('.input').value
  let recent = document.querySelector('.recent')
  massivRecent.push(city)
  localStorage.setItem('recent', JSON.stringify(massivRecent))
  let div = document.createElement('div')

  let recentCity = massivRecent.length - 1
  console.log(massivRecent[recentCity])

  div.innerHTML = `
  <p class='recent-city'>${massivRecent[recentCity]}</p>`
  recent.appendChild(div)
})