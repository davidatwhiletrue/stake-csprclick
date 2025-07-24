import React from "react";
import {
    Args,
    CLTypeUInt8,
    CLValue,
    Hash,
    HttpHandler,
    ParamDictionaryIdentifier,
    ParamDictionaryIdentifierContractNamedKey,
    PublicKey, RpcClient,
    SessionBuilder,
    TransactionV1
} from "casper-js-sdk";

export default function SCSPRBalance() {

    const getSCSPRBalance = async () => {

        const rpcHandler = new HttpHandler(window.csprclick!.appSettings.casper_node, 'fetch');
        rpcHandler.setCustomHeaders({ Authorization: window.csprclick.digestAuth });
        const rpcClient = new RpcClient(rpcHandler);

        const accHash = PublicKey.fromHex('0202e99759649fa63a72c685b72e696b30c90f1deabb02d0d9b1de45eb371a73e5bb').accountHash();
        //convert accountHash to bytes without using Buffer
        //prepend 00 to accountHash to make it 32 bytes long
        const accountHashBytes = new Uint8Array(33);
        accountHashBytes[0] = 0;
        accountHashBytes.set(accHash.toBytes(), 1);

        const binary = String.fromCharCode(...accountHashBytes);
        const accountHashBase64 = btoa(binary);

        console.log('accountHashBase64', accountHashBase64);
        const paramDictionaryIdentifier = new ParamDictionaryIdentifier(
            undefined,
            new ParamDictionaryIdentifierContractNamedKey(
                'hash-6e1777c006965596581c3a0379c1d46f7aa518debb128d11d08c5897ff267579',
                'balances',
                accountHashBase64
            ),
            undefined,
            undefined
        );
        debugger;
        const result = await rpcClient.getDictionaryItemByIdentifier(null, paramDictionaryIdentifier);
        const scsprBalance = result.storedValue.clValue?.ui256?.toNumber();

        console.log('sCSPR balance:', scsprBalance);
    };

    return (
        <div className="Stake">
            <button onClick={getSCSPRBalance}>Get sCSPR Balance</button>
        </div>
    );
}
