<template>
  <div class="main" ref="background">
    <div class="view">
      <div class="overlay" @click="docs()" v-if="isDocsOpen"></div>
      <div class="nav">
        <h1>Spelling Tester</h1>
        <div class="mode-buttons">
          <button @click="docs()">Docs</button>
          <button @click="changeLang()">{{ language }}</button>
          <button @click="setLowerCase()">Up Case</button>
          <button @click="setMode('easy')">Easy Mode</button>
          <button @click="setMode('hard')" v-if="hard_mode_button_visiblity">Hard Mode</button>
          <button @click="enable()">{{ rankedText }}</button>
          <button @click="resetText()">Reset</button>
        </div>
      </div>
      <div class="container" v-if="score > 0">
        <h2>{{ status }}</h2>
        <h2>Ranked {{ score }}</h2>
        <h2>Current mode: {{ mode }}</h2>
        <br />
        <h1>
          <span v-for="(letter, index) in generatedSpecificText" :key="index">
            <span
              :class="{
                highlighted: index === symbolIndex,
                incorrect: index < userTypedText.length && letter !== userTypedText[index]
              }"
              >{{ letter }}</span
            >
          </span>
        </h1>
      </div>
      <div class="else-container" v-else>
        <h1>Game Over!</h1>
        <br />
        <button @click="try_again()">Try again</button>
      </div>
    </div>
    <div class="docs-view" v-if="isDocsOpen">
    <h1>For reset text</h1>
    <h2>Shift+Enter</h2>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      generatedSpecificText: this.generateText(),
      symbolIndex: 0,
      userTypedText: '',
      isDocsOpen: false,
      language: 'russian',
      status: 'Not started',
      hard_word: '',
      rankedText: 'Ranked Disabled',
      lower_case: false,
      hard_mode_button_visiblity: true,
      mode: '',
      enabled: false,
      score: 100
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.keydownHandle(e))
  },
  methods: {
    changeLang() {
      if (this.language == 'russian') {
        this.language = 'english'
        this.hard_mode_button_visiblity = false
        this.setMode('easy')
      } else if (this.language == 'english') {
        this.language = 'russian'
        this.hard_mode_button_visiblity = true
      }
    },
    enable() {
      this.rankedText = 'Ranked Enabled'
      this.enabled = !this.enabled
      if (!this.enabled) {
        this.rankedText = 'Ranked Disabled'
      }
      this.score = 100
      this.userTypedText = ''
      this.generatedSpecificText = this.generateText()
      this.symbolIndex = 0
      this.status = 'Not started'
    },
    docs() {
      this.isDocsOpen = !this.isDocsOpen;

      if (this.isDocsOpen) {
        this.$refs.background.classList.add('blur');
      } else {
        this.$refs.background.classList.remove('blur');
      }
    },
    try_again() {
      this.score = 100
      this.userTypedText = ''
      this.generatedSpecificText = this.generateText()
      this.symbolIndex = 0
      this.status = 'Not started'
    },
    setLowerCase() {
      this.lower_case = !this.lower_case
      this.userTypedText = ''
      this.generatedSpecificText = this.generateText()
    },
    setMode(mode) {
      this.mode = mode
      this.userTypedText = ''
      this.generatedSpecificText = this.generateText()
    },
    resetText() {
      this.generatedSpecificText = this.generateText()
      this.symbolIndex = 0
      this.userTypedText = ''
      this.status = 'Not started'
    },
    keydownHandle(e) {
      if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        this.resetText();
        return;
      }
      if (e.key === 'CapsLock') {
        e.preventDefault()
        return
      }
      if (e.key === this.generatedSpecificText[this.symbolIndex]) {
        this.status = 'Normaly...'
        this.symbolIndex++
        this.userTypedText += e.key
      } else {
        this.status = 'Error...'
        if (this.enabled) {
          this.score -= 1
        }
        this.symbolIndex++
        this.userTypedText += ' '
      }
    },
    generateText() {
      const english_words = [
        'i',
        'he',
        'his',
        'that',
        'was',
        'they',
        'was',
        'they',
        'as',
        'for',
        'on',
        'are',
        'with',
        'be',
        'at',
        'one',
        'have',
        'this',
        'from',
        'by',
        'hot',
        'word',
        'but',
        'what',
        'some',
        'is',
        'it',
        'you',
        'or',
        'had',
        'the',
        'of',
        'to',
        'and',
        'a',
        'in',
        'we',
        'can',
        'out',
        'other',
        'were',
        'which',
        'their',
        'time',
        'if',
        'will',
        'how',
        'said',
        'an',
        'each',
        'tell',
        'does',
        'set',
        'three',
        'want',
        'air',
        'well',
        'also',
        'play',
        'small',
        'end',
        'put',
        'home',
        'read',
        'hand',
        'port',
        'large',
        'spell',
        'add',
        'even',
        'land',
        'here',
        'must',
        'big',
        'high',
        'such',
        'follow',
        'act',
        'why',
        'ask',
        'men',
        'change',
        'went',
        'light',
        'kind',
        'off',
        'need',
        'house',
        'picture',
        'try',
        'us',
        'again',
        'animal',
        'point',
        'mother',
        'world',
        'near',
        'build',
        'self',
        'earth',
        'father',
        'any'
      ]
      const words = [
        'при',
        'стать',
        'два',
        'жизнь',
        'весь',
        'начало',
        'для',
        'выйти',
        'свой',
        'в',
        'что',
        'слово',
        'сразу',
        'нет',
        'казаться',
        'понять',
        'свой',
        'ты',
        'на',
        'твой',
        'по',
        'который',
        'ведь',
        'иметь',
        'здесь',
        'никто',
        'а',
        'голова',
        'сразу',
        'город',
        'стол',
        'между',
        'и',
        'понимать',
        'этот',
        'человек',
        'для',
        'себя',
        'да',
        'оно',
        'жизнь',
        'успех',
        'телефон',
        'стул',
        'диван',
        'купить',
        'народ',
        'холодный',
        'теплый',
        'горячий',
        'водка',
        'день',
        'дело',
        'вид',
        'время',
        'вопрос',
        'конец',
        'друг',
        'работа',
        'мир',
        'раз',
        'ребенок',
        'рука',
        'сила',
        'слово',
        'случай',
        'сторона',
        'страна',
        'человек',
        'быть',
        'взять',
        'видеть',
        'говорить',
        'дать',
        'думать',
        'знать',
        'мочь',
        'оказать',
        'оказаться',
        'получить',
        'понять',
        'сделать',
        'разработчик',
        'возможность',
        'игры',
        'убивать',
        'ребенок',
        'бабушка',
        'мама',
        'папа',
        'дедушка',
        'уролог',
        'врач',
        'больничный',
        'станция',
        'поезд',
        'палата',
        'еда',
        'каша',
        'картошка',
        'яблоко',
        'молока',
        'красный',
        'синий',
        'зеленый',
        'белый'
      ]
      const hard_words = [
        'бесспорно',
        'трансцендентный',
        'автостеклоподъмники',
        'длинношеее',
        'собираться',
        'вокруг',
        'который',
        'иметь',
        'первый',
        'ехать',
        'взгляд',
        'транскрипция',
        'аксессуар',
        'человеческий',
        'ветрогенератор',
        'голослов',
        'землетрясение',
        'огнетушитель',
        'дождевик',
        'молокосос',
        'водоснабжение',
        'железнодорожник',
        'алеть',
        'безынтересный',
        'безысходный',
        'безумный',
        'безопасный',
        'беспрекословный',
        'впечатлительный',
        'возрастать',
        'исчезающий',
        'мороженщик',
        'надеяться',
        'намерение'
      ]

      const randomWords = []
      for (let i = 0; i < 10; i++) {
        let selectedWord
        if (this.language == 'russian') {
          selectedWord = words[Math.floor(Math.random() * words.length)]
        } else if (this.language == 'english') {
          selectedWord = english_words[Math.floor(Math.random() * english_words.length)]
        }

        if (this.mode === 'hard') {
          selectedWord = hard_words[Math.floor(Math.random() * hard_words.length)]
        } else if (this.mode === 'easy') {
          if (this.lower_case) {
            selectedWord = selectedWord.charAt(0).toUpperCase() + selectedWord.slice(1)
          } else {
            selectedWord = selectedWord.charAt(0) + selectedWord.slice(1)
          }
        }

        randomWords.push(selectedWord)
      }
      return randomWords.join(' ')
    }
  }
}
</script>
<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  z-index: 99;
}
.blur > :not(.docs-view) {
  filter: blur(5px);
}
.docs-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index:100;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.else-container {
  color: red;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.else-container h1 {
  font-size: 5rem;
}

.else-container button {
  -webkit-user-select: none;
  user-select: none;
  border: none;
  padding: 20px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
}

.highlighted {
  background-color: yellow;
  color: black;
}

.incorrect {
  color: red;
}

body {
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
  background-color: #242424;
}
.nav {
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
  display: flex;
}
.container {
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}
.mode-buttons button {
  padding: 20px;
  font-size: 1.5rem;
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
}
</style>
