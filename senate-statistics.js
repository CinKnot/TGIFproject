if (location.pathname == "/senate-attendance.html" || location.pathname == "/senate_loyalty.html") {
	getstatisticsData('https://api.propublica.org/congress/v1/113/senate/members.json')
} else if (location.pathname == "/house-attendance.html" || location.pathname == "/house-party-loyalty.html") {
	getstatisticsData('https://api.propublica.org/congress/v1/113/house/members.json')
}

function getstatisticsData(url) {
	console.log(url)
	fetch(url, {
			method: 'GET',
			headers: {
				'X-API-Key': "VGBTUMsjDxdmbxbqPyWJy7BBYeuophxBMi4ekoQB"
			}
		})
		.then(r => r.json())
		.then(json => {
			console.log(json);
			data = json;
			showPage();
			members = data.results[0].members;
			sortedArray = sortArrayBottomTen();
			sortedArrayForTop = sortArrayTopTen();
			leastEngaged = missedVotesSortArrayTopTen();
			mostEngaged = missedVotesSortArrayBottomten();
			leastLoyal = sortArrayBottomTen();
			mostLoyal = sortArrayTopTen();
			//							statistics = data.results["0"].members;
			statistics = {
				"numberDemocrat": stateNumber("D"),
				"numberRepublican": stateNumber("R"),
				"numberIndependent": stateNumber("I"),
				"Total": stateNumber("D") + stateNumber("R") + stateNumber("I"),


				"averageDemocrat": Math.round(arraySum("D") / stateNumber("D")) + "%",
				"averageRepublican": Math.round(arraySum("R") / stateNumber("R")) + "%",
				"averageIndependent": Math.round(arraySum("I") / stateNumber("I")) + "%",
				"totalAverage": Math.round((arraySum("D") + arraySum("R") + arraySum("I")) / members.length) + "%",

				"nameLeastLoyal": theNames(sortedArray),
				"noPartyVLeastLoyal": arrayOfVotes(sortedArray),
				"noPercPartyVLeastLoyal": percentageOfVotes(sortedArray),

				"nameMostLoyal": theNames(sortedArrayForTop),
				"noPartyVMostLoyal": arrayOfVotes(sortedArrayForTop),
				"noPercPartyVMostLoyal": percentageOfVotes(sortedArrayForTop),

				"nameLeastEngaged": theNames(leastEngaged),
				"noMissedVotesLeastEngaged": arrayOfMissedVotes(leastEngaged),
				"PercMissedVotesLeastEngaged": percentageOfMissedVotes(leastEngaged),

				"nameMostEngaged": theNames(mostEngaged),
				"noMissedVotesMostEngaged": arrayOfMissedVotes(mostEngaged),
				"PercMissedVotesMostEngaged": percentageOfMissedVotes(mostEngaged),
			}

			if (location.pathname == "/C:/Users/cknot/Documents/ExerciseTGIF/senate-attendance.html" || "/C:/Users/cknot/Documents/ExerciseTGIF/house-attendance.html") {
				createTable(leastEngaged, "people")
				createTable(mostEngaged, "mostEngaged")
				senateAtAGlanceTable();
			} else if (location.pathname == "/C:/Users/cknot/Documents/ExerciseTGIF/senate_loyalty.html") {
				createTableLoyalty(leastLoyal, "people")
				createTableLoyalty(mostLoyal, "mostEngaged")
				senateAtAGlanceTable();
			}
		});
}
function stateNumber(party) {
	var array = [];
	for (var i = 0; i < members.length; i++) {
		if (members[i].party == party) {
			array.push(members[i]);
		}
	}
	return array.length;
}

function arraySum(party) {
	var total = 0;

	for (var i = 0; i < members.length; i++) {
		if (members[i].party == party) {
			total += members[i].votes_with_party_pct;
		}
	}

	return (total);
}

function sortArrayBottomTen() {
	members.sort(function (a, b) {
		return a.votes_with_party_pct - b.votes_with_party_pct;
	});
	var x = tenPrcent(members)
	console.log(x)
	return x;
}

function missedVotesSortArrayBottomten() {
	members.sort(function (a, b) {
		return a.missed_votes_pct - b.missed_votes_pct;
	});
	var x = tenPrcent(members)
	return x;
}

function sortArrayTopTen() {
	members.sort(function (a, b) {
		return b.votes_with_party_pct - a.votes_with_party_pct;
	});
	var y = tenPrcent(members)
	console.log(y)
	return y;
}

function missedVotesSortArrayTopTen() {
	members.sort(function (a, b) {
		return b.missed_votes_pct - a.missed_votes_pct;
	});
	var x = tenPrcent(members)
	return x;
}

function tenPrcent(array) {
	var newArray = [];

	for (var i = 0; i < array.length; i++) {
		if (i < (array.length * 0.1)) {
			newArray.push(array[i])
		} else if (array[i] == array[i - 1]) {
			newArray.push(array[i])
		} else {
			break;
		}
	}
	return newArray
}

function arrayOfVotes(array) {
	var empty = [];
	for (var i = 0; i < array.length; i++) {
		empty.push(array[i].total_votes)

	}
	return empty
}

