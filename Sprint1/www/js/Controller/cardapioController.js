var idProdutoAtual;
var pessoaSelecionado;
var idPedidoExcluir;
var idPedidoEditando;
var editandoPedido;
var editandoPessoa = false;
var nomePessoaEditando;
var mesa;
var idConta;
var meuPedido = false;
var dlgConta;
var label_conta_conjunto_portugues = "";
var constPizzaMeioaMeio = "pizzaMeio";
var opcaoPizzaAtual = "";
var valor1 = null;
var valor2 = null;
var nomeSegundaOpcaoPizza = "";
var nomeSegundaOpcaoPizza_portugues = "";
var flagPizzaMeioaMeio = false;
var propagandaAtiva = false;
var flagOpicionalObrigatorio = false;
var flagRepetirPedido = false;
var flagChopp = false;
var flagCouvert = false;
var arrayIdPedidoChopps = new Array();
var tipoCouver = "";

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
    console.log(registry);
	  
      show = function(dlg){
	    registry.byId(dlg).show(); 
	  }
	  
	  hide = function(dlg){
		    registry.byId(dlg).hide();
	  }
        
        hide_modal_favor_selecionar_opcao = function(dlg){
        registry.byId(dlg).hide();
        
        $("#id_modal_nome_pessoa .select-adicionais").click();
        $("#id_modal_nome_pessoa .select-adicionais").focus();
        }
        
        hide_modal_favor_selecionar_pessoa_repetir_pedido = function(dlg){
        registry.byId(dlg).hide();
        
        $("#modal_repetir_pedido .select-pessoa-repetir-pedido").click();
        $("#modal_repetir_pedido .select-pessoa-repetir-pedido").focus();
        }
	  
	  showConfirmacaoPessoa = function(dlg,btn){
		  $("#"+dlg+" .btn-sim-excluir-pessoa").attr('name',btn.value);
		  $("#"+dlg+" .btn-sim-excluir-pessoa").attr('title',btn.title);
		  registry.byId(dlg).show();
	  }
	  
	  showConfirmacaoPedido = function(dlg){
		  $('#modal_efetuar_pedido p').text(ObjectLabels.alert_efetuar_pedido) ;
		  $('#modal_efetuar_pedido .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim) ;
		  $('#modal_efetuar_pedido .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao) ;
		  $('#modal_efetuar_pedido .fechamentoIndividual').attr('value',dlg.value) ;
		  registry.byId('modal_efetuar_pedido').show();
	  }
	  
	  showConfirmacaoGarcom = function(dlg){
		    registry.byId('modal_fechar_conta').hide();
		    $('#modal_chamar_garcom_confirmacao_mensagem .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
		    $('#modal_chamar_garcom_confirmacao_mensagem .btn_ok_mensagem').text(ObjectLabels.OK);
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
	  }
	  
      showExcluirPedido = function(){
    	  $('#modal_excluir_pedido .mensagem-confirmacao').text(ObjectLabels.alert_excluir_pedido);
    	  $('#modal_excluir_pedido .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim);
    	  $('#modal_excluir_pedido .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao);
		  registry.byId('modal_excluir_pedido').show();
	  }
     
     showConfirmacaoFechamentoConta = function(id,value,idli){
    	                                                
    	 hide('modal_sugestao_sobremesas');
    	 montaFormasDePagamento();		  
    	 if($( "#id-ul-fechamento-conta .mostrarDetalhado").length != 0){
		  $('#modal_fechar_conta p').text(ObjectLabels.alert_fechar_conta +' ' + value ) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('value',id);
		  $('#modal_fechar_conta .fechamentoIndividual').attr('title',value) ;
          $('#modal_fechar_conta .fechamentoIndividual').attr('id',idli) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('onClick','notificacaoFechamentoConta(this)') ;
		  $('#modal_fechar_conta .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim) ;
		  $('#modal_fechar_conta .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao) ;
		  registry.byId('modal_fechar_conta').show();
		  
    	 }
		  else{
		    	 show("modal_sem_pedido");
		     }
	  }
     
     showConfirmacaoFechamentoContaGarcom = function(id,value,idli){
         
    	 hide('modal_sugestao_sobremesas');
    	 montaFormasDePagamento();		  
    	 if($( "#id-ul-fechamento-conta .mostrarDetalhado").length != 0){
		  $('#modal_fechar_conta p').text(ObjectLabels.alert_fechar_conta +' ' + value ) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('value',id);
		  $('#modal_fechar_conta .fechamentoIndividual').attr('title',value) ;
          $('#modal_fechar_conta .fechamentoIndividual').attr('id',idli) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('onClick','showConfirmacaoPedidoIndividualGarcom(this)') ;
		  $('#modal_fechar_conta .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim) ;
		  $('#modal_fechar_conta .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao) ;
		  registry.byId('modal_fechar_conta').show();
		  
    	 }
		  else{
		    	 show("modal_sem_pedido");
		     }
	  }
     
     
     showChamarGarcom = function(dlg){
    	 $('#modal_chamar_garcon .mensagem-confirmacao').text(ObjectLabels.alert_chamar_garcon);
    	 $('#modal_chamar_garcon .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim);
    	 $('#modal_chamar_garcon .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao);
 	    registry.byId(dlg).show();
 	  }
     
     showSugestaoSobremesa = function(dlg){
    	 if($( "#id-ul-fechamento-conta .mostrarDetalhado").length != 0){
          
    		 db.transaction(function(tx){
    				tx.executeSql('SELECT * FROM Categorias where title_comum="SOBREMESAS"',[],function(tx,result){
    					if(result.rows.length > 0){
    						 $('#modal_sugestao_sobremesas p').text(ObjectLabels.alert_experimentar_sobremesa);
    						 $('#modal_sugestao_sobremesas .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim);
    						 $('#modal_sugestao_sobremesas .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao);
                                  var idLi =  $('#'+dlg.id).attr('idli');
    						 $('#modal_sugestao_sobremesas .btn-nao-sugestao-sobremesa').attr('onClick','showConfirmacaoFechamentoConta("'+dlg.id+'","'+dlg.value+'","'+idLi+'")');
                             //$('#modal_sugestao_sobremesas .btn-nao-sugestao-sobremesa').attr('onClick','showConfirmacaoFechamentoConta("'+dlg.id+'","'+dlg.value+'","'+idLi+'")') ;
    						 
                             
                                  
    						  registry.byId('modal_sugestao_sobremesas').show();
    					}else{
    						showConfirmacaoFechamentoConta(""+dlg.id+"",""+dlg.value+"");
    					}
    				},errorCB);
    				
    			},errorCB);
		 
    	 }
		  else{
		    	 show("modal_sem_pedido");
		      }
	 }
     
     showModal_confirmacao_fechamento_conta_garcom = function(dlg){
        var idLi =  $('#'+dlg.id).attr('idli');
        $('#modal_confirmacao_fechamento_conta_garcom .inputSenha').val('');
        registry.byId('modal_confirmacao_fechamento_conta_garcom').show();
    	 $('#modal_confirmacao_fechamento_conta_garcom .btn_ok_mensagem_modal_confirmacao_pagamento').attr('onClick','validarSenhaFechamentoConta("'+dlg.id+'","'+dlg.value+'","'+idLi+'")');
    	 
    						 
          
	 }
     
     showConfirmacaoPedidoIndividual = function(dlg){
    	 var formaDePagamento = $("#modal_fechar_conta .select-forma-de-pagamento").val();
		 var post = false;
    	 var tipo;
    	 var fechamentoMesa = false;
    	 var totalPagamento;
    	 var nomePessoa = "";
		 console.log(dlg);
    	 if(dlg.value != 'mesa'){
    		  tipo = "Individual";
    		  
    		  ultimoCaracterId = dlg.id;
    		  
    		  var preco = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .preco-fechamento-conta').text();
	   		  preco = preco.replace('Total:','');
	   		
	   			
	   			if(dlg.title == ObjectLabels.label_conta_conjunto){
	   					    nomePessoa = label_conta_conjunto_portugues +': ' + preco;
		   		  }		else{
		   			 nomePessoa = dlg.title +': ' + preco;
		   		  }
    		
     
    		  totalPagamento = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .preco-fechamento-conta').text();
      
    		  
    		  db.transaction(function(tx){
					tx.executeSql('SELECT * FROM Pedido where pessoa = "'+ dlg.title +'" and status="aguardando-pedido" ',[],function(tx,result){
						for(i=0;i<result.rows.length;i++){
						tx.executeSql('UPDATE Pedido SET status="aguardando-pagamento" WHERE Id='+result.rows.item(i).id+'');
						
						var forma_de_pagamento_update  = {
							     "value":""+formaDePagamento+"",
						}
						
						var status_pagamento  = {
							     "value":"Aguardando-Pagamento",
						}
						
						var data  = {
							     "type":"pedido",
							     "field_forma_de_pagamento[und][0]":forma_de_pagamento_update,
							     "field_status_pagamento[und][0]":status_pagamento,
					     };
						
						var urlUpdatePedido = "" + ipServidorDrupal + "/node/"+result.rows.item(i).nid;
						 
						 
						putAjax(urlUpdatePedido,data);
						}
					},errorCB);
					
					tx.executeSql('SELECT * FROM Pessoas where nome = "'+ dlg.title +'"',[],function(tx,result){
						for(i=0;i<result.rows.length;i++){
						tx.executeSql('UPDATE Pessoas SET ativo="false" WHERE Id='+result.rows.item(i).id+'');
						}
					},errorCB);
					
				},errorCB);
			
		  }else if(dlg.value == 'mesa'){
			   
			   tipo = "Mesa";
			   fechamentoMesa = true;
			   
			   // Monta nome de pessoas para fechamento de conta
			   totalPagamento = 0.00;
			   $( "#id-ul-fechamento-conta .mostrarDetalhado" ).each(function( index ) {
			   		if($('#'+this.id+' .btn_fechar_conta_individual').text() == ""+ObjectLabels.btn_fechar_conta_individual+""){
			   			var preco = $('#'+this.id+' .preco-fechamento-conta').text();
			   			preco = preco.replace('Total:','');
			   			var precoParser = preco.replace('R$ ','');
			   			totalPagamento += parseFloat(precoParser);
			   			
			   			if($('#'+this.id+' .btn_fechar_conta_individual').val() == ObjectLabels.label_conta_conjunto){
	   					    nomePessoa += label_conta_conjunto_portugues +": "+ preco + " tag-pular ";
		   		        }	else{
		   		        	nomePessoa +=$('#'+this.id+' .btn_fechar_conta_individual').val() + ": "+ preco + " tag-pular ";
		   		        }
			   			
			   		}
		    		
		    	 });
			   
			    totalPagamento = "Total: R$ " + totalPagamento.toFixed(2);
		    	$( "#id-ul-fechamento-conta .mostrarDetalhado .btn_fechar_conta_individual" ).each(function( index ) {
		    		if(this.title == 'aguardando-pedido'){
		    			var nome = this.value;
		    			 db.transaction(function(tx){
		 					tx.executeSql('SELECT * FROM Pedido where pessoa = "'+ nome +'" and status="aguardando-pedido"  ',[],function(tx,result){
		 						for(i=0;i<result.rows.length;i++){
		 						  tx.executeSql('UPDATE Pedido SET status="aguardando-pagamento" WHERE Id='+result.rows.item(i).id+'');
		 						  //limparDados(tx);
		 						 
		 						var forma_de_pagamento_update  = {
		 							     "value":""+formaDePagamento+"",
		 						 }
		 						
		 						var status_pagamento  = {
									     "value":"Aguardando-Pagamento",
								}
		 						
		 						var data  = {
		 							     "type":"pedido",
		 							     "field_forma_de_pagamento[und][0]":forma_de_pagamento_update,
		 							     "field_status_pagamento[und][0]":status_pagamento,
		 					     };
		 						
		 						var urlUpdatePedido = "" + ipServidorDrupal + "/node/"+result.rows.item(i).nid;
		 						 
		 						 
		 						putAjax(urlUpdatePedido,data);
		 						
		 						}
		 						
		 					},errorCB);
		 					
		 					tx.executeSql('SELECT * FROM Pessoas where nome = "'+ nome +'"',[],function(tx,result){
								for(i=0;i<result.rows.length;i++){
								tx.executeSql('UPDATE Pessoas SET ativo="false" WHERE Id='+result.rows.item(i).id+'');
								}
							},errorCB);	
		 					
		 				},errorCB);
		    		}
		    	 }); 
		    	
		 }
    	
    	    registry.byId('modal_fechar_conta').hide();
		    
		    
		    if(fechamentoMesa){
		    	montaPreviaPedido();
		    	$('#modal_chamar_garcom_confirmacao_mensagem_fechamento_mesa .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
		    	registry.byId('modal_chamar_garcom_confirmacao_mensagem_fechamento_mesa').show();
		    }else{
		    	montaPreviaPedido();
		    	$('#modal_chamar_garcom_confirmacao_mensagem .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
		    	registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
		    }
	  }
     
     showConfirmacaoPedidoIndividualGarcom = function(dlg){
      
    	 var formaDePagamento = $("#modal_fechar_conta .select-forma-de-pagamento").val();
		 var post = false;
    	 var tipo;
    	 var fechamentoMesa = false;
    	 var totalPagamento;
    	 var nomePessoa = "";
		 console.log(dlg);
    	 if(dlg.value != 'mesa'){
    		  tipo = "Individual";
    		  
    		  ultimoCaracterId = dlg.id;
    		  
    		  var preco = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .preco-fechamento-conta').text();
	   		  preco = preco.replace('Total:','');
	   		
	   			
	   			if(dlg.title == ObjectLabels.label_conta_conjunto){
	   					    nomePessoa = label_conta_conjunto_portugues +': ' + preco;
		   		  }	else{
		   			 nomePessoa = dlg.title +': ' + preco;
		   		  }
    		
     
    		  totalPagamento = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .preco-fechamento-conta').text();
      
    		
    		  db.transaction(function(tx){
					tx.executeSql('SELECT * FROM Pedido where pessoa = "'+ dlg.title +'" and (status="aguardando-pagamento" or status="aguardando-pedido") ',[],function(tx,result){
                                 
						for(i=0;i<result.rows.length;i++){
						tx.executeSql('UPDATE Pedido SET status="pagamento-feito" WHERE Id='+result.rows.item(i).id+'');
						var forma_de_pagamento_update  = {
							     "value":""+formaDePagamento+"",
						 }
						
						var status_pagamento  = {
							     "value":"Pagamento-Feito",
						}
						var data  = {
							     "type":"pedido",
							     "field_forma_de_pagamento[und][0]":forma_de_pagamento_update,
							     "field_status_pagamento[und][0]":status_pagamento,
					     };
						
						var urlUpdatePedido = "" + ipServidorDrupal + "/node/"+result.rows.item(i).nid;
						 
						 
						putAjax(urlUpdatePedido,data);
						}
						verificarPedidosAberto()
					},errorCB);
					
					tx.executeSql('SELECT * FROM Pessoas where nome = "'+ dlg.title +'"',[],function(tx,result){
						for(i=0;i<result.rows.length;i++){
						tx.executeSql('UPDATE Pessoas SET ativo="false" WHERE Id='+result.rows.item(i).id+'');
						}
					},errorCB);
					
				},errorCB);
			
		  }else if(dlg.value == 'mesa'){
			   
			   tipo = "Mesa";
			   fechamentoMesa = true;
			   
			   // Monta nome de pessoas para fechamento de conta
			   totalPagamento = 0.00;
			   $( "#id-ul-fechamento-conta .mostrarDetalhado" ).each(function( index ) {
			   		if($('#'+this.id+' .btn_fechar_conta_individual').text() == ""+ObjectLabels.btn_fechar_conta_individual+""){
			   			var preco = $('#'+this.id+' .preco-fechamento-conta').text();
			   			preco = preco.replace('Total:','');
			   			var precoParser = preco.replace('R$ ','');
			   			totalPagamento += parseFloat(precoParser);
			   			
			   			if($('#'+this.id+' .btn_fechar_conta_individual').val() == ObjectLabels.label_conta_conjunto){
	   					    nomePessoa += label_conta_conjunto_portugues +": "+ preco + " tag-pular ";
		   		        }	else{
		   		        	nomePessoa +=$('#'+this.id+' .btn_fechar_conta_individual').val() + ": "+ preco + " tag-pular ";
		   		        }
			   			
			   		}
		    		
		    	 });
			   
			    totalPagamento = "Total: R$ " + totalPagamento.toFixed(2);
		    	$( "#id-ul-fechamento-conta .mostrarDetalhado .btn_fechar_conta_individual" ).each(function( index ) {
		    		if(this.title == 'aguardando-pedido'){
		    			var nome = this.value;
		    			 db.transaction(function(tx){
		 					tx.executeSql('SELECT * FROM Pedido where pessoa = "'+ nome +'" and (status="aguardando-pagamento"  or status="aguardando-pedido")',[],function(tx,result){
		 						for(i=0;i<result.rows.length;i++){
		 						  tx.executeSql('UPDATE Pedido SET status="pagamento-feito" WHERE Id='+result.rows.item(i).id+'');
		 						  //limparDados(tx);
		 						 
		 						var forma_de_pagamento_update  = {
		 							     "value":""+formaDePagamento+"",
		 						 }
		 						
		 						var data  = {
		 							     "type":"pedido",
		 							     "field_forma_de_pagamento[und][0]":forma_de_pagamento_update,
		 					     };
		 						
		 						var urlUpdatePedido = "" + ipServidorDrupal + "/node/"+result.rows.item(i).nid;
		 						 
		 						 
		 						putAjax(urlUpdatePedido,data);
		 						
		 						}
		 						
		 					},errorCB);
		 					
		 					tx.executeSql('SELECT * FROM Pessoas where nome = "'+ nome +'"',[],function(tx,result){
								for(i=0;i<result.rows.length;i++){
								tx.executeSql('UPDATE Pessoas SET ativo="false" WHERE Id='+result.rows.item(i).id+'');
								}
							},errorCB);
		 					
		 				},errorCB);
		    		}
		    	 }); 
		    	
		 }
    	 
		 var nomePessoa_field  = {
			     "value":""+nomePessoa+"",
		 }
		 
		 var mesa_field = {
			     "value":""+mesa+"",
		 }
		 
		 var totalPagamento_field  = {
			     "value":""+totalPagamento+"",
		 }
		 
		 var tipo_field  = {
			     "value":""+tipo+"",
		 }
		 
		 var status_fechamento  = {
			     "value":"pedido-fechamento",
		 }
		 
		 var forma_de_pagamento  = {
			     "value":""+formaDePagamento+"",
		 }
		 
		 var fechamento_idConta  = {
			     "value":idConta,
		 }
		 var data  = {
			     "type":"fechamento_conta",
			     "field_numero_mesa[und][0]":mesa_field,
			     "field_nome_pessoa[und][0]":nomePessoa_field,
			     "field_total[und][0]":totalPagamento_field,
			     "field_tipo[und][0]":tipo_field,
			     "field_status_fechamento[und][0]":status_fechamento,
			     "field_fechamento_id_conta[und][0]":fechamento_idConta,
			     "field_forma_de_pagamento[und][0]":forma_de_pagamento,
			     "title":"Fechamento: " + mesa,
	     };
		
		 //"+ decodeURIComponent("212")+".json"
		 var url=""+ipServidorDrupal+"/node";
         postAjax(url,data);
		 console.log(data);
		   
		    
    	    registry.byId('modal_fechar_conta').hide();
		    
		    
		    if(fechamentoMesa){
		    	montaPreviaPedido();
		    	$('#modal_chamar_garcom_confirmacao_mensagem_fechamento_mesa .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
		    	registry.byId('modal_chamar_garcom_confirmacao_mensagem_fechamento_mesa').show();
		    }else{
		    	montaPreviaPedido();
		    	$('#modal_chamar_garcom_confirmacao_mensagem .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
		    	registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
		    }
	  }
	  
});


function validarSenhaFechamentoConta(id,value,idLi){
	
	db.transaction(function(tx){
		
		 if (connectionWIFI != "") {
				if (connectionWIFI == "connectionTrue") {
					var ajax = getAjax(urlViewConfig);

					 ajax.success(function (data) {
						 $.each(data, function(key, val) {
					    	if(val.senha_confirmacao_pagamento == $('#modal_confirmacao_fechamento_conta_garcom .inputSenha').val()){
					    		hide('modal_confirmacao_fechamento_conta_garcom');
					    		showConfirmacaoFechamentoContaGarcom(id,value,idLi);
					    	}else{
					    		alert('Senha Inválida');
					    	}
					    	
					       });
				     });
				} else {
					
					hide('modal_confirmacao_fechamento_conta_garcom');
				}
			}

	},errorCB);
	
}


function notificacaoFechamentoConta(btn){
	showConfirmacaoPedidoIndividual(btn);
	var formaDePagamento = $("#modal_fechar_conta .select-forma-de-pagamento").val();
	var mensagem  = {
		     "value":"Mesa: "+mesa+" Pedindo Para Fechar Conta ("+formaDePagamento+")",
	 }
	 
	 var typeNotificacao  = {
		     "value":"chamaGarcon",
	 }
		    
	 var data  = {
			 "type":"notificacao",
		     "field_notificacao_mensagem[und][0]":mensagem,
		     "field_notificacao_type[und][0]":typeNotificacao,
		     "title":mesa,
	};
	 console.log(data.field_notificacao_type);
	 var url=""+ipServidorDrupal+"/node";
    //var ajaxPostDrupal = postAjax(url,data);
    postAjax(url,data) ;
    $('#modal_chamar_garcom_confirmacao_mensagem .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
    $('#modal_chamar_garcom_confirmacao_mensagem .btn_ok_mensagem').text(ObjectLabels.OK);
    show('modal_chamar_garcom_confirmacao_mensagem');
}

function updatePedidosDrupalFormaPagamento(){
	
}

function showLocalConfirmacaoPedido(dlg){
	showConfirmacaoPedido(dlg);
}

function mostrarSugestõesSobremesas(dlg){
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Categorias where title_comum="SOBREMESAS"',[],function(tx,result){
			if(result.rows.length > 0){
				hide('modal_sugestao_sobremesas');
				hide('modal_previa_pedido');
				$('#ul-categorias .nome_categoria').each(function( index ) {
					if($(this).parents('.divClicavel').attr('name') == "SOBREMESAS"){
						$(this).parents('.divClicavel').trigger('click');
					}
				 });
			}
		},errorCB);
		
	},errorCB);
	
}

function adicionarChopp(){
	flagCouvert = false;
	var quantidadeChopp = parseInt($('#modal_adicionar_garcom .input-quantidade-chopp').val());
	parseInt
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Chopp',[],function(tx,result){
			
			if(result.rows.length > 0 ){
				var codigo_produto_chopp = result.rows.item(0).codigo_produto_chopp;
				tx.executeSql('SELECT * FROM Produtos where codigo = "'+codigo_produto_chopp+'" and language = "'+constLanguageSelected+'"',[],function(tx,result){
					
					if(result.rows.length > 0 ){
	                        
						 var id = result.rows.item(0).id;
						 var preco = result.rows.item(0).preco;
						 var preco_original = result.rows.item(0).preco;
						 var title_comum = result.rows.item(0).title_comum;
						 var categoria = result.rows.item(0).categoria;
						 var nid_produto = result.rows.item(0).nid;
						 var preco_adicionais = "";
						 var nid_adicionais = "";
						 var title_adicionais = "";
						 var title_adicionais_portugues = "";
						 var contador = 0;
						 var pessoaSelecionado = ObjectLabels.label_conta_conjunto;
						 var observacao = "Chopp";
						 var title = result.rows.item(0).title;
						var adicionaisId = "";
						var flagPizzaMeioaMeio = "";
						var nomePrimeiraOpcaoPizza = "";
						flagChopp = true;
						  for(i=0;i<quantidadeChopp;i++){
						   tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+pessoaSelecionado+'","true","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","chopp","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","","","","","","semDisplay","'+returnDataAtual()+'")');
						   
						   tx.executeSql('SELECT mesa,pessoa,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,id, MAX(id) FROM Pedido where status = "chopp"',[],postPedidoDrupal,errorCB);
						  }
					}
					
				},errorCB);
			}
			
		},errorCB);
		
	},errorCB);
	hide('modal_adicionar_garcom');
}

function verificarPedidosAberto(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Pedido where status != "pagamento-feito" and status != "cancelado" and status != "confirmacao" and status != "distribuido" ',[],function(fx,result){
			 if(result.rows.length == 0){
			   
				 tx.executeSql('SELECT * FROM Pedido where status != "pagamento-feito" and status == "distribuido" ',[],function(fx,result){
					 if(result.rows.length > 0){
					   for(i=0;i<result.rows.length;i++){
						   
						
							
							var status_pagamento  = {
								     "value":"Pagamento-Feito",
							}
							var data  = {
								     "type":"pedido",
								     "field_status_pagamento[und][0]":status_pagamento,
						     };
							
							var urlUpdatePedido = "" + ipServidorDrupal + "/node/"+result.rows.item(i).nid;
							 
							 
							putAjax(urlUpdatePedido,data);
					   }
					 }
				 },errorCB);
				 
			 }
		 },errorCB);
		},errorCB);
	
}

function montaModalAdicionarChopp(){
	
	show('modal_adicionar_garcom');
	$('#modal_adicionar_garcom .input-quantidade-chopp').val('');
	$('#modal_adicionar_garcom .input-quantidade-chopp').select();
	
}

function confirmarPagamento(btn){
	db.transaction(function(tx){
			tx.executeSql('SELECT * FROM Pedido where status="aguardando-pagamento" group by pessoa ',[],function(tx,result){
				$('#modal_confirmacao_pagamento .lista-pessoas-confirmacao-pagamento p').remove();
				for(i=0;i<result.rows.length;i++){
					$('#modal_confirmacao_pagamento .lista-pessoas-confirmacao-pagamento').append('<p>'+result.rows.item(i).pessoa+'</p>');
					$('#modal_confirmacao_pagamento .inputSenha').val('');
					$('#modal_confirmacao_pagamento .div-mensagem span').text(ObjectLabels.alert_confirmar_pagamento_para);
					$('#modal_confirmacao_pagamento .btn_ok_cancelar_apagar_mesa').text(ObjectLabels.btn_cancelar);
					show('modal_confirmacao_pagamento');
				}
			},errorCB);
			
		},errorCB);
}

function inputSenhaConfirmacaoPagamento(){
	if(window.event.keyCode == 13) {
		 $('.inputSenha').trigger('blur');
		 $('#btn_ok_confirmacao_pagamento').trigger('click');
		  return false;
	}
}

function inputQuantidadeChopp(){
	if(window.event.keyCode == 13) {
		$('#modal_adicionar_garcom .input-quantidade-chopp').trigger('blur');
		adicionarChopp();
	}
}

function inputSenhaCancelamentoPedido(){
	if(window.event.keyCode == 13) {
		 $('.inputSenha-cancelamento-pedido').trigger('blur');
		 $('.btn_ok_cancelamento_pedido').trigger('click');
		  return false;
	}
}

function inputSenhaConfirmacaoPagamentoLimparMesa(){
	if(window.event.keyCode == 13) {
		  
		 $('.inputSenhaLimparDados').trigger('blur');
		 $('#btn_ok_confirmacao_pagamento_limpar_mesa').trigger('click');
		  return false;
	}
}

function validarSenhaCancelamentoPedido(btn){
				 
		if (connectionWIFI == "connectionTrue") {
			textMotivo = $('#modal_cancelamento_pedido .textarea-motivo-cancelamento-pedido').val();
			if(textMotivo != "" && textMotivo != null){
				var ajax = getAjax(urlViewConfig);
				ajax.success(function (data) {
			      $.each(data, function(key, val) {
			    	  
			    	if(val.senha_cancelamento_pedido != "-1"){
					    if(val.senha_cancelamento_pedido == $('.inputSenha-cancelamento-pedido').val()){
					    	
					    	var idPedido = btn.name;
					    	var nidPedido = btn.value;
					    	
					    	
					    	updatePedidoDrupal('cancelado',nidPedido,idPedido,textMotivo);
					    	
					    	var urlUpdateConfiguracao = "" + ipServidorDrupal + "/node/"+val.nid;
					    	var senha_cancelamento = {
									"value" : "-1",
							}
							
							var dataCancelamento = {
									"type" : "configura_o",
									"field_senha_cancelamento_pedido[und][0]" : senha_cancelamento,
									
							};
					    	
					    	var putMeuAjax = putAjax(urlUpdateConfiguracao,dataCancelamento);
					    	
						}else{
							 	alert('Senha Inválida');
							 }
			    	 }else{
			    		 alert('Senha Vencida');
			    	 }	    	
				  });
			    });
		    }else{
		    	alert('Favor Digitar o Motivo do Cancelamento');
		    }
		 } else {
			 hide('modal_cancelamento_pedido');
		 }
}

function updatePedidoDrupal(status,nid,idPedido,textMotivo){
	var url = "" + ipServidorDrupal + "/node/"+nid;

	var statusData = {
			"value" : status,
	}
	
	var motivoCancelamento ={
			"value" : textMotivo,
	}
	
	var precoPedido ={
			"value" : "0.00",
	}

	
	var data = {
			"type" : "pedido",
			"field_status[und][0]" : statusData,
			"field_motivo_cancelamento[und][0]" : motivoCancelamento,
			"field_preco_produto[und][0]" : precoPedido,
	};
	
	var putMeuAjax = putAjax(url,data);
	
	putMeuAjax.success(function (data) {
		db.transaction(function(tx){
			
    		tx.executeSql('UPDATE Pedido SET status="cancelado" WHERE Id='+idPedido+'');
    		selectProdutoMeuPedido();
    		alert('Pedido Cancelado com Sucesso');
    		hide('modal_cancelamento_pedido');
			
		},errorCB);
		
		
	});
	
	putMeuAjax.error(function (data) {
		alert('Erro Ao Cancelar Pedido');
	});
	
}	

function validarSenhaConfirmacaoPagamento(){
	
	db.transaction(function(tx){
	
				 if (connectionWIFI != "") {
						if (connectionWIFI == "connectionTrue") {
							var ajax = getAjax(urlViewConfig);

							 ajax.success(function (data) {
								 $.each(data, function(key, val) {
							    	if(val.senha_confirmacao_pagamento == $('.inputSenha').val()){
							    		atualizaPagamentoFeito();
							    		montaPreviaPedido();
							    		hide('modal_confirmacao_pagamento');
							    		
							    	}else{
							    		alert('Senha Inválida');
							    	}
							    	
							       });
						     });
						} else {
							atualizaPagamentoFeito();
				    		montaPreviaPedido();
				    		hide('modal_confirmacao_pagamento');
						}
					}

		},errorCB);
	
}

function atualizaPagamentoFeito(){
	db.transaction(function(tx){
			tx.executeSql('SELECT * FROM Pedido where status="aguardando-pagamento"',[],function(tx,result){
				for(i=0;i<result.rows.length;i++){
				tx.executeSql('UPDATE Pedido SET status="pagamento-feito" WHERE Id='+result.rows.item(i).id+'');
				//limparDados(tx);
				}
			},errorCB);
			
			tx.executeSql('SELECT * FROM Pedido where status="aguardando-pedido"',[],function(tx,result){
				
				if(result.rows.length == 0){
					
					/**
					var stringMensagem = ObjectLabels.alert_mesa_contem_pendentes;
					var arrayMensagem = stringMensagem.split('.');
					$('#modal_confirmacao_pagamento_limpar_mesa .mensagem-confirmacao-p1').text(arrayMensagem[0]);
					$('#modal_confirmacao_pagamento_limpar_mesa .mensagem-confirmacao-p2').text(arrayMensagem[1]);
					
					
					show('modal_confirmacao_pagamento_limpar_mesa');
					*/
					
					limparDadosMesa('');
					//limparDados(tx);
				}
				
			},errorCB);
			
		},errorCB);
}

function voltaHome(){
	window.location = 'home.html';
}

function validarSenhaConfirmacaoPagamentoLimparMesa(){
	
	db.transaction(function(tx){
		
				 if (connectionWIFI != "") {
						if (connectionWIFI == "connectionTrue") {
							var ajax = getAjax(urlViewConfig);
							 ajax.success(function (data) {
								 $.each(data, function(key, val) {
							    	if(val.senha_confirmacao_pagamento == $('.inputSenhaLimparDados').val()){
							    		
							    		limparDadosMesa();
							    		
							    	}else{
							    		alert('Senha Inválida');
							    	}
							    	
							       });
						     });
						} else {
							limparDadosMesa();
						}
					}

		},errorCB);

}


function limparDados(tx){
	createTablesdoCardapio(tx);
}

function montaCardapio(tx){
	
	tx.executeSql('SELECT * FROM LanguageSelect',[],function(tx,result){
		constLanguageSelected = result.rows.item(0).nome;
	},errorCB)
	
	 tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
		 mesa = result.rows.item(0).numero;
	 },errorCB)
	 
	 tx.executeSql('SELECT * FROM IdConta ', [], function(tx, result) {
		 idConta = result.rows.item(0).idConta;
	 }, errorCB);
	 
	
	
	 tx.executeSql('SELECT MAX(nivel) FROM Categorias',[],function(tx,result){
		var nivelMax = result.rows.item(0).nivel;
		tx.executeSql('SELECT * FROM Categorias where language="'+constLanguageSelected+'" and nivel="'+nivelMax+'" order by ordem',[],montaCategoria,errorCB);
		
		alert(result.rows.item(0).nivel);
	 },errorCB)
	
	
	
	montaBotoesCardapio();
}

function montaCategoria(tx,result){
    console.log(result.rows);
    for(var i=0;i<result.rows.length;i++){
        
        var classeCategoriaDuasLinhas = "";
        if(result.rows.item(i).title.length > 17){
           classeCategoriaDuasLinhas = "categoria_duas_linhas";
        }
        
    	$("#ul-categorias").append('<div class="divClicavel" name="'+result.rows.item(i).title_comum+'" value="'+result.rows.item(i).display_cozinha+'" id="categoria-'+i+'" onclick="chamarProdutos(this)" ><li dojoType="dojox.mobile.ListItem"  class="minhaLI minhaLI" tabindex="0"><div class="mblListItemLabel" style="display: inline;"></div></li> <div class="div-span-nome-categoria"><span class="nome_categoria '+classeCategoriaDuasLinhas+'">'+result.rows.item(i).title+'</span></div></div>')
		console.log(result.rows.item(i));
    	console.log(result.rows.item(i));
    }
}


function montaBotoesCardapio(){
	
	$('#btn_home').text(ObjectLabels.btn_home);
	$('#btn_fecharConta').text(ObjectLabels.btn_fechar_conta);
	$('#btn_meuPedido').text(ObjectLabels.btn_meu_pedido);
	$('#btn_chamarGarçon').text(ObjectLabels.btn_chamar_garcom);
	
    /**
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_home" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				$('#btn_home').text(result.rows.item(0).valor);
			}
		},errorCB);
		
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_fechar_conta"  and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				$('#btn_fecharConta').text(result.rows.item(0).valor);
			}
		},errorCB);
		
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_meu_pedido"  and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				$('#btn_meuPedido').text(result.rows.item(0).valor);
			}
		},errorCB);
		
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_chamar_garcom"  and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				$('#btn_chamarGarçon').text(result.rows.item(0).valor);
			}
		},errorCB);
		
	},errorCB);
	*/
}

function chamarProdutos(div){
	
    $(".selecionado").removeClass("selecionado");
	$("#"+ div.id + " li").addClass("selecionado");
	console.log(div);

	categoriaSelecionado = $("#" + div.id).attr('name');
	displayCozinhaSelecionado = $("#" + div.id).attr('value');
	console.log("catergoriaSelecionado: " + categoriaSelecionado);
	
	$("#UL-Produtos").html("");
	
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Categorias where title_comum = "'+ categoriaSelecionado +'" and language = "Portuguese-Brazil" ',[],function(tx,result){
			if(result.rows.item(0).image != null || result.rows.item(0).image != ""){
				$('body').css('background','url("'+result.rows.item(0).image+'") no-repeat scroll center bottom transparent');
			}
			
		},errorCB);
	 },errorCB);
	db.transaction(selectDadosProdutos,errorCB);
}

