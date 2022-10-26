/* eslint-disable no-unused-vars */
/**
 * !NETLIFY FUNCTION WHICH SUBMITS USER DONTATION DATA VIA WUFOO API
 * Wufoo API docs: https://wufoo.github.io/docs/?javascript#submit-entry
 * -
 * Wufoo expects the forms API key to be included as the 'username’
 * and any value as the 'password’ portion of Basic Auth.
 * -
 * We use the base-64 package here to encode the username:password
 * in order to adhere to what Wufoo expects the request to be sent as (Basic Auth).
 * -
 * Gift a Light Wufoo field ID's:
    Field10	  The light(s) are from
    Field618  Lights Gifted
    Field624  Custom Donation
    Field620  Total Donation Amount
    Field621  Paypal Transaction ID
    Field1	  First
    Field2	  Last
    Field4	  Email
    Field60	  Phone Number
    Field53	  Additional Notes
    Field631  Country
    Field626  Street Address
    Field627  Address Line 2
    Field628  City
    Field629  State / Province / Region
    Field630  Postal / Zip Code
 * 
 * -
 * Sponsor Wufoo Field ID's:
    Field17	  Sponsorship Level
    Field13	  Paypal Transaction ID
    Field20	  Total Donation
    Field8	  First
    Field9	  Last
    Field122  Company Name (If Applicable)
    Field126  Display Company Logo? (A Hospice team member will reach out for a logo)
    Field124  Company Logo
    Field10	  Email
    Field11	  Phone Number
    Field12	  Additional Notes
    Field128  Street Address
    Field129  Address Line 2
    Field130  City
    Field131  State / Province / Region
    Field132  Postal / Zip Code
    Field133  Country
 */

require('dotenv').config()
const base64 = require('base-64')
const fetch = require('node-fetch')
const qs = require('qs')
const postmark = require('postmark')

