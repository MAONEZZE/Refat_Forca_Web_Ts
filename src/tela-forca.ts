import { Forca } from "./forca.js";

class TelaForca{
  btnEnviar: HTMLButtonElement;
  btnRecomecar: HTMLButtonElement;
  campoChute: HTMLInputElement;
  img: HTMLImageElement;
  quadro: HTMLInputElement;
  jogar: Forca;

  constructor(){
    this.jogar = new Forca();
    this.registrarElementos();
    this.registrarEventos();
    this.adicionarQuadros();
  }

  registrarElementos(): void{
    this.btnEnviar = document.getElementById("btnEnviar") as HTMLButtonElement;
    this.btnRecomecar = document.getElementById("btnR") as HTMLButtonElement;
    this.campoChute = document.getElementById("txtChutado") as HTMLInputElement;
    this.img = document.getElementById("imgForca") as HTMLImageElement;
  }

  registrarEventos(): void{
    this.btnEnviar.addEventListener("click", () => this.verificador())
    this.btnRecomecar.addEventListener("click", () => this.atualizar())
  }

  adicionarQuadros(): void{
    for(let i= 0; i < this.jogar.palavraSorteada.length; i++){
      this.quadro = document.getElementById("quadro") as HTMLInputElement;
      let novoInput = document.createElement("input");

      novoInput.id = `${i}`;
      novoInput.type = "text";
      novoInput.readOnly = true;   
      novoInput.style.borderRadius = "10px";
      novoInput.style.textAlign = "center";
      novoInput.style.width = `${50/this.jogar.palavraSorteada.length}%`

      this.quadro.appendChild(novoInput);
    }
  }

  atualizar(): void{
    window.location.reload();
    //this.jogar = new Forca();
  }

  alteradorImg(): void{
    this.img.src = this.jogar.pegarImg();
  }

  avaliadorPalavrasFinais(acertou: boolean){
    let txt = document.getElementById("textoF") as HTMLSpanElement;
    let txtFinal = this.jogar.pegarMsgFinal(acertou);
    txt.style.display = "block";

    if(acertou){
      txt.innerText = txtFinal;
      txt.style.color = "green";
    }
    else{
      txt.innerText = txtFinal;
      txt.style.color = "red";
    }
  }

  desabilitadorQuadros(acertou: boolean){
    this.btnEnviar.disabled = true;
    this.campoChute.disabled = true;

    for(let i = 0; i < this.jogar.palavraSorteada.length; i++){
      this.quadro = document.getElementById(`${i}`) as HTMLInputElement;
      this.quadro.style.display = "none";
    }

    this.avaliadorPalavrasFinais(acertou);
  }

  atribuirValorQuadros(): void{
    for(let i = 0; i < this.jogar.palavraSorteada.length; i++){
      this.quadro = document.getElementById(`${i}`) as HTMLInputElement;

      if(this.jogar.arrayPalavraFormada[i] != undefined){
        this.quadro.value = this.jogar.arrayPalavraFormada[i];
      }
    }
  }

  verificador(): void{
    let txtChute = this.campoChute.value.toUpperCase();

    let ehValido = this.jogar.verificaAcertosEFormaPalavra(txtChute);

    this.campoChute.value = "";
    
    if(ehValido){
      this.atribuirValorQuadros();
      this.campoChute.value = "";
      
      if(this.jogar.verificadorPalavraChuteIgualSorteada()){
        this.desabilitadorQuadros(true)
      }
    }
    else if(ehValido == false){
      this.verificadorErros();
      this.campoChute.value = "";
    }
  }

  verificadorErros(){
    this.alteradorImg();
    
    if(this.jogar.verificadorFinalizacaoPorErro()){
      this.desabilitadorQuadros(false);
    }
  }
}

window.addEventListener("load", () => new TelaForca());