function selectDadosProdutos(tx){
	console.log("selectDadosProdutos: " + categoriaSelecionado);
	console.log('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" ');
	tx.executeSql('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" and language = "'+constLanguageSelected+'" order by ordem',[],montaProdutos,errorCB);
}

function montaProdutos(tx,result){
	 for(var i=0;i<result.rows.length;i++){
		 console.log( "testantoselecProdutos" + result.rows.item(i).id);
		 $(".content .mblScrollableViewContainer").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
		 $(".content .mblScrollBarWrapper div").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
		 // var titleProduto = delimitadorFrase(result.rows.item(i).title, 26);
		 if(result.rows.item(i).previa_descricao == null || result.rows.item(i).previa_descricao == "null"){
			 var PreviadescricaoProduto = "";
			 $('#UL-Produtos .minhaLI').addClass('minhali_sem_previa_descricao');
		 }else{
			 var PreviadescricaoProduto = result.rows.item(i).previa_descricao;
		 }
		 
		 if(result.rows.item(i).image == "" || result.rows.item(i).image == null){
			 var titleProduto = delimitadorFrase(result.rows.item(i).title, 36);
			
		 }else{
			 var titleProduto = delimitadorFrase(result.rows.item(i).title, 26);
		 }
		 
		 $("#UL-Produtos").append('<div class="divClicavel" name="'+ result.rows.item(i).id +'" id="produto-'+i+'" onclick="selectProduto(this)"> <li dojoType="dojox.mobile.ListItem"  class="minhaLI"></li> <div class="imagem_categoria"> <img src="'+ result.rows.item(i).image+'"></div> <span class="nome_produto">'+titleProduto+'</span><p class="preco_produto">R$ '+result.rows.item(i).preco+'</p><div class="previa_descricao_produto"><span>'+PreviadescricaoProduto+'</span></div></div>');
		
		 if(result.rows.item(i).image == "" || result.rows.item(i).image == null){
			 $('#UL-Produtos .imagem_categoria img').hide();
			 $('#UL-Produtos .nome_produto').css('left','30px');
			 $('#UL-Produtos .previa_descricao_produto').addClass('previa_descricao_sem_image');
		 }
	}
    $("#UL-Produtos").hide();
    $("#UL-Produtos").show();

}

