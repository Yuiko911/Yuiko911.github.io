const { createApp } = Vue

createApp({
	data: () => ({
		todayswordinput: '',
		guessedwordinput: '',
		rowcolors: [['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.']],
		rowletter: [[], [], [], [], [], []],
		allfoundwords: [[], [], [], [], [], []]
	}),
	computed: {
		todaysword() { return this.todayswordinput.toUpperCase() },
		guessedword() { return this.guessedwordinput.toUpperCase() },
	},
	methods: {
		isWordValid(word) {
			return word.length == 5 && WORDS.indexOf(word) >= 0
		},
		setPresets(id) {
			this.rowletter = [[], [], [], [], [], []]
			switch (id) {
				case 0:
					this.rowcolors = [['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '.', '.']]
					break;
				case 1:
					this.rowcolors = [['.', '.', '!', '!', '!'], ['!', '!', '!', '.', '!'], ['!', '.', '.', '.', '!'], ['!', '!', '!', '.', '!'], ['!', '.', '!', '.', '!'], ['!', '!', '!', '.', '.']]
					break;
				case 2:
					this.rowcolors = [['?', '?', '?', '.', '.'], ['?', '?', '?', '.', '.'], ['?', '?', '.', '.', '.'], ['.', '.', '.', '.', '.'], ['.', '.', '.', '!', '!'], ['!', '!', '!', '!', '!']]
					break;

				default:
					break;
			}
		},
		seeOtherWords(row) {
			alert(this.allfoundwords[row])
		},

		toggleLetter(rindex, lindex) {
			if (this.rowcolors[rindex][lindex] === '.') { this.rowcolors[rindex][lindex] = '!' }
			else if (this.rowcolors[rindex][lindex] === '!') { this.rowcolors[rindex][lindex] = '?' }
			else if (this.rowcolors[rindex][lindex] === '?') { this.rowcolors[rindex][lindex] = '.' }
		},
		areArraysEqual(arr1, arr2) {
			if (arr1.length !== arr2.length) return false
			return arr1.every((v, i) => arr2[i] === v)
		},
		compareForward(correct, guess) {
			let result = ['.', '.', '.', '.', '.']

			let availableletters = correct.split('')

			// Correct letters
			guess.split('').forEach((l, i) => {
				if (l === correct.split('')[i]) {
					result[i] = '!'

					let _index = availableletters.indexOf(l)
					if (_index > -1) availableletters.splice(_index, 1)
				}
			})

			// Partial letters
			guess.split('').forEach((l, i) => {
				if (result[i] != '!' && availableletters.indexOf(l) > -1) {
					result[i] = '?'

					let _index = availableletters.indexOf(l)
					if (_index > -1) availableletters.splice(_index, 1)
				}
			})

			return result
		},
		compareBackward(correct, result) {

			let validwords = []

			WORDS.forEach((word) => {
				if (this.areArraysEqual(this.compareForward(correct, word), result)) {
					validwords.push(word)
				}
			})

			return validwords
		},
		getAnswer() {
			if (!this.isWordValid(this.todaysword)) {
				alert(`The word ${this.todaysword} is not a valid Wordle word.`)
				return
			}

			this.rowcolors.forEach((row, rowindex) => {
				const foundwords = this.compareBackward(this.todaysword, row)
				if (foundwords.length === 0) {
					this.allfoundwords[rowindex] = []
					this.rowletter[rowindex] = []
				} else {
					this.allfoundwords[rowindex] = foundwords
					this.rowletter[rowindex] = foundwords[0].split('')
				}

			})
		}
	}
}).mount('#app')
