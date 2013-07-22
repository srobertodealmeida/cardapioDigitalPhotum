
function selectPropagandas(){
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Propagandas',[],montaPropagandas,errorCB);
        },errorCB,successInsert);
	
}


function montaPropagandas(tx,result){
	
	for(var i=0;i<result.rows.length;i++){
		$("#foo").append('<img src="'+result.rows.item(i).image+'" class="img-bacground"/> ');
    }
	
	 $("#foo").carouFredSel({
         items               : 1,
         scroll : {
             items           : 1,
             duration        : 3000,
             pauseOnHover    : true,
             scroll.fx       : 'crossfade',
             direction       : 'up'
         }                  
     });
	 
	 $("#foo").trigger("configuration", [ "scroll.fx",'crossfade' ]);
	 $("#foo").trigger("configuration", [ "direction",'up' ]);
	
}

$(document).ready(function(){
	selectPropagandas();
	
});

