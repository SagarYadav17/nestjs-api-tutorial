import { Injectable } from '@nestjs/common';
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
    var bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId: userId,
        title: dto.title,
        description: dto.description,
        link: dto.link,
      },
    });
    if (!bookmark) {
      bookmark = await this.prisma.bookmark.create({
        data: {
          userId: userId,
          title: dto.title,
          description: dto.description,
          link: dto.link,
        },
      });
    }
    return bookmark;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.findFirstOrThrow({
        where: { id: bookmarkId, userId: userId },
      });

      return bookmark;
    } catch (error) {
      primsaErrorHandling(error);
    }
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    try {
      await this.prisma.bookmark.findFirstOrThrow({
        where: { id: bookmarkId, userId: userId },
      });

      const bookmark = await this.prisma.bookmark.update({
        where: { id: bookmarkId },
        data: { ...dto },
      });

      return bookmark;
    } catch (error) {
      primsaErrorHandling(error);
    }
  }

  async deleteBookmarkById(userIds: number, bookmarkId: number) {
    try {
      await this.prisma.bookmark.findFirstOrThrow({
        where: { id: bookmarkId, userId: userIds },
      });

      await this.prisma.bookmark.delete({
        where: { id: bookmarkId },
      });
    } catch (error) {
      primsaErrorHandling(error);
    }
  }
}
