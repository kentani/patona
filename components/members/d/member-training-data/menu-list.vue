<template>
  <v-card
    variant="flat"
    rounded="lg"
    class="py-2 text-font"
  >
    <v-card-title
      class="py-4 text-h6 font-weight-bold"
    >
      <v-row
        dense
      >
        <v-col
          cols="auto"
          align-self="center"
        >
          {{ currentYearMonthDate }}
        </v-col>

        <v-spacer />

        <v-col
          cols="auto"
          align-self="center"
        >
          <members-d-member-training-data-add-btn />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-expansion-panels
        v-model="panel"
        multiple
      >
        <v-expansion-panel
          v-for="training in trainingOfDateKey[currentDateKey] || []"
          :key="`training-${training.id}`"
          :ripple="false"
          rounded="lg"
        >
          <v-expansion-panel-title
            class="pl-0 pr-4"
            :readonly="training.detail.memo.length === 0"
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-card-title
                  class="pt-0"
                >
                  {{ menuOfId[training.menuId].name }}
                </v-card-title>

                <v-card-subtitle
                  class="pb-0 mx-1"
                >
                  {{ categoryOfId[training.categoryId].name }}
                </v-card-subtitle>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-row>
                  <v-col cols="6">
                    <div
                      class="text-center text-caption text-green1"
                    >
                      セット
                    </div>

                    <div
                      class="text-center text-h6 text-green1 font-weight-bold"
                    >
                      {{ training.detail.set }}
                    </div>
                  </v-col>

                  <v-col
                    cols="6"
                  >
                    <div
                      class="text-center text-caption text-green1"
                    >
                      重量
                    </div>

                    <div
                      class="text-center text-body-2 text-green1 font-weight-bold"
                      style="text-align: center;"
                    >
                      <div
                        v-for="(kg, index) in training.detail.kg"
                        :key="index"
                        class="pa-1"
                      >
                        {{ kg }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
              >
                <v-row
                  dense
                  :justify="$vuetify.display.xs ? 'center' : 'start'"
                  class="px-4"
                >
                  <v-col
                    :cols="$vuetify.display.xs ? '6' : '3'"
                  >
                    <members-d-member-training-data-edit-btn
                      @click-edit-menu="onClickEditMenu(training)"
                    />
                  </v-col>

                  <v-col
                    :cols="$vuetify.display.xs ? '6' : '3'"
                  >
                    <members-d-member-training-data-delete-btn />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <template v-slot:actions>
              <v-icon
                color="green1"
                size="large"
              >
                {{ training.detail.memo.length > 0 ? '$expand' : 'mdi-border-none-variant' }}
              </v-icon>
            </template>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            {{ training.detail.memo }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { CalenderType } from "@/composables/training/calender/calender"
import CalenderKey from "@/composables/training/calender/calender-key"
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"
import { TrainingType } from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"

const { currentDateKey, currentYearMonthDate } = inject(CalenderKey) as CalenderType
const { trainingCategories } = inject(TrainingCategoryKey) as TrainingCategoryType
const { trainingMenus } = inject(TrainingMenuKey) as TrainingMenuType
const { trainings, setTraining } = inject(TrainingKey) as TrainingType

const panel = ref([])

const trainingOfDateKey = computed(() => {
  let trainingHash: any = {}

  trainings.value.forEach(t => {
    if(!trainingHash[t.dateKey]) {
      trainingHash[t.dateKey] = []
    }

    trainingHash[t.dateKey].push(t)
  })

  return trainingHash
})

const categoryOfId = computed(() => {
  let categoryHash: any = {}

  trainingCategories.value.forEach(c => {
    categoryHash[c.id] = c
  })

  return categoryHash
})

const menuOfId = computed(() => {
  let menuHash: any = {}

  trainingMenus.value.forEach(m => {
    menuHash[m.id] = m
  })

  return menuHash
})

const onClickEditMenu = (training: any) => {
  setTraining({ training: training })
}
</script>
