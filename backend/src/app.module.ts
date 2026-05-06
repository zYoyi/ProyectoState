import { Module } from '@nestjs/common';
import { AcModule } from './ac/ac.module';

@Module({
  imports: [AcModule],
})
export class AppModule {}
