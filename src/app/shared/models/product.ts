export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  available: boolean;
  ingredients: string[] | null;
  legalAge: number;
  diets: string[];
  allergens: string[];
  additives: string[];
  extraGroups: ExtraGroup[];
}

export interface ExtraGroup {
  name: string;
  selectionType: SelectionType;
  maxSelections: number;
  selected: string | null;
  extras: Extra[];
}

export interface Extra {
  id: string;
  price: number | null;
  name: string;
  maxQuantity: number;
  quantity: number;
  allergens: string[];
  defaultSelected: boolean;
  selected: boolean;
  additives: string[];
  available: boolean;
}

export type SelectionType = 'CHECKBOX' | 'RADIO_GROUP' | 'MULTI_SELECT';
