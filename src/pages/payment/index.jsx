import SuccessIcon from "../../assets/success.png";
import QR from "../../assets/exampleqr.png";
import ImportIcon from "../../assets/import.png";
import { priceFormatter } from "../../utils/utils";
import { usePayment } from "./hooks";
import Breadcrumb from "../../components/breadcrumb";

export default function Payment() {
  const { state, method } = usePayment();

  return (
    <div id="payment" className="flex flex-col gap-16 pt-40 px-20">
      <Breadcrumb page="Payment" />

      {state.transaction && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 pb-32">
          <img
            src={SuccessIcon}
            alt="success-icon"
            className="w-[72px] h-[72px]"
          />
          <div className="text-center">
            <h1 className="font-bold text-4xl">Checkout successful!</h1>
            <h5 className="text-2xl">
              Scan the barcode below to complete payment.
            </h5>
          </div>
          <img src={QR} alt="qr-payment" className="w-[250px] h-[250px]" />
          <div className="flex flex-col gap-8 py-9 px-10 border rounded-lg shadow-md">
            <div className="flex justify-between gap-10">
              <h4 className="text-[16px]">References Number</h4>
              <h4 className="font-medium text-[16px]">
                {state.transaction.ref_number}
              </h4>
            </div>

            <div className="flex justify-between gap-10">
              <h4 className="text-[16px]">Date</h4>
              <h4 className="font-medium text-[16px]">
                {state.transaction.date}
              </h4>
            </div>

            <div className="flex justify-between gap-10">
              <h4 className="text-[16px]">Time</h4>
              <h4 className="font-medium text-[16px]">
                {state.transaction.time}
              </h4>
            </div>

            <div className="border border-dashed"></div>

            <div className="flex justify-between gap-6">
              <h4 className="font-medium text-[16px]">Amount</h4>
              <h4 className="font-medium text-[16px]">
                {priceFormatter(state.transaction.total_price)}
              </h4>
            </div>

            <div className="border"></div>

            <button
              onClick={() => method.onClickButtonGenerate()}
              className="flex justify-center gap-6 border rounded-md py-3"
            >
              <img src={ImportIcon} alt="download" className="w-6 h-6" />
              <span className="font-medium text-sm">Get PDF Receipt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
