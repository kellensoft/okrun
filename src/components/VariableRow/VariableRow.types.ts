export interface Variable {
  id: string;
  name: string;
  value: string;
  pattern?: string;
}

export interface VariableRowProps {
  id: string;
  name: string;
  value: string;
  pattern?: string;
  error?: string;
  onChange: (variable: Variable) => void;
  onRemove: () => void;
  disableRemove?: boolean;
  idx?: number;
}