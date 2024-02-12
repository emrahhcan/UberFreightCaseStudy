import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guards/jwtAuth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user._id;
    const result = await this.userService.updateUser(userId, updateUserDto);
    return result;
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  async delete(@Request() req) {
    const userId = req.user._id;
    const result = await this.userService.deleteUser(userId);
    return result;
  }
}
