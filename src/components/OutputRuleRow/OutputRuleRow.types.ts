export interface OutputRule {
  id: string;
  type: string;
  pattern: string;
  name: string;
}

export interface OutputRuleRowProps {
  id: string;
  type: string;
  pattern: string;
  name: string;
  error?: string;
  onChange: (rule: OutputRule) => void;
  onRemove: () => void;
  disableRemove?: boolean;
  idx: number;
}