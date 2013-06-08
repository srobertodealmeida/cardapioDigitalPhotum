
// Variaveis globais

var ipServidorDrupal = "http://192.168.0.103/drupal-7.20/?q=rest";
var urlViewConfig = ipServidorDrupal + "/views/configuracao";
var urlViewHome = ipServidorDrupal + "/views/view_home";
var urlViewCategoria = ipServidorDrupal + "/views/categoria_all";
var urlViewProdutos = ipServidorDrupal + "/views/produtos_all";
var urlViewMesas = ipServidorDrupal + "/views/mesa_all";
var pathAplicativo = "/CardapioPhotum";


var rulFullImage = "" ;
var nomeTable = "";
var logo = false;
var background = false;
var sucessBanco = false;
var versaoAtual = 0;
var qtdIcones = 0;
var qtdPropaganda = 0;
var qtdProdutos = 0;
var sucessDadosDrupal = true;
var db = window.openDatabase("CardapioDigital", "1.0", "Just a Dummy DB", 200000);
var quantidadeRegistros = 1;//Quantidade total de registros , usado para saber quando terminou os registros(valor começa com 2 por causa do background e logo)


function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	$("#preloader").fadeOut(1000);
    //document.addEventListener("pause", onPause, false);
}

/**
function onResume() {
	alert('resume');
}

function onPause() {
	alert('pause');
}
*/


function init(versao){
	versaoAtual = versao;

	console.log("arrayMeu"+arrayIconesForm);
	
	console.log("antes sucessDadosDrupal" + homeForm.icones);
	if(sucessDadosDrupal == true){
		console.log("sucessDadosDrupal" + homeForm.icones);
	    db.transaction(populateDB, errorCB, successCB);
	}
}


function getDadosDrupal(tx){
	
	
	/////////////////////////////////////////////////////////////////////HOME///////////////////////////////////////////////////////
	var ajaxHome = getAjax(urlViewHome);
	
	var titleIcone ="";
	
	 var produtosFormVazio = {
			title:"",
			previa_descricao:"",
			preco:"",
			descricao:"",
			descricao_saiba_mais:"",
			categoria:"",
			image:""
      };
	
	
	ajaxHome.success(function (data) {
	  $.each(data, function(key, val) {
		     
		     var arrayIconesAux =    val.icones.split(',');
		     var arrayPropagandasAux =    val.propaganda.split(',');
		     qtdIcones = arrayIconesAux.length;
		     qtdPropaganda = arrayPropagandasAux.length;
		     quantidadeRegistros += arrayIconesAux.length + arrayPropagandasAux.length;
		     console.log('testeTamanhoArrays',"" + quantidadeRegistros);
		     

		     ///////////////Background//////////
		  
		     var url = $.parseHTML(val.background); //pega apenas href
		     var urlString = url.toString();
		    
		     var extencao =  urlString.substr(urlString.length - 3);
		     var pathDestino = pathAplicativo + "/home/background." + extencao; // url onde será salvo a imagen
		     var typeImagen = "background";
		     
		     downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio); //faz donwload da imagen;
		     
		     
		     //////////////////Logo//////////////////////
		     
		     var url = $.parseHTML(val.logo); //pega apenas href
		     var urlString = url.toString();
		     var extencao =  urlString.substr(urlString.length - 3);
		     var pathDestino = pathAplicativo + "/home/logo." + extencao; // url onde será salvo a imagen
		     var typeImagen = "logo";
		     
		     downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio); //faz donwload da imagen;
		     
             //////////////////Icones//////////////////////
		     
			  $.each(arrayIconesAux, function(key1, val1) {
				  
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
				  downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio); //faz donwload da imagen;
			  });
	    	
			//////////////////////Propagandas///////////////////////////
			
			  
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
					  downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosFormVazio); //faz donwload da imagen;
			   });
			  
	     });
     });
	
	ajaxHome.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
	});
	
	/////////////////Categoria/////////////////////////////////////
	
    var ajaxCategoria = getAjax(urlViewCategoria);
	
	ajaxCategoria.success(function (data) {
		$.each(data, function(key, val) {
			  console.log(val);
			  arrayCategorias.push(val.node_title);
			  
		  });
		  quantidadeRegistros += arrayCategorias.length;
		  insertTable("categorias");
		  
    });
	
	ajaxCategoria.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
	
   /////////////////////Produtos/////////////////////////////////////
	
    var ajaxProdutos = getAjax(urlViewProdutos);
	
    ajaxProdutos.success(function (data) {
    	  qtdProdutos = data.length;  
    	  quantidadeRegistros += qtdProdutos;
		  $.each(data, function(key, val) {
			  
			  var produtosForm = {
						title:"",
						previa_descricao:"",
						preco:"",
						descricao:"",
						descricao_saiba_mais:"",
						categoria:"",
						image:""
			  };
			  produtosForm.title = val.node_title;
			  produtosForm.previa_descricao = val.previa_descricao;
			  produtosForm.preco = val.preco;
			  produtosForm.descricao = val.descricao;
			  produtosForm.descricao_saiba_mais = val.descricao_saiba_mais;
			  produtosForm.categoria = val.categoria;
			  
			  var url = $.parseHTML(val.imagem); //pega apenas href
			  var urlString = url.toString();
			  var extencao =  urlString.substr(urlString.length - 3);
			  var pathDestino = pathAplicativo + "/home/produto." + key  + "."+ extencao; // url onde será salvo a imagen
			  var typeImagen = "produtos";
			  
			  downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosForm); //faz donwload da imagen;
			  
			 
			  
    });
		  
    });
	
    ajaxProdutos.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
		alert('error');
	});
	
    
}

