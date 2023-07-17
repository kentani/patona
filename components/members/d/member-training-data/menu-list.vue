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
          YYYY年 M月 D日
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
          v-for="menu in menus"
          :key="`menu-${menu.id}`"
          :ripple="false"
          rounded="lg"
        >
          <v-expansion-panel-title
            class="pl-0 pr-4"
            :readonly="menu.memo.length === 0"
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-card-title
                  class="pt-0"
                >
                  {{ menu.name }}
                </v-card-title>

                <v-card-subtitle
                  class="pb-0 mx-1"
                >
                  {{ menu.category }}
                </v-card-subtitle>
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <div
                      class="text-center text-caption text-green1"
                    >
                      重量
                    </div>

                    <div
                      class="text-center text-h6 text-green1 font-weight-bold"
                    >
                      {{ menu.kg }}
                    </div>
                  </v-col>

                  <v-col cols="6">
                    <div
                      class="text-center text-caption text-green1">
                      セット
                    </div>

                    <div
                      class="text-center text-h6 text-green1 font-weight-bold">
                      {{ menu.set }}
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <template v-slot:actions>
              <v-icon
                color="green1"
                size="large"
              >
                {{ menu.memo.length > 0 ? '$expand' : 'mdi-border-none-variant' }}
              </v-icon>
            </template>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            {{ menu.memo }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  const panel = ref([])
  const menus = ref([
    {id: '1', name: 'メニュー', category: 'カテゴリー', kg: '3', set: '3', memo: 'メモ'},
    {id: '2', name: 'メニュー2', category: 'カテゴリー', kg: '4', set: '2', memo: ''},
  ])
</script>
