<template>
<div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Login</h5>
            </div>
            <div class="p-5">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                action=""
                method="post"
                @submit.prevent="submitForm()">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                    :class="{ 'is-invalid': errors && errors.email }"
                    v-model="email">
                    <div class="text-red-500 text-xs italic" v-if="errors && errors.email">
                    {{ errors.email.msg }}
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
                    :class="{ 'is-invalid': errors && errors.password }"
                    v-model="password">
                    <div class="text-red-500 text-xs italic" v-if="errors && errors.password">
                    {{ errors.password.msg }}
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    middleware: 'auth',
    auth:'guest',
    data(){
        return{
            errors:null,
            login_error:null,
            email:null,
            password:null,
            status:null
        }
    },
    methods: {
        submitForm(){
            this.$auth.loginWith('local', {
            data: {
                email: this.email,
                password: this.password
            }
            })
            .catch( (error) => {
            console.log(error)
            if(error.response.data.message){
                this.login_error = error.response.data.message
            }
            })
        }
    }
}
</script>