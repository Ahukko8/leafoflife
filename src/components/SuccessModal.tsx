"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SuccessModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const SuccessModal = ({ isVisible, onClose }: SuccessModalProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 20;
          if (newProgress >= 100) {
            clearInterval(timer);
            onClose();
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-600">Success!</h2>
            <p className="mb-6 eading-relaxed text-justify text-[#3E3C37]">
              Thank you! We have received your product request. We will contact you for confirmation as soon as possible!
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              This message will close in {5 - Math.floor(progress / 20)} seconds
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;