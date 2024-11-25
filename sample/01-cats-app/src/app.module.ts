import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

/**
 * 根module，可以在此处集成多个模块
 */
@Module({
  imports: [CoreModule, CatsModule, UserModule],
})
export class AppModule {}
