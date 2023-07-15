<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-text
      class="pa-2"
    >
      <v-row
        dense
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
        >
          <v-card
            variant="flat"
          >
            <v-row
              dense
              justify="center"
              align="center"
            >
              <v-col
                cols="5"
              >
                <v-img
                  max-height="180"
                  :src="member?.imageUrl || defaultImage"
                  cover
                ></v-img>
              </v-col>

              <v-col
                cols="7"
                align-self="center"
              >
                <v-card-title
                  class="text-h5 font-weight-bold"
                >
                  {{ member?.name }}
                </v-card-title>

                <v-card-text
                  class="text-caption"
                >
                  <common-accent-block
                    title="生年月日"
                    :text="member?.birthday"
                    class="py-1"
                  />

                  <common-accent-block
                    title="年齢"
                    text="32歳"
                    class="py-1"
                  />

                  <common-accent-block
                    title="性別"
                    :text="member?.gender"
                    class="py-1"
                  />

                  <common-accent-block
                    title="登録日"
                    :text="formattedDate(member?.createdAt)"
                    class="py-1"
                  />
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-divider class="mx-4" />

        <v-col
          cols="12"
        >
          <v-row
            justify="center"
            align="center"
            class="pa-4"
          >
            <v-col
              v-for="(profile, index) in profiles"
              :key="`profile-${index}`"
              :cols="profile.cols"
              :sm="profile.sm"
            >
              <v-card
                variant="flat"
              >
                <v-card-title>
                  <common-underlined-text
                    :text="profile.title"
                    class="text-h6 font-weight-bold"
                  />
                </v-card-title>

                <v-card-text
                  class="pb-0 text-body-1"
                >
                  {{ member?.detail?.profiles[index]?.data }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { member, profiles } = inject(MemberKey) as MemberType

const defaultImage = ref('/images/account.png')

const formattedDate = (timestamp: any) => {
  if(timestamp) {
    return format(timestamp.toDate(), 'yyyy/MM/dd')
  } else {
    return ''
  }
}
</script>
