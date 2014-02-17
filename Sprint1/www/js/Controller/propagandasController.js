var arrayPropagandasLoop = new Array();
var arrayPropagandasRestauranteLoop = new Array();
var arrayPropagandasCuriosidadesLoop = new Array();
var qtdPropagandasLoop = 0;
var qtdPropagandasRestauranteLoop = 0;
var qtdPropagandasCuriosidadesLoop = 0;
var primeiraVezLoopPropaganda = false;
var propagandaAtiva = false;
var qtdVariacao = 0;
var contadorVariacao = 0;

var contadorVariacaoPropRestaurante = -1;
var qtdeVariacaoPropRestaurante = 0;

var indicePropCuriosidade = 0;
var indicePropRestaurante = 0;
var timeOut;
var indiceAntigoComum = 0;
var indiceComum = 0;
var flagCuriosidade = false;
var flagSelectPropagandaComum = false;

var mostra = 0;
var adiciona = 0;

function selectPropagandas(flagCuriosidade){
  
	db.transaction(function(tx) {
		
		// pega qtde de variacao da propaganda curiosidade
		tx.executeSql('SELECT * FROM configPropagandas ',[],function(fx,result){
              
                      if(result.rows.length > 0){
					
				 qtdVariacao =result.rows.item(0).variacao_curiosidade;
                      
				 
				 qtdeVariacaoPropRestaurante = result.rows.item(0).variacao_pro_restaurante;
                      

			 }
			 
		 },errorCB);
                                        
               
		// MOnta propagandas comuns e que ainda n tenha passado
		tx.executeSql('SELECT * FROM Propagandas where flag_passou="false" and tipoPropaganda="Propaganda Comum" order by ordenacao',[],function(fx,result){
                     
                      //alert("aki")
                      //alert("tamanho antes ne pq "+result.rows.length)
                      
			 if(result.rows.length > 0){
                      
				 for(var i=0;i<result.rows.length;i++){
                 
					 var objectArrayPropagandasLoop = {
			    			  image:"",
			    			  duration:"",
			    			  idPropaganda:0
			    	 }
                     
					 objectArrayPropagandasLoop.image = result.rows.item(i).image;
					 objectArrayPropagandasLoop.duration = result.rows.item(i).duration;
					 objectArrayPropagandasLoop.idPropaganda = result.rows.item(i).id;
					 arrayPropagandasLoop.push(objectArrayPropagandasLoop);
				  }
				 qtdPropagandasLoop = arrayPropagandasLoop.length;
				 primeiraVezLoopPropaganda = true;
				 indiceComum = 0;
                      
                selectPropagandasRestaurante(true);
				  
				  
                      }else{
                      tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Propaganda Comum"');
                      selectPropagandas(false);
                      }
			 
		 },errorCB);
                   if(flagCuriosidade == true){
                        selectPropagandasCuriosidade();
                   }
                   
                   
                  
        },errorCB,successCB);
	
	
}
 function selectPropagandasComuns(indice,mostra){
  
    
	 db.transaction(function(tx) {
	arrayPropagandasLoop = new Array();
	 tx.executeSql('SELECT * FROM Propagandas where flag_passou="false" and tipoPropaganda="Propaganda Comum" order by ordenacao',[],function(fx,result){
		 if(result.rows.length > 0){
			
			 for(var i=0;i<result.rows.length;i++){
                
				 var objectArrayPropagandasLoop = {
		    			  image:"",
		    			  duration:"",
		    			  idPropaganda:0
		    	 }
				 
				 objectArrayPropagandasLoop.image = result.rows.item(i).image;
				 objectArrayPropagandasLoop.duration = result.rows.item(i).duration;
				 objectArrayPropagandasLoop.idPropaganda = result.rows.item(i).id;
				 arrayPropagandasLoop.push(objectArrayPropagandasLoop);
			  }
			
			 qtdPropagandasLoop = 0;
			 qtdPropagandasLoop = arrayPropagandasLoop.length;
			 flagSelectPropagandaComum = true;
			 indiceComum = 0;
			 montaPropagandaHtml(0,mostra,0);
			 
			  
		 }
		 
	 },errorCB);
	 },errorCB,successCB);
 }
 
 function selectPropagandasRestaurante(primeiraVez){
    
	 db.transaction(function(tx) {
	arrayPropagandasRestauranteLoop = new Array();
                   
	 tx.executeSql('SELECT * FROM Propagandas where flag_passou="false" and tipoPropaganda="Propaganda Restaurante" order by ordenacao',[],function(fx,result){
                   
		 if(result.rows.length > 0){
			
			 for(var i=0;i<result.rows.length;i++){
                
				 var objectArrayPropagandasRestauranteLoop = {
		    			  image:"",
		    			  duration:"",
		    			  idPropaganda:0
		    	 }
				 
				 objectArrayPropagandasRestauranteLoop.image = result.rows.item(i).image;
				 objectArrayPropagandasRestauranteLoop.duration = result.rows.item(i).duration;
				 objectArrayPropagandasRestauranteLoop.idPropaganda = result.rows.item(i).id;
				 arrayPropagandasRestauranteLoop.push(objectArrayPropagandasRestauranteLoop);
			  }
			
			 qtdPropagandasRestauranteLoop = 0;
			 qtdPropagandasRestauranteLoop = arrayPropagandasRestauranteLoop.length;
                   if(primeiraVez == true){
                    montaPropagandaHtml(0,0,0);
                   }
                   
			  
		 }else{
			 tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Propaganda Restaurante"');
			 selectPropagandasRestaurante();
		 }
		 
	 },errorCB);
	 },errorCB,successCB);
 }

