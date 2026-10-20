import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem,
} from '../store/cartSlice';

const PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS', price: 1200 },
  { id: 2, name: 'Mouse Logitech', price: 45 },
  { id: 3, name: 'Keyboard Mechanical', price: 120 },
  { id: 4, name: 'Monitor LG 27"', price: 350 },
  { id: 5, name: 'USB Cable', price: 15 },
];

export default function CartScreen() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddProduct = () => {
    const randomProduct =
      PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    dispatch(addToCart(randomProduct));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Giỏ Hàng Redux</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                  )
                }
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantity}> {item.quantity} </Text>

              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Text style={styles.removeText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
        }
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>+ Thêm Sản Phẩm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.buttonText}>🗑️ Xóa Giỏ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Tổng tiền: ${totalPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    color: '#888',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  qtyButton: {
    backgroundColor: '#e0e0e0',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  removeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});