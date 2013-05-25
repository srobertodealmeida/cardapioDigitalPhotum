
function hide_preloader() { // DOM
	$("#preloader").fadeOut(1000);
}

var versao;
function  atualizar(){
	
	var ajax = getAjax(urlViewConfig);
	
	 ajax.success(function (data) {
		 $.each(data, function(key, val) {
	    	 if(val.atualizar == 'true'){
	    		 if(val.versao == 1){//Primeira vez que aplicativo foi gerado.
	    			 init(val.versao);
	    		 } else {
	    			 versao = val.versao;
	    			 init(5);
	    			 //db.transaction(pegarUltimaVersao,errorCB); 
	    		 }
		    	 
		     }
	    	
	       });
     });
	 
}

function pegarUltimaVersao(tx){
	tx.executeSql('SELECT versao, MAX(id) FROM Config',[],function(tx,result) {
		  console.log(result.rows.item(0).versao);
		  if(versao > parseInt(result.rows.item(0).versao)){// Caso versao for maior atualiza banco.
			  init(versao);
		  }else{
			  db.transaction(montaHome,errorCB);
		  }
	    	
         },errorCB);
}



$(document).ready(function(){
	
	// db.transaction(populateDB, errorCB, successCB);
	//quantidadeRegistros = 7;
	 // Atualiza caso checbox no backend esteja setado como true;
	 atualizar();
	//init(5);
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