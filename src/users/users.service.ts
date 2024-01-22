import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { httpException } from 'src/helpers/exceptions/http_exception';
import { formatUserMultiple } from 'src/helpers/format-user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) { }

  async create(input: [number, string, string, number], queryRunner: QueryRunner): Promise<UserEntity | any> {
    const user = new CreateUserDto();

    try {
      user.Uid = input[0];
      user.Username = input[1];
      user.City = input[2];
      user.Friend = input[3];

      return queryRunner.manager.getRepository(UserEntity).save(user);
    } catch (error) {
      console.log('create', error);

      throw error;
    }
  }

  async createMultiple(arrInput: []) {
    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    queryRunner.startTransaction();

    try {
      for (const input of arrInput) {
        await this.create(input, queryRunner);
      }

      queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log('createMultiple', error);
      queryRunner.rollbackTransaction();
      const state = await this.findAll();
      const formattedState = formatUserMultiple(state);
      return {
        status: 'error',
        dbState: formattedState
      }
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo
      .findOne({ where: { Uid: id } })
      .catch((e) => httpException(e))
      .then((v) => {
        if (v) {
          return v;
        }

        throw httpException(new Error(`User with id: ${id} can not be found`));
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo
      .update(id, updateUserDto)
      .catch((e) => httpException(e))
      .then(() => {
        return {
          message: 'Updated',
        };
      });
  }

  remove(id: number) {
    return this.userRepo
      .delete(id)
      .catch((e) => httpException(e))
      .then((v) => {
        if (v.affected !== 0) {
          return {
            message: 'Removed',
          };
        }

        throw httpException(new Error(`User with id: ${id} can not be found`));
      });
  }

  async findByUsernamePassword(username: string, password: string) {
    // const hashedPassword = await encryptPassword(password);
    return this.userRepo
      .createQueryBuilder('user')
      .select(['user.fullName', 'user.username', 'user.email', 'user.password']) // added selection
      .where('user.username = :username', {
        username,
      })
      .getOne()
      .catch((e) => httpException(e));
  }
}
