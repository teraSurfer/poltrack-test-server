# PolTrack Test Server

This is a test web server that emulates Microsoft Azure Functions used by [PolTrack client](https://github.com/vis/poltrack). It runs on `Windows`, `macOS`, and `Linux`.

## Install

1. [Install Version 2.x of Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#install-the-azure-functions-core-tools)

2. Clone `poltrack-test-server` repo.

## Usage

1. `cd poltrack-test-server` directory.

2. `func host start` starts the HTTP server and prints the list of _available_ Azure functions in the shell window.

### Debugging Azure Functions

1. Attach to the `node` process started by Step #2 above.
2. Add a breakpoint in `index.js` of an Azure function.
3. Access the Azure function URL. For example `http://localhost:7071/api/ActorSearch?q=small`

## API

Poltrack Test Server simulates an API very loosely based on [JSON API Specification](http://jsonapi.org/). This API is used by the `PolTrack` app to gather the necessary inputs required to generate a `report card` for one or more politician:

- **actors** (politicians) for which to generate the report card(s),
- **info provider scorecards** containing information about actions taken by the above actors.


### Actor Search Function

`http://localhost:7071/api/ActorSearch`

Returns political actor that match a user input (query).  (Political) `actor` is usually a person who is now, or was in the past, holding a political office.  Actors can take several types of political actions (currently, roll call votes and co-sponsorships of legislation).

**Example**

`http://localhost:7071/api/ActorSearch?q=small`

`http://localhost:7071/api/ActorSearch?q=max`

### Info Provider Browse Function

`http://localhost:7071/api/ProviderSearch?pid=p3&oid=o3&fi=1`

Returns **all** info providers (actually their scorecards) who provided information on action(s) that given `actor` acted on.  `provider` is an entity (organization or person) that provided information about a political action.

**Example**

`http://localhost:7071/api/ActionSearch?pid=p3&oid=o3&q=all&fi=1`

### Info Provider Search by Action Keywords Function

Returns info provider scorecards that included actions the given actor acted on AND the action description matches the user query.

**Example**

`http://localhost:7071/api/ActionSearch?pid=p3&oid=o3&q=all&fi=1`
