import * as fs from 'fs'

export function salvar(caminho: string, dados: any): void {
    const json = JSON.stringify(dados)
    fs.writeFileSync(caminho, json)
}

export function carregar(caminho: string): any {
    if (!fs.existsSync(caminho)){
        return []
    }
    const conteudo = fs.readFileSync(caminho, 'utf-8')
    return JSON.parse(conteudo)
}