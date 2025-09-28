import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserEntity } from 'src/domain/user/user-entity';
import { IUserRepository } from 'src/domain/user/user.repository.interface';

type UserModel = Prisma.UserGetPayload<{
  select: { id: true; email: true; name: true; password: true; role: true };
}>;

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const prismaUser = await this.prisma.user.create({
      data: user.toPersistence(),
      select: { id: true, email: true, name: true, role: true },
    });
    return this.toDomain({ ...prismaUser, password: '' });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: { id: true, name: true, email: true, password: true, role: true },
    });
    if (!prismaUser) return null;
    return this.toDomain(prismaUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: { id: true, name: true, email: true, password: true, role: true },
    });
    if (!prismaUser) return null;
    return this.toDomain(prismaUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const prismaUsers = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, password: true, role: true },
    });
    return prismaUsers.map((u) => this.toDomain({ ...u, password: '' }));
  }

  // helper methods
  private toDomain(user: UserModel): UserEntity {
    return UserEntity.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    });
  }
}
