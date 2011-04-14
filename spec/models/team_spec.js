Screw.Unit(function() {
    describe('Team', function() {
        var team1
        before(function() {
            team1 =  new Team({ people: 4,
                initial_productivity: 0.7,
                max_productivity: 0.8,
                productivity_increment: 0.1,
                initial_sprint: 1
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
            expect(jso.people).to(equal, 4)
            expect(jso.initial_productivity).to(equal, 0.7)
            expect(jso.max_productivity).to(equal, 0.8)
            expect(jso.productivity_increment).to(equal, 0.1)
            expect(jso.initial_sprint).to(equal, 1)
        })

    });
});