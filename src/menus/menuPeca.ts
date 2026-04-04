import { perguntar } from '../services/Input'
import { Peca } from '../models/Peca'
import { TipoPeca, StatusPeca } from '../models/enums'
import { carregar } from '../services/Persistencia'

export async function cadastrarPeca(): Promise<void> {
    const nome = await perguntar('nome: ')
    const fornecedor = await perguntar('fornecedor: ')

    console.log('tipos de peca:')
    console.log('nacional')
    console.log('importada')

    const opcaoTipo = await perguntar('escolha o tipo: ')

    const tipos: Record<string, TipoPeca> = {
        'nacional': TipoPeca.NACIONAL,
        'importada': TipoPeca.IMPORTADA
    }

    const tipo = tipos[opcaoTipo]
    if (!tipo){
        console.log('opcao invalida')
        return
    }

    console.log('status da peca:')
    console.log('em producao')
    console.log('em transporte')
    console.log('pronta')

    const opcaoStatus = await perguntar('escolha o status: ')

    const statuses: Record<string, StatusPeca> = {
    'em producao': StatusPeca.EM_PRODUCAO,
    'em transporte': StatusPeca.EM_TRANSPORTE,
    'pronta': StatusPeca.PRONTA
    }

    const status = statuses[opcaoStatus]
    if (!status){
        console.log('opcao invalida')
        return
    }

    const peca = new Peca(nome, tipo, fornecedor, status)
    peca.salvar()
    console.log('peca cadastrada')
}   

export function listarPecas(): void {
    const lista = carregar('data/pecas.txt')

    if (lista.length === 0){
        console.log('nenhuma peca cadastrada')
        return
    }
    lista.forEach((p: any) => {
        console.log(`nome: ${p.nome}`)
        console.log(`tipo: ${p.tipo}`)
        console.log(`fornecedor: ${p.fornecedor}`)
        console.log(`status: ${p.status}`)
    })
}

export async function atualizarStatusPeca(): Promise<void> {
    const nome = await perguntar('nome da peca: ')
    const lista = carregar('data/pecas.txt')

    const encontrada = lista.find((p: any) => p.nome === nome)
    if (!encontrada){
        console.log('peca nao encontrada')
        return
    }

    console.log('novo status:')
    console.log('em producao')
    console.log('em transporte')
    console.log('pronta')

    const opcaoStatus = await perguntar('escolha o status: ')

    const statuses: Record<string, StatusPeca> = {
        'em producao': StatusPeca.EM_PRODUCAO,
        'em transporte': StatusPeca.EM_TRANSPORTE,
        'pronta': StatusPeca.PRONTA
    }

    const status = statuses[opcaoStatus]
    if (!status){
        console.log('opcao invalida')
        return
    }

    const peca = new Peca(encontrada.nome, encontrada.tipo, encontrada.fornecedor, encontrada.status)
    peca.atualizarStatus(status)
    peca.salvar()
    console.log('status atualizado')
}