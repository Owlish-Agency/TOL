<template>
    <div class="h-full intro container flex items-center">
        <div>
            <div class="flex flex-wrap flex-col md:-mx-4 content-center h-full">
                <div class="w-full md:w-4/5 lg:w-3/5 md:px-4 text-center">
                    <p
                        class="mb-6 text-white font-bold text-xl md:text-3xl uppercase"
                    >
                        Thank you for your donation
                    </p>
                    <p class="mb-12 text-snow text-lg">
                        We are extremely grateful for your donation to Trees of
                        Light. Click below to view the Memorial Lights and
                        Sponsorships that have made it possible to further the
                        mission of The Hospice of Baton Rouge.
                    </p>
                    <div
                        class="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-8 justify-center"
                    >
                        <nuxt-link class="btn" to="/view-donations"
                            >View Lights</nuxt-link
                        >

                        <nuxt-link class="btn" to="/sponsorships"
                            >View Sponsors</nuxt-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThankYouPage',
}
</script>
<style scoped>
.intro {
    position: relative;
    z-index: 5;
}
</style>
