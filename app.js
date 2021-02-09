const express = require("express"),
    app = express(),
    axios = require('axios');

app.use(express.static("public"));
app.set("view engine", "ejs");

/*

FIRST ROUTE : "/" ROUTE.
It does following things:
-> Acts as first page.
-> Serves as search page for subreddits a.k.a communities on reddit
->It renders home.ejs which has a form which renders on "/results" route.
(Refer comments on home route for more info).

*/

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/results", (req, res) => {

    const pre = 'http://universities.hipolabs.com/search?country=';
    const country = req.query.sub;

    if(country==='')
        res.redirect("/error");

    else{
        axios.get(`${pre}${country}`)
        .then((response) =>{
                if (response.status == 200) {
                    if (response.data.length == 0) {
                        res.redirect("/error");
                    } else {
                        res.render("results.ejs", { child: response.data });
                    }
                }
        })
        .catch((error)=> {
                res.redirect("/error");
        });
    }
});

app.get("/error", (req, res) => {
    res.render("error");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server working");
});
