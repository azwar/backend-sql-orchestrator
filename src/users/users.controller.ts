import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InputCommand } from './dto/input-command.dto';
import { formatUserMultiple } from 'src/helpers/format-user';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('addMultiple')
  async create(@Body() inputDto: InputCommand) {
    if (inputDto.type === "my_login") {
      const cmdChains = inputDto.cmd_chain;
      const arrInput: any = [];

      for (const chain of cmdChains) {
        if (chain.type === "insert") {          
          arrInput.push(chain.data || chain.cmd);
        }
      }

      if (arrInput.length > 0) {
        const res = await this.usersService.createMultiple(arrInput);

        if (res === true) {
          const state = await this.usersService.findAll();
          const formattedState = formatUserMultiple(state);
          return {
            status: "ok",
            dbState: formattedState,
          }
        }

        return res;
      }
    }

    throw new HttpException('Input not valid', HttpStatus.BAD_REQUEST);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('login')
  login(@Body() form: { username: string; password: string }) {
    return this.usersService.findByUsernamePassword(
      form.username,
      form.password,
    );
  }
}
