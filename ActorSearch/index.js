module.exports = function (context, req) {
    var fs = require('fs');

    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.q || (req.body && req.body.q)) {

        var filepath = './ActorSearch/empty-data.json';
        var queryString = (req.query.q) ? req.query.q : req.body.q;

        switch (queryString) {
            case 'empty':
                filepath = './ActorSearch/empty-data.json'
                break;
            case 'small':
                filepath = './ActorSearch/small-data.json'
                break;
            case 'max':
                filepath = './ActorSearch/max-data.json'
                break;
        }

        var data = fs.readFileSync(filepath, 'utf-8');

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: data
        };
    }
    else {
        var error = fs.readFileSync('error.json', 'utf-8');

        context.res = {
            status: 400,
            // body: "Please pass a name on the query string or in the request body"
            body: error
        };
    }
    context.done();
};