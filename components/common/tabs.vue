<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-text>
      <v-row
        dense
      >
        <v-col
          v-for="tab in tabs"
          :key="tab.id"
          :cols="tab.cols || 12"
          :sm="tab.sm || 12"
          :md="tab.md || 12"
          :lg="tab.lg || 12"
        >
          <v-btn
            :variant="variant(tab)"
            color="green1"
            rounded="lg"
            block
            large
            :disabled="tab.disabled"
            @click="onClickTab(tab)"
          >
            {{ tab.title }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"

const { gym } = inject(GymKey) as GymType

const router = useRouter()
const route = useRoute()

interface Props {
  baseUrl: string
  tabs: Array<tabsItem>
}

interface tabsItem {
  id: string
  title: string
  to: string
  cols?: number,
  sm?: number,
  md?: number,
  lg?: number,
  disabled?: boolean
}

const Props = withDefaults(defineProps<Props>(), {
  baseUrl: '',
  tabs: () => []
})

const variant = (tab: any): NonNullable<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain"> | undefined => {
  const path = `${Props.baseUrl}${tab.to}`
  if(path === route.path) {
    return 'elevated'
  } else {
    return 'text'
  }
}

const onClickTab = (tab: any) => {
  router.push({ path: `${Props.baseUrl}${tab.to}`, query: route.query })
}
</script>
