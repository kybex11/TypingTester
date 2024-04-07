<template>
  <div class="container">
    <h1>Typing Tester</h1>
    <h2>{{status}}</h2>
    <h2>Current mode: {{mode}}</h2>
    <br>
    <div class="mode-buttons">
      <button @click="setMode('easy')">Easy Mode</button>
      <button @click="setMode('medium')">Medium Mode</button>
      <button @click="setMode('hard')">Hard Mode</button>
    </div>
    <h1>
      <span v-for="(letter, index) in generatedSpecificText" :key="index">
        <span :class="{'highlighted': index === symbolIndex, 'incorrect': index < userTypedText.length && letter !== userTypedText[index]}">{{ letter }}</span>
      </span>
    </h1>
    <button @click="resetText">Reset</button>
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
      hard_word: "",
      mode: "easy"
    };
  },
  mounted() { window.addEventListener('keydown', (e) => this.keydownHandle(e)); },
  methods: {
    setMode(mode) {
      this.mode = mode;
      this.userTypedText = '';
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
    "что", "слово", "сразу", "нет", "казаться", "понять", "свой", "ты", "на", "твой", "по","который", "ведь", "иметь","здесь", "никто", "а","голова", "сразу", "город","стол", "между", "и","понимать", "этот", "человек","для", "себя", "да","оно", "жизнь", "успех","телефон", "стул", "диван","купить", "народ", "холодный", "теплый", "горячий", "водка", "день", "дело", "вид", "время", "вопрос", "конец", "друг", "работа", "мир", "раз", "ребенок", "рука", "сила", "слово", "случай", "сторона", "страна", "человек", "быть", "взять", "видеть", "говорить", "дать", "думать", "знать", "мочь", "оказать", "оказаться", "получить", "понять", "сделать", "разработчик", "возможность", "игры", "убивать", "ребенок", "бабушка", "мама", "папа", "дедушка", "уролог", "врач", "больничный", "станция", "поезд", "палата", "еда", "каша", "картошка", "яблоко", "молока", "красный", "синий", "зеленый", "белый"
  ];
  const hard_words = [
    "бесспорно", "трансцендентный","автостеклоподъмники", "длинношеее","собираться", "вокруг","который", "иметь","первый", "ехать","взгляд", "транскрипция","аксессуар", "человеческий","ветрогенератор", "голослов","землетрясение", "огнетушитель","дождевик", "молокосос","водоснабжение", "железнодорожник","алеть", "безынтересный","безысходный", "безумный","безопасный", "беспрекословный","впечатлительный", "возрастать","исчезающий", "мороженщик","надеяться", "намерение"
  ]
  const randomWords = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    let word = words[randomIndex];
    for (let i = 0; i < 10; i++) {
      const random_hard_index = Math.floor(Math.random() * hard_words.length);
      this.hard_word = hard_words[random_hard_index];
    }
    if (this.mode === 'medium') {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      randomWords.push(word);
    } else if (this.mode === "hard") {
      this.hard_word = this.hard_word.charAt(0).toUpperCase() + this.hard_word.slice(1);
      randomWords.push(this.hard_word);
    } else if (this.mode === "easy") {
      randomWords.push(word);
    }
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
