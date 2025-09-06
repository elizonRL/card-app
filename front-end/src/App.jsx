
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './App.css'
import FormComponet from './components/FormComponet';
import CardItem from './components/CardItem';
import { CardSkeletonGrid } from './components/CardSkeleton';
import { CardProvider, useCardContext } from './context/CardContext';
import { useFetch } from './hooks/useFetch';


function AppContent() {
  const { cardData } = useCardContext();
  const { data: cards, loading, hasLoaded, addCard, deleteCard } = useFetch('http://localhost:3000/api/v1/cards');
    

    
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <header className='bg-white shadow-sm border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-slate-800'>Gestor de Tarjetas</h1>
          <p className='text-slate-600 mt-1'>Administra tus tarjetas de crédito de forma segura</p>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 py-8'>
        {/* Sección de formulario */}
        <div className='bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8'>
          <div className='grid lg:grid-cols-2 gap-8 items-center'>
            {/* Vista previa de tarjeta */}
            <div className='flex justify-center'>
              <div className='transform scale-110'>
                <Cards
                  number={cardData.number}
                  name={cardData.name}
                  expiry={cardData.expiry}
                  cvc={cardData.cvc}
                  focused={cardData.focus}
                />
              </div>
            </div>
            
            {/* Formulario */}
            <div>
              <h2 className='text-2xl font-semibold text-slate-800 mb-6'>Agregar Nueva Tarjeta</h2>
              <FormComponet onAddCard={addCard} />
            </div>
          </div>
        </div>

        {/* Sección de tarjetas guardadas */}
        <div className='bg-white rounded-xl shadow-lg border border-slate-200 p-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-semibold text-slate-800'>Mis Tarjetas</h2>
            <span className='bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium'>
              {cards.length} tarjeta{cards.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {loading && !hasLoaded ? (
            <CardSkeletonGrid />
          ) : cards.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-slate-400 mb-4'>
                <svg className='w-16 h-16 mx-auto' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z' clipRule='evenodd' />
                </svg>
              </div>
              <p className='text-slate-500 text-lg'>No tienes tarjetas guardadas</p>
              <p className='text-slate-400 text-sm mt-1'>Agrega tu primera tarjeta usando el formulario de arriba</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {cards.map((card, index) => (
                <div 
                  key={card._id || card.id}
                  className='animate-fadeInUp'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardItem
                    card={card}
                    onDelete={deleteCard}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-white border-t border-slate-200 mt-12'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <p className='text-center text-slate-500 text-sm'>
            © 2024 Gestor de Tarjetas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <CardProvider>
      <AppContent />
    </CardProvider>
  );
}

export default App
