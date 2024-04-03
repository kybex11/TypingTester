<template>
  <div class="container">
    <h1>Typing Tester</h1>
    <h2>{{status}}</h2>
    <br>
    <div class="mode-buttons">
      <button @click="setMode('standard')">Standard Mode</button>
      <button @click="setMode('medium')">Medium Mode</button>
    </div>
    <h1>
      <span v-for="(letter, index) in generatedSpecificText" :key="index">
        <span :class="{'highlighted': index === symbolIndex, 'incorrect': index < userTypedText.length && letter !== userTypedText[index]}">{{ letter }}</span>
      </span>
    </h1>
    <button v-if="userTypedText.length === generatedSpecificText.length || userTypedText.length > generatedSpecificText.length" @click="resetText">Reset</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      generatedSpecificText: this.generateText(),
      symbolIndex: 0,
      userTypedText: '',
      status: 'Not started',
      mode: "standart"
    };
  },
  mounted() { window.addEventListener('keydown', (e) => this.keydownHandle(e)); },
  methods: {
    setMode(mode) {
      this.mode = mode;
      this.generatedSpecificText = this.generateText();
    },
    resetText() {
      this.generatedSpecificText = this.generateText();
      this.symbolIndex = 0;
      this.userTypedText = '';
      this.status = "Not started";
    },
    keydownHandle(e) {
      if (e.key === 'CapsLock') {
        e.preventDefault();
        return;
      }
      if (e.key === this.generatedSpecificText[this.symbolIndex]) {
        this.status = "Typing normaly...";
        this.symbolIndex++;
        this.userTypedText += e.key;
      } else {
        this.status = "Typing error...";
        this.symbolIndex++;
        this.userTypedText += ' ';
      }
    },
    generateText() {
  const words = [
    "что", "слово", "сразу", "нет", "казаться", "понять", "свой", "ты", "на", "твой", "по","который", "ведь", "иметь","здесь", "никто", "а","голова", "сразу", "город","стол", "между", "и","понимать", "этот", "человек","для", "себя", "да","оно", "жизнь", "успех","телефон", "стул", "диван","купить", "народ", "холодный", "теплый", "горячий", "водка", "день", "дело", "вид", "время", "вопрос", "конец", "друг", "работа", "мир", "раз", "ребенок", "рука", "сила", "слово", "случай", "сторона", "страна", "человек", "быть", "взять", "видеть", "говорить", "дать", "думать", "знать", "мочь", "оказать", "оказаться", "получить", "понять", "сделать", "разработчик", "возможность", "игры", "убивать", "ребенок", "бабушка", "мама", "папа", "дедушка", "уролог", "врач", "больничный", "станция", "поезд", "палата", "еда", "каша", "картошка", "яблоко", "молока", "туалет"
  ];
  const randomWords = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    let word = words[randomIndex];
    if (this.mode === 'medium') {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    randomWords.push(word);
  }
  return randomWords.join(" ");
}
  }
}
</script>
<style>
.highlighted {
  background-color: yellow;
  color: black;
}
.incorrect {
  color: red;
}
body {
  -webkit-user-select: none;
  user-select: none;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: #242424;
}
.container {
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}
.resetButton {
  cursor: pointer;
  border: none;
  color: white;
  font-size: 2rem;
  background-color: #3498db;
  border-radius: 5px;
  padding: 20px;
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