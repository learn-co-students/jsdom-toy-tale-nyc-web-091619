let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  let toyContainer = document.getElementById("toy-collection")
  let id // everyone has access
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  let toys = "http://localhost:3000/toys"
  
  let fetchCall = function (){
    fetch(toys)
    .then(function(resp){return resp.json()})
    .then(function(data){data.forEach(appendToy)})
    
  }
  
  fetchCall()
  
  function appendToy(obj){
    let h2 = document.createElement("h2")
    let image = document.createElement("img")
    let likes = document.createElement("p")
    let button = document.createElement("button")
    let div = document.createElement("div")
    h2.innerText = obj.name
    image.src = obj.image
    likes.innerText = `${obj.likes} Likes`
    button.innerText ="Like ❤️"
    button.className = "like-btn"
    div.className = "card"
    image.className = "toy-avatar"
    div.dataset.id = obj.id
    div.dataset.likes = obj.likes



    div.appendChild(h2)
    div.appendChild(image)
    div.appendChild(likes)
    div.appendChild(button)

    toyContainer.appendChild(div)



  }


  function addNewToy(obj){
    fetch(toys, {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(obj)
      
    })
      .then(function(resp){return resp.json()})
      .then(function(resp){ appendToy(resp)})
  }

  toyForm.addEventListener('submit', function(event){
    event.preventDefault();
    let name = event.target[0].value
    let imgsrc = event.target[1].value

    let obj = {
      name: name,
      image: imgsrc,
      likes: 0
    }
   addNewToy(obj)

  })

  function updateLikes(obj){
    let newLikes = obj.likes
    let id = obj.id
    let div = document.querySelector(`[data-id="${id}"]`)
    div.dataset.likes = newLikes
    let p = div.getElementsByTagName("p")[0]
    p.innerText = `${newLikes} Likes`
  }


  function addLikes(obj){
    console.log("about to fetch")
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(obj)
      
    })
    .then(function(resp){return resp.json()})
    .then(function(resp){ updateLikes(resp)})
  }
  
  
  
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  
  
  toyContainer.addEventListener("click", function(e){
    if (e.target.className === "like-btn"){
      let div = e.target.parentNode
      id = div.dataset.id
      let currentLikes = parseInt(div.dataset.likes) + 1
        addLikes({
          likes: currentLikes
  
        })

    }
    
  })



})