# Simple CRUD API
***
1. Clone the repository by running the following command:
```sh
git clone https://github.com/p0lluxstar/RSS-NodeJS.git
```
2. Navigate to the app folder using:
```sh
cd rss-nodejs
```
3. Switch to the develop branch by running:
```sh
git checkout crud-api
```
4. Install all the necessary dependencies:
```sh
npm i
```
5. To start the application without a load balancer, run:
```sh
npm run start:dev
```
If you want to run it with a load balancer, use:
```sh
npm run start:multi
```
Initiate the build process and start the app in single-threaded mode with:
```sh
npm run start:prod
```
6. To run the tests, execute:
```sh
npm run test
```