<template>
<div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Logout</h5>
            </div>
            <div class="p-5">
            <h1>Logging out</h1>
            <hr>
            <p>Please wait...</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
  middleware: 'auth',

  async asyncData(context){
    await context.$auth.logout()
  },
}
</script>
