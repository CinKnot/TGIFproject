var app = new Vue({
	el: "#app",
	data: {
		members: [],
		allMembers: [],
		states: [],
		senate: 'https://api.propublica.org/congress/v1/113/senate/members.json',
		house: 'https://api.propublica.org/congress/v1/113/house/members.json',
	},
	created() {
		if (location.pathname == "/senate-data.html") {
			this.getData(this.senate);
		} else if (location.pathname == "/house-data.html") {
			this.getData(this.house);
		}
	},
	methods: {
		getData(url) {
			fetch(url, {
					method: 'GET',
					headers: {
						'X-API-Key': "VGBTUMsjDxdmbxbqPyWJy7BBYeuophxBMi4ekoQB"
					}
				})
				.then(r => r.json())
				.then(json => {
				console.log(json)
					app.members = json.results[0].members;
					app.allMembers = json.results[0].members;
					app.myStatesArray();
				})
		},
		myFilter() {
			var filter = [];
			var members = app.allMembers;
			var selector = document.getElementById("region");
			var republican = document.getElementById("republican");
			var democrat = document.getElementById("democrat");
			var independant = document.getElementById("independant");
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
			app.members = filter;
		},
		myStatesArray() {
			var members = app.members;
			var statesArray = [];
			for (i = 0; i < members.length; i++) {
				for (j = i + 1; j < members.length; j++) {
					if (members[i].state == members[j].state && !statesArray.includes(members[i].state)) {
						statesArray.push(members[i].state);
					}
				}
			}
			app.states = statesArray.sort();
		},
	},
})
