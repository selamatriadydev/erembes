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
                            v-model="rembesproid">
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
                            :class="{ 'is-invalid': errors && errors.rembestgl }"
                            v-model="rembestgl">
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembestgl">
                                {{ errors.rembestgl.msg }}
                            </p>
                            {{ rembestgl }}
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                Gambar
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                            type="file" placeholder="" 
                            :class="{ 'is-invalid': errors && errors.rembesimage }"
                            ref="image"
                            name="image"
                            accept="image/*"
                            @change="imageSelected">
                            <img class="object-fill h-20 w-50" :src="rembesimageurl">
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
                            v-model="rembesnilai"
                            :class="{ 'is-invalid': errors && errors.rembesnilai }">
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
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                            type="text" placeholder="" 
                            v-model="rembesdesc"
                            :class="{ 'is-invalid': errors && errors.rembesdesc }">
                            <p class="text-red-500 text-xs italic" v-if="errors && errors.rembesdesc">
                                {{ errors.rembesdesc.msg }}
                            </p>
                        </div>
                    </div>
                    <div class="md:flex md:items-center">
                        <div class="md:w-1/3">
                        <nuxt-link to="/rembes" class="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
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
        async asyncData(context){
            const {data} = await context.$axios.get('/api/rembes/' + context.route.params.id)
            return {
                proyek : data
            }
        },
    data(){
        return{
            user_rembes: this.$auth.user.full_name,
            errors:null,
            proyeks:[],
            rembesuserid:null,
            rembesproid:null,
            rembestgl:null,
            rembesnilai:null,
            rembesimage:null,
            rembesimageurl:null,
            rembesdesc:null,
            image:null,
        }
    },
    mounted(){
        this.fetchParProyek(),
        this.fillFormData()
    },
    methods: {
        fillFormData(){
            let tgl = this.proyek.rembestgl;
            let tgl_replace = this.$dateFns.format(tgl, 'mm/dd/yyyy');
            this.rembesuserid=this.proyek.rembesuserid;
            this.rembesproid=this.proyek.rembesproid;
            this.rembestgl=tgl_replace;
            this.rembesnilai=this.proyek.rembesnilai;
            this.rembesimage=this.proyek.rembesimage;
            this.rembesimageurl=this.proyek.rembesimageurl;
            this.rembesdesc=this.proyek.rembesdesc;
        },
        async fetchParProyek(){
            const {data} = await this.$axios.get('/api/proyek')
            this.proyeks = data
        },
        imageSelected(e) {
            this.$emit('input', e.target.files[0]);
            this.image = this.$refs.image.files[0];
            this.rembesimage = this.image.name;
            // console.log(this.image)
        },
        async submitForm(){
            if(this.image !== null && this.image.name.length){
                this.upload_photo();
            }
            this.$axios.put( '/api/rembes/'+ this.$route.params.id, {
                    rembesuserid : this.rembesuserid,
                    rembesproid : this.rembesproid,
                    rembestgl : this.rembestgl,
                    rembesnilai : this.rembesnilai,
                    rembesimage : this.rembesimage,
                    rembesdesc : this.rembesdesc,
                })
                .then((response) => {
                // console.log(response)

                if(response.data._id){
                    this.$router.push({ name:'rembes', params:{ created:'yes' } })
                }
                })
                .catch( (error) => {
                // console.log(error)
                if(error.response.data.errors){
                    this.errors = error.response.data.errors
                }
                });
            },
            async upload_photo() {
              let rembesfile = new FormData()
              rembesfile.append('rembesfile',  this.image)
              let url = '/api/rembes_upload'
              let config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
              }
              await this.$axios({
              	method: 'post',
              	url: url,
              	data:  rembesfile,
              	config: config
              })
            }
    },
    
    
}
</script>