import { perguntar } from '../services/Input'
import { carregar } from '../services/Persistencia'
import { Relatorio } from '../models/Relatorio'

export async function gerarRelatorio(): Promise<void> {
    const codigoAeronave = await perguntar('codigo da aeronave: ')
    const nomeCliente = await perguntar('nome do cliente: ')
    const dataEntrega = await perguntar('data de entrega: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }

    const relatorio = new Relatorio(aeronave, nomeCliente, dataEntrega)
    relatorio.salvarEmArquivo()
}