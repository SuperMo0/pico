import * as React from 'react';

/**
 * Borderless product tile for listing grids — image, colorways, name, age, price, quick-add.
 * @startingPoint section="Commerce" subtitle="Product listing tile" viewport="320x440"
 */
export interface ProductCardProps {
  image: string;
  imageAlt?: string;
  /** Optional second image revealed on hover (crossfade). */
  hoverImage?: string | null;
  name: React.ReactNode;
  /** Age range label, e.g. «٦–١٢ شهر». */
  ageRange?: React.ReactNode;
  price: React.ReactNode;
  was?: React.ReactNode | null;
  /** Named colorways for the swatch row. */
  colors?: string[];
  /** Corner flag text, e.g. «جديد» / «خصم». */
  badge?: React.ReactNode;
  badgeTone?: 'neutral' | 'sage' | 'sale' | 'success' | 'info';
  onAdd?: () => void;
  onWishlist?: () => void;
  wished?: boolean;
  /** Click on the tile body (e.g. open the product page). */
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** Borderless product tile for listing grids — image, colorways, name, age, price, quick-add. */
export function ProductCard(props: ProductCardProps): JSX.Element;
