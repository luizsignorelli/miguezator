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
        return Math.ceil(points) - operation_points - team_integration_cost()
    }

    this.working_days = function(){
        return length + scrum_days
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
            teams: Team.toJSO(teams),
            teams_names: Team.justNames(teams)
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
        return (number - team.initial_sprint()) * team.productivity_increment();
    }

    function team_integration_cost(){
        return (teams.length -1) * 5
    }
}

Sprint.renderSprints = function(sprints){
   var sprints_template = " <table > "+
       "      <thead>"+
       "        <th>Sprint</th>"+
       "         <th>Times</th>   "+
       "         <th>Pontos</th>    "+
       "         <th>Dias Úteis</th> "+
       "     </thead>                "+
       "     <tbody>                 "+
       "         {{#sprints}}        "+
       "         <tr>                "+
       "         <td>{{number}}</td>       "+
       "         <td>{{teams_names}}</td>       "+
       "         <td>{{points}}</td>       "+
       "         <td>{{working_days}}</td>       "+
       "         </tr>               "+
       "         {{/sprints}}        "+
       "     </tbody>                "+
       " </table>"

    var template = Handlebars.compile(sprints_template)
    var data = Sprint.toJSO(sprints)
    return template( { sprints: data } )
}

Sprint.toJSO = function(sprints){
    var data = []
    $.each(sprints,function(i,sprint){
        data.push(sprint.toJSO())
    })
    return data
}