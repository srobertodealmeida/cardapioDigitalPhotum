
// Variaveis globais

var ipServidorDrupal = "http://192.168.0.105/drupal-7.20/?q=rest";
var urlViewConfig = ipServidorDrupal + "/views/configuracao";
var urlViewHome = ipServidorDrupal + "/views/view_home";
var pathAplicativo = "/CardapioPhotum";
var rulFullImage = "" ;

var sucessBanco = false;
var sucessDadosDrupal = true;


function init(){
	
	
	console.log("antes sucessDadosDrupal" + homeForm.icones);
	if(sucessDadosDrupal == true){
		console.log("sucessDadosDrupal" + homeForm.icones);
	var db = window.openDatabase("CardapioDigital", "1.0", "Just a Dummy DB", 200000);
	db.transaction(populateDB, errorCB, successCB);
	}
}


function getDadosDrupal(tx){
	
	
	
	
	/////////////////////////////////////////////////////////////////////HOME///////////////////////////////////////////////////////
	var ajax = getAjax(urlViewHome);
	
	var titleIcone ="";
	
	ajax.success(function (data) {
	  $.each(data, function(key, val) {
		  
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
		     
		     
		      var arrayIconesAux =    val.icones.split(',');
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
			
			  var arrayPropagandasAux =    val.propaganda.split(',');
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
 * Método que faz download das imagens
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
		
		console.log("form background" + homeForm.background);
	}else if (typeImagen == "logo") {
		homeForm.logo = imagePath;
		console.log("form logo" + homeForm.logo);
	}else if (typeImagen == "icones") {
		iconesForm.image = imagePath;
		iconesForm.title = titleIcone
		insertTable(tx,"icones");
		console.log("form icones" + homeForm.icones);
	}else if (typeImagen == "propagandas") {
		propagandasForm.image = imagePath;
		insertTable(tx,"propagandas");
		console.log("form propagandas" + propagandasForm.image);
	}
	
	if(homeForm.background != "" && homeForm.logo != ""){
		insertTable(tx,"home");
	}
	
	
}

/*
 * Método que cria e faz insert nas tabelas.
 */
function populateDB(tx) {
	console.log("populateDB" + homeForm.icones);
	createTable(tx);
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

/*
 * Faz os inserts
 */
function insertTable(tx,nome){
	if(nome == "home"){
		console.log('INSERT INTO Home(logo,background) VALUES ("' + homeForm.logo + '", "' + homeForm.background + '")');
		tx.executeSql('INSERT INTO Home(logo,background) VALUES ("' + homeForm.logo + '", "' + homeForm.background + '")');	
		
	}else if (nome == "icones") {
		console.log('INSERT INTO Icones(title,image) VALUES ("' + iconesForm.title + '", "' + iconesForm.image + '")');
		tx.executeSql('INSERT INTO Icones(title,image) VALUES ("' + iconesForm.title + '", "' + iconesForm.image + '")');	
	
	}else if (nome == "propagandas") {
		console.log('INSERT INTO Propaganda(image) VALUES ("' + propagandasForm.image + '")');
		tx.executeSql('INSERT INTO Propaganda(image) VALUES ("' + propagandasForm.image + '")');	
	}
}

//Método de erro sqLite
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
    alert("Error processing SQL: "+err);
}

//function will be called when process succeed
function successCB() {
	sucessBanco = true;
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
