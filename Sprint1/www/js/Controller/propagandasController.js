

function selectPropagandas(){
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Propagandas',[],montaPropagandas,errorCB);
        },errorCB,successInsert);
	
}


function montaPropagandas(tx,result){
	if(result.rows.length > 0){
		
		for(var i=0;i<result.rows.length;i++){
			
			var url = result.rows.item(i).image;
			var extencao =  url.substr(url.length - 3);
			
			if(extencao != "mp4"){
				$("#foo").append('<img id="player'+i+'" src="'+result.rows.item(i).image+'" class="img-propagandas"/> ');
			}else{
				$("#foo").append('<video id="player'+i+'" width="1100px" height="700px" autoplay  ><source id="source-player'+i+'" src="'+result.rows.item(i).image+'" type="video/mp4"></video>');
			}
	    }
		
		 $("#foo").carouFredSel({
	         items               : 1,
	                            auto : false,
	                            scroll : {
	                                items           : 1,
	                                fx              : "crossfade",
	                                pauseOnHover    : true
	                            }                  
	     });
		 
		 $("#foo").trigger("configuration", [ "direction",'up' ]);
		 pegarDuration(true);
	}    
	
}

function montaPropagandasMock(){

	for(var i=0;i<5;i++){
		
		if(i==0){
			$("#foo").append('<video id="player'+i+'" width="1100px" height="700px" autoplay  ><source id="source-player'+i+'" src="img/video.mp4" type="video/mp4"></video>');
			alert('montando');
			
		}
        if(i!=0){
        	$("#foo").append('<img id="player'+i+'" src="img/propaganda'+i+'.jpg" class="img-propagandas"/> ');
        }
		// JavaScript object for later use
   }
	
	
	 $("#foo").carouFredSel({
         items               : 1,
                            auto : false,
                            scroll : {
                                items           : 1,
                                fx              : "crossfade",
                                pauseOnHover    : true
                            }                  
     });
	 
	 $("#foo").trigger("configuration", [ "direction",'up' ]);
}

function pegarDuration(primeiraVez){
	//
	var page = $("#foo").triggerHandler("currentPage");
	var tag = $('#player'+page+'').prop("tagName");
    var numero ;
	if (tag == "VIDEO") {
		// Caso primeiro item seja um video, é dado settimeout para espera carregar o video para depois pegar sua duração
		if (page == 0 && primeiraVez == true) {
			window.setTimeout(function() {

				var video = document.getElementById("player" + page + "");
				console.log("playetimeoutr" + page + "");
				console.log(video.duration);
				video.play();
				// source.play();
				numero = video.duration * 1000;
				window.setTimeout(function() {

					$("#foo").trigger("next", 1);
					pegarDuration(false);
				}, numero);
			}, 500);
		} else {
			var video = document.getElementById("player" + page + "");
			console.log("player" + page + "");
			console.log($('#' + video.duration));

			video.play();
			// source.play();
			numero = video.duration * 1000;
			window.setTimeout(function() {

				$("#foo").trigger("next", 1);
				pegarDuration(false);
			}, numero);
		}
	} else {
		if (tag == "IMG") {
			numero = 3000;
			window.setTimeout(function() {
				$("#foo").trigger("next", 1);
				pegarDuration(false);
			}, numero);
		}
	}
    
	// $("#foo").trigger("slideToPage", [2, {
		//    fx          : "fade",
		////    duration    : 300
		//}]);


}

document.addEventListener("DOMContentLoaded", function(event) {
	  pegarDuration(true);
});


$(document).ready(function(){
	onLoad();
	selectPropagandas();
	//montaPropagandasMock();
	
});




