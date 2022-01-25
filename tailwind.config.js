/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
    variants: {},
    plugins: [],
    // purge: false,
    // purge: {
    //     content: [
    //         './components/**/*.{vue,js}',
    //         './layouts/**/*.vue',
    //         './pages/**/*.vue',
    //         './plugins/**/*.{js,ts}',
    //     ],
    //     options: {
    //         safelist: {
    //             standard: [/^maz-/],
    //         },
    //     },
    // },
    purge: {
        enabled: true,
        content: [
            './components/**/*.vue',
            './layouts/**/*.vue',
            './pages/**/*.vue',
            './plugins/**/*.js',
            './nuxt.config.js',
        ],
    },
    theme: {
        fontFamily: {
            default: ['"Gotham A"', '"Gotham B"'],
            heading: 'Libre Baskerville',
        },
        fontSize: {
            xs: '.5rem',
            'semi-s': '.65rem',
            sm: '.75rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        listStyleType: {
            disc: 'disc',
        },
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1400px',
            },
            colors: {
                white: '#ffffff',
                black: '#000000',
                snow: '#C3DAE9',
                'snow-light': '#5C9BC3',
                gold: '#DEBF8D',
                brown: '#71591B',
                'dark-blue': '#0C2643',
                'light-blue': '#0574b5',
                'muted-blue': '#17406E',
                'form-blue': '#102E51',
            },
            maxHeight: {
                '20': '5rem',
            },
            borderWidth: {
                '0': '0px',
                '1': '1px',
            },
            zIndex: {
                '0': '0',
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
            },
            animation: {
                'fade-in-down': 'fade-in-down 0.5s ease-out',
                'fade-out-down': 'fade-out-down 0.5s ease-out',
                'fade-in-up': 'fade-in-up 0.5s ease-out',
                'fade-out-up': 'fade-out-up 0.5s ease-out',
            },
            keyframes: {
                'fade-in-down': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-70px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'fade-out-down': {
                    from: {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                    to: {
                        opacity: '0',
                        transform: 'translateY(70px)',
                    },
                },
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(70px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'fade-out-up': {
                    from: {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                    to: {
                        opacity: '0',
                        transform: 'translateY(-70px)',
                    },
                },
            },
            inset: {
                '0': 0,
                '20': '20px',
                '48': '48px',
            },
        },
    },
}
