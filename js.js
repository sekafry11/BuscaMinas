new function (){
  var ancho = 20,
    alto = 20,
    minas = 50,
    banderas = 0,
    agua = ancho*alto-50;
    tabla = [],
    ts = this,

    t_element = newNode("table", document.getElementById("game"));

    // Visual config
    l_ancho = newNode("label", a = ((a = document.getElementById("config"))?a: null), {"innerHTML": "Alto: "});
    i_ancho = newNode("input", l_ancho, {"type": "number", "value": ancho, "onchange": function(){ancho = i_ancho.value;}});
    l_alto = newNode("label", a, {"innerHTML": "Ancho: "});
    i_alto = newNode("input", l_alto, {"type": "number", "value": alto, "onchange": function(){alto = i_alto.value;}});
    l_minas = newNode("label", a, {"innerHTML": "Minas: "});
    i_minas = newNode("input", l_minas, {"type": "number", "value": minas, "onchange": function(){minas = i_minas.value;}});
    b_reset = newNode("button", a, {"innerHTML": "Nuevo Juego", "onclick": reset});

    // Visual status
    p_minas = newNode("p", a = ((a = document.getElementById("status"))?a: null), {"innerHTML": "Minas: "});
    s_minas = newNode("span", p_minas, {"innerHTML": minas});
    p_agua = newNode("p", a, {"innerHTML": "Agua: "});
    s_agua = newNode("span", p_agua, {"innerHTML": agua});
function Cell(x, y, tr, p){
  var x = x,
    y=y,
    mina = false,
    n = 0,
    clicked = false,
    bandera = false,
    ts = this,
    tsp = p;

  //Visual
   var span = newNode("span", null, {"innerHTML": "0"});
  this.click = function (){
    if(clicked || bandera){return;}
    clicked = true;
    td.appendChild(span);
    if(mina){
      alert("Game Over");
    }else{
      tsp.changeAgua();
      td.style.backgroundColor = "#"+(0xfff-parseInt("0x"+n+""+n+""+n, 16)).toString(16);
      if(n == 0){
        var tx, ty;
        for(tx = -1; tx < 2; ++tx){
          for(ty = -1; ty < 2; ++ty){
            tsp.click(tx+x, ty+y);
          }
        }
      }
    }
  }
  this.clickRight = function(){
    if(clicked){

    }else{
      bandera = !bandera;
      td.setAttribute("class", ((bandera)?"mina": ""));
      tsp.changeBanderas((bandera)?1:-1);
    }
    return false;
  }
  this.setMina = function(a){mina = true;
    span.innerHTML = "true";
    var tx ,ty;
    for(tx = -1; tx < 2; ++tx){
      for(ty = -1; ty < 2; ++ty){
        a(tx+x, ty+y);
      }
    }
  };
  this.addMina = function(){
    ++n;
    if(!mina){
    span.innerHTML = n;
    }
  };
  this.isMina = function(){return mina};
  var td = newNode("td", tr, {"onclick": ts.click, "oncontextmenu": ts.clickRight});
}


this.click = function (tx, ty){
  if(tx >= 0 && tx < ancho && ty >= 0 && ty < alto){
    tabla[tx][ty].click();
  }
};

function generarTabla(){
  var r, c, d;
  for(c = 0; c < ancho; ++c){
    r = newNode("tr", t_element);
    for(d = 0; d < alto; ++d){
      if(!tabla[c]){tabla[c] = []}
      tabla[c][d] = new Cell(c, d, r, ts);
    }
  }
}
function generarMinas(a){
  var generadas = 0, x, y;
  while(generadas < minas){
    x = Math.floor(Math.random()*ancho),
    y = Math.floor(Math.random()*alto);
    if(tabla[x][y].isMina()){continue;}
    tabla[x][y].setMina(addMina);
    ++generadas;
  }

}
function addMina(tx, ty){
  if(tx >= 0 && tx < ancho && ty >= 0 && ty < alto){
    tabla[tx][ty].addMina();
  }
}
function getMinas(){return minas-banderas}
this.changeBanderas = function (a){
  banderas += a;
  if(a == 0){banderas = 0;}
  s_minas.innerHTML = getMinas();
}
this.changeAgua = function(a){
  if(a){
    agua = a;
  }else{
    --agua;
  }
  s_agua.innerHTML = agua;
  if(agua == 0){alert("Todas las minas encontradas")}
}
function reset(){
  tabla = [];
  t_element.innerHTML = "";
  ts.changeAgua(alto*ancho-minas);
  ts.changeBanderas(0);
  init();
}
function init(){
  generarTabla();
  generarMinas();
}
init();
}
