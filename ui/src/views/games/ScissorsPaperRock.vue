# Based off https://github.com/carla-ng/vue-rock-paper-scissors
<script setup>
import {ref, computed, onMounted} from 'vue';


const wins = ref(0)
const draws = ref(0)
const losses = ref(0)

const choice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)

const outcomes = {
  'rock': {
    'rock': 'draw',
    'paper': 'loss',
    'scissors': 'win'
  },
  'paper': {
    'rock': 'win',
    'paper': 'draw',
    'scissors': 'loss'
  },
  'scissors': {
    'rock': 'loss',
    'paper': 'win',
    'scissors': 'draw'
  }
}


// Main game functionality
const play = c => {
  choice.value = c

  const choices = ['rock', 'paper', 'scissors']
  const random = Math.floor(Math.random() * choices.length)

  computerChoice.value = choices[random]
  const outcome = outcomes[choice.value][computerChoice.value]

  if (outcome === 'win') {
    wins.value++
    verdict.value = 'win'
  } else if (outcome === 'loss') {
    losses.value++
    verdict.value = 'loss'
  } else {
    draws.value++
    verdict.value = 'draw'
  }

  saveGame()
}


// Get percentage of wins
const winPercentage = computed(() => {
  const total = wins.value + draws.value + losses.value
  return total ? (wins.value / total) * 100 : 0
})


// Save game in localStorage
const saveGame = () => {
  localStorage.setItem('wins', wins.value)
  localStorage.setItem('draws', draws.value)
  localStorage.setItem('losses', losses.value)
}


// Load saved game from localStorage
const loadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins')) || 0
  draws.value = parseInt(localStorage.getItem('draws')) || 0
  losses.value = parseInt(localStorage.getItem('losses')) || 0
}


// Remove data from localStorage
const resetValues = () => {
  wins.value = 0
  draws.value = 0
  losses.value = 0

  saveGame()
  resetRound()
}


// Reset round
const resetRound = () => {
  choice.value = null
  computerChoice.value = null
  verdict.value = null
}


// Load game
onMounted(() => {
  loadGame()
})

</script>
<script>
export default {
  name: "SPR",
  emits: ['newRound'],
  props: ['display1Name', 'display2Name', 'player1Address', 'player2Address', 'admin'],
  methods: {
    nextRound(round) {
      localStorage.setItem('fgtCurrentRound', round)
      localStorage.getItem('fgtCurrentRound') || 1
      console.log("round", round)
      this.$emit("newRound", round)
    }
  }
}
</script>
<style>
img.spr {
  max-width: 100%;
}
</style>

<template>
  <div class="mx-auto text-center">
    <h2>
      Rock, Paper, Scissors
    </h2>
  </div>
  <VRow>
    <VCol
      cols="12"
      md="12"
      class="text-center mx-auto"
    >
      <div class="text-gray-600 text-center mx-auto">

        <main class="container mx-auto sbr-con">
          <div v-if="wins>=1" class="ma-4">
            <h3 class="text-success">Great, you won the round! 🏅 You're progressing to round 2!</h3>
            <VBtn color="success" class="ma-4" @click="nextRound(2)">Play round 2: Cooking</VBtn>
          </div>
          <div v-else-if="losses >=1">
            <h3 class="text-error">To bad, so sad! 😔</h3>
            <p>You got out foxed 🦊 this time.</p>
            <VBtn color="success" class="ma-4" @click="nextRound(2)">Play round 2: Cooking</VBtn>
          </div>
          <div v-else>
            <div v-if="choice === null" class="text-lg mb-2 text-center mx-auto">
              <p clsss="ma-0 pa-0">Tap your choice, winner decides who play's first:</p>
            </div>

            <div v-if="choice === null" class="flex items-center justify-center">
              <VRow>
                <VCol
                  cols="4"
                  md="4"
                  class="text-center mx-auto"
                >
                  <button
                    @click="play('rock')"
                    class="bg-white rounded-lg shadow-lg w-64 md:p-12 mx-6 transition-colors duration-300
                hover:bg-pink-500">

                    <img src="@/assets/images/games/spr/rock.png" alt="Rock" class="spr"/>
                  </button>
                </VCol>
                <VCol
                  cols="4"
                  md="4"
                  class="text-center mx-auto"
                >
                  <button
                    @click="play('paper')"
                    class="bg-white rounded-lg shadow-lg w-64 md:p-12 mx-6 transition-colors duration-300 hover:bg-green-500">

                    <img src="@/assets/images/games/spr/paper.png" alt="Paper" class="spr">
                  </button>
                </VCol>
                <VCol
                  cols="4"
                  md="4"
                  class="text-center mx-auto"
                >
                  <button
                    @click="play('scissors')"
                    class="bg-white rounded-lg shadow-lg w-64 md:p-12 mx-6 transition-colors duration-300 hover:bg-yellow-500">

                    <img src="@/assets/images/games/spr/scissors.png" alt="Scissors" class="spr">
                  </button>
                </VCol>
              </VRow>
            </div>

            <div v-else>
              <div class="text-2xl mb-2 mt-4  text-capitalize">
                You picked <span class="text-pink-500">{{ choice }}. {{ display2Name }} picked <span
                class="text-green-500">{{ computerChoice }}</span>.</span>.
              </div>

              <div class="text-5xl mb-5">
                <v-chip v-if="verdict=='win'" size="large" color="success">Your Won! 🎉</v-chip>
                <v-chip v-if="verdict=='loss'" size="large" color="error">You Lost 😔</v-chip>
                <v-chip v-if="verdict=='draw'" size="large" color="info">Draw! ⚖️</v-chip>
              </div>

              <VBtn v-if="wins<=3 || losses<=3" color="primary" dark large
                    @click="resetRound" class="bg-pink-500 rounded text-lg py-2 px-4 hover:bg-pink-400">Play
                again
              </VBtn>
            </div>

            <VDivider class="my-6"/>
            <div class="mt-20 text-2xl mb-4">
              <v-chip color="success" size="large"><span class="font-bold">Wins:</span> {{ wins }}</v-chip>
              <v-chip color="info" size="large" class="mx-4"><span class="font-bold">Draws:</span> {{ draws }}</v-chip>
              <v-chip color="error" size="large"><span class="font-bold">Losses:</span> {{ losses }}</v-chip>
            </div>

            <VDivider class="my-6"/>
            <VBtn v-if="wins<=3" disabled color="default" variant="tonal" class="mb-4">Next Game: Cooking</VBtn>
          </div>
          <div v-if="admin">
            <div class="text-lg">
              Win rate: {{ Math.round(winPercentage) }}%
            </div>


            <br>

            <button
              @click="resetValues"
              class="bg-pink-500 rounded text-lg mt-6 py-2 px-4 hover:bg-pink-400">
              Reset game
            </button>

          </div>


        </main>

      </div>
    </VCol>
  </VRow>

</template>

