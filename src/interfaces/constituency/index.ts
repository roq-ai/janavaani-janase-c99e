import { IssueInterface } from 'interfaces/issue';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ConstituencyInterface {
  id?: string;
  name: string;
  coordinator_id: string;
  created_at?: any;
  updated_at?: any;
  issue?: IssueInterface[];
  user?: UserInterface;
  _count?: {
    issue?: number;
  };
}

export interface ConstituencyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  coordinator_id?: string;
}
