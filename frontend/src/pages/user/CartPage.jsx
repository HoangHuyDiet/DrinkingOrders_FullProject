import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/OrderService';
import { getCurrentUser } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, totalPrice, updateQuantity } = useCart();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    //State cho Model QR
    const [showQR, setShowQR] = useState(false);
    
    const navigate = useNavigate();
    const user = getCurrentUser();
    
    //Khi sửa giỏ hàng -> Tắt QR đi để bắt tính tiền lại
    useEffect(() => {
      setShowQR(false);
    }, [cart]);

    //Bước 1: Tạo đơn hàng trước
    const handleShowQR = async () => {
        if (!user) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            navigate("/login");
            return;
        }
        if (cart.length === 0) {
            alert("GiỎ hàng trống!");
            return;
        }
        if (!address.trim() || !phone.trim()) {
          alert("Vui lòng nhập địa chỉ và số điện thoại!");
          return;
        }

        setShowQR(true);
    };

    const handleConfirmPayment = async () => {
      setLoading(true);

      //Chuẩn bị dữ liệu
      const orderPayload = {
        userId: user.id,
        address: address,
        phone: phone,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      try {
        await createOrder(orderPayload);

        alert("Đã nhận đơn hàng! Chúng tôi sẽ kiểm tra thanh toán và giao hàng sớm nhất.");
        setShowQR(false);
        clearCart();
        navigate("/");
      } catch (error) {
        let msg = error.response?.data;
        if (typeof msg === 'object' && msg !== null) msg = msg.message;
        alert("Lỗi tạo đơn: " + (msg || "Có lỗi xảy ra"));
      } finally {
        setLoading(false);
      }

      if (cart.length === 0) {
        return <div className='min-h-screen pt-24 text-center text-gray-500'>Giỏ hàng của bạn đang trống.</div>
      }
    }


    return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-[#4a3b36] mb-8 text-center">Giỏ Hàng Của Bạn</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách món */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          {cart&& cart.length > 0 && cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt="" className="w-16 h-16 object-cover rounded" />
                <div>
                  <h4 className="font-bold text-[#4a3b36]">{item.name}</h4>
                  <div className='flex items-center gap-2 mt-1'>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled= {item.quantity <= 1}
                      className='w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50'
                    >
                      -
                    </button>

                    <span className='w-6 text-center font-bold text-sm'>{item.quantity}</span>

                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100 text-gray-600'
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-[#c6a87c]">{(item.price * item.quantity).toLocaleString()} đ</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">Xóa</button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right text-xl font-bold text-[#4a3b36]">
            Tổng cộng: <span className="text-[#c6a87c]">{totalPrice.toLocaleString()} VNĐ</span>
          </div>
        </div>

        {/* Form thông tin giao hàng */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold mb-4 text-[#4a3b36]">Thông tin giao hàng</h3>
          <div className="space-y-4">
            <input className="w-full p-2 border rounded bg-gray-100" value={user?.fullName || ""} disabled />
            <input 
              className="w-full p-2 border rounded" 
              placeholder="Số điện thoại nhận hàng" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <textarea 
              className="w-full p-2 border rounded" 
              placeholder="Địa chỉ giao hàng" 
              rows="3"
              value={address}
              onChange={e => setAddress(e.target.value)}
            ></textarea>
            <button 
              onClick={handleShowQR}
              disabled={loading}
              className={`w-full py-3 rounded font-bold text-white transition ${loading ? "bg-gray-400" : "bg-[#4a3b36] hover:bg-[#c6a87c]"}`}
            >
              {loading ? "Đang xử lý..." : "THANH TOÁN & LẤY MÃ QR"}
            </button>
          </div>
        </div>
      </div>

      {/* Show QR Code */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#4a3b36] p-4 text-center">
              <h3 className="text-white font-bold text-xl">THANH TOÁN CHUYỂN KHOẢN</h3>
            </div>
            
            <div className="p-6 text-center space-y-4">
              <p className="text-gray-600">Vui lòng quét mã bên dưới để thanh toán</p>
              
              {/* ẢNH QR TỰ ĐỘNG TỪ VIETQR API */}
              <img 
                src={`https://img.vietqr.io/image/MB-0338126216-compact.png?amount=${totalPrice}&addInfo=THANHTOAN DON ${user.username} ${phone}`} 
                alt="QR Code" 
                className="mx-auto w-64 border-2 border-[#c6a87c] rounded-lg"
              />

              <div className="bg-gray-50 p-3 rounded text-sm text-left space-y-1">
                <p>Số tiền: <span className="font-bold text-[#c6a87c]">{totalPrice.toLocaleString()} VNĐ</span></p>
                <p>Nội dung: <span className="font-bold">THANHTOAN DON {user.username} {phone}</span></p>
                <p>Ngân hàng: <span className="font-bold">MB Bank</span></p>
              </div>

              <button 
                onClick={handleConfirmPayment}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition mt-4"
              >
                TÔI ĐÃ CHUYỂN KHOẢN
              </button>
              <button 
                onClick={() => setShowQR(false)}
                className="text-sm text-gray-500 underline mt-2 hover:text-gray-700"
              >
                Đóng (Thanh toán sau)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
        
}

export default CartPage;