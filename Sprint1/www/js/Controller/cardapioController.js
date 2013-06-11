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
	  
	  showConfirmacaoPessoa = function(dlg,btn){
		  $("#"+dlg+" .btn-sim-excluir-pessoa").attr('name',btn.value);
		  $("#"+dlg+" .btn-sim-excluir-pessoa").attr('title',btn.title);
		  registry.byId(dlg).show();
	  }
	  
	  showConfirmacaoPedido = function(dlg){
		  $('#modal_efetuar_pedido p').text('Deseja realmente efetuar seu pedido?') ;
		  $('#modal_efetuar_pedido .fechamentoIndividual').attr('value',dlg.value) ;
		  registry.byId('modal_efetuar_pedido').show();
	  }
	  
	  showConfirmacaoGarcom = function(dlg){
		    registry.byId('modal_fechar_conta').hide();
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
	  }
	  
      showExcluirPedido = function(){
		  
		  registry.byId('modal_excluir_pedido').show();
	  }
      
     showConfirmacaoFechamentoConta = function(dlg){
    	 if($( "#id-ul-fechamento-conta .mostrarDetalhado").length != 0){
		  $('#modal_fechar_conta p').text('Deseja realmente fechar a conta do/da ' + dlg.value ) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('value',dlg.id) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('title',dlg.value) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('onClick','showConfirmacaoPedidoIndividualGarcom(this)') ;
		  registry.byId('modal_fechar_conta').show();
    	 }
		  else{
		    	 show("modal_sem_pedido");
		     }
	  }
     
     showConfirmacaoPedidoIndividualGarcom = function(dlg){
		 var post = false;
    	 var tipo;
    	 var fechamentoMesa = false;
    	 var totalPagamento;
    	 var nomePessoa = "";
		 console.log(dlg);
    	 if(dlg.value != 'mesa'){
    		  tipo = "Individual";
    		  
    		  ultimoCaracterId = dlg.value.charAt(dlg.value.length-1);
    		  var preco = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .preco-fechamento-conta').text();
	   			preco = preco.replace('Total:','');
    		  nomePessoa = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .span-nome-pessoa-fechamento-conta').text() +': ' + preco;
    		  totalPagamento = $('#pedido-fechamento-conta-'+ultimoCaracterId+' .preco-fechamento-conta').text();
    		  
			  db.transaction(function(tx){
					tx.executeSql('SELECT * FROM Pedido where pessoa = "'+ dlg.title +'" and status="aguardando-pedido" ',[],function(tx,result){
						for(i=0;i<result.rows.length;i++){
						tx.executeSql('UPDATE Pedido SET status="aguardando-pagamento" WHERE Id='+result.rows.item(i).id+'');
						}
					},errorCB);
					
				},errorCB); 
			  
			
		  }else if(dlg.value == 'mesa'){
			   tipo = "Mesa";
			   fechamentoMesa = true;
			   
			   // Monta nome de pessoas para fechamento de conta
			   totalPagamento = 0.00;
			   $( "#id-ul-fechamento-conta .mostrarDetalhado" ).each(function( index ) {
			   		if($('#'+this.id+' .btn_fechar_conta_individual').text() == "Fechar Conta Individual"){
			   			var preco = $('#'+this.id+' .preco-fechamento-conta').text();
			   			preco = preco.replace('Total:','');
			   			var precoParser = preco.replace('R$ ','');
			   			totalPagamento += parseFloat(precoParser);
			   			nomePessoa +=$('#'+this.id+' .btn_fechar_conta_individual').val() + ": "+ preco + " tag-pular ";
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
		 						limparDados(tx);
		 						
		 						}
		 					},errorCB);
		 					
		 				},errorCB);
		    		}
		    	 }); 
		    	db.transaction(function(tx){
		    		limparDados(tx);
		    		createIdConta();
 					
 				},errorCB);
		    }
    	 var qtdTotal = $( "#id-ul-fechamento-conta .mostrarDetalhado .btn_fechar_conta_individual" ).length;
    	 var qtdAguardandoPagamento = $( "#id-ul-fechamento-conta .mostrarDetalhado .aguardandoPagamento" ).length;
    	 
    	 if(qtdTotal != qtdAguardandoPagamento){
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
			     "title":"Fechamento: " + mesa,
			};
		
		 //"+ decodeURIComponent("212")+".json"
		 var url=""+ipServidorDrupal+"/node";
         postAjax(url,data);
		 console.log(data);
		   
		    
    	 }
    	    registry.byId('modal_fechar_conta').hide();
		    
		    
		    if(fechamentoMesa){
		    	montaPreviaPedido();
		    	registry.byId('modal_chamar_garcom_confirmacao_mensagem_fechamento_mesa').show();
		    }else{
		    	montaPreviaPedido();
		    	registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
		    }
	  }
	  
});



