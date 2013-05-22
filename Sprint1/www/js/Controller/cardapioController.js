  

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
	console.log("catergoriaSelecionado: " + categoriaSelecionado);
	
	$("#UL-Produtos").html("");
	$(".selecionado").removeClass("selecionado");
	$("#"+ div.id + " li").addClass("selecionado");
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
		 console.log( "testantoselecProdutos" + result.rows.item(i).title);
		 $(".mblScrollableViewContainer").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
		 $(".mblScrollBarWrapper div").css("-webkit-transform"," translate3d(0px, 0px, 0px)");
		 $("#UL-Produtos").append('<div class="divClicavel" id="produto-'+categoriaSelecionado+'-'+i+'" onclick="show(\'categoria-2-1\')"> <li dojoType="dojox.mobile.ListItem"  class="minhaLI"></li> <div class="imagem_categoria"> <img src="'+ result.rows.item(i).image+'"></div> <span class="nome_produto">'+result.rows.item(i).title+'</span><p class="preco_produto">'+result.rows.item(i).preco+'</p><div class="previa_descricao_produto"><span>'+result.rows.item(i).previa_descricao+'</span></div></div>');
	 }
}


$(document).ready(function(){
//TODO passar para config getdadosDrupal

	db.transaction(montaCardapio,errorCB);
	
	
});