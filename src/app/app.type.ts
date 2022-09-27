export interface IFilters {
  filters: { items: string[]; type: IFiltersType };
}

export interface IResponse {
  services: IServiceItem[];
  totalServices: number;
  totalComponents: number;
}

export interface IServiceItem {
  serviceId: string;
  serviceName: string;
  components: IComponentItem[];
}

export interface IComponentItem {
  componentType: string;
  amount: number;
}

export type IFiltersType = 'serviceId' | 'componentType';
