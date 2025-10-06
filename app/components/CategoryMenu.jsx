'use client';
import CategoryFilter from './CategoryFilter';

export default function CategoryMenu(props) {
  return (
    <div className="w-full">
      <CategoryFilter {...props} />
    </div>
  );
}


