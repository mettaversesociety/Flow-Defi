<script>
import avatar4 from "@/assets/images/avatars/avatar-4.png";
import avatar5 from "@/assets/images/avatars/avatar-5.png";
import avatar6 from "@/assets/images/avatars/avatar-6.png";
import avatar1 from "@/assets/images/avatars/avatar-1.png";
import avatar2 from "@/assets/images/avatars/avatar-2.png";
import avatar3 from "@/assets/images/avatars/avatar-3.png";
import fvsocks from "@/assets/images/avatars/fvsocks.png";

export default {
  props: ['you', 'displayAddress', 'displayName'],
  data() {
    return {
      cardBg1: 'https://source.unsplash.com/300x150/?abstract green',
      avatarBg1: 'https://source.unsplash.com/300x150/?abstract green',
      cardBg2: '',
      rating: false,
      avatars: [],
      nftBooster1: [avatar1,
        avatar2,
        avatar3,
        fvsocks
      ],
      nftBooster2: [
        avatar4,
        avatar5,
        avatar6,
      ],
      user: {
        name: '',
        pfp: `https://flovatar.com/api/image/${Math.floor(1000 + Math.random() * 3000)}`,
      },
    }
  },
  mounted() {
    if (this.you) {
      this.avatars = this.nftBooster1
      if (localStorage.getItem('flowPfp') || false) {
        this.user.pfp = localStorage.getItem('flowPfp')
      }
    } else {
      this.avatars = this.nftBooster2
      this.cardBg2 = 'https://source.unsplash.com/300x150/?abstract blue'
    }
  },
  methods: {}
}
</script>
<template>
  <div>
    <VCard class="mt-3">
      <VImg v-if="you" :src="cardBg1"/>
      <VImg v-else :src="cardBg2"/>
      <div class="pfp mx-4 mb-1 pb-1 mx-auto text-center">
        <VAvatar
          size="100%"
          class="avatar-center mx-auto text-center mt-5 elevation-8 bg-white bg-1 pa-2"
          :class="{'p1': you, 'p2': !you}"
          :image="user.pfp"
          variant="elevated"
          style="max-width: 130px; cursor: pointer;"
        />
      </div>
      <h5 class="text-center mx-auto text-white" v-if="you">
        Player 1 (You)
      </h5>
      <h5 class="text-center mx-auto text-white" v-else>
        Player 2
      </h5>
      <h4 class="pa-2 pb-0 mb-0 text-sm text-capitalize font-weight-semibold text-center" v-if="displayName">
        <v-chip v-if="you" size="large" color="success">{{ displayName }}</v-chip>
        <v-chip v-else size="large" color="info">{{ displayName }}</v-chip>
      </h4>
      <div class="mx-auto text-center d-none">
        <v-chip size="small" outlined class="mx-2 mt-2 mb-0 pb-0">{{ displayAddress || 'Guest' }}</v-chip>
      </div>
      <VCardText class="position-relative mt-0 pt-1">
        <div v-if="rating">
          <VRating
            :model-value="5"
            readonly
            class="me-2"
            density="compact"
          />
        </div>

        <div class="mt-1 pt-0 mx-auto">
          <p class="font-weight-medium text-center text-white">Boosters</p>
          <div class="pfp-a v-avatar-group mx-auto text-center mt-0">
            <VAvatar
              class="ma-1"
              v-for="avatar in avatars"
              :key="avatar"
              :image="avatar"
              size="45"
            />
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
<style>
.pfp img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  display: block;
}

.pfp {
  position: relative;
  margin-top: -85px !important;
}

.pfp .v-avatar {
  min-height: 50px;
  min-width: 50px;
}

.pfp .avatar-center.p2 {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.bg-white.bg-1.p2 {
  background-color: #e8f6ff !important;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3da10f", endColorstr="#18fc09", GradientType=1);
  box-shadow: 0px 0px 2px #47525d !important;
}

.bg-white.bg-1 {
  background-color: #edf8e7 !important;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#3da10f", endColorstr="#18fc09", GradientType=1);
  box-shadow: 0px 0px 2px #47525d !important;
}

.pfp-a.v-avatar-group {
  max-width: 130px;
  display: flex;
}


.pfp-a.v-avatar-group .v-avatar--density-default.rounded-circle {
  margin-right: -27px !important;
}
</style>

