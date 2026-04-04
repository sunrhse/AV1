import { StatusEtapa } from "./enums"
import { Funcionario } from "./Funcionario"

export class Etapa{
    nome: string
    prazo: string
    status: StatusEtapa
    funcionarios: Funcionario[]

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]){
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }

    iniciar(): void{
        if (this.status == StatusEtapa.PENDENTE){
            this.status = StatusEtapa.ANDAMENTO
        }
    }
    finalizar(): void{
        if (this.status == StatusEtapa.ANDAMENTO){
            this.status = StatusEtapa.CONCLUIDA
        }
    }

    associarFuncionario(f: Funcionario): void{
        const associado = this.funcionarios.some(funcionario => funcionario.id === f.id)
        if(!associado){
            this.funcionarios.push(f)
        }
    }

    listarFuncionarios(): Funcionario[]{
        return this.funcionarios
    }
}