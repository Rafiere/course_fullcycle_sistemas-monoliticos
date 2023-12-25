import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
    tableName: 'products',
    timestamps: false // Não queremos os campos createdAt e updatedAt sendo gerados pelo Sequelize.
})
export class ProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false})
    declare id: string;

    @Column({ allowNull: false})
    declare name: string;

    @Column({ allowNull: false})
    declare description: string;

    @Column({ allowNull: false})
    declare purchasePrice: number;

    @Column({ allowNull: false})
    declare stock: number;

    @Column({ allowNull: false})
    declare createdAt: Date;

    @Column({ allowNull: false})
    declare updatedAt: Date;
}
