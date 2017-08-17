# react-redux-typescript-seed
A jumping off point for building a frontend app

## Getting started

##### Clone repo
- cd into cloned repo
- yarn install
- yarn start
- garbage creds will log you in

##### Getting login working with your backend
- on line 30 of client.ts replace "url here" with your root url
- then if you're posting your creds to the backend change login method to something like this
```
login = (username: string, password: string): HandledResp => {
    return request.
        post(this.buildUrl("/login")).
        send({ username, password }).
        type("application/json").
        accept("application/json").
        end().
        then((res: Resp) => handleResp(res))
        .catch((res: Resp) => handleResp(res))
}
```
- then uncomment code in session_sagas .ts

##### Includes component library [blueprintjs](http://blueprintjs.com//docs/)
- checkout src/components/progress_spinner/progress_spinner.tsx