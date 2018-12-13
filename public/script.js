document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if (xhr.status === 200){
          // console.log('SCRIPT MA xhr=', xhr);
          var data = JSON.parse(xhr.responseText);
          // console.log('DATA=',data);
          //it's gettings values of each keys...
          //{ '1456059074613': 'This is your first blog post',
          // '1542452001481': 'hi again' }
          for (var blogPost in data) {
            var postDiv         = document.createElement('div');
            var postText        = document.createElement('p');
            var thumbnail       = document.createElement('img');
            var postContainer   = document.getElementsByClassName('post-container')[0];

            thumbnail.src = "./img/logo2.png";
            thumbnail.className = "thumbnail";
            postText.innerHTML = data[blogPost];
            postDiv.className = "post";

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
          }
        }
        else {
          console.error(xhr.responseText);
        }
      }
    }
    xhr.open('GET', '/posts', true);
    xhr.send();
  }
}
