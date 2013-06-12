
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

function createTableMesa(){
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Mesa (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL)');
   },errorCB);
	
}

function pegarNumeroMesa(tx){
	tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
		 mesa = result.rows.item(0).numero;
		 $('.span-button-config').text(mesa);
	 },errorCB)
}

function criarIdContaPrimeiraVez(){
	db.transaction(function(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS IdConta (id INTEGER PRIMARY KEY AUTOINCREMENT, idConta TEXT NOT NULL)');
	 tx.executeSql('SELECT * FROM IdConta ',[],function(tx,result){
		 if(result.rows.length == 0){
			 tx.executeSql('INSERT INTO IdConta(idConta) VALUES ("1")');
		 }
	   },errorCB);
     },errorCB);
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

function semNumeroMesa(){
	alert('semNumeroMesa');
}

$(document).ready(function(){
	
	
    createTableMesa();
    db.transaction(pegarNumeroMesa,semNumeroMesa); 
    
	// db.transaction(populateDB, errorCB, successCB);
	//quantidadeRegistros = 7;
	 // Atualiza caso checbox no backend esteja setado como true;
	 atualizar();
	//init(5);
	 //db.transaction(selectDados,errorCB);
	 $('.div-button-config').click(function(){
	 $('.divConfig').show('slow');
	 });
	 
	 $('.cancelarConfig').click(function(){
		 $('.divConfig').hide();
	 });
	 
	 
	 
	 
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