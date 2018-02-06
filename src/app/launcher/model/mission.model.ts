export class Mission {
  constructor(
    public id: string,
    public name: string,
    public suggested: boolean,
    public runtimes: string[],
    public description: string = null
  ) {}
}
