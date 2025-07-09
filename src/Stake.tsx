import React from "react";
import {Args, CLTypeUInt8, CLValue, Hash, PublicKey, SessionBuilder, TransactionV1} from "casper-js-sdk";

// declare csprclick in window object
declare global {
    interface Window {
        csprclick: any;
        csprclickUI: any;
    }
}

export default function Stake() {
    const [txHash, setTxHash]= React.useState<string | null>(null);

    const handleStake = async () => {
        const clickRef = window.csprclick;
        const sender = clickRef.getActiveAccount().public_key;

        const proxyBytes = await fetch('/proxy_caller.wasm');
        const contractWasm = new Uint8Array(await proxyBytes.arrayBuffer());

        const args_bytes: Uint8Array = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
        const serialized_args = CLValue.newCLList(CLTypeUInt8,
            Array.from(args_bytes)
                .map(value => CLValue.newCLUint8(value))
        );

        const args = Args.fromMap({
            amount: CLValue.newCLUInt512(500000000000),
            attached_value: CLValue.newCLUInt512(500000000000),
            entry_point: CLValue.newCLString("stake"),
            package_hash: CLValue.newCLByteArray(Hash.fromHex('20b6b67cc838b43a2168919068c2bedee3ad730d624d86e2e2ae144e902f6de1').toBytes()),
            args: serialized_args,
        });

        const sessionTransaction = new SessionBuilder()
            .from(PublicKey.fromHex(sender))
            .runtimeArgs(args)
            .wasm(new Uint8Array(contractWasm))
            .payment(10_000_000_000) // Amount in motes
            .chainName('casper-test')
            .build();

        const tx = { transaction: { Version1: TransactionV1.toJSON(sessionTransaction.getTransactionV1()!) } };

        clickRef.send(tx, sender)
            .then((res: any) => {
                if(res?.transactionHash) {
                    setTxHash(res.transactionHash);
                }
            });
    }

    return (
        <div className="Stake">
            <button onClick={handleStake}>STAKE CSPR</button>
            <div style={{marginTop: '20px'}}>
                {txHash && <a href={`https://testnet.cspr.live/deploy/${txHash}`} target="_blank">View transaction</a>}
            </div>
        </div>
    );
}
