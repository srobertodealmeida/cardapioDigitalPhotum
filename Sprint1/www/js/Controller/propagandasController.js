function selectPropagandas(){
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Propagandas',[],montaPropagandas,errorCB);
        },errorCB,successInsert);
	
}

function pegarDuration(){
	//
	
	var page = $("#foo").triggerHandler("currentPage");
	var tag = $('#player'+page+'').prop("tagName");
    var numero ;
	if(tag == "VIDEO"){
	var video = document.getElementById("player"+page+"");
	video.play();
        numero = video.duration * 1000;
        
        window.setTimeout(function() {
        	numero = video.duration * 1000;
    		alert(numero);
    		 window.setTimeout(function() {
    		 		$("#foo").trigger("next", 1);
    		 		pegarDuration();
    		 		}, numero);''
    		},20000);
        
       
        
	}else{
        if(tag == "IMG"){
            numero = 30000;
            window.setTimeout(function() {
		 		$("#foo").trigger("next", 1);
		 		pegarDuration();
		 		}, numero);
        }
    }
    
	//$("#foo").trigger("slideToPage", [2, {
		//    fx          : "fade",
		////    duration    : 300
		//}]);
	
	

}

function montaPropagandas(){

	for(var i=0;i<5;i++){
		if(i==0){
		$("#foo").append('<video id="player'+i+'" width="1100px" height="700px" autoplay ><source src="img/video.mp4" type="video/mp4"></video>');
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

$(document).ready(function(){
	montaPropagandas();
                  window.setTimeout(function() {
                                  
                                    pegarDuration();
                                    }, 5000);
	
});
