  

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
	categoriaSelecionado = $("#"+ div.id + " li").next('span').text();
	
	$("#UL-Produtos").html("");
	$(".selecionado").removeClass("selecionado");
	$("#"+ div.id + " li").addClass("selecionado");
	db.transaction(selectDadosProdutos,errorCB);
}

function selectDadosProdutos(tx){
	 
	tx.executeSql('SELECT * FROM Produtos where',[],montaProdutos,errorCB);
	 
}

function montaProdutos(tx,result){
	 for(var i=0;i<result.rows.length;i++){
		 $("#UL-Produtos").append('<div class="divClicavel" id="categoria-2-1" onclick="show(\'categoria-2-1\')"> <li dojoType="dojox.mobile.ListItem"  class="minhaLI"></li> <div class="imagem_categoria"> <img src="img/categoria2-img1.png"></div> <span class="nome_produto">42 QUEIJO & BACON</span><p class="preco_produto">R$ 13,95</p><div class="previa_descricao_produto"><span>2 fatias de pão crocante, 2 caprichadas fatias de queijo, saborosas lascas de bacon...</span></div></div>');
	 }
}


$(document).ready(function(){
//TODO passar para config getdadosDrupal

	db.transaction(montaCardapio,errorCB);
	
	
});