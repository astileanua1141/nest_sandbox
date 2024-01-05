# nest_sandbox

# Project setup

```node
npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2

```

```json 
# tsconfig.json file: 
{
  "compilerOptions": { 
    "module": "commonjs",
    "target": "ES2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

# Concepts
Request -> (steps)
- PIPE: Validate Data contained in the request
- GUARD : Make sure the user is authenticated
- CONTROLLER : Route the request to a particular function
- SERVICE : Run some business logic
- REPOSITORY : Access a database
-> Response

## Overview  
- Controllers -> handles incoming requests
- Services -> handles data access and business logic
- Modules -> Groups together code 
- Pipes -> Validates incoming data
- Filters -> Handles errors that occur during request handling 
- Guards -> Handles authentication 
- Interceptors -> Adds extra logic to incoming requests or outgoing responses
- Repositories -> handles data stored in a DB

## File Naming conventions 
- One class per file 
- Class name should include the kind of thing we are creating
- Name of class and name of file should always match up 
- Filename template: name.type_of_thing.ts

