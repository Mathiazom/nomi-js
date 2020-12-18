let app = new Vue({
  el: "#app",
  data: {
    adjective: null,
    noun: null
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
        case 'r':
          this.newName();
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
    }
  },
  async beforeMount() {
    await this.newName();
  }
})
