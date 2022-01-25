<template>
    <div class="flex flex-wrap w-full">
        <div :key="field.ID" class="w-full">
            <div v-if="!image">
                <h2>Select an image</h2>
                <input type="file" @change="onFileChange" />
            </div>
            <div v-else>
                <img :src="image" />
                <button @click="removeImage">Remove image</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileField',
    props: {
        field: {
            type: Object,
            default: Object,
        },
        formData: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            image: '',
        }
    },
    watch: {
        image: function(newVal) {
            this.$emit('formattedValueUpdated', newVal)
        },
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.createImage(files[0])
        },
        createImage(file) {
            //var image = new Image()
            var reader = new FileReader()
            var vm = this

            reader.onload = e => {
                vm.image = e.target.result
            }
            reader.readAsDataURL(file)
        },
        removeImage: function() {
            this.image = ''
        },
    },
}
</script>

<style lang="scss" scoped>
.has-error {
    .maz-border-color {
        border-color: '#ff4500';
    }
}
</style>
