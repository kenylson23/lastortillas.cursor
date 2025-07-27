import { 
  reservations, contacts, menuItems, orders, orderItems, tables,
  type Reservation, type InsertReservation, 
  type Contact, type InsertContact, type MenuItem, type InsertMenuItem,
  type Order, type InsertOrder, type OrderItem, type InsertOrderItem,
  type Table, type InsertTable
} from "../shared/schema";
import { supabase } from "../shared/supabase";

export interface IStorage {
  // Reservation operations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  createContact(contact: InsertContact): Promise<Contact>;
  getAllReservations(): Promise<Reservation[]>;
  checkAvailability(date: string, time: string): Promise<boolean>;
  getReservationsByDate(date: string): Promise<Reservation[]>;
  
  // Menu Items
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<MenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: number): Promise<void>;
  
  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByStatus(status: string): Promise<Order[]>;
  getOrdersByLocation(locationId: string): Promise<Order[]>;
  updateOrderStatus(id: number, status: string): Promise<Order>;
  updateOrderEstimatedTime(id: number, estimatedDeliveryTime: string): Promise<Order>;
  deleteOrder(id: number): Promise<void>;
  
  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  
  // Tables
  getAllTables(): Promise<Table[]>;
  getTablesByLocation(locationId: string): Promise<Table[]>;
  getTable(id: number): Promise<Table | undefined>;
  createTable(table: InsertTable): Promise<Table>;
  updateTable(id: number, table: Partial<Table>): Promise<Table>;
  deleteTable(id: number): Promise<void>;
  updateTableStatus(id: number, status: string): Promise<Table>;
}

export class SupabaseStorage implements IStorage {
  private initializationPromise: Promise<void> | null = null;
  
