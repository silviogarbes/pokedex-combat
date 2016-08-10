function tipo(codigoPokemon){
	var url = "http://pokeapi.co/api/v2/pokemon/" + codigoPokemon + "/";
    jQuery.getJSON( url, function( data ) {
    	callbackTipoPokemon(data.types);
    });
}
function callbackTipoPokemon(data){
	console.log(data)
	$('#tipo').empty();
	jQuery.each(data, function(chave,valor){
    	var item = "<li><a onclick=\"pesquisarDanos('"+ valor.type.name +"','"+ valor.type.url +"'); return false;\">"+ valor.type.name +"</a></li>";
		$("#tipo").append(item);
    });
    $('#tipo').listview().show()
    $("#tipo").listview("refresh");
    status("Carregado");
}



function danos(nome,url){
	console.log(url);
    jQuery.getJSON(url,function(data){
    	callbackDanos(nome,data.damage_relations);
    });
}
function callbackDanos(nome,data){
	console.log(data)
	$('#danos').empty();
	var item = "<li data-role='list-divider'>Dados de combate: "+ nome +"</li>";
	$("#danos").append(item);
	
	$("#danos").append("<div data-role=\"collapsibleset\" data-inset=\"false\" id=\"danosCarregados\">")
    jQuery.each(data, function(chave,valor){
    	$("#danos").append("<div data-role=\"collapsible\">");
        	$("#danos").append("<h3>"+ chave +"</h3>")
        	$("#danos").append("<ul data-role=\"listview\" data-inset=\"false\">")
    			$.each( valor, function( chave2, valor2 ) {
		    		var item = "<li><a onclick=\"pesquisarPokemonsPorTipo('"+ valor2.url +"'); return false;\">"+ valor2.name +"</a></li>";
					$("#danos").append(item);
		    	});
	    	$("#danos").append("</ul>");
	    $("#danos").append("</div>")
	});
	$("#danos").append("</div>");
	
	$('#danos').listview().show()
    $("#danos").listview("refresh");
    $("#danosCarregados").collapsibleset("refresh");
	status("Carregado");
}



function pokemonsPorTipo(url){
	console.log(url);
	jQuery.getJSON(url,function(data){
    	callbackPokemonsPorTipo(data.pokemon);
    });
}
function callbackPokemonsPorTipo(data){
	$('#pokemonsPorTipo').empty();
	$.each( data, function( chave, valor ) {
		console.log(valor)
		codigo_pokemon = valor.pokemon.url.match(/pokemon\/(\d+)/)[1];
    	urlImg = "http://pokeapi.co/media/sprites/pokemon/" + codigo_pokemon + ".png";
		item = "<a onclick=\"pesquisarDanos('"+valor.pokemon.name+"','"+valor.pokemon.url+"'); return false;\"><img src=\""+ urlImg +"\">"+codigo_pokemon+": "+valor.pokemon.name+"</a><br>";
		$("#pokemonsPorTipo").append(item);
    });
    $('#pokemonsPorTipo').show()
    status("Carregado");
}

/* ----------------------- */

function start(){
	$("#tipo").listview().hide();
	$("#danos").listview().hide();
	$("#pokemonsPorTipo").hide();
}
function status(msg){
	document.getElementById("status").innerHTML = msg;
}
function pesquisar(){
	start()
	codigoPokemon = document.formPesquisar.codigoPokemon.value;
	status("Pesquisando código " + codigoPokemon);
	tipo(codigoPokemon);
}
function pesquisarDanos(nome,url){
	status("Pesquisando dados de combate");
	danos(nome,url);
}
function pesquisarPokemonsPorTipo(url){
	status("Pesquisando pokemons por tipo");
	pokemonsPorTipo(url);
}