/* eslint-disable no-unused-vars */
export default ({ app }, inject) => {
    /**
     * Sorts an array by a given field name
     * @param {handle} String - the string that needs to be dashed case
     */
    inject('dashCase', handle => {
        return (
            handle
                // insert a space between lower & upper
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                // space before last upper in a sequence followed by lower
                .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
                // replace spaces with dashes
                .replace(/\s+/g, '-')
                // lowercase all
                .toLowerCase() +
            // Add field handle
            '-field'
        )
    })
    inject('camelCase', handle => {
        return handle
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
                idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
            )
            .replace(/\s+/g, '')
    })
}
