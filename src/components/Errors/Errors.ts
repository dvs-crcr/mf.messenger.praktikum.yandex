import { Block } from './../../utils/Block.js';
import {default as errorsTemplate} from './Errors.html.js';

export type ErrorsProps = {
  attr?: {
    className?: string
  };
  header?: string; 
  p1?: string; 
  p2?: string; 
}

export class Errors extends Block {

  constructor(props: ErrorsProps = {}) {
    super('div', props, errorsTemplate);
  }

}
