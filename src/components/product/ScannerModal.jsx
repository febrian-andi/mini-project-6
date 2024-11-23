import React from 'react';
import BarcodeScanner from "react-qr-barcode-scanner";

const ScannerModal = ({ isOpen, onClose, onScan }) => {
  if (!isOpen) return null;

  const handleScan = (data) => {
    if (data) {
      onScan(data.text);
      onClose();
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Scan Barcode/QR Code</h2>
        <BarcodeScanner
          onUpdate={(error, result) => {
            if (result) {
              handleScan(result);
            } else if (error) {
              handleError(error);
            }
          }}
        />
        <button
          className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={onClose}
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
};

export default ScannerModal;
