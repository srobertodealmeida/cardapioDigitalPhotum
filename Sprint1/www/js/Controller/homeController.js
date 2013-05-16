
function hide_preloader() { // DOM
	$("#preloader").fadeOut(1000);
}

function  atualizar(){
	
	var ajax = getAjax(urlViewConfig);
	
	 ajax.success(function (data) {
		 $.each(data, function(key, val) {
	    	 if(val.atualizar == 'true'){
		    	 console.log(val);
		    	 init();
		     }
	    	
	       });
     });
	
}

//function selectDados(tx){
	//alert('selectDados');
	// tx.executeSql('SELECT * FROM Home',[],montaBackgroundLogo,errorCB);
//}



//function montaBackgroundLogo(){
    
    //console.log("teste",result.rows);
//}


$(document).ready(function(){
	 // Atualiza caso checbox no backend esteja setado como true;
	 atualizar();
	 
	 //db.transaction(selectDados,errorCB);
	
     // Carrosel propaganda
	 $("#foo").carouFredSel({
		         items               : 1,
		         scroll : {
		             items           : 1,
		             duration        : 1000,                        
		             pauseOnHover    : true
		         }                  
		     });
	
});