function arrayOfMissedVotes(array) {
	var empty = [];
	for (var i = 0; i < array.length; i++) {
		empty.push(array[i].missed_votes)

	}
	return empty
}

function percentageOfVotes(array) {
	var empty = [];
	for (var i = 0; i < array.length; i++) {
		empty.push(array[i].votes_with_party_pct)

	}
	return empty
}

function percentageOfMissedVotes(array) {
	var empty = [];
	for (var i = 0; i < array.length; i++) {
		empty.push(array[i].missed_votes_pct)

	}
	return empty
}

function theNames(array) {
	var empty = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i].middle_name == null) {
			empty.push(array[i].first_name + " " + array[i].last_name)
		} else {
			empty.push(array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name);
		}
	}
	return empty
}

function senateAtAGlanceTable() {
	var table = document.getElementById("party-data");
	var tbdy = document.getElementById("boys");
	tbdy.innerHTML = "";

	var demRow = document.createElement("TR");
	var dataDemName = document.createElement("TD");
	dataDemName.innerHTML = "Democrat";
	var dataTotalDem = document.createElement("TD");
	dataTotalDem.innerHTML = statistics["numberDemocrat"];
	var aveDem = document.createElement("TD");
	aveDem.innerHTML = statistics["averageDemocrat"];
	demRow.appendChild(dataDemName);
	demRow.appendChild(dataTotalDem);
	demRow.appendChild(aveDem);
	tbdy.appendChild(demRow);

	var demRow = document.createElement("TR");
	var dataDemName = document.createElement("TD");
	dataDemName.innerHTML = "Republican";
	var dataTotalDem = document.createElement("TD");
	dataTotalDem.innerHTML = statistics["numberRepublican"];
	var aveDem = document.createElement("TD");
	aveDem.innerHTML = statistics["averageRepublican"];
	demRow.appendChild(dataDemName);
	demRow.appendChild(dataTotalDem);
	demRow.appendChild(aveDem);
	tbdy.appendChild(demRow);

	var demRow = document.createElement("TR");
	var dataDemName = document.createElement("TD");
	dataDemName.innerHTML = "Independent";
	var dataTotalDem = document.createElement("TD");
	dataTotalDem.innerHTML = statistics["numberIndependent"];
	var aveInd = document.createElement("TD");
	if (statistics["averageIndependent"] === "NaN%") {
		aveInd.innerHTML = '0%';
	} else {
		aveInd.innerHTML =
			statistics["averageIndependent"];
	}

	var row = document.createElement("TR");
	var totalAverage = document.createElement("TD")
	totalAverage.innerHTML = "Total:";
	var totalMembers = document.createElement("TD");
	totalMembers.innerHTML = members.length;
	var totalAve = document.createElement("TD");
	totalAve.innerHTML = statistics["totalAverage"];

	demRow.appendChild(dataDemName);
	demRow.appendChild(dataTotalDem);
	demRow.appendChild(aveInd);
	row.appendChild(totalAverage);
	row.appendChild(totalMembers);
	row.appendChild(totalAve);
	tbdy.appendChild(demRow);
	tbdy.appendChild(row)

}

function createTable(array, id) {

	var tbdy = document.getElementById(id);
	tbdy.innerHTML = "";

	for (var i = 0; i < array.length; i++) {
		var row = document.createElement("TR");
		var name;
		if (array[i].middle_name == null) {
			name = (array[i].first_name + " " + array[i].last_name).link(array[i].url)
		} else {
			name = (array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name).link(array[i].url);
		}

		var missedVotesPct = array[i].missed_votes_pct;
		var missedVotes = array[i].missed_votes;

		var nameCell = document.createElement("TD");
		nameCell.innerHTML = name;
		row.appendChild(nameCell);
		tbdy.appendChild(row);

		var nameCell = document.createElement("TD");
		nameCell.innerHTML = missedVotes;
		row.appendChild(nameCell);
		tbdy.appendChild(row);

		var nameCell = document.createElement("TD");
		nameCell.innerHTML = missedVotesPct + "%";
		row.appendChild(nameCell);
		tbdy.appendChild(row);

	}
}

function createTableLoyalty(array, id) {

	var tbdy = document.getElementById(id);
	tbdy.innerHTML = "";

	for (var i = 0; i < array.length; i++) {
		var row = document.createElement("TR");
		var name;
		if (array[i].middle_name == null) {
			name = array[i].first_name + " " + array[i].last_name
		} else {
			name = array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name;
		}

		var percentageOfVotes = array[i].votes_with_party_pct;
		var totalVotes = array[i].total_votes;

		var nameCell = document.createElement("TD");
		nameCell.innerHTML = name;
		row.appendChild(nameCell);
		tbdy.appendChild(row);

		var nameCell = document.createElement("TD");
		nameCell.innerHTML = totalVotes;
		row.appendChild(nameCell);
		tbdy.appendChild(row);

		var nameCell = document.createElement("TD");
		nameCell.innerHTML = percentageOfVotes + "%";
		row.appendChild(nameCell);
		tbdy.appendChild(row);

	}
}

function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("myDiv").style.display = "block";
}
