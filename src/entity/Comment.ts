import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export default class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    // @Column()
    // name: string;

    // @Column()
    // userId: string;

    @Column()
    text: string;

    @Column({ nullable: true })
    parentId: number;

}