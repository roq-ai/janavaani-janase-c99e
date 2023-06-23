import { ConstituencyInterface } from 'interfaces/constituency';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface IssueInterface {
  id?: string;
  description: string;
  constituency_id: string;
  reporter_id: string;
  created_at?: any;
  updated_at?: any;

  constituency?: ConstituencyInterface;
  user?: UserInterface;
  _count?: {};
}

export interface IssueGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  constituency_id?: string;
  reporter_id?: string;
}
