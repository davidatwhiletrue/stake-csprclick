import React from "react";

export default function USDRate() {

    const [usdRate, setUsdRate] = React.useState<number|null>(null);

    const getAPY = async () => {

        const cloudProxy = window.csprclick.getCsprCloudProxy();
        const usdRateRes = await cloudProxy.fetch('/rates/1/latest');
        setUsdRate(usdRateRes.data?.amount);

        console.log('USD-CSPR rate:', usdRateRes);
    };

    return (
        <div className="Apy">
            <button onClick={getAPY}>Get USD Rate</button>
            {usdRate && <div>USD Rate: {usdRate}</div>}
        </div>
    );
}
