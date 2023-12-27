export class getUserDto {
  constructor(data) {
    (this.id = data._id),
      (this.first_name = data.first_name),
      (this.last_name = data.last_name),
      (this.email = data.email),
      (this.role = data.role),
      (this.age = data.age),
      (this.cart = data.cart);
  }
}
