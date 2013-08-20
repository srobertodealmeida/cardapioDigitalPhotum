
// Variaveis globais

var ipServidorDrupal = "http://192.168.0.103/drupal-7.20/?q=rest";
var urlViewConfig = ipServidorDrupal + "/views/configuracao";
var urlViewLabels = ipServidorDrupal + "/views/labels";
var urlViewHome = ipServidorDrupal + "/views/view_home";
var urlViewPropagandas = ipServidorDrupal + "/views/propagandas";
var urlViewCategoria = ipServidorDrupal + "/views/categoria_all";
var urlViewProdutos = ipServidorDrupal + "/views/produtos_all";
var urlViewMesas = ipServidorDrupal + "/views/mesa_all";
var pathAplicativo = "/CardapioPhotum";
var constLanguageSelected = "";
var connectionWIFI = "connectionTrue";
var contador = 0;
var montaLanguage = false;
var arrayLabels = new Array();

var rulFullImage = "" ;
var nomeTable = "";
var logo = false;
var background = false;
var sucessBanco = false;
var versaoAtual = 0;
var titleIcone ="";
var qtdIcones = 0;
var titleLanguage="";
var qtdLanguages = 0;
var qtdPropaganda = 0;
var produtosFormVazio = {
		title:"",
		previa_descricao:"",
		preco:"",
		descricao:"",
		descricao_saiba_mais:"",
		categoria:"",
		image:""
};
var qtdProdutos = 0;
var qtdPropagandas = 0;
var sucessDadosDrupal = true;
var db = window.openDatabase("CardapioDigital", "1.0", "Just a Dummy DB", 200000);
var quantidadeRegistros = 0;//Quantidade total de registros , usado para saber quando terminou os registros(valor começa com 2 por causa do background e logo)


require([
         "dojo/dom-construct",
         "dojo/ready",
         "dijit/registry",
         "dojox/mobile/SpinWheel",
         "dojox/mobile/SpinWheelSlot",
         "dojox/mobile/parser"
     ], function(domConst, ready, registry, SpinWheel, SpinWheelSlot){
	 
});

function onLoad() {
    $("#preloader").fadeOut(1000);
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	$("#preloader").fadeOut(1000);
	if(connectionWIFI == "connectionTrue"){
		window.addEventListener("batterystatus", onBatteryStatus, false);
	}
	 
}

// Handle the batterystatus event
//
function onBatteryStatus(info) {
    console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
    if(info.level < 20){
    	 db.transaction(function(tx) {
    		 tx.executeSql('SELECT * FROM Mesa',[],function(tx,result){
    	   		 mesa = result.rows.item(0).numero;
    	   		 var mensagem  = {
    	   		        "value":"Bateria em "+info.level+"% na mesa: "+mesa+"",
    	   		      }
    	   		 
    	   		 var typeNotificacao  = {
    	   			     "value":"bateria",
    	   		 }
    	   		    			    
    	   		       var data  = {
    	   		         "type":"notificacao",
    	   		    	  "field_notificacao_mensagem[und][0]":mensagem,
    	   		    	 "field_notificacao_type[und][0]":typeNotificacao,
    	   		    	   "title":mesa,
    	   		        };
    	   		    	console.log(data);
    	   		    	var url=""+ipServidorDrupal+"/node";
    	   		    	//var ajaxPostDrupal = postAjax(url,data);
    	   		    	postAjax(url,data) ;
    	   	 },errorCB)
             },errorCB,successInsert);
		
    }
}

function init(versao){
	versaoAtual = versao;
	setLanguage();
	console.log("arrayMeu"+arrayIconesForm);
	
	console.log("antes sucessDadosDrupal" + homeForm.icones);
	
	if(sucessDadosDrupal == true){
		console.log("sucessDadosDrupal" + homeForm.icones);
	    db.transaction(populateDB, errorCB, successCB);
	}
}

function setLanguage(){
	 ////////////////////////////////////////////LanguageSelected//////////////////////////////////////
	// Table Config ()
	
	 db.transaction(function(tx) {
  
	tx.executeSql('SELECT * FROM LanguageSelect',[],function(tx,result){
		if(result.rows.length > 0){
		constLanguageSelected = result.rows.item(0).nome;
		}
	 },errorCB)
	 
	  },errorCB);
}

function escapeHtml(unsafe) {
    if(unsafe != null){
	return unsafe
         .replace("&amp;","&")
         .replace( "&lt;", "<")
         .replace("&gt;",">")
         .replace("&quot;", '"')
         .replace("&#039;", "'");
    }else{
    	return unsafe;
    }
 }

function getDrupalLanguages(tx){
	
	/////////////////Languages///////////////////////////////////////////////////////////////////////////////
    var ajaxUrlViewConfig = getAjax(urlViewConfig);
	
    ajaxUrlViewConfig.success(function (data) {

    	var arrayLanguages;
    	$.each(data, function(key, val) {
    	   val.languages = escapeHtml(val.languages);
		   arrayLanguages = val.languages.split(',');
			  
		 });
    	quantidadeRegistros += arrayLanguages.length;
    	qtdLanguages = arrayLanguages.length;
		
		 $.each(arrayLanguages, function(key1, val1) {
			  
			  
			  // Pega o valor do title do icone.
			  var positionTitleLanguages = val1.search('title="');
			  titleLanguage = val1.substring(positionTitleLanguages + 7, val1.length - 8);
			  
			  var url = $.parseHTML(val1); //pega apenas href
			  // esse if ´´e por causa dos outros elementos do array sem ser o primeiro a url vem como array sendo que o segundo é a url mesmo
			  if(key1 >= 1){
				 url = url[1];
			   }
			  console.log('url-languages: '+url);
			  var urlString = url.toString();
			  var extencao =  urlString.substr(urlString.length - 3);
			  var pathDestino = pathAplicativo + "/home/Languages" + key1 + "."+ extencao; // url onde será salvo a imagen
			  var typeImagen = "languages";
			  
			  // Faz download das imagens e faz o insert dos dados
			  //TODO fazer com que download das imagens não faça insenrt de dados separar.
			  downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio,titleLanguage); //faz donwload da imagen;
			  
		  });
		
		
		
		  
    });
	
    ajaxUrlViewConfig.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	}); 
	
	
}

