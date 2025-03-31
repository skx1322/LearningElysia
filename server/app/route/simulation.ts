import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import dotenv from "dotenv";

dotenv.config();

export const simulation = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: process.env.TOKEN_SECRET || "Nerdanta",
        exp: "1d",
    }))

    .post("/FlipCoin/:toss", ({ params: { toss } }) => {
        try {
            const LoopSize: number = toss;
            let Head: number = 0, Tail: number = 0;
            for (let i = 0; i < LoopSize; i++) {
                const CoinFlip = Math.floor(Math.random() * 2);
                if (!CoinFlip) {
                    Tail++;
                } else {
                    Head++;
                }
            }

            return {
                success: true,
                head: Head,
                tail: Tail,
            }
        } catch (error) {

            return {
                success: false,
            }
        }
    }, {
        params: t.Object({
            toss: t.Number()
        })
    })

    .post("/SpinWheel/:spinTime", ({ params: { spinTime } }) => {
        try {
            interface Wheel {
                Lust: number,
                Gluttony: number,
                Greed: number,
                Sloth: number,
                Wrath: number,
                Envy: number,
                Pride: number
            }
            const LoopSize: number = spinTime;
            const SinWheel: Wheel = {
                Lust: 0,
                Gluttony: 0,
                Greed: 0,
                Sloth: 0,
                Wrath: 0,
                Envy: 0,
                Pride: 0
            }
            for (let i = 0; i < LoopSize; i++) {
                const Spin = Math.floor(Math.random() * 7);
                switch (Spin) {
                    case 0:
                        SinWheel.Lust++;
                        break;
                    case 1:
                        SinWheel.Gluttony++;
                        break;
                    case 2:
                        SinWheel.Greed++;
                        break;
                    case 3:
                        SinWheel.Sloth++;
                        break;
                    case 4:
                        SinWheel.Wrath++;
                        break;
                    case 5:
                        SinWheel.Envy++;
                        break;
                    case 6:
                        SinWheel.Pride++;
                        break;
                    default:
                        break;
                }
            }
            return {
                success: true,
                output: SinWheel,
            }
        } catch (error) {

            return {
                success: false,
            }
        }
    }, {
        params: t.Object({
            spinTime: t.Number()
        })
    })