function Building(map, x, y, row, col, life, name, batiment, caracteristique, typeTile, solid) {
    this.map = map;
    this.life = life;
    this.name = name;
     this.x = x;
     this.y = y;
    this.col = col;
    this.row = row;
    this.hour = hour;//heure de construction
    this.day = day;//jour de construction
    this.batiment = batiment;
    this.caracteristique=caracteristique;
    //si batiment envoit des projectiles
    this.xDelta=0;
    this.yDelta=0;
    this.cible=0;
    this.cibleMouvante=0;
    this.typeTile=typeTile;
    this.solid=solid;
    
    this.calculPortee = function(x, y, portee, rowMonstre, colMonstre)
    { 
    
        xLimiteMoins = x - portee;
        xLimitePlus = x + portee;
        
        yLimiteMoins = y - portee;
        yLimitePlus = y + portee;
        
        if(xLimiteMoins<0)
            xLimiteMoins = 0;
        if(yLimiteMoins<0)
            yLimiteMoins = 0;
        
        var porteeX = [x];
        var porteeY = [y];
        
        for(var i=1;i<=portee;i++){
            porteeX.push(x-i); 
            porteeX.push(x+i); 
            porteeY.push(y-i); 
            porteeY.push(y+i); 
        }
        
        if(porteeX.includes(rowMonstre) && porteeY.includes(colMonstre))
            return true;
        else 
            return false;
        
    }
 } 