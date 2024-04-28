<template>
  <!--create k02 overlay-->
  <div class="main" ref="background">
    <div class="view" ref="view">
      <div
        class="overlay"
        @click="closeTabs()"
        v-if="isDocsOpen || isEditOpen"
      ></div>
      <div class="nav">
        <h1>Spelling Tester <span class="span1">| Hosted by Aéza</span></h1>
        <div class="mode-buttons">
          <button @click="docs()">Docs</button>
          <button @click="edit_()">Edit</button>
          <button @click="resetText()">Reset</button>
          <button @click="source()">Source</button>
          <button @click="skerr()">Practice add-on</button>
          <button @click="changeTheme()">{{ theme }}</button>
        </div>
      </div>
      <div class="container" v-if="score > 0">
        <br />
        <div class="result-container">
          <button @click="setWord('10')">10</button>
          <button @click="setWord('25')">25</button>
          <button @click="setWord('50')">50</button>
          <button @click="setWord('100')">100</button>
          <h2>{{ status }}</h2>
          <h2 v-if="enabled">Ranked: {{ score }}</h2>
          <h2>Current mode: {{ mode }}</h2>
        </div>
        <br />
        <h1>
          <span v-for="(letter, index) in generatedSpecificText" :key="index">
            <span
              :class="{
                highlighted: index === symbolIndex,
                incorrect:
                  index < userTypedText.length &&
                  letter !== userTypedText[index],
              }"
              >{{ letter }}</span
            >
          </span>
        </h1>
        <br />
        <div class="keyboard-en" v-if="language == 'english'">
          <div class="keyboard-overlay">
            <span data-key="q">Q</span>
            <span data-key="w">W</span>
            <span data-key="e">E</span>
            <span data-key="r">R</span>
            <span data-key="t">T</span>
            <span data-key="y">Y</span>
            <span data-key="u">U</span>
            <span data-key="i">I</span>
            <span data-key="o">O</span>
            <span data-key="p">P</span>
            <span data-key="[">[{</span>
            <span data-key="]">]}</span>
            <br />
            <span data-key="a">A</span>
            <span data-key="s">S</span>
            <span data-key="d">D</span>
            <span data-key="f">F</span>
            <span data-key="g">G</span>
            <span data-key="h">H</span>
            <span data-key="j">J</span>
            <span data-key="k">K</span>
            <span data-key="l">L</span>
            <span data-key=";">;:</span>
            <span data-key="'">'"</span>
            <br />
            <span data-key="z">Z</span>
            <span data-key="x">X</span>
            <span data-key="c">C</span>
            <span data-key="v">V</span>
            <span data-key="b">B</span>
            <span data-key="n">N</span>
            <span data-key="m">M</span>
            <span data-key=",">,<</span>
            <span data-key=".">.></span>
            <span data-key="/">/?</span>
            <br />
            <span data-key=" " class="space-span"></span>
          </div>
        </div>
        <div class="keyboard-ru" v-if="language == 'russian'">
          <div class="keyboard-overlay">
            <span data-key="й">Й</span>
            <span data-key="ц">Ц</span>
            <span data-key="у">У</span>
            <span data-key="к">К</span>
            <span data-key="е">Е</span>
            <span data-key="н">Н</span>
            <span data-key="г">Г</span>
            <span data-key="ш">Ш</span>
            <span data-key="щ">Щ</span>
            <span data-key="з">З</span>
            <span data-key="х">Х</span>
            <span data-key="ъ">Ъ</span>
            <br />
            <span data-key="ф">Ф</span>
            <span data-key="ы">Ы</span>
            <span data-key="в">В</span>
            <span data-key="а">А</span>
            <span data-key="п">П</span>
            <span data-key="р">Р</span>
            <span data-key="о">О</span>
            <span data-key="л">Л</span>
            <span data-key="д">Д</span>
            <span data-key="ж">Ж</span>
            <span data-key="э">Э</span>
            <br />
            <span data-key="я">Я</span>
            <span data-key="ч">Ч</span>
            <span data-key="с">С</span>
            <span data-key="м">М</span>
            <span data-key="и">И</span>
            <span data-key="т">Т</span>
            <span data-key="ь">Ь</span>
            <span data-key="б">Б</span>
            <span data-key="ю">Ю</span>
            <span data-key=".">.</span>
            <br />
            <span data-key=" " class="space-span"></span>
          </div>
        </div>
      </div>
      <div class="else-container" v-else>
        <h1>Game Over!</h1>
        <br />
        <button @click="try_again()">Try again</button>
      </div>
    </div>
    <div class="docs-view" v-if="isDocsOpen">
      <h1>Reset text</h1>
      <h2>Press Enter</h2>
      <h1>Problem</h1>
      <h2>Hard mode working only in russian</h2>
    </div>
    <div class="docs-view" v-if="isEditOpen">
      <button @click="changeLang()">{{ language }}</button>
      <button @click="setLowerCase()">Up Case</button>
      <button @click="setMode('easy')">Easy Mode</button>
      <button @click="setMode('hard')">Hard Mode</button>
      <button @click="enable()">{{ rankedText }}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      generatedSpecificText: this.generateText(),
      symbolIndex: 0,
      userTypedText: "",
      isDocsOpen: false,
      isEditOpen: false,
      language: "russian",
      status: "Not started",
      hard_word: "",
      theme: "Dark",
      skerror: false,
      rankedText: "Ranked Disabled",
      lower_case: false,
      default_words: 10,
      mode: "",
      enabled: false,
      score: 100,
      invert: false,
    };
  },
  mounted() {
    window.addEventListener("keydown", (e) => this.keydownHandle(e));
    this.setMode("easy");
    this.generatedSpecificText = this.generateText();
  },
  methods: {
    changeTheme() {
      if (this.theme === "Dark") {
        this.theme = "Light";
        document.documentElement.style.setProperty("--black", "white");
        document.documentElement.style.setProperty("--white", "black");
        document.documentElement.style.setProperty("--background", "#F5F5F5");
      } else if (this.theme === "Light") {
        this.theme = "Dark";
        document.documentElement.style.setProperty("--black", "black");
        document.documentElement.style.setProperty("--white", "white");
        document.documentElement.style.setProperty("--background", "#242424");
      }
    },
    closeTabs() {
      if (this.isEditOpen) {
        this.edit_();
      }
      if (this.isDocsOpen) {
        this.docs();
      }
    },
    skerr() {
      this.skerror = !this.skerror;
      this.resetText();
    },
    setWord(val) {
      this.default_words = val;
      this.resetText();
    },
    source() {
      window.location.href = "https://github.com/kybex11/TypingTester";
    },
    changeLang() {
      if (this.language == "russian") {
        this.language = "english";
        this.resetText();
        this.setMode("easy");
      } else if (this.language == "english") {
        this.language = "russian";
        this.resetText();
      }
    },
    enable() {
      this.rankedText = "Ranked Enabled";
      this.enabled = !this.enabled;
      if (!this.enabled) {
        this.rankedText = "Ranked Disabled";
      }
      this.score = 100;
      this.resetText();
    },
    edit_() {
      this.isEditOpen = !this.isEditOpen;

      if (this.isEditOpen) {
        this.$refs.background.classList.add("blur");
      } else {
        this.$refs.background.classList.remove("blur");
      }
    },
    docs() {
      this.isDocsOpen = !this.isDocsOpen;

      if (this.isDocsOpen) {
        this.$refs.background.classList.add("blur");
      } else {
        this.$refs.background.classList.remove("blur");
      }
    },
    try_again() {
      this.score = 100;
      this.resetText();
    },
    setLowerCase() {
      this.lower_case = !this.lower_case;
      this.resetText();
    },
    setMode(mode) {
      this.mode = mode;
      this.resetText();
    },
    resetText() {
      this.generatedSpecificText = this.generateText();
      this.symbolIndex = 0;
      this.userTypedText = "";
      this.status = "Not started";
    },
    keydownHandle(e) {
      const keyElement = document.querySelector(
        `.keyboard-overlay span[data-key="${e.key.toLowerCase()}"]`,
      );

      if (keyElement) {
        keyElement.classList.add("keypressed");

        setTimeout(() => {
          keyElement.classList.remove("keypressed");
        }, 100);
      }
      if (e.shiftKey) {
        e.preventDefault();
        return;
      }
      if (e.key === "Enter") {
        this.resetText();
        e.preventDefault();
        return;
      }
      if (e.key === "CapsLock") {
        e.preventDefault();
        return;
      }
      if (!this.skerror) {
        if (e.key === this.generatedSpecificText[this.symbolIndex]) {
          this.status = "Normaly...";
          this.symbolIndex++;
          this.userTypedText += e.key;
        } else {
          this.status = "Error...";
          if (this.enabled) {
            this.score -= 1;
          }
          this.symbolIndex++;
          this.userTypedText += " ";
        }
      } else {
        if (e.key === this.generatedSpecificText[this.symbolIndex]) {
          this.status = "Normaly...";
          this.symbolIndex++;
          this.userTypedText += e.key;
        } else {
          this.status = "Error...";
          if (this.enabled) {
            this.score -= 1;
          }
        }
      }
    },
    generateText() {
      const english_words = [
        "i",
        "he",
        "his",
        "that",
        "was",
        "they",
        "was",
        "they",
        "as",
        "for",
        "on",
        "are",
        "with",
        "be",
        "at",
        "one",
        "have",
        "this",
        "from",
        "by",
        "hot",
        "word",
        "but",
        "what",
        "some",
        "is",
        "it",
        "you",
        "or",
        "had",
        "the",
        "of",
        "to",
        "and",
        "a",
        "in",
        "we",
        "can",
        "out",
        "other",
        "were",
        "which",
        "their",
        "time",
        "if",
        "will",
        "how",
        "said",
        "an",
        "each",
        "tell",
        "does",
        "set",
        "three",
        "want",
        "air",
        "well",
        "also",
        "play",
        "small",
        "end",
        "put",
        "home",
        "read",
        "hand",
        "port",
        "large",
        "spell",
        "add",
        "even",
        "land",
        "here",
        "must",
        "big",
        "high",
        "such",
        "follow",
        "act",
        "why",
        "ask",
        "men",
        "change",
        "went",
        "light",
        "kind",
        "off",
        "need",
        "house",
        "picture",
        "try",
        "us",
        "again",
        "animal",
        "point",
        "mother",
        "world",
        "near",
        "build",
        "self",
        "earth",
        "father",
        "any",
      ];
      const words = [
        "при",
        "стать",
        "два",
        "жизнь",
        "весь",
        "начало",
        "для",
        "выйти",
        "свой",
        "в",
        "что",
        "слово",
        "сразу",
        "нет",
        "казаться",
        "понять",
        "свой",
        "ты",
        "на",
        "твой",
        "по",
        "который",
        "ведь",
        "иметь",
        "здесь",
        "никто",
        "а",
        "голова",
        "сразу",
        "город",
        "стол",
        "между",
        "и",
        "понимать",
        "этот",
        "человек",
        "для",
        "себя",
        "да",
        "оно",
        "жизнь",
        "успех",
        "телефон",
        "стул",
        "диван",
        "купить",
        "народ",
        "холодный",
        "теплый",
        "горячий",
        "водка",
        "день",
        "дело",
        "вид",
        "время",
        "вопрос",
        "конец",
        "друг",
        "работа",
        "мир",
        "раз",
        "ребенок",
        "рука",
        "сила",
        "слово",
        "случай",
        "сторона",
        "страна",
        "человек",
        "быть",
        "взять",
        "видеть",
        "говорить",
        "дать",
        "думать",
        "знать",
        "мочь",
        "оказать",
        "оказаться",
        "получить",
        "понять",
        "сделать",
        "разработчик",
        "возможность",
        "игры",
        "убивать",
        "ребенок",
        "бабушка",
        "мама",
        "папа",
        "дедушка",
        "уролог",
        "врач",
        "больничный",
        "станция",
        "поезд",
        "палата",
        "еда",
        "каша",
        "картошка",
        "яблоко",
        "молока",
        "красный",
        "синий",
        "зеленый",
        "белый",
      ];
      const hard_words = [
        "бесспорно",
        "трансцендентный",
        "автостеклоподъмники",
        "длинношеее",
        "собираться",
        "вокруг",
        "который",
        "иметь",
        "первый",
        "ехать",
        "взгляд",
        "транскрипция",
        "аксессуар",
        "человеческий",
        "ветрогенератор",
        "голослов",
        "землетрясение",
        "огнетушитель",
        "дождевик",
        "молокосос",
        "водоснабжение",
        "железнодорожник",
        "алеть",
        "безынтересный",
        "безысходный",
        "безумный",
        "безопасный",
        "беспрекословный",
        "впечатлительный",
        "возрастать",
        "исчезающий",
        "мороженщик",
        "надеяться",
        "намерение",
      ];

      const randomWords = [];
      for (let i = 0; i < this.default_words; i++) {
        let selectedWord;
        if (this.language == "russian") {
          selectedWord = words[Math.floor(Math.random() * words.length)];
        } else if (this.language == "english") {
          selectedWord =
            english_words[Math.floor(Math.random() * english_words.length)];
        }

        if (this.mode === "hard") {
          selectedWord =
            hard_words[Math.floor(Math.random() * hard_words.length)];
        } else if (this.mode === "easy") {
          if (this.lower_case) {
            selectedWord =
              selectedWord.charAt(0).toUpperCase() + selectedWord.slice(1);
          } else {
            selectedWord = selectedWord.charAt(0) + selectedWord.slice(1);
          }
        }

        randomWords.push(selectedWord);
      }
      return randomWords.join(" ");
    },
  },
};
</script>
<style>
.result-container button {
  border: none;
  background: none;
  color: var(--white);
  font-size: 30px;
  cursor: pointer;
  margin-right: 15px;
}
:root {
  --black: black;
  --white: white;
  --background: #242424;
}

.space-span {
  width: 400px;
  height: 20px;
}
body {
  font-weight: 800;
  transition:
    background-color 0.4 ease,
    color 0.7 ease;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  background-color: var(--background);
}

.inverted {
  --black: white;
  --white: black;
}

.keypressed {
  background-color: var(--white);
  color: var(--black);
}

.keyboard-overlay span {
  display: inline-block;
  margin: 5px;
  padding: 20px 20px;
  border-radius: 5px;
  border-style: solid;
}

.span1 {
  font-size: 1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.blur > :not(.docs-view) {
  filter: blur(5px);
}

.docs-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: var(--white);
    color: var(--black);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.docs-view button {
  color: var(--black);
  border: none;
  background: none;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 1rem;
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
  border-radius: 5px;
  color: var(--black);
}

.incorrect {
  color: red;
}

.nav {
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--black);
  background-color: var(--white);
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
  display: flex;
}

.container {
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--white);
}

.mode-buttons button {
  padding: 20px;
  font-size: 1.5rem;
  border: none;
  background-color: var(--white);
  color: var(--black);
  cursor: pointer;
  outline: none;
}

.mode-buttons button:focus {
  outline: none;
}
</style>
