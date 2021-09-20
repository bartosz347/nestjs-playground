import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USERS' })
export class User {
  @PrimaryGeneratedColumn({ name: 'USER_ID'})
  userId: number;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'SURNAME' })
  surname: string;

  @Column({ name: 'ADDRESS' })
  address: string;
}
