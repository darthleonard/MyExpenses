import { Injectable } from '@angular/core';
import { database } from '../../database/database';
import { OnlineDataService } from './online-data.service';
import { CloudService } from 'src/app/services/cloud.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private readonly cloudService: CloudService,
    private readonly onlineDataService: OnlineDataService
  ) {}

  async download(tableNames: string[]) {
    tableNames.forEach(async (tableName) => {
      const table = database.tables.find((t) => t.name === tableName);
      if (!table) {
        throw { message: `table ${tableName} does not exist` };
      }

      console.log(`downloading ${table.name}`);
      const apiUrl = await this.cloudService.getApiUrl();
      const url = `${apiUrl}/${table.name}`;
      const entities = await this.onlineDataService
        .getEntities(url)
        .toPromise();
      console.log(`downloaded ${entities.length} records from ${table.name}`);
      table.bulkPut(entities);
    });
  }
}
