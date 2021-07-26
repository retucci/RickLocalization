import { Dimension } from './Dimension';
import { Morty } from './Morty';

export class Rick {
    id: number;
    name: string;
    description: string;
    image: string;
    qi: number;
    mortys: Morty;
    dimensions: Dimension[];
}
