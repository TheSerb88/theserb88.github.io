/**
 * @author TheSerb88
 */

//VARS
var hero = {
	name: "Nameless Hero",
	level: 1,
	exp: 0,
	sp: 0,
	hp: 10,
	maxHp:10,
	atk: 1,
	def: 1,
	recovery: {
		amt: 1,
		rate: 100
	},
	gold: 0	
};

function getLevelUp(){
	return (1 * Math.pow( (hero.level + 1) , 2) );
}

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
	//$("#heroLevel").html(hero.level + " (" + hero.exp + "/" + getLevelUp() + ")" ); 
	//$("#heroHP").html(hero.hp);
	$("#heroSP").html(hero.sp);
	$("#heroGold").html(hero.gold);
	updateHP();
	updateExp();
};

function updateHP() {
	var heroHp = $( "#heroHp" ),
      progressLabel = heroHp.children( ".progress-label" );
 
    heroHp.progressbar({
      value: hero.hp,
      max: hero.maxHp
    });
    progressLabel.text("HP:" + hero.hp + "/" + hero.maxHp);
};

function updateExp() {
	var heroExp = $( "#heroExp" ),
      progressLabel = heroExp.children( ".progress-label" );
 
    heroExp.progressbar({
      value: hero.exp,
      max: getLevelUp()
    });
    progressLabel.text("Level: " + hero.level + " (" + hero.exp + "/" + getLevelUp() + ")");
};

function checkLevelUp(){
	if (hero.exp >= getLevelUp())
	{
		hero.level += 1;
		hero.exp = 0;
	}
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
		hero.sp += creature.exp;
		hero.gold += creature.goldDrop;
	}
	checkLevelUp();
	updateValues();
}




