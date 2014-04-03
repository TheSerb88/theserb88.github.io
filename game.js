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
	exp: 0,
	gold: 0	
};

//STARTUP
$(document).ready(function () {
    updateValues();
    
    //CLICKING
	$('#fight').click(function() {
		var monster = new creature("Green Slime", 3, 1, 0, 1);
		fight(hero,monster);
		hero.exp = hero.exp + 1;
		updateValues();
	});
});

function updateValues() {
	document.getElementById("heroName").innerHTML = hero.name;
	document.getElementById("heroLevel").innerHTML = hero.level;
	document.getElementById("heroHP").innerHTML = hero.hp;
	document.getElementById("heroExp").innerHTML = hero.exp;
	document.getElementById("heroGold").innerHTML = hero.gold;
};

function fight(hero, creature){
	document.getElementById("battle").innerHTML = "You found a " + creature.name + "!<br />";
	while(hero.hp > 0 && creature.hp > 0)
	{
		hero.hp -= creature.atk;
		creature.hp -= hero.atk;	
		document.getElementById("battle").innerHTML += "You hit the " + creature.name + " for " + hero.atk + " damage.<br />";
		document.getElementById("battle").innerHTML += creature.name + " hit you for " + creature.atk + " damage.<br />";
			
	}
	if (hero.hp <= 0){
		alert("you dead.");
	}
	else{
		document.getElementById("battle").innerHTML += "You killed the " + creature.name + "!<br />";
	}
	
}




