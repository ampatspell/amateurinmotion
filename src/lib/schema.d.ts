export interface Daily {
  caption: string;
  date: string;
  fileId: string | null;
  id: string;
  number: number;
}

export interface File {
  id: string;
  name: string;
}

export interface FileVariant {
  contentType: string;
  fileId: string;
  height: number | null;
  id: string;
  identifier: string;
  size: number;
  width: number | null;
}

export interface Home {
  backgroundId: string | null;
  id: string;
  title: string;
}

export interface User {
  email: string;
  hash: string | null;
  id: string;
  role: string;
  salt: string | null;
}

export interface DB {
  dailies: Daily;
  files: File;
  fileVariants: FileVariant;
  home: Home;
  users: User;
}
