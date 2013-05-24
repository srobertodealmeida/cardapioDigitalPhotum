var idProdutoAtual;
var pessoaSelecionado;

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
		  $('#modal_fechar_conta p').text('Deseja efetuar seu pedido? Voce pode voltar e adicionar mais itens antes de confirma-lo') ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('value',dlg.value) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('onClick','showConfirmacaoGarcom(this)') ;
		  registry.byId('modal_fechar_conta').show();
	  }
	  
	  showConfirmacaoGarcom = function(dlg){
		    registry.byId('modal_fechar_conta').hide();
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
	  }
	  
});

function montaCardapio(tx){
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
		 $("#id_ul_modal_nome_pessoa").append('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
					+ 1
					+ '" name="'
					+ 1
					+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel naoEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><button title="'+result.rows.item(0).id+'" value="add1" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button  value="add1" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button><span  class="editavel">'+result.rows.item(0).nome+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
					+ 1
					+ '" title="'+result.rows.item(0).id+'" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
		 
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
						+ '" onclick="mostrarImput(this)" class="mblListItem liEditavel naoEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><button  value="add'+value+'" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button title="'+result.rows.item(i).id+'" value="add'+value+'" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button><span  class="editavel">'+result.rows.item(i).nome+'</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
						+ value
						+ '" title="'+result.rows.item(i).id+'" style="display:none" onkeypress="salvarPessoa(this)" class="inputNome" type="text" />');
			
			
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
	             tx.executeSql('INSERT INTO Pessoas(nome) VALUES ("' + input.value + '")');
	         },errorCB);
			 
			 $('<button  value="'+input.name+'" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button title="'+input.title+'" value="'+input.name+'" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button>').insertAfter($("#" + input.name + " .mblListItemRightIcon"));
		 }
		 /**
		    if ($("#" + input.name).attr('name') == $('#id_ul_modal_nome_pessoa .liEditavel').size()) {
			var valorName = parseInt($('#id_ul_modal_nome_pessoa .liEditavel').size()) + 1;
			var valorID = parseInt($('#id_ul_modal_nome_pessoa .liEditavel').size()) + 1;
			$(
					'<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
							+ valorID
							+ '" name="'
							+ valorName
							+ '" onclick="selecionarPessoa(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">Adicionar pessoa...</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
							+ valorID
							+ '" style="display:none" onkeypress="salvarInput(this)" class="inputNome" type="text" />')
					.insertAfter(input);
		}
		 */
		
		  $(input).trigger('blur');
		  $(input).hide();
		  $("#" + input.name).addClass('naoEditavel');
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

function adicionarPedido(tx,result){
	
    var observacao =  $(".textarea-observacao-produto").val();
	if(result.rows.length > 0){
	 if($(".pessoa_selecionado").size() > 0 ){
		 db.transaction(function(tx) {
	        tx.executeSql('INSERT INTO Pedido(mesa,pessoa,observacao,nome_produto,preco_produto,quantidade) VALUES ("1","'+pessoaSelecionado+'","'+observacao+'","'+result.rows.item(0).title+'","'+result.rows.item(0).preco+'","1")');
	     },errorCB,selectPedidos);
		 
	 }else{
		 alert("Favor selecionar uma pessoa");
     }
	}
}

function selectPedidos(){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido',[],montaModalPedido,errorCB);
    },errorCB);
}

function montaModalPedido(tx,result){
	$("#id-ul-modal-pedidos .li_detalhe_pedido").remove();
	for(var i=0;i<result.rows.length;i++){
		$("#id-ul-modal-pedidos").append('<li dojoType="dojox.mobile.ListItem" class="mblListItem li_detalhe_pedido"> <div class="modal_pedido_nome_pessoa"> <span>'+result.rows.item(i).pessoa+'</span></div><div class="modal_pedido_nome_produto"> <span>'+result.rows.item(i).nome_produto+'</span></div><div class="modal_pedido_preco_produto"><span>R$ '+result.rows.item(i).preco_produto+'</span></div><div id="quantidade-'+i+'" class="div-quantidade-somar-diminuir"><button class="btn-decremento" name="'+result.rows.item(i).id+'">-</button><span class="modal_pedido_quantidade">'+result.rows.item(i).quantidade+'</span><button name="'+result.rows.item(i).id+'" class="btn-incremento">+</button></div><div class="mblListItemLabel " style="display: inline;"></div></li>');
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
	
	hide('id_modal_nome_pessoa');
	show('modal_pedido');
}


function efetuarPedido(){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido',[],postPedidoDrupal,errorCB);
   },errorCB);
}

function postPedidoDrupal(tx,result){
	for(var i=0;i<result.rows.length;i++){
		
	}
}

function montaPreviaPedido(){
	db.transaction(function(tx) {
		 tx.executeSql('SELECT * FROM Pedido',[],montaModalPreviaPedido,errorCB);
  },errorCB);
}

function montaModalPreviaPedido(tx,result){
    for(var i=0;i<result.rows.length;i++){
		
	}
}


$(document).ready(function(){
//TODO passar para config getdadosDrupal
	
	db.transaction(montaCardapio,errorCB);
	
});