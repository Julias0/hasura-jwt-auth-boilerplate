const fetch = require('node-fetch');

module.exports = {
    query: (queryString, variables) => {
        return fetch(process.env.HASURA_GQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_KEY
            },
            body: JSON.stringify({ query: queryString, variables })
        }).then(r => r.json());
    }
}
