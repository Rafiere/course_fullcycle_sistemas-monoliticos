/* Esse modelo está relacionado ao Sequelize. */

import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
    tableName: "products", //Trabalharemos com a mesma tabela do outro módulo.
                           //Em produção, não podemos esquecer de realizar o "sync" entre as duas tabelas com o mesmo nome.
    timestamps: false //Não queremos que o Sequelize crie as colunas "createdAt" e "updatedAt".
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column({ allowNull: false })
    declare salesPrice: number;
}
