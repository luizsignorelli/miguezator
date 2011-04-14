function Project(options) {
    var teams = options.teams
    var sprint_length = options.sprint_length
    var sprints = []

    this.generate_sprints = function(number_of_sprints){
        sprints = []
        for(i = 1; i <= number_of_sprints; i++){
            var sprint = new Sprint({ number: i,
                sprint_length: sprint_length
            })
            sprint.generate(teams)
            sprints.push(sprint)
        }

    };

    this.sprint = function(number){
        return sprints[number-1]
    }

    this.sprints = function(){
        return sprints
    }

    this.teams = function(){
        return teams
    }

}