function selectProduto(produto){
	
	 db.transaction(function(tx){
		var name = $("#" + produto.id).attr('name');
		console.log("nameProdutoTentativa: "+ name);
		tx.executeSql('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" and id='+name+' ',[],montaDescricao,errorCB);
	 },errorCB);
	
}

function selectProdutoPizzaMeioaMeio(opcao){
	opcaoPizzaAtual = opcao;
	$(".button-escolher-opcoes button").removeClass("opcaoSelecionado");
	$(".btn_adicionar_opcao_"+opcao).addClass('opcaoSelecionado');
	$(".ul_modal_monta_sua_pizza").html("");
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" and language = "'+constLanguageSelected+'" ',[],function(tx,result){
			if(result.rows.length>0){
				for(var i=0;i<result.rows.length;i++){
					 
					 $(".content .mblScrollableViewContainer").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
					 $(".content .mblScrollBarWrapper div").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
					 var titleProduto = delimitadorFrase(result.rows.item(i).title, 26);
					 $(".ul_modal_monta_sua_pizza").append('<div class="divClicavel" value="'+opcao+'" name="'+ result.rows.item(i).id +'" id="produto-'+categoriaSelecionado+'-'+i+'" onclick="adicionarPizzaMeioaMeio(this)"> <li dojoType="dojox.mobile.ListItem"  class="minhaLI"></li> <div class="imagem_categoria"> <img src="'+ result.rows.item(i).image+'"></div> <span class="nome_produto_opcoes_pizza">'+titleProduto+'</span><p class="preco_produto_opcoes_pizza">R$ '+result.rows.item(i).preco+'</p><div class="previa_descricao_produto_opcoes_pizza"><span>'+result.rows.item(i).previa_descricao+'</span></div></div>');
					 if(result.rows.item(i).image == "" || result.rows.item(i).image == null){
						 $(".ul_modal_monta_sua_pizza .imagem_categoria img").hide();
						 $(".ul_modal_monta_sua_pizza .nome_produto_opcoes_pizza").addClass('nome_produto_opcoes_pizza_sem_imagem');
						 $(".ul_modal_monta_sua_pizza .previa_descricao_produto_opcoes_pizza").addClass('previa_descricao_produto_opcoes_pizza_sem_pizza');
					 }
				}
			}
		
		},errorCB); 
	},errorCB);
}

function adicionarPizzaMeioaMeio(li){
	var nomeProduto = "";
	var idProduto = $('#'+li.id).attr('name');
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Produtos where id = "'+ idProduto +'"',[],function(tx,result){
			if(result.rows.length>0){
				nomeProduto =  delimitadorFrase(result.rows.item(0).title, 26) +" - R$ " + result.rows.item(0).preco;
				if(opcaoPizzaAtual == "1"){
					$(".opcoes-escolhidas .opcao1 span").text(nomeProduto);
					$(".opcoes-escolhidas .opcao1 span").attr('name',idProduto);
					$(".opcoes-escolhidas .opcao1 span").attr('namePortugues',result.rows.item(0).title_comum);
					$(".opcoes-escolhidas .opcao1 span").attr('value',result.rows.item(0).title);
					$(".btn_adicionar_opcao_1").text("Mudar Opção 1");
					valor1 = parseFloat(result.rows.item(0).preco);
					
					if (valor2 != null){
						$('#id-modal-meio-a-meio .btn_adicionar_pedido').removeAttr('disabled');
						if(valor1>valor2){
							valor1 = valor1.toFixed(2);
							$('.div-valor-pizza span').text("R$ "+valor1);
							nomeSegundaOpcaoPizza = $(".opcoes-escolhidas .opcao2 span").attr('value');
							nomeSegundaOpcaoPizza_portugues = $(".opcoes-escolhidas .opcao2 span").attr('namePortugues');
							var idProdutoMaiorValor = $(".opcoes-escolhidas .opcao1 span").attr('name');
							$('#id-modal-meio-a-meio .btn_adicionar_pedido').attr('onclick','selectPessoa('+idProdutoMaiorValor+')')
						}else{
							valor2 = valor2.toFixed(2);
							$('.div-valor-pizza span').text(valor2);
							nomeSegundaOpcaoPizza = $(".opcoes-escolhidas .opcao1 span").attr('value');
							nomeSegundaOpcaoPizza_portugues = $(".opcoes-escolhidas .opcao1 span").attr('namePortugues');
							var idProdutoMaiorValor = $(".opcoes-escolhidas .opcao2 span").attr('name');
							$('#id-modal-meio-a-meio .btn_adicionar_pedido').attr('onclick','selectPessoa('+idProdutoMaiorValor+')');
						}
					}
					
				}else{
					if(opcaoPizzaAtual == "2"){
						$(".opcoes-escolhidas .opcao2 span").text(nomeProduto);
						$(".opcoes-escolhidas .opcao2 span").attr('name',idProduto);
						$(".opcoes-escolhidas .opcao2 span").attr('namePortugues',result.rows.item(0).title_comum);
						$(".opcoes-escolhidas .opcao2 span").attr('value',result.rows.item(0).title);
						$(".btn_adicionar_opcao_2").text("Mudar Opção 2");
						valor2 = parseFloat(result.rows.item(0).preco);
						if (valor1 != null){
							$('#id-modal-meio-a-meio .btn_adicionar_pedido').removeAttr('disabled');
							if(valor1>valor2){
								valor1 = valor1.toFixed(2);
								$('.div-valor-pizza span').text(valor1);
								nomeSegundaOpcaoPizza = $(".opcoes-escolhidas .opcao2 span").attr('value');
								nomeSegundaOpcaoPizza_portugues = $(".opcoes-escolhidas .opcao2 span").attr('namePortugues');
								var idProdutoMaiorValor = $(".opcoes-escolhidas .opcao1 span").attr('name');
								$('#id-modal-meio-a-meio .btn_adicionar_pedido').attr('onclick','selectPessoa('+idProdutoMaiorValor+')')
							}else{
								valor2 = valor2.toFixed(2);
								$('.div-valor-pizza span').text(valor2);
								nomeSegundaOpcaoPizza = $(".opcoes-escolhidas .opcao1 span").attr('value');
								nomeSegundaOpcaoPizza_portugues = $(".opcoes-escolhidas .opcao1 span").attr('namePortugues');
								var idProdutoMaiorValor = $(".opcoes-escolhidas .opcao2 span").attr('name');
								$('#id-modal-meio-a-meio .btn_adicionar_pedido').attr('onclick','selectPessoa('+idProdutoMaiorValor+')')
							}
						}
					}
				}
			}
		
		},errorCB);
	},errorCB);
}

function montaDescricao(tx,result){
	flagPizzaMeioaMeio = false;
	valor1 = null;
	valor2 = null;

	if(result.rows.item(0).codigo == constPizzaMeioaMeio){
		flagPizzaMeioaMeio = true;
		$(".button-escolher-opcoes button").removeClass("opcaoSelecionado");
		$(".ul_modal_monta_sua_pizza").html("");
		$(".btn_adicionar_opcao_1").text("+ Opção 1");
		$(".btn_adicionar_opcao_2").text("+ Opção 2");
		$(".p-escolha-sua-opcao span").html("");
		$(".p-escolha-sua-opcao span").html("");
		$(".div-valor-pizza span").html("");
		$('#id-modal-meio-a-meio .btn_adicionar_pedido').attr("disabled", "disabled");
		editandoPedido = false;
		editandoPessoa = false;
		show('id-modal-meio-a-meio');
	
	}else{
		console.log("MOntaDescricaoaisimeimResult: "  + result.rows.item(0).image);
		
		// limpa modal-descricao 
		$("#id-modal-descricao .modal_image img").remove();
		$("#id-modal-descricao .modal_descricao .title_modal").text("");
		$("#id-modal-descricao .modal_descricao .title_descricao").text("");
		$("#id-modal-descricao .modal_descricao .title_preco").text("");
		$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido button").remove();
		$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido button").remove();
		
		if(result.rows.length > 0){
			console.log("imagem: "  + result.rows.item(0).image);
			
			$("#id-modal-descricao .modal_image").append('<img alt="" src="'+result.rows.item(0).image+'" class="img_modal">');
			if(result.rows.item(0).image == "" || result.rows.item(0).image == null){
				$("#id-modal-descricao .modal_image").hide();
				$("#id-modal-descricao .modal_descricao").addClass('modal_descricao_sem_image');
			}
			
			$("#id-modal-descricao .modal_descricao .title_modal").text(result.rows.item(0).title);
			
			if(result.rows.item(0).descricao == null || result.rows.item(0).descricao == "null"){
				 var descricaoProduto = "";
			 }else{
				 var descricaoProduto = result.rows.item(0).descricao;
			 }
			$("#id-modal-descricao .modal_descricao .title_descricao").text(descricaoProduto);
			$("#id-modal-descricao .modal_descricao .title_preco").text('R$ ' + result.rows.item(0).preco);
			$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido").append('<button  value="descricao-categoria-1-2" class="btn_adicionar_pedido efeito-button-descricao" >'+ObjectLabels.btn_adicionar+'</button>');
			$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido").append('<button  value="descricao-categoria-1-2" class="btn_cancelar_pedido efeito-button-descricao" onclick="hide(\'id-modal-descricao\')">'+ObjectLabels.btn_cancelar+'</button>');
			
			//Binds
			$('#id-modal-descricao .btn_adicionar_pedido_descricao_pedido .btn_adicionar_pedido').bind('touchstart click', function(){
				selectPessoa(result.rows.item(0).id);
		    });
			
			//$('#id-modal-descricao .btn_adicionar_pedido_descricao_pedido .btn_cancelar_pedido').bind('touchstart click', function(){
				//hide('id-modal-descricao');
		  //  });
			
			editandoPedido = false;
			editandoPessoa = false;
			show('id-modal-descricao');
		}
		
		db.transaction(function(tx){
			console.log("nameProdutoTentativa: "+ name);
			
			tx.executeSql('SELECT * FROM Pessoas',[],function(tx,result){
				if(result.rows.length != 0){
					tx.executeSql('SELECT * FROM Pessoas where ativo = "true"',[],function(tx,result){
						if(result.rows.length == 0){
							$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido .btn_adicionar_pedido").attr('disabled','disabled');
						}else{
							$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido .btn_adicionar_pedido").removeAttr('disabled');
						}
					},errorCB);
				}
			},errorCB);
			
		},errorCB);
		
	}
	
}

function selectPessoa(idProduto){
	
	console.log('selectPessoas');
	idProdutoAtual = idProduto;
	hide('id-modal-descricao');
	if(flagPizzaMeioaMeio == true){
		hide('id-modal-meio-a-meio');
	}
	db.transaction(function(tx){
	
		tx.executeSql('SELECT * FROM Pessoas where ativo = "true"',[],montaAdicionarPessoa,errorCB);
		
	},errorCB);
	
}

function montaAdicionais(nomeProdutoAtual){
	$("#id_modal_nome_pessoa .select-adicionais option").remove();
    $("#id_modal_nome_pessoa .select-adicionais").append('<option value="null"></option>');
	$('.label-combo-adicionais').text(ObjectLabels.label_adicionais);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM Adicionais where categoria = "'+categoriaSelecionado+'" and language = "'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				
				$('.select-adicionais').show();
                      var flagTemPRoduto = false;
                      
				for(i=0;i<result.rows.length;i++){
					
					if(result.rows.item(i).flag_preco == "true"){
						var precoAdicionais = '------ R$: '+result.rows.item(i).preco+'';
                      $("#id_modal_nome_pessoa .select-adicionais").attr('multiple','multiple');
					}else{
						var precoAdicionais = "";
						flagOpicionalObrigatorio = true;
                      $("#id_modal_nome_pessoa .select-adicionais").removeAttr('multiple');
                      
					}
					if(result.rows.item(i).flag_produto_especifico == "true"){
						var produtosEspecificos = result.rows.item(i).produto_especifico_adiconais;
						var arrayProdutosEspecificos = produtosEspecificos.split(", ");
						
						for(k=0;k<arrayProdutosEspecificos.length;k++){
							
							if(arrayProdutosEspecificos[k] == nomeProdutoAtual){
								$("#id_modal_nome_pessoa .select-adicionais").append('<option value="'+result.rows.item(i).id+'">'+result.rows.item(i).title + precoAdicionais+'</option>');
								$('.label-combo-adicionais').text(result.rows.item(i).label_adicionais);
								flagTemPRoduto = true;
							}
							
						}
						
					}else{
						$("#id_modal_nome_pessoa .select-adicionais").append('<option value="'+result.rows.item(i).id+'">'+result.rows.item(i).title + precoAdicionais+'</option>');
						$('.label-combo-adicionais').text(result.rows.item(i).label_adicionais);
                      flagTemPRoduto = true;
					}
                      
                      
					
				}
                      if(flagTemPRoduto == false){
                        $('.label-combo-adicionais').text("");
                        $('.select-adicionais').hide();
                        flagOpicionalObrigatorio = false;
                      }
				if(editandoPedido){
					tx.executeSql('SELECT * FROM Pedido where id = "'+idPedidoEditando+'"',[],function(tx,result){
						if(result.rows.length > 0){
							var stringIdAdicionais =  result.rows.item(0).id_adicionais;
							var arrayIdAdicionais = stringIdAdicionais.split(",");
							for(l=0;l<arrayIdAdicionais.length;l++){
								$( "#id_modal_nome_pessoa .select-adicionais option" ).each(function() {
								     if($( this ).attr('value') == arrayIdAdicionais[l]){
								    	 $( this ).attr('selected','selected');
								     }
								});
							}
						}
						
					},errorCB);
				}
				
			}else{
				$('.label-combo-adicionais').text("");
				$('.select-adicionais').hide();
			}
		},errorCB);
		
	},errorCB);
}

