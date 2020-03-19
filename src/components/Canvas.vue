<template>
  <div>
    <canvas id="myCanvas" width="640" height="480" ref="game"></canvas>
    <h1>{{ position.x }}</h1>
    <button @click="move">tes</button>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Canvas',
  data () {
    return {
      socket: {

      },
      context: {},
      position: []
    }
  },
  created () {
    this.socket = io('http://localhost:3000')
  },
  mounted () {
    this.socket.emit('addPlayer', {
      playerName: 'Budi',
      position: {
        x: 0,
        y: 0
      }
    })
    this.context = this.$refs.game.getContext('2d')
    this.socket.on('position', data => {
      this.position = data
      this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height)
      for (let i = 0; i < this.position.length; i++) {
        this.context.fillRect(this.position[i].position.x, this.position[i].position.y, 20, 20)
      }
      console.log(this.position.x)
      console.log(data)
    })
  },
  methods: {
    move () {
      this.socket.emit('move', 5)
    }
  }
}
</script>

<style>
#myCanvas{
  border: 1px solid black;
}
</style>
