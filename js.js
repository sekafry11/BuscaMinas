new function (){
  var ancho = 20,
    alto = 20,
    minas = 50,
    banderas = 0,
    agua = ancho*alto-50;
    tabla = [],
    minas_a = [],
    sonar = false,
    ola = false,
    ola_m = 5,
    ola_p = 10,
    movi = 0,
    movidas = 0,
    ts = this,

    t_element = newNode("table", document.getElementById("game"));

    // Visual config
    l_ancho = newNode("label", a = ((a = document.getElementById("config"))?a: null), {"innerHTML": "Alto: "});
    i_ancho = newNode("input", l_ancho, {"type": "number", "value": ancho, "onchange": function(){ancho = i_ancho.value;}});
    l_alto = newNode("label", a, {"innerHTML": "Ancho: "});
    i_alto = newNode("input", l_alto, {"type": "number", "value": alto, "onchange": function(){alto = i_alto.value;}});

    l_minas = newNode("label", a, {"innerHTML": "Minas: "});
    i_minas = newNode("input", l_minas, {"type": "number", "value": minas, "onchange": function(){minas = i_minas.value;}});

    l_sonar = newNode("label", a, {"innerHTML": "Activar sonar: "});
    i_sonar = newNode("input", l_sonar, {"type": "checkbox", "checked": sonar, "onchange": function(){sonar = i_sonar.checked}});

    l_ola = newNode("label", a, {"innerHTML": "Activar olas: "});
    c_ola = newNode("input", l_ola, {"checked": ola, "type": "checkbox", "onchange": function(){ola = c_ola.checked;}});
    li_ola = newNode("label", a, {"innerHTML": "Intervalo de las olas (cada x pasos): "});
    i_ola = newNode("input", li_ola, {"value": ola_m, "onchange": function(){ola_m = i_ancho.value;}});
    lp_ola = newNode("input", a, {"innerHTML": "% de fuerza de las olas: "});
    ip_ola = newNode("input", a, {"value": ola_p, "type": "number", "onchange": function(){ola_p = ip_ola.value}});


    b_reset = newNode("button", a, {"innerHTML": "Nuevo Juego", "onclick": reset});

    // Visual status
    p_minas = newNode("p", a = ((a = document.getElementById("status"))?a: null), {"innerHTML": "Minas: "});
    s_minas = newNode("span", p_minas, {"innerHTML": minas});

    p_agua = newNode("p", a, {"innerHTML": "Agua: "});
    s_agua = newNode("span", p_agua, {"innerHTML": agua});

    p_ola = newNode("p", a, {"innerHTML": "Pasos para siguiente ola: "});
    s_ola = newNode("span", p_ola, {"innerHTML": ola_p});
    pm_ola = newNode("p", a, {"innerHTML": "Minas movidas en la ultima ola: "});
    sm_ola = newNode("span", pm_ola, movidas);
function Cell(x, y, tr, p){
  var x = x,
    y=y,
    mina = false,
    n = 0,
    clicked = false,
    bandera = false,
    bcolor = "#fff",
    ts = this,
    tsp = p;

  function loadBColor (a){
    if(clicked || sonar || a){
      td.style.backgroundColor = ((mina)?"#000": "#"+(0xfff-parseInt("0x"+n+""+n+"0", 16)).toString(16));
      td.appendChild(span);
    }else if(bandera){
      td.style.backgroundColor = "red";
    }else{
      td.style.backgroundColor = "#fff";
    }
  }
  this.click = function (){
    if(clicked || bandera){return;}
    clicked = true;
    ts.show();

    if(mina){
      span.innerHTML = "mina";
      tsp.showAll();
      alert("Game Over");
    }else{
      tsp.changeAgua();
      if(n == 0){
        var tx, ty;
        for(tx = -1; tx < 2; ++tx){
          for(ty = -1; ty < 2; ++ty){
            if(n == 0){
              tsp.click(tx+x, ty+y);
            }
          }
        }
      }
      tsp.changeMinas();
    }
  }
  this.clickRight = function(){
    if(clicked){
      // Cargar cantidad de banderas, etc
    }else{
      bandera = !bandera;
      loadBColor();
      tsp.changeBanderas((bandera)?1:-1);
    }
    return false;
  }
  this.setMina = function(a, b){
    mina = b;
    var tx ,ty;
    for(tx = -1; tx < 2; ++tx){
      for(ty = -1; ty < 2; ++ty){
        a(tx+x, ty+y, b);
      }
    }
  };
  this.addMina = function(a){
    (a)?++n:--n;
    span.innerHTML = n;
    loadBColor();
  };
  this.isMina = function(){return mina};
  this.isBandera = function(){return bandera;}
  this.isClicked = function(){return clicked};
  this.show = function(){loadBColor(true);}
    //Visual
  var td = newNode("td", tr, {"onclick": ts.click, "oncontextmenu": ts.clickRight}),
    span = newNode("span", ((sonar)?td:null), {"innerHTML": "0"});
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
    tabla[x][y].setMina(addMina, true);
    minas_a.push(tabla[x][y]);
    ++generadas;
  }

}
function addMina(tx, ty, a){
  if(tx >= 0 && tx < ancho && ty >= 0 && ty < alto){
    tabla[tx][ty].addMina(a);
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
this.changeMinas = function(a){
  if(!ola){return false;}
  ++movi
  if(!isNaN(a)){movi = a}
  if(movi >= ola_m){
    movi = 0;
    movidas = 0;
    sm_ola.innerHTML = movidas;
    var a = minas_a.length*(ola_p/100);
    var b = minas_a.slice();
    var c;
    for(var d = 0; d < a ; ++d){
      if(moveMina(c = b.splice(Math.floor(Math.random()*b.length), 1)[0])){
        minas_a.splice(minas_a.indexOf(c), 1);
        sm_ola.innerHTML = ++movidas;
      }
    }
  }
  s_ola.innerHTML = ola_m-movi;
}

this.showAll = function(){
  for(a in minas_a){
    minas_a[a].show();
  }
}
function moveMina(o){
  var x = Math.floor(Math.random()*ancho),
    y = Math.floor(Math.random()*alto);
  if(!o.isClicked() && !o.isBandera() && !tabla[x][y].isMina() && !tabla[x][y].isClicked() && !tabla[x][y].isBandera()){
    o.setMina(addMina, false);
    tabla[x][y].setMina(addMina, true);
    minas_a.push(tabla[x][y]);
    return true;
  }else{
    return false;
  }
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
