import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { primsaErrorHandling } from 'src/prisma/exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
    });
    return bookmarks;
  }

  async createBookmark(userId: number, dto: BookmarkDto) {
    const booking = await this.prisma.bookmark.create({
      data: {
        userId: userId,
        title: dto.title,
        description: dto.description,
        link: dto.link,
      },
    });
    return booking;
  }

  async getBookmarkById(userId: number, bookingId: number) {
    try {
      const booking = await this.prisma.bookmark.findUniqueOrThrow({
        where: { id: bookingId },
      });

      if (booking.userId != userId) {
        throw new ForbiddenException();
      }

      return booking;
    } catch (error) {
      primsaErrorHandling(error);
    }
  }

  async editBookmarkById(
    userId: number,
    bookingId: number,
    dto: EditBookmarkDto,
  ) {
    try {
      let booking = await this.prisma.bookmark.findFirst({
        where: { id: bookingId, userId: userId },
      });

      booking = await this.prisma.bookmark.update({
        where: { id: bookingId },
        data: { ...dto },
      });

      return booking;
    } catch (error) {
      primsaErrorHandling(error);
    }
  }

  async deleteBookmarkById(userIds: number, bookingId: number) {
    const booking = await this.prisma.bookmark.findFirst({
      where: { id: bookingId, userId: userIds },
    });

    if (!booking) {
      throw new BadRequestException('Booking Does Not Exists');
    }

    await this.prisma.bookmark.delete({
      where: { id: bookingId },
    });
  }
}
