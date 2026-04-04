import { carregar, salvar } from "../services/Persistencia"
import { NivelPermissao } from "./enums"

export class Funcionario{
    id: string
    nome: string
    telefone: string
    endereco: string
    usuario: string
    senha: string
    nivelPermissao: NivelPermissao

    constructor(
        id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao //socorro, quanta coisa
    ){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    autenticar(usuario: string, senha: string): boolean{
        return this.usuario === usuario && this.senha === senha
    }

    salvar(): void{
        const lista = carregar('data/funcionarios.txt')
        const index = lista.findIndex((funcionario: any) => funcionario.id === this.id)
        if (index === -1){
            lista.push(this)
        } else {
            lista[index] = this
        }
        salvar('data/funcionarios.txt', lista)
    }

    carregar(): void{}
}