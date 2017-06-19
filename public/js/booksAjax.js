$(document).ready(() => {




$('.deleteBooks').click((a) => {
  a.preventDefault();
  console.log($(this).attr('name'));
  $.ajax({
    url:'/delete/' + $(this).attr('name'),
    type: 'DELETE',
    success(result) {
      console.log("delete HTTP request sent");
      console.log(result);
    }
  })
});


});
