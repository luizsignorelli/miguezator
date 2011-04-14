function Convert(){

}

Convert.string_to_int = function(string){
    if (typeof(string) == "string"){
        return parseInt(string)
    }
    else{
        return string
    }
}

Convert.string_to_float = function(string){
    if (typeof(string) == "string"){
        return parseFloat(string)
    }
    else{
        return string
    }
}