import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) { }

  async estimate({ make, model }: GetEstimateDto) {
    const reports = this.repo
      .createQueryBuilder()
      .select("*")
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .getRawMany()
    return reports
  }

  async create(data: CreateReportDto, user: User) {
    const report = this.repo.create(data)
    report.user = user
    return await this.repo.save(report)
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id }, loadRelationIds: true })
    if (!report) throw new NotFoundException('report not found!')

    report.approved = approved
    return this.repo.save(report)
  }
}