function getDrupalLabel(tx){
   
	
	/////////////////Labels///////////////////////////////////////////////////////////////////////////////
	
    var ajaxLabels = getAjax(urlViewLabels);
	
    ajaxLabels.success(function (data) {
		$.each(data, function(key, val) {
			
			var label = {
					valor:"",
					language:"",
					valor_english:"",
					valor_spanish:"",
					valor_french:"",
					categoria_label:""
		      };
			
			// Conveter Encoding
			label.valor = escapeHtml(val.valor);
			label.language = escapeHtml(val.language);
			label.valor_english = escapeHtml( val.valor_english);
			label.valor_spanish = escapeHtml( val.valor_spanish);
			label.valor_french = escapeHtml( val.valor_french);
			label.categoria_label = escapeHtml( val.categoria_label);
			
			arrayLabels.push(label);
			  
		  });
		
		quantidadeRegistros += arrayLabels.length;
		
		insertTable('labels');
		  
    });
	
    ajaxLabels.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
	
}

function getDrupalHome(tx){
/////////////////////////////////////////////////////////////////////HOME///////////////////////////////////////////////////////
	quantidadeRegistros += 1;
	var ajaxHome = getAjax(urlViewHome);
	
	ajaxHome.success(function (data) {
	  $.each(data, function(key, val) {
		     var arrayIconesAux = val.icones.split(',');
		     var lengthPropaganda;
		     var arrayPropagandasAux;
		     if(val.propaganda != null){
		     arrayPropagandasAux =  val.propaganda.split(',');
		     lengthPropaganda = arrayPropagandasAux.length;
		     }else{
		    	 lengthPropaganda = 0;
		     }
		     qtdIcones = arrayIconesAux.length;
		     qtdPropaganda = lengthPropaganda;
		     quantidadeRegistros += arrayIconesAux.length + lengthPropaganda;
		     console.log('testeTamanhoArrays',"" + quantidadeRegistros);
		     

		     ///////////////Background//////////
		     var url = $.parseHTML(val.background); //pega apenas href
		     var urlString = url.toString();
		    
		     var extencao =  urlString.substr(urlString.length - 3);
		     var pathDestino = pathAplicativo + "/home/background." + extencao; // url onde será salvo a imagen
		     var typeImagen = "background";
		     
		     downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio,titleLanguage); //faz donwload da imagen;
		     
		     console.log('logovalor: '+val.logo);
		     
		     //////////////////Logo//////////////////////
		     if(val.logo != null){//pega apenas href
		    	 console.log('simlogo: ');
		    	 var url = $.parseHTML(val.logo);
		   
		     var urlString = url.toString();
		     var extencao =  urlString.substr(urlString.length - 3);
		     var pathDestino = pathAplicativo + "/home/logo." + extencao; // url onde será salvo a imagen
		     var typeImagen = "logo";
		     
		     downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio,titleLanguage); //faz donwload da imagen;
		     }
           
		     //////////////////Icones//////////////////////
		    
			  $.each(arrayIconesAux, function(key1, val1) {
				  
				  // Seta os nomes dos icones do cardapio em varias lignuas:
				  title_lenguage_cardapio_Form.icones_cardapio_english = val.icone_cardapio_english;
				  title_lenguage_cardapio_Form.icones_cardapio_spanish = val.icone_cardapio_spanish;
				  title_lenguage_cardapio_Form.icones_cardapio_french = val.icone_cardapio_french;
				  
				  
				  // Pega o valor do title do icone.
				  var positionTitle = val1.search('title="');
				  titleIcone = val1.substring(positionTitle + 7, val1.length - 8);
			  
				  var url = $.parseHTML(val1); //pega apenas href
				  // esse if ´´e por causa dos outros elementos do array sem ser o primeiro a url vem como array sendo que o segundo é a url mesmo
				  if(key1 >= 1){
					 url = url[1];
				   }
				  
				  var urlString = url.toString();
				  var extencao =  urlString.substr(urlString.length - 3);
				  var pathDestino = pathAplicativo + "/home/Icones" + key1 + "."+ extencao; // url onde será salvo a imagen
				  var typeImagen = "icones";
				  
				  // Faz download das imagens e faz o insert dos dados
				  //TODO fazer com que download das imagens não faça insenrt de dados separar.
				  downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio,titleLanguage); //faz donwload da imagen;
			  });
	    	
			//////////////////////Propagandas///////////////////////////
			  if(val.propaganda != null){
			   $.each(arrayPropagandasAux, function(key1, val1) {
				      var url = $.parseHTML(val1); //pega apenas href
					  // esse if ´´e por causa dos outros elementos do array sem ser o primeiro a url vem como array sendo que o segundo é a url mesmo
					  if(key1 >= 1){
						 url = url[1];
					   }
					  var urlString = url.toString();
					  var extencao =  urlString.substr(urlString.length - 3);
					  var pathDestino = pathAplicativo + "/home/Propagandas" + key1 + "."+ extencao; // url onde será salvo a imagen
					  var typeImagen = "propagandas";
					  
					  // Faz download das imagens e faz o insert dos dados
					  //TODO fazer com que download das imagens não faça insenrt de dados separar.
					  downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio,titleLanguage); //faz donwload da imagen;
			   });
			  }
			  
	     });
     });
	
	ajaxHome.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
	});
}

