// base.entity.ts
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity("users")
export class Users {
    //@Column({name: "user_id"})
    @PrimaryGeneratedColumn()
    user_id: string;

    @Column({ type: 'varchar', default: null })
    username: string;

    @Column({ type: 'varchar', default: null })
    password: string;

    @Column({ type: 'varchar', default: null})
    email: string;

   
}