/*
 * Método que faz download das imagense faz inserts
 */
function downloadImages(url,pathDestino,tx,titleIcone,typeImagen,produtosForm){
    var fileTransfer = new FileTransfer();
    var url = encodeURI(url);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    	      var imagePath = fs.root.fullPath + pathDestino; // full file path
    	      var fileTransfer = new FileTransfer();
    	      
    	      
    	      fileTransfer.onprogress = function(progressEvent) {
    	          if (progressEvent.lengthComputable) {
    	            loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
    	          } else {
    	            loadingStatus.increment();
    	          }
    	      };
    	      fileTransfer.download(url, imagePath, function (entry) {
    	    	  console.log("download complete: " + entry.fullPath); // entry is fileEntry object
    	    	  salvaPathImagen(typeImagen,imagePath,tx,titleIcone,produtosForm);
    	      }, function (error) {
    	    	  sucessDadosDrupal = false;
    	    	  console.log("download error source " + error.source);
                  console.log("download error target " + error.target);
                  console.log("upload error code" + error.code);
    	      },true
    	      );
    	      
    	   })
}

// Método que salva path da imagem no form
function salvaPathImagen(typeImagen,imagePath,tx,titleIcone,produtosForm){
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
	}
	
	if(background == true && logo == true){
		insertTable("home");
		background = false;
		logo = false;
	}
	
	
}

/*
 * Método que cria e faz insert nas tabelas.
 */
function populateDB(tx) {
	console.log("populateDB" + homeForm.icones);
	createTable(tx);
	quantidadeRegistros = 7;
	Mock();
	
   //getDadosDrupal(tx);
}

function montaHome(tx){
	tx.executeSql('SELECT * FROM Home',[],montaBackgroundLogo,errorCB);
	tx.executeSql('SELECT * FROM Icones',[],montaIcones,errorCB);
	
	tx.executeSql('SELECT * FROM Propaganda',[],montaPropaganda,errorCB);
}

function montaBackgroundLogo(tx,result){
	for(var i=0;i<result.rows.length;i++){
    	
		$("#background-home").attr('src', "" + result.rows.item(i).background);
		$("#logo-home").attr('src', "" + result.rows.item(i).logo);
		
		console.log(result.rows.item(i).logo);
		console.log(result.rows.item(i).background);
		
    }
	
}

