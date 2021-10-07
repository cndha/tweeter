/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('form').on("submit", function(event) {
    event.preventDefault();

    if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      alert('Text area cannot be empty');
      return;
    }

    if ($('#tweet-text').val().length > 140) {
      alert('Too many characters! Try again.')
      return;
    }
    

    $.post('/tweets', $(this).serialize())
      .done((response) => {
      loadTweets();
      })
      .fail((error) => {
        console.log('failed')
      })
      .always(() => {
        console.log('finished post method tweets')
      })
  })

  const loadTweets = function() {
    $.get('/tweets')
    .done((response) => {
      renderTweets(response)
    })
    .fail((error) => {
      console.log(error)
    })
    .always(() => {
      console.log("finished get request tweets")
    })
  };

  loadTweets();
  
});


const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $('.tweets-container').prepend(element);
  }
};


const createTweetElement = function (data) { 
  const ago = timeago.format(data.created_at);

  const tweet = (`        
    <article class="tweet">
      <header class="tweet-header">
        <img src="${data.user.avatars}"> 
        <span> ${data.user.name} </span>
        <span> ${data.user.handle} </span>
      </header>
      <body class="tweet-body">
      ${data.content.text}
      </body>
      <hr></hr>
      <footer class="tweet-footer">
        <span> ${ago} </span>
        <span> 
          <i class="fas fa-flag"></i> 
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
    `)

  return tweet;
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const safeHTML = `<p>${escape(textFromUser)}</p>`;
