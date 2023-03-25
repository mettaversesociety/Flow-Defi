<script setup>
import pfpPicker from '@/views/user-interface/PfPicker.vue'
</script>
<script>
export default {
  data() {
    return {
      dName: '',
      display1Name: '',
    }
  },
  mounted() {
    this.display1Name = localStorage.getItem('flowName') || ''
  },
  methods: {},
}
</script>
<template>
  <h2 class="mx-auto text-center mb-4">Account Settings</h2>
  <VCard max-width="800px" class="mx-auto text-center">
    <VCard-text>
      <pfpPicker :dName="dName"/>
    </VCard-text>
  </VCard>
</template>
