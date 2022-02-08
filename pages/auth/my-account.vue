<template>
<div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">My Account</h5>
            </div>
            <div class="p-5">
            <h4>{{ this.$auth.user.full_name }}</h4>
            <div class="mb-5"><strong>Email:</strong> {{ this.$auth.user.email }}</div>
            <nuxt-link to="/user/logout" class="btn btn-danger">Logout</nuxt-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
