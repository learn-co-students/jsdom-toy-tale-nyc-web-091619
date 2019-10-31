let addToy = true

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
    toyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let name = e.target[0].value
      let image = e.target[1].value
      console.log(name)
      
      let obj = {
        name: name,
        image: image
      }
      createToy(obj)
    });
    
  })

   let api = "http://localhost:3000/toys"

  let fetchToys = function() {
    fetch(api)
    .then(function (response){ return response.json()})
    .then(function (data){ data.forEach(createToyCard) })
    }
    
    fetchToys()
    
  
  const toyCollection = document.querySelector('#toy-collection')
  
  function createToyCard(toy) {
    let toyDiv = document.createElement('div');
    toyDiv.className = "card";
  
    let h2 = document.createElement('h2');
    h2.innerText = toy.name;
    toyDiv.appendChild(h2);
  
    let img = document.createElement('img');
    img.src = toy.image;
    img.className = "toy-avatar";
    toyDiv.appendChild(img);
  
    let p = document.createElement('p');
    p.innerText = `${toy.likes} likes`
    p.dataset.id = toy.id
    toyDiv.appendChild(p)
  
    let button = document.createElement('button');
    button.className = "like-btn";
    button.innerText = "like";
    button.dataset.id = toy.id
    button.dataset.likes = toy.likes
    toyDiv.appendChild(button);
  
    toyCollection.appendChild(toyDiv);
  };
  

  function createToy(obj){
    console.log(obj)
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(function (response){ return response.json()})
    .then(function (response){ createToyCard(response) })

  }

  function updateToy(id, likes){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ likes })
    })
    .then(function (response){ return response.json()})
    .then(function (toy){ 
      let toyDiv = document.querySelector(`div[data-id="${toy.name}"]`)
      toyDiv.querySelector("p").innerText = `${toy.likes} Likes`
      toyDiv.querySelector("button").dataset.likes = toy.likes
     })
  }
  toyCollection.addEventListener('click', (e) => {
    if (e.target.className === "like-btn") {
      let likes = parseInt(e.target.dataset.likes) + 1
      updateToy(e.target.dataset.id, likes)
    }
   
  })
   
  
});