function montaIcones(tx,result){
	
	console.log("Fora iamgesicones: " + result.rows.item(0).image);
	console.log("Fora iamgesicones: " + result.rows.item(1).image);
	console.log("Fora iamgesicones: " + result.rows.item(2).image);
	for(var i=0;i<result.rows.length;i++){
		console.log("iamgesicones: " + result.rows.item(i));
		console.log("iamgesicones: " + result.rows.item(i).image);
		if(i==0){
		$("#SwapView-icones").html("<div id=\"itemIcones-" + i + "\" class=\"mblCarouselItem itemCarrosel mblCarouselSlot\"><a href=\"cardapio.html\" ><div class=\"sh_bottom\"></div><div class=\"mblCarouselItemHeaderText\"></div><img class=\"mblCarouselItemImage\" src=\""+result.rows.item(i).image+"\" style=\"height: 96px;\"><div class=\"mblCarouselItemFooterText\">"+ result.rows.item(i).title +"  </div></a></div>");
		}else{
			var idAnterior = i-1;
			$("<div id=\"itemIcones-" + i + "\" class=\"mblCarouselItem itemCarrosel mblCarouselSlot\"><a href=\"cardapio.html\" ><div class=\"sh_bottom\"></div><div class=\"mblCarouselItemHeaderText\"></div><img class=\"mblCarouselItemImage\" src=\""+result.rows.item(i).image+"\" style=\"height: 96px;\"><div class=\"mblCarouselItemFooterText\">"+ result.rows.item(i).title +"</div></a></div>").insertAfter('#itemIcones-'+ idAnterior);
		}
		
    	console.log(result.rows.item(i));
    }
	
}

