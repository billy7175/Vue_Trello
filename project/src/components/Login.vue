<template>
  <div class="login">
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input
          class="form-control"
          type="text"
          name="email"
          v-model="email"
          autofocus
          placeholder="e.g., test@test.com"
        />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input
          class="form-control"
          type="password"
          v-model="password"
          placeholder="123123"
        />
      </div>
      <button
        class="btn"
        :class="{ 'btn-success': !invalidForm }"
        type="submit"
        :disabled="invalidForm"
      >
        Log In
      </button>
    </form>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
// import { auth, setAuthInHeader } from "@/api";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: "",
    };
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password;
    },
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
  methods: {
    ...mapActions([
      'LOGIN'
    ]),
    onSubmit() {
      this.LOGIN({email :this.email, password: this.password})
        .then(() => {
          // this.rPath
          this.$router.push('/');
        })
        .catch((err) => {
          this.error = err.data.error;
        });
      // auth
      //   .login(this.email, this.password)
      //   .then((data) => {
      //     console.log("#data", data);
      //     localStorage.setItem("token", data.accessToken);
      //     setAuthInHeader(data.accessToken);
      //     this.$router.push(this.rPath);
      //   })
    },
  },
};
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}
.error {
  color: #f00;
}
</style>
