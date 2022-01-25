<template>
    <div id="particles-js"></div>
</template>

<script>
export default {
    name: 'Particles',
    props: {
        initParticleJs: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        require('!/node_modules/particles.js/particles.js')
        let timing = this.$route.path != '/' ? 1000 : 2000
        this.$nextTick(() => {
            setTimeout(() => {
                this.initParticlesJS()
            }, timing)
        })
    },

    methods: {
        initParticlesJS() {
            /* eslint-disable */
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 25,
                        density: {
                            enable: true,
                            value_area: 900,
                        },
                    },
                    color: {
                        value: '#ffffff',
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000',
                        },
                        polygon: {
                            nb_sides: 5,
                        },
                        image: {
                            src: 'img/github.svg',
                            width: 100,
                            height: 100,
                        },
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: 8,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: false,
                        distance: 500,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 2,
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'bottom',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'bubble',
                        },
                        onclick: {
                            enable: true,
                            mode: 'repulse',
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 0.5,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 4,
                            duration: 0.3,
                            opacity: 1,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                        push: {
                            particles_nb: 4,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                retina_detect: true,
            })
        },
    },
}
</script>

<style>
#particles-js {
    @apply absolute top-0 w-full h-full;
    z-index: 4;
}
.count-particles {
    background: #000022;
    position: absolute;
    top: 48px;
    left: 0;
    width: 80px;
    color: #13e8e9;
    font-size: 0.8em;
    text-align: left;
    text-indent: 4px;
    line-height: 14px;
    padding-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    border-radius: 0 0 3px 3px;
}
.js-count-particles {
    font-size: 1.1em;
}
#particles-js .particles-js-canvas-el {
    transform: translateY(-300px);
    transform: scale(1);
    opacity: 1;
    animation: appear 5.4s 1;
    animation-fill-mode: forwards;
}
#stats,
.count-particles {
    -webkit-user-select: none;
    margin-top: 5px;
    margin-left: 5px;
}
#stats {
    border-radius: 3px 3px 0 0;
    overflow: hidden;
}
@keyframes appear {
    0% {
        transform: scale(0);
        transform: translateY(-300px);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
