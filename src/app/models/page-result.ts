import { ProductPageItem } from './product-page-item';

export interface PageResult {
  limit: number;
  page: number;
  data: ProductPageItem[];
}
