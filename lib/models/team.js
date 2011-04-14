function Team(options) {
    var people = string_to_int(options.people)
    var initial_productivity = string_to_float(options.initial_productivity)
    var max_productivity = string_to_float(options.max_productivity)
    var productivity_increment = string_to_float(options.productivity_increment)
    var initial_sprint = string_to_int(options.initial_sprint)
    var name = options.name

    this.toJSO = function(){
        return {
            people: people,
            initial_productivity: initial_productivity,
            max_productivity: max_productivity,
            productivity_increment: productivity_increment,
            initial_sprint: initial_sprint
        }
    }

    this.toJSON = function(){
        return $.toJSON(this.toJSO())
    }

    function string_to_int(string){
        if (typeof(string) == "string"){
            return parseInt(string)
        }
        else{
            return string
        }
    }

    function string_to_float(string){
        if (typeof(string) == "string"){
            return parseFloat(string)
        }
        else{
            return string
        }
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