function getDrupalCategoria(tx) {
	// ///////////////Categoria/////////////////////////////////////

	var ajaxCategoria = getAjax(urlViewCategoria);

	ajaxCategoria.success(function(data) {
		$.each(data, function(key, val) {
			console.log(val);
			val.node_title = escapeHtml(val.node_title);

			var categoriaForm = {
				title : "",
				title_comum : "",
				language : ""
			};
			categoriaForm.title = val.titulo;
			categoriaForm.language = val.language;
			categoriaForm.title_comum = val.node_title;
			arrayCategorias.push(categoriaForm);

		});
		quantidadeRegistros += arrayCategorias.length;
		insertTable("categorias");

	});

	ajaxCategoria.error(function(jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
}

function getDrupalProduto(tx){
//////////////////////////////////////////////////////////////////Produtos/////////////////////////////////////
	
    var ajaxProdutos = getAjax(urlViewProdutos);
	
    ajaxProdutos.success(function (data) {
    	
    	  qtdProdutos = data.length;  
    	  quantidadeRegistros += qtdProdutos;
		  $.each(data, function(key, val) {
			  
			  var produtosForm = {
					    nid:"",
						title:"",
						title_comum:"",
						previa_descricao:"",
						preco:"",
						descricao:"",
						descricao_saiba_mais:"",
						categoria:"",
						image:"",
						language:""
			  };
			  
			  var produtosFinalDownloadForm = {
					    produtosForm:produtosForm,
						url:"",
						pathDestino:"",
			  };
			  
			  produtosForm.nid = val.nid;
			  produtosForm.title = escapeHtml(val.titulo);
			  produtosForm.title_comum = escapeHtml(val.node_title);
			  produtosForm.language = escapeHtml(val.language);
			  produtosForm.previa_descricao =escapeHtml(val.previa_descricao);
			  produtosForm.preco = val.preco;
			  produtosForm.descricao = escapeHtml(val.descricao);
			  produtosForm.descricao_saiba_mais = escapeHtml(val.descricao_saiba_mais);
			  produtosForm.categoria = escapeHtml(val.categoria);
			  
			  if(val.imagem != null){
			  var url = $.parseHTML(val.imagem); //pega apenas href
			  var urlString = url.toString();
			  var extencao =  urlString.substr(urlString.length - 3);
			  var pathDestino = pathAplicativo + "/home/produto." + key  + "."+ extencao; // url onde será salvo a imagen
			  }else{
				  url = null;
				  pathDestino = null;
			  }
			  
			  var typeImagen = "produtos";
			  
			  produtosFinalDownloadForm.produtosForm = produtosForm;
			  produtosFinalDownloadForm.url = url;
			  produtosFinalDownloadForm.pathDestino = pathDestino;
			  
			  arrayProdutosForm.push(produtosFinalDownloadForm);
			 // downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosForm); //faz donwload da imagen;
			  
        });
		      
		       downloadImagesProdutos(tx,qtdProdutos,0); //faz donwload da imagen;
    });
	
    ajaxProdutos.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
}

function getDrupalPropaganda(tx){
  ///////////////////////////////////////////////////////////////////////////////////Propagandas/////////////////////////////////////
	
    var ajaxPropagandas = getAjax(urlViewPropagandas);
	
    ajaxPropagandas.success(function (data) {
    	  qtdPropagandas = data.length;  
    	  quantidadeRegistros += qtdPropagandas;
		  $.each(data, function(key, val) {
			  console.log(val);
			  var url = $.parseHTML(val.image_propaganda); //pega apenas href
			  var urlString = url.toString();
			  var extencao =  urlString.substr(urlString.length - 3);
			  var pathDestino = pathAplicativo + "/propagandas/propaganda." + key  + "."+ extencao; // url onde será salvo a imagen
			  var typeImagen = "sleep-propagandas";
			  
			 downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio,titleLanguage); //faz donwload da imagen;

	});
		  
    });
	
    ajaxPropagandas.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
    
}

function getDadosDrupal(tx){
	console.log(atualizaForm.configuracao);
	console.log(atualizaForm.label);
	console.log(atualizaForm.home);
	console.log(atualizaForm.categoria);
	
	console.log(atualizaForm.produto);
	console.log(atualizaForm.propaganda);
	// Categoria
	if(atualizaForm.configuracao == 'true'){
		getDrupalLanguages(tx);
	}
	
	// Label
	if(atualizaForm.label == 'true'){
		getDrupalLabel(tx);
	}
	
	// Home
	if(atualizaForm.home == 'true'){
		getDrupalHome(tx);
	}
	
	// Categoria
	if(atualizaForm.categoria == 'true'){
		getDrupalCategoria(tx);
	}
	
	// Produtos
	if(atualizaForm.produto == 'true'){
		getDrupalProduto(tx);
	}
	
	// Propagandas
	if(atualizaForm.propaganda == 'true'){
		getDrupalPropaganda(tx);
	}
    
}

/*
 * Método que faz download das imagense faz inserts
 */
function downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosForm,titleLanguage){
    var fileTransfer = new FileTransfer();
    var url = encodeURI(url);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    	      var imagePath = fs.root.fullPath + pathDestino; // full file path
    	      var fileTransfer = new FileTransfer();
    	      
    	      fileTransfer.onprogress = function(progressEvent) {
    	  		if (progressEvent.lengthComputable) {
    	  			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
    	  			$('#loadingPercentual').innerHTML = perc + "% loaded...";
    	  		} else {
    	  			if($('#loadingPercentual').innerHTML == "") {
    	  				$('#loadingPercentual').innerHTML = "Loading";
    	  			} else {
    	  				$('#loadingPercentual').innerHTML += ".";
    	  			}
    	  		}
    	  	};
    	  	
    	      fileTransfer.download(url, imagePath, function (entry) {
    	    	  console.log("download complete: " + entry.fullPath); // entry is fileEntry object
    	    	  salvaPathImagen(typeImagen,imagePath,tx,titleIcone,produtosForm,titleLanguage);
    	      }, function (error) {
    	    	  sucessDadosDrupal = false;
    	    	  console.log("download error source " + error.source);
                  console.log("download error target " + error.target);
                  console.log("upload error code" + error.code);
                  console.log("error respoinse:"+error.response);
    	      },
    	      false
    	      );
    	      
    	   })
}

// Método para fazer download de produtos, para fazer download de cada vez e nao em treads.
function downloadImagesProdutos(tx,qtdProdutos,indice){
   
	
     if (indice != qtdProdutos && arrayProdutosForm[indice].pathDestino != null) {
		var url = encodeURI(arrayProdutosForm[indice].url);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
			var imagePath = fs.root.fullPath + arrayProdutosForm[indice].pathDestino; // full file path
			var fileTransfer = new FileTransfer();

			fileTransfer.download(url, imagePath, function(entry) {
				console.log("download complete: " + entry.fullPath); // entry
				 zerarInatividade();
				salvaPathImagenProdutos(tx,imagePath,qtdProdutos,indice);
			}, function(error) {
				sucessDadosDrupal = false;
				console.log("download error source " + error.source);
				console.log("download error target " + error.target);
				console.log("upload error code" + error.code);
				console.log("error respoinse:" + error.response);
			}, false);

		})
	}else{// Caso a imagem for nula ou seja produto de outra language que não possui imagem é inserio no array.
			arrayProdutos.push(arrayProdutosForm[indice].produtosForm);
			console.log('length: '+arrayProdutos.length+"qtdProdutos: "+qtdProdutos);
			if(arrayProdutos.length == qtdProdutos){
				insertTable("produtos");
			}else{
				indice = indice + 1;
				downloadImagesProdutos(tx,qtdProdutos,indice)
			}
	}
}

