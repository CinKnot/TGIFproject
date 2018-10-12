var members = data.results[0].members;
var selector = document.getElementById("region");
var republican = document.getElementById('republican');
var democrat = document.getElementById('democrat');
var independant = document.getElementById('independant');

republican.addEventListener('click', function () {
	var filteredArray = myFilter();
	console.log(filteredArray)
	createTable(filteredArray);
});

democrat.addEventListener('click', function () {
	var filteredArray = myFilter();
	console.log(filteredArray)
	createTable(filteredArray);
});

independant.addEventListener('click', function () {
	var filteredArray = myFilter();
	console.log(filteredArray)
	createTable(filteredArray);
});

selector.addEventListener('change', function () {
	var filteredArray = myFilter();
	console.log(filteredArray)
	createTable(filteredArray);
});

myStatesArray()
selectState()

function createTable(array) {

	var table = document.getElementById("senate-data");
	var tbdy = document.getElementById("members");
	tbdy.innerHTML = "";

	for (var i = 0; i < array.length; i++) {
		var row = document.createElement("TR");
		var dataName = document.createElement("TD");

		if (array[i].middle_name == null) {
			dataName.innerHTML = (array[i].first_name + " " + array[i].last_name).link(array[i].url);
		} else {
			dataName.innerHTML = (array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name).link(array[i].url);

		}

		row.appendChild(dataName);


		var dataParty = document.createElement("TD");
		dataParty.innerHTML = array[i].party
		row.appendChild(dataParty);
		tbdy.appendChild(row);

		var dataState = document.createElement("TD");
		dataState.innerHTML = array[i].state;
		row.appendChild(dataState);
		tbdy.appendChild(row);

		var dataSeniority = document.createElement("TD");
		dataSeniority.innerHTML = array[i].seniority;
		row.appendChild(dataSeniority);
		tbdy.appendChild(row);

		var dataVotes_with_Party_Pct = document.createElement("TD");
		dataVotes_with_Party_Pct.innerHTML = array[i].votes_with_party_pct + '%';
		row.appendChild(dataVotes_with_Party_Pct);
		tbdy.appendChild(row);

	}
}

function myFilter() {
	var filter = [];
	for (var i = 0; i < members.length; i++) {
		if (selector.value == members[i].state || selector.value == "All") {

			if (republican.checked && members[i].party == "R") {
				filter.push(members[i]);
			}

			if (democrat.checked && members[i].party == "D") {
				filter.push(members[i]);
			}

			if (independant.checked && members[i].party == "I") {
				filter.push(members[i]);
			}
		}
	}
	return filter;
}

function myStatesArray() {
	var statesArray = [];
	for (i = 0; i < members.length; i++) {
		for (j = i + 1; j < members.length; j++) {
			if (members[i].state == members[j].state && !statesArray.includes(members[i].state)) {
				statesArray.push(members[i].state);
			}
		}
	}
	return statesArray.sort()
}

function selectState() {
	var stateArray = myStatesArray();
	console.log(stateArray);

	for (i = 0; i < stateArray.length; i++) {
		var option = document.createElement("option");
		option.innerHTML = stateArray[i];
		selector.appendChild(option);
	}
}
