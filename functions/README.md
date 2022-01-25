### Running locally:
---
You will need to place a [netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/) file within the root of your project with basic mappings to nuxt's run dev/generate commands. 

Example of what this projects `netlify.toml` *should* look like:
 
 ```
    [dev]
        command = "npm run dev"
    [build]
        command = "npm run generate"
        publish = "dist"
        functions = "functions" # directs netlify to where your functions directory is located
 ```

In order to test this locally, you MUST install [netlify-cli](https://docs.netlify.com/cli/get-started) and run `netlify dev` rather than `npm run dev`

### Sending requests to netlify functions via the front-end:
---
This project uses axios to send requests to netlify functions. **Enpoints must be a absolute URL in order to work effectively**.

Example local endpoint (running `netlify dev` starts server on port 8888 by default):

```
    async fetch() {
        // Fetches the forms fields for us to output how we want
        try {
            let result = await this.$axios.$post("http://localhost:8888/path/to/netlify/function")
            if (result.statusCode != 200) {
                this.error = `Status code ${result.statusCode}: ${result.body}`
            } else {
                this.form = result.data
            }
        } catch (error) {
            console.log('Error on front end')
            console.log(error.response.data)
        }
    },
```

### Making it work across environments
---
Be sure to set a `BASE_URL` variable within a `.env` file in order to successfully have this work in all environments (dev, staging, production). 

For instance, your absolute URL in a production environment could look like the following (using `this.$config` here which assumes you are utilizing nuxts runtime config option):

```
    let result = await this.$axios.$post(`${this.$config.baseURL}${this.$config.frontendGetFormFields}`)
```

While your variables within your `.env` file could be set like this:

```
    # Base
    NODE_ENV="dev"
    BASE_URL="http://localhost:8888" # Change this in prod to your actual domain
    
    # Front end netlify function endpoints
    FRONTEND_GET_FORM_FIELDS = "/.netlify/functions/function.js"
```