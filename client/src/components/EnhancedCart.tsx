import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Clock } from 'lucide-react';
import type { CustomerInfo, CartItem, MenuItem } from '@/types/components';

interface EnhancedCartProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: number, customizations: string[], newQuantity: number) => void;
  onRemoveItem: (itemId: number, customizations: string[]) => void;
  onClearCart: () => void;
  onCheckout: (customerInfo: CustomerInfo) => void;
  qrTableId?: number | null;
}

export function EnhancedCart({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  qrTableId
}: EnhancedCartProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    orderType: 'takeaway',
    paymentMethod: 'cash',
    notes: '',
    tableId: null
  });

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Atualizar customerInfo quando qrTableId mudar
  useEffect(() => {
    if (qrTableId) {
      setCustomerInfo((prev: CustomerInfo) => {
        const updated: CustomerInfo = {
          ...prev,
          orderType: 'dine-in' as const,
          tableId: qrTableId
        };
        return updated;
      });
    }
  }, [qrTableId]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);

  const getPreparationTime = () => {
    const maxTime = Math.max(...cart.map(item => item.preparationTime || 15));
    return maxTime;
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Por favor, preencha pelo menos o nome e telefone.');
      return;
    }

    setIsProcessing(true);
    try {
      await onCheckout(customerInfo);
      setShowCustomerForm(false);
      setCustomerInfo({
        name: '',
        phone: '',
        email: '',
        address: '',
        orderType: 'takeaway',
        paymentMethod: 'cash',
        notes: '',
        tableId: null
      });
    } catch (error) {
      console.error('Erro no checkout:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-AO', {
      style: 'currency',
      currency: 'AOA'
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold">Carrinho</h2>
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                {totalItems}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.customizations.join(',')}`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image || '/api/placeholder/80/80'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.price}</p>
                    {item.customizations.length > 0 && (
                      <p className="text-xs text-gray-500">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.customizations, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.customizations, item.quantity + 1)}
                      className="p-1 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id, item.customizations)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Summary */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <p>⏱️ Tempo estimado: {getPreparationTime()} minutos</p>
              </div>

              {/* Customer Info Form */}
              {!showCustomerForm ? (
                <button
                  onClick={() => setShowCustomerForm(true)}
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Finalizar Pedido
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, name: e.target.value };
                  return updated;
                })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, phone: e.target.value };
                  return updated;
                })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+244 123 456 789"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, email: e.target.value };
                  return updated;
                })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Pedido
                      </label>
                      <select
                        value={customerInfo.orderType}
                        onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, orderType: e.target.value as "delivery" | "takeaway" | "dine-in" };
                  return updated;
                })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="takeaway">Para levar</option>
                        <option value="delivery">Entrega</option>
                        <option value="dine-in">No restaurante</option>
                      </select>
                    </div>

                    {customerInfo.orderType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endereço de Entrega
                        </label>
                        <input
                          type="text"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, address: e.target.value };
                  return updated;
                })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Endereço completo"
                        />
                      </div>
                    )}

                    {customerInfo.orderType === 'dine-in' && qrTableId && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mesa
                        </label>
                        <input
                          type="text"
                          value={qrTableId}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Método de Pagamento
                      </label>
                      <select
                        value={customerInfo.paymentMethod}
                        onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, paymentMethod: e.target.value as "cash" | "card" | "transfer" };
                  return updated;
                })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="cash">Dinheiro</option>
                        <option value="card">Cartão</option>
                        <option value="transfer">Transferência</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observações
                      </label>
                      <textarea
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo((prev: CustomerInfo) => {
                  const updated: CustomerInfo = { ...prev, notes: e.target.value };
                  return updated;
                })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Instruções especiais, alergias, etc."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowCustomerForm(false)}
                      className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing || !customerInfo.name || !customerInfo.phone}
                      className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}