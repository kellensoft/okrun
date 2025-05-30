export interface Header { 
  id: string;
  name: string; 
  value: string 
};

export interface HeaderRowProps {
  id: string;
  name: string;
  value: string;
  error?: string;        
  onChange: (header: Header) => void;
  onRemove: () => void;
  disableRemove?: boolean;
  idx: number;          
}