function montaFormasDePagamento(){
	$("#modal_fechar_conta .select-forma-de-pagamento option").remove();
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM FormasDePagamento where language = "'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				$('.select-forma-de-pagamento').show();
				for(i=0;i<result.rows.length;i++){
					$("#modal_fechar_conta .select-forma-de-pagamento").append('<option value="'+result.rows.item(i).title_comum+'">'+result.rows.item(i).title+'</option>');
				}
				
				
			}else{
				$('.select-forma-de-pagamento').hide();
			}
		},errorCB);
		
	},errorCB);
}

function montaAdicionarPessoa(tx,result){
	
    console.log("numeroPessoasMEsa: " + result.rows.length);
	//Limpa li.
	$("#id_ul_modal_nome_pessoa .liEditavel").remove();
	
    $("#id_ul_modal_nome_pessoa .inputNome").remove();
	
    flagOpicionalObrigatorio = false;
    
	if(!editandoPessoa && !editandoPedido){
		$(".textarea-observacao-produto").val('');
	}
	
	$('#id_modal_nome_pessoa .title_modal_nome_pessoa').text(ObjectLabels.title_pessoas_da_mesa);
	$('#id_modal_nome_pessoa .label-produto').text(ObjectLabels.label_produto);
	$('#id_modal_nome_pessoa .label-observacao-produto').text(ObjectLabels.label_observacao_pedido);
	$('#id_modal_nome_pessoa .btn_adicionar_pedido').text(ObjectLabels.btn_adicionar);
	$('#id_modal_nome_pessoa .btn_cancelar_pedido').text(ObjectLabels.btn_cancelar);
	$('#modal_pedido_confirmacao .mensagem-confirmacao').text(ObjectLabels.alert_excluir_pessoa);
	$('#modal_pedido_confirmacao .btn-sim-excluir-pessoa').text(ObjectLabels.btn_sim);
	$('#modal_pedido_confirmacao .btn-nao-excluir-pessoa').text(ObjectLabels.btn_nao);
	
	$('#id_modal_nome_pessoa .contaConjunto').text(ObjectLabels.label_conta_conjunto);
	
	  
	if(result.rows.length == 0){//Caso não tiver nenhuma pessoa no banco de dadosmonta 2 li com adicionar pessoa
		console.log("entrou no if montaPessoa")
		for(i=1;i<4;i++){
		  $("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
					+ i
					+ '" name="'
					+ i
					+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+ObjectLabels.label_adicionar_pessoa+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
					+ i
					+ '" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
		}
		
	}else if(result.rows.length == 1){// Caso tiver apenas uma pessoa no banco de dados gera mais 2 li de adicionar pessoa
		if(result.rows.item(0).contaConjunto != "true"){
		$("#id_ul_modal_nome_pessoa")
				.append(
						'<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
								+ 1
								+ '" name="'
								+ 1
								+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel naoEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'
								+ result.rows.item(0).nome
								+ '</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
								+ 1
								+ '" title="'
								+ result.rows.item(0).id
								+ '" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
		}
		 if(result.rows.item(0).associado_pedido != "true"){
			 $('#add'+ 1+' .mblListItemRightIcon').after('<button  value="add1" class="btn_editar_pessoa efeito-button"  onclick="editarPessoa(this)">'+ObjectLabels.btn_editar+'</button> <button title="'+result.rows.item(0).id+'" value="add1" class="btn_excluir_pessoa efeito-button" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">'+ObjectLabels.btn_excluir+'</button>')
		 }
		 
		 for(i=2;i<4;i++){
			  $("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
						+ i
						+ '" name="'
						+ i
						+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+ObjectLabels.label_adicionar_pessoa+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
						+ i
						+ '" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
			}
	}else {
		for(i=0;i<result.rows.length;i++){// monta li de pessoas do banco de dados
			var value = i + 1; 
			if(result.rows.item(i).contaConjunto != "true"){
			$("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
						+ value
						+ '" name="'
						+ value
						+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel naoEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+result.rows.item(i).nome+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
						+ value
						+ '" title="'+result.rows.item(i).id+'" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
			
			
			if(result.rows.item(i).associado_pedido != "true"){
				 $('#add'+ value+' .mblListItemRightIcon').after('<button  value="add'+value+'" class="btn_editar_pessoa efeito-button"  onclick="editarPessoa(this)">'+ObjectLabels.btn_editar+'</button> <button title="'+result.rows.item(i).id+'" value="add'+value+'" class="btn_excluir_pessoa efeito-button" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">'+ObjectLabels.btn_excluir+'</button>')
			 }
			}
		}
		
		var valueUltimoLi = result.rows.length +1;
		$("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
				+ valueUltimoLi
				+ '" name="'
				+ valueUltimoLi
				+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+ObjectLabels.label_adicionar_pessoa+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
				+ valueUltimoLi
				+ '" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
		
	}
	$(".naoEditavel").click(function(e){
		if(e.target.tagName == "LI"){
			pessoaSelecionado =   $("#"+ this.id + " .editavel").text();
			$(".pessoa_selecionado").removeClass("pessoa_selecionado");
			$("#"+ this.id).addClass("pessoa_selecionado");
		  }
	  });
	
	$(" .meuCheckBox").hide();
	
	// Editando pedido
	if(editandoPedido){
	$("#id_modal_nome_pessoa .naoEditavel").each(function( index ) {
		pessoaSelecionado = nomePessoaEditando;
		$("#id_modal_nome_pessoa .btn_adicionar_pedido").attr('onclick','salvarEdicaoPedido()');
		$("#id_modal_nome_pessoa .btn_adicionar_pedido").text('OK');
		 if($("#"+this.id+" .editavel").text() == nomePessoaEditando){
			 
			 $(".pessoa_selecionado").removeClass("pessoa_selecionado");
		     $("#"+ this.id).addClass("pessoa_selecionado");
	     }
	 });
	}else{
		$("#id_modal_nome_pessoa .btn_adicionar_pedido").text(ObjectLabels.btn_adicionar);
		$("#id_modal_nome_pessoa .btn_adicionar_pedido").attr('onclick','selectProdutoPedido()');
	}
	
	tx.executeSql('SELECT * FROM Produtos where id='+idProdutoAtual+'',[],function(tx,result){
		var nomeProdutoSelecionado = result.rows.item(0).title;
		var nomeProdutoAtual =  result.rows.item(0).title_comum;
		montaAdicionais(nomeProdutoAtual);
		if(flagPizzaMeioaMeio == true){
			nomeProdutoSelecionado = nomeProdutoSelecionado + " / " + nomeSegundaOpcaoPizza;
		}
		$('#id_modal_nome_pessoa .nome-produto-adicionar-pessoa').text(nomeProdutoSelecionado);
		
	},errorCB);
	
	tx.executeSql('SELECT * FROM Pessoas where contaConjunto="true"',[],function(tx,result){
		if(result.rows.length > 0){
			if(result.rows.item(0).ativo == "false"){
				
		       $('#id_modal_nome_pessoa .div_conjunto').remove();
	        
			}
		}
	},errorCB);
		
	
	show('id_modal_nome_pessoa');

}

//Método que mostra o campo para adiiconar Pessoa;
function mostrarImput(li){
	

    
	 if($("#"+ li.id).hasClass('naoEditavel')){
	 		 $('.btn_adicionar_pedido_modal_pessoa').show()
	        return false;
	 }else{
     $('.btn_adicionar_pedido_modal_pessoa').hide()
     }
	 
	 $("#"+ li.id + ' .editavel').hide();
	 if($("#"+ li.id + ' .editavel').text() != ""+ObjectLabels.label_adicionar_pessoa+""){
	 $("#"+ li.id).next(".inputNome").attr("value",$("#"+ li.id + ' .editavel').text());
	 }
	 $("#"+ li.id).next(".inputNome").show();
	 $("#"+ li.id).next(".inputNome").trigger('click');
	 $("#"+ li.id).next(".inputNome").trigger('focus');
	 
	 $("#"+ li.id).next(".inputNome").blur(function() {
	     $(this).hide();
	     $("#"+ li.id + ' .editavel').show();
	});
	 
	
}

function mostrarImputAdicionarPessoaDistribuirContaConjunto(li){
	
	$("#modal_distribuir_conta_conjunto .inputNomeAdicionarDistribuirContaConjunto").show();
	$("#modal_distribuir_conta_conjunto .inputNomeAdicionarDistribuirContaConjunto").trigger('click');
	$("#modal_distribuir_conta_conjunto .inputNomeAdicionarDistribuirContaConjunto").trigger('focus');
}

function mostrarImputAdicionarPessoaCouvert(li){
	
	$("#modal_adicionar_couver .inputNomeAdicionarCouvert").show();
	$("#modal_adicionar_couver .inputNomeAdicionarCouvert").trigger('click');
	$("#modal_adicionar_couver .inputNomeAdicionarCouvert").trigger('focus');
}

function mostrarImputAdicionarPessoaChopp(li){
	
	 $("#"+ li.id).next(".inputNomeAdicionarChopp").show();
	 $("#"+ li.id).next(".inputNomeAdicionarChopp").trigger('click');
	 $("#"+ li.id).next(".inputNomeAdicionarChopp").trigger('focus');
	 
}

function selecionarPessoa(li){
	
	$("#"+ li.id + " .meuCheckBox").trigger('click');
	pessoaSelecionado =   $("#"+ li.id + " .editavel").text();
	$(".pessoa_selecionado").removeClass("pessoa_selecionado");
	$("#"+ li.id).addClass("pessoa_selecionado");
	
}
function sairObservacaoPedido(){

	if(window.event.keyCode == 13) {
		$('.textarea-observacao-produto').trigger('blur');
	}
	
}

function focusTextArea(){
    alert("alegria")
    $('.textarea-observacao-produto').click();
    $('.textarea-observacao-produto').focus();
}

function salvarPessoa(input){
	if(window.event.keyCode == 13) {
		
		 // Mostra o nome salvo
		 $("#" + input.name + " .editavel").text(input.value);
		 
		 $("#" + input.name + " .editavel").show();
		 
		 if( $("#" + input.name).hasClass('editando')){
			// Update no banco de dados.
			 db.transaction(function(tx) {
				 console.log("idPessoa: "+input.title)
	             tx.executeSql('UPDATE Pessoas SET nome="'+input.value+'" WHERE Id='+input.title+'');
	         },errorCB);
		   
		 }else{
			 // Insert no banco de dados.
			 db.transaction(function(tx) {
	             tx.executeSql('INSERT INTO Pessoas(nome,associado_pedido,ativo,contaConjunto) VALUES ("' + input.value + '","false","true","false")');
	         },errorCB);
			 
			 $('<button  value="'+input.name+'" class="btn_editar_pessoa efeito-button"  onclick="editarPessoa(this)">'+ObjectLabels.btn_editar+'</button> <button title="'+input.title+'" value="'+input.name+'" class=" efeito-button btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">'+ObjectLabels.btn_excluir+'</button>').insertAfter($("#" + input.name + " .mblListItemRightIcon"));
		 }
        $('.btn_adicionar_pedido_modal_pessoa').show();
		  $(input).trigger('blur');
		  $(input).hide();
		  $("#" + input.name).addClass('naoEditavel');
		  editandoPessoa = true;
		  selectPessoa(idProdutoAtual);
		  window.event.preventDefault();
		  return false;
	}
}

function salvarPessoaAdicionarCouvert(input){


		 // Insert no banco de dados.
		 db.transaction(function(tx) {
            tx.executeSql('INSERT INTO Pessoas(nome,associado_pedido,ativo,contaConjunto) VALUES ("' + input.value + '","false","true","false")');
                        montaAdicionarCouvert();
        },errorCB);
		 

}


function salvarPessoaDistribuicaoContaConjunto(input){

	 // Insert no banco de dados.
	 db.transaction(function(tx) {
       tx.executeSql('INSERT INTO Pessoas(nome,associado_pedido,ativo,contaConjunto) VALUES ("' + input.value + '","false","true","false")');
                   montaDistribuirContaConjunto();
   },errorCB);
	 

}


function salvarPessoaAdicionarChopp(input){


	 // Insert no banco de dados.
	 db.transaction(function(tx) {
       tx.executeSql('INSERT INTO Pessoas(nome,associado_pedido,ativo,contaConjunto) VALUES ("' + input.value + '","false","true","false")');
                   montaDistribuicaoChopps();
   },errorCB);
	 

}

function editarPessoa(btn){
	console.log("editando");
   
	$("#"+ btn.value).removeClass('naoEditavel');
	$("#"+ btn.value).addClass('editando');
	$("#" + btn.value).attr('onClick','mostrarImput(this)');
}

function excluirPessoa(div){
	
	$("#modal_pedido_confirmacao").hide();
	 db.transaction(function(tx) {
         tx.executeSql('DELETE from Pessoas WHERE id='+div.title+'');
     },errorCB);
	
	$("#"+ div.title).hide();
	$("#"+ div.name).removeClass('pessoa_selecionado');
	$("#"+ div.name).hide();
	
}

function selectProdutoPedido(){
	 db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Produtos where id='+idProdutoAtual+'',[],adicionarPedido,errorCB);
     },errorCB);
}

function salvarEdicaoPedido(){
   
    var testeProdutoErro = "semnada";
   
	db.transaction(function(tx) {
                   testeProdutoErro = "transaction";
	var observacao =  $(".textarea-observacao-produto").val();
	
	 
	 var adicionaisId =  $("#id_modal_nome_pessoa .select-adicionais").val();
	 
	 var preco_adicionais = "";
	 var nid_adicionais = "";
	 var title_adicionais = "";
	 var title_adicionais_portugues = "";
	 var contador = 0;
                 
	 tx.executeSql('SELECT * FROM Pedido where id = "'+idPedidoEditando+'"',[],function(tx,result){
                    testeProdutoErro = 'SELECT * FROM Pedido where id = '+idPedidoEditando+'';
		 var precoOriginal =  result.rows.item(0).preco_original_produto;
                   
		 var quantidadeProduto = result.rows.item(0).quantidade;
		 var title_comum =  result.rows.item(0).title_comum;
		 nomePrimeiraOpcao = result.rows.item(0).nomePrimeiraOpcaoPizza;
		 nomeSegundaOpcao = result.rows.item(0).nomeSegundaOpcaoPizza;
                   
		 if(flagPizzaMeioaMeio == true){
			 
			 
		 }
		//Prepara Adicionais
		 if(adicionaisId != null && adicionaisId != "null"){
			
				 adicionaisId = adicionaisId.toString();
				 var arrayIdAdicionais = adicionaisId.split(",");
					if(result.rows.length > 0){
						 for(i=0;i<arrayIdAdicionais.length;i++){
							 tx.executeSql('SELECT * FROM Adicionais where id="'+arrayIdAdicionais[i]+'"',[],function(fx,result){
								 if(result.rows.length > 0){
									 if(contador==0){
										 preco_adicionais =   result.rows.item(0).preco;
										 nid_adicionais =   result.rows.item(0).nid;
										 title_adicionais =   result.rows.item(0).title;
										 title_adicionais_portugues = result.rows.item(0).title_comum;
										 contador = contador + 1;
									 }else{
										 preco_adicionais += "," +  result.rows.item(0).preco;
										 nid_adicionais +=   ","  + result.rows.item(0).nid;
										 title_adicionais += "," +  result.rows.item(0).title;
										 title_adicionais_portugues += "," + result.rows.item(0).title_comum;
										 contador = contador + 1;
									 }
								 }
								 if(contador==arrayIdAdicionais.length){
									 
									
									 var precoAdicionaisSomado = 0.00;
									 if(result.rows.item(0).flag_preco == "true"){
										 for(l=0;l<arrayPrecoAdicionais.length;l++){
											 preco_adicionais = preco_adicionais.toString();
											 var arrayPrecoAdicionais = preco_adicionais.split(",");
											 precoAdicionaisSomado = precoAdicionaisSomado + parseFloat(arrayPrecoAdicionais[l]);
										 }
										
									 }else{
										 preco_adicionais = "null";
									 }
									
									 var precoFinal = parseFloat(precoOriginal) + precoAdicionaisSomado;
									 precoFinal = parseFloat(precoFinal) * quantidadeProduto;
									 precoFinal = precoFinal.toFixed(2);
									
									 var contaConjunto = false;
									 if(pessoaSelecionado == ObjectLabels.label_conta_conjunto){
										 contaConjunto = true;
									 }
										 
									 tx.executeSql('UPDATE Pedido SET pessoa="'+pessoaSelecionado+'",contaConjunto="'+contaConjunto+'", observacao="'+observacao+'",title_adicionais="'+title_adicionais+'",preco_adicionais="'+preco_adicionais+'",nid_adicionais="'+nid_adicionais+'",id_adicionais="'+adicionaisId+'",preco_produto="'+precoFinal+'" ,title_adicionais_portugues="'+title_adicionais_portugues+'" WHERE id="'+idPedidoEditando+'"');
								     tx.executeSql('UPDATE Pessoas SET associado_pedido="true" WHERE nome="'+pessoaSelecionado+'"');
								 }
								 
							 },errorCB);
						 }
					}
					
				
			
		 }else{
            
			 var precoFinal = parseFloat(precoOriginal) * quantidadeProduto;
			 precoFinal = precoFinal.toFixed(2);
              
			 var contaConjunto = false;
			 if(pessoaSelecionado == ObjectLabels.label_conta_conjunto){
				 contaConjunto = true;
			 }
                   
			 tx.executeSql('UPDATE Pedido SET pessoa="'+pessoaSelecionado+'",contaConjunto="'+contaConjunto+'", observacao="'+observacao+'",title_adicionais="'+title_adicionais+'",preco_adicionais="'+preco_adicionais+'",nid_adicionais="'+nid_adicionais+'",id_adicionais="'+adicionaisId+'",preco_produto="'+precoFinal+'", title_adicionais_portugues="'+title_adicionais_portugues+'" WHERE id='+idPedidoEditando+'');
                  
                  
		     tx.executeSql('UPDATE Pessoas SET associado_pedido="true" WHERE nome="'+pessoaSelecionado+'"');
                   
                   
                  
		 }
	
	 },errorCB);
                  
    },errorCB,selectPedidos);
}


function selectProdutoMeuPedido(){
	meuPedido = true;
	 db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido order by pessoa',[],montaModalPedido,errorCB);
    },errorCB);
}

function adicionarPedido(tx,result){
	meuPedido = false;
    var observacao =  $(".textarea-observacao-produto").val();
    var observacao_opcao_pizza = "";
    var observacao_opcaoPizza_portugues = "";
    var adicionaisId =  $("#id_modal_nome_pessoa .select-adicionais").val();
    var naoSelecionouOpcional = false;
    var contaConjunto = false;
    
    if(pessoaSelecionado == ObjectLabels.label_conta_conjunto){
    	contaConjunto = true;
    }
    
	if(result.rows.length > 0){
		
	  if($(".pessoa_selecionado").size() > 0 ){
		  
		  if(flagOpicionalObrigatorio == true){
			  if(adicionaisId == null || adicionaisId == "null"){
				  naoSelecionouOpcional = true;
			  }
		  }
          
		 if(naoSelecionouOpcional == false){
			 db.transaction(function(tx) {
			 
				 var title = result.rows.item(0).title;
				 var title_opcaoPizza_portugues = result.rows.item(0).title_comum;
				 var nomeSegundaPizzaDelimitado ="";
				 nomeSegundaOpcaoPizza_portuguesDelimitado = "";
				 var nomePrimeiraOpcaoPizza =title;
				 
				 
				 if(flagPizzaMeioaMeio == true){
					 
					 observacao_opcao_pizza = "</br>Pizza Metade 1: " + title + "" +
					 		"</br>Pizza Metade 2: " +nomeSegundaOpcaoPizza;
					 
					 title = delimitadorFrase(title, 11);
					 title = title
					 nomeSegundaPizzaDelimitado = nomeSegundaOpcaoPizza;
					 nomeSegundaPizzaDelimitado = delimitadorFrase(nomeSegundaPizzaDelimitado, 11);
					 title = title + " / " + nomeSegundaPizzaDelimitado;
					 
					 //Prepara obeservacao e tiltle portugues.
					 observacao_opcaoPizza_portugues = "</br>Pizza Metade 1: " + title_opcaoPizza_portugues	 + "" +
				 		"</br>Pizza Metade 2: " +nomeSegundaOpcaoPizza_portugues;
					 
					 title_opcaoPizza_portugues = delimitadorFrase(title_opcaoPizza_portugues, 11);
					
					 nomeSegundaOpcaoPizza_portuguesDelimitado = nomeSegundaOpcaoPizza_portugues;
					 nomeSegundaOpcaoPizza_portuguesDelimitado = delimitadorFrase(nomeSegundaOpcaoPizza_portuguesDelimitado, 11);
					 title_opcaoPizza_portugues = title_opcaoPizza_portugues + " / " + nomeSegundaOpcaoPizza_portuguesDelimitado;
				 }
				 
				 var id = result.rows.item(0).id;
				 var preco = result.rows.item(0).preco;
				 var preco_original = result.rows.item(0).preco;
				 var title_comum = result.rows.item(0).title_comum;
				 var categoria = result.rows.item(0).categoria;
				 var nid_produto = result.rows.item(0).nid;
				 var preco_adicionais = "";
				 var nid_adicionais = "";
				 var title_adicionais = "";
				 var title_adicionais_portugues = "";
				 var contador = 0;
				 
				 //Prepara Adicionais
                   
				 if(adicionaisId != null && adicionaisId != "null"){
					 adicionaisId = adicionaisId.toString();
					 var arrayIdAdicionais = adicionaisId.split(",");
					
					 
					 for(i=0;i<arrayIdAdicionais.length;i++){
						 tx.executeSql('SELECT * FROM Adicionais where id="'+arrayIdAdicionais[i]+'"',[],function(fx,result){
							 if(result.rows.length > 0){
								 if(contador==0){
									 preco_adicionais =   result.rows.item(0).preco;
									 nid_adicionais =   result.rows.item(0).nid;
									 title_adicionais =   result.rows.item(0).title;
									 title_adicionais_portugues = result.rows.item(0).title_comum;
									 contador = contador + 1;
								 }else{
									 preco_adicionais += "," +  result.rows.item(0).preco;
									 nid_adicionais +=   ","  + result.rows.item(0).nid;
									 title_adicionais += "," +  result.rows.item(0).title;
									 title_adicionais_portugues += "," + result.rows.item(0).title_comum;
									 contador = contador + 1;
								 }
							 }
							 if(contador==arrayIdAdicionais.length){
								 
								
								 var precoAdicionaisSomado = 0.00;
								 if(result.rows.item(0).flag_preco == "true"){
									 preco_adicionais = preco_adicionais.toString();
									 var arrayPrecoAdicionais = preco_adicionais.split(",");
									 for(l=0;l<arrayPrecoAdicionais.length;l++){
										 precoAdicionaisSomado = precoAdicionaisSomado + parseFloat(arrayPrecoAdicionais[l]);
									 }
									
								 }else{
									 preco_adicionais = "null";
								 }
								 preco = parseFloat(preco)+precoAdicionaisSomado;
								 preco = preco.toFixed(2);
								 
								 if(constLanguageSelected != "Portuguese-Brazil"){
									 tx.executeSql('SELECT * FROM Produtos where title_comum="'+result.rows.item(0).title_comum+'" and language="Portuguese-Brazil"',[],function(fx,result){
										 if(result.rows.length > 0){
											 
											 tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+pessoaSelecionado+'","'+contaConjunto+'","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","confirmacao","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","'+nomeSegundaOpcaoPizza+'","'+observacao_opcaoPizza_portugues+'","'+title_opcaoPizza_portugues+'","'+observacao_opcao_pizza+'","'+title_adicionais_portugues+'","'+displayCozinhaSelecionado+'","'+returnDataAtual()+'")');
										 }
										 
									 },errorCB);
								 }else{
									 var data_pedido = new  Date();
									 		 tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+pessoaSelecionado+'","'+contaConjunto+'","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","confirmacao","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","'+nomeSegundaOpcaoPizza+'","'+observacao_opcaoPizza_portugues+'","'+title_opcaoPizza_portugues+'","'+observacao_opcao_pizza+'","'+title_adicionais_portugues+'","'+displayCozinhaSelecionado+'","'+returnDataAtual()+'")');
	
								 }
								 
							     tx.executeSql('UPDATE Pessoas SET associado_pedido="true" WHERE nome="'+pessoaSelecionado+'"');
							 }
							 
						 },errorCB);
					 }
				 }else{
					 if(constLanguageSelected != "Portuguese-Brazil"){
						 tx.executeSql('SELECT * FROM Produtos where title_comum="'+result.rows.item(0).title_comum+'" and language="Portuguese-Brazil"',[],function(fx,result){
							 if(result.rows.length > 0){
								
								 tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+pessoaSelecionado+'","'+contaConjunto+'","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","confirmacao","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","'+nomeSegundaOpcaoPizza+'","'+observacao_opcaoPizza_portugues+'","'+title_opcaoPizza_portugues+'","'+observacao_opcao_pizza+'","'+title_adicionais_portugues+'","'+displayCozinhaSelecionado+'","'+returnDataAtual()+'")');
							 }
							 
						 },errorCB);
					 }else{
						 		 tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+pessoaSelecionado+'","'+contaConjunto+'","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","confirmacao","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","'+nomeSegundaOpcaoPizza+'","'+observacao_opcaoPizza_portugues+'","'+title_opcaoPizza_portugues+'","'+observacao_opcao_pizza+'","'+title_adicionais_portugues+'","'+displayCozinhaSelecionado+'","'+returnDataAtual()+'")');

					 }
					 
				     tx.executeSql('UPDATE Pessoas SET associado_pedido="true" WHERE nome="'+pessoaSelecionado+'"');
				 }
				 
		   
			 },errorCB,selectPedidos);
		 }else{
			 $('#modal_favor_selecionar_opcao .div-mensagem span').text(ObjectLabels.alert_favor_selecionar_opcao);
			 show("modal_favor_selecionar_opcao");
 
		 } 
		 
	 }else{
		 $('#modal_favor_selecionar_pessoa .div-mensagem span').text(ObjectLabels.alert_favor_selecionar_pessoa);
		 show("modal_favor_selecionar_pessoa");
     }
	}
	
	tx.executeSql('SELECT * FROM Pessoas',[],function(fx,result){
		for(i=0;i<result.rows.length;i++){
		 }
		 
	 },errorCB);
	
}

