<template>
  <div id="canvas-container">
    <div id="winner" v-if="winner">
      CONGRATS {{ winnerName }} YOU'RE SIMPLY THE BEST!
    </div>
    <div v-else>
      <div id="word">
        <div id="poin">{{poin}}</div>
        <div>{{dictionary[index]}}</div>
      </div>
      <canvas id="myCanvas" width="640" height="480" ref="game"></canvas>
      <h1>{{ position.x }}</h1>
      <form @submit.prevent="submited">
        <input v-model="inputed" type="text" autofocus>
      </form>
    </div>
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
      imageUrl: ['https://i.imgur.com/VhSV0mJ.png', 'https://i.imgur.com/dIiXMva.png', 'https://i.imgur.com/z7TBY1X.png', 'https://i.imgur.com/b6IQrNR.png', 'https://i.imgur.com/ge91FP5.png'],
      winner: false,
      winnerName: ''
    }
  },
  computed: {
    playerName () {
      return this.$store.state.name
    }
  },
  created () {
    this.socket = io('http://localhost:3000')
    console.log(this.playerName)
  },
  mounted () {
    this.socket.emit('addPlayer', {
      playerName: this.playerName,
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
    this.socket.on('finish', playerName => {
      this.winner = true
      this.$store.commit('SET_WINNER', true)
      this.winnerName = playerName
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
        if (this.poin < 500) {
          this.poin += 50
        }
        if (this.poin === 500) {
          console.log('Masuk')
          this.socket.emit('finish', this.playerName)
        }
      }
    }
  }
}
</script>

<style>
#canvas-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
}

#myCanvas{
  border: 1px solid black;
  background-image: url('../assets/map.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#winner {
  width: 100vw;
  height: 100vh;
  font-size: 10em;
  background-color: orange;
  color:blue;
  display: flex;
  align-items: center;
  justify-content: center;
}

#word {
  position: absolute;
  margin-top: 3vh;
  margin-left: 17vw;
  background-color: transparent;
  padding: 3vh;
  font-size: 3vh;
  font-weight: 900;
  font-family:'Courier New', Courier, monospace;
  border: 5px pink dashed;
  color: white;
}

</style>
