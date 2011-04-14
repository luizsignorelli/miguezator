function Sprint(options) {
    var number = options.number
    var length = options.sprint_length
    var teams = options.teams
    var points = 0
    var scrum_days = 2

    this.generate = function(){
        $.each(teams, function(i, team){
            points = points + ( length * team.people() * productivity(team) )
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

    this.points = function(){
        return Math.ceil(points)
    }

    this.working_days = function(){
        return length + scrum_days
    }

}