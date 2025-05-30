export interface Variable {
  id: string;
  name: string;
  value: string;
  pattern?: string;
}

export interface VariableTableProps {
  variables: Variable[];
  onChange: (variables: Variable[]) => void;
  errors?: string[]; 
}