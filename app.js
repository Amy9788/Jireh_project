const port = 3000;
const path = require('path');
const fs = require('fs'); // fs module - load the JSON file and pass the data to EJS templates

const express = require('express'); 
const app = express(); 
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Set EJS as templating engine 
app.set('view engine', 'ejs');
// app.use(cookieParser());
app.use(express.static('public'));

// Middleware
app.use((req, res, next) => {
  // Keep track of current language
  const curr_lang = req.query.lang ||  req.cookies.lang || 'en'; // default language
  // Acess the "languages.json" file
  const languages = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales', 'languages.json')));

  // Update the 'lang' cookie to reflect the current language
  res.cookie('lang', curr_lang, { maxAge: 900000, httpOnly: true });
  // Acess the current language file
  const curr_lang_file = JSON.parse(fs.readFileSync(path.join(__dirname, 'locales',`${curr_lang}.json`)));
  // Pass the data to view
  res.locals.languages = languages;
  res.locals.curr_lang = curr_lang;
  res.locals.curr_lang_file = curr_lang_file;

  next(); // Proceed to the next middleware or route handler
});
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/products', (req, res) => {
  res.render('products');
});

app.get('/products/pvc-roll', (req, res) => {
  res.render('products/pvc-roll');
});
app.get('/products/ldpe-film', (req, res) => {
  res.render('products/ldpe-film');
});
app.get('/products/ps-lump', (req, res) => {
  res.render('products/ps-lump');
});
app.get('/products/pet-sheet', (req, res) => {
  res.render('products/pet-sheet');
});
app.get('/products/pet-bottle', (req, res) => {
  res.render('products/pet-bottle');
});
app.get('/products/pvc-regrind', (req, res) => {
  res.render('products/pvc-regrind');
});
app.get('/products/hdpe-regrind', (req, res) => {
  res.render('products/hdpe-regrind');
});
app.get('/products/opp-film', (req, res) => {
  res.render('products/opp-film');
});
// Server setup 
app.listen(port, function (req, res) { 
	console.log(`Server running at on port ${port}`);
});

