<script>
export default {
    functional: true,
    props: {
        isNext: {
            type: Boolean,
            default: true,
        },
    },
    render(h, context) {
        var data = {
            props: {
                appear: true,
                appearActiveClass: 'animate-fade-in-up',
                enterActiveClass: context.props.isNext
                    ? 'animate-fade-in-up'
                    : 'animate-fade-in-down',
                leaveActiveClass: context.props.isNext
                    ? 'animate-fade-out-up'
                    : 'animate-fade-out-down',
                name: 'data-driven-transition',
                mode: 'out-in',
            },
        }
        return h('transition-group', data, context.children)
    },
}
</script>