function returnDataAtual(){
	return  new Date();
}


function selectPedidos(){
   
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where status = "confirmacao"',[],montaModalPedido,errorCB);
    },errorCB);
}

function preparaModalCancelamentoPedido(btn){
	
	var name = $('#'+btn.id).attr('name');
	var value = $('#'+btn.id).attr('value');
	
	$('#modal_cancelamento_pedido .btn_ok_cancelamento_pedido').attr('name',name);
	$('#modal_cancelamento_pedido .btn_ok_cancelamento_pedido').attr('value',value);
	
	$('#modal_cancelamento_pedido .textarea-motivo-cancelamento-pedido').val('');
	$('#modal_cancelamento_pedido .inputSenha-cancelamento-pedido').val('');
	show('modal_cancelamento_pedido');
}
function montaModalPedido(tx,result){
	
	$("#id-ul-modal-pedidos .mostrarDetalhado").remove();
	$("#id-ul-modal-pedidos .pedido_detalhado").remove();
	
    $(".menu_pedido_confirmacao .mblScrollableViewContainer").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
    $(".menu_pedido_confirmacao .mblScrollBarWrapper div").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
	$("#id-ul-modal-pedidos .li_detalhe_pedido").remove();
	$("#id-ul-modal-pedidos .div-detalhe-pedido").remove();
	$('#id-efetuar-pedido').removeAttr("disabled");
	$('#modal_pedido .title_modal_nome_pessoa').text(ObjectLabels.title_pedidos_da_mesa);
	if(meuPedido == true){
		$('#modal_pedido .btn_adicionar_mais_itens').text(ObjectLabels.btn_cancelar);
		$('#modal_pedido .btn_adicionar_mais_itens').removeClass('cor-verde');
		
	}else{
		$('#modal_pedido .btn_adicionar_mais_itens').text(ObjectLabels.btn_adicionar_mais_itens);
		$('#modal_pedido .btn_adicionar_mais_itens').addClass('cor-verde');
	}
	
	$('#modal_pedido .btn_adicionar_pedido').text(ObjectLabels.btn_efetuar_pedido);
	
	
	var pedidosPendentes = false;
	if(meuPedido == true && result.rows.length == 0){
		show('modal_sem_pedido');
	}else{
		var ultimaPessoa = "";
	for(var i=0;i<result.rows.length;i++){
		var stringAdicionaisComPreco="";
		var adicionais = result.rows.item(i).title_adicionais;
		var observacao = "";
		
		if(result.rows.item(i).flagPizzaMeioaMeio == "true"){
			observacao = result.rows.item(i).observacao + "</br>"+ result.rows.item(i).observacao_opcao_pizza;
		}else{
			observacao = result.rows.item(i).observacao;
		}
		
		if(adicionais == "null" || adicionais == null || adicionais ==""){
			adicionais = "";
		}else{
			
			adicionais = adicionais.toString();
			var arrayAdicionais = adicionais.split(",");
			
			if(result.rows.item(i).preco_adicionais != "null"){
				var precos = result.rows.item(i).preco_adicionais;
				precos = precos.toString();
				var arrayPrecos = precos.split(",");
				for(l=0;l<arrayAdicionais.length;l++){
					stringAdicionaisComPreco += arrayAdicionais[l] +"---- R$ " + arrayPrecos[l] + ",";
				}
			}else{
				for(l=0;l<arrayAdicionais.length;l++){
					stringAdicionaisComPreco += arrayAdicionais[l]  + ",";
				}
			}
			
		}
		if(result.rows.item(i).status == 'confirmacao'){
			pedidosPendentes = true;
			
			$("#id-ul-modal-pedidos").append('<li id="id-pedido-da-mesa'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div id="id-modal-pedido-preco-produto-'+result.rows.item(i).id+'" class="modal_pedido_preco_produto" value="'+result.rows.item(i).preco_original_produto+'" name="'+result.rows.item(i).preco_adicionais+'"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><div id="quantidade-'+i+'" class="div-quantidade-somar-diminuir"><button class="btn-decremento efeito-button" name="'+result.rows.item(i).id+'">-</button><span class="modal_pedido_quantidade">'+result.rows.item(i).quantidade+'</span><button name="'+result.rows.item(i).id+'" class="btn-incremento">+</button><button name="'+result.rows.item(i).id+'" class="btn-excluir-pedido" >X</button><button value="'+result.rows.item(i).id+'" onclick="editarPedido(this)" class="btn-editar-pedido" >'+ObjectLabels.btn_editar+'</button></div><div class="mblListItemLabel " style="display: inline;"></div></li><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><button id="id-btn-cancelar-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="preparaModalCancelamentoPedido(this)" class="btn-cancelar-pedido efeito-button-efetuar-pedido">Cancelar Pedido</button><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_observacao+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+observacao+'</p></div><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_adicionais+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+stringAdicionaisComPreco+'</p></div></div>');
		}else{
			if(result.rows.item(i).status == 'cancelado'){
				$("#id-ul-modal-pedidos").append('<li id="id-pedido-da-mesa'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div id="id-modal-pedido-preco-produto-'+result.rows.item(i).id+'" class="modal_pedido_preco_produto" value="'+result.rows.item(i).preco_original_produto+'" name="'+result.rows.item(i).preco_adicionais+'"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><span class="modal_pedido_quantidade_pedido_efetuado">Qtde: '+result.rows.item(i).quantidade+'</span><span class="pedidoEfetuado pedidoCancelado">Pedido Cancelado</span></li></div><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_observacao+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+observacao+'</p></div><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_adicionais+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+stringAdicionaisComPreco+'</p></div></div>');

			}else{
				
				///////////////////////////////////////////////////
				var data = new Date(result.rows.item(i).data_pedido);
                var dataString = data.getHours() + ":"+data.getMinutes();
                var classeCancelarPedido = "";
                if(result.rows.item(i).nid == "null" || result.rows.item(i).nid == null || result.rows.item(i).nid == ""){
                	classeCancelarPedido = "esconderCancelarPedido";
                }
				
				var ultimoI;
					if(i==0 || ultimaPessoa != result.rows.item(i).pessoa)	{
				    ultimoI = i;
					
				    $("#id-ul-modal-pedidos")
					    .append(
									'<li id="pedido-meu-pedido-'
											+ i
											+ '" dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem liEditavel mostrarDetalhado" value="pedido_detalhado-'
											+ i
											+ '" > <div class="modal_pedido_nome_pessoa"> <div class="div-incremento"> <span class="incremento mais">+</span> </div> <span class="span-nome-pessoa-fechamento-conta">'+result.rows.item(i).pessoa+'</span> </div> <div id="div-modal_previa_preco_produto'+i+'" class="modal_previa_preco_produto"> <span class="preco-fechamento-conta"></span>  </div> 	</li>  <div id="pedido_detalhado-meu-pedido-'
											+ i
											+ '" style="display: none" class="pedido_detalhado"> <ul dojoType="dojox.mobile.EdgeToEdgeList" class="mblEdgeToEdgeList minhaUL-modal-nome-pessoa" ><li id="id-pedido-da-mesa-meu-pedido'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem minhaLI li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div id="id-modal-pedido-preco-produto'+result.rows.item(i).id+'" class="modal_pedido_preco_produto" value="'+result.rows.item(i).preco_original_produto+'" name="'+result.rows.item(i).preco_adicionais+'"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><span class="modal_pedido_quantidade_pedido_efetuado">Qtde: '+result.rows.item(i).quantidade+'</span><span class="pedidoEfetuado">'+dataString+'</span></li><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><button id="id-btn-cancelar-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="preparaModalCancelamentoPedido(this)" class="btn-cancelar-pedido efeito-button-efetuar-pedido '+classeCancelarPedido+'">Cancelar Pedido</button><button id="id-btn-repetir-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="repetirPedido(this)" class="btn-repetir-pedido efeito-button-efetuar-pedido">Repetir Pedido</button><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_observacao+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+observacao+'</p></div><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_adicionais+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+stringAdicionaisComPreco+'</p></div></div> </ul> </div>');
				    }else{
				    	
				    	
						//$("#id-ul-modal-pedidos").append('<li id="id-pedido-da-mesa'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div id="id-modal-pedido-preco-produto-'+result.rows.item(i).id+'" class="modal_pedido_preco_produto" value="'+result.rows.item(i).preco_original_produto+'" name="'+result.rows.item(i).preco_adicionais+'"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><span class="modal_pedido_quantidade_pedido_efetuado">Qtde: '+result.rows.item(i).quantidade+'</span><span class="pedidoEfetuado">'+dataString+'</span></li></div><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><button id="id-btn-cancelar-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="preparaModalCancelamentoPedido(this)" class="btn-cancelar-pedido efeito-button-efetuar-pedido '+classeCancelarPedido+'">Cancelar Pedido</button><button id="id-btn-repetir-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="repetirPedido(this)" class="btn-repetir-pedido efeito-button-efetuar-pedido">Repetir Pedido</button><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_observacao+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+observacao+'</p></div><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_adicionais+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+stringAdicionaisComPreco+'</p></div></div>');

				    	
				    	
				    	
				    	$("#pedido_detalhado-meu-pedido-"+ultimoI+" .minhaUL-modal-nome-pessoa")
					    .append('<li id="id-pedido-da-mesa-meu-pedido'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem minhaLI li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div id="id-modal-pedido-preco-produto-'+result.rows.item(i).id+'" class="modal_pedido_preco_produto" value="'+result.rows.item(i).preco_original_produto+'" name="'+result.rows.item(i).preco_adicionais+'"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><span class="modal_pedido_quantidade_pedido_efetuado">Qtde: '+result.rows.item(i).quantidade+'</span><span class="pedidoEfetuado">'+dataString+'</span></li></div><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><button id="id-btn-cancelar-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="preparaModalCancelamentoPedido(this)" class="btn-cancelar-pedido efeito-button-efetuar-pedido '+classeCancelarPedido+'">Cancelar Pedido</button><button id="id-btn-repetir-pedido-'+i+'" name="'+result.rows.item(i).id+'" value="'+result.rows.item(i).nid+'" onclick="repetirPedido(this)" class="btn-repetir-pedido efeito-button-efetuar-pedido">Repetir Pedido</button><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_observacao+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+observacao+'</p></div><p align="Left" class="div-detalhe-pedido-p">'+ObjectLabels.label_adicionais+'</p><div class="detalhe-pedido-observacao"><p align="Left">'+stringAdicionaisComPreco+'</p></div></div>');
				    }
					
					
					ultimaPessoa = result.rows.item(i).pessoa;
				
			///////////////////////////////////////////////////////////////////////////////	
				
				
			}
		}
	}
	
	$(".mostrarDetalhado").click(function(e){
		var divDetalhado = $(this).next('.pedido_detalhado').attr('id');
	
		 mostrarPedidoDetalhado(divDetalhado);
	  });
	
	if(!pedidosPendentes){
		$('#id-efetuar-pedido').attr("disabled", "disabled");
	}
	$(".btn-decremento").click(function(e){
		 if(parseInt($(this).next('span').text()) > 1){
		 var quantidade =  parseInt($(this).next('span').text()) - 1;
		 $(this).next('span').text(quantidade);
		 
		
		 
		 var idProduto = $(this).attr('name');
		 
		 // Atualiza preço do produto conforme sua quantidade
		 var precoOriginal = parseFloat($('#id-modal-pedido-preco-produto-'+idProduto+'').attr('value'));
		 
		 var precosAdicionais = parseFloat($('#id-modal-pedido-preco-produto-'+idProduto+'').attr('name'));
		 if($('#id-modal-pedido-preco-produto-'+idProduto+'').attr('name') != "" && $('#id-modal-pedido-preco-produto-'+idProduto+'').attr('name') != "null"){
		 precosAdicionais = precosAdicionais.toString();
		 var arrayPrecosAdicionais = precosAdicionais.split(',');
		 var precoFinalAdicionais = 0.00;
		 for(i=0;i<arrayPrecosAdicionais.length;i++){
			 precoFinalAdicionais = parseFloat(precoFinalAdicionais) + parseFloat(arrayPrecosAdicionais[i]);
		 }
		 }else{
			 var precoFinalAdicionais = 0.00;
		 }
		 precoOriginal = precoOriginal+precoFinalAdicionais;
		 
		 var precoAtualizado = precoOriginal * quantidade;
		 precoAtualizado = precoAtualizado.toFixed(2);
		 $('#id-modal-pedido-preco-produto-'+idProduto+' span').text("R$ "+precoAtualizado);
		 
		 db.transaction(function(tx) {
             tx.executeSql('UPDATE Pedido SET quantidade="'+quantidade+'", preco_produto="'+precoAtualizado+'" WHERE Id='+idProduto+'');
         },errorCB);
		 }
	  });
	
	$(".btn-incremento").click(function(e){
		var idDivPai = $(this).parent().attr('id');
		var valorSpan = $('#'+idDivPai + ' .modal_pedido_quantidade').text();
		var quantidade =  parseInt(valorSpan) + 1;
		 $('#'+idDivPai + ' .modal_pedido_quantidade').text(quantidade);
		 var idProduto = $(this).attr('name');
		 
		// Atualiza preço do produto conforme sua quantidade
		 var precoOriginal = parseFloat($('#id-modal-pedido-preco-produto-'+idProduto+'').attr('value'));
		 var precosAdicionais = parseFloat($('#id-modal-pedido-preco-produto-'+idProduto+''	).attr('name'));
		 if($('#id-modal-pedido-preco-produto-'+idProduto+'').attr('name') != "" && $('#id-modal-pedido-preco-produto-'+idProduto+'').attr('name') != "null"){
		 precosAdicionais = precosAdicionais.toString();
		 var arrayPrecosAdicionais = precosAdicionais.split(',');
		 var precoFinalAdicionais = 0.00;
		 for(i=0;i<arrayPrecosAdicionais.length;i++){
			 precoFinalAdicionais = parseFloat(precoFinalAdicionais) + parseFloat(arrayPrecosAdicionais[i]);
		 }
		 }else{
			 var precoFinalAdicionais = 0.00;
		 }
		 precoOriginal = precoOriginal+precoFinalAdicionais;
		 
		 var precoAtualizado = precoOriginal * quantidade;
		 precoAtualizado = precoAtualizado.toFixed(2);
		 $('#id-modal-pedido-preco-produto-'+idProduto+' span').text("R$ "+precoAtualizado);
		 
		 db.transaction(function(tx) {
             tx.executeSql('UPDATE Pedido SET quantidade="'+quantidade+'", preco_produto="'+precoAtualizado+'" WHERE Id='+idProduto+'');
         },errorCB);
	  });
	
	$(".btn-excluir-pedido").click(function(e){
		 idPedidoExcluir = $(this).attr('name');
		 showExcluirPedido();
	  });
	
	$(".li_detalhe_pedido").click(function(e){
		if(!(e.target.tagName == "BUTTON")){
			if($("#"+this.id+" .incremento").hasClass('mais')){
				$("#"+this.id+" .incremento").css('left','11.5');
				$("#"+this.id+" .incremento").css('top','-6');
				$("#"+this.id+" .incremento").text('-');
				$("#"+this.id+" .incremento").removeClass('mais');
			}else {
				$("#"+this.id+" .incremento").css('left','9.43')
				$("#"+this.id+" .incremento").css('top','-5');
				$("#"+this.id+" .incremento").text('+');
				$("#"+this.id+" .incremento").addClass('mais');
			}
			$("#"+$(this).attr('value')).toggle(); 
		}
		
	 });
	
	hide('id_modal_nome_pessoa');
	show('modal_pedido');
	}
}


function montaModalRepetirProduto(btn){
    
    $('#modal_repetir_pedido .btn-sim-repetir-pessoa').attr('value',btn.name);
    $("#modal_repetir_pedido .select-pessoa-repetir-pedido option").remove();
	db.transaction(function(tx){
                   tx.executeSql('SELECT * FROM Pessoas',[],function(tx,result){
                                 if(result.rows.length > 0){
                                 $('.select-pessoa-repetir-pedido').show();
                                 $("#modal_repetir_pedido .select-pessoa-repetir-pedido").append('<option value="0">Escolha...</option>');
                                 
                                 for(i=0;i<result.rows.length;i++){
                                 $("#modal_repetir_pedido .select-pessoa-repetir-pedido").append('<option value="'+result.rows.item(i).nome+'">'+result.rows.item(i).nome+'</option>');
                                 }
                                 
                                 
                                 }else{
                                 $('.select-pessoa-repetir-pedido').hide();
                                 }
                                 },errorCB);
                   
                   },errorCB);
    $("#modal_repetir_pedido .select-pessoa-repetir-pedido").click();
    $("#modal_repetir_pedido .select-pessoa-repetir-pedido").focus();
    show("modal_repetir_pedido");

}

function repetirPedido(btn){

    flagRepetirPedido = true;
    flagCouvert = false;
    
        db.transaction(function(tx) {
                      
                       tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha) select mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,"confirmacao",nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha from Pedido where id = '+btn.name+'');
                       
                       
                       tx.executeSql('SELECT mesa,pessoa,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,id, MAX(id) FROM Pedido',[],postPedidoDrupal,errorCB);
                       },errorCB);
    	
    
}


function editarPedido(li){
   
	db.transaction(function(tx) {
                
		 tx.executeSql('SELECT * FROM Pedido where id = '+li.value+'',[],function(tx,result){
			 hide('modal_pedido');
                   
			 idPedidoEditando = result.rows.item(0).id;
			 $(".textarea-observacao-produto").val(result.rows.item(0).observacao);
                    
			 console.log('editando');
			 editandoPedido = true;
                      
			 categoriaSelecionado = result.rows.item(0).categoria_produto;
			 nomePessoaEditando =  result.rows.item(0).pessoa;
                      
			 selectPessoa(result.rows.item(0).id_produto);
			 
		 },errorCB);
   },errorCB);
}
	
function excluirPedido(){
	 db.transaction(function(tx) {
		 tx.executeSql('DELETE from Pedido WHERE id='+idPedidoExcluir+'');
     },errorCB);
	 
	 selectPedidos();
	 hide('modal_excluir_pedido');
}


function efetuarPedido(){
    flagRepetirPedido = false;
    flagChopp = false;
    flagCouvert = false;
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where status = "confirmacao"',[],postPedidoDrupal,errorCB);
    },errorCB);
}

function postPedidoDrupal(tx, result) {
	var arrayIdPedidosAEfetuar = new Array();
	var contadorPedidoPost = 0;
	db
			.transaction(
					function(tx) {
						for ( var i = 0; i < result.rows.length; i++) {

							console.log(result.rows.item(i));
							var observacao = result.rows.item(i).observacao;
							var title = "";
							
							if(result.rows.item(i).flagPizzaMeioaMeio == "true"){
								observacao = observacao +"</br>"+ result.rows.item(i).observacao_opcaoPizza_portugues;
								title = result.rows.item(i).title_opcaoPizza_portugues;
							}else{
								observacao = result.rows.item(i).observacao;
								title = result.rows.item(i).nome_produto_portugues;
							}
							 
							if(result.rows.item(i).title_adicionais_portugues != ""){
								observacao = observacao +"</br>"+ "Adicionais: " + result.rows.item(i).title_adicionais_portugues;
							}
							
							var observacaoReplacePulaLinha = observacao.replace("</br>", " tag-pular ");

							var mesa = {
								"value" : result.rows.item(i).mesa,
							}

							var idContaDrupal = {
								"value" : idConta,
							}

							var pessoa = {
								"value" : "" + result.rows.item(i).pessoa + "",
							}

							var observacao = {
								"value" : "" + observacaoReplacePulaLinha
										+ "",
							}

							var nome_produto = {
								"value" : "" + result.rows.item(i).nome_produto_portugues
										+ "",
							}

							var preco_produto = {
								"value" : "" + result.rows.item(i).preco_produto + "",
							}

							var quantidade_produto = {
								"value" : result.rows.item(i).quantidade,
							}

							var status = {
								"value" : "" + result.rows.item(i).status + "",
							}
							
							var categoria_produto = {
									"value" : "" + result.rows.item(i).categoria_produto + "",
							}
							
							var nid_produto = {
									"value" : "" + result.rows.item(i).nid_produto + "",
							}
							
							var id_pedido = {
									"value" : "" + result.rows.item(i).id + "",
							}
							
							var adicionais_pedido = {
									"value" : "" + result.rows.item(i).title_adicionais_portugues + "",
							}
							
							var display_cozinha = {
									"value" : "" + result.rows.item(i).display_cozinha + "",
							}

							var data = {
								"type" : "pedido",
								"field_mesa[und][0]" : mesa,
								"field_pessoa[und][0]" : pessoa,
								"field_observacao[und][0]" : observacao,
								"field_nome_produto[und][0]" : nome_produto,
								"field_preco_produto[und][0]" : preco_produto,
								"field_quantidade[und][0]" : quantidade_produto,
								"field_status[und][0]" : status,
								"field_id_conta[und][0]" : idContaDrupal,
								"field_categoria_produto_pedido[und][0]" : categoria_produto,
								"field_nid_produto[und][0]" : nid_produto,
								"field_id_pedido[und][0]" : id_pedido,
								"field_adicionais_pedido[und][0]" : adicionais_pedido,
								"field_display_cozinha_pedido[und][0]" : display_cozinha,
								"title" : title,
							};
							
							console.log(data)
							//arrayIdPedidosAEfetuar.push(result.rows.item(i).id);
							var url = "" + ipServidorDrupal + "/node";
							// var ajaxPostDrupal = postAjax(url,data);
                        if(connectionWIFI == "connectionTrue"){
                        
							var ajaxPostNid = postAjaxSincrona (url, data);
							ajaxPostNid.success(function (data) {
								
								var positionchaveInicial = data.search('{');
								var positionchaveFinal = data.search('}');
								var dataConvertida = data.substring(positionchaveInicial, positionchaveFinal+1);
								var dataConvertida2 = $.parseJSON(dataConvertida)
								var nidRetorno = dataConvertida2.nid;
								
								var urlNode = "" + ipServidorDrupal + "/node/"+nidRetorno;
								
                                
								var ajaxPedidos = getAjax(urlNode);
								
								ajaxPedidos.success(function (data) {
										db
										.transaction(
												function(tx) {
											tx
											.executeSql('UPDATE Pedido SET  nid="'+data.nid+'",data_pedido="'+returnDataAtual()+'"  WHERE id="'
													+ data.field_id_pedido.und[0].value+ '"');
											
										}, errorCB);
										  
									
							    });
								
								ajaxPedidos.error(function (jqXHR, textStatus, errorThrown) {
									
									alert('error getajax pedido');
								});
						    	
						    });
                          }
 						
							/**
							var url2 = "" + ipServidorDrupal + "/node/2550";
							
							var quantidade_produto2 = {
									"value" : "5",
							}

							
							var data2 = {
									"type" : "pedido",
									"field_quantidade[und][0]" : quantidade_produto2,
								};
							
							var putMeuAjax = putAjax(url2,data2);
                            */
							// putAjax(url,data);
                         
							tx
							.executeSql('UPDATE Pedido SET status="aguardando-pedido" WHERE id="'
									+ result.rows.item(i).id+ '"');
							

						}
						
                         if(flagRepetirPedido == false){
	                         hide('modal_pedido');
	                         hide('modal_efetuar_pedido');
	                         if(flagChopp == false){
	                        	 if(flagCouvert == false){
		                         hide("modal_repetir_pedido");
		                         $('#modal_pedido_confirmacao_mensagem .div-mensagem span')
		                         .text(ObjectLabels.alert_pedido_atendido);
		                         $('#modal_pedido_confirmacao_mensagem .btn_ok_mensagem')
		                         .text(ObjectLabels.OK);
		                         show('modal_pedido_confirmacao_mensagem');
	                        	 }else{
	                        		 
	                        		 hide('modal_adicionar_couver');
	                        		 montaPreviaPedido();
	                        	 }
	                         }
                         }else{
                        	
	                         selectProdutoMeuPedido();
	                        	
	                         hide("modal_repetir_pedido");
	                         $('#modal_pedido_confirmacao_mensagem .div-mensagem span')
	                         .text(ObjectLabels.alert_pedido_atendido);
	                         $('#modal_pedido_confirmacao_mensagem .btn_ok_mensagem')
	                         .text(ObjectLabels.OK);
	                         show('modal_pedido_confirmacao_mensagem');
                         }
                         
						
					}, errorCB);
	
}

function montaPreviaPedido(){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where status="aguardando-pedido" or status="aguardando-pagamento" or status="pagamento-feito" order by pessoa',[],montaModalPreviaPedido,errorCB);
    },errorCB);
}

