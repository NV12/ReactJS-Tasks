let ATM_AMOUNT = 40000;
const NOTES_IN_MACHINE = {
	twoThousand: 10, //20000 = 10*2000
	fiveHundred: 38,	//19000 = 500*38
	hundred: 10 //1000 = 10*100
}

// let user_amount = 0;


// window.alert("HI");
function count_Notes(withdrawAmount) {
	// if()
	// console.log("ATM_AMOUNT", ATM_AMOUNT);
	let notesToRender = {
		twoThousand: 0,
		fiveHundred: 0,
		hundred: 0
	};

	if(ATM_AMOUNT === 0 )
		return "Cash not available";
	else if(withdrawAmount > ATM_AMOUNT)
		return "Enough cash is not available";
	else {
		console.log("Inside else");

		while(withdrawAmount>0) {
			console.log("Inside while");
			if(NOTES_IN_MACHINE.twoThousand > 0 && withdrawAmount%2000 == 0) {
				ATM_AMOUNT -=2000;
				NOTES_IN_MACHINE.twoThousand -=1;
				notesToRender.twoThousand +=1;
				withdrawAmount-=2000;
			} else if(NOTES_IN_MACHINE.fiveHundred > 0 && withdrawAmount%500 == 0 ) {
				ATM_AMOUNT -=500;
				NOTES_IN_MACHINE.fiveHundred -=1;
				notesToRender.fiveHundred +=1;
				withdrawAmount-=500;
			} else if(NOTES_IN_MACHINE.hundred > 0 && withdrawAmount%100 == 0 ) {
				ATM_AMOUNT -=100;
				NOTES_IN_MACHINE.hundred -=1;
				notesToRender.hundred +=1;
				withdrawAmount-=100;
			}	else {
				return "Plz enter an amount in multiple of 100,500 and 2000"
			}
		}

		return notesToRender;
	}
}

console.log(count_Notes(10000));
console.log(count_Notes(10000));
console.log(count_Notes(10000));
console.log(count_Notes(10000));
console.log(count_Notes(10000));