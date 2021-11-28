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
      <div
        class="input-field form-item"
        :class="{ errorInput: v$.name.$error }"
      >
        <input
          id="name"
          type="text"
          class="validate"
          v-model="name"
          :class="{ error: v$.name.$error }"
          @change="v$.name.$touch()"
        />
        <label for="name">Имя</label>
        <small v-if="v$.name.required.$invalid" class="errorText">Имя</small>
        <small v-if="v$.name.minLength.$invalid" class="errorText"
          >Имя mast have at least {{ v$.name.minLength.$params.min }} !</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    agree: false,
  }),
  validations: {
    name: {
      minLength: minLength(6),
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      minLength: minLength(6),
      required,
    },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHundler() {
      this.v$.$touch();
      if (!this.v$.$invalid) {

        const register1 = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        try {
          await this.$store.dispatch("register", register1);
          this.$router.push("/");
        } catch (e) {
          throw e
        }
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
