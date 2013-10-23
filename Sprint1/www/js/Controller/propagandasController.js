var arrayPropagandasLoop = new Array();
var arrayPropagandasCuriosidadesLoop = new Array();
var qtdPropagandasLoop = 0;
var qtdPropagandasCuriosidadesLoop = 0;
var primeiraVezLoopPropaganda = false;
var propagandaAtiva = false;
var qtdVariacao = 0;
var contadorVariacao = 0;
var indicePropCuriosidade = 0;
var timeOut;
var indiceAntigoComum = 0;
var flagCuriosidade = false;
var flagSelectPropagandaComum = false;

function selectPropagandas(){
	
	db.transaction(function(tx) {
		 
		// pega qtde de variacao da propaganda curiosidade
		tx.executeSql('SELECT * FROM configPropagandas ',[],function(fx,result){
			 if(result.rows.length > 0){
					
				 qtdVariacao =result.rows.item(0).variacao_curiosidade;

			 }
			 
		 },errorCB);
		
		
		// MOnta propagandas comuns e que ainda n tenha passado
		tx.executeSql('SELECT * FROM Propagandas where flag_passou="false" and tipoPropaganda="Propaganda Comum" order by ordenacao',[],function(fx,result){
			 if(result.rows.length > 0){
                      alert("tamanho comum: "+result.rows.length)
				 for(var i=0;i<result.rows.length;i++){
                 alert("id comum: "+result.rows.item(i).id)
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
				 montaPropagandaHtml(0); 
				  
			 }
			 
		 },errorCB);
		
		selectPropagandasCuriosidade();
		
        },errorCB,successCB);
	
	
}
 function selectPropagandasComuns(indice){
	 db.transaction(function(tx) {
		 var arrayPropagandasLoop = new Array();
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
			 montaPropagandaHtml(0);
			 
			  
		 }
		 
	 },errorCB);
	 },errorCB,successCB);
 }

