Screw.Unit(function() {
    describe('Sprint', function() {
        var team, sprint
        before(function() {
            team =  new Team({ people: 4,
                initial_productivity: 0.7,
                max_productivity: 0.8,
                productivity_increment: 0.1,
                initial_sprint: 1
            })
            sprint = new Sprint( { number: 1, sprint_length: 10 } )
            sprint.generate([team])
        });

        it("has a JSO representation", function(){
            var jso = sprint.toJSO()
            expect(jso.number).to(equal, 1)
            expect(jso.length).to(equal, 10)
            expect(jso.teams.length).to(equal, 1)
        })
    });
});