function createIdConta(){
	db.transaction(function(tx) {
		
		tx.executeSql('CREATE TABLE IF NOT EXISTS IdConta (id INTEGER PRIMARY KEY AUTOINCREMENT, idConta TEXT NOT NULL)');
		 tx.executeSql('SELECT * FROM IdConta ',[],function(tx,result){
			 if(result.rows.length == 0){
				 tx.executeSql('INSERT INTO IdConta(idConta) VALUES ("1")'); 
			 }else{
			   idAtual = result.rows.item(0).idConta;
			   idAtual = parseInt(idAtual);
			   idAtual += 1;
			   tx.executeSql('UPDATE IdConta SET idConta="'+idAtual+'" WHERE Id='+result.rows.item(0).id+'');
			 }
		 },errorCB);
   },errorCB);
	
}

function confirmacaoFechamentoMesa(){
	window.location = 'home.html';
}


function limparDados(tx){
     ////////////////////////////////////////////Pessoas//////////////////////////////////////
	// Table Mesa
	tx.executeSql('DROP TABLE IF EXISTS Pessoas');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, associado_pedido TEXT)');
	
    ////////////////////////////////////////////Pedido///////////////////////////////////////
	// Table Mesa
	tx.executeSql('DROP TABLE IF EXISTS Pedido');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, mesa TEXT ,  pessoa TEXT ,  observacao TEXT ,id_produto INTEGER, nome_produto TEXT ,  preco_produto TEXT,  quantidade TEXT, status TEXT )');
}

function montaCardapio(tx){
	 tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
		 mesa = result.rows.item(0).numero;
	 },errorCB)
	 
	 tx.executeSql('SELECT * FROM IdConta ', [], function(tx, result) {
		 idConta = result.rows.item(0).idConta;
	 }, errorCB);
	 
	tx.executeSql('SELECT * FROM Categorias',[],montaCategoria,errorCB);
}

function montaCategoria(tx,result){
    console.log(result.rows);
    for(var i=0;i<result.rows.length;i++){
    	
    	$("#ul-categorias").append('<div class="divClicavel" id="categoria-'+i+'" onclick="chamarProdutos(this)" ><li dojoType="dojox.mobile.ListItem"  class="minhaLI minhaLI" tabindex="0"><div class="mblListItemLabel" style="display: inline;"></div></li> <span class="nome_categoria">'+result.rows.item(i).title+'</span></div>')
		console.log(result.rows.item(i));
    	
    	console.log(result.rows.item(i));
    }
}

function chamarProdutos(div){
	$(".selecionado").removeClass("selecionado");
	$("#"+ div.id + " li").addClass("selecionado");
	categoriaSelecionado = $("#"+ div.id + " li").next('span').text();
	console.log("catergoriaSelecionado: " + categoriaSelecionado);
	
	$("#UL-Produtos").html("");
	
	db.transaction(selectDadosProdutos,errorCB);
}

function selectDadosProdutos(tx){
	console.log("selectDadosProdutos: " + categoriaSelecionado);
	console.log('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" ');
	tx.executeSql('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" ',[],montaProdutos,errorCB);
}

