import React, { useState } from 'react';
import apexPaymentIcon from '../assets/apex-payment-icon.svg';
import securePaymentsBadge from '../assets/secure-payments-badge.svg';

declare const Razorpay: any;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRazorpayPayment = () => {
    setLoading(true);

    // Replace "rzp_test_placeholder" with your actual Razorpay Key ID
    const options = {
      key: "rzp_test_placeholder",
      amount: 2900, // Amount in paise (₹29.00)
      currency: "INR",
      name: "Apex Resume Builder",
      description: "One-time Resume Export Fee",
      image: apexPaymentIcon,
      handler: function (response: any) {
        // This function executes after a successful payment
        console.log("Payment Successful:", response.razorpay_payment_id);
        setLoading(false);
        onSuccess();
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      notes: {
        purpose: "Resume Export"
      },
      theme: {
        color: "#2563eb" // Blue-600
      },
      modal: {
        ondismiss: function() {
          setLoading(false);
        }
      }
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment Failed: " + response.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Error initializing payment. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!loading ? onClose : undefined}
      />

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-blue-600 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-1">Unlock Pro Export</h2>
          <p className="text-blue-100 text-sm">Download your ATS-optimized resume</p>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Total Price</span>
              <span className="text-2xl font-extrabold text-slate-900">₹29.00</span>
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Validity</span>
              <span className="text-sm font-bold text-slate-700">Lifetime</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              </div>
              <p className="text-sm text-slate-600">100% ATS Optimized Linear Layout</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              </div>
              <p className="text-sm text-slate-600">Searchable High-Resolution PDF</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              </div>
              <p className="text-sm text-slate-600">Unlimited Updates & Re-downloads</p>
            </div>
          </div>

          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-3 ${
              loading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-200'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Initializing Secure Gateway...
              </>
            ) : (
              <>
                Pay ₹29 & Download PDF
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 grayscale opacity-50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Payments by</span>
            <img src={securePaymentsBadge} alt="Secure payments" className="h-4 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
