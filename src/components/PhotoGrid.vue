<template>
  <div class="rounded relative cursor-pointer p-2">
    <img class="bg-gray-300 rounded w-full" :src="photo.urls.small"/>
    <div class="absolute h-full w-full top-0 p-2 left-0 rounded">
      <div class="h-full w-full flex flex-col rounded justify-end px-4 pb-4"
           style="background-image: linear-gradient(to bottom,transparent, rgba(0,0,0,0.4) 80%)">
        <p class="text-white font-normal font-sans text-base" v-text="photo.user.name"/>
        <p class="text-white font-light text-xs" v-text="photo.user.location"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  props: ['photo']
}
</script>