function montaProdutos(tx,result){
	 console.log( "NUmeroProdutoscomwhere" + result.rows.length);
	 for(var i=0;i<result.rows.length;i++){
		 console.log( "testantoselecProdutos" + result.rows.item(i).id);
		 $(".mblScrollableViewContainer").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
		 $(".mblScrollBarWrapper div").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
		 $("#UL-Produtos").append('<div class="divClicavel" name="'+ result.rows.item(i).id +'" id="produto-'+categoriaSelecionado+'-'+i+'" onclick="selectProduto(this)"> <li dojoType="dojox.mobile.ListItem"  class="minhaLI"></li> <div class="imagem_categoria"> <img src="'+ result.rows.item(i).image+'"></div> <span class="nome_produto">'+result.rows.item(i).title+'</span><p class="preco_produto">R$ '+result.rows.item(i).preco+'</p><div class="previa_descricao_produto"><span>'+result.rows.item(i).previa_descricao+'</span></div></div>');
	 }
}

function selectProduto(produto){
	db.transaction(function(tx){
		var name = $("#" + produto.id).attr('name');
		console.log("nameProdutoTentativa: "+ name);
		tx.executeSql('SELECT * FROM Produtos where categoria = "'+ categoriaSelecionado +'" and id='+name+' ',[],montaDescricao,errorCB);
		
	},errorCB);
	
}

function montaDescricao(tx,result){

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
		$("#id-modal-descricao .modal_descricao .title_modal").text(result.rows.item(0).title);
		$("#id-modal-descricao .modal_descricao .title_descricao").text(result.rows.item(0).descricao);
		$("#id-modal-descricao .modal_descricao .title_preco").text('R$ ' + result.rows.item(0).preco);
		$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido").append('<button  value="descricao-categoria-1-2" class="btn_adicionar_pedido" onclick="selectPessoa('+result.rows.item(0).id+')">Adicionar</button>');
		$("#id-modal-descricao .btn_adicionar_pedido_descricao_pedido").append('<button  value="descricao-categoria-1-2" class="btn_cancelar_pedido" onclick="hide(\'id-modal-descricao\')">Cancelar</button>');
		editandoPedido = false;
		editandoPessoa = false;
		show('id-modal-descricao');
	}
	
}

function selectPessoa(idProduto){
	console.log('selectPessoas');
	idProdutoAtual = idProduto;
	hide('id-modal-descricao');
	db.transaction(function(tx){
		console.log("nameProdutoTentativa: "+ name);
		tx.executeSql('SELECT * FROM Pessoas',[],montaAdicionarPessoa,errorCB);
		
	},errorCB);
	
}

