import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private service: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.service.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookingId: number,
  ) {
    return this.service.getBookmarkById(userId, bookingId);
  }

  @Post()
  createBookmark(@GetUser('id') userId: number, @Body() dto: BookmarkDto) {
    return this.service.createBookmark(userId, dto);
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookingId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.service.editBookmarkById(userId, bookingId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookingId: number,
  ) {
    return this.service.deleteBookmarkById(userId, bookingId);
  }
}
