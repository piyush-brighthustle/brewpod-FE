/*
 Change in JSON:

"message" -> "msg"
"mode" -> "md"
"status" -> "st"
"cooler" -> "cool"
"cooler_pv" -> "cool_pv"
"device_id" -> "id"
"version" -> "ver"

*/

export const Fill = { action: 'fill', params: { volume: 20 } };
// {"code":200,"msg":{"st":1,"pv":12}}

export const TEMP = { action: 'temp', params: { drum: 80, cooler: 4 } };
// {"code":200,"msg":{"drum":{"md":1,"pv":62,"sv":80},"cool":{"md":"on","pv":12,"sv":4}}}

export const AIR = { action: 'air', params: { lock: '0001' } };
// {"code":200,"msg":{"st":"0001"}}

export const MASH = { action: 'mash', params: { motor: 1 } };
// {"code":200,"msg":{"st":1}}

export const HOPS = { action: 'hops', params: { angle: 86 } };
// {"code":200,"msg":{"st":86}}

export const LIFT_UP = { action: 'lift', params: { pos: 'up' } };
// {"code":200,"msg":{"st":"ongoing"}}

export const LIFT_Down = { action: 'lift', params: { pos: 'down' } };
// {"code":200,"msg":{"st":"idle"}}

export const System_Check = { action: 'systemCheck' };
// {"code":200,"msg":{"id":"BWP001","ver":"1.2.0","status":0,"drum_pv":40.65,"cool_pv":42.42,"heater":"idle","cooler":"idle","mash":"active","lift":"active","hops":86,"sg":1.34}}
