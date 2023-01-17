import { Injectable } from '@nestjs/common';

@Injectable()
export class UniService {
  private unis = [1, 2];
  public findAll() {
    return this.unis;
  }

  public create(n: number) {
    this.unis.push(n);
    return this.unis;
  }
}
