require([
"dojo/dom",
"dijit/dijit",
"dojo/parser",
"dojo/on", 
"dojo/_base/window", 
"dojo/_base/Deferred", 
"dojo/dom", 
"maqetta/space",
"maqetta/AppStates",
"dojox/mobile",
"dojox/mobile/deviceTheme",
"dojox/mobile/compat",
"dojo/hash",
"dojox/mobile",
"dijit/registry",
"dojox/mobile/ProgressIndicator",
"dojox/mobile/ScrollableView",
"dojox/mobile/SwapView",
"dojox/mobile/IconItem",
"dojox/mobile/IconContainer",
"dojox/mobile/TextBox",
"dojox/mobile/CarouselItem",
"dojox/mobile/ViewController",
"dojox/mobile/CheckBox",
"dojox/mobile/SimpleDialog",
"dojox/mobile/parser",
"dojo/domReady!",
"dojox/mobile/ViewController",
"dojox/mobile/Slider",
"dojox/mobile/Button",
"dojox/mobile/Opener",
"dojox/mobile/ContentPane",
"dijit/registry",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/Button",
"dojo/_base/window",
"dojo/_base/Deferred",
"dijit/registry",
"dojox/mobile/ViewController",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/compat",
"dojox/mobile/Button",
"dojo/_base/window",
"dojo/_base/Deferred",
"dijit/registry",
"dojox/mobile/ViewController",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/compat",
"dojox/mobile/Button",
"dojox/mobile/GridLayout",
"dojox/mobile/Pane",
"dojox/mobile/RoundRectStoreList",
"dojo/store/Memory"
], function(dom, registry,dom, on,ProgressIndicator,parser, ViewController,ScrollableView){
    show = function(dlg){
	    registry.byId(dlg).show();
	  }
    hide = function(dlg){
	    registry.byId(dlg).hide();
  }
});

function voltarHome(){
	window.location = 'home.html';
}

function focusOutInput(){
	if(window.event.keyCode == 13) {
		  
		 $('.inputSenha').trigger('blur');
		 $('#btn_ok_final').trigger('click');
		  return false;
	}
}

function validarSenha(){
	
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Connection ',[],function(tx,result){
			 if(result.rows.length != 0){
				 connectionWIFI = result.rows.item(0).connectionWIFI;
				 if (connectionWIFI != "") {
						if (connectionWIFI == "connectionTrue") {
							var ajax = getAjax(urlViewConfig);
							
							
							 ajax.success(function (data) {
								 $.each(data, function(key, val) {
							    	if(val.senha_configuracao == $('.inputSenha').val()){
							    		hide_preloader();
							    		$('#geral').show();
							    		hide('senha_configaracao');
							    	}else{
							    		alert('Senha Errada');
							    	}
							    	
							       });
						    });
						} else {
							hide_preloader();
							$('#geral').show();
							hide('senha_configaracao');
						}
					}
			 }
		   },errorCB);
		},errorCB);
	
}


function hide_preloader() { // DOM
	$("#preloader").fadeOut(1000);
}

function showTelaSenha(){
	show('senha_configaracao');
}

function getMesas(valor){
	var post = true;
	
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Connection ',[],function(tx,result){
			 if(result.rows.length != 0){
				 connectionWIFI = result.rows.item(0).connectionWIFI;
				 if (connectionWIFI != "") {
						if (connectionWIFI == "connectionTrue") {
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
						} else {
							 postInsertMesa(valor);
						}
					}
			 }
		   },errorCB);
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