Game._drawMenu=function(){var e=document.getElementById("map_canvas"),t=e.width,s=e.height,r=map.tsize/2;if(this.ctx.beginPath(),this.ctx.rect(0,0,t,r),this.ctx.fillStyle="brown",this.ctx.fill(),this.ctx.font="20px Arial",this.ctx.fillStyle="black",this.ctx.drawImage(Loader.getImage("xp"),15,0),this.ctx.fillText(this.hero.xp,55,25),this.ctx.drawImage(Loader.getImage("ecu"),110,0),this.ctx.fillText(this.hero.supply.ecu,150,25),this.ctx.drawImage(Loader.getImage("bois"),205,0),this.ctx.fillText(this.hero.supply.bois,245,25),this.ctx.drawImage(Loader.getImage("culture_ble"),300,0),this.ctx.fillText(this.hero.supply.farine,340,25),this.ctx.drawImage(Loader.getImage("farine"),395,0),this.ctx.fillText(this.hero.supply.farine,450,25),this.ctx.drawImage(Loader.getImage("pain"),505,0),this.ctx.fillText(this.hero.supply.pain,545,25),this.ctx.drawImage(Loader.getImage("cuivre"),600,0),this.ctx.fillText(this.hero.supply.cuivre,640,25),this.ctx.drawImage(Loader.getImage("fer"),695,0),this.ctx.fillText(this.hero.supply.fer,735,25),this.ctx.beginPath(),this.ctx.rect(0,r,map.tsize,s),this.ctx.fillStyle="brown",this.ctx.fill(),n=0,Game.ctx.drawImage(Loader.getImage("action"),0,s/10),Object.keys(objets).forEach(function(e){Game.hero.equipement==objets[e]?Game.ctx.drawImage(Loader.getImage(objets[e].img+"_use"),0,s/4+n):Game.ctx.drawImage(Loader.getImage(objets[e].img),0,s/4+n),n+=100}),this.ctx.beginPath(),this.ctx.rect(0,s-r,r,r),this.ctx.fillStyle="red",this.ctx.fill(),1==menuclick){this.ctx.beginPath(),this.ctx.rect(r,s-r,r,s),this.ctx.fillStyle="yellow",this.ctx.fill(),this.ctx.beginPath(),this.ctx.rect(2*r,s-r,r,s),this.ctx.fillStyle="blue",this.ctx.fill(),this.ctx.beginPath(),this.ctx.rect(3*r,s-r,r,s),this.ctx.fillStyle="green",this.ctx.fill(),this.ctx.beginPath(),this.ctx.rect(4*r,s-r,r,s),this.ctx.fillStyle="violet",this.ctx.fill(),this.ctx.beginPath(),this.ctx.rect(5*r,s-r,r,s),this.ctx.fillStyle="gray",this.ctx.fill(),this.ctx.beginPath(),this.ctx.rect(6*r,s-r,r,s),this.ctx.fillStyle="pink",this.ctx.fill();l=new Image;l.src="assets/menu/corn.png",this.ctx.drawImage(l,r,s-r);(l=new Image).src="assets/menu/moulin.png",this.ctx.drawImage(l,2*r,s-r);(l=new Image).src="assets/menu/boulangerie.png",this.ctx.drawImage(l,3*r,s-r);(l=new Image).src="assets/menu/iron_mine.png",this.ctx.drawImage(l,4*r,s-r);(l=new Image).src="assets/menu/mine_silver.png",this.ctx.drawImage(l,5*r,s-r);var l;(l=new Image).src="assets/menu/house.png",this.ctx.drawImage(l,6*r,s-r)}else this.ctx.clearRect(r,s-r,t,s);if(0!=menussclick){img=new Image,this.ctx.globalAlpha=.5,this.ctx.fillRect(0,s-6*r,330,160),this.ctx.globalAlpha=1,this.ctx.font="20px Arial",this.ctx.fillStyle="black",this.ctx.fillText(menussclickTitre,15,s-5*r),this.ctx.drawImage(Loader.getImage("ok"),250,s-5.5*r),this.ctx.drawImage(Loader.getImage("ko"),290,s-5.5*r),this.ctx.font="15px Arial";var c=description_fr.split("\n");this.ctx.fillStyle="blue";var u=1;for(i=0;i<c.length;i++)this.ctx.fillText(c[i],15,u+s-4*r),u+=15;u+=10,a=15,Object.keys(Game.supplyBuild).forEach(function(e){Game.hero.supply[e]>Game.supplyBuild[e]?Game.ctx.fillStyle="green":Game.ctx.fillStyle="red",Game.ctx.fillText(Game.supplyBuild[e],a,u+s-4*r),Game.ctx.drawImage(Loader.getImage(e),a,5+u+s-4*r),a+=40})}},Game._clickMenu=function(e,i,t,a,s){i>a.height-t&&e<t&&(0==menuclick?menuclick=1:(menuclick=0,menussclick=0)),i>a.height-t&&e>t&&1==menuclick&&(Game.supplyBuild=[],caracteristique=[],paramBuild=[],menussclick=1,e>t&&e<2*t&&(caracteristique.showLife=0,Game.supplyBuild.ecu=150,paramBuild.typeBatiment=10,paramBuild.typeTile=0,paramBuild.life=3,paramBuild.solid=0,menussclickTitre="Champs de blé",description_fr="Le blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine",description_en="EN blé mets 3 jours pour pousser\net permet de nourrir le moulin\n qui le transforme en farine"),e>2*t&&e<3*t&&(Game.supplyBuild.ecu=150,Game.supplyBuild.bois=150,caracteristique.level=1,caracteristique.attaque=0,caracteristique.showLife=1,caracteristique.portee=0,paramBuild.typeBatiment=20,paramBuild.typeTile=0,paramBuild.life=60,paramBuild.solid=1,menussclickTitre="Moulin",description_fr="Le moulin produit de la farine\n nécéssaire pour fabriquer du pain.",description_en="EN moulin produit de la farine nécéssaire pour fabriquer du pain."),e>3*t&&e<4*t&&(Game.supplyBuild.ecu=150,Game.supplyBuild.bois=150,Game.supplyBuild.cuivre=150,caracteristique.level=1,caracteristique.attaque=0,caracteristique.showLife=1,caracteristique.portee=0,paramBuild.typeBatiment=24,paramBuild.typeTile=0,paramBuild.life=60,paramBuild.solid=1,menussclickTitre="Boulangerie",description_fr="La boulangerie produit du pain\nIndispensable pour ne pas mourir de faim",description_fr="EN boulangerie produit du pain\nIndispensable pour ne pas mourir de faim"),e>4*t&&e<5*t&&(Game.supplyBuild.ecu=350,Game.supplyBuild.bois=150,caracteristique.level=1,caracteristique.attaque=0,caracteristique.showLife=1,caracteristique.portee=0,paramBuild.typeBatiment=32,paramBuild.typeTile=0,paramBuild.life=60,paramBuild.solid=1,menussclickTitre="Mine de cuivre",description_fr="Les mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.",description_en="EN mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets."),e>5*t&&e<6*t&&(Game.supplyBuild.ecu=350,Game.supplyBuild.bois=150,caracteristique.level=1,caracteristique.attaque=0,caracteristique.showLife=1,caracteristique.portee=0,paramBuild.typeBatiment=28,paramBuild.typeTile=0,paramBuild.life=60,paramBuild.solid=1,menussclickTitre="Mine de fer",description_fr="Les mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets.",description_en="EN mines de cuivre génèrent du cuivre\nnécessaire à la création\nde plusieurs bâtiments et objets."),e>6*t&&e<7*t&&(Game.supplyBuild.ecu=350,Game.supplyBuild.bois=150,Game.supplyBuild.cuivre=150,Game.supplyBuild.fer=150,caracteristique.level=1,caracteristique.attaque=10,caracteristique.showLife=1,caracteristique.portee=2,paramBuild.typeBatiment=6,paramBuild.typeTile=0,paramBuild.life=60,paramBuild.solid=1,menussclickTitre="Tourelle",description_fr="Les tourelles permettent d'attaquer\nles ennemis qui passent à proximité.",description_en="EN tourelles permettent d'attaquer\nles ennemis qui passent à proximité."))};