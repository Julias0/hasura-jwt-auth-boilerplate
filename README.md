# How to get started?

first npm install

I am assuming you have already setup a hasura server with jwt key and admin key

Create a file called setup.sh with environment variables for 
export JWT_SECRET_KEY=
export HASURA_ADMIN_KEY=
export PORT=3000
export HASURA_GQL_ENDPOINT=

then `source setup.sh`
followed by `node index.js`
