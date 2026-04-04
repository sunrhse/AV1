import { perguntar } from '../services/Input'
import { Teste } from '../models/Teste'
import { TipoTeste, ResultadoTeste } from '../models/enums'
import { carregar, salvar } from '../services/Persistencia'

export async function registrarTeste(): Promise<void> {
    const codigoAeronave = await perguntar('codigo da aeronave: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }

    console.log('tipos de teste:')
    console.log('eletrico')
    console.log('hidraulico')
    console.log('aerodinamico')

    const opcaoTipo = await perguntar('escolha o tipo: ')

    const tipos: Record<string, TipoTeste> = {
        'eletrico': TipoTeste.ELETRICO,
        'hidraulico': TipoTeste.HIDRAULICO,
        'aerodinamico': TipoTeste.AERODINAMICO
    }

    const tipo = tipos[opcaoTipo]
    if (!tipo){
        console.log('opcao invalida')
        return
    }

    console.log('resultado do teste:')
    console.log('aprovado')
    console.log('reprovado')

    const opcaoResultado = await perguntar('escolha o resultado: ')

    const resultados: Record<string, ResultadoTeste> = {
        'aprovado': ResultadoTeste.APROVADO,
        'reprovado': ResultadoTeste.REPROVADO
    }

    const resultado = resultados[opcaoResultado]
    if (!resultado){
        console.log('opcao invalida')
        return
    }

    const teste = new Teste(tipo, resultado)
    aeronave.testes.push(teste)
    salvar('data/aeronaves.txt', listaAeronaves)
    console.log('teste registrado')
}

export async function listarTestes(): Promise<void> {
    const codigoAeronave = await perguntar('codigo da aeronave: ')
    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }
    if (aeronave.testes.length === 0){
        console.log('nenhum teste registrado')
        return
    }
    aeronave.testes.forEach((t: any) => {
        console.log(`tipo: ${t.tipo}`)
        console.log(`resultado: ${t.resultado}`)
    })
}