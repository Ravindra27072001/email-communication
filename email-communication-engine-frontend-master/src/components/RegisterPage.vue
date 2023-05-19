<template>
  <div class="body">
    <div class="container  ">
      <!-- <div class="heading">
      <router-link to="/" style="text-decoration: none; color: white;">
        Meeting Scheduler
      </router-link>
    </div> -->
      <div class="header">
        <h2> <router-link to="/"> ✉️meeting mate🤝</router-link></h2>
      </div>
      <div class="row d-flex justify-content-center align-items-center mt-10">
        <div class="col col-xl-10 m-3">

          <div class="m-auto p-3" id="newClass">
            <div class="row d-flex justify-content-center align-items-center">

              <div class="col col-lg-5 col-md-6 d-none d-md-block">
                <img src="../images/email.png" alt="login form" class="img-fluid" />
              </div>

              <div class="col col-lg-6 col-md-6">
                <div class="card-body">

                  <h2 class="mb-3 pb-3 text-white text-center fw-bolder">SignUp to your account</h2>

                  <form @submit.prevent="submit">

                    <div class="form-outline">
                      <label class="form-label text-white" for="form-control">Name</label>
                      <input type="text" class="form-control" v-model.trim="$v.name.$model" :class="{
                        'is-invalid': $v.name.$error,
                        'is-valid': !$v.name.$invalid,
                      }" name="name" />
                      <div class="invalid-feedback">
                        <span v-if="!$v.name.required">Name is required</span>
                      </div>
                    </div>

                    <div class="form-outline">
                      <label class="form-label text-white" for="form-control">Email address</label>
                      <input type="email" class="form-control" v-model.trim="$v.email.$model" :class="{
                        'is-invalid': $v.email.$error,
                        'is-valid': !$v.email.$invalid,
                      }" name="email" />
                      <div class="valid-feedback">Your email is valid</div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.email.required">email is required</span>
                        <span v-if="!$v.email.email">This email is not valid</span>
                      </div>
                    </div>

                    <div class="form-outline">
                      <label class="form-label text-white" for="form-control">Password</label>
                      <input type="password" class="form-control" v-model.trim="$v.password.$model" :class="{
                        'is-invalid': $v.password.$error,
                        'is-valid': !$v.password.$invalid,
                      }" name="password" />

                      <div class="valid-feedback">Your password is valid</div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.password.required">Password is required</span>
                        <span v-else-if="!$v.password.lowerCase">password should contains atleast one lowerCase
                          letter</span>
                        <span v-else-if="!$v.password.upperCase">Password should contains atleast one upperCase
                          letter</span>
                        <span v-else-if="!$v.password.specialCharecter">password should contains atleast one special
                          character</span>
                        <span v-else-if="!$v.password.integer">Password should contains atleast one number</span>
                        <span v-else-if="!$v.password.minLength">Password should contains atleast 8 character</span>
                      </div>
                    </div>

                    <div class="form-outline">
                      <label class="form-label text-white" for="form2Example27">Confirm Password</label>
                      <input type="password" class="form-control" v-model.trim="$v.repeatPassword.$model" :class="{
                        'is-invalid': $v.repeatPassword.$error,
                        'is-valid': password != '' ? !$v.repeatPassword.$invalid : '',
                      }" name="confirmPassword" />
                      <div class="valid-feedback">
                        Your password is identical!
                      </div>
                      <div class="invalid-feedback">
                        <span v-if="!$v.repeatPassword.sameAsPassword">Passwod must be identical.</span>
                      </div>
                    </div>

                    <div v-show="showOTP" class="form-outline">
                      <label class="form-label text-white" for="form-control">Enter the OTP</label>
                      <input v-model="otp" type="text" class="form-control" name="otp" />
                    </div>

                    <div class="mt-3" style="cursor: pointer;">
                      <button v-show="showSubmitButton" style="cursor: pointer;"
                        class="btn btn-danger btn-lg btn-block register-btn" :disabled="$v.$invalid">
                        Register
                      </button>
                    </div>
                  </form>

                  <div class="mt-3">
                    <button @click="verifyOTP()" v-show="showOTPButton" class="btn btn-info btn-lg btn-block"
                      :disabled="$v.$invalid">
                      Verify OTP
                    </button>
                  </div>

                  <div v-show="showSpinner" class="spinner-border text-light" role="status">
                    <span class="sr-only"></span>
                  </div>

                  <p class="mt-3 text-white">
                    Already have an account?
                    <a class="text-decoration-none text-info" href="/">Login</a>
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { Signup } from "@/services/signup";
import { VerifyOTP } from "@/services/verifyOTP"

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      otp: "",
      userId: "",
      response: "",
      showSpinner: false,
      showOTP: false,
      showOTPButton: false,
      showSubmitButton: true,
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      integer(value) {
        return /([0-9])/.test(value)
      },
      specialCharecter(value) {
        return /([!@#$%^&*])/.test(value)
      },
      upperCase(value) {
        return (/[A-Z]/).test(value);
      },
      lowerCase(value) {
        return (/[a-z]/).test(value);
      },
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },

  methods: {
    async submit() {

      const credentials = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.showSpinner = true;
      this.showSubmitButton = false;

      try {
        let response = await Signup(credentials)
        // console.log(response);
        this.$toasted.show(response.data.message, {
          type: 'success'
        });
        this.userId = response.data.data.userId
        this.otp = response.data.data.otp
        this.showSpinner = false;
        this.showOTPButton = true;
        this.showOTP = true

      } catch (error) {
        this.showSpinner = false;
        this.showSubmitButton = true;
        // console.log(error);
        this.$toasted.show(error.response.data.message, {
          type: 'error'
        });
      }
    },

    async verifyOTP() {

      const credentials = {
        userId: this.userId,
        otp: this.otp,
        email: this.email,
      }


      try {
        const response = await VerifyOTP(credentials);
        // console.log(response)
        this.$toasted.show(response.data.message, {
          type: 'success'
        });
        this.$router.push({ name: 'login' })

      } catch (error) {

        this.$toasted.show(error.response.data.message, {
          type: 'error'
        });
      }
    }
  },
};
</script>
  
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.body {
  background-image: url('https://media.giphy.com/media/BHNfhgU63qrks/giphy.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  /* background-color: aqua; */
}

.heading {
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  border: 1px solid grey;
  border-radius: 13px;
  padding: 20px 0px;
  color: white;
  background-color: black;
  width: 67%;
  margin: auto;
}

.heading a {
  width: 50%;
  text-align: center;
}

#newClass {
  box-shadow: 17px 10px 20px 6px black;
  background-color: #303E48;
  width: 90%;
  background: rgb(0, 0, 0);
  background: linear-gradient(93deg, rgba(0, 0, 0, 1) 0%, rgba(193, 129, 194, 1) 100%);
}

.header {
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 12px;
  background: black;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 30%;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 5px;
}

.header:hover {
  color: black;
  background: #303E48;
  transform: scale(1.1);
  transition: 250ms;
  cursor: pointer;
  ;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  color: white;
}
</style>