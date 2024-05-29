import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { TeacherAccount } from '@module/account/entities/teacher-account.entity';
import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';
import { TestInstanceResult } from '@module/test-instance-result/entities/test-instance-result.entity';
import { TestSchema } from '@module/test-schema/entities/test-schema.entity';

export enum TestInstanceStatus {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended',
}

@Entity()
export class TestInstance {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @ManyToOne(() => TestSchema, (schema) => schema.instances)
  public schema: TestSchema;
  @OneToMany(() => TestInstanceQuestion, (instanceQuestion) => instanceQuestion.instance)
  public questionsPool: TestInstanceQuestion[];
  @Column({ type: 'boolean', nullable: false })
  public isEnabled: boolean;
  @Column({ type: 'enum', enum: TestInstanceStatus, nullable: false })
  public status: TestInstanceStatus;
  @Column({ type: 'timestamp', nullable: true })
  public startedAt?: Date;
  @Column({ type: 'timestamp', nullable: true })
  public endedAt?: Date;
  @ManyToOne(() => TeacherAccount, (teacherAccount) => teacherAccount.testInstances)
  public teacher: TeacherAccount;
  @OneToMany(() => TestInstanceResult, (result) => result.instance)
  public results: TestInstanceResult[];
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}