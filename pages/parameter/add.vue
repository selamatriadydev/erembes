<template>
<div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
       <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Proyek</h5>
            </div>
            <div class="p-5">
                <form class="w-full max-w-lg"
                action=""
                method="post"
                @submit.prevent="submitForm()">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Proyek
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""
                        :class="{ 'is-invalid': errors && errors.proyekname }"
                        v-model="proyekname">
                        <p class="text-red-500 text-xs italic" v-if="errors && errors.proyekname">
                            {{ errors.proyekname.msg }}
                        </p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Kode Proyek
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder=""
                        :class="{ 'is-invalid': errors && errors.proyekcode }"
                        v-model="proyekcode">
                        <p class="text-red-500 text-xs italic" v-if="errors && errors.proyekcode">
                            {{ errors.proyekcode.msg }}
                        </p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Member
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder=""
                        :class="{ 'is-invalid': errors && errors.proyekmember }"
                        v-model="proyekmember">
                        <p class="text-red-500 text-xs italic" v-if="errors && errors.proyekmember">
                            {{ errors.proyekmember.msg }}
                        </p>
                        </div>
                    </div>
                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3">
                        <nuxt-link to="/parameter" class="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                            Back
                        </nuxt-link>
                        </div>
                        <div class="md:w-2/3">
                        <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Save
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware:'auth',
    data(){
        return{
        errors:null,
        proyekname:null,
        proyekcode:null,
        proyekmember:null
        }
    },
    methods: {
        submitForm(){
        this.$axios.post( '/api/proyek', {
                proyekname: this.proyekname,
                proyekcode: this.proyekcode,
                proyekmember: this.proyekmember,
            })
            .then((response) => {
            console.log(response)

            if(response.data._id){
                this.$router.push({ name:'parameter', params:{ created:'yes' } })
            }
            })
            .catch( (error) => {
            console.log(error)
            if(error.response.data.errors){
                this.errors = error.response.data.errors
            }
            });
        }
    }
    
}
</script>