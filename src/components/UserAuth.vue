<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner> </base-spinner
    ></base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">
            <input type="email" id="email" v-model.trim="email" />
            Email</label
          >
        </div>
        <div class="form-control">
          <label for="password">
            <input type="password" id="password" v-model.trim="password" />
            Password</label
          >
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{
          switchModeCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      error: null,
      isLoading: false,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Log in' : 'Signup';
    },
    switchModeCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Log in instead';
    },
  },
  methods: {
    switchMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
