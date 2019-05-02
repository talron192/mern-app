const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const Routes = express.Router();
const fs = require('fs');

var url = 'mongodb://127.0.0.1:27017/customers';

var port=process.env.PORT || PORT;

let Customer = require('./customer.model');

var pathToCustomerId;

const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//****Upload files*****/

//Storage a files

const Storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        let path = `${pathToCustomerId}`;
        if (fs.existsSync(path)) {
            console.log('path exist');
            cb(null, path);
        } else {
            console.log('path not exist');
            fs.mkdirSync(path);
            cb(null, path);
        }
    },
    filename: function (req, file, cb) {
        console.log('file', file);
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Init upload
const upload = multer({
    storage: Storage,
}).single('file');

Routes.route('/upload/').post(function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log('error in upload file', err);
        } else {
            res.send('!!המסמך הועלה בהצלחה');
        }
    });
});

//EJS
//app.set('view engine', 'ejs');

//public folder
//app.use(express.static('public'));

//app.get('/',(req,res)=>res.render('index'));

//****Upload files*****/

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDb connection succssesfully');
});

Routes.route('/get-id/').post(function (req, res) {
    let path = 'public/uploads/' + req.body.cid;
    pathToCustomerId = path;
    console.log('pathToCustomerId', pathToCustomerId);
});

Routes.route('/get').get(function (req, res) {
    Customer.find(function (err, customers) {
        if (err) {
            console.log(err);
        } else {
            res.json(customers);

        }
    });
});

Routes.route('/:id').get(function (req, res) {
    let id = req.params.id;

    Customer.findById(id, function (err, customer) {
        res.json(customer);
    });
});


Routes.route('/add').post(function (req, res) {
    console.log('route-add');
    let customer = new Customer(req.body);
    console.log('added', customer);
    fs.mkdirSync(`public/uploads/${customer.tz}`);
    customer.save()
        .then(customer => {
            res.status(200).json({ 'customer': 'customer added successfuly' });
        });
});

/*upload files */

app.use('/customers', Routes);

app.listen(port, function () {
    console.log("Server is listening to:" + port);
})