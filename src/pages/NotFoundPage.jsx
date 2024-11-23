import React from "react";
import { TriangleAlert } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="p-6 flex items-center justify-center h-screen">
      <div>
        <TriangleAlert size={80} className="text-gray-300 mx-auto" />
        <h2 className="text-2xl font-bold mb-4 text-gray-600">Page Not Found</h2>
      </div>
    </div>
  );
};

export default NotFoundPage;
