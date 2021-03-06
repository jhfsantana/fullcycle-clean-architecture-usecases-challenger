import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

@Table({
    tableName: 'order_items',
    timestamps: false
})
export default class OrderItemModel extends Model {
    
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel
    
    @ForeignKey(() => OrderModel)
    declare orderId: OrderModel

    @BelongsTo(() => OrderModel)
    declare order: OrderModel

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare price: number;

    @Column({allowNull: false})
    declare name: string;
}