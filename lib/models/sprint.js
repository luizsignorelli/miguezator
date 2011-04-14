function Sprint(options) {
    var number = Convert.string_to_int(options.number)
    var length = Convert.string_to_int(options.sprint_length)
    var teams = []
    var points = 0
    var scrum_days = 2
    var operation_points = 0

    this.generate = function(sprint_teams){
        $.each(sprint_teams, function(i, team){
            if (team.initial_sprint() <= number){
                points = points + ( length * team.people() * productivity(team) )
                teams.push(team)
            }
        })
    }

    this.points = function(){
        return Math.ceil(points) - operation_points
    }

    this.working_days = function(){
        return length + scrum_days + team_integration_cost()
    }

    this.add_operation_points = function(points){
        operation_points += points
    }

    this.teams = function(){
        return teams
    }

    this.toJSO = function(){
        return {
            number: number,
            length: length,
            points: this.points(),
            working_days: this.working_days(),
            operation_points: operation_points,
            teams: Team.toJSO(teams)
        }
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
}