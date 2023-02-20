import React, { useState, useEffect } from 'react';
import PageHeader from '../../../features/PageHeader';

interface PaymentHistoryItem {
  packageName: string;
  cost: string;
  date: string;
  status: string;
}

interface CreditCardInfo {
  cardNumber: string;
}

interface BillingData {
  subscription: string;
  packageName: string;
  cost: string;
  creditCardInfo: CreditCardInfo;
  paymentHistory: PaymentHistoryItem[];
}

const Billing: React.FC = (): JSX.Element => {
  const [billingData, setBillingData] = useState<BillingData>({
    subscription: '',
    packageName: '',
    cost: '',
    creditCardInfo: { cardNumber: '' },
    paymentHistory: [],
  });

  useEffect(() => {
    // replace with your own API call or method for retrieving billing data
    fetch('/api/billing')
      .then(async (response) => await response.json())
      .then((data: BillingData) => {
        setBillingData(data);
      })
      .catch((error) => {
        console.error('Error retrieving billing information:', error);
      });
  }, []);

  const {
    subscription,
    packageName,
    cost,
    creditCardInfo,
    paymentHistory,
  } = billingData;
  return (
    <>
      <PageHeader header='Billing' subtitle='Manage Billing and Payments' />
      <div className="flex flex-col h-full p-2">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-20 mb-4 flex flex-row justify-between mt-4">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Subscription Information</h2>
            <div className="mb-2">
              <span className="text-gray-700">Subscription:</span>{' '}
              <span>{subscription || 'No Active Subscription'}</span>
            </div>
            {subscription && (
              <>
                <div className="mb-2">
                  <span className="text-gray-700">Package Name:</span>{' '}
                  <span className="font-bold">{packageName}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-700">Cost:</span>{' '}
                  <span className="font-bold">{cost}</span>
                </div>
              </>
            )}
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Credit Card Information</h2>
            {creditCardInfo.cardNumber ? (
              <div className="mb-2">
                <span className="text-gray-700">Card Number:</span>{' '}
                <span className="font-bold">{creditCardInfo.cardNumber}</span>
              </div>
            ) : (
              <div>No credit card information found</div>
            )}
          </div>
        </div>
        <div className="flex-grow mt-4 mb-4 pl-8">
          <h2 className="text-2xl font-bold mb-4">Payment History</h2>
          <div className="overflow-hidden bg-white">
            <table className="table-auto border-collapse w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-25 py-2">Package Name</th>
                  <th className="px-10 py-2">Cost</th>
                  <th className="px-10 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((payment: PaymentHistoryItem, index: number) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{payment.packageName}</td>
                      <td className="border px-4 py-2">{payment.cost}</td>
                      <td className="border px-4 py-2">{payment.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2 text-center" colSpan={3}>No payment history found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Billing;