function montaDistribuicaoChopps(){
	arrayIdPedidoChopps = new Array();
	db.transaction(function(tx) {
                   
                   tx.executeSql('SELECT * FROM Chopp',[],function(tx,result){
                                 
                                 if(result.rows.length > 0){
                                 var codigo_produto_chopp = result.rows.item(0).codigo_produto_chopp;
                                 
                                 tx.executeSql('SELECT * FROM Produtos where codigo = "'+codigo_produto_chopp+'" and language = "'+constLanguageSelected+'"',[],function(tx,result){
                                               if(result.rows.length > 0){
                                               tx.executeSql('SELECT * FROM Pedido where id_produto = "'+result.rows.item(0).id+'" and status="aguardando-pedido" ',[],function(tx,result){
                                                             $('#modal_distribuicao_chopps .total_chopps_distribuicao').text(result.rows.length);
                                                             if(result.rows.length > 0){
                                                             
                                                             for(var l=0;l<result.rows.length;l++){
                                                             arrayIdPedidoChopps.push(result.rows.item(l).id);
                                                             }
                                                             tx.executeSql('SELECT * FROM Pessoas',[],montaModalDistribuicaoChopps,errorCB);
                                                             }else{
                                                             
                                                             alert("Nao tem chopps adicionados")
                                                             }
                                                             },errorCB);
                                               }
                                               },errorCB);
                                 }
                                 },errorCB);
                   
		 
    },errorCB);
}

