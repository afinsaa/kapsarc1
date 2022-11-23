Kapsarc Assesment


1 - First run Python app to scrape the link provided with required filteration and save it in excel file (csv downloaded file of the results), 
buid and install the dependencies:

pip install selenium
pip install bs4  
pip install pandas  
pip install openpyxl

2 - run the following command:

python3 pyscrape.py

it will loop through the saved sheet and read the required data to be inserted to local sqlite database "Exportsdb.db", also it will save it in json file to presented through the Angular app under the directory "dashboardApp"

3 - run npm of the Angular App

npm install

4 - run Angular App


# DashboardApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
