import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminStatsDto } from './dto/stats.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats(): Promise<AdminStatsDto> {
    return this.adminService.getStats();
  }
}
