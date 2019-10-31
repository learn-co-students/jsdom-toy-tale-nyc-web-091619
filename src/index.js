let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  });
  const toyContainer = document.querySelector('#toy-collection');

  const likeButtonHandler = e => {
    let likes = e.target.parentNode.querySelector('p').innerText;
    likesNum = parseInt(likes);
    likesNum++;

    let toyId = e.target.parentNode.dataset.id;

    likeToy(toyId, likesNum);
  };

  const appendToy = obj => {
    let newDiv = document.createElement('div');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let button = document.createElement('button');

    newDiv.className = 'card';
    newDiv.dataset.id = obj.id;
    button.className = 'like-btn';
    button.addEventListener('click', likeButtonHandler);
    img.src = obj.image;
    img.className = 'toy-avatar';
    h2.innerText = obj.name;
    p.innerText = `${obj.likes} likes`;

    newDiv.appendChild(h2);
    newDiv.appendChild(img);
    newDiv.appendChild(p);
    newDiv.appendChild(button);

    toyContainer.appendChild(newDiv);
  };

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => data.forEach(appendToy));

  const postToy = obj => {
    console.dir(obj);
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(resp => resp.json())
      .then(resp => appendToy(resp));
  };

  const likeToy = (id, newLike) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({
        likes: newLike
      })
    })
      .then(resp => resp.json())
      .then(data => {
        document.querySelector(
          `div[data-id="${data.id}"] p`
        ).innerText = `${data.likes} likes`;
      });
  };

  const toySubmission = document.querySelector('.add-toy-form');
  toySubmission.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target[0].value, event.target[1].value);
    let obj = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    };
    postToy(obj);
    toySubmission.reset();
  });
});
