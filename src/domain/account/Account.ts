
class Account {

  public name: string;
  public email: string;
  public password: string;
  public created_at: Date;
  public id?: string;

  constructor(name: string, email: string, password: string, created_at: Date, id?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;

    if (id) {
      this.id = id;
    }
  }

}

export { Account }