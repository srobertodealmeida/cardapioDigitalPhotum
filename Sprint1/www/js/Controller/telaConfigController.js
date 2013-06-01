
function hide_preloader() { // DOM
	$("#preloader").fadeOut(1000);
}

function getMesas(valor){
	var post = true;
	var ajax = getAjax(urlViewMesas);
	
	 ajax.success(function (data) {
		 $.each(data, function(key, val) {
	    	 if(val.node_title == valor){
	    		 post = false;
	    	 }
	    	
	       });
		  if (post) {
			  
			  postInsertMesa(valor);
			
		} else {
			alert('Mesa já esta sendo utilizada');
		}
    });
}

function createTableMesa(){
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Mesa (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL)');
   },errorCB);
	
}


function postInsertMesa(valor){
	var data = {
			"type" : "mesa",
			"title" : valor,
		};
		var url = "" + ipServidorDrupal + "/node";
		postAjax(url, data);
		
		db.transaction(function(tx) {
			 tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
				if( result.rows.length == 0){
					console.log('INSERT INTO Mesa(numero) VALUES ("' + valor + '")');
			             tx.executeSql('INSERT INTO Mesa(numero) VALUES ("' + valor + '")');
			        
				 }else{
					 console.log('UPDATE Mesa SET numero="'+valor+'" WHERE id=1');
					 tx.executeSql('UPDATE Mesa SET numero="'+valor+'" WHERE id=1');
			     
				 }
				
				
				 
			 },errorCB);
	    },errorCB, successPostMesa);
		
}

function successPostMesa(){
	alert('Mesa Inserida com sucesso');
}

$(document).ready(function(){
	createTableMesa();
	
	$("#linkHome").click(function() {
		  alert('clicou');
	});
	
	$("#btn-mudar-mesa").click(function() {
		$(".panel-numero-mesa").show();
	});
	
	
	
	
	
	function montaHome(tx){
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM Home',[],montaBackground,errorCB);
	     },errorCB,successInsert);
		
	}
	
	
	function montaBackground(tx,result){
		for(var i=0;i<result.rows.length;i++){
			$("#background-config").attr('src', "" + result.rows.item(i).background);
			
	    }
		
	}
	
	$('.button-numerico').click(function(){
		numero = $(this).val();
		if(numero=="x"){
		 valor = $('.numero-mesa').text();
		 valorFinal = valor.substring(0,(valor.length - 1));
		 $('.numero-mesa').text(valorFinal);
		}else if (numero=="OK"){
			
			valor = $('.numero-mesa').text();
			if(valor == ""){
				alert('Favor selecionar uma mesa');
			}else{
			getMesas(valor);
			}
		}
		else{
		$('.numero-mesa').append(numero);
		}
	});
	
});