/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention,@typescript-eslint/no-explicit-any */
import 'source-map-support/register';
import { compact, map } from 'lodash';
import { Brackets, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import type { AbstractEntity } from './common/abstract.entity';
import type { AbstractDto } from './common/dto/abstract.dto';

declare global {
  export type GetConstructorArgs<T> = T extends new (...args: infer U) => any
    ? U
    : never;
  interface Array<T> {
    toDtos<Entity extends AbstractEntity<Dto>, Dto extends AbstractDto>(
      this: T[],
      options?: any,
    ): Dto[];

  }
}

declare module 'typeorm' {
  interface QueryBuilder<Entity> {
    searchByString(q: string, columnNames: string[]): this;
  }

}

Array.prototype.toDtos = function <
  T extends AbstractEntity<Dto>,
  Dto extends AbstractDto,
>(options?: any): Dto[] {
  return compact(map<T, Dto>(this, (item) => item.toDto(options)));
};

QueryBuilder.prototype.searchByString = function (q, columnNames) {
  if (!q) {
    return this;
  }
  this.andWhere(
    new Brackets((qb) => {
      for (const item of columnNames) {
        qb.orWhere(`${item} ILIKE :q`);
      }
    }),
  );

  this.setParameter('q', `%${q}%`);

  return this;
};