function selectPropagandasCuriosidade(){
	db.transaction(function(tx) {
	// MOnta propagandas curiosidades e que ainda n tenha passado
	tx.executeSql('SELECT * FROM Propagandas where flag_passou="false" and tipoPropaganda="Curiosidade"',[],function(fx,result){
		 if(result.rows.length > 0){
                  alert("tamanho curiosidade: "+result.rows.length)
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

function montaPropagandaHtml(indice){
    alert("monta: "+indice)
	if(propagandaAtiva == true){
		// carrega dois arquivos
		contadorVariacao = contadorVariacao + 1;
		if(indice == 0 && primeiraVezLoopPropaganda == true){
			adicionarPropagandaHtml(indice);
			var indiceProximo = indice + 1;
			var duration = arrayPropagandasLoop[indice].duration;
			mostrarPropaganda(indice,duration);
			adicionarPropagandaHtml(indiceProximo);
			
		}else{
            
            
			var duration = arrayPropagandasLoop[indice].duration;
            
            if(flagCuriosidade == true){
				indice = indice-1;
			}
			mostrarPropaganda(indice,duration);
			
			
           
            if(indice == 0){
				var indiceAnterior = qtdPropagandasLoop-1;
			}else{
				var indiceAnterior = indice -1;
			}
			
			
			if(indice == qtdPropagandasLoop-1){
				var indiceProximo = 0;
			}else{
				if(flagSelectPropagandaComum == true){
					var indiceProximo = 0;
				}else{
				var indiceProximo = indice + 1;
				}
			}
			flagCuriosidade = false;
			flagSelectPropagandaComum = false;
          alert("chamando remove")
			removerPropagandaHtml(indiceAnterior);
			adicionarPropagandaHtml(indiceProximo);
			
		}
	}
	
}

function mostrarPropaganda(indice,duration){
    alert("mostra: "+indice);
	if(propagandaAtiva == true){
    
        
	var tipoPropaganda = $('.elemento-propaganda:first-child').attr('value');
	if(tipoPropaganda == "curiosidade"){
		idElemento = 'player-curiosidade'+indice+'';
	}else{
		idElemento = 'player-cumum'+indice+'';
	}	
	
	//var tag = $('#'+idElemento).prop("tagName");
        var tag = $('.elemento-propaganda:nth-child(2)').prop("tagName");
	if (tag == "VIDEO") {
		 
		     $('#'+idElemento).show(4000);
			 var video = document.getElementById("player" + indice);
			 video.play();	
		 
	}else{
		//$('#'+idElemento).show();
       
        $('.elemento-propaganda:nth-child(2)').show();
	}
	
	duration = parseInt(duration) + 2000;
	
	 window.setTimeout(function() {
		 if(propagandaAtiva == false){
			 clearTimeout(this);
		 }
                       
		 //$('#'+idElemento).hide(4000);
                       
                       $('.elemento-propaganda:first-child').hide(400);
		 primeiraVezLoopPropaganda = false;
		 
		 if(indice == qtdPropagandasLoop-1){
                      
			 //var indiceProximo = 0;
			 db.transaction(function(tx) {
					tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Propaganda Comum"');
					selectPropagandasComuns(indice);
				},errorCB,successCB);
			 
		 }else{
                     
			 var indiceProximo = indice +1;
			 montaPropagandaHtml(indiceProximo);
		 }
		 
	 }, duration);
	}
}

function adicionarPropagandaHtml(indice){
    alert("adicionar: "+indice)
	if(propagandaAtiva == true){
	
	if(contadorVariacao == qtdVariacao){
		var url = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].image;
		var image = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].image;
		var extencao =  url.substr(url.length - 3);
		var idPropaganda = arrayPropagandasCuriosidadesLoop[indicePropCuriosidade].idPropaganda;
		var typePropaganda = "curiosidade";
		var idElemento = 'player-curiosidade'+indice+'';
		indicePropCuriosidade = indicePropCuriosidade +1;
		if(indicePropCuriosidade == qtdPropagandasCuriosidadesLoop-1){
			indicePropCuriosidade = 0;
			arrayPropagandasCuriosidadesLoop = new Array();
			qtdPropagandasCuriosidadesLoop = 0;
			db.transaction(function(tx) {
				tx.executeSql('UPDATE Propagandas SET flag_passou="false" where tipoPropaganda="Curiosidade"');
				selectPropagandasCuriosidade();
			},errorCB,successCB);
			
		}
		contadorVariacao = 0;
		flagCuriosidade = true;
		indiceAntigoComum = indice;
	}else{
		var url = arrayPropagandasLoop[indice].image;
		var image = arrayPropagandasLoop[indice].image
		var extencao =  url.substr(url.length - 3);
		var idPropaganda = arrayPropagandasLoop[indice].idPropaganda;
		var typePropaganda = "comum";
		var idElemento = 'player-cumum'+indice+'';
		if(indice == qtdPropagandasCuriosidadesLoop-1){
			
		}
	}
	
	
	if(extencao != "mp4"){
		$("#foo").append('<img id="'+idElemento+'" value="'+typePropaganda+'" name="'+idPropaganda+'" src="'+image+'" class="img-propagandas elemento-propaganda"/ style> ');
	}else{
		$("#foo").append('<video id="'+idElemento+'" value="'+typePropaganda+'" name="'+idPropaganda+'" width="1100px" height="700px"  class="elemento-propaganda" ><source id="source-player'+indice+'" src="'+image+'" type="video/mp4"></video>');
	}
	}
}

function removerPropagandaHtml(indice){
    alert("remover: "+indice);
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
        
		var id = $('.elemento-propaganda:first-child').attr('name')
        
        $('.elemento-propaganda:first-child').remove();
        
		db.transaction(function(tx) {
		tx.executeSql('UPDATE Propagandas SET flag_passou="true" WHERE Id='+id+'');
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
	$('.elemento-propaganda').remove();
	onLoad();
	propagandaAtiva = true;
	selectPropagandas();
	//montaPropagandasMock();
	
});


