"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const getRandom = (ceil) => {
    return Math.ceil(Math.random() * ceil);
};
const rollDifficulty = () => {
    const numbers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
    const result = Array.from({ length: 4 }, () => numbers[getRandom(numbers.length - 1)]);
    return result;
};
class Game {
    constructor(countries) {
        this.getRoundData = () => {
            return {
                name: this.country.name,
                code: this.code,
                options: this.options.map((option) => option.name),
            };
        };
        this.reduceHealth = () => {
            this.health = this.health - 1;
            console.log("player health", this.health);
            return this.health;
        };
        this.handle = (countries) => {
            const roll = rollDifficulty();
            const options = this.getOptions(roll, countries);
            const country = this.pickCountry(options);
            const code = country.code;
            const newCountries = countries.filter((_country) => {
                return country.name !== _country.name;
            });
            return { country, code, options, countries: newCountries };
        };
        // helpers
        // private rollDifficulty = (): number[] => {
        //   const numbers = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
        //   return Array.from({ length: 4 }, () => numbers[getRandom(numbers.length)]);
        // };
        this.getOptions = (roll, countries) => {
            const easy = countries.filter((country) => country.population >= 50000000);
            const medium = countries.filter((country) => country.population >= 10000000);
            const hard = countries.filter((country) => country.difficulty < 10000000);
            // See if map works or back to foreach
            const picks = roll.map((difficulty) => {
                let chosenArray;
                if (difficulty === 1) {
                    chosenArray = easy;
                }
                else if (difficulty === 2) {
                    chosenArray = medium;
                }
                else {
                    chosenArray = hard;
                }
                const index = getRandom(chosenArray.length - 1);
                // const index = Math.floor(Math.random() * chosenArray.length);
                return chosenArray[index];
            });
            return picks;
        };
        this.pickCountry = (picks) => {
            const randomIndex = Math.floor(Math.random() * 4);
            return picks[randomIndex];
        };
        this._countries = countries;
        this.options = [];
        this.country = null;
        this.code = null;
        this.health = 3;
    }
    start() {
        const roundData = this.handle(this._countries);
        this._countries = roundData.countries;
        console.log(this._countries.length);
        this.options = roundData.options;
        this.country = roundData.country;
        this.code = roundData.code;
    }
    stop(userId) {
        console.log("Game stopped");
        // store score
    }
    next() {
        const updated = this.prep(this._countries);
        const roundData = this.handle(updated);
        this._countries = roundData.countries;
        this.options = roundData.options;
        this.country = roundData.country;
        this.code = roundData.code;
    }
    prep(countries) {
        const byPopulation = countries.sort((a, b) => b.population - a.population);
        const third = Math.ceil(byPopulation.length / 3);
        const updated = byPopulation.map((country, index) => {
            let difficulty;
            if (index < third) {
                difficulty = 1;
            }
            else if (index < 2 * third) {
                difficulty = 2;
            }
            else {
                difficulty = 3;
            }
            return Object.assign(Object.assign({}, country), { difficulty });
        });
        return updated;
    }
}
exports.Game = Game;
