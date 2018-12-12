module.exports = async function (context, req) {
    /**
     * ProviderScorecardSearch
     * Required input parameters:
     * pid - personId
     * oid - officeId
     * fi - index of first search result item to be returned
     */
    context.log('ProviderSearch HTTP trigger function processed a request.');
    var fs = require('fs');

    if ((req.query.pid || (req.body && req.body.pid)) &&
        (req.query.oid || (req.body && req.body.oid)) &&
        (req.query.fi || (req.body && req.body.fi))
    ) {
        // page size - maximum number of items to return in one response
        const pageSize = 10;

        var filepath = './ProviderSearch/test-data.json';
        var data = fs.readFileSync(filepath, 'utf-8');

        var pid = (req.query.pid) ? req.query.pid : req.body.pid;
        var oid = (req.query.oid) ? req.query.oid : req.body.oid;
        var fi = (req.query.fi) ? req.query.fi : req.body.fi;

        var testDb = JSON.parse(data);

        var result = {
            meta: {
                type: "providerSearchResult",
                version: "1.0.0"
            },
            pid: pid,
            oid: oid,
            lastIndex: "2",
            maxIndex: "2",
            content: new Array()
        }

        let index = 0;

        testDb.testDatabase.forEach(element => {
            if (element.personId === pid && element.officeId === oid) {
                index++;
                result.content.push({
                    "index": index,
                    "providerId": element.providerId,
                    "providerTitle": element.providerTitle,
                    "providerUrl": element.providerUrl,
                    "scorecardId": element.scorecardId,
                    "scorecardDescription": element.scorecardDescription,
                    "scorecardStartDate": element.scorecardStartDate,
                    "scorecardEndDate": element.scorecardEndDate
                });
            }
        });

        result.lastIndex = index.toString();
        result.maxIndex = index.toString();



        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result
        };
    }
    else {
        var errorMessage = fs.readFileSync('error.json', 'utf-8');

        context.res = {
            status: 400,
            body: errorMessage
        };
    }
};