function montaPropaganda(tx,result){
	
	for(var i=0;i<result.rows.length;i++){
		$("#foo").append('<img src="'+result.rows.item(i).image+'" width="940" height="150"/> ')
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

/*
 * Cria tabelas.
 */
function createTable(tx){
	
	////////////////////////HOME//////////////////////////////////

	// Table home (logo/background)
	tx.executeSql('DROP TABLE IF EXISTS Home');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Home (id INTEGER PRIMARY KEY AUTOINCREMENT, logo TEXT NOT NULL, background TEXT NOT NULL)');
	
	console.log('create_tx',tx);
	
	// Table home (icones)
	tx.executeSql('DROP TABLE IF EXISTS Icones');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Icones (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, image TEXT NOT NULL)');
	
	// Table home (propaganda)
	tx.executeSql('DROP TABLE IF EXISTS Propaganda');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Propaganda (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT NOT NULL)');
	
    ////////////////////////////////////////////Categorias//////////////////////////////////////
	// Table cATEGORIAS
	tx.executeSql('DROP TABLE IF EXISTS Categorias');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)');
	
    ////////////////////////////////////////////Produtos//////////////////////////////////////
	// Table Produtos
	tx.executeSql('DROP TABLE IF EXISTS Produtos');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT , previa_descricao TEXT , preco TEXT , descricao TEXT , descricao_saiba_mais TEXT ,  categoria TEXT , image TEXT )');
	
	////////////////////////////////////////////Pessoas//////////////////////////////////////
	// Table Mesa
	tx.executeSql('DROP TABLE IF EXISTS Pessoas');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, associado_pedido TEXT)');
	
    ////////////////////////////////////////////Pedido//////////////////////////////////////
	// Table Mesa
	tx.executeSql('DROP TABLE IF EXISTS Pedido');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, mesa TEXT ,  pessoa TEXT ,  observacao TEXT ,id_produto INTEGER, nome_produto TEXT ,  preco_produto TEXT,  quantidade TEXT, status TEXT )');
	
	
	////////////////////////////////////////////CONFIG//////////////////////////////////////
	// Table Config ()
	tx.executeSql('CREATE TABLE IF NOT EXISTS Config (id INTEGER PRIMARY KEY AUTOINCREMENT, versao TEXT NOT NULL)');
	tx.executeSql('INSERT INTO Config(versao) VALUES ("'+versaoAtual+'")');
	
	
	
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
		
	}else if (nomeTable == "icones") {
		
		
		
			db.transaction(function(tx) {
				for(i=0; i < arrayIconesForm.length;i++){
					console.log("legaleim "+i);
				console.log("legaleim"+arrayIconesForm[i].title);
				console.log("legaleim"+arrayIconesForm[i].image);
			    console.log("DebugMeud-Insert" + arrayIconesForm[i].title);
			    console.log('INSERT INTO Icones(title,image) VALUES ("' + arrayIconesForm[i].title + '", "' + arrayIconesForm[i].image + '")');
			    quantidadeRegistros = quantidadeRegistros - 1;
	            tx.executeSql('INSERT INTO Icones(title,image) VALUES ("' + arrayIconesForm[i].title + '", "' + arrayIconesForm[i].image + '")');
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
        console.log("insertCategoria")
		db.transaction(function(tx) {
		    console.log("transactionCategoria");
			var teste = arrayCategorias.length;
			  console.log("arrayCategorias "+ teste);
			for(i=0;i<arrayCategorias.length;i++){
				console.log('INSERT INTO Categorias(title) VALUES ("' + arrayCategorias[i] + '")');
				quantidadeRegistros = quantidadeRegistros - 1;
				tx.executeSql('INSERT INTO Categorias(title) VALUES ("' + arrayCategorias[i] + '")');
				testeProdutoErro = "categorias" + arrayPropagandasForm[i];
			}
            },errorCB,successInsert);
		
	}else if (nomeTable == "produtos") {
        console.log("insertProdutos")
		db.transaction(function(tx) {
			
			for(i=0;i<arrayProdutos.length;i++){
				console.log('INSERT INTO Produtos(title,previa_descricao,preco,descricao,descricao_saiba_mais,categoria,image) VALUES ("'
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
						+ arrayProdutos[i].image +
						'" )');
				quantidadeRegistros = quantidadeRegistros - 1;
								tx
										.executeSql('INSERT INTO Produtos(title,previa_descricao,preco,descricao,descricao_saiba_mais,categoria,image) VALUES ("'
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
												+ arrayProdutos[i].image +
												'" )');
								testeProdutoErro = "produtos" + arrayProdutos[i].title;
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
    for(var i=0;i<result.rows.length;i++){
    	console.log(result.rows.item(i));
		$("#background-home").attr('src', "" + result.rows.item(i).background);
		$("#logo-home").attr('src', "" + result.rows.item(i).logo);
    }
    
	sucessBanco = true;
}

function successInsert(){
	//quantidadeRegistros = quantidadeRegistros - 1;
	console.log('testeErroInsert '+ testeProdutoErro);
	console.log('dentro success'+ quantidadeRegistros);
	if(quantidadeRegistros < 1){
		db.transaction(montaHome,errorCB);
	}
}

/*
 * Método que faz requisição ajax.
 */
function getAjax(url){
	
	return $.ajax({
	      async: false,
	      url: url,
	      crossDomain: true,
	      dataType: 'jsonp',
	      jsonp: 'callback',
	      error: function(jqXHR, textStatus, errorThrown){
	        alert('erro ajax: '+ url);
	    	console.log('erro ajax: '+ url);
	      }
	});
	
}

function postAjax(url,data){
	$.ajax({
		
		dataType:'application/json',
		url : url,
		type : "POST",
		data : data,
		
		// as specied in web service doc
		success : function(data) {

			alert('sucess');

		},
		error : function(data) {
			console.log(data);
		}
	});
}

function putAjax(url,data){
	$.ajax({
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		url : url,
		type : "put",
		data : data,
		
		// as specied in web service doc
		success : function(data) {

			alert('sucess');

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
	        console.log(JSON.stringify(XMLHttpRequest));
	        console.log(JSON.stringify(textStatus));
	        console.log(JSON.stringify(errorThrown));
	      },
	});

}

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
        tx.executeSql('INSERT INTO Produtos(categoria,title,preco) VALUES ("OUTROS","teste","4.50")');
        
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
