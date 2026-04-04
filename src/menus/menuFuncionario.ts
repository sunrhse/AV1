import { perguntar } from '../services/Input'
import { Funcionario } from '../models/Funcionario'
import { NivelPermissao } from '../models/enums'
import { carregar } from '../services/Persistencia'

export async function cadastrarFuncionario(): Promise<void>{
    const id = await perguntar('id: ')
    const nome = await perguntar('nome: ')
    const telefone = await perguntar('telefone: ')
    const endereco = await perguntar('endereco: ')
    const usuario = await perguntar('usuario: ')
    const senha = await perguntar('senha: ')

    console.log('niveis de permissao:')
    console.log('administrador')
    console.log('engenheiro')
    console.log('operador')

    const opcao = await perguntar('escolha o nivel de permissao: ')

    const niveis: Record<string, NivelPermissao> = {
        'administrador': NivelPermissao.ADMINISTRADOR,
        'engenheiro': NivelPermissao.ENGENHEIRO,
        'operador': NivelPermissao.OPERADOR
    }

    const nivel = niveis[opcao]
    if (!nivel){
        console.log('opcao invalida')
        return
    }

    const funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel)
    funcionario.salvar()
    console.log('funcionario cadastrado')
}

export function listarFuncionarios(): void{
    const lista = carregar('data/funcionarios.txt')
    if (lista.length === 0){
        console.log('nenhum funcionario cadastrado')
        return
    }
    lista.forEach((f: any) => {
        console.log(`id: ${f.id}, nome: ${f.nome}`)
        console.log(`usuario: ${f.usuario}`)
        console.log(`nivel: ${f.nivelPermissao}`)
    })
}