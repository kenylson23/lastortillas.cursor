import React from 'react';
import { Link } from 'wouter';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Las Tortillas
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Sabor autêntico mexicano em cada mordida. Descubra nossa culinária tradicional 
            preparada com ingredientes frescos e técnicas ancestrais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <a className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Ver Menu
              </a>
            </Link>
            <Link href="/rastreamento">
              <a className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
                Rastrear Pedido
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
