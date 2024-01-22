import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const formatUser = (user: CreateUserDto) => {
  const friend = user.Friend || 'NULL';
  return `(${user.Uid}, ${user.Username}, ${user.City}, ${friend})`;
};

export const formatUserMultiple = (userArray: CreateUserDto[]) => {
  const result = [];

  for (const user of userArray) {
    result.push(formatUser(user));
  }

  return result;
};
