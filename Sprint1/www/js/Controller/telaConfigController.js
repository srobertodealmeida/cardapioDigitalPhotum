var mesaConfig = "";
var constLanguageSelectedConf = "";

var flagPedidoSincronizacao = false;
var flagPessoaSincronizacao = false;
var flagConfSincronizacao = false;
var chaveSincronizacao = "";

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
"dojo/dom-construct",
"dojo/ready",
"dijit/registry",
"dojox/mobile/SpinWheel",
"dojox/mobile/SpinWheelSlot",
"dojox/mobile/parser",
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

function focusOutInputReceberDados(){
	if(window.event.keyCode == 13) {
		  
		 $('.inputChaveSincronizacao').trigger('blur');
		 $('#btn-receber-dados').trigger('click');
		  return false;
	}
}

function validarSenha() {
	if (connectionWIFI != "") {
		if (connectionWIFI == "connectionTrue") {
			var ajax = getAjax(urlViewConfig);

			ajax.success(function(data) {
				$.each(data, function(key, val) {
					if (val.senha_configuracao == $('.inputSenha').val()) {
						hide_preloader();
						$('#geral').show();
						hide('senha_configaracao');
					} else {
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

function sincronizarDados(){
	
	show('modal_sincronizacao_ipad');
}

function sincronizarMandarDados() {
	$('.preloader_image').show();

	//Criar Chave de sincronização

	var data = {
		"type" : "sincronizacao_chave",

		"title" : "Mesa: "+mesaConfig,
	};
	var url = "" + ipServidorDrupal + "/node";
	var ajaxChaveSincronizacao = postAjaxSinc(url,data);
	
	ajaxChaveSincronizacao.success(function (data) {
		var positionchaveInicial = data.search('{');
		var positionchaveFinal = data.search('}');
		var dataConvertida = data.substring(positionchaveInicial, positionchaveFinal+1);
		var dataConvertida2 = $.parseJSON(dataConvertida)
		chaveSincronizacao = dataConvertida2.nid;
    	sincronizarMandaPedidos(dataConvertida2.nid);
    	sincronizarMandaPessoa(dataConvertida2.nid);
    	sincronizarMandaConf(dataConvertida2.nid);
    	
    });

}

function sincronizarReceberDados(){
	var chaveDigitada = $('.inputChaveSincronizacao').val();
	receberDadosPedido(chaveDigitada);
	receberDadosPessoa(chaveDigitada);
	receberDadosConf(chaveDigitada)
	
}

function receberDadosPedido(chaveDigitada){

	var ajaxSincronizacaoPedido = getAjax(urlViewSincronizacaoPedido);

	ajaxSincronizacaoPedido.success(function(data) {3
		db.transaction(function(tx) {
		$.each(data, function(key, val) {
			// Pegas elementos com a chave digitada:
			if(val.chave_sincronizacao == chaveDigitada){
				 tx
																	.executeSql('INSERT INTO Pedido(id, mesa,  pessoa ,  observacao ,id_produto , nome_produto,  preco_produto,  quantidade, status, nid, nome_produto_portugues, categoria_produto) VALUES ("'
																			+ val.sinc_pedido_id
																			+ '", "'
																			+ val.sinc_pedido_mesa
																			+ '", "'
																			+ val.sinc_pedido_pessoa
																			+ '", "'
																			+ val.sinc_pedido_observacao
																			+ '", "'
																			+ val.sinc_pedido_id_produto
																			+ '", "'
																			+ val.sinc_pedido_nome_produto
																			+ '", "'
																			+ val.sinc_pedido_preco_produto
																			+ '", "'
																			+ val.sinc_pedido_quantidade
																			+ '", "'
																			+ val.sinc_pedido_status
																			+ '", "'
																			+ val.sinc_pedido_nid
																			+ '", "'
																			+ val.sinc_pedido_nome_produto_portugues
																			+ '", "'
																			+ val.sinc_pedido_categoria_produto
																			+ '")');
			}

		});
		},errorCB, successCB);
		

	});

	ajaxSincronizacaoPedido.error(function(jqXHR, textStatus, errorThrown) {
		alert('Erro Sincronizacao Pedidos: '+errorThrown);
	});
	 
}

function receberDadosPessoa(chaveDigitada){

	var ajaxSincronizacaoPessoa = getAjax(urlViewSincronizacaoPessoa);

	ajaxSincronizacaoPessoa.success(function(data) {3
		db.transaction(function(tx) {
		$.each(data, function(key, val) {
			// Pegas elementos com a chave digitada:
			if(val.chave_sincronizacao == chaveDigitada){
				 tx
																	.executeSql('INSERT INTO Pessoas(id	, nome, associado_pedido, ativo, contaConjunto) VALUES ("'
																			+ val.sinc_pessoa_id
																			+ '", "'
																			+ val.sinc_pessoa_nome
																			+ '", "'
																			+ val.sinc_pessoa_associado_pedido
																			+ '", "'
																			+ val.sinc_pessoa_ativo
																			+ '", "'
																			+ val.sinc_pessoa_contaConjunto
																			+ '")');
			}

		});
		},errorCB, successCB);
		

	});

	ajaxSincronizacaoPessoa.error(function(jqXHR, textStatus, errorThrown) {
		alert('Erro Sincronizacao Pessoas: '+errorThrown);
	});
	 
}

function receberDadosConf(chaveDigitada){

	var ajaxSincronizacaoConf = getAjax(urlViewSincronizacaoConf);

	ajaxSincronizacaoConf.success(function(data) {3
		db.transaction(function(tx) {
		$.each(data, function(key, val) {
			// Pegas elementos com a chave digitada:
			if(val.chave_sincronizacao == chaveDigitada){
				 tx
					.executeSql('INSERT INTO Mesa(numero) VALUES ("' + val.mesa_sincronizacao + '")');
				 tx
					.executeSql('INSERT INTO LanguageSelect(nome) VALUES ("'+val.languageSelect_sincronizacao+'")');
			}

		});
		},errorCB, successCB);
		

	});

	ajaxSincronizacaoConf.error(function(jqXHR, textStatus, errorThrown) {
		alert('Erro Sincronizacao Conf: '+errorThrown);
	});
	 
}

function sincronizarMandaPedidos(chaveSincronizacao){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido',[],function(tx,result){
			 if(result.rows.length > 0){
				for(var i=0;i<result.rows.length;i++){
					
					var chave_sincronizacao = {
						"value" : chaveSincronizacao,
					}
					
					var sinc_pedido_id = {
							"value" : result.rows.item(i).id,
					}
					
					var sinc_pedido_mesa = {
							"value" : result.rows.item(i).mesa,
					}
					
					var sinc_pedido_pessoa = {
							"value" : result.rows.item(i).pessoa,
					}
					
					var sinc_pedido_observacao = {
							"value" : result.rows.item(i).observacao,
					}
					
					var sinc_pedido_id_produto = {
							"value" : result.rows.item(i).id_produto,
					}
					
					var sinc_pedido_nome_produto = {
							"value" : result.rows.item(i).nome_produto,
					}
					
					var sinc_pedido_preco_produto = {
							"value" : result.rows.item(i).preco_produto,
					}
					
					var sinc_pedido_quantidade = {
							"value" : result.rows.item(i).quantidade,
					}
					
					var sinc_pedido_status = {
							"value" : result.rows.item(i).status,
					}
					
					var sinc_pedido_nid = {
							"value" : result.rows.item(i).nid,
					}
					
					var sinc_pedido_nome_produto_portugues = {
							"value" : result.rows.item(i).nome_produto_portugues,
					}
					
					var sinc_pedido_categoria_produto = {
							"value" : result.rows.item(i).categoria_produto,
					}
					
					var data = {
							"type" : "sincronizacao_pedido",
							"field_chave_sincronizacao[und][0]" : chave_sincronizacao,
							"field_sinc_pedido_id[und][0]" : sinc_pedido_id,
							"field_sinc_pedido_mesa[und][0]" : sinc_pedido_mesa,
							"field_sinc_pedido_pessoa[und][0]" : sinc_pedido_pessoa,
							"field_sinc_pedido_observacao[und][0]" : sinc_pedido_observacao,
							"field_sinc_pedido_id_produto[und][0]" : sinc_pedido_id_produto,
							"field_sinc_pedido_nome_produto[und][0]" : sinc_pedido_nome_produto,
							"field_sinc_pedido_preco_produto[und][0]" : sinc_pedido_preco_produto,
							"field_sinc_pedido_quantidade[und][0]" : sinc_pedido_quantidade,
							"field_sinc_pedido_status[und][0]" : sinc_pedido_status,
							"field_sinc_pedido_nid[und][0]" : sinc_pedido_nid,
							"field_sinc_pedido_nome_produto_portugues[und][0]" : sinc_pedido_nome_produto_portugues,
							"field_sinc_pedido_categoria_produto[und][0]" : sinc_pedido_categoria_produto,
							"title" : "Pedido Mesa: "+mesaConfig,
					};
					var url = "" + ipServidorDrupal + "/node";
					var ajaxPedidoSincronizacao = postAjaxSinc(url,data);
					ajaxPedidoSincronizacao.success(function (data) {
						if(i == result.rows.length){
							flagPedidoSincronizacao = true;
							finalizaMandaDadosSincronizacao();
						}
				    	
				    	
				    });
			    }
			 }
		 },errorCB);
   },errorCB, successCB);
}

function sincronizarMandaPessoa(chaveSincronizacao){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pessoas',[],function(tx,result){
			 if(result.rows.length > 0){
				for(var i=0;i<result.rows.length;i++){
					
					var chave_sincronizacao = {
						"value" : chaveSincronizacao,
					}
					
					var sinc_pessoa_id = {
							"value" : result.rows.item(i).id,
					}
					
					var sinc_pessoa_nome = {
							"value" : result.rows.item(i).nome,
					}
					
					var sinc_pessoa_associado_pedido = {
							"value" : result.rows.item(i).associado_pedido,
					}
					
					var sinc_pessoa_ativo = {
							"value" : result.rows.item(i).ativo,
					}
					
					var sinc_pessoa_contaConjunto = {
							"value" : result.rows.item(i).contaConjunto,
					}
					
					
					var data = {
							"type" : "sincronizacao_pessoa",
							"field_chave_sincronizacao[und][0]" : chave_sincronizacao,
							"field_sinc_pessoa_id[und][0]" : sinc_pessoa_id,
							"field_sinc_pessoa_nome[und][0]" : sinc_pessoa_nome,
							"field_sinc_pessoa_associado_pedi[und][0]" : sinc_pessoa_associado_pedido,
							"field_sinc_pessoa_ativo[und][0]" : sinc_pessoa_ativo,
							"field_sinc_pessoa_contaConjunto[und][0]" : sinc_pessoa_contaConjunto,
							"title" : "Pessoa Mesa: "+mesaConfig,
					};
					var url = "" + ipServidorDrupal + "/node";
					var ajaxPessoaSincronizacao = postAjaxSinc(url,data);
					ajaxPessoaSincronizacao.success(function (data) {
						if(i == result.rows.length){
							flagPessoaSincronizacao = true;
							finalizaMandaDadosSincronizacao();
						}
				    	
						
				    	
				    });
			    }
			 }
		 },errorCB);
   },errorCB, successCB);
}

