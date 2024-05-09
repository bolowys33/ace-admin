// components/Loading.tsx
const Loading = () => {
    return (
      <div className="flex flex-col bg-[#182237] my-3 p-5 rounded-lg text-sm h-[500px]">
        <div className="flex items-center justify-between">
          <div className="h-6 w-64 bg-gray-500 animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-500 animate-pulse"></div>
        </div>
        <div>
          <table className="w-full my-5">
            <thead>
              <tr>
                <td className="px-2 pb-3 w-[40%]">
                  <div className="h-6 bg-gray-500 animate-pulse"></div>
                </td>
                <td className="px-2 pb-3 w-[30%]">
                  <div className="h-6 bg-gray-500 animate-pulse"></div>
                </td>
                <td className="px-2 pb-3 w-[10%]">
                  <div className="h-6 bg-gray-500 animate-pulse"></div>
                </td>
                <td className="px-2 pb-3 w-[20%]">
                  <div className="h-6 w-32 bg-gray-500 animate-pulse"></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <div className="h-6 bg-gray-500 animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-6 bg-gray-500 animate-pulse"></div>
                  </td>
                  <td className="p-2">
                    <div className="h-6 bg-gray-500 animate-pulse"></div>
                  </td>
                  <td className="flex p-2 space-x-2">
                    <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-500 animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Loading;