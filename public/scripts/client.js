
$(document).ready(function() {

  $('form').on("submit", function(event) {
    event.preventDefault();

    // Validations for improper tweets
    if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      return $('.error-tweet').slideDown(300);
    }

    if ($('#tweet-text').val().length > 140) {
      return $('.error-tweet').slideDown(300);
    }
    
    //Ajax POST
    $.post('/tweets', $(this).serialize())
      .done((response) => {
        loadTweets();
        $('#tweet-text').val("");
        $('output.counter').text(140);
      })
      .fail((error) => {
        console.log('failed');
      })
      .always(() => {
        console.log('finished post method tweets');
      });
  });

  //Ajax GET
  const loadTweets = function() {
    $.get('/tweets')
      .done((response) => {
        renderTweets(response);
      })
      .fail((error) => {
        console.log(error);
      })
      .always(() => {
        console.log("finished get request tweets");
      });
  };

  loadTweets();
  
});


const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $('.tweets-container').prepend(element);
  }
};

//Single tweet box
const createTweetElement = function (data) {
  const ago = timeago.format(data.created_at);

  const tweet = (`        
    <article class="tweet">
      <header class="tweet-header">
      <table>
        <tr>
          <td><img src="${data.user.avatars}"></td>
          <td>${data.user.name}</td>
        </tr>
      </table>
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
    `);

  return tweet;
};


const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const safeHTML = `<p>${escape(textFromUser)}</p>`;
