<script>
export default {
  props: ['display1Name', 'display2Name', 'player1Address', 'player2Address', 'admin'],
  data() {
    return {
      gameName: false,
      gameTitle: '',
      currentRound: 2,
      won: false,
    }
  },
  methods: {
    nextRound(round) {
      localStorage.setItem('fgtCurrentRound', round)
    }
  }
}
</script>
<style>
iframe#gameIframe {
  border-radius: 4px !important;
}
</style>

<template>
  <div class="mx-auto text-center">
    <h2>
      {{ gameTitle }}
    </h2>
  </div>
  <VRow>
    <VCol
      cols="12"
      md="12"
      class="text-center mx-auto"
    >
      <div class="text-gray-600 text-center mx-auto">

        <main class="container mx-auto">
          game here
        </main>

      </div>
    </VCol>
  </VRow>

</template>

