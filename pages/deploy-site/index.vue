<template>
    <div
        class="fixed inset-0 page-height w-full flex flex-col flex-wrap justify-center items-center z-10 px-16"
    >
        <div v-if="error" class="w-full md:w-3/5 mb-8">
            <div class="bg-red-200 rounded-md p-6">
                <p class="text-red-600">{{ error }}</p>
            </div>
        </div>
        <div v-if="success" class="w-full md:w-3/5 mb-8">
            <div class="bg-green-100 rounded-md p-6">
                <p class="text-green-600">
                    {{ success }}
                </p>
            </div>
        </div>
        <div class="w-full md:w-3/5">
            <div class="bg-white p-10 rounded-md relative">
                <img
                    class="mb-8 mx-auto "
                    src="https://api.netlify.com/api/v1/badges/f5139447-b625-47d5-9af8-327de9adb730/deploy-status"
                    alt="Netlify Status"
                />
                <ul class="mb-8">
                    <ul class="text-left list-disc w-8/12 mx-auto">
                        <li class="mb-3">
                            Click the button below to trigger a deployment.
                        </li>
                        <li>
                            Once you have clicked the deploy site button below,
                            refresh this page periodically and refer to the
                            badge above for deployment status.
                        </li>
                    </ul>
                </ul>
                <div class="w-full text-center">
                    <button class="btn block text-center" @click="onSubmit">
                        Deploy Site
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeploySite',
    middleware: ['password-protect'],
    data() {
        return {
            error: null,
            success: null,
        }
    },
    methods: {
        async onSubmit() {
            try {
                let result = await this.$axios.$post(
                    `${this.$config.baseURL}${this.$config.netlifyDeploySite}`
                )
                if (result.statusCode != 200) {
                    console.log(result)
                    this.error = 'Deployment failed: Try'
                } else {
                    this.error = null
                    this.success =
                        'Deployment is in progress. Refresh this page periodically to see deployment status via the badge below'
                }
            } catch (error) {
                console.log(error.response.data)
                this.error = 'Deployment failed: Catch'
            }
        },
    },
}
</script>
