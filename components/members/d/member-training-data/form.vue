<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    fullscreen
  >
    <v-card
      variant="flat"
      rounded="0"
      color="background"
      class="text-font"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          text="メニューを追加"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        aaaa
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
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const dialog = ref(false)

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  close()
}

const open = () => {
  dialog.value = true
}

const close = () => {
  dialog.value = false
}

defineExpose({
  open,
})
</script>