function montaAdicionarPessoa(tx,result){
	console.log("numeroPessoasMEsa: " + result.rows.length)
	
	//Limpa li.
	$("#id_ul_modal_nome_pessoa .liEditavel").remove();
	$("#id_ul_modal_nome_pessoa .inputNome").remove();
	
	if(!editandoPessoa){
		$(".textarea-observacao-produto").val('');
	}
	
	if(result.rows.length == 0){//Caso não tiver nenhuma pessoa no banco de dadosmonta 2 li com adicionar pessoa
		console.log("entrou no if montaPessoa")
		for(i=1;i<4;i++){
		  $("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
					+ i
					+ '" name="'
					+ i
					+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">Adicionar pessoa...</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
					+ i
					+ '" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
		}
		
		
		
		
	}else if(result.rows.length == 1){// Caso tiver apenas uma pessoa no banco de dados gera mais 2 li de adicionar pessoa
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
		 
		 if(result.rows.item(0).associado_pedido != "true"){
			 $('#add'+ 1+' .mblListItemRightIcon').after('<button  value="add1" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button title="'+result.rows.item(0).id+'" value="add1" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button>')
		 }
		 
		 for(i=2;i<4;i++){
			  $("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
						+ i
						+ '" name="'
						+ i
						+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">Adicionar pessoa...</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
						+ i
						+ '" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
			}
	}else {
		for(i=0;i<result.rows.length;i++){// monta li de pessoas do banco de dados
			var value = i + 1; 
			$("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
						+ value
						+ '" name="'
						+ value
						+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel naoEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">'+result.rows.item(i).nome+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
						+ value
						+ '" title="'+result.rows.item(i).id+'" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
			
			
			if(result.rows.item(i).associado_pedido != "true"){
				 $('#add'+ value+' .mblListItemRightIcon').after('<button  value="add'+value+'" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button title="'+result.rows.item(i).id+'" value="add'+value+'" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button>')
			 }
		}
		
		var valueUltimoLi = result.rows.length +1;
		$("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
				+ valueUltimoLi
				+ '" name="'
				+ valueUltimoLi
				+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">Adicionar pessoa...</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
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
		$("#id_modal_nome_pessoa .btn_adicionar_pedido").text('Adicionar');
		$("#id_modal_nome_pessoa .btn_adicionar_pedido").attr('onclick','selectProdutoPedido()');
	}
	
	tx.executeSql('SELECT * FROM Produtos where id='+idProdutoAtual+'',[],function(tx,result){
		$('#id_modal_nome_pessoa .nome-produto-adicionar-pessoa').text(result.rows.item(0).title);
	},errorCB);
		
	
	show('id_modal_nome_pessoa');

}

//Método que mostra o campo para adiiconar Pessoa;
function mostrarImput(li){
	
	 	  if($("#"+ li.id).hasClass('naoEditavel')){
	 		 
	        return false;
	      }
	 
	 $("#"+ li.id + ' .editavel').hide();
	 if($("#"+ li.id + ' .editavel').text() != "Adicionar pessoa..."){
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
	             tx.executeSql('INSERT INTO Pessoas(nome,associado_pedido) VALUES ("' + input.value + '","false")');
	         },errorCB);
			 
			 $('<button  value="'+input.name+'" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button title="'+input.title+'" value="'+input.name+'" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button>').insertAfter($("#" + input.name + " .mblListItemRightIcon"));
		 }
	
		  $(input).trigger('blur');
		  $(input).hide();
		  $("#" + input.name).addClass('naoEditavel');
		  editandoPessoa = true;
		  selectPessoa(idProdutoAtual);
		  window.event.preventDefault();
		  return false;
	}
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
	$("#"+ div.name).hide();
	
}

function selectProdutoPedido(){
	 db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Produtos where id='+idProdutoAtual+'',[],adicionarPedido,errorCB);
     },errorCB);
}

function salvarEdicaoPedido(){
	 var observacao =  $(".textarea-observacao-produto").val();
	 db.transaction(function(tx) {
	  tx.executeSql('UPDATE Pedido SET pessoa="'+pessoaSelecionado+'", observacao="'+observacao+'" WHERE id="'+idPedidoEditando+'"');
      tx.executeSql('UPDATE Pessoas SET associado_pedido="true" WHERE nome="'+pessoaSelecionado+'"');
    },errorCB,selectPedidos);
}

function selectProdutoMeuPedido(){
	meuPedido = true;
	 db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido',[],montaModalPedido,errorCB);
    },errorCB);
}

function adicionarPedido(tx,result){
	meuPedido = false;
    var observacao =  $(".textarea-observacao-produto").val();
	if(result.rows.length > 0){
	 if($(".pessoa_selecionado").size() > 0 ){
		 db.transaction(function(tx) {
				 tx.executeSql('INSERT INTO Pedido(mesa,pessoa,observacao,id_produto,nome_produto,preco_produto,quantidade,status) VALUES ("'+mesa+'","'+pessoaSelecionado+'","'+observacao+'","'+result.rows.item(0).id+'","'+result.rows.item(0).title+'","'+result.rows.item(0).preco+'","1","confirmacao")');
			     tx.executeSql('UPDATE Pessoas SET associado_pedido="true" WHERE nome="'+pessoaSelecionado+'"');
		   
		 },errorCB,selectPedidos);
		 
	 }else{
		 show("modal_favor_selecionar_pessoa");
     }
	}
}

function selectPedidos(){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where status = "confirmacao"',[],montaModalPedido,errorCB);
    },errorCB);
}

