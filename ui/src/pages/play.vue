<script setup>
import pfpPicker from '@/views/user-interface/PfPicker.vue'
import playerProfile from '@/views/games/PlayerProfile.vue'
import spr from '@/views/games/ScissorsPaperRock.vue'
import cookingBurger from '@/views/games/CookingBurger.vue'
import tower from '@/views/games/TowerGame.vue'
import rabbit from '@/views/games/RabbitRun.vue'
import muso from '@/views/games/MusoMadness.vue'
import farmlife from '@/views/games/FarmLife.vue'
import flowviator from '@/views/games/FlowViator.vue'
import memorymuse from '@/views/games/MemoryMuse.vue'
import flowracer from '@/views/games/FlowRacer.vue'
import {uniqueNamesGenerator, adjectives, animals} from 'unique-names-generator';
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'
import MemoryMuse from "@/views/games/MemoryMuse.vue";
import FlowViator from "@/views/games/FlowViator.vue";
</script>
<script>
export default {
  name: "PlayComponent",
  components: {
    pfpPicker
  },
  setup() {
    const title = ref("");
    const changeRound = (round) => {
      console.log("fire")
      this.currentRound = round;
    };
    return {round, changeRound};
  },
  data() {
    return {
      match: false,
      pfp1: '',
      dName: '',
      display1Name: '',
      display2Name: '',
      player1Address: 'test1',
      player2Address: 'test2',
      admin: false,
      currentRound: 1,
      showNameDialog: false,
      isMobile: true,
      timerCount: 60,
      timeLeft: 'high',
      resetAllowed: true,
      showTimeup: false,
      showNext: false,
    }
  },
  mounted() {
    this.checkIsMobile()
    this.player1Address = localStorage.getItem('flowAddress') || ''
    this.display1Name = localStorage.getItem('flowName') || ''
    this.pfp1 = localStorage.getItem('flowPfp') || ''
    this.guest = localStorage.getItem('fgtGuest') || ''
    if (this.player1Address || this.guest) {
      this.getMatch()
    } else {
      this.$router.push('/login')
    }
    if (!this.display1Name || !this.pfp1) {
      this.showNameDialog = true
    }
    this.currentRound = localStorage.getItem('fgtCurrentRound') || 1
    if (this.currentRound == undefined) {
      localStorage.setItem('fgtCurrentRound', 1)
      this.currentRound = 1
    }

    var eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent"
      ? "onmessage"
      : "message";

    const $this = this
    eventer(messageEvent, function (e) {
      console.log(e)
      if (e.data.name === "gameEvent" || e.message === "gameEvent") {
        console.log('Game Finished');
        if (e.data.nextRound) {
          $this.timerCount = 60
          $this.setNextRound(e.data.nextRound)
        } else {
          if (e.data?.resetTime) {
            console.log('reset time');
            if (e.data?.addTime) {
              $this.timerCount = $this.timerCount + e.data?.addTime
            } else {
              $this.timerCount = 60
            }
          }
        }
      }
    })
  },
  methods: {
    checkIsMobile() {
      if (window.innerWidth > 600) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    },
    skipRound() {
      this.currentRound += 1
      this.resetGame(true)
    },
    resetGame(reload = true) {
      if (reload) {
        const iframe = document.getElementById('gameIframe')
        if (iframe?.src) {
          document.getElementById('gameIframe').contentWindow.location.reload();
        }
      }
      this.showNext = false
      this.showTimeup = false
      this.timerCount = 60
    },
    resetGameAll() {
      localStorage.setItem('wins', '')
      localStorage.setItem('draws', '')
      localStorage.setItem('losses', '')
      localStorage.setItem('score', '')
      localStorage.setItem('fgtCurrentRound', '')
      window.location.href = '/play' // force page load to get localstorage
    },
    setNextRound(round) {
      this.timerCount = this.timerCount + 60
      localStorage.setItem('fgtCurrentRound', round)
      this.currentRound = round
      console.log(this.currentRound);
      this.showNext = true
    },
    getMatch() {
      //todo: get match from server
      setTimeout(() => {
        this.match = true
      }, 3000)
      console.log('getMatch')
      if (!this.display1Name && !this.dName) {
        this.dName = uniqueNamesGenerator({
          dictionaries: [adjectives, animals]
        }).replace('_', ' ')
      }
      if (!this.display2Name) {
        this.display2Name = uniqueNamesGenerator({
          dictionaries: [adjectives, animals]
        }).replace('_', ' ')
      }
    },
  },
  watch: {
    currentRound: {
      handler(value) {
        console.log(value)
        this.timeLeft = this.timeLeft + 60

      }
      ,
      immediate: true // This ensures the watcher is triggered upon creation
    },


    timerCount: {
      handler(value) {

        if (value > 0) {
          setTimeout(() => {
            if (value == 0) {
              this.timeLeft = ''
            } else if (value > 15) {
              this.timeLeft = 'high'
            } else if (value > 5) {
              this.timeLeft = 'mid'
            } else if (value < 5) {
              this.timeLeft = 'low'
            }
            this.timerCount--;
          }, 1000);
        } else {
          this.timerCount = 0
          this.timeLeft = ''
          this.showTimeup = true
        }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    }

  }
}
</script>

<template>

  <div>
    <v-layout class="py-4 my-4 mt-0 pt-0" style="height: 40px;">
      <v-system-bar color="primary" style="height: 40px; border-radius: 4px">
        <div>
          Lives:
          <v-icon icon="mdi-heart-outline"></v-icon>
          <v-icon icon="mdi-heart-outline"></v-icon>
          <v-icon icon="mdi-heart-outline"></v-icon>
          <span class="ml-1">Status:</span>
          <v-chip size="x-small">In Progress</v-chip>
          <span class="ml-1">Round:</span>
          <v-chip size="x-small" class="ml-1">
            <v-icon v-if="currentRound<2" icon="mdi-signal-cellular-outline"></v-icon>
            <v-icon v-else-if="currentRound<3" icon="mdi-signal-cellular-1"></v-icon>
            <v-icon v-else-if="currentRound<6" icon="mdi-signal-cellular-2"></v-icon>
            <v-icon v-else-if="currentRound<11" icon="mdi-signal-cellular-3"></v-icon>
            <v-icon v-else icon="mdi-signal-cellular-outline"></v-icon>
            <span class="ml-1">{{ currentRound }}/10</span>
          </v-chip>
        </div>

      </v-system-bar>
    </v-layout>
  </div>
  <VRow class="match-height">
    <VCol
      cols="6"
      md="3"
      xs="6"
    >
      <playerProfile @click="showNameDialog=!showNameDialog" class="player1main" :you="true" :displayName="display1Name"
                     :displayAddress="player1Address"/>
    </VCol>
    <VCol cols="12" xs="12" md="6" lg="6" id="gameDiv" class="order-last">
      <VCard class="bg-white pa-4 ma-0">
        <div v-if="!match">
          <div class="text-center mx-auto match-height" v-if="!match">
            <h2>
              <VIcon
                start
                icon="mdi-account-search"
              />
              Match Making...
            </h2>
            <VProgress-circular
              class="mt-4"
              indeterminate
              color="primary"
            ></VProgress-circular>
          </div>
          <h3 class="text-center ma-2 mb-6">Finding a worthy adversary...</h3>
          <p class="text-center text-sm text-muted ma-1">If no opponent is found you will be matched with computer
            player.</p>
          <p class="text-center text-sm text-muted ma-1">Computer players use PFP NFTs from the pool of real
            players.<br>(In
            the future
            this will be limited to those being 'lent' out to FGT).</p>
        </div>
        <div v-else>
          <div>
            <v-chip size="large" color="primary">Round {{ currentRound }}</v-chip>
            <v-chip class="float-right timer" :class="timeLeft">{{ timerCount }}</v-chip>
          </div>
          <div v-if=" !currentRound || currentRound==1 || currentRound===undefined">
            <spr :display2Name="display2Name" :admin="admin" @newRound="(i) => currentRound = i"/>
          </div>
          <div v-if="currentRound==2">
            <cookingBurger :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==3">
            <tower :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==4">
            <rabbit :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==5">
            <muso :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==6">
            <farmlife :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==7">
            <flowviator :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==8">
            <memorymuse :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==9">
            <flowracer :display2Name="display2Name" :admin="admin" :key="currentRound "/>
          </div>
          <div v-if="currentRound==10">
            Finished!!
          </div>
        </div>
        <div v-if="match" class="mx-auto ma-1 text-center d-block">

          <VBtn v-if="resetAllowed" @click="skipRound()" color="default" size="small" class="mr-2">Skip Round</VBtn>
          <VBtn v-if="resetAllowed" @click="resetGame()" color="default" size="small" class="mr-2">Retry Round</VBtn>
          <VBtn v-if="resetAllowed" @click="resetGameAll()" color="default" size="small" class="ml-2">Reset All Scores
          </VBtn>
        </div>
      </VCard>
    </VCol>

    <VCol
      cols="6"
      md="3"
      xs="6"
      class="order-md-last"
    >
      <playerProfile class="player2main" :class="{nomatch:!match}" :you="false" :displayName="display2Name"
                     :displayAddress="player2Address"/>
    </VCol>
  </VRow>
  <VRow class="match-height plants" v-if="match">
    <VCol cols="0" md="1" lg="1" xs="0"></VCol>
    <VCol
      cols="6"
      md="2"
      xs="6"
    >
      <VImg
        class="auth-footer-start-tree d-none d-md-block mt-10"
        :src="authV1Tree"
        :width="250"
      />
    </VCol>
    <VCol cols="12" xs="12" md="6" lg="6" id="gameDiv" class="order-last">
    </VCol>

    <VCol
      cols="6"
      md="2"
      xs="6"
      class="order-md-last"
    >
      <VImg
        class="auth-footer-start-tree d-none d-md-block mt-10"
        :src="authV1Tree2"
        :width="250"
      />
    </VCol>
  </VRow>

  <VDialog
    v-model="showNext"
    max-width="80%"
    width="300px"
    :close-on-back="false"
    :close-on-content-click="false"
  >
    <VCard>
      <VCard-text>
        <div class="text-center mx-auto">
          <h4>Congrats you completed round {{ currentRound - 1 }}!</h4>
          <h1>🎉</h1><br>
          <VBtn @click="resetGame(false)" color="success">Continue</VBtn>
        </div>
      </VCard-text>
    </VCard>
  </VDialog>
  <VDialog
    v-model="showTimeup"
    width="300px"
    max-width="80%"
    :close-on-back="false"
    :close-on-content-click="false"
  >
    <VCard>
      <VCard-text>
        <div class="text-center mx-auto">
          <h4>Oh no too slow!</h4>
          <h1>🐌</h1><br>
          <VBtn @click="resetGame()">Retry</VBtn>
        </div>
      </VCard-text>
    </VCard>
  </VDialog>

  <VDialog
    v-model="showNameDialog"
    width="800px"
    max-width="80%"
  >
    <VCard>
      <VCard-text>
        <pfpPicker :dName="dName"/>
      </VCard-text>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

.nomatch {
  animation: animName 0.5s linear infinite;
  filter: blur(10px);
}

@keyframes animName {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

iframe#gameIframe {
  border-radius: 4px !important;
}

.timer.high {
  border: 2px solid #56ca00;
  background: #edf8e7;
  opacity: 0.7;
}

.timer.mid {
  border: 2px solid #4588d3 !important;
  background: #cfe4ee !important;
  opacity: 0.6;
}

.timer.low {
  border: 2px solid #ca6363 !important;
  background: #f3f8fa !important;
  opacity: 0.7;
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
