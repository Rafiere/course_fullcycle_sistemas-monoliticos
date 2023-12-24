/* Isso vai ser o que vai entrar e sair do gateway */

export interface AddProductInputDto {
    name: string,
    description: string,
    purchasePrice: number,
    stock: number
}