function montaAdicionarCouvert(codigoCouver){
	db.transaction(function(tx) {
       tipoCouver = codigoCouver;                   
                                                             
            tx.executeSql('SELECT * FROM Pessoas',[],montaModalAdicionarCouver,errorCB);
            
		 
    },errorCB);
}

function montaDistribuirContaConjunto(){
	
	db.transaction(function(tx) {
                                                             
            tx.executeSql('SELECT * FROM Pessoas where contaConjunto == "false"',[],montaModalDistribuirContaConjunto,errorCB);
            
    },errorCB);
	
}


function montaModalAdicionarCouver(tx,result){
	
	$("#id-ul-adicionar-pessoa-couvert li").remove();
    $(".inputNomeAdicionarCouvert").remove();
    
	hide('modal_informacoes_extras');
	show('modal_adicionar_couver');
	
	tx.executeSql('SELECT * FROM Produtos where codigo = "'+tipoCouver+'"',[],function(tx,result){
        if(result.rows.length>0){
        	$('#modal_adicionar_couver .input_valor_couvert').text(result.rows.item(0).preco);
        }
    },errorCB);
	
    $("#id-ul-adicionar-couver li").remove();
	for(var i=0;i<result.rows.length;i++){
		
		var quantidadeCouvert = 0;
		if(result.rows.item(i).quantidade_couvert != null){
			quantidadeCouvert = result.rows.item(i).quantidade_couvert;
		}else{
			
			tx.executeSql('UPDATE Pessoas SET quantidade_couvert="0" WHERE nome="'+result.rows.item(i).nome+'"');
		}
		$("#id-ul-adicionar-couver")
		    .append(
						'<li id="pessoa-adicionar-couvert-conta-'
								+ i
								+ '" dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem liEditavel mostrarDetalhado" value="pedido_detalhado-'
								+ i
								+ '" > <div class="modal_adicionar_couvert_nome_pessoa"> <span class="span-nome-pessoa-fechamento-conta">'+result.rows.item(i).nome+'</span> </div><input  type="number" value="'+quantidadeCouvert+'" name="'+result.rows.item(i).nome+'" class="input-adionar-couvert"></input> </li>');
     }
	
	 $("#id-ul-adicionar-pessoa-couvert").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
				+ i
				+ '" name="'
				+ i
				+ '" onclick="mostrarImputAdicionarPessoaCouvert(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+ObjectLabels.label_adicionar_pessoa+'</span> </li><input    name="add'
				+ i
				+ '" style="display:none" class="inputNomeAdicionarCouvert" type="text" />');
	
	 
	 $('.input-adionar-couvert').focus(function(){
			
        $(this).val("");
                                         
     });
	
	$('.input-adionar-couvert').focusout(function(){
		
         salvarQuantidadeCouver(this.value,this.name);
                                         
    });
	
	$('.inputNomeAdicionarCouvert').focusout(function(){
        
		if(this.value != ""){
			salvarPessoaAdicionarCouvert(this);
		}else{
			montaAdicionarCouvert();
		}
    });
	
}

function montaModalDistribuirContaConjunto(tx,result){
	
	$("#id-ul-adicionar-pessoa-distribuir-conta-conjunto li").remove();
    $(".inputNomeAdicionarDistribuirContaConjunto").remove();
    
	hide('modal_informacoes_extras');
	show('modal_distribuir_conta_conjunto');

	
    $("#id-ul-distribuir-conta-conjunto li").remove();
	for(var i=0;i<result.rows.length;i++){
		
		
		$("#id-ul-distribuir-conta-conjunto")
		    .append(
						'<li id="pessoa-distribuir-conta-conjunto'
								+ i
								+ '" dojoType="dojox.mobile.ListItem" name="'+result.rows.item(i).nome+'" data-dojo-props=\'moveTo:"#"\' class="mblListItem liEditavel mostrarDetalhado pessoaDistribuicao" value="pedido_detalhado-'
								+ i
								+ '" > <div class="modal_adicionar_couvert_nome_pessoa"> <span class="span-nome-pessoa-fechamento-conta">'+result.rows.item(i).nome+'</span> </div></li>');
     }
	
	 $("#id-ul-adicionar-pessoa-distribuir-conta-conjunto").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
				+ i
				+ '" name="'
				+ i
				+ '" onclick="mostrarImputAdicionarPessoaDistribuirContaConjunto(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+ObjectLabels.label_adicionar_pessoa+'</span> </li><input name="add'
				+ i
				+ '" style="display:none" class="inputNomeAdicionarDistribuirContaConjunto" type="text" />');
	
	 
	 $('#id-ul-distribuir-conta-conjunto .pessoaDistribuicao').click(function(){
			
		     $(this).toggleClass('pessoa_selecionado');
	        
	 });
	 
	 $('.inputNomeAdicionarDistribuirContaConjunto').focusout(function(){
	        
			if(this.value != ""){
				salvarPessoaDistribuicaoContaConjunto(this);
			}else{
				montaModalDistribuirContaConjunto();
			}
	 });
	 
}


function distribuirContaConjunto(){
	
	var totalPedidoContaConjunto = 0.00;
	db.transaction(function(tx) {
	tx.executeSql('SELECT * FROM Pedido where contaConjunto == "true" and status != "confirmacao" and status != "cancelado" and status != "distribuido" ',[],function(tx,result){
        
        for(i=0;i<result.rows.length;i++){
        	totalPedidoContaConjunto = totalPedidoContaConjunto + parseFloat(result.rows.item(i).preco_produto);
        	
   
			var status_pagamento  = {
				     "value":"Distribuido",
			}
			
			var data  = {
				     "type":"pedido",
				     "field_status_pagamento[und][0]":status_pagamento,
		     };
			
			var urlUpdatePedido = "" + ipServidorDrupal + "/node/"+result.rows.item(i).nid;
			 
			 
			putAjax(urlUpdatePedido,data);
        	
        	 
        	 tx.executeSql('UPDATE Pedido SET status="distribuido" WHERE id='+result.rows.item(i).id+'');
          }
        
        var qtdePessoas = $( "#id-ul-distribuir-conta-conjunto .pessoa_selecionado" ).length;
        var id = "";
		var preco = totalPedidoContaConjunto / qtdePessoas;
		var preco_original = totalPedidoContaConjunto / qtdePessoas;
		var title_comum = "";
		var categoria = "";
		var nid_produto = "";
		var preco_adicionais = "";
		var nid_adicionais = "";
		var title_adicionais = "";
		var title_adicionais_portugues = "";
		var contador = 0;
        var observacao = "distribuicao";
		var title = "";
		var adicionaisId = "";
		var flagPizzaMeioaMeio = "";
		var nomePrimeiraOpcaoPizza = "";
        
        tx.executeSql('SELECT * FROM Produtos where codigo = "distribuicao"',[],function(tx,result){
            if(result.rows.length > 0){
            	  id = result.rows.item(0).id;
				  preco = totalPedidoContaConjunto / qtdePessoas;
				  preco_original = totalPedidoContaConjunto / qtdePessoas;
				  title_comum = result.rows.item(0).title_comum;
				  categoria = result.rows.item(0).categoria;
				  nid_produto = result.rows.item(0).nid;
				  preco_adicionais = "";
				  nid_adicionais = "";
				  title_adicionais = "";
				  title_adicionais_portugues = "";
				  contador = 0;
                  observacao = "couver";
				  title = result.rows.item(0).title;
				  adicionaisId = "";
				  flagPizzaMeioaMeio = "";
				  nomePrimeiraOpcaoPizza = "";
				  
				  $( "#id-ul-distribuir-conta-conjunto .pessoa_selecionado" ).each(function( index ) {
			        	var pessoa = $('#'+this.id).attr('name');
			           
                        tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+pessoa+'","false","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","aguardando-pedido","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","","","","","","semDisplay","'+returnDataAtual()+'")');

			      });
				  hide('modal_distribuir_conta_conjunto');
				  montaPreviaPedido();
                  						   
            }
         },errorCB);
        
        },errorCB);
	
	 },errorCB);
}

function salvarQuantidadeCouver(quantidade,nome){
    db.transaction(function(tx) {
    	
    	if(quantidade == null || quantidade == ""){
    		quantidade = 0;
    	}
          tx.executeSql('UPDATE Pessoas SET quantidade_couvert="'+quantidade+'" WHERE nome="'+nome+'"');
          
          
    },errorCB);
}

function adicionarCouvert(){
	flagChopp = false;
	flagCouvert = true;
	var valor = $('#modal_adicionar_couver .input_valor_couvert').text();
	if(valor != null && valor != ""){
	db.transaction(function(tx) {
                      
                      tx.executeSql('SELECT * FROM Produtos where codigo = "couver"',[],function(tx,result){
                                    if(result.rows.length > 0){
                                    	 var id = result.rows.item(0).id;
                						 var preco = valor;
                						 var preco_original = valor;
                						 var title_comum = result.rows.item(0).title_comum;
                						 var categoria = result.rows.item(0).categoria;
                						 var nid_produto = result.rows.item(0).nid;
                						 var preco_adicionais = "";
                						 var nid_adicionais = "";
                						 var title_adicionais = "";
                						 var title_adicionais_portugues = "";
                						 var contador = 0;
                                         var observacao = "couver";
                						 var title = result.rows.item(0).title;
                						 var adicionaisId = "";
                						 var flagPizzaMeioaMeio = "";
                						 var nomePrimeiraOpcaoPizza = "";
                						
	                                    tx.executeSql('SELECT * FROM Pessoas',[],function(tx,result){
	                                                  if(result.rows.length > 0){
		                                                  for(var i=0;i<result.rows.length;i++){
		                                                	  
		                                                	  if(result.rows.item(i).quantidade_couvert != 0){
                                                      
                                                      var quantidadeCouvertFor = parseInt(result.rows.item(i).quantidade_couvert);
                                                    
                                                      var nome = result.rows.item(i).nome;
                                                      for(var l=0;l<quantidadeCouvertFor;l++){
                                                      
		                                                        	 tx.executeSql('INSERT INTO Pedido(mesa,pessoa,contaConjunto,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,data_pedido) VALUES ("'+mesa+'","'+nome+'","false","'+observacao+'","'+id+'","'+title+'","'+preco_original+'","'+preco+'","1","couver","'+title_comum+'","'+categoria+'","'+nid_produto+'","'+title_adicionais+'","'+preco_adicionais+'","'+nid_adicionais+'","'+adicionaisId+'","'+flagPizzaMeioaMeio+'","'+nomePrimeiraOpcaoPizza+'","","","","","","semDisplay","'+returnDataAtual()+'")');
		                                  						   
		                                  						     tx.executeSql('SELECT mesa,pessoa,observacao,id_produto,nome_produto,preco_original_produto,preco_produto,quantidade,status,nome_produto_portugues,categoria_produto,nid_produto,title_adicionais,preco_adicionais,nid_adicionais,id_adicionais,flagPizzaMeioaMeio,nomePrimeiraOpcaoPizza,nomeSegundaOpcaoPizza,observacao_opcaoPizza_portugues,title_opcaoPizza_portugues,observacao_opcao_pizza,title_adicionais_portugues,display_cozinha,id, MAX(id) FROM Pedido where status = "couver"',[],postPedidoDrupal,errorCB);
		                                  						     
		                                                         }
		                                                	  }
		                                                  }
		                                                  tx.executeSql('UPDATE Pessoas SET quantidade_couvert="0"');
	                                                  }
	                                    },errorCB);
                                    }
                        },errorCB);
        

   },errorCB);
	}else{
		
		alert("Favor Inserir Um Valor");
		
	}
	
	
}

function chamarLimparDadosMesa(){
	
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM Pedido where status != "pagamento-feito" and status != "cancelado" and status != "confirmacao" and status != "distribuido" ',[],function(fx,result){
			 if(result.rows.length > 0){
			   alert("Á pedidos em Aberto");
			 }else{
				    $('#modal_confirmacao_pagamento_limpar_dados_mesa .inputSenhaLimparDados').text('');
					$('#modal_confirmacao_pagamento_limpar_dados_mesa .div-mensagem span').text();
					show('modal_confirmacao_pagamento_limpar_dados_mesa');
			 }
		 },errorCB);
		},errorCB);
	
}

function montaModalDistribuicaoChopps(tx,result){
	
	$("#id-ul-adicionar-pessoa-chopp li").remove();
    $(".inputNomeAdicionarChopp").remove();
    
    hide('modal_informacoes_extras');
	show('modal_distribuicao_chopps');
	
    $("#id-ul-distribuicao-chopp li").remove();
	for(var i=0;i<result.rows.length;i++){
	    
		$("#id-ul-distribuicao-chopp")
		    .append(
						'<li id="pessoa-distribuicao-chopps-conta-'
								+ i
								+ '" dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem liEditavel mostrarDetalhado" value="pedido_detalhado-'
								+ i
								+ '" > <div class="modal_distribuicao_chopps_nome_pessoa"> <span class="span-nome-pessoa-fechamento-conta">'+result.rows.item(i).nome+'</span> </div><input  type="number" name="'+result.rows.item(i).nome+'" class="input-distribuicao-chopps"></input> </li>');
     }
	
	$("#id-ul-adicionar-pessoa-chopp").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
			+ i
			+ '" name="'
			+ i
			+ '" onclick="mostrarImputAdicionarPessoaChopp(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+ObjectLabels.label_adicionar_pessoa+'</span> </li><input    name="add'
			+ i
			+ '" style="display:none" class="inputNomeAdicionarChopp" type="text" />');
	
	
	
	$('.inputNomeAdicionarChopp').focusout(function(){
        if(this.value != ""){
        	salvarPessoaAdicionarChopp(this);
        }else{
        	montaModalDistribuicaoChopps();
        }
        
    });
	
    $('.input-distribuicao-chopps').focusout(function(){
                                             var valorInserido = parseInt(this.value);
                                             
                                             var total = parseInt($('#modal_distribuicao_chopps .total_chopps_distribuicao').text());
                                            
                                             var valorFinal = total - valorInserido;
                                             
                                             if(valorFinal < 0){
                                             alert("Ultrapassou o Numero de Chopps");
                                             $(this).val("0");
                                             }else{
                                             $('#modal_distribuicao_chopps .total_chopps_distribuicao').text(valorFinal);
                                             }
                                             });
	
}

function distribuirChopps(){
	db.transaction(function(tx) {
    var contadorArrayPedidos = 0;
	$( "#modal_distribuicao_chopps .input-distribuicao-chopps" ).each(function( index ) {
	   	if(this.value != ""){
			var numeroChopPorPessoa = parseInt(this.value);
			var nomePessoa = this.name;
			if(numeroChopPorPessoa > 0){
				var ateIndice = contadorArrayPedidos+numeroChopPorPessoa;
				for(i=contadorArrayPedidos;i<ateIndice;i++){
					var contaConjunto = false;
					if(nomePessoa == ObjectLabels.label_conta_conjunto){
						contaConjunto = true;
					}
					tx.executeSql('UPDATE Pedido SET pessoa="'+nomePessoa+'",contaConjunto="'+contaConjunto+'" WHERE Id='+arrayIdPedidoChopps[i]+'');
					contadorArrayPedidos = contadorArrayPedidos+1;
				}
			}
	   	}
    });
                   hide('modal_distribuicao_chopps');
                   montaPreviaPedido();
	},errorCB);
}

