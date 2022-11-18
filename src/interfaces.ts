export interface IWilder {
  id: number;
  name: string;
  description: string;
  photo: IPhoto | null;
  upvotes: IUpvote[];
}

export interface IIsOpen {
  isOpen: boolean;
  wilderInfos: {
    id?: number;
    name?: string;
    upvoteInfos?: {
      id?: number;
      nameSkill?: string;
    };
  };
  skillId?: number;
  photoId?: number;
}

export interface IUpvote {
  id: number;
  skill: ISkill;
  vote: number;
}

export interface ISkill {
  id: number;
  name: string;
}

export interface IPhoto {
  id?: number;
  url?: string;
}
