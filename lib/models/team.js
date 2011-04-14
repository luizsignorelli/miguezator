function Team(options) {
  var people = options.people
  var initial_productivity = options.initial_productivity
  var max_productivity = options.max_productivity
  var productivity_increment = options.productivity_increment
  var initial_sprint = options.initial_sprint

  this.toJSO = function(){
      return {
               people: people,
               initial_productivity: initial_productivity,
               max_productivity: max_productivity,
               productivity_increment: productivity_increment,
               initial_sprint: initial_sprint
             }
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