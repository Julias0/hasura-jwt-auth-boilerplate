const Express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');

const app = Express();
app.use(cors());

app.use(bodyParser.json())

app.use('/auth', require('./routes/auth'));

app.post('/graphql',(req, res) => {
    res.redirect(process.env.HASURA_GQL_ENDPOINT);
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Express app is listening on port '+ process.env.PORT || 3000);
	console.log('YOLO');
});
