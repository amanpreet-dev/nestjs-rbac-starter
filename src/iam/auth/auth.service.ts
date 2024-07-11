import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const check = await this.userModel.findOne({
        email: signUpDto.email,
      });
      if (!check) {
        const user = { ...signUpDto };
        user.password = await this.hashingService.hash(user.password);
        return await this.userModel.create(user);
      } else {
        throw new ConflictException('User already exists');
      }
    } catch (error) {
      return error;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userModel.findOne({
        email: signInDto.email,
      });
      if (!user) {
        throw new UnauthorizedException('User does not exists');
      }
      const isEqual = await this.hashingService.compare(
        signInDto.password,
        user.password,
      );
      if (!isEqual) {
        throw new UnauthorizedException('Password does not match');
      }
    } catch (error) {}
  }
}
