<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import upgradeBanner from '@/assets/images/pro/upgrade-banner-dark.png'

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}
</script>
<script>
export default {
  data: () => ({
    drawer: false,
    isMobile: true,
    group: null,
    startLogin: false,
    address: '',
    guest: false,
    user: {
      name: '',
      pfp: '',
    },
  }),
  mounted() {
    this.checkIsMobile()
    this.address = localStorage.getItem('flowAddress')
    this.user.name = localStorage.getItem('flowName')
    this.user.pfp = localStorage.getItem('flowPfp') || avatar1
    this.guest = localStorage.getItem('fgtGuest')
  },
  methods: {
    checkIsMobile() {
      if (window.innerWidth > 600) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
      this.drawer = !this.isMobile
    },
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
<style>
body, h1, h2, h3, h4, h5, h6, p, a, li, span, div, input, textarea, button {
  font-family: 'Tilt Neon', "Helvetica Neue", Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, p, input, textarea {
  font-family: 'Tilt Neon', "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #595656;
}

.v-main {
  background: #8a49ba;
  background: -moz-radial-gradient(circle, #956cb1 32%, #8a49ba 77%);
  background: -webkit-radial-gradient(circle, #956cb1 32%, #8a49ba 77%);
  background: radial-gradient(circle, #956cb1 32%, #8a49ba 77%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#956cb1", endColorstr="#8a49ba", GradientType=1);
}

.v-card.v-theme--light, .v-system-bar.v-theme--light.bg-primary {
  background: #ffffff42;
  border: none !important;
  border-radius: 5px;
}

.v-system-bar.v-theme--light.bg-primary .v-chip.v-theme--light {
  background: #8a4ab99c !important;
}

.v-system-bar.v-theme--light.bg-primary {
  background: #ffffff42 !important;
  border: none !important;
  border-radius: 5px;
}

.v-dialog .v-overlay__content > .v-card {
  display: flex;
  flex-direction: column;
  background: #fff !important;
}

.v-card h2, .v-card p {
  font-weight: 800;
}
footer.v-footer.v-theme--light.rounded-md p {
  color: #ffffff80 !important;
}

.v-chip {
  background: #fff !important;
  font-weight: 800;
}

.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.75rem;
}

.text-muted {
  color: #6c757d;
}

.fgt-left-nav .v-list-item__prepend {
  width: 35px;
}

footer.v-footer.v-theme--light.rounded-md {
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
}

.v-navigation-drawer__content {
  color: #9155fd !important;
}

.v-list-item-title {
  font-size: 18px !important;
}

.v-list-item__prepend > .v-icon {
  -webkit-margin-end: 10px;
  margin-inline-end: 10px;
}

.v-list-item--nav .v-list-item-title {
  line-height: 20px !important;
}

.v-card {
  box-shadow: 0px 0px 0px 4px #9c7fb352;
}
</style>

<template>
  <VApp>
    <v-layout>
      <v-app-bar>
        <v-img
          height="52px"
          class="ml-2 pl-1"
          style="min-width: 100px;"
          :src="require('@/assets/logo.png')"
        ></v-img>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>


        <VSpacer/>
        <VBtn v-if="!address && !guest " to="/play" color="primary" variant="tonal" outlined class="mr-4">
          <VIcon
            start
            icon="mdi-star-shooting-outline"
          />
          Start Playing
        </VBtn>
        <div v-if="address|| guest" class="mr-5">
          <VBadge v-bind="avatarBadgeProps">
            <VAvatar
              style="cursor: pointer;"
              color="primary"
              variant="tonal"
            >
              <VImg :src="user.pfp"/>

              <!-- SECTION Menu -->
              <VMenu
                activator="parent"
                width="230"
                location="bottom end"
                offset="14px"
              >
                <VList>
                  <!-- 👉 User Avatar & Name -->
                  <VListItem>
                    <template #prepend>
                      <VListItemAction start>
                        <VBadge v-bind="avatarBadgeProps">
                          <VAvatar
                            color="primary"
                            size="40"
                            variant="tonal"
                          >
                            <VImg :src="user.pfp"/>
                          </VAvatar>
                        </VBadge>
                      </VListItemAction>
                    </template>

                    <VListItemTitle class="font-weight-semibold">
                      {{ this.user.name || '' }}
                    </VListItemTitle>
                    <VListItemSubtitle class="text-disabled">
                      {{ address }}
                    </VListItemSubtitle>
                  </VListItem>

                  <VDivider class="my-2"/>

                  <!-- 👉 Settings -->
                  <VListItem link to="/settings">
                    <template #prepend>
                      <VIcon
                        class="me-2"
                        icon="mdi-cog-outline"
                        size="22"
                      />
                    </template>

                    <VListItemTitle>Settings</VListItemTitle>
                  </VListItem>


                  <!-- 👉 FAQ -->
                  <VListItem link>
                    <template #prepend>
                      <VIcon
                        class="me-2"
                        icon="mdi-help-circle-outline"
                        size="22"
                      />
                    </template>

                    <VListItemTitle>FAQ</VListItemTitle>
                  </VListItem>

                  <!-- Divider -->
                  <VDivider class="my-2"/>

                  <!-- 👉 Logout -->
                  <VListItem to="/login">
                    <template #prepend>
                      <VIcon
                        class="me-2"
                        icon="mdi-logout-variant"
                        size="22"
                      />
                    </template>

                    <VListItemTitle>Logout</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
              <!-- !SECTION -->
            </VAvatar>
          </VBadge>

        </div>

      </v-app-bar>

      <v-navigation-drawer v-model="drawer" class="fgt-left-nav">
        <v-list nav>
          <v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-star-shooting" title="Enter Competition"
                       to="/play"></v-list-item>
          <v-list-item prepend-icon="mdi-account-heart" title="Train | Revive | Thrive"
                       to="/train-revive-thrive"></v-list-item>
          <v-list-item prepend-icon="mdi-crown" title="Leaderboards"
                       to="/leaderboards"></v-list-item>
          <v-list-item class="d-none" prepend-icon="mdi-account-supervisor-circle " title="Compatible Projects"
                       to="/projects  "></v-list-item>
          <v-list-item prepend-icon="mdi-store" title="Store"
                       to="/coming-soon  "></v-list-item>
        </v-list>

        <a
          class="mx-auto d-block ml-3 mt-6"
          v-if="!address"
          href="/play"
          rel="noopener noreferrer"
        >
          <img
            :src="upgradeBanner"
            alt="upgrade-banner"
            transition="scale-transition"
            class="upgrade-banner mx-auto"
            style="max-width: 230px"
          >
        </a>
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <v-row dense>
            <v-col cols="12">
              <RouterView/>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer absolute>
        <p class="align-right align-end text-right">
          &copy;
          {{ new Date().getFullYear() }} Flow's Got Talent
        </p>
      </v-footer>
    </v-layout>
  </VApp>
</template>
