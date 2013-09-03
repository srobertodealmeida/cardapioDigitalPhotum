

function selectPropagandas(){
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Propagandas',[],montaPropagandas,errorCB);
        },errorCB,successInsert);
	
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
				alert(numero);
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
			alert(numero);
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

function montaPropagandas(){

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

document.addEventListener("DOMContentLoaded", function(event) {
	  pegarDuration(true);
});


$(document).ready(function(){
	
	var file = '<span class=\"file\"><img class=\ "file-icon\" alt=\ "\" title=\"image/jpeg\" src=\ "/drupal-7.20/modules/file/icons/image-x-generic.png\" /> <a href=\"http://192.168.0.102/drupal-7.20/sites/default/files/propaganda1.jpg\" type=\"image/jpeg; length=174311\">propaganda1.jpg</a> </span>"},{"node_title":"<div class=\"div-title-pedido-cozinha\">\r\n<span class=\"span-div-title-pedido-cozinha\"><a href=\"/drupal-7.20/?q=pt-br/node/1197\">propagandar4</a></span>\r\n</div>'
	var image = '<a href=\"http://192.168.0.102/drupal-7.20/sites/default/files/cerveja.jpg\"><img typeof=\ "foaf:Image\" src=\ "http://192.168.0.102/drupal-7.20/sites/default/files/cerveja.jpg\" width=\"1280\" height=\ "960\" alt=\ "\" /></a>';
	
	var regex = /<a href.*?<\/a>/;
	var urlPreparado = file.match(regex);
	alert(urlPreparado);
    var url = $.parseHTML(image);
    alert(url);
	
	//titleIcone = val1.substring(positionTitle + 7, val1.length - 8);	
	montaPropagandas();
	
});

/**
function montaPropagandas(tx,result){
	
	for(var i=0;i<result.rows.length;i++){
		$("#foo").append('<img src="'+result.rows.item(i).image+'" class="img-propagandas"/> ');
    }
	
	 $("#foo").carouFredSel({
         items               : 1,
         scroll : {
             items           : 1,
             duration        : 3000,
             pauseOnHover    : true,
         }                  
     });
	 
	 $("#foo").trigger("configuration", [ "scroll.fx",'crossfade' ]);
	 $("#foo").trigger("configuration", [ "direction",'up' ]);
	
}

$(document).ready(function(){
	onLoad();
	selectPropagandas();
});

*/