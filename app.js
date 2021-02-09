//Basic dependencies of our project. These are :
// Express-->For routing
// Axios --> For API handling

const express = require("express"),
    app = express(),
    axios = require('axios');

//Commands for directory usage
app.use(express.static("public"));
app.set("view engine", "ejs");

/*

FIRST ROUTE : "/" ROUTE.
It does following things:
-> Acts as first page.
-> Serves as search page for universities of the searched country 
->It renders home.ejs which has a form which renders on "/results" route.
(Refer comments on home route for more info).

*/

app.get("/", (req, res) => {
    res.render("home");
});

/*
SECOND ROUTE : "/results" ROUTE.
In this route we used the API to return all the universities of the searched country.
We used GET request to search for the country in the API.
*/

app.get("/results", (req, res) => {

    const pre = 'http://universities.hipolabs.com/search?country=';
    const country = req.query.sub;

    //If no country is selected, we redirect the user to error page. 
    if(country==='')
        res.redirect("/error");

    else{
        //Here we use Axios to get a promise and if no error is there, we get the result.
        axios.get(`${pre}${country}`)
        .then((response) =>{
                if (response.status == 200) {
                    //If a invalid country is searched, we redirect back to error page.
                    if (response.data.length == 0) {
                        res.redirect("/error");
                    } else {
                        //We send our recieved data as a variable called child.
                        res.render("results.ejs", { child: response.data });
                    }
                }
        })
        .catch((error)=> {
                //Upon an error, we redirect back to error page
                res.redirect("/error");
        });
    }
});
/*
THIRD ROUTE - Error Route
This route renders the error page
*/
app.get("/error", (req, res) => {
    res.render("error");
});

//Server route
app.listen(process.env.PORT || 8400, () => {
    console.log("Server working");
});
