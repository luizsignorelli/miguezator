function Project(options) {
    var teams = options.teams
    var sprint_length = options.sprint_length
    var sprints = []

    this.generate_sprints = function(number_of_sprints){
        for(i = 1; i <= number_of_sprints; i++){
            var sprint = new Sprint({ number: i,
                sprint_length: sprint_length,
                teams: teams
            })
            sprint.generate()
            sprints.push(sprint)
        }

    };
    this.sprints = function(){
        return sprints
    }

}