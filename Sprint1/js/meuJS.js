require([
  "dojo/dom",
  "dijit/dijit",
  "dojo/parser",
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
  "dojox/mobile/Slider",
  "dojox/mobile/Button",
  "dojox/mobile/Opener"
], function(dom, registry, ProgressIndicator){
    
	  show = function(dlg){
	    registry.byId("descricao-"+dlg).show();
	  }
	  
	  hide = function(dlg){
	    registry.byId(dlg).hide();
	  }
	  
	  var prog;
	  
	  show_progress_indicator = function(dlg, cont){
	    show(dlg);
	    var container = dom.byId(cont);
	    prog = ProgressIndicator.getInstance();
	    container.appendChild(prog.domNode);
	    prog.start();
	    setTimeout(function(){
	      hide_progress_indicator(dlg);
	    }, 5000);
	  }
	  
	  hide_progress_indicator = function(dlg){
	    prog.stop();
	    hide(dlg);
	  }
});



function chamarDescricao(div){
	//$("#"+div.id  +" li").addClass("selecionado");
	
	
	//setTimeout(function() {
		//$("#"+div.id  +" li").removeClass("selecionado");
	//}, 500);
		
	$("#descricao-"+ div.id).show();
	
   // $("#descricao-"+ div.id).dialog({ 'width': "86%" ,autoOpen: true,closeText: "hide",dialogClass: "meuDialog",title:"Descrição do Produto",modal:true,
       // show: {
          //  effect: "none",
         // },
         // hide: {
           // effect: "none",
         // }});
}

function loaded(id){
	document.addEventListener('touchmove', function(e){ e.preventDefault(); });
	
	myScroll = new iScroll('wrapper-produtos-'+id, { 
		vScroll:true,
		vScrollbar:true,
		snap: 'ul',
		momentum: true,
		onScrollStart: function () {
			//$('.minhaLI').removeClass("mblListItemSelected");
			//$('.minhaLI').off("touchstart");
			$('.minhaLI').addClass("movendo");
           // $('.menu_content .divClicavel').removeClass("ativo");
            
            //$('.movendo').bind('touchstart', function(e){$('.minhaLI').removeClass("mblListItemSelected"); e.preventDefault(); });
            
        },
        onScrollEnd: function () {
        	//setTimeout(function() {
        	$('.minhaLI').removeClass("movendo")
        		//$('.menu_content .divClicavel').addClass("ativo")
        		
        	//}, 2000);
           
            //document.querySelector('.indicator > li.active').className = '';
            //document.querySelector('.indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        },
        
       // onBeforeScrollStart: function (e) { e.preventDefault(); },
            
		
		
	});
	

	$('.movendo').click(function (e) {
        e.preventDefault();
    });
	/*
	$('.movendo').mousedown(function (e) {
		$('.movendo').bind('touchstart', function(e){ e.preventDefault(); });
		$('.minhaLI')
        e.preventDefault();
    });
	$('.movendo').bind('touchstart', function(e){ e.preventDefault(); });
	
	$('.movendo').mouseenter(function (e) {
		$('.movendo').bind('touchstart', function(e){ e.preventDefault(); });
		$('.minhaLI')
        e.preventDefault();
    });
	*/
	
}


function chamarProdutos(div){
	$(".selecionado").removeClass("selecionado");
	$(".menu_content").addClass("escondido");
	$("#produtos-"+ div.id).removeClass("escondido");
	
	$("#"+ div.id + " li").addClass("selecionado");
	
	/*
	$(".selecionado").each(function() {
		 if($(this) == $("#"+ div.id + " li")){
			 $(this).removeClass("selecionado");
		 }
	});
	*/
	
	
    
	//$("#produto-"+ div.id).css("display", "block");
	
		  //document.addEventListener('DOMContentLoaded', function () 
				// { setTimeout(loaded(div.id), 200); }, false);
	loaded(div.id);
}


$(document).ready(function(){

	
	
	//document.addEventListener("deviceready", teste, false);
	
	//function teste(){
	//}
	
 	//$(".menu_categoria li").click(function(){
 		//$(".menu_content")
        // .hide();
 		
 		//$("#produto-"+ $(this).attr('id')).show();
   // });
 	
 	
 	//$(".menu_produto .minhaLI").click(function(){
 		//alert($(this).attr('id'));
       // $("#descricao-"+ $(this).attr('id')).dialog({ 'width': "86%" ,resizable: true,autoOpen: true,title:"Descrição do Produto",modal:true,
         //   show: {
           //     effect: "none",
          //    },
            //  hide: {
             //   effect: "none",
             // }})
              
              //$('.dumbBoxWrap').show();
            
    //});
 	
 	
 	 $(".btn_mais_detalhes").click(function() {
 		 
 		if($("#detalhes_produto-"+this.id).css('display') == 'none'){
 		   $("#detalhes_produto-"+this.id).show();
 		}else{
 		   $("#detalhes_produto-"+this.id).hide();
 		}

	});

 	
	
	
	$(".btn_adicionar_pedido").click(function() {

			$("#"+this.value).dialog("close");
			
			$("#modal_nome_pessoa").dialog({
				'width' : "700px",
				autoOpen : true,
				dialogClass: "meuDialog",
				modal:true,
				title:"Informações Sobre o Produto",
			
			})

		});
	
	
	
		$("#btn_adicionar_mais_itens").click(function() {

			$(".modal_descricao_produtos").dialog("close");

		});
		
		
		$("#btn_efetuar_pedido_2").click(function() {
			$("#modal_pedido").dialog({
				'width' : "600px",
				autoOpen : true,
				modal:true,
				show : {
					
				},
				hide : {
					
				}
			})
			
			$("#modal_nome_pessoa").dialog("close");


		});
		
		
		$("#btn_efetuar_pedido").click(function() {
			$("#modal_pedido_confirmacao").dialog({
				'width' : "400px",
				autoOpen : true,
				show : {
					effect : "scale",
					duration : 500
				},
				hide : {
					effect : "scale",
					duration : 500
				}
			})
			
			$("#modal_pedido").dialog("close");


		});
		
		$("#btn_ok").click(function() {

			$("#modal_pedido_confirmacao_mensagem").dialog({
				'width' : "400px",
				autoOpen : true,
				modal:true,
			})
			
			$("#modal_pedido_confirmacao").dialog("close");
			$("#modal_pedido").dialog("close");

		});
		
		
		$("#btn_ok_final").click(function() {

			$("#modal_pedido_confirmacao_mensagem").dialog("close");

		});
		
		$("#btn_cancela").click(function() {

			$("#modal_pedido_confirmacao").dialog("close");
			$("#modal_pedido").dialog("close");

		});
		
		$("#btn_adicionar_mais_itens").click(function() {

			$("#modal_pedido").dialog("close");

		});
		
	
		$("#btn_mesma_pessoa").click(function() {

			$("#modal_pedido").dialog("close");

		});
		
		$("#btn_outra_pessoa").click(function() {

			$("#modal_pedido").dialog("close");

		});
		
		
		//$(".divClicavel").click(function() {

			//alert($(this).parent('li.id'));
			

		//});
	
		
		
		
	});