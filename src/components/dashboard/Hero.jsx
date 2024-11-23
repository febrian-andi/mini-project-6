import React from "react";

const Hero = () => {
    return (
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center items-center p-4">
                <h1 className="text-4xl font-bold text-cyan-600 text-center md:text-left">WELCOME TO WAREHOUSE MANAGEMENT SYSTEM</h1>
            </div>
            <img 
                src="https://www.distri.id/wp-content/uploads/sites/2/2024/09/Warehouse-Management-System-Pengertian-Proses-dan-Keunggulan.jpg"
                alt="hero"
                className="w-auto h-96 object-cover"
            />
        </div>
    );
};

export default Hero;