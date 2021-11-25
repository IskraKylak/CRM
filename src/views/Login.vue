<template>
  <form class="card auth-card" @submit.prevent="submitHundler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div
        class="input-field form-item"
        :class="{ errorInput: v$.email.$error }"
      >
        <input
          placeholder="email"
          id="email"
          class="validate"
          v-model.trim="email"
          @change="v$.email.$touch()"
          :class="{ invalid: v$.email.$error }"
        />
        <!-- <label for="email">Email</label> -->
        <small v-if="v$.email.required.$invalid" class="errorText">Email</small>
        <small v-if="v$.email.email" class="errorText"
          >Email is not correct</small
        >
      </div>
      <div
        class="input-field form-item"
        :class="{ errorInput: v$.password.$error }"
      >
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{ error: v$.password.$error }"
          @change="v$.password.$touch()"
        />
        <label for="password">Пароль</label>
        <small v-if="v$.password.required.$invalid" class="errorText"
          >Password</small
        >
        <small v-if="v$.password.minLength.$invalid" class="errorText"
          >Password mast have at least
          {{ v$.password.minLength.$params.min }} !</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import messages from "@/utils/messages";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    email: "",
    password: "",
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      minLength: minLength(6),
      required,
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHundler() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const user = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch("login", user);
          this.$router.push("/");
        } catch (e) {}

        //   console.log(user);
        //   this.email = "";
        //   this.v$.$reset();
        //   this.$emit("close");
      }
    },
  },
};
</script>
<style scoped>
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13px;
  color: rgb(207, 86, 86);
}

.form-item.errorInput .errorText {
  display: block;
}
</style>
