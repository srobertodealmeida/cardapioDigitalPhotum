
require([
"dojo/dom",
"dijit/dijit",
"dojo/parser",
"dojo/on", 
"dojo/_base/window", 
"dojo/_base/Deferred", 
"dojo/dom", 
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
"dojox/mobile/ViewController",
"dojox/mobile/Slider",
"dojox/mobile/Button",
"dojox/mobile/Opener",
"dojox/mobile/ContentPane",
"dijit/registry",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/Button",
"dojo/_base/window",
"dojo/_base/Deferred",
"dijit/registry",
"dojox/mobile/ViewController",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/compat",
"dojox/mobile/Button",
"dojo/_base/window",
"dojo/_base/Deferred",
"dijit/registry",
"dojox/mobile/ViewController",
"dojox/mobile/parser",
"dojox/mobile",
"dojox/mobile/compat",
"dojox/mobile/Button",
"dojox/mobile/GridLayout",
"dojox/mobile/Pane",
"dojox/mobile/RoundRectStoreList",
"dojo/store/Memory"
], function(dom, registry,dom, on,ProgressIndicator,parser, ViewController,ScrollableView){
    
	
	
	storeData2 = [
	              {label: "Sergio", moveTo: "dummy"},
	              {label: "Banana", moveTo: "dummy"},
	              {label: "Cherry", moveTo: "dummy"},
	              {label: "Grape", moveTo: "dummy"},
	              {label: "Kiwi", moveTo: "dummy"},
	              {label: "Lemon", moveTo: "dummy"},
	              {label: "Melon", moveTo: "dummy"},
	              {label: "Orange", moveTo: "dummy"},
	              {label: "Peach", moveTo: "dummy"}
	          ];
	
	
	  show = function(dlg){
	    registry.byId("descricao-"+dlg).show();
	  }
	  
	  showModalPessoa = function(dlg){
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_nome_pessoa').show();
	  }
	  
	  hide = function(dlg){
	    registry.byId(dlg).hide();
	    
	    if($(".mblSimpleDialog").is(':visible')){
	    	$(".mblSimpleDialogCover").show();
		}
	  }
	  
	  showChamarGarcom = function(dlg){
	    registry.byId(dlg).show();
	  }
	  showModal_pedido = function(dlg){
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_pedido').show();
	  }
	  
	  showChamarPrevia = function(dlg){
		    registry.byId(dlg).show();
	  }
		  
		  
	  showModal_confirmacao = function(dlg){
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_pedido_confirmacao_mensagem').show();
	  }
	  
	  
	  
	  showConfirmacaoPedidoIndividualGarcom = function(dlg){
		  if(dlg.value != 'mesa'){
		  $('#'+dlg.value).addClass('aguardandoPagamento');
		    
		  $('#'+dlg.value).text('Aguardando Pagamento');
		  $('#'+dlg.value).attr("disabled", "disabled");
		  }
		    registry.byId('modal_fechar_conta').hide();
		    if(dlg.value == 'mesa'){
		    registry.byId('modal_previa_pedido').hide();
		    }
		    registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
	  }
	 
	  showConfirmacaoFechamentoConta = function(dlg){
		  
		  $('#modal_fechar_conta p').text('Deseja realmente fechar a conta do/da ' + dlg.value ) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('value',dlg.id) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('onClick','showConfirmacaoPedidoIndividualGarcom(this)') ;
		  registry.byId('modal_fechar_conta').show();
	  }
	  
     
	  
	  testando = function(){
		  alert('foi sim');
		 
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


function handler(event) {
	if(event.currentTarget.nodeName == "BUTTON"){
		
	}
	
}

function showConfirmacaoFechamentoConta1(li){
	$('#modal_fechar_conta p').text('Deseja realmente fechar a conta do/da ' + dlg.value ) ;
	showConfirmacaoFechamentoConta(li);
}

function mostrarPedidoDetalhado(divDetalhado){
  $("#" + divDetalhado).toggle();
}

function chamarDescricao(div){
	$("#"+div.id  +" li").addClass("selecionado");
	
	
	setTimeout(function() {
		$("#"+div.id  +" li").removeClass("selecionado");
	}, 500);
		
	
	
    $("#descricao-"+ div.id).dialog({ 'width': "86%" ,autoOpen: true,closeText: "hide",dialogClass: "meuDialog",title:"Descrição do Produto",modal:true,
        show: {
            effect: "none",
          },
          hide: {
            effect: "none",
          }});
}




function loaded(id){
	document.addEventListener('touchmove', function(e){ e.preventDefault(); });
	
	myScroll = new iScroll('wrapper-produto-'+id, { 
		vScroll:true,
		vScrollbar:true,
		snap: 'ul',
		momentum: true,
		onScrollStart: function () {
            $('.minhaLI').addClass("movendo");
            
        },
        onScrollEnd: function () {
        		$('.minhaLI').removeClass("movendo")
           
        },
        
            
		
		
	});
	

	$('.movendo').click(function (e) {
        e.preventDefault();
    });

	
}


function chamarProdutos2(div){
	
	$(".selecionado").removeClass("selecionado");
	$(".menu_content").addClass("escondido");
	$("#produtos-"+ div.id).removeClass("escondido");
	
	$("#"+ div.id + " li").addClass("selecionado");
	
}





function mostrarModalConfirmacao(li){
	$("#modal_pedido_confirmacao").show();
	
}


	

$(document).ready(function(){
	
	
	
	
	
	$(".mostrarDetalhado").add('.btn_fechar_conta_individual').click(handler);
	
	$(".meuCheckBox").click(function(e){
	});
	
	
	
	$(".meuCheckBox").change(function(e){
	});
	
	
	$(".btn-decremento").click(function(e){
		 if(parseInt($(this).next('span').text()) > 1){
		 var quantidade =  parseInt($(this).next('span').text()) - 1;
		 $(this).next('span').text(quantidade);
		 }
	  });
	
	$(".btn-incremento").click(function(e){
		var idDivPai = $(this).parent().attr('id');
		var valorSpan = $('#'+idDivPai + ' .modal_pedido_quantidade').text();
		var quantidade =  parseInt(valorSpan) + 1;
		 $('#'+idDivPai + ' .modal_pedido_quantidade').text(quantidade);
	  });
	
	
	$(".mostrarDetalhado").click(function(e){
		var divDetalhado = $(this).next('.pedido_detalhado').attr('id');
	
		if(!(e.target.tagName == "BUTTON")){
			if($("#"+this.id+" .incremento").hasClass('mais')){
				$("#"+this.id+" .incremento").css('left','11.5');
				$("#"+this.id+" .incremento").css('top','-6');
				$("#"+this.id+" .incremento").text('-');
				$("#"+this.id+" .incremento").removeClass('mais');
			}else {
				$("#"+this.id+" .incremento").css('left','9.43')
				$("#"+this.id+" .incremento").css('top','-5');
				$("#"+this.id+" .incremento").text('+');
				$("#"+this.id+" .incremento").addClass('mais');
			}
			
		  mostrarPedidoDetalhado(divDetalhado);
		}
	  });
	

	 function teste(){
		 
	 }
	 
	 function showSoftKeyBoard() {
		  if (isAndroid()) {
		    window.plugins.SoftKeyBoard.show(function () {
		      //success
		      console.log("Showing keyboard succeeded");
		    },function () {
		       //fail
		       console.log("Showing keyboard failed");
		    });
		  }
		}
	

 	 $(".btn_mais_detalhes").click(function() {
 		 
 		if($("#detalhes_produto-"+this.id).css('display') == 'none'){
 		   $("#detalhes_produto-"+this.id).show();
 		}else{
 		   $("#detalhes_produto-"+this.id).hide();
 		}

	});

	
		$("#btn_adicionar_mais_itens").click(function() {

			$(".modal_descricao_produtos").dialog("close");

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

	});
