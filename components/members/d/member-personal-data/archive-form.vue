<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    :fullscreen="$vuetify.display.xs"
    scrollable
    persistent
  >
    <v-card
      variant="flat"
      :rounded="$vuetify.display.xs ? 0 : 'lg'"
      color="background"
      class="text-font"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          :text="memberModel?.archived ? '会員のアーカイブを解除' : '会員をアーカイブ'"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        {{ memberModel?.archived ? '会員のアーカイブを解除しますか？' : '会員をアーカイブしますか？' }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          rounded="lg"
          class="text-grey"
          :ripple="false"
          size="large"
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>

        <v-btn
          color="green1"
          class="font-weight-bold"
          rounded="lg"
          :ripple="false"
          size="large"
          @click="onClickComplete"
        >
          {{ memberModel?.archived ? 'アーカイブ解除' : 'アーカイブ' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { updateMember, filterMember } = inject(MemberKey) as MemberType

const dialog = ref(false)
const memberModel: Ref<any> = ref(null)

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  await updateMember(memberModel.value.id, {
    archived: !memberModel.value?.archived,
  })

  filterMember()

  close()
}

const open = (params: { member: any }) => {
  const { member } = params
  memberModel.value = member
  dialog.value = true
}

const close = () => {
  memberModel.value = null
  dialog.value = false
}

defineExpose({
  open,
})
</script>