// Método que salva path da imagem no form
function salvaPathImagen(typeImagen,imagePath,tx,titleIcone,produtosForm,titleLanguage){
	console.log('nomeImage  : '+typeImagen);
	if(typeImagen == "background"){
		homeForm.background = imagePath;
		 background = true;
		console.log("form background" + homeForm.background);
	}else if (typeImagen == "logo") {
		homeForm.logo = imagePath;
		logo = true;
		console.log("form logo" + homeForm.logo);
	}else if (typeImagen == "icones") {
		
		var iconesForm1 = {
				title:"",
				image:""
		};
		iconesForm1.image = imagePath;
		iconesForm1.title = titleIcone;
		arrayIconesForm.push(iconesForm1);
		if(arrayIconesForm.length == qtdIcones){
			insertTable("icones");
		}
		//insertTable("icones");
		console.log("form icones" + homeForm.image);
	}else if (typeImagen == "propagandas") {
		var propagandasForm1 = {
				image:""
		};
		propagandasForm1.image = imagePath;
		arrayPropagandasForm.push(propagandasForm1);
		if(arrayPropagandasForm.length == qtdPropaganda){
			insertTable("propagandas");
		}
		//insertTable("propagandas");
		console.log("form propagandas" + propagandasForm.image);
	}else if (typeImagen == "produtos") {
		
		produtosForm.image = imagePath;
		arrayProdutos.push(produtosForm);
		if(arrayProdutos.length == qtdProdutos){
			insertTable("produtos");
		}
	}else if (typeImagen == "sleep-propagandas") {
		
		arrayPropagandas.push(imagePath);
		if(arrayPropagandas.length == qtdPropagandas){
			insertTable("sleep-propagandas");
		}
	}else if (typeImagen == "languages") {
		
		var languagesForm1 = {
				title:"",
				image:""
		};
		languagesForm1.image = imagePath;
		languagesForm1.title = titleLanguage;
		arrayLanguagesForm.push(languagesForm1);
		if(arrayLanguagesForm.length == qtdLanguages){
			insertTable("languages");
		}
		//insertTable("icones");
		console.log("form icones" + homeForm.image);
	}
	
	if(background == true){
		insertTable("home");
		background = false;
		logo = false;
	}
	
	
}


//Método que salva path da imagem no form
function salvaPathImagenProdutos(tx,imagePath,qtdProdutos,indice){
		
	    arrayProdutosForm[indice].produtosForm.image = imagePath;
		arrayProdutos.push(arrayProdutosForm[indice].produtosForm);
		console.log('length: '+arrayProdutos.length+"qtdProdutos: "+qtdProdutos);
		if(arrayProdutos.length == qtdProdutos){
			insertTable("produtos");
		}else{
			indice = indice + 1;
			downloadImagesProdutos(tx,qtdProdutos,indice)
		}
	
}

/*
 * Método que cria e faz insert nas tabelas.
 */
function populateDB(tx) {
	createTable(tx);
	//quantidadeRegistros = 7;
	//Mock();
	
   getDadosDrupal(tx);
}

function montaHome(tx){
	console.log('montaHome');
	tx.executeSql('SELECT * FROM Languages',[],montaBanderaLanguage,errorCB); 	
	tx.executeSql('SELECT * FROM Home',[],montaBackgroundLogo,errorCB);
	tx.executeSql('SELECT * FROM Icones',[],montaIcones,errorCB);
	tx.executeSql('SELECT * FROM Labels where categoria_label = "label_mesa_home" and language="'+constLanguageSelected+'"',[],montaLabelMesa,errorCB);
	
	//tx.executeSql('SELECT * FROM Propaganda',[],montaPropaganda,errorCB);
	  tx.executeSql('SELECT * FROM Languages',[],montaLanguages,errorCB);
	
}

function montaLabelMesa(tx,result){
	if(result.rows.length > 0){
		$('.span-label-config').text(result.rows.item(0).valor);
	}
}

//Método utilizado para atualizar os produtos de outras linguas que nao tem image setado e setar com,  o respectivo image.
function atualizaImageProdutosLanguage(tx,result){
	if(result.rows.length > 0){
		for(var i=0;i<result.rows.length;i++){
			console.log('Atualiza: '+result.rows.item(i).title_comum);
			tx.executeSql('SELECT * FROM Produtos where title_comum="'+result.rows.item(i).title_comum+'"',[],function(fx,result){
				 if(result.rows.length > 0){
					 var image;
					 for(var l=0;l<result.rows.length;l++){
						 if(result.rows.item(l).language == "Portuguese-Brazil"){
							 image = result.rows.item(l).image;
							 break;
						 }
					 }
					 
					 for(var m=0;m<result.rows.length;m++){
						 if(result.rows.item(m).language != "Portuguese-Brazil"){
							 tx.executeSql('UPDATE Produtos SET image="'+image+'" WHERE Id='+result.rows.item(m).id+'');
						 }
					 }
					 
					 
				 }
		    },errorCB);
	    }
	}
}

function montaBanderaLanguage(tx,result){
	
	tx.executeSql('SELECT * FROM LanguageSelect',[],function(tx,result){
		if(result.rows.length > 0){
		constLanguageSelected = result.rows.item(0).nome;
		// Bandeira idioma
	    tx.executeSql('SELECT * FROM Languages where nome="'+constLanguageSelected+'"',[],function(fx,result){
			 if(result.rows.length > 0){
				 $('.img-language-escolhido').attr('src',''+result.rows.item(0).image);
				 $('.nome-language-escolhido').text(result.rows.item(0).nome);
			 }
	    },errorCB);
		}
	 },errorCB)
	
	
	
}

