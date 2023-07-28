<template>
  <v-container
    fluid
  >
    <v-row
      justify="center"
      align="center"
      :class="$vuetify.display.xs ? '' : 'raise'"
    >
      <v-col
        v-for="menu in menus"
        :key="menu.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        :align-self="$vuetify.display.xs ? 'start' : 'center'"
      >
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              variant="elevated"
              rounded="xl"
              color="green1"
              :ripple="false"
              :disabled="menu.disabled"
              :elevation="isHovering ? 24 : 8"
              @click="onClickMenu(menu)"
            >
              <v-card-text
                class="text-h6 font-weight-bold text-center"
              >
                <v-icon size="120">{{ menu.icon }}</v-icon>
                <p class="pb-2">{{ menu.name }}</p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const menus = ref([
  { id: '1', name: 'ユーザー一覧', icon: 'mdi-account-group', to: '/admin/users', disabled: false },
  { id: '2', name: 'ジム一覧', icon: 'mdi-domain', to: '/i/gyms', disabled: false }
])

const router = useRouter()

const onClickMenu = (menu: { id: string, name: string, icon: string, to: string }) => {
  router.push(menu.to)
}

definePageMeta({
  layout: 'admin'
})
</script>

<style scoped>
.raise {
  height: 85vh;
}
</style>

