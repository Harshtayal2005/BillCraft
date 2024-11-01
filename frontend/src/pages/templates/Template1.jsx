import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ImageUploader from "../../components/ImageUploader.jsx";
import { countryList } from "./countryCodes.js";

const Template1 = () => {
  const downloadPdf = () => {
    const input = document.getElementById("template-1");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("downloadjisoo.pdf"); // Filename for the downloaded PDF
    });
  };

  const [items, setItems] = useState([0]);
  const [amnt, setAmnt] = useState([0]);
  const priceRef = useRef([]);
  const qtyRef = useRef([]);
  const taxRef = useRef(0);
  const discountRef = useRef(0);
  const [totalSum, setTotalSum] = useState(0);
  const [subTotalSum, setSubTotalSum] = useState(0);
  const [countrySymbol, setCountrySymbol] = useState('$');

  const updateTotalSum = () => {
    const newTotal = amnt.reduce((acc, curr) => acc + curr, 0);
    setTotalSum(newTotal);
    const tax = taxRef.current.value ? parseFloat(taxRef.current.value) : 0;
    const discount = discountRef.current.value
      ? parseFloat(discountRef.current.value)
      : 0;
    const finalTotal =
      newTotal + (newTotal * tax) / 100 - (newTotal * discount) / 100;
    setSubTotalSum(finalTotal);
  };
  const handleItemClick = (e) => {
    let newArr = [];
    let newAmntArr = [];
    if (e === "add") {
      newArr = [...items, items[items.length - 1] + 1];
      newAmntArr = [...amnt, 0];
    } else {
      newArr = items.slice(0, -1);
      newAmntArr = amnt.slice(0, -1);
    }
    setItems(newArr);
    setAmnt(newAmntArr);
  };
  const handlePriceOrQtyChange = (idx) => {
    const updatedAmounts = [...amnt];
    updatedAmounts[idx] =
      (priceRef.current[idx].value || 0) * (qtyRef.current[idx].value || 0);
    setAmnt(updatedAmounts);
  };
  const handleCurrChange = (e) => {
    const keyCurrency = e.target.value;
    setCountrySymbol(countryList[keyCurrency])
  }

  useEffect(() => {
    updateTotalSum();
  }, [amnt, taxRef.current.value, discountRef.current.value]);

  const itemFn = (idx) => {
    return (
      <>
        <div className="col-span-3 border border-black rounded-lg overflow-hidden">
          <input type="text" className="w-full h-10 outline-none pl-2" />
        </div>
        <div>
          <div className="flex items-center pl-2 border border-black rounded-lg overflow-hidden">
            <p>{countrySymbol}</p>
            <input
              type="number"
              ref={(el) => (priceRef.current[idx] = el)}
              onChange={() => handlePriceOrQtyChange(idx)}
              className="w-full  h-10 outline-none pl-1"
            />
          </div>
        </div>
        <div>
          <input
            type="number"
            ref={(el) => (qtyRef.current[idx] = el)}
            onChange={() => handlePriceOrQtyChange(idx)}
            className="border w-full border-black rounded-lg h-10 outline-none pl-2"
          />
        </div>
        <div>
          <div className="flex items-center pl-2 border border-black rounded-lg overflow-hidden">
            <p>{countrySymbol}</p>
            <input
            type="number"
            disabled
            value={amnt[idx]}
            className="w-full h-10 outline-none pl-1 hover:cursor-not-allowed"
          />
          </div>
          
        </div>
        <div
          className={`col-span-6 mt-4 mb-4 border border-black ${
            items.length === 1 && "hidden"
          }`}
        ></div>
      </>
    );
  };
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex md:flex-row">
        <div
          className="flex flex-col gap-10 w-full md:w-[80%] border-r border-black"
          id="template-1"
        >
          <div className="mt-8 flex flex-col-reverse gap-4 sm:gap-0 sm:flex sm:flex-row sm:justify-between sm:items-center">
            <div className="flex h-32 mx-12 sm:mx-0 justify-between sm:justify-start sm:gap-5">
              <div className="hidden sm:block h-full w-8 bg-orange-400"></div>
              <ImageUploader />
              <div className="flex flex-col py-2 justify-evenly w-[10rem] xsm:w-[15rem]">
                <input
                  type="text"
                  placeholder="From"
                  className="text-3xl outline-none rounded-lg pl-2 border"
                />
                <textarea
                  placeholder="Address"
                  className="h-6 resize-none overflow-hidden outline-none rounded-lg pl-2"
                ></textarea>
                <input
                  type="text"
                  placeholder="Contact"
                  className="outline-none text-gray-600 rounded-lg pl-2"
                />
              </div>
            </div>
            <div className="flex justify-end items-center">
              <h1 className="text-2xl font-bold bg-orange-500 px-6 py-3 rounded-l-full">Invoice</h1>
            </div> 
          </div>

          <div className="flex flex-col gap-4 xsm:gap-0 xsm:flex-row xsm:justify-between xsm:items-end mx-12">
            <div className="flex flex-col w-[10rem]">
              <h1 className="text-3xl">Bill To:</h1>
              <input type="text" placeholder="name" className="outline-none" />
              <input
                type="text"
                placeholder="address"
                className="outline-none"
              />
              <input
                type="text"
                placeholder="contact"
                className="outline-none"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1>Invoice no:</h1>
                <input
                  type="text"
                  className="pl-2 outline-none text-end border"
                  placeholder="invoice no"
                />
              </div>
              <div className="flex justify-between">
                <h1>Date:</h1>
                <input
                  type="text"
                  className="pl-2 outline-none text-end border"
                  placeholder="dd-mm-yyyy"
                />
              </div>

              <div className="flex justify-between">
                <h1>Due Date:</h1>
                <input
                  type="text"
                  className="pl-2 outline-none text-end border"
                  placeholder="due date"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-x-2 xsm:gap-x-8 mx-12">
            <div className="col-span-3 font-bold">Item Description</div>
            <div className="font-bold">Price</div>
            <div className="font-bold">QTY</div>
            <div className="font-bold">Total</div>
            <div className="col-span-6 mt-2 mb-4 border border-black"></div>
            {items.map((idx) => itemFn(idx))}
          </div>

          <div className="mx-12 flex gap-5">
            <button
              onClick={() => handleItemClick("add")}
              className="p-2 border border-green-500 rounded-lg"
            >
              Line item
            </button>
            <button
              onClick={() => handleItemClick("remove")}
              className={`p-2 border border-red-500 rounded-lg ${
                items.length === 0 && "hidden"
              }`}
            >
              Remove Item
            </button>
          </div>

          <div className="mx-12 flex justify-end">
            <div className="flex flex-col w-[45%]">
              <div className="flex justify-between">
                <h1>Total</h1>
                <h1>{countrySymbol}{totalSum}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Tax (%)</h1>
                <input
                  type="number"
                  ref={taxRef}
                  onChange={updateTotalSum}
                  placeholder="tax"
                  className="text-right appearance-none w-[5rem]"
                />

              </div>
              <div className="flex justify-between">
                <h1>Discount (%)</h1>
                <input
                  type="number"
                  ref={discountRef}
                  onChange={updateTotalSum}
                  placeholder="discount"
                  className="text-right appearance-none w-[5rem]"
                />
              </div>
              <div className="border border-black my-2"></div>
              <div className="flex justify-between">
                <h1>Sub Total</h1>
                <h1>{countrySymbol}{subTotalSum}</h1>
              </div>
            </div>
          </div>

          <div className="flex justify-between mx-12 mt-4">
            <div className="flex flex-col w-1/2">
              <h1 className="font-bold text-2xl">Terms and Conditions</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente fuga, dolorem voluptatibus accusamus impedit ratione?.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="font-bold text-2xl">Harsh Tayal</h1>
              <p>Manager</p>
            </div>
          </div>
          
          {/* footer */}
          <div className="bg-orange-400 h-8"></div>
        </div>

        <div className="w-[20%] h-screen flex flex-col gap-5 justify-center items-center">
          <button
            onClick={downloadPdf}
            className="bg-orange-500 py-4 px-8 rounded-xl"
          >
            Download
          </button>

          <div className="bg-green-400 py-4 w-[8rem] flex rounded-xl">
            <select onChange={handleCurrChange} className="outline-none ml-2 bg-green-400 w-[6rem] hover:cursor-pointer">
              {Object.keys(countryList).map((curr) => (
                <option key={curr} value={curr}>
                  {curr} {countryList[curr]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template1;
