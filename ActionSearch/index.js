module.exports = async function (context, req) {
    /**
     * ActionScorecardSearch
     * Required input parameters:
     * pid - personId
     * oid - officeId
     * q   - query string (a: all actions; fa: first action)
     * fi - index of first search result item to be returned
     */
    context.log('ActionSearch HTTP trigger function processed a request.');
    var fs = require('fs');

    if ((req.query.pid || (req.body && req.body.pid)) &&
    (req.query.oid || (req.body && req.body.oid)) &&
    (req.query.q || (req.body && req.body.q)) &&
    (req.query.fi || (req.body && req.body.fi))
    ) {
        // page size - maximum number of items to return in one response
        const pageSize = 10;

        var filepath = './ActionSearch/test-data.json';
        var data = fs.readFileSync(filepath, 'utf-8');

        var pid = (req.query.pid) ? req.query.pid : req.body.pid;
        var oid = (req.query.oid) ? req.query.oid : req.body.oid;
        var q = (req.query.q) ? req.query.q : req.body.q;
        var fi = (req.query.fi) ? req.query.fi : req.body.fi;

        var testDb = JSON.parse(data);

        var result = {
            meta: {
                type: "actionSearchResult",
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

                actions = new Array();

                for (let index = 0; index < element.actions.length; index++) {
                    const elementAction = element.actions[index];
                    
                    newAction = {
                        "actionId": elementAction.actionId,
                        "actionTypes": elementAction.actionTypes,
                        "preferredPositions": elementAction.preferredPositions,
                        "weight": elementAction.weight,
                        "documentId": elementAction.documentId,
                        "documentUpdateDate": elementAction.documentUpdateDate,
                        "documentTitle": elementAction.documentTitle,
                        "documentContentFragment": elementAction.documentContentFragment
                    };

                    actions.push(newAction);

                    if (q != "all" && index === 0) break;
                }

                result.content.push({
                    "index": index,
                    "providerId": element.providerId,
                    "providerTitle": element.providerTitle,
                    "providerUrl": element.providerUrl,
                    "scorecardId": element.scorecardId,
                    "scorecardDescription": element.scorecardDescription,
                    "scorecardStartDate": element.scorecardStartDate,
                    "scorecardEndDate": element.scorecardEndDate,
                    "scorecardActionMaxWeight": element.scorecardActionMaxWeight,
                    "scorecardActionCount": element.scorecardActionCount,
                    "actions": actions
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