function selectPropagandasCuriosidade(){
    
	db.transaction(function(tx) {
	// MOnta propagandas curiosidades e que ainda n tenha passado
	tx.executeSql('SELECT * FROM Propagandas where flag_passou="false" and tipoPropaganda="Curiosidade"',[],function(fx,result){
                 
		 if(result.rows.length > 0){
                 
			 for(var i=0;i<result.rows.length;i++){

				 var objectArrayPropagandasLoop = {
		    			  image:"",
		    			  duration:"",
		    			  idPropaganda:0
		    	 }
				 
				 objectArrayPropagandasLoop.image = result.rows.item(i).image;
				 objectArrayPropagandasLoop.duration = result.rows.item(i).duration;
				 objectArrayPropagandasLoop.idPropaganda = result.rows.item(i).id;
				 arrayPropagandasCuriosidadesLoop.push(objectArrayPropagandasLoop);
			  }
			 
			 randomicarArray(arrayPropagandasCuriosidadesLoop);
			 
			 qtdPropagandasCuriosidadesLoop = arrayPropagandasCuriosidadesLoop.length;
			  
		 }
		 
	 },errorCB);
	  },errorCB,successCB);
}

function montaPropagandaHtml(indice,mostra,idPropagandaRemover){
    
	if(propagandaAtiva == true){
		// carrega dois arquivos
		contadorVariacao = contadorVariacao + 1;
		
		if(indiceComum == 0 && primeiraVezLoopPropaganda == true){
			//Adiciona Primeira Tag
			adiciona = 1;
			adicionarPropagandaHtml(indiceComum,adiciona);
			var indiceProximo = indiceComum + 1;
			//var duration = arrayPropagandasLoop[indiceComum].duration;
			mostra = 1;
			mostrarPropaganda(indiceComum,mostra);
            
            if(qtdPropagandasLoop != 1){
            indiceComum = indiceComum+1;
            }
            
          //Adiciona Segunda Tag
            adiciona = 2;
			adicionarPropagandaHtml(indiceComum,adiciona);
			
		}else{
			//var duration = arrayPropagandasLoop[indiceComum].duration;
           // alert("antes")
           
           /**
            if(flagCuriosidade == true && flagSelectPropagandaComum == false){
                alert("flagcuriosidade e nao propaganda comum: "+indiceComum)
            	indiceComum = indiceComum-1;
                flagCuriosidade = false;
                //alert("depois e nao propaganda comum: "+indiceComum)
            */
			//}else{
                if(flagSelectPropagandaComum == true){
					 indiceComum = 0;
                    flagSelectPropagandaComum = false;
				}else{
                indiceComum = indiceComum+1;
                }
                
			//}
            // alert("depois")
                var proximoMostrar;
                if(mostra == 1){
                	proximoMostrar = 2;
                }else{
                	proximoMostrar = 1;
                }
                
			mostrarPropaganda(indiceComum,proximoMostrar);
           /**
            if(indice == 0){
				var indiceAnterior = qtdPropagandasLoop-1;
			}else{
				var indiceAnterior = indice -1;
			}
			*/
			/**
			if(indice == qtdPropagandasLoop-1){
				var indiceProximo = 0;
			}else{
				if(flagSelectPropagandaComum == true){
					var indiceProximo = 0;
				}else{
				var indiceProximo = indice + 1;
				}
			}
			*/
			
           
           // alert("chamando remove")
			removerPropagandaHtml(idPropagandaRemover);
			adicionarPropagandaHtml(indiceComum,mostra);
			
		}
	}
	
}

