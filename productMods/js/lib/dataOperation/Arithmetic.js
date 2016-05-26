


var Arithmetic = {
		
	
	nor : function(expr){
		var ret = true
		$.each(expr, function(i, exp){
			if(!exp){
				ret = false
				return false
			}
		})
		return ret
	},
	
	or : function(expr){
		var ret = false
		$.each(expr, function(i, exp){
			if(exp){
				ret = true
				return false
			}
		})
		return ret
	}
}