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

// eslint-disable-next-line no-unused-vars
const handler = async event => {
    const params = JSON.parse(event.body)

    let uri = process.env.WUFOO_GET_LIGHT_ENTRIES
    if (params.afterEntryAmount) {
        uri = uri + `&pageStart=${params.afterEntryAmount}&pageSize=100`
    } else {
        uri = uri + `&pageSize=100`
    }

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

        // Create new array for individual lights
        let lightsArray = new Array()
        data.Entries.forEach(entry => {
            // Delete unneccessary fields
            delete entry.CreatedBy
            delete entry.DateCreated
            delete entry.DateUpdated
            delete entry.Field1 // First Name field
            delete entry.Field2 // Last Name field
            delete entry.Field4 // Email Address field
            delete entry.Field53 // Additional Notes field
            delete entry.Field60 // Phone Number field
            delete entry.Field610
            delete entry.Field15
            delete entry.Field620 // Lights total price field
            delete entry.Field621 // Payment status field
            delete entry.Field624 // Custom Donation field
            delete entry.UpdatedBy

            // Check if light field exists
            if (entry.Field618.length) {
                // split light field into array
                const lightArray = entry.Field618.split(/\n/)
                lightArray.forEach(light => {
                    let donatedTo = ''
                    let donationType = ''
                    let strippedLight = light.substr(0, light.indexOf('-'))
                    if (strippedLight.includes('In memory of')) {
                        donatedTo = strippedLight.replace('In memory of ', '')
                        donationType = 'In memory of'
                    } else {
                        donatedTo = strippedLight.replace('In honor of ', '')
                        donationType = 'In honor of'
                    }
                    // merge objects together
                    // push to master array
                    lightsArray.push({
                        ...entry,
                        ...{ light: light.trim() },
                        ...{ donationType: donationType },
                        ...{ donatedTo: donatedTo },
                    })
                    //lightsArray.push({ ...entry, ...lightValue})
                })
            }
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                statusCode: 200,
                lights: lightsArray,
                totalEntries: data.Entries.length,
            }),
        }
    } catch (error) {
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        }
    }
}

module.exports = { handler }
