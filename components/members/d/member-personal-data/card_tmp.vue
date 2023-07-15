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
                class="text-center"
              >
                <v-avatar
                  size="180"
                  rounded="0"
                  class="pa-2"
                >
                  <v-img
                    cover
                    :src="member?.imageUrl || defaultImage"
                  ></v-img>
                </v-avatar>
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
                    :text="convertToBirthday(member?.detail?.birthday)"
                    class="py-1"
                  />

                  <div class="d-flex">
                    <common-accent-block
                      title="年齢"
                      :text="`${convertToAge(member?.detail.birthday)}歳`"
                      class="py-1"
                    />

                    <common-accent-block
                      title="性別"
                      :text="convertToGender(member?.detail?.genderId)"
                      class="py-1 pl-1"
                    />
                  </div>

                  <common-accent-block
                    title="登録日"
                    :text="formattedDate(member?.createdAt)"
                    class="pt-1"
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

const { member, genders, profiles } = inject(MemberKey) as MemberType

// const defaultImage = ref('/images/account.png')
const defaultImage = ref('https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light')

const formattedDate = (timestamp: any) => {
  if(!timestamp) return ''

  return format(timestamp.toDate(), 'yyyy/MM/dd')
}

const splitBirthday = (birthday: string) => {
  return {
    birthYear: Number(birthday.substring(0, 4)),
    birthMonth: Number(birthday.substring(4, 6)),
    birthDate: Number(birthday.substring(6, 8))
  }
}

const convertToBirthday = (birthday: string) => {
  if(!birthday) return ''

  const { birthYear, birthMonth, birthDate } = splitBirthday(birthday)
  const date = new Date(`${birthYear}/${birthMonth}/${birthDate}`)

  return format(date, 'yyyy/MM/dd')
}

const convertToAge = (birthday?: string) => {
  if(!birthday) return ''

  const { birthYear, birthMonth, birthDate } = splitBirthday(birthday)

  const today = new Date()

  const thisYearsBirthday = new Date(today.getFullYear(), birthMonth - 1, birthDate)

  let age = today.getFullYear() - birthYear

  if(today < thisYearsBirthday){
    age--
  }

  return age
}

const convertToGender = (genderId?: string) => {
  if(!genderId) return ''

  const gender = genders.value.find(g => g.id === genderId)

  return gender?.title || ''
}
</script>
