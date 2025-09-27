import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserEntity } from 'src/domain/user/user-entity';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

type UserModel = Prisma.UserGetPayload<{
  select: { id: true; email: true; name: true; password: true };
}>;

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.create({
      data: user.toPersistence(),
      select: { id: true, email: true, name: true },
    });
    return this.toDomain({ ...prismaUser, password: '' });
  }

  // helper methods
  private toDomain(user: UserModel): UserEntity {
    return UserEntity.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    });
  }
}
