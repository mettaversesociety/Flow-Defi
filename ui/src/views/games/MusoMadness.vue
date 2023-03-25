<script>

export default {
  props: ['display1Name', 'display2Name', 'player1Address', 'player2Address', 'admin'],
  data() {
    return {
      gameName: false,
      gameTitle: 'Muso Madness',
      gameDesc: 'Hit drums, make music, best beat in 30 seconds wins.',
      currentRound: 4,
      won: false,
      scoreToBeat: 10,
      currentScore: 0,
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
    <div class="controls text-xs d-none">Kick: b, Snare: g, Hihat: h, Open/Close Hihat: j, Crash: k</div>
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
                  src="/games/MusoMadness/index.html"></iframe>
        </main>

      </div>
    </VCol>
  </VRow>

</template>

