import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function perguntar(mensagem: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(mensagem, (resposta) => {
            resolve(resposta)
        })
    })
}

export function fechar(): void {
    rl.close()
}