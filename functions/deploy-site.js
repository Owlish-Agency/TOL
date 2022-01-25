const fetch = require('node-fetch')

exports.handler = async () => {
    // Send POST request to Netlify to rebuild site in production environment
    const response = await fetch(process.env.NETLIFY_REBUILD_SITE_HOOK, {
        method: 'POST',
    })
    // On success
    return {
        statusCode: 200,
        body: JSON.stringify({
            statusCode: 200,
            data: response,
        }),
    }
}
