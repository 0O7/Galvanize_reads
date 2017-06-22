$(document).ready(() => {

// adding a new book
$('.addAuthor').click((a) => {
  console.log('clicked');
  a.preventDefault();
  let newAuthor = {
    "name": $('#name').val(),
    "biography": $('#biography').val(),
    "url": $('#url').val(),
    "description": $('#description').val()
  }
  $.ajax({
    url: '/authors',
    type: 'POST',
    data: newAuthor,
    success(result) {

      window.location.replace('/authors');

      console.log(result + ' posted');
    }
  })
});



// Editing a book
$('.editAuthor').click((a)=>{
  a.preventDefault();
  let editedAuthors = {
    "name": $('#name').val(),
    "url": $('#url').val(),
    "biography": $('#biography').val()
  }
  $.ajax({
    url: '/authors/'+ $(a.target).attr('id'),
    type: 'PATCH',
    data: editedAuthors,
    success(result) {
      console.log('results edited!');
      window.location.replace('/authors');
    }
  })
})


// deleting an author
  $('.authorDelete').click((a) => {
    a.preventDefault();
    console.log('hello');
    $.ajax({
      url: '/authors/delete/' + $(a.target).attr('id'),
      type: 'DELETE',
      success() {
        console.log('Delete AJAX sent');
        window.location.replace('/authors');
      }
    })
  });



});