function mostrarPropaganda(indice,mostra){
    
	if(propagandaAtiva == true){
    
		
		var ativo = $("#video"+mostra).attr('value');
        
	//var tipoPropaganda = $('.elemento-propaganda:first-child').attr('value');
	
	var idElementoParaMostrar = "";
	//var tag = $('#'+idElemento).prop("tagName");
        //var tag = $('.elemento-propaganda:nth-child(2)').prop("tagName");
      
	if (ativo != "false") {
        
		idElementoParaMostrar = "video"+mostra;
       
		    $('#'+idElementoParaMostrar).fadeIn(4000);
        
             var idVideo = $('#'+idElementoParaMostrar).attr("id")
        
        
			 var video = document.getElementById(idVideo);
       
              video.load()
			  video.play();
		 
	}else{
        
		//$('#'+idElemento).show();
		idElementoParaMostrar= "img"+mostra;
        
		$('#'+idElementoParaMostrar).fadeIn(4000);
	}
        
	var duration = $('#'+idElementoParaMostrar).attr('value');
	duration = parseInt(duration) + 2000;
	 
	 window.setTimeout(function() {
		 if(propagandaAtiva == false){
			 clearTimeout(this);
		 }
                       
		 //$('#'+idElemento).hide(4000);
                       
		 $('#'+idElementoParaMostrar).hide('slow');
		 primeiraVezLoopPropaganda = false;
		 
		 if(indiceComum == qtdPropagandasLoop-1){
                       
			 //var indiceProximo = 0;
			 db.transaction(function(tx) {
					tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Propaganda Comum"');
					selectPropagandasComuns(indice,mostra);
				},errorCB,successCB);
			 
		 }else{
                       
			 var indiceProximo = indice +1;
			 var idPropagandaRemover = $('#'+idElementoParaMostrar).attr('name');
			 montaPropagandaHtml(indiceProximo,mostra,idPropagandaRemover);
		 }
		  
	 }, duration);
	}
    
}

