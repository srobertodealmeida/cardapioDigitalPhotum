
// Variaveis globais

var ipServidorDrupal = "http://192.168.0.102/drupal-7.20/?q=rest";
var urlViewConfig = ipServidorDrupal + "/views/configuracao";
var urlViewHome = ipServidorDrupal + "/views/view_home";
var pathAplicativo = "/CardapioPhotum";
var rulFullImage = "" ;
var nomeTable = "";
var logo = false;
var background = false;
var sucessBanco = false;
var qtdIcones = 0;
var qtdPropaganda = 0;
var sucessDadosDrupal = true;
var db = window.openDatabase("CardapioDigital", "1.0", "Just a Dummy DB", 200000);
var quantidadeRegistros = 1;//Quantidade total de registros , usado para saber quando terminou os registros(valor começa com 2 por causa do background e logo)
function init(){
	

	console.log("arrayMeu"+arrayIconesForm);
	
	console.log("antes sucessDadosDrupal" + homeForm.icones);
	if(sucessDadosDrupal == true){
		console.log("sucessDadosDrupal" + homeForm.icones);
	db.transaction(populateDB, errorCB, successCB);
	}
}


function getDadosDrupal(tx){
	
	/////////////////////////////////////////////////////////////////////HOME///////////////////////////////////////////////////////
	var ajax = getAjax(urlViewHome);
	
	var titleIcone ="";
	
	ajax.success(function (data) {
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
		     
		     downloadImages(url,pathDestino,tx,titleIcone,typeImagen); //faz donwload da imagen;
		     
		     
		     //////////////////Logo//////////////////////
		     
		     var url = $.parseHTML(val.logo); //pega apenas href
		     var urlString = url.toString();
		     var extencao =  urlString.substr(urlString.length - 3);
		     var pathDestino = pathAplicativo + "/home/logo." + extencao; // url onde será salvo a imagen
		     var typeImagen = "logo";
		     
		     downloadImages(url,pathDestino,tx,titleIcone,typeImagen); //faz donwload da imagen;
		     
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
				  downloadImages(url,pathDestino,tx,titleIcone,typeImagen); //faz donwload da imagen;
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
					  downloadImages(url,pathDestino,tx,titleIcone,typeImagen); //faz donwload da imagen;
			   });
			  
	     });
     });
	
	ajax.error(function (jqXHR, textStatus, errorThrown) {
		sucessDadosDrupal = false;
	});
	
}

/*
 * Método que faz download das imagense faz inserts
 */
function downloadImages(url,pathDestino,tx,titleIcone,typeImagen){
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
    	    	  salvaPathImagen(typeImagen,imagePath,tx,titleIcone);
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
function salvaPathImagen(typeImagen,imagePath,tx,titleIcone){
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
	//quantidadeRegistros = 7;
	//Mock();
	getDadosDrupal(tx);
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
		$("#SwapView-icones").html("<div id=\"itemIcones-" + i + "\" class=\"mblCarouselItem itemCarrosel mblCarouselSlot\"><a href=\"template1Ios.html\" ><div class=\"sh_bottom\"></div><div class=\"mblCarouselItemHeaderText\"></div><img class=\"mblCarouselItemImage\" src=\""+result.rows.item(i).image+"\" style=\"height: 96px;\"><div class=\"mblCarouselItemFooterText\">"+ result.rows.item(i).title +"  </div></a></div>");
		}else{
			var idAnterior = i-1;
			$("<div id=\"itemIcones-" + i + "\" class=\"mblCarouselItem itemCarrosel mblCarouselSlot\"><a href=\"template1Ios.html\" ><div class=\"sh_bottom\"></div><div class=\"mblCarouselItemHeaderText\"></div><img class=\"mblCarouselItemImage\" src=\""+result.rows.item(i).image+"\" style=\"height: 96px;\"><div class=\"mblCarouselItemFooterText\">"+ result.rows.item(i).title +"</div></a></div>").insertAfter('#itemIcones-'+ idAnterior);
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
 * Faz os inserts
 */
function insertTable(nomeTable){
	
	
	
	if(nomeTable == "home"){
		
		 db.transaction(function(tx) {
			 quantidadeRegistros = quantidadeRegistros - 1;
             tx.executeSql('INSERT INTO Home(logo,background) VALUES ("' + homeForm.logo + '", "' + homeForm.background + '")');
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
				}
	            },errorCB,successInsert);
		
		
	
	}else if (nomeTable == "propagandas") {
		console.log('INSERT INTO Propaganda(image) VALUES ("' + propagandasForm.image + '")');
		
		db.transaction(function(tx) {
			for(i=0;i<arrayPropagandasForm.length;i++){
			console.log('INSERT INTO Propaganda(image) VALUES ("' + arrayPropagandasForm[i].image + '")');
			quantidadeRegistros = quantidadeRegistros - 1;
            tx.executeSql('INSERT INTO Propaganda(image) VALUES ("' + arrayPropagandasForm[i].image + '")');
			}
            },errorCB,successInsert);
	}
	
}





//Método de erro sqLite
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
    alert("Error processing SQL: "+err);
    console.log('errorCodevamosver',err);
}

//function will be called when process succeed
function successCB() {
	sucessBanco = true;
}

function successInsert(){
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
	
}
