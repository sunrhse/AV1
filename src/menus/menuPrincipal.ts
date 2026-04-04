import { perguntar, fechar } from '../services/Input'
import { autenticacao } from '../services/Autenticacao'
import { cadastrarFuncionario, listarFuncionarios } from '../menus/menuFuncionario'
import { cadastrarAeronave, listarAeronaves, verDetalhesAeronave } from '../menus/menuAeronave'
import { cadastrarPeca, listarPecas, atualizarStatusPeca } from '../menus/menuPeca'
import { cadastrarEtapa, iniciarEtapa, finalizarEtapa, associarFuncionarioEtapa } from '../menus/menuEtapa'
import { registrarTeste, listarTestes } from '../menus/menuTeste'
import { gerarRelatorio } from '../menus/menuRelatorio'

export async function menuLogin(): Promise<void> {
    console.log('aerocode')
    let funcionario = null
    while (!funcionario){
        const usuario = await perguntar('usuario: ')
        const senha = await perguntar('senha: ')
        funcionario = autenticacao(usuario, senha)
        if (!funcionario){
            console.log('usuario ou senha invalidos')
        }
    }
    console.log(`bem vindo, ${funcionario.nome}`)
    await menuPrincipal(funcionario)
}

async function menuPrincipal(funcionario: any): Promise<void> {
    let continuar = true
    while (continuar){
        console.log('\nmenu principal')
        console.log('1: aeronaves')
        console.log('2: pecas')
        console.log('3: etapas')
        console.log('4: funcionarios')
        console.log('5: testes')
        console.log('6: relatorio')
        console.log('0: sair')

        const opcao = await perguntar('escolha: ')

        switch(opcao){
            case '1': await menuAeronaves(); break
            case '2': await menuPecas(); break
            case '3': await menuEtapas(); break
            case '4': await menuFuncionarios(funcionario); break
            case '5': await menuTestes(); break
            case '6': await gerarRelatorio(); break
            case '0': continuar = false; break
            default: console.log('opcao invalida')
        }
    }
    fechar()
}

async function menuAeronaves(): Promise<void> {
    console.log('\naeronaves')
    console.log('1: cadastrar aeronave')
    console.log('2: listar aeronaves')
    console.log('3: ver detalhes')
    console.log('0: voltar')

    const opcao = await perguntar('escolha: ')

    switch(opcao){
        case '1': await cadastrarAeronave(); break
        case '2': listarAeronaves(); break
        case '3': await verDetalhesAeronave(); break
        case '0': break
        default: console.log('opcao invalida')
    }
}

async function menuPecas(): Promise<void> {
    console.log('\npecas')
    console.log('1: cadastrar peca')
    console.log('2: listar pecas')
    console.log('3: atualizar status')
    console.log('0: voltar')

    const opcao = await perguntar('escolha: ')

    switch(opcao){
        case '1': await cadastrarPeca(); break
        case '2': listarPecas(); break
        case '3': await atualizarStatusPeca(); break
        case '0': break
        default: console.log('opcao invalida')
    }
}

async function menuEtapas(): Promise<void> {
    console.log('\netapas')
    console.log('1: cadastrar etapa')
    console.log('2: iniciar etapa')
    console.log('3: finalizar etapa')
    console.log('4: associar funcionario')
    console.log('0: voltar')

    const opcao = await perguntar('escolha: ')

    switch(opcao){
        case '1': await cadastrarEtapa(); break
        case '2': await iniciarEtapa(); break
        case '3': await finalizarEtapa(); break
        case '4': await associarFuncionarioEtapa(); break
        case '0': break
        default: console.log('opcao invalida')
    }
}

async function menuFuncionarios(funcionario: any): Promise<void> {
    console.log('\nfuncionarios')
    console.log('1: cadastrar funcionario')
    console.log('2: listar funcionarios')
    console.log('0: voltar')

    const opcao = await perguntar('escolha: ')

    switch(opcao){
        case '1':
            if (funcionario.nivelPermissao !== 'ADMINISTRADOR'){
                console.log('acesso negado: apenas administradores podem cadastrar funcionarios')
                break
            }
            await cadastrarFuncionario()
            break
        case '2': listarFuncionarios(); break
        case '0': break
        default: console.log('opcao invalida')
    }
}

async function menuTestes(): Promise<void> {
    console.log('\ntestes')
    console.log('1: registrar teste')
    console.log('2: listar testes')
    console.log('0: voltar')

    const opcao = await perguntar('escolha: ')

    switch(opcao){
        case '1': await registrarTeste(); break
        case '2': await listarTestes(); break
        case '0': break
        default: console.log('opcao invalida')
    }
}