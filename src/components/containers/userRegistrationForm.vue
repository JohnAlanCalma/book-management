<template>
  <v-flex xs12 sm8 md6>
    <UserRegistrationForm :registration="userRegistration"/>

    <!-- 登録中 -->
    <v-dialog
      :value="isSending"
      persistent
      width="300">
      <v-card color="primary" dark>
        <v-card-text>
          登録中です...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- エラー -->
    <v-dialog :value="isSendFailed" width="500">
      <v-card color="error" dark>
        <v-card-text>
          {{ errorMessage }}
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn @click="toStandby()" color="red lighten-2">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-flex>
</template>

<script lang="ts">
import { IRegistrationParams } from '@/boundary/authApplicationService/InOutType'
import UserRegistrationForm from '@/components/organisms/userRegistrationForm.vue'
import {
  toStandby,
  userRegistration,
} from '@/store/containers/userRegistrationForm/action'
import selector from '@/store/containers/userRegistrationForm/selector'
import { mapComputed } from '@/submodules/store'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    UserRegistrationForm,
  },
  computed: mapComputed(selector),
})
export default class UserRegistrationFormContainer extends Vue {
  public userRegistration(params: IRegistrationParams) {
    return this.$store.dispatch(userRegistration(params))
  }

  public toStandby() {
    return this.$store.dispatch(toStandby())
  }
}
</script>
