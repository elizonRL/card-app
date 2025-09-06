/**
 * Componente Skeleton para simular tarjetas mientras cargan
 */
const CardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl h-48 w-80 mx-auto"></div>
    </div>
  );
};

/**
 * Componente para mostrar múltiples skeletons
 */
export const CardSkeletonGrid = ({ count = 4 }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardSkeleton;