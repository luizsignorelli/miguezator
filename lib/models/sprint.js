function Sprint(options) {
    var number = options.number
    var length = options.sprint_length
    var teams = []
    var points = 0
    var scrum_days = 2

    this.generate = function(sprint_teams){
        $.each(sprint_teams, function(i, team){
            if (team.initial_sprint() <= number){
                points = points + ( length * team.people() * productivity(team) )
                teams.push(team)
            }
        })
    }

    function productivity(team){
        var productivity =  team.initial_productivity() + increment(team)
        if (productivity <= team.max_productivity()){
            return productivity
        }
        else{
            return team.max_productivity()
        }
    }

    function increment(team) {
        return (number - 1) * team.productivity_increment();
    }

    function team_integration_cost(){
        return (teams.length -1) * 5
    }

    this.points = function(){
        return Math.ceil(points)
    }

    this.working_days = function(){
        return length + scrum_days + team_integration_cost()
    }

    this.teams = function(){
        return teams
    }

}