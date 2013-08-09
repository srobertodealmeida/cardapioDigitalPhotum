require([
         "dojo/dom",
         "dijit/registry",
         "dojox/mobile/parser",
         "dojo/parser",
         "dojox/mobile/parser",
         "dojox/mobile/Carousel",
         "dojox/mobile/CarouselItem",
         "dojox/mobile/ComboBox",
         "dojox/mobile/SpinWheel",
         "dojo/dom-construct",
         "dojo/ready",
         "dojox/mobile/SpinWheel",
         "dojo/domReady",
         "dojo/ready",
         "dojo/dom-construct",
         "dojox/mobile/SpinWheelSlot",
         "dojo/dom",
         "dijit/dijit",
         "dijit/form/DataList",
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
         "dojo/domReady",
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
         "dojo/store/Memory", 
         "dojo/dom-construct",
         "dojo/ready",
         "dijit/registry",
         "dojox/mobile/SpinWheel",
         "dojox/mobile/SpinWheelSlot",
         "dojox/mobile/parser"
     ], function(dom, registry,dom, on,ProgressIndicator,parser,SpinWheelSlot){
	
	
	
	showSelectedValue = function() {
		var w = registry.byId("spin1");
		var languageSelected = w.get('values');
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM LanguageSelect',[],function(tx,result){
				tx.executeSql('UPDATE LanguageSelect SET nome="'+languageSelected+'" WHERE id="'+result.rows.item(0).id+'"');
				setLanguage();
				atualizaLabelsHome();
			 },errorCB)
	   },errorCB);
	}
});

function atualizaLabelsHome(){
	db.transaction(function(tx) {
		//Label Icones
		
		
		  //Cardapio
		
		    tx.executeSql('SELECT * FROM Labels where categoria_label="label_icone_cardapio" and language="'+constLanguageSelected+'"',[],function(fx,result){
		    	if(result.rows.length > 0){
				 titleIcone = result.rows.item(0).valor;
				 $('.mblCarouselItemFooterText').text(titleIcone);
			 }
			 
		 },errorCB);
		    
	   // Title Idioma
		    
		    tx.executeSql('SELECT * FROM Labels where categoria_label="title_idioma" and language="'+constLanguageSelected+'"',[],function(fx,result){
				 if(result.rows.length > 0){
					 titleIdioma = result.rows.item(0).valor;
					 $('.mblHeadingDivTitle').text(titleIdioma);
				 }
		    },errorCB);
		    
		    
	  // Bandeira idioma
		    
		    tx.executeSql('SELECT * FROM Languages where nome="'+constLanguageSelected+'"',[],function(fx,result){
				 if(result.rows.length > 0){
					 $('.img-language-escolhido').attr('src',''+result.rows.item(0).image);
					 $('.nome-language-escolhido').text(result.rows.item(0).nome);
				 }
		    },errorCB);
		    
		    $('.panel-languages').hide('slow');
		    
		    
		//Label Mesa
		    
		    tx.executeSql('SELECT * FROM Labels where categoria_label = "label_mesa_home" and language="'+constLanguageSelected+'"',[],function(fx,result){
		    	if(result.rows.length > 0){
					$('.span-label-config').text(result.rows.item(0).valor);
				}
		    },errorCB);
		    
		    
   },errorCB);
	
	
}

function mostrarListLanguage(){
	$('.panel-languages').toggle('slow', function() {
	    // Animation complete.
	  });
}

function onDeviceReadyHome(){
	window.addEventListener("batterystatus", onBatteryStatus, false);
}
     
     
function hide_preloader() { // DOM
	$("#preloader").fadeOut(1000);
}

