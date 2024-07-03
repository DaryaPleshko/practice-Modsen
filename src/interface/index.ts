export interface iForm {
  title: string;
  subject: string;
  sorting: string;
}

export interface iBook {
  id: string;
  imageUrl?: string;
  imageClass?: string;
  categories: string;
  title: string;
  authors: string;
}

export interface iErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export interface iErrorBoundaryState {
  hasError: boolean;
}