function montaBackgroundLogo(tx,result){
	console.log('montaBackgroundLogo');
	for(var i=0;i<result.rows.length;i++){
		console.log('path background: '+result.rows.item(i).background);
		$("#background-home").attr('src', "" + result.rows.item(i).background);
		//$("#logo-home").attr('src', "" + result.rows.item(i).logo);
		
	//	console.log(result.rows.item(i).logo);
		console.log(result.rows.item(i).background);
		
    }
	
}

function montaIcones(tx,result){
	
	for(var i=0;i<result.rows.length;i++){
		console.log("iamgesicones: " + result.rows.item(i));
		console.log("iamgesicones: " + result.rows.item(i).image);
		var valtitleIcone = result.rows.item(i).title;
		if(i==0){
			var titleIcone = "";
			
			var image = result.rows.item(i).image;
			tx.executeSql('SELECT * FROM LanguageSelect',[],function(tx,result){
				if(result.rows.length > 0){
				constLanguageSelected = result.rows.item(0).nome;
				}
				 tx.executeSql('SELECT * FROM Labels where categoria_label="label_icone_cardapio" and language="'+constLanguageSelected+'"',[],function(fx,result){
					 
					 if(result.rows.length > 0){
						 titleIcone = result.rows.item(0).valor;
							$("#SwapView-icones").html("<div id=\"itemIcones-" + i + "\" class=\""+valtitleIcone+" mblCarouselItem itemCarrosel mblCarouselSlot\"><a href=\"cardapio.html\" ><div class=\"sh_bottom\"></div><div class=\"mblCarouselItemHeaderText\"></div><img class=\"mblCarouselItemImage\" src=\""+image+"\" style=\"height: 96px;\"><div class=\"mblCarouselItemFooterText\">"+ titleIcone +"  </div></a></div>");

					 }
					 
				 },errorCB);
			},errorCB)
		   

		}else{
			var idAnterior = i-1;
			$("<div id=\"itemIcones-" + i + "\" class=\""+valtitleIcone+" mblCarouselItem itemCarrosel mblCarouselSlot\"><a href=\"cardapio.html\" ><div class=\"sh_bottom\"></div><div class=\"mblCarouselItemHeaderText\"></div><img class=\"mblCarouselItemImage\" src=\""+result.rows.item(i).image+"\" style=\"height: 96px;\"><div class=\"mblCarouselItemFooterText\">"+ result.rows.item(i).title +"</div></a></div>").insertAfter('#itemIcones-'+ idAnterior);
		}
		
    	console.log(result.rows.item(i));
    }
	
}

function montaPropaganda(tx,result){
	
	for(var i=0;i<result.rows.length;i++){
		$("#foo").append('<img src="'+result.rows.item(i).image+'" width="940" height="150"/> ');
		console.log(result.rows.item(i));
    }
	
	 $("#foo").carouFredSel({
         items               : 1,
         scroll : {
             items           : 1,
             duration        : 1000,                        
             pauseOnHover    : true
         }                  
     });
}

function montaLanguages(tx,result){
	$("#spin1 .mblSpinWheelSlotContainer .mblSpinWheelSlotPanel .mblSpinWheelSlotLabel").remove();
	
	for(l=0;l<4;l++){
	for(var i=0;i<result.rows.length;i++){
		$("#spin1 .mblSpinWheelSlotContainer .mblSpinWheelSlotPanel").append('<div class="mblSpinWheelSlotLabel" name="0" val="'+result.rows.item(i).nome+'"><img class="img-language" src="'+result.rows.item(i).image+'"><p class="nome-language">'+result.rows.item(i).nome+'</p></div>');
    }
	}
	

	$('.panel-languages').hide();
	$("#preloader").fadeOut(1000);
}

function montaLanguages10(){
	$("#spin1 .mblSpinWheelSlotContainer .mblSpinWheelSlotPanel .mblSpinWheelSlotLabel").remove();
	
	/**
	for(l=0;l<4;l++){
	for(var i=0;i<result.rows.length;i++){
		$("#spin1 .mblSpinWheelSlotContainer .mblSpinWheelSlotPanel").append('<div class="mblSpinWheelSlotLabel" name="0" val="'+result.rows.item(i).nome+'"><img class="img-language" src="'+result.rows.item(i).image+'"><p class="nome-language">'+result.rows.item(i).nome+'</p></div>');
    }
	}
	*/
	for(l=0;l<4;l++){
		for(var i=0;i<4;i++){
			$("#spin1 .mblSpinWheelSlotContainer .mblSpinWheelSlotPanel").append('<div class="mblSpinWheelSlotLabel" onclick="selecionarLanguage(this)" name="0" val="Portuguese, Brazil"><img class="img-language" onclick="selecionarLanguage(this)" src="img/logo.jpg"><p class="nome-language">paisTeste</p></div>');
	    }
	}
	

	$('.panel-languages').hide();
}

function selecionarLanguage(div){
	console.log(div);
}

/*
 * Cria tabelas.
 */
