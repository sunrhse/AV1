import { carregar, salvar } from "../services/Persistencia"
import { StatusPeca, TipoPeca } from "./enums"

export class Peca{
    nome: string
    tipo: TipoPeca
    fornecedor: string
    status: StatusPeca

    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca){
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    atualizarStatus(novoStatus: StatusPeca): void{
        this.status = novoStatus
    }

    salvar(): void{
        const lista = carregar('data/pecas.txt')
        const index = lista.findIndex((peca: any) => peca.nome === this.nome)
        if (index === -1){
            lista.push(this)
        } else {
            lista[index] = this
        }
        salvar('data/pecas.txt', lista)
    }

    carregar(): void{}
}