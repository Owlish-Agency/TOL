/**
 * !NETLIFY FUNCTION WHICH FETCHES WUFOO FORM FIELDS VIA WUFOO API
 * Wufoo API docs: https://wufoo.github.io/docs/?javascript#form-fields
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
const postmark = require('postmark')

const handler = async event => {
    const params = JSON.parse(event.body)
    const uri =
        params.formName == 'gift-light-form'
            ? process.env.WUFOO_GET_LIGHT_FIELDS
            : process.env.WUFOO_GET_SPONSORSHIP_FIELDS
    const username = process.env.WUFOO_USERNAME
    const password = 'wufoohoopla'

    const emailClient = new postmark.ServerClient(
        process.env.POSTMARK_CLIENT_ID
    )

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

        // Remove nonsense data and price fields from array
        const fields = data.Fields.filter(obj => {
            return (
                obj.Title !== 'Entry Id' &&
                obj.ID !== 'EntryId' &&
                obj.ID !== 'DateCreated' &&
                obj.ID !== 'CreatedBy' &&
                obj.ID !== 'LastUpdated' &&
                obj.ID !== 'Field620' && // Lights total price field
                obj.ID !== 'Field621' && // Payment status field
                obj.ID !== 'Field618' && // Lights gifted field
                obj.ID !== 'Field597' && // Custom donation field
                obj.ID !== 'Field13' && // Sponsorship donation field
                obj.ID !== 'Field20' && // Sponsorship donation total
                obj.ID !== 'Field124' && // Sponsorship File Upload field
                obj.ID !== 'Field624' && // Custom donation field
                obj.ID !== 'UpdatedBy'
            )
        })

        // Build object of price fields to send to client
        // eslint-disable-next-line no-unused-vars
        let priceFields = []
        if (params.formName == 'gift-light-form') {
            priceFields = {
                Field618: {
                    name: 'lightsGifted',
                    value: null,
                },
                Field597: {
                    name: 'customDonation',
                    value: null,
                },
            }
        }

        // Group data by pages
        let groupedData = orderByPages(fields)
        console.log(JSON.stringify(groupedData))
        return {
            statusCode: 200,
            body: JSON.stringify({
                statusCode: 200,
                fields: groupedData,
                priceFields: priceFields,
            }),
        }
    } catch (error) {
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        }
    }

    function orderByPages(data) {
        console.log('ordering dataa')
        let ordered = data.reduce(function(r, a) {
            r[a.Page] = r[a.Page] || []
            r[a.Page].push(a)
            return r
        }, Object.create(null))
        return Object.entries(ordered)
    }
}

module.exports = { handler }
