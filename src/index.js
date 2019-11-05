let addToy = false



// Create addEventListener, attach to the document for "DOMContentLoaded"
// it waits for the page to load, without waiting for css stylesheets,
// images or subframes.  
// (ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
// Then we create a callback function, which is anonymous using arrow notation.

document.addEventListener("DOMContentLoaded", ()=>{

  // instantiate constant variables to hold the elements of our page.  The first
  // newToyForm uses getElementsByClassName which returns HTML collection.  Even
  // the collection only contains 1 element, we need to use the array index
  // bracket notation to point to the 1st element of the HTML collection.
  // The "addBtn" constant variable is initilized and is set to the return of a 
  // document.querySelector which returns first Element matching the specified
  // selector.  The "toyForm" constant variable is created set to find the <div>
  // class which is labeled with the "container" id.  Our form to add new
  // toys, toyForm
  const newToyForm = document.getElementsByClassName("add-toy-form")[0]
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  
  fetchToys();
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'   // show the form block
      newToyForm.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent standard submit action to launch
        if (!e.target[0].value || !e.target[1].value) { // check we have input
          return;  // or else exit and return to form
        }
        else {
          let name = e.target[0].value  // set name to input 1's value 
          let image = e.target[1].value // set image URL to input 2's value
      
          // create an object to store our attributes
          let obj = {
              name: name,
              image: image,
              likes: 0
          }
          // send the toy object 'obj' to the fetch POST function
          addToyToDatabase(obj)
          // hide the add new toy form
          toyForm.style.display = 'none'
          // reset the form, so the fields are blank
          newToyForm.reset()
        }
    })
    } 
    else {
      // if button is clicked and no input close form
      toyForm.style.display = 'none'
    }
  })
})



function renderToys(toy) {
  const toyCollection = document.getElementById("toy-collection");

  let card = document.createElement("div");
  let h2 = document.createElement("h2");
  let img = document.createElement("img");
  let p = document.createElement("p");
  let button = document.createElement("button");

  h2.innerText = `${toy.name}`;
  img.src = `${toy.image}`;
  img.className = "toy-avatar"
  p.innerText = `Likes: ${toy.likes}`;
  button.className = "like-btn";
  button.dataset.id = `${toy.id}`
  button.innerText = "❤️";

  button.addEventListener("click", liked => {
    let numOfLikes = parseInt(p.innerText.split(" ")[1]) + 1
    p.innerText = `Likes: ${numOfLikes}`
    updateLikes(numOfLikes, toy.id)
  })

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);
  toyCollection.appendChild(card);
}

/******************************************************************************
 *  Fetch() calls below
 ******************************************************************************/

 // Instantiate const variable "site", assign to API URL
const SITE = "http://localhost:3000/toys";

// define the headers for use with PATCH and POST requests to reduce retyping
const HEADERS = {
  "content-type": "application/json",
  "accept"      : "application/json"
}

// fetch toys from database as JSON and use forEach to send each entry to 
// the renderToys()
function fetchToys(){
  fetch(SITE)
  .then (resp => resp.json())  // doesn't work here - need json()
  .then (json => json.forEach(renderToys))
}

// fetch request with a post to add toys to the database, after sending
// the newly created toy "obj", we send the return value ()
function addToyToDatabase(obj) {
  fetch(SITE, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(obj)  // make sure obj is JSON format
  })
  // .then(resp => resp.json())  // checking if we get json back √
  .then(json => renderToys(json))
}


function updateLikes(like, id) {
  fetch(`${SITE}/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        likes: like
      })
  })
}

