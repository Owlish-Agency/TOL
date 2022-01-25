export default {
    computed: {
        special() {
            return [
                'zeroth',
                'first',
                'second',
                'third',
                'fourth',
                'fifth',
                'sixth',
                'seventh',
                'eighth',
                'ninth',
                'tenth',
                'eleventh',
                'twelfth',
                'thirteenth',
                'fourteenth',
                'fifteenth',
                'sixteenth',
                'seventeenth',
                'eighteenth',
                'nineteenth',
            ]
        },
        deca() {
            return [
                'twent',
                'thirt',
                'fort',
                'fift',
                'sixt',
                'sevent',
                'eight',
                'ninet',
            ]
        },
    },
    methods: {
        stringifyNumber(n) {
            if (n < 20) return this.special[n]
            if (n % 10 === 0) return this.deca[Math.floor(n / 10) - 2] + 'ieth'
            return (
                this.deca[Math.floor(n / 10) - 2] + 'y-' + this.special[n % 10]
            )
        },
    },
}
