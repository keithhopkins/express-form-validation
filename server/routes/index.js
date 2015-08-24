var express = require('express');
var router = express.Router();

var people = [];
var puppies = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Puppy' });
});

// router.post('/newpuppy', function(req, res, next){
//   res.redirect('/puppy/new');
// });
//
// router.post('/newperson', function(req, res, next){
//   res.redirect('/person/new');
// });

router.get('/puppy/new', function(req, res, next){
  res.render('newpuppy');
});

router.post('/puppy/new', function(req, res, next){
  var puppy = req.body;
  var errors = puppyValidationCheck(puppy.name, puppy.id);
  if(errors.length > 0){
    res.render('newpuppy', {errors:errors});
  } else {
    puppies.push(puppy);
    res.redirect('/puppies');
  }
});

router.get('/puppies', function(req, res, next){
  res.render('puppies', {puppies:puppies, success:"Puppy was added successfully"});
});

router.get('/person/new', function(req, res, next){
  res.render('newperson');
});

router.post('/person/new', function(req, res, next){
  var person = req.body;
  var errors = peopleValidation(person.name, person.hobby);
  if(errors.length > 0){
    res.render('newperson', {errors:errors});
  } else{
    people.push(person);
    res.redirect('/people');
  }
});

router.get('/people', function(req, res, next){
  res.render('people', {people:people, success:"Person was added successfully"});
});

function puppyValidationCheck(puppyName, puppyTag) {

  var errorArray = [];
  var puppyNameTrimmed = puppyName.trim();
  var puppyTagTrimmed = puppyTag.trim();

  if(puppyNameTrimmed == '') {
    errorArray.push("Name cannot be blank.");
  }

  if(puppyTagTrimmed == '') {
    errorArray.push('Tag cannot be blank.');
  } else if (puppyTagTrimmed.length < 3) {
    errorArray.push('A Tag must be at least 3 characters long.');
  }
  return errorArray;
}

function peopleValidation(name, hobby){
  var errorArray = [];
  name = name.trim();
  hobby = hobby.trim();

  if(name===''){
    errorArray.push('Name cannot be blank.');
  }
  if(hobby===''){
    errorArray.push('Hobby cannot be blank.');
  }
  return errorArray;
}

module.exports = router;
