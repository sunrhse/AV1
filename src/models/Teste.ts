import { carregar, salvar } from "../services/Persistencia";
import { ResultadoTeste, TipoTeste } from "./enums";

export class Teste{
    tipo: TipoTeste
    resultado: ResultadoTeste

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
    }

    salvar(): void{
        const lista = carregar('data/testes.txt')
        const index = lista.findIndex((teste: any) => teste.tipo === this.tipo)
        if (index === -1){
            lista.push(this)
        } else {
            lista[index] = this
        }
        salvar('data/testes.txt', lista)
    }

    carregar(): void{}
}