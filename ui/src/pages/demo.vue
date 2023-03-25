<script>
import {VueperSlides, VueperSlide} from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'PitchAndDemo',
  components: {VueperSlides, VueperSlide},
  data: () => ({
    pdf: '/FGT-Pitch.pdf',
    slides: [
      {
        image: require('@/assets/images/pitch/pitch-1.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-2.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-3.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-4.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-5.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-7.jpg'),
      },
      {
        video: {
          mp4: require('@/assets/images/pitch/video.mp4'),
          props: {autoplay: false, loop: false, controls: true, muted: false}
        },
      },
      {
        image: require('@/assets/images/pitch/pitch-6.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-8.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-9.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-10.jpg'),
      },
      {
        image: require('@/assets/images/pitch/pitch-11.jpg'),
      },
    ],
  }),
  methods: {
    changeSlide(sindex) {
      console.log(sindex)
      this.$refs.vueperslides.goToSlide(sindex)
    },
  },
}
</script>

<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <h2 class="text-white">Pitch and Demo</h2>
      <v-sheet
        class="mx-auto ma-5"
        max-width="800px"
      >

        <vueper-slides :slide-ratio="5 / 9" infinite="false" ref="vueperslides" fade>
          <template #arrow-left>
            <h1 class="text-white mr-10"><i class="mdi mdi-arrow-left-bold-outline"/></h1>
          </template>
          <template #arrow-right>
            <h1 class="text-white"><i class="mdi mdi-arrow-right-bold-outline"/></h1>
          </template>
          <vueper-slide
            v-for="(slide, i) in slides"
            :key="i"
            :image="slide.image"
            :video="slide.video">
          </vueper-slide>
        </vueper-slides>
      </v-sheet>
      <div class="mx-auto text-center">
        <v-btn class="mx-auto text-center mt-8 mr-2" color="primary" @click="changeSlide(6)">View Demo Video</v-btn>
        <v-btn class="mx-auto text-center mt-8 ml-2" color="default"><a
          :href="pdf" target="_blank">View PDF Version</a></v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<style>
.vueperslides__bullets {
  bottom: -50px;
}

video.vueperslide__video {
  width: 100%;
  height: 100%;
}

.vueperslides__bullet .default {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: none;
  transition: 0.3s;
  width: 28px;
  height: 15px;
  margin: -8px;
}

.vueperslides__bullet--active .default {
  background-color: #d509ec;
  color: #fff;
}

.vueperslides__bullet .default span {
  display: block;
}

.vueperslides__bullet span {
  display: block;
  color: #fff;
  font-size: 10px;
  opacity: 0.8;
}

.vueperslides__arrow--prev, .vueperslides--rtl .vueperslides__arrow--next {
  right: auto;
  left: -1.0em;
  font-size: 20px !important;
}

.vueperslides__arrow--next, .vueperslides--rtl .vueperslides__arrow--right {
  left: auto;
  right: -1.0em;
  font-size: 20px !important;
}

</style>