function adicionarPropagandaHtml(indice,adiciona){
	var qtdere = qtdPropagandasRestauranteLoop-1;
    
	if(propagandaAtiva == true){
		contadorVariacaoPropRestaurante = contadorVariacaoPropRestaurante +1;
        
	if(contadorVariacao == qtdVariacao){
		var url = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].image;
		var image = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].image;
        var duration = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].duration;
		var extencao =  url.substr(url.length - 3);
		var idPropaganda = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].idPropaganda;
		var typePropaganda = "curiosidade";
		var idElemento = 'player-curiosidade'+indice+'';
		
        
        if(indice <= qtdPropagandasLoop-1){
            indiceComum = indiceComum-1;
        }
		if(indicePropCuriosidade == qtdPropagandasCuriosidadesLoop-1){
			indicePropCuriosidade = 0;
			arrayPropagandasCuriosidadesLoop = new Array();
			qtdPropagandasCuriosidadesLoop = 0;
			db.transaction(function(tx) {
				tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Curiosidade"');
				selectPropagandasCuriosidade();
			},errorCB,successCB);
			
		}
        indicePropCuriosidade = indicePropCuriosidade +1;
		contadorVariacao = -1;
		flagCuriosidade = true;
		indiceAntigoComum = indice;
        contadorVariacaoPropRestaurante = contadorVariacaoPropRestaurante -1;
	}else{
		
		if(contadorVariacaoPropRestaurante == qtdeVariacaoPropRestaurante){
			
			var url = arrayPropagandasRestauranteLoop[indicePropRestaurante].image;
			var image = arrayPropagandasRestauranteLoop[indicePropRestaurante].image;
	        var duration = arrayPropagandasRestauranteLoop[indicePropRestaurante].duration;
			var extencao =  url.substr(url.length - 3);
			var idPropaganda = arrayPropagandasRestauranteLoop[indicePropRestaurante].idPropaganda;
			var idElemento = 'player-restaurante'+indice+'';
            
            if(indice <= qtdPropagandasLoop-1){
                indiceComum = indiceComum-1;
            }
			
            
			if(indicePropRestaurante == qtdPropagandasRestauranteLoop-1){
               
				indicePropRestaurante = 0;
				arrayPropagandasRestauranteLoop = new Array();
				qtdPropagandasRestauranteLoop = 0;
                
				db.transaction(function(tx) {
					tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Propaganda Restaurante"');
                               
					selectPropagandasRestaurante(false);
				},errorCB,successCB);
				
			}
			
			indicePropRestaurante = indicePropRestaurante +1;
			contadorVariacaoPropRestaurante = -1;
		}else{
            
         
			var url = arrayPropagandasLoop[indice].image;
           
			var image = arrayPropagandasLoop[indice].image;
			var extencao =  url.substr(url.length - 3);
			var idPropaganda = arrayPropagandasLoop[indice].idPropaganda;
	        var duration = arrayPropagandasLoop[indice].duration;
			var typePropaganda = "comum";
			var idElemento = 'player-cumum'+indice+'';
			if(indice == qtdPropagandasCuriosidadesLoop-1){
				
			}
			
		}
		
		
	}
	
	
	if(extencao != "mp4"){
		//$("#img"+adiciona).attr('id',idElemento);
       
		$("#img"+adiciona).attr('value',duration);
		$("#img"+adiciona).attr('name',idPropaganda);
		$("#img"+adiciona).attr('src',image);
		
		//Se for imagem deixa o video inativo:
		$("#video"+adiciona).attr('value','false');
		$("#source-player"+adiciona).attr('src','');
	}else{
        
		//$("#video"+adiciona).attr('id',idElemento);
		$("#video"+adiciona).attr('value',duration);
		$("#video"+adiciona).attr('name',idPropaganda);
		
		$("#source-player"+adiciona).attr('src',image);
		
		$("#img"+adiciona).attr('value','false');
		$("#img"+adiciona).attr('src','');
		
	}
	}
}

function removerPropagandaHtml(idPropagandaRemover){
    
	if(propagandaAtiva == true){
        /**
		var tipoPropaganda = $('.elemento-propaganda:first-child').attr('value');
        alert("tipo:"+tipoPropaganda)
		if(tipoPropaganda == "curiosidade"){
            indice = indice +1;
			idElemento = 'player-curiosidade'+indice+'';
		}else{
			idElemento = 'player-cumum'+indice+'';
		}	
		alert(idElemento)
		var id = $('#'+idElemento).attr('name');
		$('#'+idElemento).remove();
		*/
        
		//var id = $('.elemento-propaganda:first-child').attr('name')
        
        //$('.elemento-propaganda:first-child').remove();
        
		db.transaction(function(tx) {
		tx.executeSql('UPDATE Propagandas SET flag_passou="true" WHERE Id='+idPropagandaRemover+'');
		 },errorCB,successCB);
	}
}

