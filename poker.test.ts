import { cards } from "./poker";
import {describe, it, expect} from '@jest/globals';

describe('verify the cards', () => {
    it('Verify that there is 54 cards in the deck', () =>  {
        expect(cards()).toEqual(52);
    });
});