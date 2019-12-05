let doing = false;
		let spin = [new Audio("res/sounds/merry.mp3"),
		new Audio("res/sounds/spin.mp3"),
		new Audio("res/sounds/spin.mp3"),
		new Audio("res/sounds/spin.mp3"),
		new Audio("res/sounds/spin.mp3"),
		new Audio("res/sounds/spin.mp3"),
		new Audio("res/sounds/spin.mp3")]
		let coin = [new Audio("res/sounds/coin.mp3"),
		new Audio("res/sounds/coin.mp3"),
		new Audio("res/sounds/coin.mp3")]
		let win = new Audio("res/sounds/win.mp3");
		let lose = new Audio("res/sounds/lose.mp3");
		let audio = false;
		let status = document.getElementById("status")

		function doSlot() {
			if (doing) { return null }
			doing = true;
			let numChanges = randomInt(1, 4) * 7;
			let numeberSlot1 = numChanges + randomInt(1, 7);
			let numeberSlot2 = numChanges + 2 * 7 + randomInt(1, 7);
			let numeberSlot3 = numChanges + 4 * 7 + randomInt(1, 7);

			let i1 = 0;
			let i2 = 0;
			let i3 = 0;
			let sound = 0;

			let slot1 = setInterval(spin1, 100);
			let slot2 = setInterval(spin2, 100);
			let slot3 = setInterval(spin3, 100);
			function spin1() {
				i1++;
				if (i1 >= numeberSlot1) {
					coin[0].play()
					clearInterval(slot1);
					return null;
				}
				slotTile = document.getElementById("slot1");
				if (slotTile.className == "a7") {
					slotTile.className = "a0";
				}
				slotTile.className = "a" + (parseInt(slotTile.className.substring(1)) + 1)
			}
			function spin2() {
				i2++;
				if (i2 >= numeberSlot2) {
					coin[1].play()
					clearInterval(slot2);
					return null;
				}
				slotTile = document.getElementById("slot2");
				if (slotTile.className == "a7") {
					slotTile.className = "a0";
				}
				slotTile.className = "a" + (parseInt(slotTile.className.substring(1)) + 1)
			}
			function spin3() {
				i3++;
				if (i3 >= numeberSlot3) {
					coin[2].play()
					clearInterval(slot3);
					testWin();
					return null;
				}
				slotTile = document.getElementById("slot3");
				if (slotTile.className == "a7") {
					slotTile.className = "a0";
				}
				sound++;
				if (sound == spin.length) {
					sound = 0;
				}
				spin[sound].play();
				slotTile.className = "a" + (parseInt(slotTile.className.substring(1)) + 1)
			}
		}

		function testWin() {
			var slot1 = document.getElementById("slot1").className
			var slot2 = document.getElementById("slot2").className
			var slot3 = document.getElementById("slot3").className
			if (((slot1 == slot2 && slot1 == slot3) ||
				(slot1 == slot2 && slot3) ||
				(slot1 == slot3 && slot2) ||
				(slot2 == slot3 && slot1) ||
				(slot1 == slot2 && slot1) ||
				(slot1 == slot3 && slot1) ||
				(slot2 == slot3 && slot2)) && !(slot1 == slot2 && slot2 == slot3)) {
				
				status.innerHTML = "<img src='res/tiles/merry.gif' >";

				win.play();
			} else {
				status.innerHTML = "<img src='res/tiles/lose.png'>";
				lose.play();
			}
			doing = false;
		}

		function audioGame() {
			if (!audio) {
				audio = !audio;
				for (var x of spin) {
					x.volume = 0.5;
				}
				for (var x of coin) {
					x.volume = 0.5;
				}
				win.volume = 1.0;
				lose.volume = 1.0;
			} else {
				audio = !audio;
				for (var x of spin) {
					x.volume = 0;
				}
				for (var x of coin) {
					x.volume = 0;
				}
				win.volume = 0;
				lose.volume = 0;
			}
			document.getElementById("audio").src = "res/icons/audio" + (audio ? "On" : "Off") + ".png";
		}
		function randomInt(min, max) {
			return Math.floor((Math.random() * (max - min + 1)) + min);
		}