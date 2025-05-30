export interface OutputRule {
  id: string;
  type: string;
  pattern: string;
  name: string;
}

export interface OutputRuleTableProps {
  rules: OutputRule[];
  onChange: (rules: OutputRule[]) => void;
  errors?: string[]; 
}