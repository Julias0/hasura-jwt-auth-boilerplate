const router = require('express').Router();
const gql = require('../services/gql');
const v4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

router.post('/sign_up', async (req, res) => {
    const {email, password, name} = req.body;

    if (email && password && name) {
        const gqlres = await gql.query(`
            query getUserByEmail($email: String!) {
              owners(where: {email: {_eq: $email}}) {
                id
              }
            }
        `, {
            email
        });

        const user = gqlres.data.owners[0];

        if (user) {
            res.send('user exists').status(400);
        } else {
            const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(2));

            const resql = await gql.query(`
                    mutation addOwner($id: uuid!, $email: String!, $name: String!, $password: String!) {
                      insert_owners(objects: {email: $email, password: $password, id: $id, name: $name}) {
                        affected_rows
                      }
                    }
                `, {
                id: v4(),
                email,
                password: encryptedPassword,
                name
            });

            res.json(resql);
        }
    } else {
        res.send('email / password/ name missing').status(400);
    }
});

router.post('/sign_in', async (req, res) => {
    const {email, password} = req.body;
    if (email && password) {
        const gqlres = await gql.query(`
            query getUserByEmail($email: String!) {
              owners(where: {email: {_eq: $email}}) {
                id
                password
                email
                name
              }
            }
        `, {
            email
        });

        const user = gqlres.data.owners[0];

        if (user) {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (isPasswordCorrect) {
                delete user.password;
                const token = jsonwebtoken.sign({
                        user,
                        'https://hasura.io/jwt/claims': {
                            'x-hasura-allowed-roles': [
                                'owner'
                            ],
                            'x-hasura-default-role': 'owner',
                            'x-hasura-user-id': user.id
                        }
                    }, process.env.JWT_SECRET_KEY
                    , {
                        expiresIn: '7d'
                    });

                res.json({
                    token
                });

            } else {
                res.send('wrong password').status(400);
            }
        } else {
            res.send('no email exists').status(400);
        }
    } else {
        res.send('email / password missing').status(400);
    }
});

module.exports = router;
