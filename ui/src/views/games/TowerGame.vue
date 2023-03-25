<script>

export default {
  props: ['display1Name', 'display2Name', 'player1Address', 'player2Address', 'admin'],
  data() {
    return {
      gameName: false,
      gameTitle: 'Tower of Torment',
      gameDesc: 'Build the highest tower of blocks, 1st to score 12 points wins',
      currentRound: 2,
      won: false,
    }
  },
  methods: {
    nextRound(round) {
      localStorage.setItem('fgtCurrentRound', round)
    },
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
    <p>{{ gameDesc }}</p>
  </div>
  <VRow>
    <VCol
      cols="12"
      md="12"
      class="text-center mx-auto"
    >
      <div class="text-gray-600 text-center mx-auto mt-3">

        <main class="container mx-auto">
          <iframe id="gameIframe" width="100%" height="540px" frameborder="0" scrolling="no"
                  src="/games/TowerGame/index.html"></iframe>
        </main>

      </div>
    </VCol>
  </VRow>

</template>

