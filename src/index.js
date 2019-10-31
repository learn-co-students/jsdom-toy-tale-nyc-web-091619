let addToy = false
let fetchURL = "http://localhost:3000/toys"
// let addButton = document.getElementById("new-toy-btn")
// let addForm = document.getElementById("add-toy-form")
// debugger

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      const inputForm = document.getElementsByTagName('form')[0]
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", function(event){
        event.preventDefault()
        let name = event.target[0].value
        let image = event.target[1].value
        let obj = {
          name: name,
          image: image,
          likes: 0
        }
      addToys(obj)
      })
      // inputForm.reset()
    } else {
      toyForm.style.display = 'none'
    }
  })
})

// let toyC = document.getElementById("toy-collection")

function addToys(element){
  fetch(fetchURL, {method: "POST", 
                   headers: {
                     "content-type": "application/json",
                     accepts: "application/json"},
                   body: JSON.stringify(element)
                    })
  .then(function(resp){
    return resp.json()
  })
  .then(function(data){
    // console.log(data)
    appendToys(data)
  })
}

function appendToys(element){
// div card
  let divCard = document.createElement("div")
  divCard.class = "card"

// h2 tag with the toy's name
  let h2 = document.createElement("h2")
  h2.innerText = `${element.name}`

// img tag with the src of the toy's image attribute and the class name "toy-avatar"
  let img = document.createElement("img")
  img.src = `${element.image}`
  img.class = "toy-avatar"

// p tag with how many likes that toy has
  let p = document.createElement("p")
  p.innerText = `${element.likes} Likes`

// button tag with a class "like-btn"
  let likeButton = document.createElement("button")
  likeButton.class = "like-btn"
  likeButton.innerText = "Like 😍😍💕"

// append some stuff
  divCard.appendChild(h2)
  divCard.appendChild(img)
  divCard.appendChild(p)
  divCard.appendChild(likeButton)
  document.getElementById("toy-collection").appendChild(divCard)
}

function fetchCall(){
  fetch(fetchURL)
  .then(function(resp){return resp.json()})
  .then(function(data){
    data.forEach(appendToys)
  })
}

fetchCall()