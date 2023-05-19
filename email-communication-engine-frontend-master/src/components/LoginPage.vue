<template>
    <div class="body">
        <div class="container ">
            <div class="row d-flex justify-content-center align-items-center flex-column">
                <div class="header">
                    <h2> <router-link to="/"> ✉️meeting mate🤝</router-link></h2>
                </div>
                <div class="col col-xl-10 m-3">

                    <div class="m-auto p-3" id="newClass">
                        <div class="row mt-3 d-flex justify-content-center align-items-center ">

                            <div class="col col-lg-5 col-md-6 d-none d-md-block">
                                <img src="../images/email.png" alt="login form" class="img-fluid" />
                            </div>

                            <div class="col col-md-6 col-lg-6">

                                <div class="card-body">

                                    <h2 class="mb-3 pb-3 text-white text-center fw-bolder">
                                        Signin to your account
                                    </h2>

                                    <form @submit.prevent="login">

                                        <div class="form-outline">
                                            <label class="form-label text-white" for="form-control">Email</label>
                                            <input type="email" v-model="email" class="form-control" name="email">
                                        </div>

                                        <div class="form-outline">
                                            <label class="form-label text-white" for="form-control">Password</label>
                                            <input type="password" v-model="password" class="form-control" name="password">
                                        </div>

                                        <div class="mt-3">
                                            <button class="btn btn-danger btn-lg btn-block">
                                                Login
                                            </button>
                                        </div>

                                        <p class="mt-5 text-white">
                                            Don't have an account? <a class="text-decoration-none text-info"
                                                href="/register">Register</a>
                                        </p>

                                        <p class="mt-3 text-white">
                                            Didn't verify your account? <a class="text-decoration-none text-info"
                                                href="/OTPVerification">Verify</a>
                                        </p>

                                    </form>
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
import { Signin } from '@/services/signin'
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {

            const credentials = {
                email: this.email,
                password: this.password
            }
            
            try {
                // console.log("first")
                console.log(credentials,"credentials");
                let response = await Signin(credentials);
                console.log(response.data.message,"3ewwdsasadrespponse");
                const { authToken, email, userId } = response.data;
                localStorage.setItem('token', authToken);
                localStorage.setItem('email', email);
                localStorage.setItem('userId', userId);

                this.$toasted.show(response.data.message, {
                    type: 'success'
                });
                this.$router.push({ name: 'home' })

            } catch (error) {
                // console.log(error.response.data.message,"error")
                this.$toasted.show(error.response.data.message, {
                    type: 'error'
                });
            }
        }
    }
}
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
    margin-bottom: 23px;
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

#newClass {
    box-shadow: 17px 10px 20px 6px black;
    background-color: #303E48;
    width: 90%;
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