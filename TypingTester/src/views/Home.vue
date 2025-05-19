<template>
  <!--create k02 overlay-->
  <div class="main" ref="background">
    <div class="view" ref="view">
      <div
        class="overlay"
        @click="closeTabs()"
        v-if="isDocsOpen || isEditOpen || isCustomOpen"
      ></div>
      <div class="nav">
        <h1>Spelling Tester <span class="span1">| Hosted by Aéza</span></h1>
        <div class="mode-buttons">
          <div class="settings-group">
            <button @click="changeLang()">{{ language }}</button>
            <button @click="setLowerCase()">Up Case</button>
            <button @click="enable()">{{ rankedText }}</button>
          </div>
          <div class="settings-group">
            <button @click="setWord('10')">10</button>
            <button @click="setWord('25')">25</button>
            <button @click="setWord('50')">50</button>
            <button @click="setWord('100')">100</button>
            <button @click="setCustomWord()">Custom</button>
          </div>
          <div class="settings-group">
            <button @click="resetText()">Reset</button>
            <button @click="skerr()">Practice add-on</button>
            <button @click="source()">Source</button>
            <button @click="changeTheme()">{{ theme }}</button>
          </div>
        </div>
      </div>
      <div class="container" v-if="score > 0">
        <br />
        <div class="result-container">
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
            <div class="keyboard-row">
              <span data-key="`">`~</span>
              <span data-key="1">1!</span>
              <span data-key="2">2@</span>
              <span data-key="3">3#</span>
              <span data-key="4">4$</span>
              <span data-key="5">5%</span>
              <span data-key="6">6^</span>
              <span data-key="7">7&</span>
              <span data-key="8">8*</span>
              <span data-key="9">9(</span>
              <span data-key="0">0)</span>
              <span data-key="-">-_</span>
              <span data-key="=">=+</span>
              <span data-key="backspace" class="backspace">Backspace</span>
            </div>
            <div class="keyboard-row">
              <span data-key="tab" class="tab">Tab</span>
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
              <span data-key="\\">\\|</span>
            </div>
            <div class="keyboard-row">
              <span data-key="capslock" class="capslock">Caps</span>
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
              <span data-key="enter" class="enter">Enter</span>
            </div>
            <div class="keyboard-row">
              <span data-key="shiftleft" class="shift">Shift</span>
              <span data-key="z">Z</span>
              <span data-key="x">X</span>
              <span data-key="c">C</span>
              <span data-key="v">V</span>
              <span data-key="b">B</span>
              <span data-key="n">N</span>
              <span data-key="m">M</span>
              <span data-key=",">,</span>
              <span data-key=".">.</span>
              <span data-key="/">/?</span>
              <span data-key="shiftright" class="shift">Shift</span>
            </div>
            <div class="keyboard-row">
              <span data-key="ctrlleft" class="ctrl">Ctrl</span>
              <span data-key="winleft" class="win">Win</span>
              <span data-key="altleft" class="alt">Alt</span>
              <span data-key=" " class="space">Space</span>
              <span data-key="altright" class="alt">Alt</span>
              <span data-key="winright" class="win">Win</span>
              <span data-key="ctrlright" class="ctrl">Ctrl</span>
            </div>
          </div>
        </div>
        <div class="keyboard-ru" v-if="language == 'russian'">
          <div class="keyboard-overlay">
            <div class="keyboard-row">
              <span data-key="ё">ёЁ</span>
              <span data-key="1">1!</span>
              <span data-key="2">2"</span>
              <span data-key="3">3№</span>
              <span data-key="4">4;</span>
              <span data-key="5">5%</span>
              <span data-key="6">6:</span>
              <span data-key="7">7?</span>
              <span data-key="8">8*</span>
              <span data-key="9">9(</span>
              <span data-key="0">0)</span>
              <span data-key="-">-_</span>
              <span data-key="=">=+</span>
              <span data-key="backspace" class="backspace">Backspace</span>
            </div>
            <div class="keyboard-row">
              <span data-key="tab" class="tab">Tab</span>
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
              <span data-key="\\">\\|</span>
            </div>
            <div class="keyboard-row">
              <span data-key="capslock" class="capslock">Caps</span>
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
              <span data-key="enter" class="enter">Enter</span>
            </div>
            <div class="keyboard-row">
              <span data-key="shiftleft" class="shift">Shift</span>
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
              <span data-key="shiftright" class="shift">Shift</span>
            </div>
            <div class="keyboard-row">
              <span data-key="ctrlleft" class="ctrl">Ctrl</span>
              <span data-key="winleft" class="win">Win</span>
              <span data-key="altleft" class="alt">Alt</span>
              <span data-key=" " class="space">Space</span>
              <span data-key="altright" class="alt">Alt</span>
              <span data-key="winright" class="win">Win</span>
              <span data-key="ctrlright" class="ctrl">Ctrl</span>
            </div>
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
      <button @click="enable()">{{ rankedText }}</button>
    </div>
    <div class="docs-view" v-if="isCustomOpen">
      <input type="text" :value="default_words" @input="event => default_words = event.target.value" placeholder="Enter words count"/>
    </div>
    <div class="information-menu">
      <h1>Currently this is website on beta testing / В настоящее время этот сайт находится на стадии бета-тестирования</h1>
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
      isCustomOpen: false,
      language: "russian",
      status: "Not started",
      hard_word: "",
      theme: "Dark",
      skerror: false,
      rankedText: "Ranked Disabled",
      lower_case: false,
      default_words: 10,
      enabled: false,
      score: 100,
      invert: false,
    };
  },
  mounted() {
    window.addEventListener("keydown", (e) => this.keydownHandle(e));
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
      if (this.isCustomOpen) {
        this.setCustomWord();
      }
      this.$refs.background.classList.remove("blur");
    },
    setCustomWord() {
      const count = prompt("Enter words count:", this.default_words);
      if (count !== null) {
        this.default_words = parseInt(count) || 10;
        this.resetText();
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
    resetText() {
      this.generatedSpecificText = this.generateText();
      this.symbolIndex = 0;
      this.userTypedText = "";
      this.status = "Not started";
    },
    keydownHandle(e) {
      let keyToHighlight = e.key.toLowerCase();
      
      // Handle special keys
      if (e.key === "Backspace") {
        keyToHighlight = "backspace";
      } else if (e.key === "Tab") {
        keyToHighlight = "tab";
      } else if (e.key === "CapsLock") {
        keyToHighlight = "capslock";
      } else if (e.key === "Enter") {
        keyToHighlight = "enter";
      } else if (e.key === "Shift") {
        keyToHighlight = e.location === 1 ? "shiftleft" : "shiftright";
      } else if (e.key === "Control") {
        keyToHighlight = e.location === 1 ? "ctrlleft" : "ctrlright";
      } else if (e.key === "Alt") {
        keyToHighlight = e.location === 1 ? "altleft" : "altright";
      } else if (e.key === "Meta") {
        keyToHighlight = e.location === 1 ? "winleft" : "winright";
      }

      const keyElement = document.querySelector(
        `.keyboard-overlay span[data-key="${keyToHighlight}"]`
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
      if (this.isCustomOpen) {
        if (e.target.tagName.toLowerCase() === 'input') {
          return;
        } else {
          e.preventDefault();
          return;
        }
      }
      if (e.key === "Backspace") {
        if (this.symbolIndex > 0) {
          this.symbolIndex--;
          this.userTypedText = this.userTypedText.slice(0, -1);
          this.status = "Not started";
        }
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
      const randomWords = [];
      const selectedWords = new Set();

      const totalWords = this.default_words;
      let wordsPool;

      if (this.language == "russian") {
        wordsPool = words;
      } else if (this.language == "english") {
        wordsPool = english_words;
      }

      for (let i = 0; i < totalWords; i++) {
        let selectedWord;
        do {
          selectedWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];
        } while (selectedWords.has(selectedWord));

        selectedWords.add(selectedWord);
        randomWords.push(selectedWord);
      }
      return randomWords.join(" ");
    },
  },
};
</script>
<style>
:root {
  --black: #1a1a1a;
  --white: #ffffff;
  --background: #242424;
  --primary: #646cff;
  --primary-hover: #535bf2;
  --error: #ff4d4d;
  --success: #4caf50;
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

body {
  font-weight: 600;
  transition: var(--transition);
  overflow: hidden;
  -webkit-overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--background);
  color: var(--white);
  line-height: 1.5;
}

.main {
  min-height: 100vh;
  padding: 2rem;
}

.nav {
  background-color: var(--white);
  color: var(--black);
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav h1 {
  font-size: 1.8rem;
  margin: 0;
  white-space: nowrap;
}

.mode-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.settings-group {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
}

.mode-buttons button {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border: none;
  background-color: var(--primary);
  color: var(--white);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.mode-buttons button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  backdrop-filter: blur(10px);
}

.result-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.result-container button {
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  border: 2px solid var(--primary);
  background: transparent;
  color: var(--white);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.result-container button:hover {
  background-color: var(--primary);
  color: var(--white);
}

.keyboard-overlay {
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 1000px;
  margin: 2rem auto;
}

.keyboard-row {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.keyboard-overlay span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  height: 3rem;
  padding: 0 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.1s ease-in-out;
  background-color: rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.keyboard-overlay span::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

.keypressed::after {
  opacity: 1;
}

.keypressed {
  background-color: var(--primary);
  color: var(--white);
  transform: scale(0.95);
  box-shadow: 0 0 20px rgba(100, 108, 255, 0.8);
  border-color: var(--primary);
  animation: keyPress 0.1s ease-in-out;
}

@keyframes keyPress {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(100, 108, 255, 0);
  }
  50% {
    transform: scale(0.95);
    box-shadow: 0 0 20px rgba(100, 108, 255, 0.8);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 20px rgba(100, 108, 255, 0.8);
  }
}

.highlighted {
  background-color: var(--primary);
  color: var(--white);
  border-radius: 4px;
  padding: 0 2px;
}

.incorrect {
  color: var(--error);
  text-decoration: underline wavy var(--error);
}

.docs-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  color: var(--black);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.docs-view h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.docs-view h2 {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--black);
  opacity: 0.8;
}

.docs-view button {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border: 2px solid var(--primary);
  background: transparent;
  color: var(--primary);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  margin: 0.5rem;
  min-width: 120px;
  pointer-events: auto;
}

.docs-view button:hover {
  background-color: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
}

.docs-view input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid var(--primary);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  outline: none;
  transition: var(--transition);
}

.docs-view input:focus {
  border-color: var(--primary-hover);
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.2);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 999;
  pointer-events: auto;
  filter: none !important;
}

.blur {
  filter: blur(5px);
  pointer-events: none;
}

.blur .docs-view {
  pointer-events: auto;
}

.information-menu {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  border-radius: var(--border-radius);
  max-width: 90%;
  z-index: 100;
}

.information-menu h1 {
  font-size: 1rem;
  color: var(--white);
  opacity: 0.8;
  margin: 0;
}

.else-container {
  text-align: center;
  padding: 4rem 2rem;
}

.else-container h1 {
  font-size: 3rem;
  color: var(--error);
  margin-bottom: 2rem;
}

.else-container button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.else-container button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.space-span {
  width: 300px;
  height: 20px;
  margin: 0.5rem;
}

.keyboard-overlay .space {
  min-width: 30rem;
}
</style>