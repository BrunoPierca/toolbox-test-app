
# Toolbox test app

This is a full stack application developed using Express & React with vanilla JS

[API Documentation](https://toolboxtest.onrender.com/docs/) 

[Live demo](https://toolbox-test-frontend.netlify.app/)






## Run Locally

Clone the project

```bash
  git clone https://github.com/BrunoPierca/toolbox-test-app/
```

#### With docker

navigate to the root folder of the project and run

```bash
  docker-compose up
```

You will see backend test results and then both parts will be available. By default, the frontend is at port 3000 and the backend at 5000

#### Manually running the project

Navigate to each folder (backend & frontend) and install required modules

```bash
  npm install
```

Running the projects, both projects start their execution running the default start command:

```bash
  npm start
```




## API Reference

#### Get file list

```http
  GET /files/list
```

#### Get all files

```http
  GET /files/data
```

#### Get one file
```http
  GET /files/data?fileName=example1.csv
```
| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `fileName` | `string` | Use a fileName present on the file list provided by /files/list |

#### Get API documentation

```http
  GET /docs
```


## Running Tests

To run tests on the backend, run the following command inside the "backend" directory

```bash
  npm run test
```

