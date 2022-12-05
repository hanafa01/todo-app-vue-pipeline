<template>
  <TheHeader />
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nobile:wght@500&display=swap");

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Nobile", sans-serif;
  /* cursor: default; */
}

body {
  margin: 0;
  padding: 0;
  background-color: black;
  color: #fff;
}

#app {
  margin: auto;
  max-width: 600px;
  padding: 15px;
}

.text-danger {
  color: red;
  margin-bottom: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

button {
  cursor: pointer;
  font: inherit;
  outline: none;
  padding: 10px;
  background-color: transparent;
  border: none;
}

.app-welcome {
  text-align: center;
  border-bottom: 1px solid lightgrey;
  padding: 10px 0 25px 0;
}

.app-title {
  text-align: center;
}

.form-error {
  display: block;
  margin-top: 0.25rem;
  font-size: 16px;
  color: #a94442;
}

.input-error {
  border: 1px solid red;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 4px;
}

.server-error {
  margin-bottom: 12px;
  padding: 10px 14px;
  color: #a94442;
  background: #f3dede;
  border-radius: 4px;
}

svg {
  color: #fff;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  -webkit-appearance: none;
  background: none;
  border: 0;
  outline: 0;
  flex-grow: 0;
  transition: background 300ms;
  cursor: pointer;
  background-color: transparent;
  border: 3px solid white;
}

input[type="checkbox"]::before {
  content: "";
  color: transparent;
  display: block;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  border: 0;
  background-color: transparent;
  background-size: contain;
}

input[type="checkbox"]:checked {
  background-color: white;
}

.auth-form .input-label {
  margin-bottom: 1rem;
}

.auth-form label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.auth-form input {
  display: block;
  background-color: transparent;
  border: 2px solid hsla(0, 0%, 100%, 0.35);
  font: inherit;
  border-radius: 6px;
  padding: 10px;
  outline: none;
  color: inherit;
  width: 100%;
}

.auth-form button {
  border-radius: 6px;
  padding: 10px;
  background-color: #fff;
  border: 2px solid hsla(0, 0%, 100%, 0.35);
  color: #000;
  transition: all 0.3s ease-in-out;
}

.auth-form button:hover {
  background-color: #000;
  border: 2px solid #fff;
  color: white;
}

.auth-form button:disabled {
  background-color: rgba(255, 255, 255, 0.75);
  border: 2px solid rgba(255, 255, 255, 0.75);
  color: black;
  cursor: not-allowed;
}

/* animations */
.requiredenterfrom,
.requiredleaveto {
  opacity: 0;
}

.requiredenteractive {
  transition: all 0.3s ease-out;
}

.requiredenterto,
.requiredleavefrom {
  opacity: 1;
}
.requiredleaveactive {
  transition: all 0.3s ease-in;
}

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}
/* end animations */
</style>