var versao;
function  atualizar(){
	
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Connection ',[],function(tx,result){
			 if(result.rows.length != 0){
				 connectionWIFI = result.rows.item(0).connectionWIFI;
				 if (connectionWIFI != "") {
						if (connectionWIFI == "connectionTrue") {
							var ajax = getAjax(urlViewConfig);
							
							 ajax.success(function (data) {
								 $.each(data, function(key, val) {
							    	 if(val.atualizar == 'true'){
							    		 if(val.versao == 1){//Primeira vez que aplicativo foi gerado.
											atualizaForm.categoria = val.atualiza_categoria;
											atualizaForm.configuracao = val.atualiza_configuracao;
											atualizaForm.home = val.atualiza_home;
											atualizaForm.label = val.atualiza_label;
											atualizaForm.produto = val.atualiza_produto;
											atualizaForm.propaganda = val.atualiza_propaganda;
											init(val.versao);
							    		 } else {
							    			 versao = val.versao;
							    			//init(5);
							    			//console.log('atualizar');
							    			atualizaForm.categoria = val.atualiza_categoria;
							    			atualizaForm.configuracao = val.atualiza_configuracao;
							    			atualizaForm.home = val.atualiza_home;
							    			atualizaForm.label = val.atualiza_label;
							    			atualizaForm.produto = val.atualiza_produto;
							    			atualizaForm.propaganda = val.atualiza_propaganda;
							    			db.transaction(pegarUltimaVersao,errorCB); 
							    		 }
								    	 
								     }
							    	
							       });
						     });
							
						} else {
							db.transaction(montaHome, errorCB);
						}
					}
			 }
		   },errorCB);
		},errorCB);
	
	 
}

function createTableMesa(){
	console.log('createTableMesa');
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Mesa (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT NOT NULL)');
   },errorCB);
	
}
function pegarNumeroMesa(tx){
	console.log('pegarNumeroMesa');
	tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
		 mesa = result.rows.item(0).numero;
		 $('.span-button-config').text(mesa);
	 },errorCB)
}

function criarIdContaPrimeiraVez(){
	console.log('criarIdContaPrimeiraVez');
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
	console.log('pegarUltimaVersao');
	tx.executeSql('SELECT versao, MAX(id) FROM Config',[],function(tx,result) {
		  if(versao > parseInt(result.rows.item(0).versao)){// Caso versao for maior atualiza banco.
			  console.log('maior');
			  
			  init(versao);
		  }else{
			  console.log('menor');
			  db.transaction(montaHome,errorCB);
		  }
	    	
         },errorCB);
}

function semNumeroMesa(){
	alert('semNumeroMesa');
}

function validaConnection(tx){
	 tx.executeSql('SELECT * FROM Connection ',[],function(tx,result){
		 if(result.rows.length != 0){
			 connectionWIFI = result.rows.item(0).connectionWIFI;
			 if (connectionWIFI != "") {
					if (connectionWIFI == "connectionTrue") {
						atualizar();
					} else {
						db.transaction(montaHome, errorCB);
					}
				}
		 }
	   },errorCB);
	
}

function connectionNaoCriado(err){
	console.log('connectionNaoCriado');
}


function checkConnection() {
	var states = {};
	var networkState = navigator.connection.type;
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'connectionTrue';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'connectionFalse';
    connectionWIFI = states[networkState];
    
    db.transaction(function(tx) {
    	tx.executeSql('DROP TABLE IF EXISTS Connection');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Connection (id INTEGER PRIMARY KEY AUTOINCREMENT, connectionWIFI TEXT NOT NULL)');
		tx.executeSql('INSERT INTO Connection(connectionWIFI) VALUES ("'+connectionWIFI+'")');
		atualizar();
    },errorCB);
    

}



$(document).ready(function(){
    document.addEventListener("deviceready", checkConnection, false);
	$("#preloader").fadeOut(1000);
    createTableMesa();
    db.transaction(pegarNumeroMesa,semNumeroMesa); 
	// db.transaction(populateDB, errorCB, successCB);
	//quantidadeRegistros = 7;
	 // Atualiza caso checbox no backend esteja setado como true;
	
	//init(5);
	 //db.transaction(selectDados,errorCB);
	 $('.div-button-config').click(function(){
	 $('.divConfig').show('slow');
	 });
	 
	 $('.cancelarConfig').click(function(){
		 $('.divConfig').hide();
	 });
	 
	 inatividade();
		
		$('#propagandas').click(function(e){
			zerarInatividade();
			inatividade();
			
			$('#propagandas').hide();
			$('#geral').show();
			console.log("propagandasClick");
		});

		$('#propagandas').bind('touchstart click', function(){
			zerarInatividade();
			inatividade();
			
			$('#propagandas').hide();
			$('#geral').show();
			console.log("propagandasClick");
		});

		$('#bodyTeste').bind('touchstart click', function(){
			console.log('touchstart');
			zerarInatividade();
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