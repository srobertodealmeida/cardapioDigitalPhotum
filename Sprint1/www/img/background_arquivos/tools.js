function getTweets(){
	$("#stream").html('');
	$("#stream").getTwitter({
		userName: "Kintal_Lanches",
		numTweets: 1,
		loaderText: "Carregando tweets...",
		slideIn: false,
		showHeading: false,
		showProfileLink: false,
		showTimestamp: true
	});
}
function getFaceStream(){
	$("#stream").html('');
	$("#stream").load('facebook.php');
}

/*
setTimeout(function(){
	$("#twitter li").each(function(){
		$(this).find('a').not('span a').prependTo(this);
	});
},1000);
*/