
// 分页信息
export class PageInfo{
  page: number = 1;
  total: number = 0;
  pageSize: number = 10;
  totalPage: number = 0;
  count: number = 0;
}

export interface IPageInfo{
  page: number
  total: number
  pageSize: number 
  totalPage: number
  count: number
}