
function selectPropagandas(){
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Propagandas',[],montaPropagandas,errorCB);
        },errorCB,successInsert);
	
}


function montaPropagandas(tx,result){

	for(var i=0;i<result.rows.length;i++){
		$("#foo").append('<video width="320" height="240" controls><source src="movie.mp4" type="video/mp4"></video>');
		
    }

	 $("#foo").carouFredSel({
         items               : 1,
         scroll : {
             items           : 1,
             duration        :  3000,
             fx              : "crossfade",
             pauseOnHover    : true
         }                  
     });
	 
	 $("#foo").trigger("configuration", [ "direction",'up' ]);
	
}

$(document).ready(function(){
	selectPropagandas();
	
});

