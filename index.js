// *************************** Variables *******************************
let books = []
let list;
let showPanel;
let usersDiv;

// *************************** Event Listeners **************************
document.addEventListener("DOMContentLoaded", function() {
  list = document.querySelector('#list')
  showPanel = document.querySelector('#show-panel')

  renderAllBooks()

  list.addEventListener('click', function(event){
    bookThumbnail(event)
  })

  showPanel.addEventListener('click', function(event){
    if (event.target.name ==="button") {
      readBookEventHandler(event)
    }
  })

});

// *************************** Helper Functions **************************
function renderAllBooks(){
  fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then((json)=> {
    books = json
    AddBooksToDom(books)
  })
}

function AddBooksToDom(books){
  books.forEach((book)=>{
    AddSingleBookToDom(book)
  })
}

function AddSingleBookToDom(book){
  list.innerHTML += `<li data-id=${book.id}>${book.title}</li>`
}

function bookThumbnail(event){
  let id = event.target.dataset.id
  let findBookToShow = books.find((book)=>{
    return book.id == id
  })
  addThumbnailToDom(findBookToShow)
}

function addThumbnailToDom(findBookToShow){
  showPanel.innerHTML=`
  <h3>${findBookToShow.title}</h3>
  <img src="${findBookToShow.img_url}" alt="book image">
  <p>${findBookToShow.description}</p>
  <button data-id=${findBookToShow.id} type="button" name="button">Read Book</button>
  <ul id='users'> <ul>
  `
   usersList = showPanel.querySelector("#users")

  addUsersToDom(findBookToShow)
}

function addUsersToDom(findBookToShow){
  let users = findBookToShow.users.map((user)=>{return user.username})
  users.forEach((user)=>{
    addSingleUserToDom(user)
  })
}

function addSingleUserToDom(user){
  usersList.innerHTML+=`<li>${user}</li>`
}

function readBookEventHandler(event){
  let id = event.target.dataset.id

  let findBookToRead = books.find((book)=>{
    return book.id == id
  })
  let newUsers = findBookToRead.users.concat({"id":1, "username":"pouros"})

  let users = findBookToRead.users.map((user)=>{return user.username})

  if (users.includes('pouros')) {
    alert("Yo! You already liked this.")
  } else {
    fetch(`http://localhost:3000/books/${id}`,{
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        users: newUsers
      })
    }).then((response)=>{
      if (response.ok) {
        return response.json()
      }
    }).then((json)=>{
      findBookToRead.users = newUsers
      usersList.innerHTML+=`<li>pouros</li>`
    })
  }
}
