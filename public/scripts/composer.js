$(document).ready(function() {
  
  //Scroll to top button & functions
  scrollButton = document.getElementById('scrollUp-btn');
  window.onscroll = () => {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  };

  $("#scrollUp-btn").click(function() {
    document.documentElement.scrollTop = 0;
  });


  //Autofocus into textarea
  $('#compose-btn').click(function() {
    $('#tweet-text').focus();
  });

});

