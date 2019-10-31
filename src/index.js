let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  let api = 'http://localhost:3000/toys'

  function fetchToys() {
    fetch(api)
    .then(function(response) {
      console.log(api)
      return response.json()
    })
    .then(function(data) {
      data.forEach(appendToys)
    })
  }

  fetchToys()

  
  function appendToys (element) {
    let allToysContainer = document.querySelector("#toy-collection")
    // console.log(element)
    let toyContainer = document.createElement("div")
    let toyName = document.createElement("h2")
    let toyImg = document.createElement("img")
    let toyLikes = document.createElement("p")
    let toyButton = document.createElement("button")
    toyButton.addEventListener("click", function(e) {
          e.target.parentNode.dataset.id
          console.log('clicking', toyLikes)
          toyLikes.innerText = `${parseInt(toyLikes.innerText) + 1} Likes`

          
          
          updateLikes(element.id, toyLikes.innerText)
        }
      )

    toyContainer.dataset.id = element.id
    toyName.innerText = element.name
    toyImg.src = element.image
    toyImg.className = "toy-avatar"
    toyLikes.textContent = `${element.likes}`
    toyButton.className = "like-btn"
    toyButton.innerText = "Like"
    toyContainer.className = "card"
    console.log(toyContainer.class)

    toyContainer.appendChild(toyName)
    toyContainer.appendChild(toyImg)
    toyContainer.appendChild(toyLikes)
    toyContainer.appendChild(toyButton)
    allToysContainer.appendChild(toyContainer)
  }

  function addToys(obj) {
    fetch(api, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        appendToys(response)
      })
  }
  

  let formContainer = document.querySelector(".add-toy-form")
  
  formContainer.addEventListener("submit", function(e) {
    e.preventDefault()
    let name = e.target[0].value
    let image = e.target[1].value
    let likes = 0

    let obj = {
      name: name,
      image: image,
      likes: likes
    }
    
    addToys(obj)
    formContainer.reset()
  })



  function updateLikes(id, newlikes) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify({
        likes: newlikes
      })
  
  })
  }
  






















































})
