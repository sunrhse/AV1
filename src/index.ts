import { menuLogin } from './menus/menuPrincipal'
import { carregar } from './services/Persistencia'
import { cadastrarFuncionario } from './menus/menuFuncionario'

async function iniciar() {
    const funcionarios = carregar('data/funcionarios.txt')
    if (funcionarios.length === 0){
        console.log('nenhum funcionario cadastrado')
        console.log('cadastre o primeiro administrador do sistema')
        await cadastrarFuncionario()
    }
    await menuLogin()
}

iniciar()