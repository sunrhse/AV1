import { carregar, salvar } from "../services/Persistencia"
import { TipoAeronave } from "./enums"
import { Etapa } from "./Etapa"
import { Peca } from "./Peca"
import { Teste } from "./Teste"

export class Aeronave{
    codigo: string
    modelo: string
    tipo: TipoAeronave
    capacidade: number
    alcance: number
    pecas: Peca[]
    etapas: Etapa[]
    testes: Teste[]

    constructor(
        codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number, pecas: Peca[], etapas: Etapa[], testes: Teste[]
    ){
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
        this.pecas = pecas
        this.etapas = etapas
        this.testes = testes
    }

    detalhes(){
        console.log(`codigo: ${this.codigo}`)
        console.log(`modelo: ${this.modelo}`)
        console.log(`tipo: ${this.tipo}`)
        console.log(`capacidade: ${this.capacidade}`)
        console.log(`alcance: ${this.alcance}`)
        console.log('pecas:')
        this.pecas.forEach(peca => console.log(`${peca.nome}: ${peca.tipo}, fornecedor ${peca.fornecedor}, ${peca.status}`))
        console.log('etapas: ')
        this.etapas.forEach(etapa => console.log(`${etapa.nome}: ${etapa.status}, prazo: ${etapa.prazo}`))
        console.log('testes: ')
        this.testes.forEach(teste => console.log(`teste: ${teste.tipo}, resultado: ${teste.resultado}`))
    }

    salvar(): void{
        const lista = carregar('data/aeronaves.txt')
        const index = lista.findIndex((aeronave: any) => aeronave.codigo === this.codigo)
        if (index === -1){
            lista.push(this)
        } else {
            lista[index] = this
        }
        salvar('data/aeronaves.txt', lista)
    }

    carregar(): void{}
}