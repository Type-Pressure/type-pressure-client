<template>
  <div>
    <canvas id="myCanvas" width="640" height="480" ref="game"></canvas>
    <h1>{{ position.x }}</h1>
    <form @submit.prevent="submited">
      <input v-model="inputed" type="text">
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Canvas',
  data () {
    return {
      inputed: '',
      poin: 0,
      dictionary: ['makan', 'minum', 'mandi', 'kerja'],
      socket: {},
      context: {},
      position: [],
      index: 0
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
    })
  },
  methods: {
    move () {
      this.socket.emit('move', 5)
    },
    submited () {
      if (this.inputed === this.dictionary[this.index]) {
        this.move()
        this.inputed = ''
        this.index += 1
        this.poin += 5
      }
    }
  }
}
</script>

<style>
#myCanvas{
  border: 1px solid black;
}
</style>
