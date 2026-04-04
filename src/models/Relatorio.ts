import * as fs from 'fs'

export class Relatorio {
    aeronave: any
    nomeCliente: string
    dataEntrega: string

    constructor(aeronave: any, nomeCliente: string, dataEntrega: string){
        this.aeronave = aeronave
        this.nomeCliente = nomeCliente
        this.dataEntrega = dataEntrega
    }

    gerarRelatorio(): string {
        let relatorio = ''
            relatorio += `relatorio de entrega\n`
            relatorio += `cliente: ${this.nomeCliente}\n`
            relatorio += `data de entrega: ${this.dataEntrega}\n\n`
            relatorio += `\naeronave\n`
            relatorio += `codigo: ${this.aeronave.codigo}\n`
            relatorio += `modelo: ${this.aeronave.modelo}\n`
            relatorio += `tipo: ${this.aeronave.tipo}\n`
            relatorio += `capacidade: ${this.aeronave.capacidade}\n`
            relatorio += `alcance: ${this.aeronave.alcance}\n\n`
            relatorio += `\npecas\n`
        this.aeronave.pecas.forEach((p: any) => {
            relatorio += `${p.nome}\n`
            relatorio += `${p.tipo}, fornecedor: ${p.fornecedor}, status: ${p.status}\n`
        })
        relatorio += `\netapas\n`
        this.aeronave.etapas.forEach((e: any) => {
            relatorio += `${e.nome}\n`
            relatorio += `prazo: ${e.prazo}, status: ${e.status}\n`
        })
        relatorio += `\ntestes\n`
        this.aeronave.testes.forEach((t: any) => {
            relatorio += `tipo: ${t.tipo}, resultado: ${t.resultado}`
        })
        return relatorio
    }

    salvarEmArquivo(): void {
        const texto = this.gerarRelatorio()
        const caminho = `data/relatorio_${this.aeronave.codigo}.txt`
        fs.writeFileSync(caminho, texto)
        console.log(`relatorio gerado em ${caminho}`)
        console.log(texto)
    }
}