let app = new Vue({
  el: "#app",
  data: {
    adjective: null,
    noun: null,
    adjective_list: null,
    noun_list: null
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
    newName() {
      this.adjective = this.randomElementFromList(this.adjective_list);
      this.noun = this.randomElementFromList(this.noun_list);
    },
    randomElementFromList(list) {
      return list[Math.floor(Math.random() * list.length)];
    },
    async readWordsFile(filename) {
      const response = await fetch(filename);
      const text = await response.text()
      return text.split("\n");
    },
    async loadWordLists() {
      this.adjective_list = await this.readWordsFile('adjectives.csv');
      this.noun_list = await this.readWordsFile('nouns.csv');
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
    await this.loadWordLists();
    this.newName();
  }
})