exports.handler = async event => {
    const username = process.env.WUFOO_USERNAME
    const password = 'wufoohoopla'
    const emailClient = new postmark.ServerClient(
        process.env.POSTMARK_CLIENT_ID
    )

    let headers = {
        Authorization: 'Basic ' + base64.encode(username + ':' + password),
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    /**
     * ======================
     * 1. Structure price data before submitting to Wufoo
     * ======================
     */
    const params = JSON.parse(event.body)
    const dataToSubmit = params.dataToSubmit
    const itemsForPurchase = params.itemsForPurchase
    const paymentDetails = params.paymentDetails
    const lightsPrice = 30
    let totalDonationAmount = 0

    if (params.formName == 'gift-light-form') {
        // Get light all lights gifted
        let availableLights = itemsForPurchase.filter(
            item => item.fieldType == 'light'
        )

        // Get custom donation (if it's in data)
        let availableCustomDonation = itemsForPurchase.filter(
            item => item.fieldType == 'customDonation'
        )

        // Custom donation amount
        let customDonationAmount =
            availableCustomDonation.length > 0
                ? availableCustomDonation[0].donation
                : 0
        dataToSubmit.Field624 = customDonationAmount

        // Lights gifted data
        let lightsGiftedString = availableLights.map(light => {
            let donationId = 'donationId' in light ? light.donationId : ''
            let honoreeName = 'honoreeName' in light ? light.honoreeName : ''
            let notifierName =
                'notifierName' in light
                    ? 'Notify ' + light.notifierName + ':'
                    : 'Notifier N/A'
            let streetAddress =
                'address' in light && 'StreetAddress' in light.address
                    ? light.address.StreetAddress
                    : ''
            let streetAddress2 =
                'address' in light && 'AddressLine2' in light.address
                    ? ' ' + light.address.AddressLine2
                    : ''
            let city =
                'address' in light && 'City' in light.address
                    ? light.address.City + ', '
                    : ''
            let state =
                'address' in light && 'State' in light.address
                    ? light.address.State + ', '
                    : ''
            let zipCode =
                'address' in light && 'Postal' in light.address
                    ? light.address.Postal
                    : ''

            return `${donationId} ${honoreeName} - ${notifierName} ${streetAddress}${streetAddress2}, ${city}${state}${zipCode}`
        })

        dataToSubmit.Field618 = lightsGiftedString.join('\n')

        // Statically set the country field
        dataToSubmit.Field631 = 'USA'

        // Lights dollar amount
        let lightsGiftedAmount =
            availableLights.length > 0
                ? availableLights.length * lightsPrice
                : 0

        // Calculate total donation amount (custom donation and lights gifted combined)
        totalDonationAmount = lightsGiftedAmount + customDonationAmount
        dataToSubmit.Field620 = totalDonationAmount

        // Add paypal tranaction ID to payment status field
        dataToSubmit.Field621 = paymentDetails.id
    } else {
        // Add total price of sponor level (remove commas to avoid Wufoo throwing 'valid currency' error)
        dataToSubmit.Field20 = itemsForPurchase[0].price.replace(/,/g, '')

        // Add paypal tranaction ID to payment status field
        dataToSubmit.Field13 = paymentDetails.id

        // Statically set the country field
        dataToSubmit.Field133 = 'USA'
    }

    /**
     * ======================
     * 2. Post the data to Wufoo
     * ======================
     * event.body must be valid json
     * If it isn't, the data will submit properly to Wufoo, BUT:
     * All field values will be ignored and will be empty within the Wufoo dashboard
     * ======================
     * Another very important note:
     * Wufoo docs shows JSON data being submitted via API: https://wufoo.github.io/docs/?javascript#submit-entry
     * This is misleading, because the data needs to be stringified in order to properly be submitted.
     * Example of correct format: Field1=Tom&Field4=tom%gmail.com&Field60=1234567
     * ======================
     */
    const stringifiedData = qs.stringify(params.dataToSubmit)

    const uri =
        params.formName == 'gift-light-form'
            ? process.env.WUFOO_SUBMIT_LIGHT_FIELDS
            : process.env.WUFOO_SUBMIT_SPONSORSHIP_FIELDS

    try {
        const response = await fetch(uri, {
            method: 'POST',
            headers: headers,
            body: stringifiedData,
        })

        // Decode the data whether it is json or plain text
        let dataDecoded = null
        try {
            dataDecoded = await response.json()
            emailClient.sendEmail({
                From: process.env.EMAIL_ERRORS_FROM,
                To: dataToSubmit.Field10,
                Subject: `Thank you for your donation!`,
                TextBody: `Thank you for your donation! You can share the tree on facebook with the following link:
                https://www.facebook.com/sharer/sharer.php?u=https%3A//hospicetreesoflight.org/view-donations`,
                MessageStream: 'outbound',
            })
        } catch (e) {
            dataDecoded = await response.text()
        }

        // On failure
        if (!dataDecoded.Success) {
            let errorMessage = JSON.stringify({
                data: dataDecoded,
            })

            // Email error message to Rockit
            emailClient.sendEmail({
                From: process.env.EMAIL_ERRORS_FROM,
                To: process.env.EMAIL_ERRORS_TO,
                Subject: `THBR ${params.formName} Form Error`,
                TextBody: `Failed response from Wufoo:\n${errorMessage}`,
                MessageStream: 'outbound',
            })

            return {
                statusCode: 500,
                body: errorMessage,
            }
        }
        // Send POST request to Netlify to rebuild site in production environment
        if (process.env.ENVIRONMENT != 'development') {
            await fetch(process.env.NETLIFY_REBUILD_SITE_HOOK, {
                method: 'POST',
            })
        }
        // On success
        return {
            statusCode: 200,
            body: JSON.stringify({
                statusCode: 200,
                data: dataDecoded,
            }),
        }
    } catch (error) {
        let errorMessage = JSON.stringify(error)
        // Email error message to Rockit
        emailClient.sendEmail({
            From: process.env.EMAIL_ERRORS_FROM,
            To: process.env.EMAIL_ERRORS_TO,
            Subject: `THBR ${params.formName} Form Error`,
            TextBody: `Failed while posting to Wufoo:\n${errorMessage}`,
            MessageStream: 'outbound',
        })
        console.log(error)
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: errorMessage,
        }
    }
}
