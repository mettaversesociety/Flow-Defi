<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as fcl from "@onflow/fcl";
import * as t from '@onflow/types';

const api = "https://rest-mainnet.onflow.org";
fcl.config().put("accessNode.api", api);

// hard coded flovatar for demo
// switch back NFT catalog for production scripts in './cadence' to https://github.com/dapperlabs/nft-catalog
const Flovatar = `
        import Flovatar from 0x921ea449dffec68a

        pub fun main(address:Address) : [Flovatar.FlovatarData] {
            return Flovatar.getFlovatars(address: address)
        }
    `

const UFCstrike = `
  import NonFungibleToken from 0x1d7e57aa55817448
  import UFC_NFT from 0x329feb3ab062d289


  pub fun main(address: Address): [UInt64] {
      let account = getAccount(address)

      let collectionRef = account.getCapability(UFC_NFT.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>()
          ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs()
    }`

export default {
  name: 'pfpicker',
  props: {
    dName: String,
  },
  data() {
    return {
      startLogin: false,
      address: '',
      viewNFTS: false,
      nftList: [],
      loading: false,
      user: {
        name: this.dName,
        email: '',
        pfp: ''
      },
    }
  },
  mounted() {
    this.address = '0x2a0eccae942667be' // localStorage.getItem('flowAddress') || ''
    if (localStorage.getItem('flowName') || false) {
      this.user.name = localStorage.getItem('flowName') || ''
    }
    if (localStorage.getItem('flowEmail') || false) {
      this.user.email = localStorage.getItem('flowEmail') || ''
    }
    if (localStorage.getItem('flowPfp') || false) {
      this.user.pfp = localStorage.getItem('flowPfp') || ''
    }
    if (localStorage.getItem('fgtGuest') || false) {
      this.guest = localStorage.getItem('fgtGuest') || false
      this.user.pfp = localStorage.getItem('flowPfp') || '/defaultpfp.png'
    }

    this.cadence = Flovatar  // todo default, anddrop down to filter user's collection
    if (!this.user.pfp || !this.guest) {
      this.changePFP()
    }
  },
  methods: {
    changePFP() {
      this.viewNFTS = true
      if (!this.guest) {
        this.getNFTS(this.cadence)
      }
    },
    async getNFTS(cadenceQuery) {
      console.log('get Nfts')
      const idsResponse = await fcl.send([
        fcl.script`${cadenceQuery}`,
        fcl.args([fcl.arg(this.address, t.Address)]),
      ])
      this.nftList = await fcl.decode(idsResponse)
      console.log(this.nftList)
    },
    async linkAccount(credential) {
      await firebase.auth().currentUser.linkWithCredential(credential)
        .then((usercred) => {
          var user = usercred.user;
          console.log("Account linking success", user);
          this.loading = false
          window.location.href = '/play' // force page load to get localstorage
        }).catch((error) => {
          console.log("Account linking error", error);
          this.loading = false
          window.location.href = '/play' // force page load to get localstorage
        });
    },
    async save() {
      this.loading = true
      localStorage.setItem('flowName', this.user.name)
      localStorage.setItem('flowEmail', this.user.email)
      localStorage.setItem('flowPfp', this.user.pfp)
      const credential = await firebase.auth.EmailAuthProvider.credential(this.user.email, this.address);
      this.linkAccount(credential)
    },
    savePFP(url) {
      this.user.pfp = url
      console.log('savePFP')
      this.loading = true
      localStorage.setItem('flowName', this.user.name)
      localStorage.setItem('flowEmail', this.user.email)
      localStorage.setItem('flowPfp', this.user.pfp)
      this.viewNFTS = false
      this.loading = false
    },
  }
}
</script>
<template>
  <div id="pfppicker" class="text-center mx-auto">
    <div v-if="user.pfp">
      <h2 class="text-center ma-4"> Your PFP / Character</h2>
      <VAvatar
        size="100%"
        class="avatar-center mx-auto text-center ma-4 mt-0 pt-0 elevation-8"
        :image="user.pfp"
        variant="elevated"
        style="max-width: 130px"
      />
      <br>
      <v-btn color="info" @click="changePFP" class="mb-4">Change</v-btn>
    </div>
    <h2 v-else class="text-center ma-4"> Choose PFP / Character</h2>
    <v-chip>Flow Address: {{ address || 'Guest' }}</v-chip>
    <br>
    <v-sheet
      v-if="viewNFTS"
      class="mx-auto ma-5"
      max-width="800"
    >
      <v-slide-group
        show-arrows
      >
        <v-slide-group-item
          v-for="item in nftList"
          :key="item.id"
        >
          <div class="mx-auto">
            <VAvatar
              @click="savePFP(`https://flovatar.com/api/image/${item.id}`)"
              size="70"
              class="avatar-center mx-auto text-center ma-0 elevation-8"
              :image="`https://flovatar.com/api/image/${item.id}`"
              variant="elevated"
            />
            <v-list-item
            >
              <v-chip size="small">{{ item.id }}</v-chip>
            </v-list-item>
          </div>

        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <VTextField
      class="mx-auto text-center d-block ma-2 mt-4"
      style="max-width:200px;"
      v-model="user.name"
      label="Display Name"></VTextField>


    <v-text-field
      class="mx-auto text-center d-block ma-2"
      style="max-width:200px;"
      v-model="user.email"
      label="Email"></v-text-field>
    <p class="text-xs ml-5 text-center text-muted">Add your email so we can contact you for prizes.</p>
    <div class="text-center mx-auto mt-6">
      <VBtn @click="save" :loading="loading" size="large">Save</VBtn>
    </div>
  </div>
</template>
