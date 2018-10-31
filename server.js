const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
//express related: View engine
app.set('view engine', 'hbs');



// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + ': ' +req.method+  req.url;

  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) =>{
    if(err){
      console.log('Unable to append to the server.log');
    }
  });
  next();
});

//middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     pageTitle:'Maintenance Page'
//   });
// });

//use app.use() to register middleware
app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Jignesh',
  //   likes: ['Biking','Hiking']
  // });
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'welcome to the HBS page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to process the request'
  });
});

app.listen(3000, () => {
  console.log('Server is up and running using port 3000');
});
