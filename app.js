new Vue({
  el: "#app",
  data: {
    player: "Player",
    nameSet: false,
    start: false,
    playerHealth: 100,
    monsterHealth: 100,
    specialLabel: "0",
    turnsAfterSpecial: 0,
    specialAvailable: false,
    battleLog: []
  },
  methods: {
    startGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.battleLog = [];
      this.specialLabel = "0";
      this.turnsAfterSpecial = 0;
      this.specialAvailable = false;
    },
    attack: function() {
      var roll = this.rollDice();
      this.monsterHealth -= roll;
      this.battleLog.push({ type: "hit", val: roll });
      this.monsterTurn();
      this.turnsAfterSpecial += 1;
      if (this.turnsAfterSpecial < 4) {
        this.specialLabel = this.turnsAfterSpecial;
      } else {
        this.specialLabel = "Special";
        this.specialAvailable = true;
      }
    },
    special: function() {
      var roll = this.rollDice();
      this.monsterHealth -= roll * 2;
      this.battleLog.push({ type: "special skill hit", val: roll });
      this.monsterTurn();
      this.specialLabel = "0";
      this.turnsAfterSpecial = 0;
      this.specialAvailable = false;
    },
    heal: function() {
      var roll = this.rollDice();
      this.playerHealth += roll + 1;
      this.battleLog.push({ type: "heal", val: roll });
      this.monsterTurn();
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
    },
    rollDice: function() {
      return Math.floor(Math.random() * 12 + 1);
    },
    monsterTurn: function() {
      if (this.monsterHealth > 0) {
        var roll = this.rollDice();
        this.playerHealth -= roll;
        this.battleLog.push({ type: "hit", val: roll });
      }
    }
  },
  computed: {
    playerHealthStyle: function() {
      return {
        width: this.playerHealth + "%"
      };
    },
    monsterHealthStyle: function() {
      return {
        width: this.monsterHealth + "%"
      };
    }
  },
  watch: {
    playerHealth: function() {
      var vm = this;
      if (vm.playerHealth <= 0) {
        alert("You lose!");
        vm.start = false;
      }
    },
    monsterHealth: function() {
      var vm = this;
      if (vm.monsterHealth <= 0) {
        alert("You won!");
        vm.start = false;
      }
    }
  }
});
