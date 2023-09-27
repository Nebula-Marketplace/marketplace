# Signing wasm Messages
How to sign wasm messages with Shuttle:
```ts
import { signWasmMsg } from '@/utils/signMessage.ts';
import { constructBuyMessage } from '@/utils/constructMessage.ts';

const message = constructBuyMessage("1234", "inj...345"); // token_id and contract addy respectively 
const resp = signWasmMsg(message);
console.log(resp)
```