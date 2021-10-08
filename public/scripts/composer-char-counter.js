$(document).ready(function() {
  
  $("#tweet-text").keyup(function() {
    const countdown = 140 - $(this).val().length;
    $(this).parent().find("output.counter").text(countdown);

    if (countdown < 0) {
      $(this).parent().find("output.counter").toggleClass("negativeCount", true);
    } else {
      $(this).parent().find("output.counter").toggleClass("negativeCount", false);
    }

    //For removing error message when within tweeting parameters
    if ($('#tweet-text').val().length > 0 && $('#tweet-text').val().length <= 140) {
      return $('.error-tweet').slideUp(100);
    }
  });

});