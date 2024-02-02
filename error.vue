<template>
  <v-app class="text-font">
    <v-app-bar
      app
      fixed
      flat
      density="compact"
      color="green1"
    >
      <v-toolbar-title class="text-body-1 font-weight-bold">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container style="height: 100%;">
        <v-row
          style="height: 100%;"
          align="center"
          justify="center"
        >
          <v-col cols="12" class="text-center">
            <div v-if="error.statusCode === 404">
              <div class="text-h1 font-weight-bold text-green1 text-center pb-3">{{ error.statusCode }}</div>
              <div class="text-body-1 font-weight-bold text-green1 text-center pb-6">ページが見つかりません</div>
            </div>

            <div v-else>
              <div class="text-h1 font-weight-bold text-green1 text-center pb-3">{{ error.statusCode }}</div>
              <div class="text-body-1 font-weight-bold text-green1 text-center pb-6">システムエラーが発生しました</div>
            </div>

            <v-btn
            color="green1"
            class="font-weight-bold"
            rounded="lg"
            :ripple="false"
            size="large"
            @click="onClickReload"
            >
              再読み込み
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const title = ref('PATONA')
const error: any = useError()
const onClickReload = () => clearError({ redirect: '/login' });
</script>
