<template>
    <form
        :action="redirectPath"
        class="fixed inset-0 page-height w-full flex flex-col flex-wrap justify-center items-center z-10 px-16"
        @submit.prevent="handleSubmit()"
    >
        <div class="w-full md:w-3/5">
            <div class="bg-white p-10 rounded-md relative">
                <p class="mb-3">Please enter your password to continue:</p>
                <input
                    v-model="passwordValue"
                    type="password"
                    class="w-full bg-gray-300 rounded-md mb-3 py-2 px-4 focus:outline-none"
                    autocomplete="current-password"
                    placeholder="Enter your password"
                />
                <p v-if="error" class="text-red-600 text-sm mb-3">
                    {{ error }}
                </p>
                <button class="btn block">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'DeployLogin',
    data() {
        return {
            passwordValue: '',
            isAuthorised: false,
            error: null,
        }
    },
    computed: {
        redirectPath() {
            return '/deploy-site'
        },
    },
    methods: {
        handleSubmit() {
            this.$passwordProtect.authorise(this.passwordValue)
            this.isAuthorised = this.$passwordProtect.isAuthorised()
            if (this.isAuthorised) {
                this.error = null
                this.$router.push(this.redirectPath)
            } else {
                this.error = 'The password you entered is incorrect.'
            }
        },
    },
}
</script>
