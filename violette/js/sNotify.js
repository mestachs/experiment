var sNotify = {
	
	timeOpen: 10,	//change this number to the amount of second you want the message opened
	
	queue: new Array(),
	closeQueue: new Array(),
	
	addToQueue: function(msg) {
		sNotify.queue.push(msg);
	},
	
	createMessage: function(msg) {
		
		//create HTML + set CSS
		var messageBox = $("<div><span class=\"sNotify_close\">x</span>" + msg + "</div>").prependTo("body");
		$(messageBox).addClass("sNotify_message");
		
		sNotify.enableActions(messageBox);
		sNotify.closeQueue.push(0);
		
		return $(messageBox);
		
	},
	
	loopQueue: function() {
		//pop queue
		if (sNotify.queue.length > 0) {
			
			var messageBox = sNotify.createMessage(sNotify.queue[0]);
			sNotify.popMessage(messageBox);
			
			sNotify.queue.splice(0,1);
			
		}
		
		//close queue
		if (sNotify.closeQueue.length > 0) {
			var indexes = new Array();
			
			for (var i = 0; i < sNotify.closeQueue.length; i++) {
				sNotify.closeQueue[i]++;
				
				if (sNotify.closeQueue[i] > sNotify.timeOpen) {
					indexes.push(i);
				}
			}
			
			//now close them
			for (var i = 0; i < indexes.length; i++) {
				var buttons = $(".sNotify_close");
				sNotify.closeMessage($(buttons[($(buttons).length - indexes[i]) - 1]));
				sNotify.closeQueue.splice(indexes[i],1);	
			}
			
		}
		
	},
	
	enableActions: function(messageBox) {
		//reset timer when hovering
		$(messageBox).hover(
			function() {
				var index = ($(this).nextAll().length - 1);
				sNotify.closeQueue[index] = -1000;
			},
			function() {
				var index = ($(this).nextAll().length - 1);
				sNotify.closeQueue[index] = 0;
			}
		);
		
		//enable click close button
		$(messageBox).find(".sNotify_close").click(function() {
			sNotify.closeMessage(this);
		});
	},
	
	popMessage: function(messageBox) {
		$(messageBox).css({
			marginRight: "-290px",
			opacity: 0.2,
			display: "block"
		});
		
		var height = parseInt($(messageBox).outerHeight()) + parseInt($(messageBox).css("margin-bottom"));
		
		$(".sNotify_message").next().each(function() {
			var topThis = $(this).css("top");
			
			if (topThis == "auto") {
				topThis = 0;
			}
			
			var newTop = parseInt(topThis) + parseInt(height);
			
			$(this).animate({
				top: newTop + "px"
			}, {
				queue: false,
				duration: 600
			});
		});
		
		$(messageBox).animate({
			marginRight: "20px",
			opacity: 1.0
		}, 800);
	},
	
	closeMessage: function(button) {
		var height = parseInt($(button).parent().outerHeight()) + parseInt($(button).parent().css("margin-bottom"));
		
		$(button).parent().nextAll().each(function() {
			var topThis = $(this).css("top");
			
			if (topThis == "auto") {
				topThis = 0;
			}
			
			var newTop = parseInt(topThis) - parseInt(height);
			
			$(this).animate({
				top: newTop + "px"
			}, {
				queue: false,
				duration: 300
			});
		});
		
		$(button).parent().hide(200, function() {
			$(this).remove();
		});
	}
		
}

setInterval("sNotify.loopQueue()", 900);