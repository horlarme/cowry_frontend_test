<template>
  <div class="w-full h-full relative">
    <!-- Header -->
    <div class="w-full bg-ascent p-0 px-2 m-0">
      <!-- Header Container -->
      <div class="container mx-auto py-20">
        <!-- Search Value Component -->
        <p v-if="search.display" class="text-2xl text-gray-800 font-sans font-bold">
          Search Results for <span class="font-normal">&quot;{{ search.query }}&quot;</span>
        </p>
        <!-- Search Value Component -->
        <!-- Search Component -->
        <Search v-else @search="processSearch($event)"/>
        <!-- Search Component -->
      </div>
      <!-- Header Container -->
    </div>
    <!-- Header -->

    <!-- Result -->
    <div class="-mt-10 container mx-auto">

      <div class="w-full flex" v-if="fetching">
        <div class="md:w-1/3 p-2" v-for="i in 3" :key="i">
          <PhotoGridPlaceHolder class="w-full"/>
        </div>
      </div>
      <!-- Result Row -->
      <div v-else class="images">
        <!-- Result Image Component -->
        <PhotoGrid v-for="photo in photos" :photo="photo" :key="photo.id"
                   @click.native="displayModal(photo)"/>
        <!-- Result Image Component -->
      </div>
      <!-- Result Row -->
    </div>
    <!-- Result -->

    <!-- Modal -->
    <transition name="fade">
      <div class="w-full py-10 h-full absolute top-0 left-0"
           v-if="modal.display"
           style="background-color: rgba(0,0,0,.3)">
        <div class="text-gray-300 md:mr-20 mr-2 transform rotate-45 w-5 m-0 cursor-pointer absolute right-0"
             @click="closeModal">
          <PlusSVG class="w-5 h-5 fill-current"/>
        </div>
        <div class="modal-container">
          <img class="object-contain" :src="modal.photo.urls.full"/>

          <div class="p-10 py-5 w-full bg-white">
            <p class="text-base font-bold text-gray-800">{{ modal.photo.user.name }}</p>
            <p class="text-xs font-normal text-gray-600">{{ modal.photo.user.location }}</p>
          </div>
        </div>

      </div>
    </transition>
    <!-- Modal -->
  </div>
</template>

<script>
import PhotoGrid from '@/components/PhotoGrid'
import PhotoGridPlaceHolder from '@/components/PhotoGridPlaceHolder'
import Search from '@/components/Search'
import Axios from 'axios'
import PlusSVG from '@/components/svgs/PlusSVG'

export default {
  components: { PlusSVG, Search, PhotoGridPlaceHolder, PhotoGrid },
  layout: 'empty',
  data () {
    return {
      photos: [],
      fetching: true,
      modal: {
        display: false,
        photo: {}
      },
      search: {
        query: '',
        display: false,
      }
    }
  },
  mounted () {
    this.fetchRandomPhotos()
  },
  methods: {
    async request (path = '') {
      return Axios
          .get('https://api.unsplash.com/' + path, {
            headers: {
              'Accept-Version': 'v1',
              Authorization: 'Client-ID ' + process.env.VUE_APP_UNSPLASH_ACCESS
            }
          })
          .then(response => response.data)
    },
    fetchRandomPhotos () {
      this.request('search/photos?order_by=latest&query=African')
          .then(response => {
            this.photos.push(...response.results)
            this.fetching = false
          })
    },
    displayModal (photo) {
      this.modal.display = true
      this.$set(this.modal, 'photo', photo)
    },
    closeModal () {
      this.modal.display = false
      this.$set(this.modal, 'photo', {})
    },
    processSearch (value) {
      this.fetching = true
      this.search.query = value
      this.search.display = true
      this.request('search/photos?order_by=latest&query=' + value)
          .then(response => {
            this.photos.splice(0)
            this.photos.push(...response.results)
          })
          .finally(() => this.fetching = false)
    }
  }
}
</script>

<style>
.images {
  @apply gap-4 inline-block;
  column-count: 1px;
}

.modal-container{
  @apply rounded-lg mx-auto bg-white overflow-hidden;
  min-width: 320px;
  max-width: 95%
}

@media (min-width: 768px) {
  .images {
    column-count: 3;
  }

  .modal-container{
    max-width: 70%;
  }
}
</style>
