import { perguntar } from '../services/Input'
import { Etapa } from '../models/Etapa'
import { StatusEtapa } from '../models/enums'
import { carregar } from '../services/Persistencia'
import { salvar } from '../services/Persistencia'
import { Funcionario } from '../models/Funcionario'

export async function cadastrarEtapa(): Promise<void> {
    const nome = await perguntar('nome da etapa: ')
    const prazo = await perguntar('prazo: ')
    const codigoAeronave = await perguntar('codigo da aeronave: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }

    const etapa = new Etapa(nome, prazo, StatusEtapa.PENDENTE, [])
    aeronave.etapas.push(etapa)
    salvar('data/aeronaves.txt', listaAeronaves)
    console.log('etapa cadastrada')
}

export async function iniciarEtapa(): Promise<void> {
    const codigoAeronave = await perguntar('codigo da aeronave: ')
    const nomeEtapa = await perguntar('nome da etapa: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }

    const etapaIndex = aeronave.etapas.findIndex((e: any) => e.nome === nomeEtapa)
    if (etapaIndex === -1){
        console.log('etapa nao encontrada')
        return
    }

    const etapa = new Etapa(aeronave.etapas[etapaIndex].nome, aeronave.etapas[etapaIndex].prazo, aeronave.etapas[etapaIndex].status, aeronave.etapas[etapaIndex].funcionarios)
    etapa.iniciar()
    aeronave.etapas[etapaIndex] = etapa
    salvar('data/aeronaves.txt', listaAeronaves)
    console.log('etapa iniciada')
}

export async function finalizarEtapa(): Promise<void> {
    const codigoAeronave = await perguntar('codigo da aeronave: ')
    const nomeEtapa = await perguntar('nome da etapa: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }

    const etapaIndex = aeronave.etapas.findIndex((e: any) => e.nome === nomeEtapa)
    if (etapaIndex === -1){
        console.log('etapa nao encontrada')
        return
    }

    if (etapaIndex > 0){
        const etapaAnterior = aeronave.etapas[etapaIndex - 1]
        if (etapaAnterior.status !== StatusEtapa.CONCLUIDA){
            console.log('a etapa anterior ainda nao foi concluida')
            return
        }
    }

    const etapa = new Etapa(aeronave.etapas[etapaIndex].nome, aeronave.etapas[etapaIndex].prazo, aeronave.etapas[etapaIndex].status, aeronave.etapas[etapaIndex].funcionarios)
    etapa.finalizar()
    aeronave.etapas[etapaIndex] = etapa
    salvar('data/aeronaves.txt', listaAeronaves)
    console.log('etapa finalizada')
}

export async function associarFuncionarioEtapa(): Promise<void> {
    const codigoAeronave = await perguntar('codigo da aeronave: ')
    const nomeEtapa = await perguntar('nome da etapa: ')
    const idFuncionario = await perguntar('id do funcionario: ')

    const listaAeronaves = carregar('data/aeronaves.txt')
    const aeronave = listaAeronaves.find((a: any) => a.codigo === codigoAeronave)
    if (!aeronave){
        console.log('aeronave nao encontrada')
        return
    }

    const etapaIndex = aeronave.etapas.findIndex((e: any) => e.nome === nomeEtapa)
    if (etapaIndex === -1){
        console.log('etapa nao encontrada')
        return
    }

    const listaFuncionarios = carregar('data/funcionarios.txt')
    const funcionario = listaFuncionarios.find((f: any) => f.id === idFuncionario)
    if (!funcionario){
        console.log('funcionario nao encontrado')
        return
    }

    const etapa = new Etapa(aeronave.etapas[etapaIndex].nome, aeronave.etapas[etapaIndex].prazo, aeronave.etapas[etapaIndex].status, aeronave.etapas[etapaIndex].funcionarios)
    const func = new Funcionario(funcionario.id, funcionario.nome, funcionario.telefone, funcionario.endereco, funcionario.usuario, funcionario.senha, funcionario.nivelPermissao)
    etapa.associarFuncionario(func)
    aeronave.etapas[etapaIndex] = etapa
    salvar('data/aeronaves.txt', listaAeronaves)
    console.log('funcionario associado')
}