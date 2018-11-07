// click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.

// You can like a book by clicking on a button

document.addEventListener("DOMContentLoaded", function() {

//********************** Variables******************************

  let books = []
  let bookContainer = document.querySelector('#list')
  let showPanel = document.querySelector('#show-panel')
  // let readButton;

  fetch('http://localhost:3000/books')
    .then((response)=>{return response.json()})
    .then((json)=>{
      books = json
      books.forEach((book)=> {
        bookContainer.innerHTML += `
        <li id = ${book.id}>
        ${book.title}
        </li>
        `
      }) // end of the forEach
    }) // end of the fetch

//********************** Event Listeners **********************

  bookContainer.addEventListener('click', (event)=> {
    if (event.target.localName === 'li') {
      let id = event.target.id
      let book = books.find((book)=> {return book.id == id})
      let bookUsers = book.users.map((user)=> {return user.username})

      showPanel.innerHTML= `
        <h3 data-id = ${book.id} > ${book.title} </h3>
        <img src="${book.img_url}" alt="book image">
        <p> ${book.description} </p>
        <ul class='users'></ul>
        <button data-id = ${book.id} id="read-button" type="button">Read Me!</button>
      `
      let bookUsersContainer = showPanel.querySelector('.users')

      bookUsers.forEach((user)=> {
        return bookUsersContainer.innerHTML+= `
          <li>${user}</li>
        `
      }) // end of forEach
       // readButton = showPanel.querySelector('#read-button')
       showPanel.addEventListener('click', (event)=> {
         if (event.target.id==='read-button') {
           let id = event.target.dataset.id
           let findBook = books.find(book=> book.id == id)
           
         }
       })

    } // end of if to check that it's a li item
  }) // end of event listener










}) // end of DOMContentLoadeds
