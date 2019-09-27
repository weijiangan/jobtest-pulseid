# Minimal Unsplash Clone

Link to demo: https://epic-dubinsky-908725.netlify.com/

A client to Unsplash API written in React 16.9 with Hooks and redux-thunk. This is an assignment I did for Pulse iD's job interview. It incorporates a basic set of features as seen in Unsplash including browsing photos, searching and narrow down by a subset of predefined tags, complete with infinite scrolling pagination mechanism.

I took this opportunity to learn the Redux ducks pattern and to test my front end behavior with react-testing-library.

## Prerequisite
Before building or developing, please obtain an API key from https://unsplash.com/developers and insert your keys in a file named `.env` in the root directory. Refer to `sample.env` for format. Alternatively you can pass the keys as env vars via your command line.

## Building
```sh
$ yarn
$ yarn run build
```

## Development
```sh
$ yarn
$ [PORT=<port number>] yarn run start:dev # start dev server in nodemon with React HMR
```

## Testing
```sh
$ yarn test
$ yarn run test -u # <-- run this to update snapshot
```
