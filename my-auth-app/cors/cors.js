const corsConfig = {
    origin: 'http://localhost:8080',
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ]
};

module.exports = corsConfig;