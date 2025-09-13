# AngStandalone

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Cities and Weather Data Setup

In the assets folder 
First delete cities.json and city folder inside weather_data folder if already available. (Imp Do not touch cors_server.py)
Next
**Generate Test Data**
   - On macOS/Linux, run:
     ```sh
     ./setup_data.sh
     ```
   - On Windows, run:
     ```powershell
     ./setup_data.ps1
     ```
   This will create a `weather_data` directory with all required JSON files.

**Start the Data Server**
   - On macOS/Linux, run:
     ```sh
     ./start_server.sh
     ```
   - On Windows, run:
     ```powershell
     ./start_server.ps1
     ```
This will setup the city folder and cities.json file and The data will be available at `http://localhost:9000/`.
