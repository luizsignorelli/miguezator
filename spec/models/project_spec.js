Screw.Unit(function() {
    describe('Project', function() {
        var project
        var team1
        before(function() {
            team1 =  new Team({ people: 4,
                initial_productivity: 0.7,
                max_productivity: 0.8,
                productivity_increment: 0.1,
                initial_sprint: 1
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
                var generated_sprint = project.sprints()[0]
                expect(generated_sprint.points()).to(equal,28)
                expect(generated_sprint.working_days()).to(equal,12)
            });
            it("increments the productivity for the second sprint", function() {
                project.generate_sprints(2)
                expect(project.sprints()).to(have_length, 2)
                var sprint2 = project.sprints()[1]
                expect(sprint2.points()).to(equal, 32)
                expect(sprint2.working_days()).to(equal,12)
            });
            it("respect the max productivity", function() {
                project.generate_sprints(3)
                expect(project.sprints()).to(have_length, 3)
                var sprint3 = project.sprints()[2]
                expect(sprint3.points()).to(equal,32)
                expect(sprint3.working_days()).to(equal,12)
            });
        });
    });
});