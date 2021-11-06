import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { InfrastructureModule } from "../../infrastructure";

@Module({
  imports: [ InfrastructureModule ],
  providers: [PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
