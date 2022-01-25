export default ({ store }) => {
    store.dispatch('WINDOW_SIZE_CHANGED', {
        width: document.body.clientWidth,
        height: window.screen.height,
    })
    window.onresize = () => {
        store.dispatch('WINDOW_SIZE_CHANGED', {
            width: document.body.clientWidth,
            height: window.screen.height,
        })
    }
}
