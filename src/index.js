/**
 * API communicator
 * @param {String} endpoint 
 */
const getApiData = function(endpoint) {
  const baseUrl = "https://dog.ceo/api"
  return fetch(`${baseUrl}/${endpoint}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(json => {
      return json
    })
}

/**
 * A cool function that creates an image tag and appends it to a target element
 * @param {String} imgSrc 
 * @param {HTMLElement} targetElem 
 */
const addImageToDiv = function(imgSrc, targetElem) {
  const img = document.createElement('img')
  img.src = imgSrc
  targetElem.appendChild(img)
}

/**
 * DOM Loaded Event Handler
 * @param {Event} e 
 */
const ready = function(e) {
  // challenge 1
  const fourRandomGoodBoysEndpoint = "breeds/image/random/4"
  const dogImageContainer = document.getElementById('dog-image-container')
  getApiData(fourRandomGoodBoysEndpoint)
    .then((json) => {
      json.message.forEach(imgSrc => {
        addImageToDiv(imgSrc, dogImageContainer)
      })
    })
    .catch((response) => console.log(response))

  // challenge 2
  const allTheBreedsEndpoint = "breeds/list/all"
  const dogBreedsUl = document.getElementById('dog-breeds')
  getApiData(allTheBreedsEndpoint)
    .then((json) => {
      for (const breed in json.message) {
        dogBreedsUl.innerHTML += `<li>${breed}</li>`
      }
    })
    .catch((response) => console.log(response))
  
  // challenge 3
  dogBreedsUl.addEventListener('click', event => {
    event.target.style.color = 'red'
    event.stopPropagation()
  })

  // challenge 4
  const breedDropdown = document.getElementById('breed-dropdown')
  breedDropdown.addEventListener('change', event => {
    const selection = event.target.value
    const liList = dogBreedsUl.querySelectorAll('li')
    liList.forEach(li => {
      li.style.display = (li.innerText[0] !== selection) ? 'none' : null
    })
  })
}

// ready event
document.addEventListener('DOMContentLoaded', ready)