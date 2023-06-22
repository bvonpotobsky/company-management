import {type EffectCallback, useEffect} from "react";

export const useMountEffect = (effect: EffectCallback) => useEffect(effect, [effect]);
