<template>
  <div id="background">
      <input id="input_button" placeholder="input name"><router-link id="join_button" to="/board">Join Game</router-link>
  </div>
</template>

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
    margin-top: 6vh;
    height: 5vh;
    margin-right: 2vw;
}
</style>
