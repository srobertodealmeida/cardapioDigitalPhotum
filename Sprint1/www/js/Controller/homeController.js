
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
	    			 db.transaction(pegarUltimaVersao,errorCB); 
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