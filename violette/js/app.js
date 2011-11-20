
var countTotal=0;
var countOK=0;

var updatePercentage = function() {
 $("#statistics").append(","+(6-countTotal));
 $("#statistics").peity("line",{width:250, height:100, strokeWidth:5 });

}
var onSuccess = function() {
 countOK++;
 sNotify.addToQueue("<b><font color='green'>Bingo !</font></b>");
}

var pickItem = function(index) {
	var new_de = $("#base_de"+index).clone();
	new_de.removeClass("hidden")
	$("#container").empty().append(new_de);
	$("#choices a").removeClass("hidden")
}

var pickNew = function() {
    var rotatenum=Math.floor(Math.random()*6)+1
    pickItem(rotatenum)
    updatePercentage();
    countTotal=0;
}


var ondocready = function() {
    var self = this;
     sNotify.timeOpen = 10;
 	pickNew();
	$("#choices a").each(function(i) {
		$(this).live('click', {index:i+1, link:$(this)}, function(e){
			var curval = $("#container div input").val();
			if( e.data.index ==curval) {
			  onSuccess()
			  pickNew();
            } else {
               $(e.data.link).addClass("hidden");
            }
			countTotal++;
		});
	});
	$("a[name='trainme']").live('click',function(e) {
		var times = 8;
		$("a[name='trainme']").everyTime(2000, function(i) {
		  if (i<7) {
		    $("#choices a[name='choice"+i+"']").fadeOut().fadeIn();
		  }
		  if (i==7){
                    $("a[name='trainme']").fadeOut().fadeIn();
		  }
		  if (i<=7) {
		    pickItem(i);
		  } else {
		    pickItem(1);
		  }
		}, times);
		
	});
}


$(document).ready(ondocready);