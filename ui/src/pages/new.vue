<script>
export default {
  data() {
    return {
      gameLeft: 3,
    }
  },
  mounted() {
    this.getGameLeft()
    this.resetScores()
  },
  methods: {
    getGameLeft() {
      this.gameLeft = 3
      console.log('getGameLeft')
    },
    resetScores() {
      localStorage.setItem('wins', 0)
      localStorage.setItem('draws', 0)
      localStorage.setItem('losses', 0)
    },
  },
}
</script>

<template>
  <VRow>
    <!-- basic -->
    <VCol cols="12">
      <VCard title="Basic">
        You have {{ gameLeft }} games left.
      </VCard>
    </VCol>
  </VRow>
</template>
