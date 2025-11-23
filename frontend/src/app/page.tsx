
import Auth from './components/Auth';
import Balance from './components/Balance';
import Deposit from './components/Deposit';
import Transfer from './components/Transfer';

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Banking Application</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Check Balance</h2>
            <Balance />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Authenticate</h2>
            <Auth />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Deposit Funds</h2>
            <Deposit />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Transfer Money</h2>
            <Transfer />
          </div>
        </div>
      </div>
    </main>
  );
}
