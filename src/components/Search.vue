<template>
  <form @submit="$emit('search', value)">
    <div class="px-3 py-2 rounded shadow flex items-center bg-white">
      <SearchSVG/>
      <input type="text" v-model="value"
             class="p-0 m-0 ml-4 text-grey-700 outline-none border-0 flex-grow placeholder-black"
             placeholder="Search for photo"/>
    </div>
  </form>
</template>

<script>
import SearchSVG from '@/components/svgs/SearchSVG'

export default {
  components: { SearchSVG },
  data: () => ({
    value: ''
  }),
}
</script>