function createTable(tx){
	

	// Categoria
	if(atualizaForm.configuracao == 'true'){
		 ////////////////////////////////////////////Languages//////////////////////////////////////
		// Table Mesa
		tx.executeSql('DROP TABLE IF EXISTS Languages');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Languages (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT , nome TEXT)');
	}
	
	// Label
	if(atualizaForm.label == 'true'){
		  ////////////////////////////////////////////Labels//////////////////////////////////////
		// Table Mesa
		tx.executeSql('DROP TABLE IF EXISTS Labels');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Labels (id INTEGER PRIMARY KEY AUTOINCREMENT, categoria_label TEXT, language TEXT, valor TEXT, valor_english TEXT, valor_spanish TEXT, valor_french TEXT)');
	}
	
	// Home
	if(atualizaForm.home == 'true'){
        ////////////////////////HOME//////////////////////////////////

		// Table home (logo/background)
		tx.executeSql('DROP TABLE IF EXISTS Home');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Home (id INTEGER PRIMARY KEY AUTOINCREMENT, logo TEXT NOT NULL, background TEXT NOT NULL)');
		
		
		// Table home (icones)
		tx.executeSql('DROP TABLE IF EXISTS Icones');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Icones (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, image TEXT NOT NULL, icone_cardapio_english TEXT,icone_cardapio_spanish TEXT,icone_cardapio_french TEXT)');
		
		// Table home (propaganda)
		tx.executeSql('DROP TABLE IF EXISTS Propaganda');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Propaganda (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT NOT NULL)');
		
		// Table home (propaganda)
		tx.executeSql('DROP TABLE IF EXISTS Propagandas');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Propagandas (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT NOT NULL)');
	}
	
	// Categoria
	if(atualizaForm.categoria == 'true'){
         ////////////////////////////////////////////Categorias//////////////////////////////////////
		// Table cATEGORIAS
		tx.executeSql('DROP TABLE IF EXISTS Categorias');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, title_comum TEXT, language TEXT)');
	}
	
	// Produtos
	if(atualizaForm.produto == 'true'){
          ////////////////////////////////////////////Produtos//////////////////////////////////////
		// Table Produtos
		tx.executeSql('DROP TABLE IF EXISTS Produtos');
		tx.executeSql('CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT , previa_descricao TEXT , preco TEXT , descricao TEXT , descricao_saiba_mais TEXT ,  categoria TEXT , image TEXT , title_comum TEXT, language TEXT, nid TEXT)');
	}
	
	 ////////////////////////////////////////////Language//////////////////////////////////////
	tx.executeSql('DROP TABLE IF EXISTS LanguageSelect');
	tx.executeSql('CREATE TABLE IF NOT EXISTS LanguageSelect (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)');
	tx.executeSql('INSERT INTO LanguageSelect(nome) VALUES ("Portuguese-Brazil")');
	
	////////////////////////////////////////////Config//////////////////////////////////////
	// Table Config ()
	tx.executeSql('CREATE TABLE IF NOT EXISTS Config (id INTEGER PRIMARY KEY AUTOINCREMENT, versao TEXT NOT NULL)');
	tx.executeSql('INSERT INTO Config(versao) VALUES ("'+versaoAtual+'")');
	
	// Tables Pedido e Mesa
	createTablesdoCardapio(tx);
	
}

// Tabelas referente ao cardapio e conta.
function createTablesdoCardapio(tx){
	
	////////////////////////////////////////////Pessoas//////////////////////////////////////
	// Table Pessoas
	tx.executeSql('DROP TABLE IF EXISTS Pessoas');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, associado_pedido TEXT, ativo TEXT, contaConjunto TEXT)');
	
	 ////////////////////////////////////////////Pedido//////////////////////////////////////
	// Table Pedido
	tx.executeSql('DROP TABLE IF EXISTS Pedido');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, mesa TEXT ,  pessoa TEXT ,  observacao TEXT ,id_produto INTEGER, nome_produto TEXT ,  preco_produto TEXT,  quantidade TEXT, status TEXT, nid TEXT, nome_produto_portugues TEXT, categoria_produto TEXT)');
	
}

/*
 * Faz os inserts
 */
