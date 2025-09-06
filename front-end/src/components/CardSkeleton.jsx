/**
 * Componente Skeleton para simular una tarjeta cargando
 */
const CardSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 rounded-xl h-48 w-80 shadow-lg relative overflow-hidden">
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        
        {/* Elementos de la tarjeta */}
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Número de tarjeta */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-300 rounded w-3/4"></div>
            <div className="h-3 bg-slate-300 rounded w-1/2"></div>
          </div>
          
          {/* Nombre y fecha */}
          <div className="flex justify-between items-end">
            <div className="h-3 bg-slate-300 rounded w-1/3"></div>
            <div className="h-3 bg-slate-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente para mostrar skeleton de carga
 */
export const CardSkeletonGrid = () => {
  return (
    <div className="py-12">
      <CardSkeleton />
      <p className="text-center text-slate-500 mt-4">Cargando tarjetas...</p>
    </div>
  );
};

export default CardSkeleton;