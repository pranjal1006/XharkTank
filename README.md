
# Xharktank-backend

A simple express app that exposes a bunch of rest endpoints to create/read data related to pitches and offers. This app serves as a backend for the xharktank app.

The express app uses Prisma ORM to interact with the DB. Target database is PostgreSQL 

## API Reference

#### Get all pitches

```
  GET /pitches
```

#### Get a single pitch

```
  GET /pitches/${id}
```

#### Create a new pitch

```
  GET /pitches
```

| Body Attributes | Type     |
| :-------- | :------- |
| `entrepreneur` | `string` |
| `pitchTitle` | `string` |
| `pitchIdea` | `string` |
| `askAmount` | `float` |
| `equity` | `float` |

#### Create a new offer for `pitchId`

```
  GET /pitches/${id}/makeOffer
```

| Body Attributes | Type     |
| :-------- | :------- |
| `investor` | `string` |
| `amount` | `float` |
| `equity` | `float` |
| `comment` | `string` |



## Installation

### Database

- Make sure the `PostgreSQL` process is available for DB connection through `localhost` and default port `5432`.

- Create a new PostgreSQL user `admin` with password `Admin@1324`.

- Create a new database with the name `xharktank` and make sure it is owned by the newly created user admin before working on your project.

### Express server

Clone the project

```bash
  git clone https://gitlab.crio.do/COHORT_ME_BUILDOUT_XHARKTANK_ENROLL_1648956266180/career-pranjal-ME_BUILDOUT_XHARKTANK.git
```

Go to the project directory

```bash
  cd career-pranjal-ME_BUILDOUT_XHARKTANK/
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Server should start on port 8081


## Improvements

- Centralized error handling

- Use some library for logging

- use middlewares like helmet to improve security
