<template>
<div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
       <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Proyek</h5>
            </div>
            <div class="p-5">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Proyek
                    </label>
                    <p class="text-red-500 text-xs italic">
                        {{ proyek.proyekname }}
                    </p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Kode Proyek
                    </label>
                    <p class="text-red-500 text-xs italic">
                        {{ proyek.proyekcode }}
                    </p>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Member
                    </label>
                    <p class="text-red-500 text-xs italic">
                        {{ proyek.proyekmember }}
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
                        <nuxt-link :to="'/parameter/' + proyek._id + '/update'" class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                            Update
                        </nuxt-link>
                    </div>
                    <div class="md:w-3/3">
                        <button @click="deleteRecord()" class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    middleware:'auth',
        async asyncData(context){
        const {data} = await context.$axios.get('/api/proyek/' + context.route.params.id)
        return {
        proyek : data
        }
    },
    methods: {
        deleteRecord(){
            if(confirm("Are you sure?") === true){
                this.$axios.delete('/api/proyek/' + this.$route.params.id)
                .then((response) => {
                    if(response.data._id){
                    this.$router.push({ name:'parameter', params:{ deleted:'yes' } })
                    }
                })
                .catch( (error) => {
                    console.log(error);
                });
            }
        }
    }
    
}
</script>