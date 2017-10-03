const Promise = require("promise")
const request = require("superagent-promise")(require("superagent"), Promise)
import { environment } from "../build_params"
import { getAccessToken } from "../util/access_token_utils"

interface Resp {
    readonly text: string
    readonly status: number
    readonly statusText: string
}

interface HandledResp {
    readonly items: {}
    readonly status: number
    readonly statusText: string
}

const handleResp = (resp: Resp)  => {
    // if text present, parse as json, otherwise empty array
    const items: {}  =  resp.text ? JSON.parse(resp.text) : []
    // return normalized response object
    return ({
        items,
        status: resp.status,
        statusText: resp.statusText,
    })
}

const prodUrl: string = "url here"
const stagingUrl: string = "url here"

export class Client  {
    rootUrl = environment === "production" ? prodUrl : stagingUrl
    buildUrl = (pieceOfUrl: string) => `${this.rootUrl}${pieceOfUrl}`
    authHeader = () => {
        return {"Authorization": "Bearer " + getAccessToken()}
    }

    login = (username: string, password: string): HandledResp => {
        return request
            .get(this.buildUrl("/login"))
            .auth(username, password)
            .type("application/json")
            .accept("application/json")
            .then((res: Resp) => handleResp(res))
            .catch((res: Resp) => handleResp(res))
    }
}