function sincronizarMandaConf(chaveSincronizacao) {

	var chave_sincronizacao = {
		"value" : chaveSincronizacao,
	}

	var mesa_sincronizacao = {
		"value" : mesaConfig,
	}
	
	var languageSelect_sincronizacao = {
			"value" : constLanguageSelectedConf,
	}

	var data = {
		"type" : "sincronizacao_conf",
		"field_chave_sincronizacao[und][0]" : chave_sincronizacao,
		"field_mesa_sincronizacao[und][0]" : mesa_sincronizacao,
		"field_languageSelect_sincronizac[und][0]" : languageSelect_sincronizacao,
		"title" : "Conf Mesa: " + mesaConfig,
	};
	var url = "" + ipServidorDrupal + "/node";
	var ajaxConfSincronizacao = postAjaxSinc(url, data);
	ajaxConfSincronizacao.success(function(data) {
			flagConfSincronizacao = true;
			finalizaMandaDadosSincronizacao();

	});
}



function finalizaMandaDadosSincronizacao(){
	if(flagPedidoSincronizacao == true & flagPessoaSincronizacao == true & flagConfSincronizacao == true){
		$('.preloader_image').hide();
		$('.frase-loading').text('Dados Enviado com Sucesso');
		$('.frase-loading').show();
		$('.frase-chave-sincronizacao').text(chaveSincronizacao);
		$('.div-buttons-sincronizacao').hide();
		$('.div-frase-sincronizacao').show();
		$('.div-buttons-depois-sincronizacao').show();
	}
}

function successPostMesa(){
	alert('Mesa Inserida com sucesso');
}

$(document).ready(function(){
	
	db.transaction(function(tx) {
	 tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
		 mesaConfig = result.rows.item(0).numero;
	 },errorCB)
	 
	 tx.executeSql('SELECT * FROM LanguageSelect',[],function(tx,result){
		if(result.rows.length > 0){
		constLanguageSelectedConf = result.rows.item(0).nome;
		}
	 },errorCB)
	
	},errorCB, successCB);
	$("#linkHome").click(function() {
		  alert('clicou');
	});
	
	$("#btn-mudar-mesa").click(function() {
		$(".panel-numero-mesa").show();
	});
	
	
	
	
	/**
	function montaHome(tx){
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM Home',[],montaBackground,errorCB);
	     },errorCB,successInsert);
		
	}
	*/
	/**
	function montaBackground(tx,result){
		for(var i=0;i<result.rows.length;i++){
			$("#background-config").attr('src', "" + result.rows.item(i).background);
			
	    }
		
	}
	*/
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