function montaModalPedido(tx,result){
	$("#id-ul-modal-pedidos .li_detalhe_pedido").remove();
	$("#id-ul-modal-pedidos .div-detalhe-pedido").remove();
	if(meuPedido == true && result.rows.length == 0){
		show('modal_sem_pedido');
	}else{
	for(var i=0;i<result.rows.length;i++){
		if(result.rows.item(i).status == 'confirmacao'){
			$("#id-ul-modal-pedidos").append('<li id="id-pedido-da-mesa'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div class="modal_pedido_preco_produto"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><div id="quantidade-'+i+'" class="div-quantidade-somar-diminuir"><button class="btn-decremento" name="'+result.rows.item(i).id+'">-</button><span class="modal_pedido_quantidade">'+result.rows.item(i).quantidade+'</span><button name="'+result.rows.item(i).id+'" class="btn-incremento">+</button><button name="'+result.rows.item(i).id+'" class="btn-excluir-pedido" >X</button><button value="'+result.rows.item(i).id+'" onclick="editarPedido(this)" class="btn-editar-pedido" >Editar</button></div><div class="mblListItemLabel " style="display: inline;"></div></li><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><p align="Left" class="div-detalhe-pedido-p">Observação: </p><div class="detalhe-pedido-observacao"><p align="Left">'+result.rows.item(i).observacao+'</p></div></div>');
		}else{
			$("#id-ul-modal-pedidos").append('<li id="id-pedido-da-mesa'+i+'" dojoType="dojox.mobile.ListItem" value="detalhe-pedido-'+i+'" class="mblListItem li_detalhe_pedido"><div class="div-incremento"> <span class="incremento mais">+</span> </div> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div class="modal_pedido_preco_produto"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><span class="modal_pedido_quantidade_pedido_efetuado">Qtde: '+result.rows.item(i).quantidade+'</span><span class="pedidoEfetuado aguardandoPagamento">Pedido Efetuado</span></li></div><div id="detalhe-pedido-'+i+'" class="div-detalhe-pedido" style="display:none"><p align="Left" class="div-detalhe-pedido-p">Observação: </p><div class="detalhe-pedido-observacao"><p align="Left">'+result.rows.item(i).observacao+'</p></div></div>');
		}
	}
	$(".btn-decremento").click(function(e){
		 if(parseInt($(this).next('span').text()) > 1){
		 var quantidade =  parseInt($(this).next('span').text()) - 1;
		 $(this).next('span').text(quantidade);
		 var idProduto = $(this).attr('name');
		 db.transaction(function(tx) {
             tx.executeSql('UPDATE Pedido SET quantidade="'+quantidade+'" WHERE Id='+idProduto+'');
         },errorCB);
		 }
	  });
	
	$(".btn-incremento").click(function(e){
		var idDivPai = $(this).parent().attr('id');
		var valorSpan = $('#'+idDivPai + ' .modal_pedido_quantidade').text();
		var quantidade =  parseInt(valorSpan) + 1;
		 $('#'+idDivPai + ' .modal_pedido_quantidade').text(quantidade);
		 var idProduto = $(this).attr('name');
		 db.transaction(function(tx) {
             tx.executeSql('UPDATE Pedido SET quantidade="'+quantidade+'" WHERE Id='+idProduto+'');
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

function editarPedido(li){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where id = '+li.value+'',[],function(tx,result){
			 hide('modal_pedido');
			 idPedidoEditando = result.rows.item(0).id;
			 $(".textarea-observacao-produto").val(result.rows.item(0).observacao);
			 console.log('editando');
			 editandoPedido = true;
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
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where status = "confirmacao"',[],postPedidoDrupal,errorCB);
   },errorCB);
}

function postPedidoDrupal(tx,result){
		 db.transaction(function(tx) {
			 for(var i=0;i<result.rows.length;i++){
				 console.log(result.rows.item(i));
				 
				 preco = result.rows.item(i).preco_produto * result.rows.item(i).quantidade;
			 
				 var mesa  = {
	    			     "value":result.rows.item(i).mesa,
				 }
				 
				 var idContaDrupal = {
						 
				    "value":idConta,
						 
				 }
				 
				 var pessoa  = {
	    			     "value":""+result.rows.item(i).pessoa+"",
				 }
				 
				 var observacao  = {
	    			     "value":""+result.rows.item(i).observacao+"",
				 }
				 
				 var nome_produto  = {
	    			     "value":""+result.rows.item(i).nome_produto+"",
				 }
				 
				 var preco_produto  = {
	    			     "value":""+preco.toFixed(2)+"",
				 }
				 
				 var quantidade_produto  = {
	    			     "value":result.rows.item(i).quantidade,
				 }
				 
				 var status  = {
	    			     "value":""+result.rows.item(i).status+"",
				 }
	    			    
	    		 var data  = {
	    			     "type":"pedido",
	    			     "field_mesa[und][0]":mesa,
	    			     "field_pessoa[und][0]":pessoa,
	    			     "field_observacao[und][0]":observacao,
	    			     "field_nome_produto[und][0]":nome_produto,
	    			     "field_preco_produto[und][0]":preco_produto,
	    			     "field_quantidade[und][0]":quantidade_produto,
	    			     "field_status[und][0]":status,
	    			     "field_id_conta[und][0]":idContaDrupal,
	    			     "title":result.rows.item(i).nome_produto ,
	    			};
				 console.log(data);
				 //"+ decodeURIComponent("212")+".json"
				 var url=""+ipServidorDrupal+"/node";
                 postAjax(url,data);
                 
				 //putAjax(url,data);
                 tx.executeSql('UPDATE Pedido SET status="aguardando-pedido" , preco_produto = "'+preco.toFixed(2)+'" WHERE id='+result.rows.item(i).id+'');
             
			 }
			
			 hide('modal_pedido');
			 hide('modal_efetuar_pedido');
			 show('modal_pedido_confirmacao_mensagem');
         },errorCB);
		 
		 
	
}

function montaPreviaPedido(){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido where status="aguardando-pedido" or status="aguardando-pagamento" order by pessoa',[],montaModalPreviaPedido,errorCB);
  },errorCB);
}

function montaModalPreviaPedido(tx,result){
    
	$("#id-ul-fechamento-conta .mostrarDetalhado").remove();
	$("#id-ul-fechamento-conta .pedido_detalhado").remove();
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
								+ '" > <div class="modal_pedido_nome_pessoa"> <div class="div-incremento"> <span class="incremento mais">+</span> </div> <span class="span-nome-pessoa-fechamento-conta">'+result.rows.item(i).pessoa+'</span> </div> <div id="div-modal_previa_preco_produto'+i+'" class="modal_previa_preco_produto"> <span class="preco-fechamento-conta"></span> <button id="btn_pedido_'+i+'" title="'+result.rows.item(i).status+'" value="'+result.rows.item(i).pessoa+'" class="btn_fechar_conta_individual"  onclick="showConfirmacaoFechamentoConta(this)">Fechar Conta Individual</button> </div> 	</li>  <div id="pedido_detalhado-'
								+ i
								+ '" style="display: none" class="pedido_detalhado"> <ul dojoType="dojox.mobile.EdgeToEdgeList" class="mblEdgeToEdgeList minhaUL-modal-nome-pessoa" ><li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem minhaLI li_detalhe_pedido">  <div class="modal_pedido_nome_produto_detalhado"> <span>'+result.rows.item(i).nome_produto+'</span> </div> <div class="modal_pedido_preco_produto_detalhado"><span>R$ '+result.rows.item(i).preco_produto+'</span> </div>  </li> </ul> </div>');
	    }else{
	    	$("#pedido_detalhado-"+ultimoI+" .minhaUL-modal-nome-pessoa")
		    .append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\' class="mblListItem minhaLI li_detalhe_pedido">  <div class="modal_pedido_nome_produto_detalhado"> <span>'+result.rows.item(i).nome_produto+'</span> </div> <div class="modal_pedido_preco_produto_detalhado"><span>R$ '+result.rows.item(i).preco_produto+'</span> </div>  </li> ');
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
     	$( "#pedido-fechamento-conta-"+numeroId+" .modal_previa_preco_produto span" ).text("Total: R$ " + total.toFixed(2));
     	totalMesa += total;
     	
    });
	$("#total-mesa").text('Total Mesa: '+ totalMesa.toFixed(2));
	
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
		    
		  $('#'+this.id).text('Aguardando Pagamento');
		  $('#'+this.id).attr("disabled", "disabled");
		}
	 });
	
	
}

function mostrarPedidoDetalhado(divDetalhado){
	  $("#" + divDetalhado).toggle();
	}


$(document).ready(function(){
//TODO passar para config getdadosDrupal
	
	db.transaction(montaCardapio,errorCB);
	
});




