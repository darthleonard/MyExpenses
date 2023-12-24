import { HttpClient } from "@angular/common/http";
import { CloudService } from "../services/cloud.service";
import { OnlineDataService } from "../core/dataservices/online-data.service";
import { OfflineDataService } from "../core/dataservices/offline-data.service";

export type DataServiceArgs = {
    http: HttpClient;
    cloudService: CloudService;
    onlineDataService: OnlineDataService;
    offlineDataService: OfflineDataService;
    endpoint: string;
}
