<script>

export default {
  props: ['display1Name', 'display2Name', 'player1Address', 'player2Address', 'admin'],
  data() {
    return {
      gameName: false,
      gameTitle: 'Rabbit Run',
      gameDesc: 'Eat Carrots, but don\'t get eaten, avoid the hedgehogs. Click to jump. 200pts for the win.',
      currentRound: 4,
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
    <p>{{gameDesc}}</p>
  </div>
  <VRow>
    <VCol
      cols="12"
      md="12"
      class="text-center mx-auto"
    >
      <div class="text-gray-600 text-center mx-auto mt-3">

        <main class="container mx-auto">
          <iframe  id="gameIframe" width="100%" height="540px" frameborder="0" scrolling="no"
                  src="/games/RabbitRun/index.html"></iframe>
        </main>

      </div>
    </VCol>
  </VRow>

</template>

