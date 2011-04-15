function Team(options) {
    var people = Convert.string_to_int(options.people)
    var initial_productivity = Convert.string_to_float(options.initial_productivity)/100
    var max_productivity = Convert.string_to_float(options.max_productivity)/100
    var productivity_increment = Convert.string_to_float(options.productivity_increment)/100
    var initial_sprint = Convert.string_to_int(options.initial_sprint)
    var name = options.name

    this.toJSO = function(){
        return {
            people: people,
            initial_productivity: initial_productivity*100,
            max_productivity: max_productivity*100,
            productivity_increment: productivity_increment*100,
            initial_sprint: initial_sprint,
            name: name
        }
    }

    this.toJSON = function(){
        return $.toJSON(this.toJSO())
    }

    this.name = function(){
        return name
    }

    this.people = function(){
        return people
    }

    this.initial_productivity = function(){
        return initial_productivity
    }

    this.initial_sprint = function(){
        return initial_sprint
    }

    this.productivity_increment = function(){
        return productivity_increment
    }

    this.max_productivity = function(){
        return max_productivity
    }
}

Team.renderTeams = function(teams){
    var teams_template = "<table id='teams_table'><thead><th>Nome</th><th>Pessoas</th><th>Sprint Inicial</th><th>Produtividade Inicial</th>"+
            "<th>Incremento da produtividade</th><th>Produtividade Máxima</th></thead><tbody>{{#teams}}<tr><td>{{name}}</td>"+
            "<td>{{people}}</td><td>{{initial_sprint}}</td><td>{{initial_productivity}}</td><td>{{productivity_increment}}</td>"+
            "<td>{{max_productivity}}</td></tr>{{/teams}}</tbody></table>"

    var template = Handlebars.compile(teams_template)
    var data = Team.toJSO(teams)
    return template( { teams: data } )
}

Team.toJSO = function(teams){
    var data = []
    $.each(teams,function(i,team){
        data.push(team.toJSO())
    })
    return data
}

Team.justNames = function(teams){
    var names = ""
    $.each(teams,function(i,team){
        names += team.name() + " "
    })
    return names
}