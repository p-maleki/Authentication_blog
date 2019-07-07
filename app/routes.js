// app/routes.js

const Article= require('./models/article');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists  // loginMessage in req.flash
        //req.flash: This is the connect-flash way of getting flashdata in the session 
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        //successRedirect : '/profile',  // redirect to the secure profile or dashbord section
        successRedirect : '/article',   //redirect to the secure profile or dashbord section
        failureRedirect : '/login',    // redirect back to the signup page if there is an error
        failureFlash : true           // allow flash messages
    }));
     
   



   // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    // process the signup form
       app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  

    // =====================================
    // PROFILE SECTION  & ARTICLE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)     //دسترسی به روت را دارد
  
    
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
////////////////////////////////////Add Article//////////////////////////////////////////////////////////////
/////////////////////////////open form add aaaaarticle////////////////////////////
let contents=[];


app.get('/addarticle',isLoggedIn, function(req, res) {
        res.render('add-article.ejs', {
           
        });
    });

   


    app.get('/add-articleform',isLoggedIn, function(req, res) {
        res.render('add-article.ejs', {
           
        });
    });
    //send data from addarticle form

    app.post('/add-articleform',function(req,res){
        console.log(req)
        let article = new Article({
             title:req.body.title,
             description:req.body.description,
             text:req.body.text,
             createDate:new Date(),
             author:req.body.Author, 
              Link:new Date().getTime(),
              file:req.file

        })
        article.save(function(err, contents){
            if(err)
            return console.log(err)
        //   console.log("*******************************Article******************************")
        //  res.json(data);
        res.redirect("/article");
        })
    });

    app.get('/article', isLoggedIn, function(req, res)
     {
        Article.find({},function(err,data){
            if(err)
                res.send(err)
        res.render('article.ejs', {
            // contents,
            contents:data,

            //  author: author,
            // image:req.user.image,
            
           

          });
    });

 
    app.get('/readmore',isLoggedIn, function(req, res) {
        res.render('readmore.ejs.ejs', {
           
        });
    });
    
    app.get('/readmor/:cont', function (req, res) {
        console.log("readmore: "+req.params.cont)
        Article.findOne({Link:req.params.cont},function(err,readMore){
            console.log("readmore")
            if(err)
                console.log(err)
    
            res.render('readmor.ejs', {
               article:readMore,
                // title: readMore.title,
                // text: readMore.Text,
                // createDate: readMore.Date,
                // description: readMore.description,
                // author: readMore.author
                
            })        
        })     
    })

})


// LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}





