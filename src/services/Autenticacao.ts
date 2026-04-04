import { Funcionario } from "../models/Funcionario";
import { carregar } from "./Persistencia";

export function autenticacao(usuario: string, senha: string): Funcionario | null{
    const lista = carregar('data/funcionarios.txt')
    const encontrado = lista.find((f: any) => {
        const func = new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao)
        return func.autenticar(usuario, senha)
    })
    if (encontrado){
        return new Funcionario(encontrado.id, encontrado.nome, encontrado.telefone, encontrado.endereco, encontrado.usuario, encontrado.senha, encontrado.nivelPermissao)
    }
    return null
}