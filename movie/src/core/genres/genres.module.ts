import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { InfrastructureModule } from "../../infrastructure";

@Module({
  imports: [ InfrastructureModule ],
  providers: [GenresService],
  exports: [GenresService]
})
export class GenresModule {}
