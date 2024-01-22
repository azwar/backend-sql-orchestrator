import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// CREATE TABLE Users (
//   Uid int NOT NULL,
//   Username varchar(255) NOT NULL,
//   City varchar(255) NOT NULL,
//   Friend int,
//   PRIMARY KEY (Uid),
// Tech Challenge #1: Backend (SQL Orchestrator) 1
// Tech Challenge #1: Backend (SQL Orchestrator) 2
// FOREIGN KEY (Friend) REFERENCES Users(Uid)
// );

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  Uid: number;

  @Column({ length: 100, unique: true })
  Username: string;

  @Column({ length: 200 })
  City: string;

  @OneToOne(() => UserEntity) 
  @JoinColumn({name: 'Friend' }) 
  Friend: number;
}
