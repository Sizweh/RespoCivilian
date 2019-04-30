var express    = require('express');
var bodyParser = require('body-parser');
var jwt        = require('jsonwebtoken');
var app        = express();
var cors       = require('cors');


var ourUser = {
  cell_number : "sample",
  password : "jwtlogin"
}


var fakeData = [
    {text: "Ionic"},
    {text: "Is"},
    {text: "Pretty"},
    {text: "Cool"},
    {text: "To"},
    {text: "use"}
]


const secret = 'RandomLettersAndNumbers'

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const auth = express.Router();
const api = express.Router();



function handle_FakeData(req,res) {
    res.json(fakeData);
}




// GET
api.get('/getFakeData', function(req, resp){
   handle_FakeData(req,resp);
});

auth.post('/login', function(req, res){
  if (req.body) {
    var cell_number = req.body.cell_number.toLocaleLowerCase();
    var password = req.body.password;

    if (cell_number === ourUser.cell_number && password === ourUser.password) {
      const token = jwt.sign({iss: 'localhost:8100', role: 'user'}, secret);
      res.status(200).json({success: true, token: token, cell_number: cell_number});
    }else {
      res.status(400).json({success: false, message: "Incorrect cell_number/password"});
    }
  }else {
    res.status(400).json({success: false, message: "Missing data"})
  }
});

app.use('/api', api); //:1338/api/...
app.use('/auth', auth); //:1338/auth/...
app.listen(1338);