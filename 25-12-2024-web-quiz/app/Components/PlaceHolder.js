import React from "react";
import Image from "next/image";

function PlaceHolder(props) {
    return (
        <div className="poppins flex-col gap-3 p-4 flex justify-center items-center">
            <Image src="/emptyBox.png" alt="Empty Icon" width={130} height={130} />
            <h2 className="text-2xl font-bold">
                Quiz await! Made one.
            </h2>
            <span className="text-[13px] font-light">
                Click box to begin your journey here ...
            </span>
            <button className="p-3 px-4 text-white text-[12px] bg-green-700 rounded-md">
                Create my first Quiz
            </button>
        </div>
    );
}

export default PlaceHolder;