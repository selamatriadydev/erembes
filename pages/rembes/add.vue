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
                            <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            v-model="id_proyek">
                                    <option v-for="(item,index) in proyeks" :key="index" :value="item._id">{{ item.proyekname }}</option>
                            </select>
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembesproid">
                                {{ errors.rembesproid.msg }}
                            </p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Pemohon
                            </label>
                            <p class="text-blue-500 text-xs italic">
                                {{ user_rembes }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Tanggal Transaksi
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="date" placeholder=""
                            :class="{ 'is-invalid': errors && errors.tgl }"
                        v-model="tgl">
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembestgl">
                                {{ errors.rembestgl.msg }}
                            </p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Gambar
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                            type="file" placeholder="" 
                            :class="{ 'is-invalid': errors && errors.image }"
                            ref="file">
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembesimage">
                                {{ errors.rembesimage.msg }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Nilai
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                            type="text" placeholder="" 
                            v-model="nilai"
                            :class="{ 'is-invalid': errors && errors.nilai }">
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembesnilai">
                                {{ errors.rembesnilai.msg }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Keterangan
                            </label>
                            <textarea
                                class=" form-control
                                    block w-full px-3 py-1.5 text-base font-normal text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                id="desc"
                                rows="3"
                                placeholder="Your message"
                                :value="desc"
                                > </textarea>
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembesdesc">
                                {{ errors.rembesdesc.msg }}
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
            user_rembes: this.$auth.user.full_name,
            proyeks: [],
            errors:null,
            id_user:this.$auth.user._id,
            id_proyek:null,
            tgl:null,
            nilai:null,
            image:null,
            desc:null
        }
    },
    mounted(){
        this.fetchParProyek()
    },
    methods: {
        async fetchParProyek(){
            const {data} = await this.$axios.get('/api/proyek')
            this.proyeks = data
        },
        submitForm(){
            this.image= "coba"
        this.$axios.post( '/api/rembes', {
                rembesuserid : this.id_user,
                rembesproid : this.id_proyek,
                rembestgl : this.tgl,
                rembesnilai : this.nilai,
                rembesimage : this.image,
                rembesdesc : this.desc,
            })
            .then((response) => {
            console.log(response)

            if(response.data._id){
                this.$router.push({ name:'rembes', params:{ created:'yes' } })
            }
            })
            .catch( (error) => {
            console.log(error)
            if(error.response.data.errors){
                this.errors = error.response.data.errors
            }
            });
        }
    },
    onFileChange() {
        let e = this;
      var files = e.$refs.file;
      if (!files.length)
        return;
      this.image = this.$refs.files[0]
    },
    
}
</script>