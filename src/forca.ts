export class Forca {
  arrayImg = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  arrayPalavraFormada: string[];
  palavraSorteada: string;
  erros: number = 0;

  constructor(){
    this.sortearPalavra();
    this.arrayPalavraFormada = new Array(this.palavraSorteada.length);
  }

  pegarImg(): string{
    return `assets/${this.arrayImg[this.erros]}`;
  }

  sortearPalavra(){
    let palavras = [ "ABACATE", "ABACAXI","ACEROLA", "AÇAÍ", "ARAÇA", "BACABA", "BACURI", "BANANA", "CAJA",
    "CAJU", "CARAMBOLA", "CUPUAÇU", "GRAVIOLA", "GOIABA", "JABUTICABA", "JENIPAPO" ,"MAÇA", 
    "MANGABA", "MANGA", "MARACUJA", "MURICI", "PEQUI", "TAMARINDO", "CAQUI", "JACA",
    "PITANGA", "PITAYA", "SAPOTI", "TANGERINA", "UMBU", "UVA", "UVAIA"];

    let i = Math.floor(Math.random() * palavras.length);

    this.palavraSorteada = palavras[i];
    console.log(this.palavraSorteada)
  }

  verificaAcertosEFormaPalavra(txtChute: string): boolean{
    let ehValido = false;

    for(let i = 0; i < this.palavraSorteada.length; i++){
        
      if(txtChute == this.palavraSorteada[i]){
        ehValido = true;
        console.log(txtChute);
        this.arrayPalavraFormada[i] = txtChute;
      }
    }
    
    return ehValido;
  }

  verificadorFinalizacaoPorErro(): boolean{
    this.erros++;

    if(this.erros == 6){
      return true;
    }
    else{
      return false;
    }
  }

  pegarMsgFinal(acertou: boolean): string{
    if(acertou){
      return "Parabéns, você acertou a palavra " + this.palavraSorteada + ", jogue de novo!";
    }
    else{
      return "Infelizmente acabou as suas chances, tente de novo!";
    }
  }

  verificadorPalavraChuteIgualSorteada(): boolean{
    let palavra: string = "";

    for(let i = 0; i < this.palavraSorteada.length; i++){
      palavra = palavra + this.arrayPalavraFormada[i];
    }

    return palavra == this.palavraSorteada;
  }
}