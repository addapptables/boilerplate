import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../../../../../../lib/@craftsjs/typeorm';
import { FullAuditedTest } from './full-audited.entity';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { CustomPhotoRepository } from './photo.repository';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo, CustomPhotoRepository, FullAuditedTest]),
    TypeOrmModule.forFeature([Photo, CustomPhotoRepository, FullAuditedTest], 'connection_2'),
  ],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
