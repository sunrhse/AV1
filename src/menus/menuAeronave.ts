import { perguntar } from '../services/Input'
import { Aeronave } from '../models/Aeronave'
import { TipoAeronave } from '../models/enums'
import { carregar } from '../services/Persistencia'

export async function cadastrarAeronave(): Promise<void> {
    const codigo = await perguntar('codigo: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const existe = listaAeronaves.find((a: any) => a.codigo === codigo)
    if (existe){
        console.log('ja existe uma aeronave com esse codigo')
        return
    }

    const modelo = await perguntar('modelo: ')
    const capacidade = Number(await perguntar('capacidade: '))
    const alcance = Number(await perguntar('alcance: '))

    console.log('tipos de aeronave:')
    console.log('comercial')
    console.log('militar')

    const opcao = await perguntar('escolha o tipo: ')

    const tipos: Record<string, TipoAeronave> = {
        'comercial': TipoAeronave.COMERCIAL,
        'militar': TipoAeronave.MILITAR
    }

    const tipo = tipos[opcao]
    if (!tipo){
        console.log('opcao invalida')
        return
    }

    const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance, [], [], [])
    aeronave.salvar()
    console.log('aeronave cadastrada')
}

export function listarAeronaves(): void {
    const lista = carregar('data/aeronaves.txt')

    if (lista.length === 0){
        console.log('nenhuma aeronave cadastrada')
        return
    }
    lista.forEach((a: any) => {
        console.log(`codigo: ${a.codigo}`)
        console.log(`modelo: ${a.modelo}`)
        console.log(`tipo: ${a.tipo}`)
    })
}

export async function verDetalhesAeronave(): Promise<void> {
    const codigo = await perguntar('codigo da aeronave: ')
    const lista = carregar('data/aeronaves.txt')

    const encontrada = lista.find((a: any) => a.codigo === codigo)
    if (!encontrada){
        console.log('aeronave nao encontrada')
        return
    }
    const aeronave = new Aeronave(encontrada.codigo, encontrada.modelo, encontrada.tipo, encontrada.capacidade, encontrada.alcance, encontrada.pecas, encontrada.etapas, encontrada.testes)
    aeronave.detalhes()
}