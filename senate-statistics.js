//Global Variables
var members = data.results[0].members;
var statistics = {
	"numberDemocrat": stateNumber("D"),
	"numberRepublican": stateNumber("R"),
	"numberIndependent": stateNumber("I"),

	//Senate at a Glance Party - Number of Reps	% Voted with Prty
	"averageDemocrat": Math.round(arraySum("D") / stateNumber("D")),
	"averageRepublican": Math.round(arraySum("R") / stateNumber("R")),
	"averageIndependent": Math.round(arraySum("I") / stateNumber("I")),

	//Least loyal (Bottom 10% of the party) - Name	Number Party Votes	% Party Votes
	"noVoteDemocrat": 0,
	"noVoteRepublican": 0,
	"noVoteIndependent": 0,

	//Most loyal (Top 10% of the party) - Name	Number Party Votes	% Party Votes
	"voteDemocrat": 0,
	"voteRepublican": 0,
	"voteIndependent": 0,

	//Least Engaged (Bottom 10% of the party) - Name Number of Missed Votes	% Missed
	"missedMostVotesDemocrat": 0,
	"missedMostVotesRepublican": 0,
	"missedMostVoteIndependent": 0,

	//Most Engated (Top 10% of the party ) - Name Number of Missed Votes % Missed
	"missedLeastVotesDemocrat": 0,
	"missedLeastVotesRepublican": 0,
	"missedLeastVoteIndependent": 0
};

function stateNumber(party) {
	var array = [];
	//	var republican = [];
	//	var independant = [];
	for (var i = 0; i < members.length; i++) {
		if (members[i].party == party) {
			array.push(members[i]);
		}
	}
	return array.length;
}

//stateNumber()

function arraySum(party) {
	var total = 0;

	for (var i = 0; i < members.length; i++) {
		if (members[i].party == party) {
			total += members[i].votes_with_party_pct;
		}


	}
	return total;
}
sortArray();

function sortArray() {
	members.sort(function (a, b) {
		return a.votes_with_party_pct - b.votes_with_party_pct;
	});
	var x = tenPrcent(members)
	return members;
}

function tenPrcent(array) {
	
}


//function arraySum(party) {
//	var total = 0;
//
//		for (var i = 0; i < members.length; i++) {
//			if (members[i].party == party) {
//				total += members[i].votes_with_party_pct;
//			}
//
//		} return total;
//}
