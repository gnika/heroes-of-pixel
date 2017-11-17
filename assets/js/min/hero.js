function Hero(i,t,s,e,h,a,o,l,p,n,m,r){this.map=i,this.x=t,this.y=s,this.life=e,this.xp=m,this.width=i.tsize,this.height=i.tsize,this.attaque=h,this.defense=a,this.equipement=r,this.supply={ecu:o,bois:l,argile:p,ble:n},this.image=Loader.getImage("hero"),this.addBuild=function(i,t,s,e,h,a,o,l){var p=0,n=0;if(Keyboard.isDown(Keyboard.LEFT)?p=-1:Keyboard.isDown(Keyboard.RIGHT)?p=1:Keyboard.isDown(Keyboard.UP)?n=-1:Keyboard.isDown(Keyboard.DOWN)&&(n=1),0!=p||0!=n)return!1;if(pos=s.getRow(t)*s.rows+s.getCol(i),abs2[pos+1]==a&&1==abs1[pos+1]){Game.hero.x=32+64*s.getCol(i),abs2[pos+1]=e;var m="build-"+s.getRow(t)+"-"+parseInt(s.getCol(i)+1,10)+"-ing";Game.nameBuild=new Building(s,i+32,t,s.getCol(i)+1,s.getRow(t),o,m,"hourstart",e,h,a,l),builds[s.getCol(i)+1+"-"+s.getRow(t)]=Game.nameBuild,anim=new animation(s,i+32,t,"cloud")}},this.creuse=function(i,t,s){var e=Game.getTool(),h=this.supply.ecu;pos=s.getRow(t)*s.rows+s.getCol(i);var a=s.getCol(i),o=s.getRow(t);0==abs2[pos]&&2!=abs1[pos]&&"pelle"==e?(abs1[pos]=2,abs2[pos]=0,this.supply.ecu=h+10,document.getElementById("argent_value").innerHTML=this.supply.ecu):2==abs1[pos]&&"pelle"==e?(this.supply.ecu=h+1,document.getElementById("argent_value").innerHTML=this.supply.ecu):8!=abs2[pos]&&9!=abs2[pos]||1!=abs1[pos]||"faux"!=e?10==abs2[pos]&&"faux"==e&&10==builds[a+"-"+o].batiment&&(builds[a+"-"+o].life=builds[a+"-"+o].life-1,0==builds[a+"-"+o].life?(delete builds[a+"-"+o],abs1[pos]=2,abs2[pos]=0):abs2[pos]=10,this.supply.ble=this.supply.ble+100,document.getElementById("ble_value").innerHTML=this.supply.ble):(abs1[pos]=2,abs2[pos]=0,this.supply.ecu=h+1,document.getElementById("argent_value").innerHTML=this.supply.ecu),this.supply.ecu>h&&(anim=new animation(s,i,t,"coin"))}}Hero.SPEED=256,Hero.prototype.move=function(i,t,s){this.x+=t*Hero.SPEED*i,this.y+=s*Hero.SPEED*i,this._collide(t,s),this._ennemy(t,s),this._loselifeTile(t,s);var e=this.map.cols*this.map.tsize,h=this.map.rows*this.map.tsize;this.x=Math.max(0,Math.min(this.x,e)),this.y=Math.max(0,Math.min(this.y,h)),(this.x>=xHeroClick+this.map.tsize||this.y>=yHeroClick+this.map.tsize||this.x<=xHeroClick-this.map.tsize||this.y<=yHeroClick-this.map.tsize)&&(0==clickCanvasX&&0==clickCanvasY||(this.y=this.map.getCol(this.y)*this.map.tsize+this.map.tsize/2,this.x=this.map.getRow(this.x)*this.map.tsize+this.map.tsize/2),clickCanvasX=0,clickCanvasY=0)},Hero.prototype._loselifeTile=function(i,t){var s=this.x-this.width/2,e=this.x+this.width/2-1,h=this.y-this.height/2,a=this.y+this.height/2-1,o=this.map.isLoseWinLife(s,h)||this.map.isLoseWinLife(e,h)||this.map.isLoseWinLife(e,a)||this.map.isLoseWinLife(s,a);"life"==o&&this.life<60&&(this.life=this.life+.1),1==o&&this.life>0&&(this.life=this.life-.1)},Hero.prototype._collide=function(i,t){var s,e,h=this.x-this.width/2,a=this.x+this.width/2-1,o=this.y-this.height/2,l=this.y+this.height/2-1;(this.map.isSolidTileAtXY(h,o)||this.map.isSolidTileAtXY(a,o)||this.map.isSolidTileAtXY(a,l)||this.map.isSolidTileAtXY(h,l))&&(t>0?(s=this.map.getRow(l),this.y=-this.height/2+this.map.getY(s)):t<0?(s=this.map.getRow(o),this.y=this.height/2+this.map.getY(s+1)):i>0?(e=this.map.getCol(a),this.x=-this.width/2+this.map.getX(e)):i<0&&(e=this.map.getCol(h),this.x=this.width/2+this.map.getX(e+1)))},Hero.prototype._ennemy=function(i,t){var s,e,h=this.x-this.width/2,a=this.x+this.width/2-1,o=this.y-this.height/2,l=this.y+this.height/2-1,p=this.map.isEnnemyTileAtXY(h,o)||this.map.isEnnemyTileAtXY(a,o)||this.map.isEnnemyTileAtXY(a,l)||this.map.isEnnemyTileAtXY(h,l);if(p){if(t>0?(s=this.map.getRow(l),this.y=-this.height/2+this.map.getY(s)):t<0?(s=this.map.getRow(o),this.y=this.height/2+this.map.getY(s+1)):i>0?(e=this.map.getCol(a),this.x=-this.width/2+this.map.getX(e)):i<0&&(e=this.map.getCol(h),this.x=this.width/2+this.map.getX(e+1)),this.life>0){var n=p.attaque-this.defense;n<0&&(n=.1);var m=this.attaque-p.defense;m<0&&(m=.1),this.life=this.life-n;var r=Game.getTool();p.life>0&&"epee"==r&&(p.life=p.life-m)}}else Object.keys(monsters).forEach(function(i){monsters[i].life<60&&(monsters[i].life=monsters[i].life+monsters[i].regeneration)})};