  constructor() {
    // Don't initialize in constructor to avoid blocking the app startup
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initializationPromise) {
      this.initializationPromise = this.initializeSampleMenuItems();
    }
    await this.initializationPromise;
  }

  private async initializeSampleMenuItems(): Promise<void> {
    try {
      // Check if menu items already exist
      const { data: existingItems } = await supabase
        .from('menu_items')
        .select('*')
        .limit(1);
      
      if (!existingItems || existingItems.length === 0) {
        // Add sample menu items
        const sampleItems = [
          {
            name: 'Tacos al Pastor',
            description: 'Tacos tradicionais com carne de porco marinada, abacaxi e coentro',
            price: '2500',
            category: 'Tacos',
            available: true
          },
          {
            name: 'Burrito Supremo',
            description: 'Burrito gigante com carne, feijão, arroz, queijo e molho especial',
            price: '3200',
            category: 'Burritos',
            available: true
          },
          {
            name: 'Quesadilla de Queijo',
            description: 'Tortilla crocante recheada com queijo derretido e temperos',
            price: '2000',
            category: 'Quesadillas',
            available: true
          },
          {
            name: 'Nachos Especiais',
            description: 'Chips de tortilla com queijo derretido, guacamole e molho picante',
            price: '2800',
            category: 'Aperitivos',
            available: true
          },
          {
            name: 'Enchiladas Verdes',
            description: 'Tortillas recheadas com frango e cobertas com molho verde',
            price: '3000',
            category: 'Enchiladas',
            available: true
          },
          {
            name: 'Fajitas de Frango',
            description: 'Frango grelhado com pimentos e cebolas, servido com tortillas',
            price: '3500',
            category: 'Fajitas',
            available: true
          }
        ];

        for (const item of sampleItems) {
          await supabase.from('menu_items').insert(item);
        }
        console.log('Sample menu items initialized successfully');
      }
    } catch (error) {
      console.error('Error initializing sample menu items:', error);
      // Don't throw here, let the app continue without sample data
    }
  }

  // Reservation operations
  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('reservations')
      .insert(reservation)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async getAllReservations(): Promise<Reservation[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('reservations')
      .select('*');
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async checkAvailability(date: string, time: string): Promise<boolean> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('date', date)
      .eq('time', time);
    
    if (error) throw new Error(error.message);
    return (data || []).length === 0;
  }

  async getReservationsByDate(date: string): Promise<Reservation[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('date', date);
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  // Menu Items
  async getAllMenuItems(): Promise<MenuItem[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('menu_items')
      .select('*');
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('category', category);
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('menu_items')
      .insert(item)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async updateMenuItem(id: number, updates: Partial<MenuItem>): Promise<MenuItem> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async deleteMenuItem(id: number): Promise<void> {
    await this.ensureInitialized();
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }

  // Orders
  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // Create order items
    for (const item of items) {
      await supabase.from('order_items').insert({ ...item, order_id: data.id });
    }
    
    // If it's a dine-in order with a table, mark the table as occupied
    if ((order as any).orderType === 'dine-in' && (order as any).tableId) {
      console.log(`Marking table ${(order as any).tableId} as occupied for order ${data.id}`);
      await supabase
        .from('tables')
        .update({ status: 'occupied' })
        .eq('id', (order as any).tableId);
      console.log(`Table ${(order as any).tableId} marked as occupied`);
    }
    
    return data;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data;
  }

  async getAllOrders(): Promise<Order[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('orders')
      .select('*');
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status);
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getOrdersByLocation(locationId: string): Promise<Order[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('location_id', locationId);
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async updateOrder(id: number, updates: Partial<Order>): Promise<Order> {
    await this.ensureInitialized();
    // Converter camelCase para snake_case
    const updateData: any = {};
    if (updates.customerName !== undefined) updateData.customer_name = updates.customerName;
    if (updates.customerPhone !== undefined) updateData.customer_phone = updates.customerPhone;
    if (updates.customerEmail !== undefined) updateData.customer_email = updates.customerEmail;
    if (updates.deliveryAddress !== undefined) updateData.delivery_address = updates.deliveryAddress;
    if (updates.orderType !== undefined) updateData.order_type = updates.orderType;
    if (updates.locationId !== undefined) updateData.location_id = updates.locationId;
    if (updates.tableId !== undefined) updateData.table_id = updates.tableId;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.totalAmount !== undefined) updateData.total_amount = updates.totalAmount;
    if (updates.paymentMethod !== undefined) updateData.payment_method = updates.paymentMethod;
    if (updates.paymentStatus !== undefined) updateData.payment_status = updates.paymentStatus;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.estimatedDeliveryTime !== undefined) updateData.estimated_delivery_time = updates.estimatedDeliveryTime;

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    await this.ensureInitialized();
    // Get the current order first to check if it has a table
    const { data: currentOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // If the order is completed or cancelled, and it was a dine-in order with a table,
    // mark the table as available again
    if (currentOrder && 
        currentOrder.orderType === 'dine-in' && 
        currentOrder.tableId && 
        (status === 'delivered' || status === 'cancelled')) {
      await supabase
        .from('tables')
        .update({ status: 'available' })
        .eq('id', currentOrder.tableId);
    }

    return data;
  }

  async updateOrderEstimatedTime(id: number, estimatedDeliveryTime: string): Promise<Order> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('orders')
      .update({ estimated_delivery_time: estimatedDeliveryTime })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteOrder(id: number): Promise<void> {
    await this.ensureInitialized();
    // Get the order first to check if it has a table
    const { data: currentOrder } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    // First delete order items
    await supabase
      .from('order_items')
      .delete()
      .eq('order_id', id);
    
    // Then delete the order
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);

    // If it was a dine-in order with a table, mark the table as available again
    if (currentOrder && 
        currentOrder.orderType === 'dine-in' && 
        currentOrder.tableId) {
      await supabase
        .from('tables')
        .update({ status: 'available' })
        .eq('id', currentOrder.tableId);
    }
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  // Tables operations
  async getAllTables(): Promise<Table[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('tables')
      .select('*');
    
    if (error) throw new Error(error.message);
    
    // Converter snake_case para camelCase
    return (data || []).map(table => ({
      id: table.id,
      locationId: table.location_id,
      tableNumber: table.table_number,
      seats: table.seats,
      status: table.status,
      qrCode: table.qr_code,
      qrCodeUrl: table.qr_code_url,
      createdAt: table.created_at
    })) as Table[];
  }

  async getTablesByLocation(locationId: string): Promise<Table[]> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .eq('location_id', locationId);
    
    if (error) throw new Error(error.message);
    
    // Converter snake_case para camelCase
    return (data || []).map(table => ({
      id: table.id,
      locationId: table.location_id,
      tableNumber: table.table_number,
      seats: table.seats,
      status: table.status,
      qrCode: table.qr_code,
      qrCodeUrl: table.qr_code_url,
      createdAt: table.created_at
    })) as Table[];
  }

  async getTable(id: number): Promise<Table | undefined> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('tables')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    
    // Converter snake_case para camelCase
    return {
      id: data.id,
      locationId: data.location_id,
      tableNumber: data.table_number,
      seats: data.seats,
      status: data.status,
      qrCode: data.qr_code,
      qrCodeUrl: data.qr_code_url,
      createdAt: data.created_at
    } as Table;
  }

  async createTable(insertTable: InsertTable): Promise<Table> {
    await this.ensureInitialized();
    
    console.log(`🔍 Verificando duplicação para mesa ${(insertTable as any).tableNumber} no local ${(insertTable as any).locationId}`);
    
    // Verificar se já existe uma mesa com o mesmo número no mesmo local
    const { data: existingTable } = await supabase
      .from('tables')
      .select('*')
      .eq('location_id', (insertTable as any).locationId)
      .eq('table_number', (insertTable as any).tableNumber);
    
    console.log(`🔍 Encontradas ${existingTable?.length || 0} mesas existentes:`, existingTable);
    
    if (existingTable && existingTable.length > 0) {
      throw new Error(`Já existe uma mesa número ${(insertTable as any).tableNumber} no local ${(insertTable as any).locationId}`);
    }
    
    const { data, error } = await supabase
      .from('tables')
      .insert({
        location_id: (insertTable as any).locationId,
        table_number: (insertTable as any).tableNumber,
        seats: (insertTable as any).seats,
        status: (insertTable as any).status || 'available'
      })
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // Converter snake_case para camelCase
    return {
      id: data.id,
      locationId: data.location_id,
      tableNumber: data.table_number,
      seats: data.seats,
      status: data.status,
      qrCode: data.qr_code,
      qrCodeUrl: data.qr_code_url,
      createdAt: data.created_at
    } as Table;
  }

  async updateTable(id: number, updates: Partial<Table>): Promise<Table> {
    await this.ensureInitialized();
    
    // Se está atualizando o número ou localização, verificar duplicação
    if (updates.tableNumber !== undefined || updates.locationId !== undefined) {
      // Buscar a mesa atual para obter os dados completos
      const currentTable = await this.getTable(id);
      if (!currentTable) {
        throw new Error('Mesa não encontrada');
      }
      
      const newNumber = updates.tableNumber !== undefined ? updates.tableNumber : currentTable.tableNumber;
      const newLocationId = updates.locationId !== undefined ? updates.locationId : currentTable.locationId;
      
      // Verificar se existe outra mesa com o mesmo número no mesmo local
      const { data: existingTable } = await supabase
        .from('tables')
        .select('*')
        .eq('location_id', newLocationId)
        .eq('table_number', newNumber)
        .neq('id', id);
      
      if (existingTable && existingTable.length > 0) {
        throw new Error(`Já existe uma mesa número ${newNumber} no local ${newLocationId}`);
      }
    }
    
    // Converter camelCase para snake_case
    const updateData: any = {};
    if (updates.locationId !== undefined) updateData.location_id = updates.locationId;
    if (updates.tableNumber !== undefined) updateData.table_number = updates.tableNumber;
    if (updates.seats !== undefined) updateData.seats = updates.seats;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.qrCode !== undefined) updateData.qr_code = updates.qrCode;
    if (updates.qrCodeUrl !== undefined) updateData.qr_code_url = updates.qrCodeUrl;
    
    const { data, error } = await supabase
      .from('tables')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // Converter snake_case para camelCase
    return {
      id: data.id,
      locationId: data.location_id,
      tableNumber: data.table_number,
      seats: data.seats,
      status: data.status,
      qrCode: data.qr_code,
      qrCodeUrl: data.qr_code_url,
      createdAt: data.created_at
    } as Table;
  }

  async deleteTable(id: number): Promise<void> {
    await this.ensureInitialized();
    const { error } = await supabase
      .from('tables')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }

  async updateTableStatus(id: number, status: string): Promise<Table> {
    await this.ensureInitialized();
    const { data, error } = await supabase
      .from('tables')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    
    // Converter snake_case para camelCase
    return {
      id: data.id,
      locationId: data.location_id,
      tableNumber: data.table_number,
      seats: data.seats,
      status: data.status,
      qrCode: data.qr_code,
      qrCodeUrl: data.qr_code_url,
      createdAt: data.created_at
    } as Table;
  }
}

export const storage = new SupabaseStorage();