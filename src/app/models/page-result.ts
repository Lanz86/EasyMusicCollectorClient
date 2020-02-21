import { AlbumPageItem } from './album-page-item';

export interface PageResult {
  limit: number;
  page: number;
  data: AlbumPageItem[];
}
