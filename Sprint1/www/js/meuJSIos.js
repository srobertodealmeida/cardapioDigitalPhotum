
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
	  
	  showConfirmacaoPessoa = function(dlg,btn){
		  $("#"+dlg+" .btn-sim-excluir-pessoa").attr('name',btn.value)
		  registry.byId(dlg).show();
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
	  
	  showConfirmacaoGarcom = function(dlg){
		    registry.byId('modal_fechar_conta').hide();
		    registry.byId(dlg.value).hide();
		    registry.byId('modal_chamar_garcom_confirmacao_mensagem').show();
	  }
	  
	  showConfirmacaoPedidoIndividualGarcom = function(dlg){
		//  var idButtonFecharInvidualmente = $('#'+dlg.value).attr('value');
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
	  
      showConfirmacaoPedido = function(dlg){
		  $('#modal_fechar_conta p').text('Deseja efetuar seu pedido? Voce pode voltar e adicionar mais itens antes de confirma-lo') ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('value',dlg.value) ;
		  $('#modal_fechar_conta .fechamentoIndividual').attr('onClick','showConfirmacaoGarcom(this)') ;
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
	
	
    //event.stopPropagation();
    // now do your stuff        
}

function showConfirmacaoFechamentoConta1(li){
	$('#modal_fechar_conta p').text('Deseja realmente fechar a conta do/da ' + dlg.value ) ;
	showConfirmacaoFechamentoConta(li);
}

function mostrarPedidoDetalhado(divDetalhado){
	//event.stopPropagation();
		  // do something
	
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

function excluirPessoa(div){
	
	$("#modal_pedido_confirmacao").hide();
	$("#"+ div.name).hide();
	
}


function loaded(id){
	document.addEventListener('touchmove', function(e){ e.preventDefault(); });
	
	myScroll = new iScroll('wrapper-produto-'+id, { 
		vScroll:true,
		vScrollbar:true,
		snap: 'ul',
		momentum: true,
		onScrollStart: function () {
			//$('.minhaLI').removeClass("mblListItemSelected");
			//$('.minhaLI').off("touchstart");
            $('.minhaLI').addClass("movendo");
            //$('.movendo').bind('touchstart', function(e){$('.minhaLI').removeClass("mblListItemSelected"); e.preventDefault(); });
            
        },
        onScrollEnd: function () {
        	//setTimeout(function() {
        		$('.minhaLI').removeClass("movendo")
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


function chamarProdutos2(div){
	
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
	//loaded(div.id);
}

function editarPessoa(btn){
	$("#"+ btn.value).removeClass('naoEditavel');
	$("#"+ btn.value).addClass('editando');
	$("#" + btn.value).attr('onClick','chamarInput(this)');
}

function chamarInput(li){
	
	  if($("#"+ li.id).hasClass('naoEditavel')){
		 return false;
	 }
	 
	 $("#"+ li.id + ' .editavel').hide();
	 $("#"+ li.id).next(".inputNome").show();
	 $("#"+ li.id).next(".inputNome").trigger('click');
	 $("#"+ li.id).next(".inputNome").trigger('focus');
	 
	 $("#"+ li.id).next(".inputNome").blur(function() {
			// $(".liEditavel").unbind('click',teste)
	     $(this).hide();
	     $("#"+ li.id + ' .editavel').show();
	});
	 
	
}

function mostrarModalConfirmacao(li){
	//$("#modal_pedido_confirmacao").attr("name",li.value); 
	$("#modal_pedido_confirmacao").show();
	
}

function selecionarPessoa(li){
	//$("#"+ li.id + " .meuCheckBox").removeAttr('disabled');
	
	$("#"+ li.id + " .meuCheckBox").trigger('click');
	//$("#"+ li.id + " .meuCheckBox").attr('disabled','disabled');
}
	

function salvarInput(input){
	if(window.event.keyCode == 13) {
		 $("#" + input.name + " .editavel").text(input.value);
		 $("#" + input.name + " .editavel").show();
		 if( $("#" + input.name).hasClass('editando')){
		   
		 }else{
			 $('<button  value="'+input.name+'" class="btn_editar_pessoa"  onclick="editarPessoa(this)">Editar</button> <button  value="'+input.name+'" class="btn_excluir_pessoa" onclick="showConfirmacaoPessoa(\'modal_pedido_confirmacao\',this)">Excluir</button>').insertAfter($("#" + input.name + " .mblListItemRightIcon"));
		 }
		    if ($("#" + input.name).attr('name') == $('#modal_nome_pessoa .liEditavel').size()) {
			var valorName = parseInt($('#modal_nome_pessoa .liEditavel').size()) + 1;
			var valorID = parseInt($('#modal_nome_pessoa .liEditavel').size()) + 1;
			$(
					'<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add'
							+ valorID
							+ '" name="'
							+ valorName
							+ '" onclick="chamarInput(this)" class="mblListItem liEditavel" ><div class="mblListItemRightIcon"><div class="mblDomButtonArrow mblDomButton"><div><div><div><div></div></div></div></div></div></div><span  class="editavel">Adicionar pessoa...</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="mblCheckBox meuCheckBox"/> <div class="mblListItemLabel"> </div></li><input    name="add'
							+ valorID
							+ '" style="display:none" onkeypress="salvarInput(this)" class="inputNome" type="text" />')
					.insertAfter(input);
		}
		 
		
		  $(input).trigger('blur');
		  $(input).hide();
		 // $("#" + input.name).attr('onClick','selecionarPessoa(this)');
		  $("#" + input.name).addClass('naoEditavel');
		  
		  $(".naoEditavel").click(function(e){
			  if(e.target.tagName == "LI"){
			  $("#"+ this.id + " .meuCheckBox").trigger('click');
			  }
		  });
		  
		  window.event.preventDefault();
		  return false;
	}
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
	 
	 
	 /**
	 $('.inputNome').keypress(function(e) {
			// $(".liEditavel").unbind('click',teste)
		 alert('ddaki');
		 if(e.which == 13) {
		 $("#" + $(this).attr('name') + " .editavel").text($(this).val());
		 $("#" + $(this).attr('name') + " .editavel").show();
		 
		 if( $("#" + $(this).attr('name')).attr('name') == $('.liEditavel').size()){
			 $('<li dojoType="dojox.mobile.ListItem" data-dojo-props=\'moveTo:"#"\'id="add4" name="' + $('.liEditavel').size()+1 + '" onclick="chamarInput(this)" class="minhaLI liEditavel" ><span  class="editavel">Adicionar pessoa...</span><input data-dojo-type="dojox/mobile/CheckBox" type="checkbox"  class="meuCheckBox"/></li><input    name="add4" style="display:none" class="inputNome" type="text" />').insertAfter(this);
			 
		 }
		 
		
		 
		  $(this).hide();
		  return false;
		 }
	 });
	 
	
	 
	*/
	
	// $(".liEditavel").click(function(e) {
		//alert( $('.liEditavel').size()); 
		// $("#"+ this.id + ' .editavel').hide();
		// $("#"+ this.id).next(".inputNome").show();
		// $("#"+ this.id).next(".inputNome").trigger('click');
		// $('.inputNome').trigger('forminput');
		// $('.inputNome').trigger('change');
		// $('.inputNome').trigger('keyup');
		 
		 
		 
		 
		 
		 
		 //$("#"+ this.id + ' .editavel').trigger('click');
		 
		// $(this).unbind("click");
		 
		// $("#"+ this.id + ' .editavel form input').keypress();
		 
		 
		 
		
			/**
			$('.editavel form input').keypress(function() {
				 
		 		alert('deu keypress');

			});
			
			$('.editavel form input').select(function() {
				this.onclick;
				$(this).keypress();
				$(this).click();
			});
			
			$('.editavel').click(function() {
				alert('span clicou');
				$('.editavel form input').trigger('click');

			});
			
			$('.editavel form input').click(function() {
				alert('isso sim ');

			});
			
			
			
			*/
		
		//});
	 
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
	
	
	 
	 
	 
	 
	
	
	 
	 
	//$('.editavel').editable(function(value, settings) { 
	//	$(this).text(value);
	//  }, { 
	// });
	
	
 	
	
	
	
 	 $(".btn_mais_detalhes").click(function() {
 		 
 		if($("#detalhes_produto-"+this.id).css('display') == 'none'){
 		   $("#detalhes_produto-"+this.id).show();
 		}else{
 		   $("#detalhes_produto-"+this.id).hide();
 		}

	});

	/**
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
	*/
	
	
		$("#btn_adicionar_mais_itens").click(function() {

			$(".modal_descricao_produtos").dialog("close");

		});
		
		/**
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
		*/
		
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
		
		
		//$("#btn_ok_final").click(function() {

		//	$("#modal_pedido_confirmacao_mensagem").dialog("close");

		//});
		
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
