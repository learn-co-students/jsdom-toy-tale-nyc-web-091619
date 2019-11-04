let addToy = false
let api = 'http://localhost:3000/toys'

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

  })//end addBtn listener
  


const fetchToys = function() {
  fetch(api)
    .then(function(res){
      return res.json()
    }).then(function(toys) {
      return iterateToys(toys)
    })
}// end fetch toys

fetchToys();

const iterateToys = function(toys){
  toys.forEach(function(toy){
    appendToy(toy)
  })
}// end iterateToys

let toyCollectionContainer = document.getElementById("toy-collection")

const appendToy = function(toy) {

  //like button
  let likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.innerText = "Like"
  likeButton.dataset.id = toy.id


  //p to display likes
  let p = document.createElement("p")
  p.dataset.likesCount = toy.likes
  p.innerText = `${p.dataset.likesCount} Likes`

  //image
  let image = document.createElement("img")
  image.src = toy.image
  image.className = "toy-avatar"

  //h2 for name
  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  //create card div
  let cardContainer = document.createElement("div")
  cardContainer.className = "card"

  //putting the card together
  cardContainer.appendChild(h2)
  cardContainer.appendChild(image)
  cardContainer.appendChild(p)
  cardContainer.appendChild(likeButton)

  //attaching the card to the toyCollectionContainer
  toyCollectionContainer.appendChild(cardContainer)

} //end appendToy


let form = document.querySelector(".add-toy-form")

form.addEventListener("submit", function(e){
  e.preventDefault();
  let name = e.target[0].value
  let image = e.target[1].value
  let likes = 0
  let newToy = {
    name: name,
    image: image,
    likes: likes
  }
  addNewToy(newToy)
  form.reset()
}) //end of form event listener


const addNewToy = function(newToy) {
  fetch(api,{
    method: 'POST',
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(function(res){
    return res.json()
  })
  .then(function(toy){
    appendToy(toy)
  })
} //end add New toy

const likeCounter = function(){
  document.addEventListener('click', function(e){
    if (e.target.localName === "button" && e.target.innerText === "Like") {
      //get id from the button dataset
      let toyId = e.target.dataset.id
      //p has the dataset of the likesCount
      let toyLikedCount = parseInt(e.target.previousSibling.dataset.likesCount)
      toyLikedCount++
      //update the values for p for the next iteration of likes
      let p = e.target.previousSibling
      p.innerText = `${toyLikedCount} Likes`
      p.dataset.likesCount = toyLikedCount

      //point update to the correct link using the id from the button
      postApi = api + '/' + toyId

      // Update toy with Patch
      fetch(postApi, {
        method: 'PATCH',
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify(
          {
          likes: toyLikedCount}
          )
      }) //end fetch patch

      

    } //end if
  }) //end of addEventListener
} //end funtion likeCounter
likeCounter()

})// end DOMContentLoaded