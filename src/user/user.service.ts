import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(user: User, dto: EditUserDto) {
    const data = await this.prisma.user.update({
      where: { id: user.id },
      data: { ...dto },
      select: { id: true, email: true, firstName: true, lastName: true },
    });
    return data;
  }
}
