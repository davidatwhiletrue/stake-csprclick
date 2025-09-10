import React from "react";
import Big from 'big.js';

export default function APY() {

    const getAPY = async () => {

        const cloudProxy = window.csprclick.getCsprCloudProxy();
        const metricsRes = await cloudProxy.fetch('/auction-metrics');
        const supplyRes = await cloudProxy.fetch('/supply');

        const apyPercentage =
            supplyRes.data?.total && metricsRes.data?.total_active_era_stake
                ? Big(supplyRes.data.total)
                    .mul(0.25)
                    .div(Big(metricsRes.data.total_active_era_stake).div(1000000000))
                    .toString()
                : null;
        console.log('APY:', apyPercentage);
    };

    return (
        <div className="Apy">
            <button onClick={getAPY}>Get APY</button>
        </div>
    );
}
