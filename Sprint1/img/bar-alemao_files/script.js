$(document).ready(function(e){$(".con").mouseover(function(){$(this).attr("src","http://www.bardoalemaosorocaba.com.br/wp-content/themes/bardoalemao/img/convites2.jpg")});$(".con").mouseout(function(){$(this).attr("src","http://www.bardoalemaosorocaba.com.br/wp-content/themes/bardoalemao/img/convites1.jpg")});$(".rotativo ul").attr("id","portfolio2");$("ul#portfolio").innerfade({speed:1000,timeout:5000,type:"sequence",containerheight:"376px"});$("ul#portfolio2").innerfade({speed:1000,timeout:5000,type:"sequence",containerheight:"300px"});function fancy(){$(".card img").attr("align","left");$(".card a").attr("id","aumenta");$("#aumenta").fancybox({titleShow:false})}$("#chegar").mouseover(function(){$(this).attr("src","http://www.bardoalemaosorocaba.com.br/wp-content/themes/bardoalemao/img/chegar2.jpg")});$("#chegar").mouseout(function(){$(this).attr("src","http://www.bardoalemaosorocaba.com.br/wp-content/themes/bardoalemao/img/chegar.jpg")});$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/dicas-especiais/",function(){fancy()});$("#sugestoes").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/sugestoes-do-chef/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#dicas").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/dicas-especiais/",function(){fancy()});$(this).addClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#porcoes-frias").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/porcoes-frias/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#porcoes-quentes").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/porcoes-quentes/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#entradas").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/entradas/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#pratos-tradicionais").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/pratos-tradicionais/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#pratos-individuais").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/pratos-individuais/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#massas").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#massas").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/massas/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#sobremesas").removeClass("selected")});$("#sobremesas").click(function(){$(".content_cardapio").load("http://www.bardoalemaosorocaba.com.br/sobremesas/",function(){fancy()});$(this).addClass("selected");$("#dicas").removeClass("selected");$("#sugestoes").removeClass("selected");$("#porcoes-frias").removeClass("selected");$("#porcoes-quentes").removeClass("selected");$("#entradas").removeClass("selected");$("#pratos-tradicionais").removeClass("selected");$("#pratos-individuais").removeClass("selected");$("#massas").removeClass("selected")})});