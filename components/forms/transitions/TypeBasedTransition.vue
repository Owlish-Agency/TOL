<script>
const TYPE_MAP = {
    fadeInOut: {
        enter: 'animate-fade-out-up',
        leave: 'animate-fade-out-down',
    },
    fadeUpDown: {
        enter: 'animate-fade-in-up',
        leave: 'animate-fade-in-down',
    },
}

export default {
    functional: true,
    props: {
        transitionType: {
            type: String,
            default: 'animate-fade-in-up',
        },
    },
    render(h, context) {
        let enterClass = TYPE_MAP[context.props.transitionType].enter
        let leaveClass = TYPE_MAP[context.props.transitionType].leave
        var data = {
            props: {
                enterActiveClass: enterClass,
                leaveActiveClass: leaveClass,
                name: 'type-based-transition',
                mode: 'out-in',
            },
        }
        return h('transition', data, context.children)
    },
}
</script>
