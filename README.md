# Introduction to Node and Express Workshop

## Starter Code Includes
- Babel Express Server
- Eslint with airbnb config

## What We Will Be Building
A quote board site with the ability to
1. Create a Quote
1. Delete a Quote

## What are Node.js and Express?
[Node.js](https://nodejs.org/en/) is a Javascript environment that allows us to
run the language outside of the browser.  Javascript is an asynchronous,
non-blocking, event driving, language. This model allows JavaScript to manage
multiple requests/users in a performant manner and hence makes it an invaluable
language for client and server-side web development.

[Express.js](https://expressjs.com/) offers us routing via middleware.
Middleware functions act on user request and can pass them along. This pattern
makes express middleware functions composable and reduces the need for repeated
code.

## Getting Started

### Installation
I recommend using Node Version Manager or [nvm](https://github.com/creationix/nvm)
to install node.

__Mac__
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
$ nvm install node
```

__Windows__

Go to the [node](https://nodejs.org/en/) and click install node 7.

We also need to install mongodb

- [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

### Starter Code

1. Create a fork of: https://github.com/RcrsvSquid/express-workshop
2. Clone your fork

``` bash
$ git clone <YOUR_FORK_URL>
$ cd <YOUR_NEW_REPO>
```
### Install the dependencies with npm
[NPM](https://www.npmjs.com/) stands for Node Package Manager. NPM creates a
package.json file which lists all the dependencies needed to build and run your
project.

In your repository
```bash
$ npm install
```

Other npm commands include:
```bash
$ npm init # creates initializes a package
$ npm install --save <PACKAGE> # downloads and saves a package to the package.json file
$ npm install --save-dev <PACKAGE> # saves the package as a development dependency
```

Aside: [yarn](https://yarnpkg.com/en/) is a new package manager that is gaining popularity.

### Up and running
The [package.json](./package.json) file contains a few scripts to get started.

#### Scripts
```bash
$ npm run dev # runs the server in reloading mode using nodemon
$ npm run start # runs the server with babel
$ npm run build # transpiles the server for production use
$ npm run prod # builds and runs the server for production use
```

Run the server!
```bash
$ npm run dev
```

then open your browser to [http://localhost:9090](http://localhost:9090)
You should see a blank quote board:

![Quote Blank](./static/images/blank.png)

## Express
Open up app/server.js. This is where the configuration for our app lives. You'll
notice on line 32 that we have connected routes to our app.

Lets take a deeper look. Open up app/router.js.

#### The anatomy of an express route
```javascript
app.get('/:name', (req, res, next) => {
	const name = req.params.name;

	res.json({ message: `Hello name ${name}`});
});
```

#### CRUD
- Create 
- Read 
- Update
- Delete

In the interest of time we will be implementing create and delete.

#### Create
There is a form created for you. Click the link in the top right corner of the
webpage.

For this to work we need a corresponding post on the backend to save our data to
the database. I have already hooked up the route on the backend be the handling
logic needs to be completed.

First to verify that the route is working by running a curl command.
```bash
$ curl -X POST -H "Content-Type: application/json" -d '{
	"text": "This is a test quote",
	"author": "me"
}' "http://localhost:9090/api/posts"
```

If you reload the page you should see your test post.

Let's implement the createQuote route handler in app/controllers/quote.js

```javascript
const newQuote = new Quote(req.body);

newQuote.save()
  .then((post) => {
    res.json({ message: 'post created' });
  })
  .catch((error) => { next(error); });
```


#### Delete
We need to find the corresponding quote and remove it. We need to grab the id
off of params as discussed earlier in order to do this.

```javascript
  Quote.findById(req.params.id)
    .then((post) => post.remove()) // eslint-disable-line
    .then(() => { res.sendStatus(200); })
    .catch((error) => { next(error); });
```

### Error handling in Express
An express middleware function that takes 4 paramaters can handle errors. We can
do this centrally and I have included an example in [app/server.js](./app/server.js)

Since we have a catch all error handler we can use next(err) when errors arrise
in our routes.
