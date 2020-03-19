<template>
  <div id="background">
    <form class="row justify-content-center" @submit.prevent="changePage">
      <input v-model="name" id="input_button" placeholder="input name" required>
      <input id="join_button" type="submit" value="Join">
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    changePage () {
      this.$store.commit('SET_NAME', this.name)
      this.$router.push('/board')
    }
  }
}
</script>

<style>
#background {
  background-image: url("../assets/map.png");
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: black;
  display: flex;
  justify-content: center;
}

#join_button {
    font-size: 3vh;
    background-color: blue;
    padding: 0.5vh;
    height: 5vh;
    border-radius: 2vh;
    color: white;
    margin-top: 5vh;
    display: flex;
    align-items: center;
    cursor: pointer;
}

#join_button:hover {
    background-color: rgb(104, 104, 236);

}

#input_button {
    margin-top: 5vh;
    height: 5vh;
    margin-right: 2vw;
}
</style>
