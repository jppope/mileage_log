/**
 * Create a milage log
 * @Class Utils.MileageLog
 * @docauthor @jppope
 *
 * how often do you drive per week
 *
 * percentage of miles that are business related (default 85%)
 * are there any commutes that you do regularly what days
 * object of clients and how far they are away...
 * maximum commute
 * minimum commute
 * how many trips
 *
 *
 *
 */


var startingMilage = 0;
var endingMilage = 11500;
var religion= "";
var percentageWorkDriving=""
var mileageLog = [];

init();

/**
 * @method init
 * Let's get this started
 */
function init() {
	buildDaysOfWeek();
	buildMonth();
	daysOfMonth();
	isHoliday();
	//isReligousHoliday();
	assignRandomMilesToDay();
	main();
	//break random miles up per day
}

/**
 * Push days to mileageLog array
 */
function buildDaysOfWeek() {
	// for loop printing out days of the week for the year
	for(var i = 1; i < 366; i+=7){
		mileageLog[i] = {"dayYear": i, "dayOfWeek":"Thursday",};
		mileageLog[i+1] = {"dayYear": i+1 ,"dayOfWeek":"Friday"};
		mileageLog[i+2] = {"dayYear": i+2 ,"dayOfWeek":"Saturday"};
		mileageLog[i+3] = {"dayYear": i+3 ,"dayOfWeek":"Sunday"};
		mileageLog[i+4] = {"dayYear": i+4 ,"dayOfWeek":"Monday"};
		mileageLog[i+5] = {"dayYear": i+5 ,"dayOfWeek":"Tuesday"};
		mileageLog[i+6] = {"dayYear": i+6 ,"dayOfWeek":"Wednesday"};
	}
	mileageLog[365] = {"dayYear": 365, "dayOfWeek":"Thursday"};// last day is the 365th day not 364
	console.dir(mileageLog);
}

/**
 * Create month & days
 */
function buildMonth(){
	var daysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var month = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
	function months(){
		var counter = 0;
		for(var i = 0; i < 13; i++){
			var numDays = daysArray[i];
			var listMonth = month[i];
			function pushMonths(a,b,monthName){
				b += 1;
				var limit = a + b;
				for(var i = b; i < limit; i++){
					mileageLog[i].month = monthName;
					//console.log(monthName);
				}
				counter += a;
			}
			pushMonths(numDays,counter,listMonth);
		}
	}
	months();

}


function daysOfMonth() {
	var daysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var counter = 1;
	for (var i = 0; i < daysArray.length; i++) {
		var days = daysArray[i];
		var limit = counter + days;
		function eachDay(start,end) {
			var count = 0;
			if( end < 372) {
				for (var x = start; x < end; x++) {
					count += 1;
					counter +=1;
					mileageLog[x].dayMonth = count;
					//console.log(count);
				}
			}
			else{ console.log("the end");}
		}
		eachDay(counter,limit);
	}
}
daysOfMonth();

/**
 * Return true if holiday, false if not
 *
 * For different years this will need to be modified
 */
function isHoliday() {
	for(var i = 1; i < 365; i++){
		var date = mileageLog[i].dayYear;
		//console.log(date);
		if      (date === 1)  {console.log("New Years"); mileageLog[date].isHoliday = true; mileageLog[date].holidayName="New Years"; }
		else if (date === 19) {console.log("MLK jr day");mileageLog[date].isHoliday = true; mileageLog[date].holidayName="Martin Luther King Jr Day";}
		else if (date === 47) {console.log('Washingtons birthday');mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Washingtons Birthday";}
		else if (date === 145){console.log("Memorial Day");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Memorial Day";}
		else if (date === 185){console.log("July 4th/ Independence Day");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="July 4th";}
		else if (date === 250){console.log("Labor Day");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Labor Day";}
		else if (date === 285){console.log("Columbus Day");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Columbus Day";}
		else if (date === 315){console.log("Veterans Day");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Veterans Day";}
		else if (date === 330){console.log("Thanksgiving Day");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Thanksgiving";}
		else if (date === 359){console.log("Christmas");mileageLog[date].isHoliday = true;mileageLog[date].holidayName="Christmas";}
		else{mileageLog[date].isHoliday = false;}
	}
}

// different religious holidays, will turn
/*
function isReligousHoliday(religon){
	if(){}
	else if {}
	else{}

};
*/

/**
 * There needs to be a varied number of trips per day
 */

var mileageConstructorArray = [];

function assignRandomMilesToDay() {

	var totalMilesThisYear = endingMilage - startingMilage;
	var averageMiles = totalMilesThisYear / 365;
	var averageMilesPerDay = Math.floor(averageMiles);
	var weekdayMiles = averageMilesPerDay * 3.2;
	var weekendMiles = averageMilesPerDay /2;
	var mileageCount = 0;
	function randomInt(num){
		var integer = Math.random() * 1;
		return Math.floor( num * integer );
	}
	//while the sum total of all of the random numbers !== to ending amount rerun the function
	//handle weekends
	// start = 0
	// end = 11000
	// number of days 365
	//

	do {
		function generateTheMiles() {
			mileageCount = 0;
			for (var i = 1; i < 366; i += 7) {
				var generateRandomThursday = randomInt(weekdayMiles);
				var generateRandomFriday = randomInt(weekdayMiles);
				var generateRandomSaturday = randomInt(weekendMiles);
				var generateRandomSundday = randomInt(weekendMiles);
				var generateRandomMonday = randomInt(weekendMiles);
				var generateRandomTuesday = randomInt(weekdayMiles);
				var generateRandomWednesday = randomInt(weekdayMiles);

				//instead of throwing it right into the main array
				//put it into a secondary array minus the number of days for holidays
				//that way you can iterate the array from one array to the other.
				// but most importantly you can just skip the holiday true that coresponds
				//



				mileageLog[i].dayTotalMiles = generateRandomThursday;//thurs
				mileageCount += generateRandomThursday;//thurs
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);

				mileageLog[i + 1].dayTotalMiles = generateRandomFriday;//fri
				mileageCount += generateRandomFriday;//fri
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);

				mileageLog[i + 2].dayTotalMiles = generateRandomSaturday;//sat
				mileageCount += generateRandomSaturday;//sat
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);

				mileageLog[i + 3].dayTotalMiles = generateRandomSundday;//sun
				mileageCount += generateRandomSundday;//sun
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);

				mileageLog[i + 4].dayTotalMiles = generateRandomMonday;//mon
				mileageCount += generateRandomMonday;//mon
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);

				mileageLog[i + 5].dayTotalMiles = generateRandomTuesday;//tues
				mileageCount += generateRandomTuesday;//tues
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);

				mileageLog[i + 6].dayTotalMiles = generateRandomWednesday;//wed
				mileageCount += generateRandomWednesday;//wed
				mileageLog[i].totalMilesYear = mileageCount;
				console.log(mileageCount);
			}
			return mileageCount;
		}
		generateTheMiles();
	}while( mileageCount !== endingMilage);
}


/**
 * There needs to be a varied number of trips per day
 * weekend or weekday => more trips=& driving on weekdays
 */
function assignPercentWorkVsPersonal() {
}


function main() {
	return 'Hello, World!';
}

