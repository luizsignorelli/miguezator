Screw.Matchers["have"] = {
  match: function(expected, actual) {
    return actual.find(expected).length > 0;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not have ' : ' to have ') + $.print(expected);
  }
}
Screw.Unit(function() {
    describe('Team', function() {
        var team1, team2
        before(function() {
            team1 =  new Team({ people: 4,
                initial_productivity: 0.7,
                max_productivity: 0.8,
                productivity_increment: 0.1,
                initial_sprint: 1,
                name: "Team 1"
            })
            team2 =  new Team({ people: 5,
                initial_productivity: 0.7,
                max_productivity: 0.8,
                productivity_increment: 0.1,
                initial_sprint: 4,
                name: "Team 2"
            })
        });

        it("has an JSO representation", function(){
            var jso = team1.toJSO()
            expect(jso.people).to(equal, 4)
            expect(jso.initial_productivity).to(equal, 0.7)
            expect(jso.max_productivity).to(equal, 0.8)
            expect(jso.productivity_increment).to(equal, 0.1)
            expect(jso.initial_sprint).to(equal, 1)
        })

        it("converts string to numbers on creation", function(){
           var team = new Team({ people: "4",
                initial_productivity: "0.7",
                max_productivity: 0.8,
                productivity_increment: "0.1",
                initial_sprint: 1
            })
            var jso = team.toJSO()
            expect(jso.max_productivity + jso.productivity_increment).to(equal, 0.9)
        })

        it("renders a list of teams in a html table", function(){
          $("#dom_test").html( Team.renderTeams([team1,team2]) );
          expect($("#dom_test")).to(have,"#teams_table")
        })

    });
});