function montaModalPreviaPedido(tx,result){
	
	$("#id-ul-fechamento-conta .mostrarDetalhado").remove();
	$("#id-ul-fechamento-conta .pedido_detalhado").remove();
	$('#modal_previa_pedido .title_modal_nome_pessoa').text(ObjectLabels.title_total);
	$('#modal_previa_pedido .btn-confirmar-pagamento').text(ObjectLabels.btn_confirmar_pagamento);
	$('#modal_previa_pedido .btn_cancelar_pedido').text(ObjectLabels.btn_cancelar);
	$('#modal_previa_pedido .btn-fechar-conta-previa-pedido').text(ObjectLabels.btn_fechar_conta_da_mesa);
	
		$('#id-confirmarPagametento').text(ObjectLabels.btn_limpar_dados_da_mesa);
		$('#id-confirmarPagametento').attr('onclick','chamarLimparDadosMesa()');


	show('modal_previa_pedido');
	var ultimaPessoa = "";
	var ultimoI;
	var numeroDivPai = 0;
	for(var i=0;i<result.rows.length;i++){
		if(i==0 || ultimaPessoa != result.rows.item(i).pessoa)	{
	    ultimoI = i;
	    numeroDivPai += 1;
		$("#id-ul-fechamento-conta")
		    .append(
						'<li id="pedido-fechamento-conta-'
								+ i
								+ '" dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem liEditavel mostrarDetalhado" value="pedido_detalhado-'
								+ i
								+ '" > <div class="modal_pedido_nome_pessoa"> <div class="div-incremento"> <span class="incremento mais">+</span> </div> <span class="span-nome-pessoa-fechamento-conta">'+result.rows.item(i).pessoa+'</span> </div> <div id="div-modal_previa_preco_produto'+i+'" class="modal_previa_preco_produto"> <span class="preco-fechamento-conta"></span> <button idLI="'+i+'" id="btn_pedido_'+i+'" title="'+result.rows.item(i).status+'" value="'+result.rows.item(i).pessoa+'" class="btn_fechar_conta_individual efeito-button"  onclick="showSugestaoSobremesa(this)">'+ObjectLabels.btn_fechar_conta_individual+'</button> </div> 	</li>  <div id="pedido_detalhado-'
								+ i
								+ '" style="display: none" class="pedido_detalhado"> <ul dojoType="dojox.mobile.EdgeToEdgeList" class="mblEdgeToEdgeList minhaUL-modal-nome-pessoa" ><li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem minhaLI li_detalhe_pedido">  <div class="modal_pedido_nome_produto_detalhado"> <span>'+result.rows.item(i).nome_produto+'</span> </div> <div class="modal_pedido_preco_produto_detalhado"><span>R$ '+result.rows.item(i).preco_produto+'</span> </div>  </li> </ul> </div>');
	    }else{
	    	$("#pedido_detalhado-"+ultimoI+" .minhaUL-modal-nome-pessoa")
		    .append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem minhaLI li_detalhe_pedido">  <div class="modal_pedido_nome_produto_detalhado"> <span>'+result.rows.item(i).nome_produto+'</span> </div> <div class="modal_pedido_preco_produto_detalhado"><span>R$ '+result.rows.item(i).preco_produto+'</span> </div>  </li> ');
	    }
		
		 if(result.rows.item(i).pessoa == ObjectLabels.label_conta_conjunto){
				tx.executeSql('SELECT * FROM Labels where categoria_label = "label_conta_conjunto" and language="Portuguese-Brazil"',[],function(tx,result){
					if(result.rows.length > 0){
						 label_conta_conjunto_portugues = result.rows.item(0).valor ;
					}
				},errorCB);
	   	 }	
		
		ultimaPessoa = result.rows.item(i).pessoa;
	}
	
	var totalMesa = 0.00;
	
	$( "#id-ul-fechamento-conta .mostrarDetalhado" ).each(function( index ) {
   	 
	 var total = 0.00;
   	 
   	 var numeroId = this.id.replace('pedido-fechamento-conta-','');
       $( "#pedido_detalhado-"+numeroId+" .modal_pedido_preco_produto_detalhado span" ).each(function( index ) {
     		
   	   var valor = $(this).text().replace('R$ ', '');
   	   	total += parseFloat(valor);
       });
       
       // calculo porcetagem
       var porcentagemCalculado = 0.00;
       var porcentagem = 10 / 100;
       porcentagemCalculado = total * porcentagem;
       total = total + porcentagemCalculado;
       
       $("#pedido_detalhado-"+numeroId+" .minhaUL-modal-nome-pessoa")
	    .append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem minhaLI li_detalhe_pedido">  <div class="modal_pedido_nome_produto_detalhado"> <span> 10% do Garçom</span> </div> <div class="modal_pedido_preco_produto_detalhado"><span>R$ '+porcentagemCalculado.toFixed(2)+'</span> </div>  </li> ');
       // fim porcetagem
       
       $("#pedido-fechamento-conta-"+numeroId+" .modal_previa_preco_produto span").text("Total: R$ " + total.toFixed(2));
       totalMesa += total;
     	
    });
	
	$("#total-mesa").text(ObjectLabels.label_total_mesa+': '+ totalMesa.toFixed(2));
	$(".mostrarDetalhado").add('.btn_fechar_conta_individual').click(handler);
	$(".mostrarDetalhado").click(function(e){
	var divDetalhado = $(this).next('.pedido_detalhado').attr('id');
	
		if(!(e.target.tagName == "BUTTON")){	
			if($("#"+this.id+" .incremento").hasClass('mais')){
				$("#"+this.id+" .incremento").css('left','11.5');
				$("#"+this.id+" .incremento").css('top','-6');
				$("#"+this.id+" .incremento").text('-');
				$("#"+this.id+" .incremento").removeClass('mais');
			}else {
				$("#"+this.id+" .incremento").css('left','9.43')
				$("#"+this.id+" .incremento").css('top','-5');
				$("#"+this.id+" .incremento").text('+');
				$("#"+this.id+" .incremento").addClass('mais');
			}
		  mostrarPedidoDetalhado(divDetalhado);
		}
	  });
	
	$( "#id-ul-fechamento-conta .mostrarDetalhado .btn_fechar_conta_individual" ).each(function( index ) {
		 
		if(this.title == 'aguardando-pagamento'){
		  $('#'+this.id).addClass('aguardandoPagamento');
		    
		  $('#'+this.id).text(ObjectLabels.label_aguardando_pagamento);
		  $('#'+this.id).attr("onclick", "showModal_confirmacao_fechamento_conta_garcom(this)");
                                                                                       }else{
                                                                                    	   if(this.title == "pagamento-feito"){
                                                                                    		   
                                                                                    		   var idBtn = this.id;
                                                                                    		   var value = this.value;
                                                                                    		   tx.executeSql('SELECT * FROM Pedido where pessoa = "'+value+'" and status != "pagamento-feito" and status != "cancelado" and status != "confirmacao" ',[],function(tx,result){
                                                                               					if(result.rows.length > 0){
                                                                               					  $('#'+idBtn).addClass('aguardandoPagamento');
                                                                               					    
                                                                               					  $('#'+idBtn).text(ObjectLabels.label_aguardando_pagamento);
                                                                               					  $('#'+idBtn).attr("onclick", "showModal_confirmacao_fechamento_conta_garcom(this)");
                                                                               					}else{
                                                                               					 $('#'+idBtn).text(ObjectLabels.label_pagamento_efetuado);
                                                                               					 $('#'+idBtn).removeClass('aguardandoPagamento');
                                                                               					 $('#'+idBtn).addClass('pagamento_feito');
                                                                               					 $('#'+idBtn).attr('disabled','disabled');
                                                                               					}
                                                                               				   },errorCB);
                                                                                    		  
                                                                                    	   }
                                                                                       }
	 });
	
}


function aplicar10porcentoGarçon(){
	
}

function focusTextArea(){
    alert("vamos la")
}
function mostrarPedidoDetalhado(divDetalhado){
	  $("#" + divDetalhado).toggle();
}

function chamarGarcon(){
	 var mensagem  = {
		     "value":"Mesa: "+mesa+" Chamando Garçon",
	 }
	 
	 var typeNotificacao  = {
		     "value":"chamaGarcon",
	 }
		    
	 var data  = {
			 "type":"notificacao",
		     "field_notificacao_mensagem[und][0]":mensagem,
		     "field_notificacao_type[und][0]":typeNotificacao,
		     "title":mesa,
	};
	 console.log(data.field_notificacao_type);
	 var url=""+ipServidorDrupal+"/node";
     //var ajaxPostDrupal = postAjax(url,data);
     postAjax(url,data) ;
     hide('modal_chamar_garcon');
     $('#modal_chamar_garcom_confirmacao_mensagem .div-mensagem span').text(ObjectLabels.alert_garcon_atendelo);
     $('#modal_chamar_garcom_confirmacao_mensagem .btn_ok_mensagem').text(ObjectLabels.OK);
     show('modal_chamar_garcom_confirmacao_mensagem');
}

function setarContaConjunto(){
	db.transaction(function(tx) {
	tx.executeSql('SELECT * FROM Pessoas where contaConjunto="true"',[],function(fx,result){
		 if(result.rows.length == 0){
			      
		    	 tx.executeSql('INSERT INTO Pessoas(nome,associado_pedido,ativo,contaConjunto) VALUES ("'+ObjectLabels.label_conta_conjunto+'","true","true","true")');
		 }else{
			 if(ObjectLabels.label_conta_conjunto == result.rows.item(0).nome){
			 }else{
				 tx.executeSql('UPDATE Pessoas SET nome="'+ObjectLabels.label_conta_conjunto+'" WHERE Id='+result.rows.item(0).id+'');
			 }
		 }
		 
	 },errorCB);
	},errorCB);
}

function setarPedidosContaConjunto(){
	db.transaction(function(tx) {
	 tx.executeSql('SELECT * FROM Pedido where contaConjunto = "true"',[],function(tx,result){
	     
		 if(result.rows.length>0){
			 for(var i=0;i<result.rows.length;i++){
				 tx.executeSql('UPDATE Pedido SET pessoa="'+ObjectLabels.label_conta_conjunto+'" WHERE Id='+ result.rows.item(i).id+'');
			 }
		 }
		 
	 },errorCB);
	},errorCB);
}
$(document).ready(function(){
	var text = $('.textarea-motivo-cancelamento-pedido').text();
	setLanguage();
	setLabels();
	inatividade();
	bindsButtons();
	setarContaConjunto();
	setarPedidosContaConjunto();
		
		$('#propagandas').click(function(e){
			zerarInatividade();
			inatividade();
			$('#propagandas').hide();
                                $('#view1').removeClass('background_black_propaganda');
			$('#geral').show();
			$('.mblSimpleDialog').removeClass('class-sem-index');
			$('.mblSimpleDialogCover').removeClass('class-sem-index');
			$('.mblSimpleDialogCover').removeClass('class-hide-SimpleDialogCover');
			$('#propagandas').html("");
			console.log("propagandasClick");
			$('div#propagandas').html("");
			propagandaAtiva = false
		});
                  


		$('#propagandas').bind('touchstart click', function(){
			zerarInatividade();
			inatividade();
            $('#view1').removeClass('background_black_propaganda');
			$('#propagandas').hide();
            $('#geral').show();
			$('.mblSimpleDialog').removeClass('class-sem-index');
			$('.mblSimpleDialogCover').removeClass('class-sem-index');
			$('.mblSimpleDialogCover').removeClass('class-hide-SimpleDialogCover');
			$('#geral').show();
			console.log("propagandasClick");
			$('div#propagandas').html("");
			propagandaAtiva = false;
			return false;
		});
                  
       $('#video-desenvolvido-por').bind('touchstart click', function(){
	       $('#video-desenvolvido-por').hide();
	       $('.div-video-desenvolvido-por').hide();
	       var video = document.getElementById('video-desenvolvido-por');
	       video.pause();
                                         $('#geral').show();
	       return false;
       });

		$('#bodyTeste').bind('touchstart click', function(){
			console.log('touchstart');
			$('.mblSimpleDialog').removeClass('class-sem-index');
			$('.mblSimpleDialogCover').removeClass('class-sem-index');
			$('.mblSimpleDialogCover').removeClass('class-hide-SimpleDialogCover');
			zerarInatividade();
			$('div#propagandas').html("");
			propagandaAtiva = false;
		});
        
		/*
		
        $('#modal_pedido .btn_adicionar_pedido').bind('touchstart click', function(){
                                                      showConfirmacaoPedido(this);
        });
        */
        
        bindTouchstart('#modal_pedido .btn_adicionar_pedido',showLocalConfirmacaoPedido);
	
	//document.addEventListener("deviceready", yourCallbackReady, false);
	
     //TODO passar para config getdadosDrupal
	//mockPut();
	db.transaction(montaCardapio,errorCB);
	
	
});

function showVideoDesenvolvidoPor(){
	$('#geral').hide();
    $('.div-video-desenvolvido-por').show();
    $('#video-desenvolvido-por').show();
    var video = document.getElementById('video-desenvolvido-por');
    video.load();
    video.play();
  
	
}

function postTEste(){


							var observacao = "teste";
							var title = "ddddddddd";
							
						
						

							var mesa = {
								"value" : "20",
							}

							var idContaDrupal = {
								"value" : "6",
							}

							var pessoa = {
								"value" : "sergio",
							}

							var observacao = {
								"value" : "simsim",
							}

							var nome_produto = {
								"value" : "nomeProduto",
							}

							var preco_produto = {
								"value" : "10",
							}

							var quantidade_produto = {
								"value" :"3",
							}

							var status = {
								"value" : "confirmacao",
							}
							
							var categoria_produto = {
									"value" : "pizzas",
							}
							
							var nid_produto = {
									"value" : "20",
							}
							
							var id_pedido = {
									"value" : "2",
							}
							
							var adicionais_pedido = {
									"value" : "",
							}

							var data = {
								"type" : "pedido",
								"field_mesa[und][0]" : mesa,
								"field_pessoa[und][0]" : pessoa,
								"field_observacao[und][0]" : observacao,
								"field_nome_produto[und][0]" : nome_produto,
								"field_preco_produto[und][0]" : preco_produto,
								"field_quantidade[und][0]" : quantidade_produto,
								"field_status[und][0]" : status,
								"field_id_conta[und][0]" : idContaDrupal,
								"field_categoria_produto_pedido[und][0]" : categoria_produto,
								"field_nid_produto[und][0]" : nid_produto,
								"field_id_pedido[und][0]" : id_pedido,
								"field_adicionais_pedido[und][0]" : adicionais_pedido,
								"title" : title,
							};
							
							
							//arrayIdPedidosAEfetuar.push(result.rows.item(i).id);
							var url = 'http://192.168.0.101/PizzaCompany/?q=rest/node';
							// var ajaxPostDrupal = postAjax(url,data);
							//var ajaxPostNid = postAjaxSincrona(url, data);
							var ajax = getAjax('http://192.168.0.101/PizzaCompany/?q=rest/node');
							ajax.success(function (data) {
								
                            
								
						    });
							
}

function bindsButtons(){
	
	///////////////////////////////////Barra lateral buttons Home,etc..
	
	//Fechar Conta
	$('#btn_fecharConta').bind('touchstart click', function(){
		montaPreviaPedido();
    });
	
	//Meu Pedido
	$('#btn_meuPedido').bind('touchstart click', function(){
		selectProdutoMeuPedido();
    });
	
	//Chamar Garçom
	$('#btn_chamarGarçon').bind('touchstart click', function(){
		showChamarGarcom('modal_chamar_garcon');
    });
	
	//Photum Menu
	//$('#btn_photum_menu').bind('touchstart click', function(){
	//	showVideoDesenvolvidoPor('modal_chamar_garcon');
    //});
	
    ///////////////////////////////////Janela descricao produto
	
	
	
}

function delimitadorFrase(frase,qdtCaracter){
	if(frase.length > qdtCaracter){
		var fraseLimitada = frase.substr(0,qdtCaracter) + "...";
		return fraseLimitada;
	}else{
		return frase;
	}
}

function yourCallbackReady(){
	document.addEventListener("pause", yourCallbackFunction, false);
	document.addEventListener("resume", onResume, false);
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("endcallbutton", onEndCallKeyDown, false);
	alert('ready');
}

function testeModal(){
	show('id-modal-meio-a-meio');
}
function onEndCallKeyDown(){
	alert('onEndCallKeyDown');
}

function onBackKeyDown(){
	alert('onBackKeyDown');
}

function onResume(){
	alert('resume');
}

function yourCallbackFunction(){
	alert('pause');
}

function mockPut(){
	 var data  = {
		     "type":"fechamento_conta",
		     "title":"Fechamento novo novo novo: ",
		};
	 //"+ decodeURIComponent("212")+".json"
	 var url=""+ipServidorDrupal+"/node/1006";
	 putAjax(url,data);
}
