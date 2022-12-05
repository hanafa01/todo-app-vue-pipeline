<template>
  <h1 class="app-welcome">Todo App, Welcome!</h1>
  <h2 class="app-title">Register</h2>

  <Form @submit="register" class="auth-form">
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <div v-if="serverErrors" class="server-error">
      <div v-for="(value, key) in serverErrors" :key="key">
        {{ value[0] }}
      </div>
    </div>
    <div class="input-label">
      <label for="">Name</label>
      <Field
        name="name"
        type="text"
        placeholder="Enter Name"
        rules="required"
      />
      <ErrorMessage class="form-error" name="name" />
    </div>
    <div class="input-label">
      <label for="">Email</label>
      <Field
        name="email"
        type="text"
        placeholder="Enter Email"
        :rules="validateEmail"
      />
      <ErrorMessage class="form-error" name="email" />
    </div>
    <div class="input-label">
      <label for="">Password</label>
      <Field
        name="password"
        type="password"
        placeholder="Enter Password"
        rules="required|minLength:6"
      />
      <ErrorMessage class="form-error" name="password" />
    </div>
    <div class="mt-2">
      <button type="submit" :disabled="loading">Register</button>
    </div>
  </Form>
</template>

<script>
// https://vee-validate.logaretm.com/v4/guide/global-validators#min_value
import { defineRule, Form, Field, ErrorMessage } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return "This field is required";
  }

  return true;
});

defineRule("minLength", (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }

  if (value.length < limit) {
    return `This field must be at least ${limit} characters`;
  }

  return true;
});

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      serverErrors: "",
      successMessage: "",
      loading: false,
    };
  },
  methods: {
    register(values) {
      this.loading = true;
      this.$store
        .dispatch("register", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          this.loading = false;
          console.log(response);
          this.successMessage = "Registered Successfully";
          this.$router.push({
            name: "login",
            params: { dataSuccessMessage: this.successMessage },
          });
          this.$toast.success(this.successMessage);
        })
        .catch((error) => {
          this.loading = false;
          this.serverErrors = Object.values(error.response.data.errors);
        });
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "This field is required";
      }

      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }

      // All is good
      return true;
    },
  },
};
</script>