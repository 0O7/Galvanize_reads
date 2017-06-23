$(document).ready(() => {

// adding a new book
  $('.addBook').click((a) => {
    a.preventDefault();
    let newBook = {
      "author_id": $('.browser-default option:selected').attr('id'),
      "title": $('#title').val(),
      "genre": $('#genre').val(),
      "url": $('#url').val(),
      "description": $('#description').val()
    }
    $.ajax({
      url: '/books/add',
      type: 'POST',
      data: newBook,
      success(result) {

        window.location.replace('/books');


      }
    })
  });


// Editing a book
$('.editBook').click((a)=>{
  a.preventDefault();
  let editedBook = {
    "title": $('#title').val(),
    "genre": $('#genre').val(),
    "url": $('#url').val(),
    "description": $('#description').val()
  }
  $.ajax({
    url: '/books/'+ $(a.target).attr('id'),
    type: 'PATCH',
    data: editedBook,
    success(result) {
      console.log("results");
      window.location.replace('/books');
      console.log('results edited!');
    }
  })
})


// deleting a book
  $('.deleteBooks').click((a) => {
    a.preventDefault();
    $.ajax({
      url: '/books/delete/' + $(a.target).attr('id'),
      type: 'DELETE',
      success() {
        window.location.replace('/books');
        console.log('Delete AJAX sent');
      }
    })
  });


});


//Toubleshooting
// first it was giving 404 not found but route was clicked
// Problem was the button was the thign being clicked and not the anchor tag
