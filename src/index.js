let addToy = false

const site = "http://localhost:3000/toys"




document.addEventListener("DOMContentLoaded", ()=>{
  const cardsDiv = document.getElementById("toy-collection")
  const newToyForm = document.getElementsByClassName("add-toy-form")[0]

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
  fetchToys()
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      newToyForm.addEventListener("submit", function (e) {
        e.preventDefault()
        let name = e.target[0].value
        let image = e.target[1].value
    
        let obj = {
            name: name,
            image: image,
            likes: 0
        }
        actuallyAddToy(obj)
        newToyForm.reset()
    })
    } else {
      toyForm.style.display = 'none'
    }

  })

  cardsDiv.addEventListener("click", liked = e => {
    e.stopPropagation()

    if (e.target.dataset.id) {
      let numOfLikes = parseInt(e.target.parentNode.getElementsByTagName("p")[0].innerText.split(" ")[1]) + 1
      e.target.parentNode.getElementsByTagName("p")[0].innerText = `Likes: ${numOfLikes}`
      updateLikes(numOfLikes, e.target.dataset.id)
    }
  })

})

function fetchToys(){
  fetch(site)
  .then (resp => resp.json())
  .then (json => json.forEach(renderToys))
}

function renderToys(toy) {
  const toyCollection = document.getElementById("toy-collection")

  let card = document.createElement("div")
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")
  h2.innerText = `${toy.name}`
  img.src = `${toy.image}`
  img.className = "toy-avatar"
  p.innerText = `Likes: ${toy.likes}`
  button.className = "like-btn"
  button.dataset.id = `${toy.id}`
  button.innerText = "❤️"
  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)
  toyCollection.appendChild(card)
}

function actuallyAddToy(obj) {

  fetch(site, {
      method: "POST",
      headers: {
          "content-type": "application/json",
          accepts: "application/json"
      },
      body: JSON.stringify(obj)
  })
      .then(function (resp) { return resp.json() })
      .then(function (json) { renderToys(json) })
}

function updateLikes(like, id) {

  fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
          "content-type": "application/json",
          accepts: "application/json"
      },
      body: JSON.stringify({
        likes: like
      })
  })
}