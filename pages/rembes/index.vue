<template>
   <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
       <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Rembes {{ user_rembes }}</h5>
                <nuxt-link to="/rembes/add" class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Tambah</nuxt-link>
            </div>
            <div class="p-5">
                <table class="w-full p-5 text-gray-700 ">
                    <thead>
                        <tr>
                            <th class="text-left text-blue-900">Tanggal</th>
                            <th class="text-left text-blue-900">Nilai</th>
                            <th class="text-left text-blue-900">Image</th>
                            <th class="text-left text-blue-900">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(item,index) in proyeks" :key="index">
                            <td>{{ item.rembestgl }}</td>
                            <td>{{ item.rembesnilai }}</td>
                            <td>{{ item.rembesimage }}</td>
                            <td>
                                <nuxt-link :to="'/parameter/' + item._id"
                                class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Info</nuxt-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="p-3">
                <button class=" ... " @click="prevPage" :disabled="pageNumber <= 1">Previous</button>
                <button class=" ... " @click="nextPage" :disabled="pageNumber >= proyeks.length">Next</button>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    // async asyncData(context){
    //     const {data} = await context.$axios.get('/api/proyek_limit/'+pageNumber)
    //     return {
    //     proyeks : data
    //     }
    // },
    data () {
        return {
            user_rembes: this.$auth.user.full_name,
            proyeks: [],
            isLoading: true,
            pageNumber: this.$route.query.page ? this.$route.query.page : 1,
            perPage: 10 // Jumlah artikel yang ditampilkan dalam satu halaman
        }
    },
    mounted(){
        this.fetchGrids()
    },
    methods: {
        async fetchGrids(){
            let pageNumber = this.$route.query.page ? this.$route.query.page : 1;
            // if pada statement ini berfungi untuk menghilangkan screen flicker saat mengunjungi antar halaman
            if (this.proyeks.length <= 0) this.isLoading = true
            const {data} = await this.$axios.get('/api/rembes_limit/'+pageNumber)
            this.proyeks = data.rembes
            this.pageNumber = data.totalPages
            this.isLoading = false
        },
        // Halaman sebelumnya
        prevPage () {
        this.pageNumber--
        this.configurePage()
        },

        // Halaman selanjutnya
        nextPage () {
        this.pageNumber++
        this.configurePage()
        },

        // Konfigurasi halaman
        configurePage () {
        this.$router.push({ query: { page: this.pageNumber } })
        this.fetchGrids()
        }
    }
}
</script>