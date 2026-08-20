export class CompanyLocation {
  constructor(
    public readonly address: string,
    public readonly city: string,
    public readonly state: string,
    public readonly country: string,
    public readonly postalCode: string
  ) {}
}