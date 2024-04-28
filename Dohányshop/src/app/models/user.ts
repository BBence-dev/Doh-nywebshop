export class User{
    id?:any;
    nev?: string;
    username?: string;
    password?: string;
    kor?:number;
    szhely?:string;
    status?:string;

    roles?: Role[]; // Az új mező, amely tartalmazza a szerepeket

  constructor(data?: any) {
    this.id = data?.id;
    this.username = data?.username;
    this.password = data?.password;
    this.nev = data?.nev;
    this.kor = data?.kor;
    this.szhely = data?.szhely;
    this.status = data?.status;
    this.roles = data?.roles ? data.roles.map((role: any) => new Role(role)) : [];
  }
}

export class Role {
  id?: number;
  name?: string;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
  }
}