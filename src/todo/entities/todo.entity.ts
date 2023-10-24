import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoState {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column({
    type: 'enum',
    enum: TodoState,
    default: TodoState.PENDING,
  })
  state: TodoState;
}
