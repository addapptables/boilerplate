import { Injectable } from '@nestjs/common';
import { isEmpty } from '../../../utils';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUnitRepository } from '../../infrastructure/database/repositories/organization-unit.repository';

@Injectable()
export class OrganizationUnitCodeService {

  constructor(
    @InjectRepository(OrganizationUnitRepository)
    private readonly organizationUnitRepository: OrganizationUnitRepository,
  ) { }

  public async getNextChildCodeAsync(parentId?: string) {
    const lastChild = await this.getLastChildOrNullAsync(parentId);
    if (!lastChild) {
      const parentCode = parentId ? await this.getCodeAsync(parentId) : undefined;
      return this.appendCode(parentCode, this.createCode(1));
    }
    return this.calculateNextCode(lastChild.code);
  }

  private calculateNextCode(code: string) {
    if (isEmpty(code)) {
      throw new Error('Code can not be null or empty');
    }
    const parentCode = this.getParentCode(code);
    const lastUnitCode = this.getLastUnitCode(code);
    return this.appendCode(parentCode, this.createCode(+lastUnitCode + 1));
  }

  private getParentCode(code: string) {
    const splittedCode = code.split('.');
    if (splittedCode.length === 1) {
      return null;
    }
    return splittedCode.slice(0, splittedCode.length - 1).join('.');
  }

  private getLastUnitCode(code: string) {
    const splittedCode = code.split('.');
    return splittedCode[splittedCode.length - 1];
  }

  private appendCode(parentCode: string, childCode: string) {
    if (isEmpty(childCode)) {
      throw new Error('Code can not be null or empty');
    }
    if (!parentCode) {
      return childCode;
    }
    return parentCode + '.' + childCode;
  }

  private createCode(...numbers: number[]) {
    if (!numbers) {
      return undefined;
    }
    const numberOfZeros = '00000';
    return numbers.map(x => (numberOfZeros + x).slice(-5)).join('.');
  }

  private async getCodeAsync(parentId: string) {
    return (await this.organizationUnitRepository.findOne({ where: { id: parentId } }))?.code;
  }

  private async getLastChildOrNullAsync(parentId?: string) {
    return await this.organizationUnitRepository.findOne({ where: { parentId }, order: { code: 'DESC' } });
  }

}
