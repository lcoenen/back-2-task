export const NextKey = (key, now) => ({ type: "NextKey", key, now });
export const Pause = () => ({ type: "Pause" });
export const Press = (now) => ({ type: "Press", now });
