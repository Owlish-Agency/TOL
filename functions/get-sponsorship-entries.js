/**
 * !NETLIFY FUNCTION WHICH FETCHES WUFOO FORM ENTRIES VIA WUFOO API
 * Wufoo API docs: https://wufoo.github.io/docs/?javascript#form-entries
 * -
 * Wufoo expects the forms API key to be included as the 'username’
 * and any value as the 'password’ portion of Basic Auth.
 * -
 * We use the base-64 package here to encode the username:password
 * in order to adhere to what Wufoo expects the request to be sent as (Basic Auth).
 */

require('dotenv').config()
const base64 = require('base-64')
const fetch = require('node-fetch')

const handler = async event => {
    const params = JSON.parse(event.body)
    const uri =
        params.formName == 'sponsorship-entries'
            ? process.env.WUFOO_GET_SPONSORSHIP_ENTRIES
            : process.env.WUFOO_GET_SPONSORSHIP_ENTRIES
    const username = process.env.WUFOO_USERNAME
    const password = 'wufoohoopla'

    let headers = {
        Authorization: 'Basic ' + base64.encode(username + ':' + password),
    }
    try {
        const response = await fetch(uri, {
            method: 'GET',
            headers: headers,
        })
        if (!response.ok) {
            console.log('Response not OK')
            console.log({
                statusCode: response.status,
                body: response.statusText,
            })

            return { statusCode: response.status, body: response.statusText }
        }
        const data = await response.json()
        console.log('Response OK')

        // Group data by pages
        //let groupedData = orderByPages(fields)

        return {
            statusCode: 200,
            body: JSON.stringify({
                statusCode: 200,
                entries: data.Entries,
            }),
        }
    } catch (error) {
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        }
    }

    // function orderByPages(data) {
    //     console.log('ordering data')
    //     let ordered = data.reduce(function(r, a) {
    //         r[a.Page] = r[a.Page] || []
    //         r[a.Page].push(a)
    //         return r
    //     }, Object.create(null))
    //     return Object.entries(ordered)
    // }
}

module.exports = { handler }
