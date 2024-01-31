<template>
  <div
    class="d-none d-sm-block"
  >
    <v-row
      justify="start"
      align="center"
    >
      <v-col
        v-for="member in filteredMembers"
        :key="member.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="pb-2"
              variant="flat"
              rounded="lg"
              height="100%"
              :ripple="false"
              :elevation="isHovering ? 6 : 0"
              @click="onClickMember(member)"
            >
              <div
                class="text-center pt-6 pb-3"
                style="width: 100%;"
              >
                <v-avatar
                  size="160"
                >
                  <v-img
                    cover
                    :src="member.imageURL || defaultImage"
                  ></v-img>
                </v-avatar>
              </div>

              <v-card-title class="pt-0 pb-2 text-h6 font-weight-bold">
                <div>
                  {{ member.name }}
                </div>
              </v-card-title>

              <v-card-text class="pt-0 pb-2 text-caption text-left">
                <common-accent-block
                  title="担当"
                  :text="instructorName(member)"
                />
              </v-card-text>

              <div
                v-if="member.archived"
                class="font-weight-bold text-body-1 text-white d-flex justify-center align-center archive"
              >
                <div>アーカイブ済み</div>
              </div>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>

  <v-card
    variant="flat"
    rounded="lg"
    class="d-block d-sm-none"
  >
    <v-row
      dense
      no-gutters
    >
      <v-col
        v-for="member in filteredMembers"
        :key="member.id"
        cols="12"
      >
        <v-card
          variant="flat"
          rounded="0"
          :ripple="false"
          @click="onClickMember(member)"
        >
          <v-row
            dense
            no-gutters
          >
            <v-col
              cols="4"
              class="text-center py-3"
            >
              <v-avatar
                size="80"
              >
                <v-img
                  cover
                  :src="member.imageURL || defaultImage"
                ></v-img>
              </v-avatar>
            </v-col>

            <v-col
              cols="8"
              align-self="center"
            >
              <v-card-title class="pt-0 pb-2 text-h6 font-weight-bold">
                <div>
                  {{ member.name }}
                </div>
              </v-card-title>

              <v-card-text class="py-0 text-caption text-left">
                <common-accent-block
                  title="担当"
                  :text="instructorName(member)"
                />
              </v-card-text>

              <div
                v-if="member.archived"
                class="font-weight-bold text-body-1 text-white d-flex justify-center align-center archive"
              >
                <div>アーカイブ済み</div>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-divider />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { instructors } = inject(InstructorKey) as InstructorType
const { filteredMembers, setMember } = inject(MemberKey) as MemberType

const router = useRouter()

// const defaultImage = ref('/images/account.png')
const defaultImage = ref('https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light')
// const defaultImage = ref('https://cdn.vuetifyjs.com/images/profiles/marcus.jpg')

const onClickMember = (member: any) => {
  setMember(member)
  router.push({ path: '/i/members/d/member-personal-data', query: { gymId: member.gymId, memberId: member.id } })
}

const instructorName = (member: any) => {
  const instructorId = member.instructorIds[0]
  const instructor = instructors.value.find(i => i.id === instructorId)

  let name = instructor?.name || ''

  if(otherInstructorCount(member)) {
    name = name + `・他${otherInstructorCount(member)}名`
  }

  return name
}

const otherInstructorCount = (member: any) => {
  return member.instructorIds.length - 1
}
</script>

<style scoped>
.archive {
  background: rgb(var(--v-theme-green1));
  opacity: 0.7;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  align-self: center;
}
</style>
