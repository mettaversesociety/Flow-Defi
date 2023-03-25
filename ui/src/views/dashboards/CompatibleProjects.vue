<template>
  <VRow>
    <VCol>
      <div class="text-center mx-auto">
        <h4 class="text-center mx-auto mb-1 mt-2 text-white">Compatible Projects</h4>
        <v-btn class="ma-2 mb-5" color="default" to="/contact-us">Add your project</v-btn>
      </div>
      <VImg class="text-center mx-auto" :src="require('@/assets/images/landingpage/compatible.png')"
            style="max-width: 450px">
      </VImg>
    </VCol>
  </VRow>
</template>