var testeProdutoErro;
function insertTable(nomeTable){
	
	if(nomeTable == "home"){
		
		 db.transaction(function(tx) {
			 quantidadeRegistros = quantidadeRegistros - 1;
             tx.executeSql('INSERT INTO Home(logo,background) VALUES ("' + homeForm.logo + '", "' + homeForm.background + '")');
             testeProdutoErro = "background" + homeForm.logo;
             },errorCB,successInsert);
		
		console.log('INSERT INTO Home(logo,background) VALUES ("' + homeForm.logo + '", "' + homeForm.background + '")');
		
	}else if (nomeTable == "languages") {
		
		db.transaction(function(tx) {
			for(i=0; i < arrayLanguagesForm.length;i++){
				 quantidadeRegistros = quantidadeRegistros - 1;                             
			console.log('INSERT INTO Languages(nome,image) VALUES ("' + arrayLanguagesForm[i].title + '", "' + arrayLanguagesForm[i].image + '")');
		    tx.executeSql('INSERT INTO Languages(nome,image) VALUES ("' + arrayLanguagesForm[i].title + '", "' + arrayLanguagesForm[i].image + '")');
		    
			}
            },errorCB,successInsert);
	
	

           }else if (nomeTable == "icones") {
		
			db.transaction(function(tx) {
				for(i=0; i < arrayIconesForm.length;i++){
					console.log("legaleim "+i);
				console.log("legaleim"+arrayIconesForm[i].title);
				console.log("legaleim"+arrayIconesForm[i].image);
			    console.log("DebugMeud-Insert" + arrayIconesForm[i].title);
			    console.log('INSERT INTO Icones(title,image) VALUES ("' + arrayIconesForm[i].title + '", "' + arrayIconesForm[i].image + '")');
			    quantidadeRegistros = quantidadeRegistros - 1;
			    if(i=0){
	            tx.executeSql('INSERT INTO Icones(title,image,icone_cardapio_english,icone_cardapio_spanish,icone_cardapio_french) VALUES ("' + arrayIconesForm[i].title + '", "' + arrayIconesForm[i].image + '", "' + title_lenguage_cardapio_Form.icone_cardapio_english + '", "' + title_lenguage_cardapio_Form.icone_cardapio_spanish + '", "' + title_lenguage_cardapio_Form.icone_cardapio_french + '")');
			    }else{
			    	tx.executeSql('INSERT INTO Icones(title,image) VALUES ("' + arrayIconesForm[i].title + '", "' + arrayIconesForm[i].image + '")');
			    }
	            testeProdutoErro = "icones" + arrayIconesForm[i].title;
				}
	            },errorCB,successInsert);
		
		
	
	}else if (nomeTable == "propagandas") {
		console.log('INSERT INTO Propaganda(image) VALUES ("' + propagandasForm.image + '")');
		
		db.transaction(function(tx) {
			for(i=0;i<arrayPropagandasForm.length;i++){
			console.log('INSERT INTO Propaganda(image) VALUES ("' + arrayPropagandasForm[i].image + '")');
			quantidadeRegistros = quantidadeRegistros - 1;
            tx.executeSql('INSERT INTO Propaganda(image) VALUES ("' + arrayPropagandasForm[i].image + '")');
            testeProdutoErro = "propagandas" + arrayPropagandasForm[i].image;
			}
            },errorCB,successInsert);
	}else if (nomeTable == "categorias") {
		db.transaction(function(tx) {
			var teste = arrayCategorias.length;
			for(i=0;i<arrayCategorias.length;i++){
				
				quantidadeRegistros = quantidadeRegistros - 1;
				console.log('INSERT INTO Categorias(title,language,title_comum) VALUES ("' + arrayCategorias[i].title + '","'+arrayCategorias[i].language+'","'+arrayCategorias[i].title_comum+'")');
				tx.executeSql('INSERT INTO Categorias(title,language,title_comum) VALUES ("' + arrayCategorias[i].title + '","'+arrayCategorias[i].language+'","'+arrayCategorias[i].title_comum+'")');
			}
            },errorCB,successInsert);
		
	}else if (nomeTable == "produtos") {
        console.log("insertProdutos")
		db.transaction(function(tx) {
			
			for(i=0;i<arrayProdutos.length;i++){
				console.log("nid ae genteeeeeeeeeeeeeee \o"+arrayProdutos[i].nid);
				quantidadeRegistros = quantidadeRegistros - 1;
								tx
										.executeSql('INSERT INTO Produtos(title,previa_descricao,preco,descricao,descricao_saiba_mais,categoria,image,title_comum,language,nid) VALUES ("'
												+ arrayProdutos[i].title
												+ '","'
												+ arrayProdutos[i].previa_descricao
												+ '","'
												+ arrayProdutos[i].preco
												+ '","'
												+ arrayProdutos[i].descricao
												+ '","'
												+ arrayProdutos[i].descricao_saiba_mais
												+ '","'
												+ arrayProdutos[i].categoria
												+ '","'
												+ arrayProdutos[i].image 
												+ '","'
												+ arrayProdutos[i].title_comum 
												+ '","'
												+ arrayProdutos[i].language
												+ '","'
												+ arrayProdutos[i].nid +
												'" )');
								testeProdutoErro = "produtos" + arrayProdutos[i].title;
			}
            },errorCB,successInsert);
		
	}else if (nomeTable == "sleep-propagandas") {
		db.transaction(function(tx) {
			for(i=0;i<arrayPropagandas.length;i++){
			console.log('INSERT INTO Propagandas(image) VALUES ("' + arrayPropagandas[i] + '")');
			quantidadeRegistros = quantidadeRegistros - 1;
            tx.executeSql('INSERT INTO Propagandas(image) VALUES ("' + arrayPropagandas[i] + '")');
			}
            },errorCB,successInsert);
		
	}else if (nomeTable == "labels") {
		db.transaction(function(tx) {
			for(i=0;i<arrayLabels.length;i++){
			quantidadeRegistros = quantidadeRegistros - 1;
			console.log('INSERT INTO Labels(valor,language,valor_english,valor_spanish,valor_french,categoria_label) VALUES ("' + arrayLabels[i].valor + '","'+ arrayLabels[i].language +'","'+ arrayLabels[i].valor_english + '","' + arrayLabels[i].valor_spanish + '","' + arrayLabels[i].valor_french + '","' + arrayLabels[i].categoria_label + '")');
            tx.executeSql('INSERT INTO Labels(valor,language,valor_english,valor_spanish,valor_french,categoria_label) VALUES ("' + arrayLabels[i].valor + '","'+ arrayLabels[i].language +'","' + arrayLabels[i].valor_english + '","' + arrayLabels[i].valor_spanish + '","' + arrayLabels[i].valor_french + '","' + arrayLabels[i].categoria_label + '")');
			}
            },errorCB,successInsert);
	}
	
}

//Método de erro sqLite
function errorCB(err) {
	console.log('testeErroInsertErrorCB '+ testeProdutoErro);
    alert("Error processing SQL: "+err.code);
    alert("Error processing SQL: "+err);
    console.log(err);
}

//function will be called when process succeed
function successCB(tx,result) {
  
}

function successInsert(){
	//quantidadeRegistros = quantidadeRegistros - 1;
	console.log('dentro success'+ quantidadeRegistros);
	if(quantidadeRegistros < 1){
		db.transaction(montaHome,errorCB);
		db.transaction(function(tx){
		tx.executeSql('SELECT DISTINCT title_comum FROM Produtos',[],atualizaImageProdutosLanguage,errorCB);
		},errorCB);
	}
}

