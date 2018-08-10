#r "Newtonsoft.Json"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static IActionResult Run(HttpRequest req, TraceWriter log)
{
    log.Info("PersonSearch function processed a request.");

    string query = req.Query["query"];

    string requestBody = new StreamReader(req.Body).ReadToEnd();
    dynamic data = JsonConvert.DeserializeObject(requestBody);
    query = query ?? data?.query;

    string line = "";

    if (query == null)
    {
        return new BadRequestObjectResult("Please pass a query on the query string or in the request body");
    }
    else
    {
        try
        {   // Open the text file using a stream reader.
            using (StreamReader sr = new StreamReader("./PersonSearch/searchResult.json"))
            {
	        // Read the stream to a string, and write the string to the console.
                line = sr.ReadToEnd();
            }
        }
        catch (Exception e)
        {
            log.Info("The file could not be read:");
            // log.Info(e.Message);
        }
    }
    log.Info(line);
    return (ActionResult)new OkObjectResult(line);
}
