import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('index.mustache')
  @Get()
  render() {
    const message = this.appService.getHello();
    return { message };
  }
}
