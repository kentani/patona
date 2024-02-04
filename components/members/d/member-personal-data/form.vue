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
          :text="isEdit ? '会員を編集' : '会員を追加'"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            cols="12"
          >
            <common-underlined-text
              text="基本情報"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-error font-weight-bold"
            >
              ※必須(生年月日以外)
            </span>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="memberName"
              label="会員名"
              type="text"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="memberBirthDay"
              label="生年月日"
              type="tel"
              placeholder="例）19910212 ※1991/2/12生まれの場合"
              variant="outlined"
              color="green1"
              :rules="[rules.counter, rules.date]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-select
              v-model="memberGender"
              variant="outlined"
              :items="genders"
              item-title="title"
              item-value="id"
              label="性別"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              @update:modelValue=""
            ></v-select>
          </v-col>

          <v-col
            cols="12"
          >
            <v-select
              v-model="memberInstructors"
              variant="outlined"
              :items="instructors"
              item-title="name"
              item-value="id"
              label="担当"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              multiple
              @update:modelValue=""
            ></v-select>
          </v-col>

          <v-col cols="12">
            <common-underlined-text
              text="顔写真"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-grey font-weight-bold"
            >
              ※任意
            </span>
          </v-col>

          <v-col cols="12">
            <v-file-input
              label="顔写真"
              variant="outlined"
              color="green1"
              density="compact"
              hide-details
              @change="onChangeImage"
            ></v-file-input>
          </v-col>

          <v-col cols="12" class="d-flex py-0">
            <div v-if="fileName.length" id="tumbnail-wrapper" class="mx-auto">
              <canvas
                id="tumbnail"
                class="mx-auto"
                width="0"
                height="0"
                @mousedown="onMouseDown"
                @mousemove="onMouseMove"
                @mouseup="onMouseUp"
                @touchstart="onMouseDown"
                @touchmove="onMouseMove"
                @touchend="onMouseUp"
              ></canvas>
            </div>
          </v-col>

          <v-col cols="12">
            <v-slider
              v-model="tumbnailSize"
              :min="0.01"
              :max="2"
              :step="0.01"
              color="green1"
              label="画像サイズ"
              density="compact"
              hide-details
              :disabled="!fileName.length"
              @update:model-value="onchangeTumbnailSize"
            ></v-slider>
          </v-col>

          <v-col
            cols="12"
          >
            <common-underlined-text
              text="目的/目標"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-grey font-weight-bold"
            >
              ※任意
            </span>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberPurpose"
              label="目的"
              variant="outlined"
              color="green1"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberGoal"
              label="目標"
              variant="outlined"
              color="green1"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <common-underlined-text
              text="その他"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-grey font-weight-bold"
            >
              ※任意
            </span>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberExperience"
              label="運動経験"
              variant="outlined"
              color="green1"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberInjury"
              label="けが・病気"
              variant="outlined"
              color="green1"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberMemo"
              label="メモ"
              variant="outlined"
              color="green1"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>
        </v-row>
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

      <v-overlay
        v-model="processing"
        contained
        class="align-center justify-center"
        style="background-color: #fff; opacity: 0.8;"
      >
        <v-progress-circular
          v-model="progress"
          :rotate="360"
          :size="100"
          :width="10"
          color="green1"
        >
          {{ progress }}
        </v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, uploadString } from "firebase/storage";

import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { appUser } = inject(AuthKey) as AuthType
const { gym } = inject(GymKey) as GymType
const { instructor, instructors } = inject(InstructorKey) as InstructorType
const { member, genders, profiles, createMember, updateMember, filterMember, resetMember } = inject(MemberKey) as MemberType

const isEdit = ref(false)
const dialog = ref(false)
const memberName = ref('')
const memberBirthDay = ref('')
const memberGender = ref('')
const memberInstructors: Ref<Array<any>> = ref([])
const memberPurpose = ref('')
const memberGoal = ref('')
const memberExperience = ref('')
const memberInjury = ref('')
const memberMemo = ref('')
const tumbnailSize = ref(1)
const fileName = ref('')
const baseImageURL: any = ref('')
const imageURL: any = ref('')
const baseImage: any = ref('')
const newImage: any = ref('')
const newImageData = ref('')
const isDragging = ref(false)
const start = ref({ x: 0, y: 0 })
const end = ref({ x: 0, y: 0 })
const diff = ref({ x: 0, y: 0 })
const processing = ref(false)
const progress = ref(0)

const rules = ref({
  required: (value: any) => isRequired(value) || '必須項目です',
  counter: (value: any) => value.length === 8 || '入力形式が不正です （例）19910212 ※1991/2/12生まれの場合',
  date: (value: any) => isValidDate(value) || '入力形式が不正です （例）19910212 ※1991/2/12生まれの場合',
})

