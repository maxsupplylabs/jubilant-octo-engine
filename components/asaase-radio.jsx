"use client"

import { useState } from 'react';
import Link from "next/link"

const AsaaseRadio = () => {
  const [url, setUrl] = useState('https://www.asaaseradio.com/category/technology/');
  const [primarySelector, setPrimarySelector] = useState('.post-title > a');
  const [link, setLink] = useState('href');
  const [secondarySelector, setSecondarySelector] = useState('.post-excerpt');
  const [dateSelector, setDateSelector] = useState('.date.meta-item.tie-icon');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, primarySelector, link, secondarySelector, dateSelector }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { data } = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Web Scraper</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={primarySelector}
          onChange={(e) => setPrimarySelector(e.target.value)}
          placeholder="Enter Primary CSS Selector"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link (e.g., href)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={secondarySelector}
          onChange={(e) => setSecondarySelector(e.target.value)}
          placeholder="Enter Secondary CSS Selector"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          value={dateSelector}
          onChange={(e) => setDateSelector(e.target.value)}
          placeholder="Enter Date CSS Selector"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Scrape
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold">Scraped Data:</h2>
          <ul className="list-disc pl-5">
            {result.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Text:</strong> {item.text}<br />
                <Link target='_blank' href={item.link}>
                  {item.link}
                </Link>
                <div>
                  <strong>Secondary Text:</strong> {item.secondaryText}
                </div>
                <div>
                  <strong>Date:</strong> {item.dateText}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
          Error: {error}
        </div>
      )}
    </div>
  );
};

// const AsaaseRadio = () => {
//   const [url, setUrl] = useState('https://www.asaaseradio.com/category/sports/');
//   const [selector, setSelector] = useState('.post-title > a');
//   const [link, setLink] = useState('href');
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   // Scrape the data from the URL using the CSS selector and link
//   const handleScrape = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setResult(null);

//     try {
//       const response = await fetch('/api/scrape', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url, selector, link }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const { data } = await response.json();
//       console.log(data);
//       setResult(data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   /** Function to clean the scraped data: We prompt Gemini 1.5 Pro to remove unnecessary data objects or characters */
//   const cleanData = (data) => {

//   }

//     // Handle stories submission to Firebase
//     const handleProductSave = async () => {
//       try {
//         const productID = generateUniqueId(productData.name);
//       await addProductToStore(
//         {
//           ...productData,
//           isFreeShipping,
//           isAvailableInGhana,
//           isOnSale,
//           isFreeDelivery,
//           id: productID,
//           variations,
//           collections,
//           departments,
//           images: imgurls,
//           price: numericPrice,  // Convert to number
//           market_price: numericMarketPrice,  // Convert to number
//           moq: numericMoq,
//         },
//           productID
//         );
//         toast.success(`Product saved succesfully.`);
//               // Show confetti
//               confetti({
//                 particleCount: 300,
//                 spread: 70,
//                 origin: { y: 0.6 },
//                 colors: ['#bb0000', '#ffffff', '#00ff00', '#0000ff', '#ffbb00']
//               });
//       } catch (e) {
//         console.log(e);
//       } finally {
//         setSaving(false);
//       }
//     };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4 text-center">Web Scraper</h1>
//       <form onSubmit={handleScrape} className="space-y-4">
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter URL"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <input
//           type="text"
//           value={selector}
//           onChange={(e) => setSelector(e.target.value)}
//           placeholder="Enter CSS Selector"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//         <input
//           type="text"
//           value={link}
//           onChange={(e) => setLink(e.target.value)}
//           placeholder="Enter link (e.g., href)"
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
//         >
//           Scrape
//         </button>
//       </form>
//       {result && (
//         <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-xl font-semibold">Scraped Data:</h2>
//           <ol className="list-decimal pl-5">
//             {result.map((item, index) => (
//               <li key={index} className="mb-2">
//                 <strong>Text:</strong> {item.text}<br />
//                 <strong>link:</strong>
//                 <Link target='_blank' href={item.link}>
//                   {item.link}
//                 </Link>
//               </li>
//             ))}
//           </ol>
//         </div>
//       )}
//       {error && (
//         <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
//           Error: {error}
//         </div>
//       )}
//     </div>
//   );
// };

export default AsaaseRadio;

