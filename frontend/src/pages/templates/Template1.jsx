import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ImageUploader from "../../components/ImageUploader.jsx";

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
  //   const priceRef = useRef(null);
  //   const qtyRef = useRef(null);
  //   const taxRef = useRef(null);
  // const discountRef = useRef(null);
  const priceRef = useRef([]);
  const qtyRef = useRef([]);
  const taxRef = useRef(0);
  const discountRef = useRef(0);
  const [totalSum, setTotalSum] = useState(0);
  const [subTotalSum, setSubTotalSum] = useState(0);

  const updateTotalSum = () => {
    const newTotal = amnt.reduce((acc, curr) => acc + curr, 0);
    setTotalSum(newTotal);
    const tax = taxRef.current.value ? parseFloat(taxRef.current.value) : 0;
    const discount = discountRef.current.value ? parseFloat(discountRef.current.value) : 0;
    const finalTotal = newTotal + (newTotal * tax) / 100 - (newTotal * discount) / 100;
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

  useEffect(() => {
    updateTotalSum();
  }, [amnt, taxRef.current.value, discountRef.current.value]);

  const itemFn = (idx) => {
    return (
      <>
        <div className="col-span-3">
          <input
            type="text"
            className="border w-full border-black rounded-lg h-10 outline-none pl-2"
          />
        </div>
        <div>
          <input
            type="number"
            ref={(el) => (priceRef.current[idx] = el)}
            onChange={() => handlePriceOrQtyChange(idx)}
            className="border w-full border-black rounded-lg h-10 outline-none pl-2"
          />
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
          <input
            type="number"
            disabled
            value={amnt[idx]}
            className="border w-full border-black rounded-lg h-10 outline-none pl-2 hover:cursor-not-allowed"
          />
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
      <div className="h-screen" id="template-1">
        <div className="flex flex-col gap-10">
          <div className="mt-8 flex justify-between items-center">
            <div className="flex h-32 gap-5">
              <div className="h-full w-8 bg-orange-400"></div>
              <ImageUploader />
              <div className="flex flex-col py-2 justify-evenly">
                <input
                  type="text"
                  placeholder="From"
                  className="text-3xl outline-none border rounded-lg pl-2"
                />
                <textarea
                  placeholder="Address"
                  className="h-6 resize-none overflow-hidden outline-none border rounded-lg pl-2"
                ></textarea>
                <input
                  type="text"
                  placeholder="Contact"
                  className="outline-none text-gray-600 border rounded-lg pl-2"
                />
              </div>
            </div>
            <div className="px-8 py-3 h-1/2 bg-orange-400 rounded-l-full">
              <h1 className="text-2xl font-bold">Invoice</h1>
            </div>
          </div>

          <div className="flex justify-between mx-12 items-end">
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
            <div className="flex flex-col text-gray-500">
              <span>
                Invoice no:
                <input
                  type="text"
                  className="pl-2 outline-none"
                  placeholder=""
                />
              </span>
              <span>
                Date:
                <input type="text" className="pl-2 outline-none" />
              </span>
              <span>
                Due Date:
                <input type="text" className="pl-2 outline-none" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-x-8 mx-12">
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
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h1>Total</h1>
                <h1>{totalSum}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Tax</h1>
                <input
                  type="number"
                  ref={taxRef}
                  onChange={updateTotalSum}
                  className="text-end resize-none -mr-4"
                />
              </div>
              <div className="flex justify-between">
                <h1>Discount</h1>
                <input
                  type="number"
                  ref={discountRef}
                  onChange={updateTotalSum}
                  className="text-end resize-none -mr-4"
                />
              </div>
              <div className="flex justify-between">
                <h1>Sub Total</h1>
                <h1>{subTotalSum}</h1>
              </div>
            </div>
          </div>
          <button onClick={downloadPdf}>Click me</button>
        </div>
      </div>
    </>
  );
};

export default Template1;