const isRequired = (value: any) => {
  if(!value) return false

  if(Array.isArray(value)) return !!value.length

  if(typeof value === 'object') return !!Object.keys(value).length

  return !!value.length
}
const isValidDate = (value: any) => {
  if(!value) return true

  const dateString = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`
  const day =  new Date(dateString)

  return !Number.isNaN(day.getTime())
}

const onchangeTumbnailSize = () => {
  redrawTumbnail(newImage.value)
}

const onChangeImage = (f: any) => {
  if(!f) return

  const file = f.target.files[0]
  if(!file) return

  fileName.value = file.name

  const image: any = new Image()
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onload = (e: any) => {
    image.src = e.target.result
    image.crossOrigin = "anonymous"
    image.onload = () => {
      const img: any = new Image()
      baseImage.value = makeImage(image)
      img.src = baseImage.value
      img.crossOrigin = "anonymous";
      img.onload = () => {
        newImage.value = img
        makeTumbnail(img)
      }
    }
  }
}

const uploadBaseImage = async () => {
  const storage = getStorage()
  const imageRef = storageRef(storage, `members/${member.value?.id}/icons/base_${fileName.value}`)

  await uploadString(imageRef, baseImage.value, "data_url").then(async () => {
    await getDownloadURL(imageRef).then(async (_url) => {
      baseImageURL.value = _url
    });
  });
}

const uploadImage = async () => {
  const storage = getStorage()
  const imageRef = storageRef(storage, `members/${member.value?.id}/icons/${fileName.value}`)

  const img = redrawTumbnail(newImage.value)

  await uploadString(imageRef, img, "data_url").then(async () => {
    await getDownloadURL(imageRef).then(async (_url) => {
      imageURL.value = _url
    });
  });
}

const makeImage = (image: any) => {
  const canvas: any = document.createElement('canvas')
  const canvasWrapper: any = document.getElementById("tumbnail-wrapper")
  const ctx = canvas.getContext('2d')

  let ratio, height, width

  if (image.height > image.width) {
    ratio = image.height / image.width
    width = canvasWrapper.clientWidth
    height = width * ratio
  } else {
    ratio = image.width / image.height
    height = canvasWrapper.clientHeight
    width = height * ratio
  }

  canvas.height = height
  canvas.width = width
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg')
}

const makeTumbnail = (image: any) => {
  const canvas: any = document.getElementById("tumbnail")
  const ctx = canvas.getContext('2d')
  canvas.height = 256
  canvas.width = 256
  ctx.drawImage(image, 0, 0)
  return canvas.toDataURL('image/jpeg')
}

const redrawTumbnail = (image: any) => {
  const tumbnail: any = document.getElementById("tumbnail")
  const ctx = tumbnail.getContext('2d')
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, tumbnail.width, tumbnail.height);
  ctx.clearRect(0, 0, tumbnail.width, tumbnail.height);
  ctx.scale(tumbnailSize.value, tumbnailSize.value);
  ctx.drawImage(image, diff.value.x, diff.value.y)
  ctx.scale(1 / tumbnailSize.value, 1 / tumbnailSize.value);
  return tumbnail.toDataURL('image/jpeg')
};

const onMouseDown = (event: any) => {
  isDragging.value = true;

  if (event.type === "touchstart") {
    event.preventDefault();
    start.value.x = event.changedTouches[0].pageX;
    start.value.y = event.changedTouches[0].pageY;
  } else {
    start.value.x = event.clientX;
    start.value.y = event.clientY;
  }
}

const onMouseMove = (event: any) => {
  if (isDragging.value) {
    if (event.type === "touchmove") {
      diff.value.x = end.value.x + (event.changedTouches[0].pageX - start.value.x) / tumbnailSize.value;
      diff.value.y = end.value.y + (event.changedTouches[0].pageY - start.value.y) / tumbnailSize.value;
    } else {
      diff.value.x = end.value.x + (event.clientX - start.value.x) / tumbnailSize.value;
      diff.value.y = end.value.y + (event.clientY - start.value.y) / tumbnailSize.value;
    }
    redrawTumbnail(newImage.value);
  }
}

const onMouseUp = (event: any) => {
  isDragging.value = false;
  end.value.x = diff.value.x;
  end.value.y = diff.value.y;
}

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  processing.value = true

  if(isEdit.value) {
    await update()
  } else {
    await create()
  }

  progress.value = 30

  if (baseImage.value && newImage.value) {
    await uploadBaseImage()

    progress.value = 50

    await uploadImage()

    progress.value = 70

    await updateMember(member.value?.id, {
      baseImageURL: baseImageURL.value,
      imageURL: imageURL.value,
    })

    progress.value = 99
  } else {
    setTimeout(() => {
      progress.value = 50
    }, 200)

    setTimeout(() => {
      progress.value = 70
    }, 400)


    setTimeout(() => {
      progress.value = 99
    }, 600)
  }

  filterMember()

  setTimeout(() => {
    progress.value = 100
  }, 300)

  setTimeout(() => {
    close()
  }, 500)
}

const create = async () => {
  await createMember({
    gymId: gym.value?.id,
    instructorId: instructor.value?.id,
    instructorIds: memberInstructors.value,
    archived: false,
    name: memberName.value,
    imageName: fileName.value,
    baseImageURL: baseImageURL.value,
    imageURL: imageURL.value,
    tumbnailSize: tumbnailSize.value,
    start: start.value,
    end: end.value,
    diff: diff.value,
    detail: memberDetail()
  })
}

const update = async () => {
  await updateMember(member.value?.id, {
    instructorIds: memberInstructors.value,
    name: memberName.value,
    imageName: fileName.value,
    baseImageURL: baseImageURL.value,
    imageURL: imageURL.value,
    tumbnailSize: tumbnailSize.value,
    start: start.value,
    end: end.value,
    diff: diff.value,
    detail: memberDetail(),
  })
}

const memberDetail = () => {
  return {
    birthday: memberBirthDay.value,
    genderId: memberGender.value,
    profiles: [
      { profileId: profiles.value[0].id, data: memberPurpose.value },
      { profileId: profiles.value[1].id, data: memberGoal.value },
      { profileId: profiles.value[2].id, data: memberExperience.value },
      { profileId: profiles.value[3].id, data: memberInjury.value },
      { profileId: profiles.value[4].id, data: memberMemo.value },
    ]
  }
}

const setMemberProfile = (member: any) => {
  let memberProfile: any = {}

  member?.detail?.profiles.forEach((profile: any) => {
    switch(profile.profileId) {
      case profiles.value[0].id:
        memberProfile.memberPurpose = profile.data
        break
      case profiles.value[1].id:
        memberProfile.memberGoal = profile.data
        break
      case profiles.value[2].id:
        memberProfile.memberExperience = profile.data
        break
      case profiles.value[3].id:
        memberProfile.memberInjury = profile.data
        break
      case profiles.value[4].id:
        memberProfile.memberMemo = profile.data
        break
    }
  })

  return memberProfile
}

const open = (params: { isEdit: boolean }) => {
  isEdit.value = params.isEdit

  const memberProfile = setMemberProfile(member.value)

  memberName.value = member.value?.name || ''
  memberBirthDay.value = member.value?.detail?.birthday || ''
  memberGender.value = member.value?.detail?.genderId || genders.value[0].id
  memberInstructors.value = member.value?.instructorIds || [instructor.value?.id]
  fileName.value = member.value?.imageName || ''
  baseImageURL.value = member.value?.baseImageURL || '',
  imageURL.value = member.value?.imageURL || '',

  tumbnailSize.value = member.value?.tumbnailSize || 1
  start.value = member.value?.start || { x: 0, y: 0 }
  end.value = member.value?.end || { x: 0, y: 0 }
  diff.value = member.value?.diff || { x: 0, y: 0 }

  memberPurpose.value = memberProfile.memberPurpose || ''
  memberGoal.value = memberProfile.memberGoal || ''
  memberExperience.value = memberProfile.memberExperience || ''
  memberInjury.value = memberProfile.memberInjury || ''
  memberMemo.value = memberProfile.memberMemo || ''

  if (baseImageURL.value.length) {
    const image: any = new Image()
    image.src = baseImageURL.value
    image.crossOrigin = "anonymous"
    image.onload = () => {
      baseImage.value = makeImage(image)
      newImage.value = image
      makeTumbnail(image)
      redrawTumbnail(image)
    }
  }

  dialog.value = true
}

const close = () => {
  if (!isEdit.value) resetMember()

  isEdit.value = false
  memberName.value = ''
  memberBirthDay.value = ''
  memberGender.value = genders.value[0].id
  memberInstructors.value = [instructor.value?.id]
  memberPurpose.value = ''
  memberGoal.value = ''
  memberExperience.value = ''
  memberInjury.value = ''
  memberMemo.value = ''

  tumbnailSize.value = 1
  start.value = { x: 0, y: 0 }
  end.value = { x: 0, y: 0 }
  diff.value = { x: 0, y: 0 }
  fileName.value = ''
  baseImageURL.value = ''
  imageURL.value = ''
  newImage.value = ''
  newImageData.value = ''

  processing.value = false

  setTimeout(() => {
    progress.value = 0
    dialog.value = false
  }, 200)
}

defineExpose({
  open,
})
</script>

<style>
#tumbnail-wrapper {
  position: relative;
  width: 100%;
  height: 256px;
  border-radius: 4px;
}

#tumbnail-wrapper span {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

#tumbnail-wrapper canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
}

#tumbnail-wrapper #tumbnail-background {
  opacity: 0.5;
}

#tumbnail-wrapper #tumbnail {
  width: 256px;
  height: 256px;
  border: dashed 3px #666;
  opacity: 1;
}
</style>
