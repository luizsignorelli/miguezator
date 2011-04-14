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
        return this
    }

    this.working_days = function(){
        var working_days = 0
        $.each(sprints, function(i, sprint){
            working_days += sprint.working_days()
        })
        return working_days
    }

    this.points = function(){
        var points = 0
        $.each(sprints, function(i, sprint){
            points += sprint.points()
        })
        return points
    }

    this.add_operation_points = function (sprint_number, points) {
        this.sprint(sprint_number).add_operation_points(points)
    };

    this.sprint = function(number){
        return sprints[number-1]
    }

    this.toJSON = function(){
        return $.toJSON(this.toJSO())
    }

    this.toJSO = function(){
        var obj = { sprint_length: sprint_length,
                    points: this.points(),
                    working_days: this.working_days(),
                    teams: [],
                    sprints: []
                  }
        $.each(teams, function(i, team){
            obj.teams.push(team.toJSO())
        })
        $.each(sprints, function(i, sprint){
            obj.sprints.push(sprint.toJSO())
        })
        return obj
    }

    this.sprints = function(){
        return sprints
    }

    this.teams = function(){
        return teams
    }

}