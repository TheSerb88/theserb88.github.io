/**
 * @author TheSerb88
 */

//VARS
var hero = {
	name: "Nameless Hero",
	level: 1,
	atk: 1,
	def: 1,
	hp: 10,
	maxHp:10,
	recovery: {
		amt: 1,
		rate: 1000
	},
	exp: 0,
	gold: 0	
};

//STARTUP
$(document).ready(function () {
	$( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "OK": function() {
          if ($("#name").val() != ""){
          		hero.name = $("#name").val();
          	}
          	$( this ).dialog( "close" );
          	updateValues();
          }
        }
      });	
	
	//LOAD
	$( "#dialog-form" ).dialog( "open" );
    updateValues();
    
    //CLICKING
	$('#fight').click(function() {
		var monster = new creature("Green Slime", 3, 1, 0, 1,1);
		fight(hero,monster);		
	});
	
	var fillHealth = setInterval(function () {
		hero.hp += hero.recovery.amt;
		if(hero.hp > hero.maxHp) {hero.hp = hero.maxHp;}
		updateHP();
	}, hero.recovery.rate);

	
});

function updateValues() {
	$("#heroName").html(hero.name);
	$("#heroLevel").html(hero.level);
	//$("#heroHP").html(hero.hp);
	$("#heroExp").html(hero.exp);
	$("#heroGold").html(hero.gold);
	updateHP();
};

function updateHP() {
	var heroHp = $( "#heroHp" ),
      progressLabel = $( ".progress-label" );
 
    heroHp.progressbar({
      value: hero.hp,
      max: hero.maxHp
    });
    progressLabel.text("HP:" + hero.hp + "/" + hero.maxHp);
};


function fight(hero, creature){
	$("#battle").html("You found a " + creature.name + "!<br />");
	while(hero.hp > 0 && creature.hp > 0)
	{
		hero.hp -= creature.atk;
		creature.hp -= hero.atk;	
		$("#battle").append("You hit the " + creature.name + " for " + hero.atk + " damage.<br />");
		$("#battle").append(creature.name + " hit you for " + creature.atk + " damage.<br />");
			
	}
	if (hero.hp <= 0){
		$("#battle").append("You died and lost your gold.");
		hero.gold = 0;
	}
	else{
		$("#battle").append("You killed the " + creature.name + "!<br />");
		$("#battle").append("The " + creature.name + " dropped " + creature.goldDrop + " gold!<br />");
		hero.exp += creature.exp ;
		hero.gold += creature.goldDrop;
	}
	updateValues();
}




