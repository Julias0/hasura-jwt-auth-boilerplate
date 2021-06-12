const Express = require('express');
var bodyParser = require('body-parser')

const app = Express();

app.use(bodyParser.json())

app.use('/auth', require('./routes/auth'));

app.use('/graphql',(res, res) => {
    res.redirect(process.env.HASURA_GQL_ENDPOINT);
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Express app is listening on port '+ process.env.PORT || 3000);
});
