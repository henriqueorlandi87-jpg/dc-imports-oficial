"use client";

import { useState, useRef } from "react";

interface Product {
  id: number;
  name: string;
  concentration: string;
  description: string;
  manufacturer: string;
  reference: string;
  image: string;
  category: string;
  priceBRL: number;
  oldPriceBRL?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Retatrutide (Kit Total 120 mg)",
    concentration: "24 mg per vial",
    description: "Provided for professional analytical use only. Manufactured in strict compliance with ISO 17034:2015 as a Certified Reference Material (CRM).",
    manufacturer: "ZPHC Profi-Line",
    reference: "CAS No.: 2381089-83-2",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/screenshot2026-07-30131954-450x450.png",
    category: "RETATRUTIDA",
    priceBRL: 660.00,
    oldPriceBRL: 825.00,
  },
  {
    id: 2,
    name: "Tirzepatide Pro Kit",
    concentration: "30 mg per vial",
    description: "High-grade analytical reference material for laboratory research and calibration.",
    manufacturer: "ZPHC Profi-Line",
    reference: "CAS No.: 2023788-19-2",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/screenshot2026-07-30131954-450x450.png",
    category: "TIRZEPATIDA",
    priceBRL: 544.50,
    oldPriceBRL: 770.00,
  },
];

export default function ZPHCStorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("PROMOÇÕES");
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartRef = useRef<HTMLDivElement>(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const categories = ["PROMOÇÕES", "RETATRUTIDA", "TIRZEPATIDA", "PEPTÍDEOS", "HORMÔNIOS"];

  const filteredProducts = selectedCategory === "PROMOÇÕES"
    ? productsData.filter(p => p.oldPriceBRL && p.oldPriceBRL > p.priceBRL)
    : productsData.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalBRL = cart.reduce((acc, item) => acc + (item.priceBRL * item.quantity), 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    const phoneNumber = "5511985183140"; // Seu número configurado
    let message = "Olá! Gostaria de fazer o seguinte pedido na Dc Imports (Pagamento via PIX):%0A";
    cart.forEach((item, index) => {
      message += `%0A${index + 1}. ${item.name} (${item.concentration}) - Qtd: ${item.quantity} - R$ ${(item.priceBRL * item.quantity).toFixed(2)}`;
    });
    message += `%0A%0A*Total Geral:* R$ ${totalBRL.toFixed(2)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white pb-20">
      {/* Cabeçalho */}
      <header className="bg-blue-900 text-white border-b border-blue-800 sticky top-0 z-50 py-4 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold tracking-tight">Dc Imports</h1>
        </div>
        <button 
          onClick={scrollToCart}
          className="bg-white/10 hover:bg-white/25 transition-all px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 cursor-pointer border border-white/10 shadow-sm"
        >
          🛒 Carrinho: <span className="font-bold text-white">{totalItemsCount}</span> itens
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Bloco de Boas-Vindas Verde */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white border border-emerald-400 rounded-3xl p-8 mb-10 shadow-xl text-center">
          <h2 className="text-3xl font-extrabold mb-2">Bem-vindo à Dc Imports! 🚀</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-6 text-base font-medium">
            Trabalhamos com encomendas que vêm <strong>diretamente do Paraguai</strong>, garantindo qualidade e os melhores produtos para você.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-sm">
            <div className="bg-white text-emerald-900 p-4 rounded-2xl flex items-center justify-center gap-3 font-extrabold shadow-md border-2 border-emerald-300">
              <span className="text-2xl">💠</span>
              <span>ACEITAMOS EXCLUSIVAMENTE PIX</span>
            </div>
            <div className="bg-white text-emerald-900 p-4 rounded-2xl flex items-center justify-center gap-3 font-extrabold shadow-md border-2 border-emerald-300">
              <span className="text-2xl">📦</span>
              <span>PRODUTOS POSTADOS EM ATÉ 3 DIAS ÚTEIS</span>
            </div>
          </div>
        </div>

        {/* Botões de Filtro */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all border ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md scale-105 border-blue-500"
                  : category === "PROMOÇÕES"
                  ? "bg-red-600 text-white hover:bg-red-500 border-red-500 animate-pulse"
                  : "bg-blue-900/60 text-blue-200 hover:bg-blue-900 border-blue-800"
              }`}
            >
              {category === "PROMOÇÕES" ? "🔥 PROMOÇÕES" : category}
            </button>
          ))}
        </div>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white text-gray-900 rounded-3xl p-6 shadow-xl flex flex-col justify-between border border-gray-100 relative overflow-hidden">
                {product.oldPriceBRL && product.oldPriceBRL > product.priceBRL && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Oferta
                  </span>
                )}

                <div>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-6 rounded-2xl bg-gray-50 p-2" />
                  <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
                      <span className="text-xs font-mono text-gray-500">{product.reference}</span>
                  </div>
                  <h3 className="font-extrabold text-2xl mt-1 text-gray-900 leading-tight">{product.name}</h3>
                  <p className="text-gray-600 font-medium mt-2 text-sm">{product.concentration}</p>
                  <p className="text-gray-500 mt-4 text-xs">{product.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    {product.oldPriceBRL && product.oldPriceBRL > product.priceBRL && (
                      <span className="text-xs text-gray-400 line-through block font-semibold">
                        R$ {product.oldPriceBRL.toFixed(2)}
                      </span>
                    )}
                    <p className="text-emerald-700 font-extrabold text-3xl tracking-tight">R$ {product.priceBRL.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md text-sm uppercase tracking-wide cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-blue-300 font-medium bg-blue-900/40 rounded-3xl border border-blue-800">
              Nenhum produto encontrado nesta categoria no momento.
            </div>
          )}
        </div>
      </main>

      {/* Secção do Carrinho */}
      {cart.length > 0 && (
        <div ref={cartRef} className="mt-16 max-w-4xl mx-auto bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100">
          <h3 className="text-2xl font-extrabold mb-6 text-gray-900 border-b pb-3">Carrinho de Referências</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center text-sm bg-gray-50 p-4 rounded-2xl border border-gray-100 gap-4">
                <div className="text-center sm:text-left">
                  <span className="font-bold text-gray-900 block text-base">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.concentration}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[110px]">
                    <span className="font-black text-emerald-700 text-lg block">R$ {(item.priceBRL * item.quantity).toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider ml-2 cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xl font-extrabold mb-8 p-6 bg-blue-50 text-blue-900 rounded-2xl border border-blue-100 gap-2">
            <span>Subtotal Geral:</span>
            <span className="text-3xl font-black text-emerald-700">R$ {totalBRL.toFixed(2)}</span>
          </div>

          <button
            onClick={checkoutWhatsApp}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-extrabold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-4 text-lg shadow-xl uppercase tracking-widest cursor-pointer"
          >
            Finalizar Pedido via WhatsApp (Pagamento via PIX)
          </button>
        </div>
      )}
    </div>
  );
}