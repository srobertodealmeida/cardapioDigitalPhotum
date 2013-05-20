
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


$(document).ready(function(){
//TODO passar para config getdadosDrupal
	db.transaction(createTable, errorCB, successCB);
var ajaxCategoria = getAjax(urlViewCategoria);
	
	ajaxCategoria.success(function (data) {
		  $.each(data, function(key, val) {
			  console.log(val);
			  arrayCategorias.push(val.node_title);
			  
		  });
		  insertTable("categorias");
		  
    });
	
	ajaxCategoria.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
	
	
	
});