let app = new Vue({
  el: "#app",
  data: {
    adjective: null,
    noun: null
  },
  computed: {
    name(){
      return this.adjective + this.noun;
    }
  },
  created() {
    window.addEventListener('keydown', this.onKey)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKey)
  },
  methods: {
    onKey(event) {
      switch (event.key) {
        case 'n':
          this.newName();
          break;
        case 'c':
          this.copyNameToClipboard();
          break;
      }
    },
    async newName() {
      let name = await this.generateName();
      this.updateName(name);
    },
    updateName(name) {
      this.adjective = name[0];
      this.noun = name[1];
    },
    async generateName() {
      return [
        await this.readRandomWordFromFile('adjectives.csv'),
        await this.readRandomWordFromFile('nouns.csv')
      ];
    },
    async readRandomWordFromFile(filename) {
      const text = await this.readTextFile(filename);
      const words = text.split("\n");
      return words[Math.floor(Math.random() * words.length)].trim();
    },
    async readTextFile(filename) {
      const response = await fetch(filename);
      return await response.text();
    },
    copyNameToClipboard() {
      let dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = this.name;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      Toastify({
        text: "Copied to clipboard 😽",
        duration: 2000
      }).showToast();
    }
  },
  async beforeMount() {
    await this.newName();
  }
})
