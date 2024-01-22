export class InputCommand {
  type: string;
  cmd_chain: InputItem[];
}

export class InputItem {
  type: string;
  data: [number, string, string, number];
  cmd: [number, string, string, number];
}
