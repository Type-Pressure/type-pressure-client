<template>
  <div>
    <div>{{poin}}</div>
    <div>{{dictionary[index]}}</div>
    <canvas id="myCanvas" width="640" height="480" ref="game"></canvas>
    <h1>{{ position.x }}</h1>
    <form @submit.prevent="submited">
      <input v-model="inputed" type="text">
    </form>
    <button @click="move">Click Me!</button>
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
      dictionary: ['makan', 'minum', 'mandi', 'kerja', 'makan', 'minum', 'mandi', 'kerja', 'makan', 'minum', 'mandi', 'kerja'],
      socket: {},
      context: {},
      position: [],
      index: 0,
      imageUrl: ['https://i.imgur.com/VhSV0mJ.png', 'https://i.imgur.com/dIiXMva.png', 'https://i.imgur.com/z7TBY1X.png', 'https://i.imgur.com/b6IQrNR.png', 'https://i.imgur.com/ge91FP5.png']
    }
  },
  created () {
    this.socket = io('http://localhost:3000')
  },
  mounted () {
    this.socket.emit('addPlayer', {
      playerName: 'Budi',
      position: {
        x: 60,
        y: 0
      }
    })
    this.context = this.$refs.game.getContext('2d')
    this.socket.on('position', data => {
      this.position = data
      this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height)
      for (let i = 0; i < this.position.length; i++) {
        const img = new Image()
        img.src = this.imageUrl[i]
        img.onload = () => {
          this.context.drawImage(img, this.position[i].position.x, this.position[i].position.y, 50, 50)
        }
      }
    })
  },
  methods: {
    move () {
      this.socket.emit('move', {
        position: this.position
      })
    },
    submited () {
      if (this.inputed === this.dictionary[this.index]) {
        this.move()
        this.inputed = ''
        this.index += 1
        this.poin += 50
      }
    }
  }
}
</script>

<style>
#myCanvas{
  border: 1px solid black;
  background-image: url('../assets/map.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
