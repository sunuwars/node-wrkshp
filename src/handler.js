var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var posts = require('./posts.json');

var extensionType = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon',
  json: 'application/json'
}
function handler(request, response) {
  var endpoint = request.url;
  console.log(endpoint)
  if(request.method === 'POST' && endpoint === '/create/post') {
    // else if(endpoint === '/create-post'){
      var allData = '';
      request.on('data', function(chunk) {
        allData += chunk;
      });
      request.on('end', () => {
        console.log('ALLDATA', allData);
        var convertedData = querystring.parse(allData);
        console.log('CONVERTED DATA', convertedData);
        console.log("convertedData['blog-post']", convertedData['blog-post']);
          //console logs:
          // ALLDATA blog-title=one+two+three&post=hello+how+are+you
          // CONVERTED DATA { 'blog-title': 'one two three', post: 'hello how are you' }
        //redirected to '/node' redirecting to "Location": "/" got too many redirects error
        // var myTimeStamp = Date.now(); console.log('myTimeStamp', myTimeStamp);
        // posts[myTimeStamp] = convertedData['blog-post'];  OR
        posts[Date.now()] = convertedData['blog-post']; console.log('POSTS', posts);
        // response.writeHead(307, {'Content-type':'application/json','Location': '/posts'});
        response.writeHead(307, {'Location': '/'})
        // response.end(posts);
        response.end();
      })
  
    // }
  }
  if(endpoint === '/posts'){
    // console.log(request.method);
    console.log('POSTS MA=',posts)
   
    response.writeHead(200, 'Content-Type: application/json');
    response.end(JSON.stringify(posts));
  }

  if(endpoint === '/'){ 
    //  using this did not work for me it looked inside src
            //   { [Error: ENOENT: no such file or directory, open '/Users/ssun2/Documents/fac-wk4/revision/node-workshop/src/public/index.html']
            // errno: -2,
            // code: 'ENOENT',
            // syscall: 'open',
            // path:
            //  '
    // var filePath = __dirname + '/public/index.html';
    var filePath = path.join(__dirname,'..','/public/index.html');
    fs.readFile(filePath, (err, file) => {
      if(err){
        console.log(err);
        response.writeHead(500, 'Content-Type:text/html');
        response.end('<h2>internal server error</h2>');
      } else {
        response.writeHead(200, 'Content-Type: text/html');
        response.end(file);
      }
    })
  }  else if(endpoint === '/node'){
    var message="this is node girls";
    response.writeHead(200, 'Content-Type: text/html');
    response.write(message);
    response.end();
  }else {
    
    var ext = endpoint.split('.')[1];
    // var filePath = __dirname + '/public/index.html';
    var filePath = path.join(__dirname, '../public', endpoint);
    fs.readFile(filePath, (err, file) => {
      if(err) {
        response.writeHead(500, 'Content-Type: text/html');
        response.end('<h2>server error</h2>');
      } else {
        response.writeHead(200, `Content-Type: extensionType[ext]`);
        response.end(file);
      }
    })
  }

 
}

module.exports = handler;