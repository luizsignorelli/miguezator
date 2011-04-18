Screw.Unit(function() {
    describe('Project', function() {
        var project
        var team1, team2
        before(function() {
            team1 =  new Team({ people: "4",
                initial_productivity: "70",
                max_productivity: "80",
                productivity_increment: 10,
                initial_sprint: 1
            })
            team2 =  new Team({ people: 4,
                initial_productivity: 50,
                max_productivity: 80,
                productivity_increment: 5,
                initial_sprint: 3
            })
        });
        describe('#generate sprints with 1 team', function() {
            before(function() {
                project = new Project({ sprint_length: 10,
                    teams:[team1] })
            });
            it("generates 1 sprint", function() {
                project.generate_sprints(1)
                expect(project.sprints()).to(have_length, 1)
                expect(project.sprint(1).points()).to(equal,28)
                expect(project.sprint(1).working_days()).to(equal,12)
            });
            it("increments the productivity for the second sprint", function() {
                project.generate_sprints(2)
                expect(project.sprints()).to(have_length, 2)
                expect(project.sprint(2).points()).to(equal, 32)
                expect(project.sprint(2).working_days()).to(equal,12)
            });
            it("respects the max productivity", function() {
                project.generate_sprints(3)
                expect(project.sprints()).to(have_length, 3)
                expect(project.sprint(3).points()).to(equal,32)
                expect(project.sprint(3).working_days()).to(equal,12)
            });
        });

        describe('#generate sprints with more than 1 team', function() {
            before(function() {
                project = new Project({ sprint_length: 10,
                    teams:[team1, team2] })
            });
            it("respects the team initial sprint", function() {
                project.generate_sprints(3)
                expect(project.sprint(1).teams()).to(have_length,1)
                expect(project.sprint(2).teams()).to(have_length,1)
                expect(project.sprint(3).teams()).to(have_length,2)
            });
            it("considers the cost of team integration", function() {
                project.generate_sprints(3)
                expect(project.sprint(3).working_days()).to(equal, 12)
                expect(project.sprint(3).points()).to(equal, 32+20-5)
            });
        });

         describe('#generate sprints from the project total points', function() {
            before(function() {
                project = new Project({ sprint_length: 10,
                    teams:[team1, team2] })
            });
            it("generates the correct number of sprints", function() {
                project.generate_sprints_from_points(100)
                expect(project.sprints().length).to(equal,3)
            });
        });

        it("calculates the project working days", function() {
            project = new Project({ sprint_length: 10,
                teams:[team1] })
            expect(project.generate_sprints(3).working_days()).to(equal,36);
        })
        it("calculates the project points", function() {
            project = new Project({ sprint_length: 10,
                teams:[team1] })
            expect(project.generate_sprints(3).points()).to(equal,28+32+32);
        })
        it("adds operation points to a sprint", function() {
            project = new Project({ sprint_length: 10,
                teams:[team1] })
            project.generate_sprints(3)
            project.add_operation_points(3, 10)
            expect(project.points()).to(equal,28+32+32-10);
        })
        it("has a JSO representation", function(){
            project = new Project({ sprint_length: 10,
                teams:[team1] })
            project.generate_sprints(3)
            var obj = project.toJSO()
            expect(obj.sprint_length).to(equal, 10)
            expect(obj.points).to(equal, 28+32+32)
            expect(obj.working_days).to(equal, 36)
            expect(obj.teams.length).to(equal, 1)
            expect(obj.sprints.length).to(equal, 3)
        })
        it("has a JSON representation", function(){
            project = new Project({ sprint_length: 10,
                teams:[team1] })
            project.generate_sprints(3)
            expect(project.toJSON()).to_not(be_null)
            //alert(project.toJSON())
        })
    });
});