/**
function montaPropagandas(tx,result){
	if(result.rows.length > 0){
		
		for(var i=0;i<result.rows.length;i++){
			
			var url = result.rows.item(i).image;
			var extencao =  url.substr(url.length - 3);
			
			if(extencao != "mp4"){
				$("#foo").append('<img id="player'+i+'" src="'+result.rows.item(i).image+'" class="img-propagandas"/> ');
			}else{
				$("#foo").append('<video id="player'+i+'" width="1100px" height="700px" autoplay  ><source id="source-player'+i+'" src="'+result.rows.item(i).image+'" type="video/mp4"></video>');
			}
	    }
		
		 $("#foo").carouFredSel({
	         items               : 1,
	                            auto : false,
	                            scroll : {
	                                items           : 1,
	                                fx              : "crossfade",
	                                pauseOnHover    : true
	                            }                  
	     });
		 
		 $("#foo").trigger("configuration", [ "direction",'up' ]);
		 pegarDuration(true);
	}    
	
}
*/

/**
function montaPropagandasMock(){

	for(var i=0;i<5;i++){
		
		if(i==0){
			$("#foo").append('<video id="player'+i+'" width="1100px" height="700px" autoplay  ><source id="source-player'+i+'" src="img/video.mp4" type="video/mp4"></video>');
			alert('montando');
			
		}
        if(i!=0){
        	$("#foo").append('<img id="player'+i+'" src="img/propaganda'+i+'.jpg" class="img-propagandas"/> ');
        }
		// JavaScript object for later use
   }
	
	
	 $		("#foo").carouFredSel({
         items               : 1,
                            auto : false,
                            scroll : {
                                items           : 1,
                                fx              : "crossfade",
                                pauseOnHover    : true
                            }                  
     });
	 
	 $("#foo").trigger("configuration", [ "direction",'up' ]);
}
*/
/**
function pegarDuration(primeiraVez){
	//
	var page = $("#foo").triggerHandler("currentPage");
	var tag = $('#player'+page+'').prop("tagName");
    var numero ;
	if (tag == "VIDEO") {
		// Caso primeiro item seja um video, é dado settimeout para espera carregar o video para depois pegar sua duração
		if (page == 0 && primeiraVez == true) {
			window.setTimeout(function() {

				var video = document.getElementById("player" + page + "");
				console.log("playetimeoutr" + page + "");
				console.log(video.duration);
				video.play();
				// source.play();
				numero = video.duration * 1000;
				window.setTimeout(function() {

					$("#foo").trigger("next", 1);
					pegarDuration(false);
				}, numero);
			}, 500);
		} else {
			var video = document.getElementById("player" + page + "");
			console.log("player" + page + "");
			console.log($('#' + video.duration));

			video.play();
			// source.play();
			numero = video.duration * 1000;
			window.setTimeout(function() {

				$("#foo").trigger("next", 1);
				pegarDuration(false);
			}, numero);
		}
	} else {
		if (tag == "IMG") {
			numero = 3000;
			window.setTimeout(function() {
				$("#foo").trigger("next", 1);
				pegarDuration(false);
			}, numero);
		}
	}
    
	// $("#foo").trigger("slideToPage", [2, {
		//    fx          : "fade",
		////    duration    : 300
		//}]);


}
*/

/**
document.addEventListener("DOMContentLoaded", function(event) {
	  pegarDuration(true);
});
*/

function randomicarArray(el){
		 var i = el.length, j, tempi, tempj;
		 if ( i == 0 ) return el;
		 while ( --i ) {
		    j       = Math.floor( Math.random() * ( i + 1 ) );
		    tempi   = el[i];
		    tempj   = el[j];
		    el[i] = tempj;
		    el[j] = tempi;
		 }
}

$(document).ready(function(){
                
	//$('.elemento-propaganda').remove();
	onLoad();
	propagandaAtiva = true;
	selectPropagandas(true);
	//montaPropagandasMock();
	
});


