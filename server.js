//importing 
const express = require('express');
const path = require("path")
const port = process.env.PORT || 3001;
const cors = require('cors');
const hbs = require('hbs')
// import Schema
const Data = require("./src/mongo/module/mongoschema");
const { EROFS } = require('constants');

//mongodb connection
require("./src/mongo/connection/connect");
const app = express();

// setting the path
const staticpath = path.join(__dirname, "../backend/public")
const templatepath = path.join(__dirname, "../backend/templates/views")
console.log(templatepath)
const partialpath = path.join(__dirname, "../backend/templates/partials")


//middleware
app.use('/css', express.static(path.join(__dirname, "../backend/node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../backend/node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../backend/node_modules/jquery/dist")));
// app.use(express.json())//show data in json formate
app.use(express.urlencoded({ extended: false }));// its froced to not showing empty data
// app.use(cors())

//import static file
app.use(express.static(staticpath));


app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);
//routing
app.get('/', (req, res) => {
    res.status(200).render("index")
})



app.post("/contact", async (req, res) => {
    const dbCard = JSON.parse(JSON.stringify(req.body));
    console.log(dbCard)
    try {
        await Data.create(dbCard, (err, data) => {

            if (err) {
                res.status(500).send(err)
            } else {
                // res.status(201).send(data)
                res.redirect("/")
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get("/contacts", async (req, res) => {
    try {
        await Data.find((err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                // res.status(201).send(data)
                res.render("contacts")
            }
        })
    } catch (error) {
        console.log(error.message);
    }
})

// app.get("/edit/:id", async (req, res) => {
//     const dbCard = req.params.id;
//     console.log(dbCard)
//     try {
//         await Data.findById(dbCard, (err, data) => {
//             if (err) {
//                 res.status(500).send(err)
//             } else {
//                 res.status(201).send(data)
//             }
//         })
//     } catch (error) {

//     }

// })


// app.put("/update/:id", async (req, res) => {
//     const dbCard = req.params.id;
//     console.log(dbCard)
//     try {
//         await Data.findOneAndUpdate(dbCard, { $set: req.body }, (err, data) => {
//             if (err) {
//                 res.status(500).send(err)
//             } else {
//                 res.status(201).send(data)
//             }
//         })
//     } catch (error) {

//     }

// })
// app.delete("/:id", async (req, res) => {
//     const dbCard = req.params.id;
//     console.log(dbCard)
//     try {
//         await Data.findByIdAndRemove(dbCard, { $set: req.body }, (err, data) => {
//             if (err) {
//                 res.status(500).send(err)
//             } else {
//                 res.status(201).send(data)
//             }
//         })
//     } catch (error) {

//     }

// })
//listning
app.listen(port, () => {
    console.log(`listning port on ${port}`);
})