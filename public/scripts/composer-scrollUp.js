$(document).ready(function() {
  
  scrollButton = document.getElementById('scrollUp-btn');

  window.onscroll = () => {
    scrollFunction()
  };

  const scrollFunction = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      scrollButton.style.display = "block"
    } else {
      scrollButton.style.display = "none"
    }
  };

  $("#scrollUp-btn").click(function() {
    document.documentElement.scrollTop = 0;
  });

});

