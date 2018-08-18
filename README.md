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

Poltrack Test Server implements an API very loosely based on [JSON API Specification](http://jsonapi.org/).

### Actor Search Function

`http://localhost:7071/api/ActorSearch?q=<query_string>`

where `query_string` is `empty | small | max`

Returns an array of `actor search result` objects.  (Political) `actor` is usually a person who is now, or was in the past, holding a political office.  Actors can take actions of certain type.

### Provider Search Function

Returns an array of `provider search result` objects.  `provider` is an entity (organization or person) that provided information about an action taken by an `actor`.