function setLabels(){
	db.transaction(function(tx){
		
		// btn_home
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_home" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_home = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_fechar_conta
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_fechar_conta" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_fechar_conta = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_meu_pedido
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_meu_pedido" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_meu_pedido = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_chamar_garcom
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_chamar_garcom" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_chamar_garcom = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_cancelar
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_cancelar" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_cancelar = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_adicionar
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_adicionar" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_adicionar = result.rows.item(0).valor;
			}
		},errorCB);
		
		// title_pessoas_da_mesa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "title_pessoas_da_mesa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.title_pessoas_da_mesa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_adicionar_pessoa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_adicionar_pessoa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_adicionar_pessoa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_conta_conjunto
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_conta_conjunto" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_conta_conjunto = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_produto
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_produto" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_produto = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_observacao_pedido
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_observacao_pedido" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_observacao_pedido = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_excluir
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_excluir" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_excluir = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_editar
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_editar" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_editar = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_excluir_pessoa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_excluir_pessoa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_excluir_pessoa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_nao
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_nao" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_nao = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_sim
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_sim" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_sim = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_favor_selecionar_pessoa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_favor_selecionar_pessoa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_favor_selecionar_pessoa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// OK
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_ok" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.OK = result.rows.item(0).valor;
			}
		},errorCB);
		
		// title_pedidos_da_mesa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "title_pedidos_da_mesa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.title_pedidos_da_mesa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_adicionar_mais_itens
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_adicionar_mais_itens" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_adicionar_mais_itens = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_efetuar_pedido
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_efetuar_pedido" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_efetuar_pedido = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_observacao
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_observacao" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_observacao = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_excluir_pedido
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_excluir_pedido" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_excluir_pedido = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_efetuar_pedido
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_efetuar_pedido" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_efetuar_pedido = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_pedido_atendido
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_pedido_atendido" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_pedido_atendido = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_pedido_efetuado
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_pedido_efetuado" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_pedido_efetuado = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_chamar_garcon
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_chamar_garcon" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_chamar_garcon = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_garcon_atendelo
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_garcon_atendelo" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_garcon_atendelo = result.rows.item(0).valor;
			}
		},errorCB);
		
		// title_total
		tx.executeSql('SELECT * FROM Labels where categoria_label = "title_total" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.title_total = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_total_mesa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_total_mesa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_total_mesa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_fechar_conta_individual
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_fechar_conta_individual" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_fechar_conta_individual = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_confirmar_pagamento
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_confirmar_pagamento" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_confirmar_pagamento = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_fechar_conta_da_mesa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_fechar_conta_da_mesa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_fechar_conta_da_mesa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_experimentar_sobremesa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_experimentar_sobremesa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_experimentar_sobremesa = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_fechar_conta
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_fechar_conta" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_fechar_conta = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_confirmar_pagamento_para
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_confirmar_pagamento_para" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_confirmar_pagamento_para = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_mesa_contem_pendentes
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_mesa_contem_pendentes" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_mesa_contem_pendentes = result.rows.item(0).valor;
			}
		},errorCB);
		
		// alert_sem_pedidos_no_momento
		tx.executeSql('SELECT * FROM Labels where categoria_label = "alert_sem_pedidos_no_momento" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.alert_sem_pedidos_no_momento = result.rows.item(0).valor;
			}
		},errorCB);
		
		// label_aguardando_pagamento
		tx.executeSql('SELECT * FROM Labels where categoria_label = "label_aguardando_pagamento" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.label_aguardando_pagamento = result.rows.item(0).valor;
			}
		},errorCB);
		
		// btn_limpar_dados_da_mesa
		tx.executeSql('SELECT * FROM Labels where categoria_label = "btn_limpar_dados_da_mesa" and language="'+constLanguageSelected+'"',[],function(tx,result){
			if(result.rows.length > 0){
				ObjectLabels.btn_limpar_dados_da_mesa = result.rows.item(0).valor;
			}
		},errorCB);
		
	},errorCB);
}

function retornaIconeLenguage(language){
	
}

/*
 * Método que faz requisição ajax.
 */
function getAjax(url) {

	return $.ajax({
		async : false,
		url : url,
		crossDomain : true,
		dataType : 'jsonp',
		error : function(jqXHR, textStatus, errorThrown) {
			alert('erro ajax: ' + url);
			console.log('erro ajax: ' + url);
		}
	});

}

function postAjax(url,data){

	db.transaction(function(tx){
	tx.executeSql('SELECT * FROM Connection ',[],function(tx,result){
		 if(result.rows.length != 0){
			 connectionWIFI = result.rows.item(0).connectionWIFI;
			 if (connectionWIFI != "") {
					if (connectionWIFI == "connectionTrue") {
						return $.ajax({
							dataType:'json',
							url : url,
							type : "post",
							crossDomain: true,
							data : data,
							converters: {
						        "text json": function(value) {
						            console.log("pre-processing...");
						            /* do stuff */
						            return value;
						        }
						    },
						    success : function(data) {

								console.log('postAjax Success');

							},
						    
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
							}
						});
						
					} else {
						return null;
					}
				}
		 }
	   },errorCB);
	},errorCB);
	
}

function putAjax(url,data){
	$.ajax({
		url : url,
		type : "put",
		data : data,
		
		dataType:'json',
		contentType: 'application/x-www-form-urlencoded',
		converters: {
	        "text json": function(value) {
	            console.log("pre-processing...");
	            /* do stuff */
	            return value;
	        }
	    },
	    
	    success : function(data) {

			alert('sucess');

		},
		
		error : function(jqXHR, textStatus, errorThrown) {
			alert('error');
			alert(textStatus);
			alert(errorThrown);
			console.log(jqXHR);
		}
	});

}

function inatividade() {
	if(contador == 50) {
		//alert('chamouPropaganda');
		//window.location = 'propagandas.html';
			$('#propagandas').load('propagandas.html');
			$('#geral').hide();
			$('#propagandas').show();
		
	}
	if (contador != 50){
		contador = contador+1;
		//alert(contador);
		setTimeout("inatividade()", 1000);
	}
}


function zerarInatividade(){
	console.log("zerarInatividade");
	contador = 0;
}

$(document).ready(function(){
	
});



function Mock(){
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Home(logo,background) VALUES ("img/logo.jpg", "img/background3.jpg")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Icones(title,image) VALUES ("title1", "img/cardapio.jpg")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Icones(title,image) VALUES ("title2", "img/galeria.png")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Icones(title,image) VALUES ("title3", "img/chat.png")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Propaganda(image) VALUES ("img/prop1.jpg")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Propaganda(image) VALUES ("img/prop2.jpg")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Propaganda(image) VALUES ("img/prop3.jpg")');
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Produtos(categoria,title,preco,descricao) VALUES ("OUTROS","teste","15.95","testeteteetettetetetdfffffffffffffffffffffffff fffffffffffffffffffffffffffffffffffffff fffffffffffffffffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffffffffffffffffffffet fffffffffffffffet fffffffffffffffet fffffffffffffffet fffffffffffffffet fffffffffffffffet fffffffffffffffet fffffffffffffffet fffffffffffffffff ffffffffffffffffffffffffffffffffffffff fffffffffffffffffffffffff ffffffffffffffffffffffffffff fffffffffffffffffffffffffffff ffffffffffffffffffffffffffff ffffffffffffffffffffffffffff fffffffffffffffffffffffffffff ffffffffffffffffffffffffffffffffffffffff ffffffffffffffffffffffffffffffff fffffffffffffffffffffffffffffffffffffffff fffffffffffffffffffffffffffffet fffffffffffffffet fffffffffffffffet")');
        
        },errorCB, successInsert);
	
	db.transaction(function(tx) {
        tx.executeSql('INSERT INTO Categorias(title) VALUES ("OUTROS")');
        
        },errorCB, successInsert);
	//db.transaction(montaHome,errorCB);
	//db.transaction(testeSelect,errorCB);
	
	
	
}

function testeSelect(tx){
	tx.executeSql('SELECT * FROM Produtos where categoria = "OUTROS"',[],successCB,errorCB);
}
