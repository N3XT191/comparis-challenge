# comparis-properties

## Simplifications / Deviations from original task:

Due to personal time constraint, I have simplified the task slightly in the following ways, allowing me to get to a working prototype a bit quicker:

- Long/Lat flattened in JSON
- null replaced with 0 in the coordinates

## Suboptimal design choices I wouldn't do in a real production app which I did to save time/effort/inexperience with C#:

- load/parse JSON on every API call
- single API endpoint with filtering through query string
- displaying all points on the map instead of grouping many close ones into cluster
- using inline styles
- hardcoding property types in the dropdown

## additional things needed if this was a "real" projects (left out because time constraint)

- unit-testing filter functions
- document API outside of code
- style frontend to look nice
- take css out of inline JSX into something like styled-components

## how to run

(tested on MacOS and Ubuntu)

- cd into propertyAPI (backend)
- run `dotnet build`
- run `dotnet run`
- cd into frontend
- run `npm i`
- run `npm run start`

open `http://localhost:3000/` in any modern browser

## Subsequent User Stories

- As a user, I want to be able to see a list of all relevant information (adress etc.) when selecting a property.

- As a user I want to be able to judge the surrounding area of a property by seeing markers of nearby schools, public transport, supermarkets etc.
- As a maintainer I want to be able to add and modify properties without going into the source code.
